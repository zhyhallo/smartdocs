import { useState, useEffect, useCallback, useRef } from "react"

export interface TerminalData {
  total: string
  transactions: number
  status: "ACTIVE" | "PROCESSING" | "STANDBY" | "ANALYZING"
  time: string
  operation: string
  progress?: number
  cashRegisterType?: "POSNET" | "THERMAL" | "BOTH"
  lastTransaction?: string
  errorCode?: string
  networkStatus?: "ONLINE" | "OFFLINE" | "SYNCING"
}

export interface InteractionEvent {
  type: "hover" | "click" | "scroll" | "form_focus" | "button_click" | "section_view"
  section?: string
  data?: any
}

export function useInteractiveTerminal(baseUpdateInterval: number = 3000) {
  const [data, setData] = useState<TerminalData>(generateInitialData())
  const [isInteracting, setIsInteracting] = useState(false)
  const [lastInteraction, setLastInteraction] = useState<InteractionEvent | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  function generateInitialData(): TerminalData {
    return {
      total: (Math.random() * 9999 + 1000).toFixed(2),
      transactions: Math.floor(Math.random() * 50 + 10),
      status: "STANDBY",
      time: new Date().toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      operation: "Ready",
      cashRegisterType: Math.random() > 0.5 ? "POSNET" : "THERMAL",
      networkStatus: "ONLINE"
    }
  }

  function generateContextualData(interaction: InteractionEvent): Partial<TerminalData> {
    const baseData = {
      time: new Date().toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      total: (Math.random() * 9999 + 1000).toFixed(2),
      transactions: Math.floor(Math.random() * 50 + 10),
    }

    switch (interaction.type) {
      case "hover":
        return {
          ...baseData,
          status: "ANALYZING",
          operation: "Scanning system...",
          progress: Math.floor(Math.random() * 40 + 20)
        }
      
      case "click":
        return {
          ...baseData,
          status: "PROCESSING",
          operation: "Processing request...",
          progress: Math.floor(Math.random() * 60 + 30),
          lastTransaction: `TX-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`
        }
      
      case "scroll":
        return {
          ...baseData,
          status: "ACTIVE",
          operation: "Monitoring activity",
          networkStatus: "SYNCING" as const
        }
      
      case "form_focus":
        return {
          ...baseData,
          status: "PROCESSING",
          operation: "Form validation...",
          progress: Math.floor(Math.random() * 30 + 50)
        }
      
      case "button_click":
        return {
          ...baseData,
          status: "PROCESSING",
          operation: "Executing command...",
          progress: Math.floor(Math.random() * 40 + 60),
          lastTransaction: `CMD-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`
        }
      
      case "section_view":
        const sectionOperations: Record<string, string> = {
          hero: "Demo mode active",
          features: "Feature analysis",
          pricing: "Price calculation",
          faq: "Help system active",
          contact: "Contact processing"
        }
        
        return {
          ...baseData,
          status: "ACTIVE",
          operation: sectionOperations[interaction.section || ""] || "System monitoring",
          cashRegisterType: interaction.section === "features" ? "BOTH" as const : 
                          Math.random() > 0.5 ? "POSNET" as const : "THERMAL" as const
        }
      
      default:
        return {
          ...baseData,
          status: "STANDBY",
          operation: "Ready"
        }
    }
  }

  const handleInteraction = useCallback((interaction: InteractionEvent) => {
    setLastInteraction(interaction)
    setIsInteracting(true)

    // Immediately update data based on interaction
    const newData = generateContextualData(interaction)
    setData(prevData => ({ ...prevData, ...newData }))

    // Clear existing interaction timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }

    // Set timeout to return to normal state
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false)
      setData(prevData => ({
        ...prevData,
        status: "STANDBY",
        operation: "Ready",
        progress: undefined
      }))
    }, 3000)
  }, [])

  // Regular data updates when not actively interacting
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        if (!isInteracting) {
          setData(prevData => ({
            ...prevData,
            time: new Date().toLocaleTimeString('uk-UA', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            }),
            // Subtle updates during idle state
            total: (parseFloat(prevData.total) + (Math.random() - 0.5) * 10).toFixed(2),
            transactions: Math.max(1, prevData.transactions + Math.floor((Math.random() - 0.7) * 3))
          }))
        }
      }, baseUpdateInterval)
    }

    startInterval()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isInteracting, baseUpdateInterval])

  // Cleanup function
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
    }
  }, [])

  return {
    data,
    isInteracting,
    lastInteraction,
    handleInteraction
  }
}