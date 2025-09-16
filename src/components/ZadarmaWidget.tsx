import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ZadarmaModal from "./ZadarmaModal"
import { Phone } from "@phosphor-icons/react"

interface ZadarmaWidgetProps {
  /** Configuration options for the Zadarma widget */
  config?: {
    /** Widget position bottom offset in pixels */
    bottomOffset?: number
    /** Widget position right offset in pixels */
    rightOffset?: number
    /** Custom CSS class for additional styling */
    className?: string
  }
}

/**
 * Custom Zadarma Widget with modal integration
 * Replaces the default Zadarma widget with our own modal implementation
 */
export default function ZadarmaWidget({ config = {} }: ZadarmaWidgetProps) {
  const {
    bottomOffset = 120,
    rightOffset = 20,
    className = ""
  } = config

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Hide original Zadarma widgets to prevent duplicates
  useEffect(() => {
    const hideOriginalWidgets = () => {
      // Find all possible Zadarma widget elements
      const selectors = [
        '#z-callback-widget-button',
        '.z-callback-widget-button',
        '[id*="zadarma"]:not([class*="sr-only"])',
        '[class*="zadarma"]:not([class*="sr-only"])',
        '[id*="callback"]:not([class*="sr-only"])',
        '[class*="callback"]:not([class*="sr-only"])'
      ]
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((element: Element) => {
          if (element instanceof HTMLElement) {
            // Hide original widget completely
            element.style.cssText = 'display: none !important; visibility: hidden !important;'
            console.log('🚫 Hidden original Zadarma widget:', selector)
          }
        })
      })
    }

    // Hide widgets immediately
    hideOriginalWidgets()

    // Set up observer to catch dynamically added widgets
    const observer = new MutationObserver(() => {
      hideOriginalWidgets()
    })

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    // Also check periodically for the first 30 seconds
    const checkInterval = setInterval(hideOriginalWidgets, 1000)
    setTimeout(() => clearInterval(checkInterval), 30000)

    return () => {
      observer.disconnect()
      clearInterval(checkInterval)
    }
  }, [])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Custom widget button */}
      <motion.button
        className={`fixed z-[9999] flex items-center justify-center w-[60px] h-[60px] rounded-full bg-primary border-2 border-accent shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${className}`}
        style={{
          bottom: `${bottomOffset}px`,
          right: `${rightOffset}px`,
        }}
        onClick={handleOpenModal}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "oklch(0.65 0.18 220)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        title="Замовити зворотний дзвінок"
        aria-label="Кнопка замовлення зворотнього дзвінка від ModulSoft"
      >
        <Phone size={24} className="text-primary-foreground" />
      </motion.button>

      {/* Modal for callback form */}
      <ZadarmaModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  )
}

/**
 * Hook for programmatic control of the custom Zadarma widget
 */
export function useZadarmaWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openWidget = () => {
    setIsModalOpen(true)
    console.log('✅ Custom Zadarma modal opened')
  }

  const closeWidget = () => {
    setIsModalOpen(false)
    console.log('✅ Custom Zadarma modal closed')
  }

  const isWidgetAvailable = () => {
    return true // Our custom widget is always available
  }

  return {
    openWidget,
    closeWidget,
    isWidgetAvailable,
    isModalOpen
  }
}