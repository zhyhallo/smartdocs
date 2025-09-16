import React, { createContext, useContext } from "react"

interface InteractionContextType {
  // Simplified - no complex interactions
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined)

export function InteractionProvider({ children }: { children: React.ReactNode }) {
  // Simplified provider - just return children
  return (
    <InteractionContext.Provider value={{}}>
      {children}
    </InteractionContext.Provider>
  )
}

export function useInteractionContext(): InteractionContextType {
  const context = useContext(InteractionContext)
  if (context === undefined) {
    throw new Error("useInteractionContext must be used within an InteractionProvider")
  }
  return context
}