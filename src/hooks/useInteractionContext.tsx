import React, { createContext, useContext, useState, useCallback, useRef } from "react"
import { type InteractionEvent } from "@/hooks/useInteractiveTerminal"

interface InteractionContextType {
  triggerGlobalInteraction: (interaction: InteractionEvent) => void
  lastGlobalInteraction: InteractionEvent | null
  isGloballyInteracting: boolean
  registerTerminal: (id: string, callback: (interaction: InteractionEvent) => void) => void
  unregisterTerminal: (id: string) => void
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined)

export function InteractionProvider({ children }: { children: React.ReactNode }) {
  const [lastGlobalInteraction, setLastGlobalInteraction] = useState<InteractionEvent | null>(null)
  const [isGloballyInteracting, setIsGloballyInteracting] = useState(false)
  const terminalsRef = useRef<Map<string, (interaction: InteractionEvent) => void>>(new Map())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerGlobalInteraction = useCallback((interaction: InteractionEvent) => {
    setLastGlobalInteraction(interaction)
    setIsGloballyInteracting(true)

    // Notify all registered terminals
    terminalsRef.current.forEach((callback) => {
      callback(interaction)
    })

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set timeout to reset global interaction state
    timeoutRef.current = setTimeout(() => {
      setIsGloballyInteracting(false)
    }, 3000)
  }, [])

  const registerTerminal = useCallback((id: string, callback: (interaction: InteractionEvent) => void) => {
    terminalsRef.current.set(id, callback)
  }, [])

  const unregisterTerminal = useCallback((id: string) => {
    terminalsRef.current.delete(id)
  }, [])

  return (
    <InteractionContext.Provider value={{
      triggerGlobalInteraction,
      lastGlobalInteraction,
      isGloballyInteracting,
      registerTerminal,
      unregisterTerminal
    }}>
      {children}
    </InteractionContext.Provider>
  )
}

export function useInteractionContext() {
  const context = useContext(InteractionContext)
  if (context === undefined) {
    throw new Error('useInteractionContext must be used within an InteractionProvider')
  }
  return context
}