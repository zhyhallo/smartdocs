import { useState, useEffect, useCallback } from 'react'

 * 
export function useLocalStorage<T>(key: string, defaultV
 * Provides the same API for data persistence
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
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
        try 
     

        setValue(defaultValue)
    }
    window.ad
    return () => {
    }

}













