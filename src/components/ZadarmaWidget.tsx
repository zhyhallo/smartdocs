import { useState, useEffect, useCallback } from 'react'
import { Phone } from "@phosphor-icons/react"
import { motion } from "framer-motion"

declare global {
  interface Window {
    ZCallbackWidgetLinkId: string
    ZCallbackWidgetDomain: string
    ZCallbackWidget?: {
      showWidget: () => void
      hideWidget: () => void
    }
  }
}

export default function ZadarmaWidget() {
  const [isReady, setIsReady] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 20 // Max 10 seconds of checking

  const checkWidget = useCallback(() => {
    if (window.ZCallbackWidget && typeof window.ZCallbackWidget.showWidget === 'function') {
      setIsReady(true)
      
      // Hide the default Zadarma widget button
      const style = document.createElement('style')
      if (!document.getElementById('zadarma-hide-style')) {
        style.id = 'zadarma-hide-style'
        style.textContent = `
          #ZCallbackWidget,
          .zcallback-widget,
          [id*="zcallback"]:not([id*="custom"]),
          [class*="zcallback"] {
            display: none !important;
          }
          
          /* Additional selectors for different widget versions */
          .zadarma-widget,
          .callback-widget,
          [data-zadarma],
          div[style*="position: fixed"][style*="bottom"][style*="right"] {
            display: none !important;
          }
        `
        document.head.appendChild(style)
      }
      return true
    }
    return false
  }, [])

  useEffect(() => {
    // Check if Zadarma widget is ready
    const checkWidget = () => {
      if (window.ZCallbackWidget && typeof window.ZCallbackWidget.showWidget === 'function') {
        setIsReady(true)
        
        // Hide the default Zadarma widget button
        const style = document.createElement('style')
        if (!document.getElementById('zadarma-hide-style')) {
          style.id = 'zadarma-hide-style'
          style.textContent = `
            #ZCallbackWidget,
            .zcallback-widget,
            [id*="zcallback"]:not([id*="custom"]),
            [class*="zcallback"] {
              display: none !important;
            }
            
            /* Additional selectors for different widget versions */
            .zadarma-widget,
            .callback-widget,
            [data-zadarma],
            div[style*="position: fixed"][style*="bottom"][style*="right"] {
              display: none !important;
            }
          `
          document.head.appendChild(style)
        }
        return true
      }
      return false
    }

    // Initial check
    if (checkWidget()) return

    const intervalId = setInterval(() => {
      setAttempts(prev => {
        const newAttempts = prev + 1
        
        if (checkWidget() || newAttempts >= maxAttempts) {
          clearInterval(intervalId)
        }
        
        return newAttempts
      })
    }, 500)

    return () => clearInterval(intervalId)
  }, [checkWidget, maxAttempts])

  const handleCallbackClick = () => {
    if (isReady && window.ZCallbackWidget) {
      try {
        if (typeof window.ZCallbackWidget.showWidget === 'function') {
          window.ZCallbackWidget.showWidget()
        } else {
          // Alternative approach - try to trigger the widget manually
          const event = new CustomEvent('zadarma:show')
          window.dispatchEvent(event)
          
          // Or try to click the original widget if it exists but is hidden
          const originalWidget = document.querySelector('#ZCallbackWidget, .zcallback-widget, [class*="zcallback"], .zadarma-widget') as HTMLElement
          if (originalWidget && originalWidget.click) {
            // Temporarily show it, click it, then hide it again
            originalWidget.style.display = 'block'
            originalWidget.style.visibility = 'hidden'
            setTimeout(() => {
              originalWidget.click()
              originalWidget.style.display = 'none'
              originalWidget.style.visibility = 'visible'
            }, 100)
          }
        }
      } catch (error) {
        // Silently handle error in production
      }
    }
  }

  return (
    <motion.button
      onClick={handleCallbackClick}
      className="fixed bottom-6 left-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
      }}
      whileTap={{ scale: 0.95 }}
      title="Замовити дзвінок"
      aria-label="Замовити дзвінок"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <Phone size={24} weight="fill" />
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </motion.button>
  )
}