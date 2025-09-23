import { useState, useEffect, useCallback } from 'react'

/**
 * Replacement for Spark's useKV hook using localStorage
 * Provides the same API for data persistence
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  })

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    try {
      const valueToStore = typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue

      setValue(valueToStore)

      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, value])

  const deleteValue = useCallback(() => {
    try {
      setValue(defaultValue)
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error deleting localStorage key "${key}":`, error)
    }
  }, [key, defaultValue])

  // Listen to changes made by other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing localStorage key "${key}" from storage event:`, error)
        }
      } else if (e.key === key && e.newValue === null) {
        setValue(defaultValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, defaultValue])

  return [value, setStoredValue, deleteValue] as const
}