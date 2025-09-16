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
          
          /* Hide all default Zadarma widget buttons */
          .zadarma-widget,
          .callback-widget,
          [data-zadarma],
          div[style*="position: fixed"][style*="bottom"],
          div[style*="position: fixed"][style*="right"],
          div[style*="z-index"][style*="99999"],
          div[style*="z-index: 99999"],
          div[style*="z-index:99999"] {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Hide any green or blue floating buttons from Zadarma */
          div[style*="background"][style*="green"],
          div[style*="background"][style*="blue"],
          div[style*="background-color"][style*="green"],
          div[style*="background-color"][style*="blue"] {
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
    // Function to hide Zadarma default widgets
    const hideZadarmaWidgets = () => {
      const selectors = [
        '#ZCallbackWidget',
        '.zcallback-widget',
        '[id*="zcallback"]:not([id*="custom"])',
        '[class*="zcallback"]',
        '.zadarma-widget',
        '.callback-widget',
        '[data-zadarma]'
      ]
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none'
            el.style.visibility = 'hidden'
            el.style.opacity = '0'
            el.style.pointerEvents = 'none'
          }
        })
      })
      
      // Also hide floating divs that might be Zadarma widgets
      const allDivs = document.querySelectorAll('div')
      allDivs.forEach(div => {
        const style = window.getComputedStyle(div)
        if (
          style.position === 'fixed' &&
          (style.bottom === '20px' || style.right === '20px') &&
          parseInt(style.zIndex) > 999
        ) {
          div.style.display = 'none'
        }
      })
    }

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
            
            /* Hide all default Zadarma widget buttons */
            .zadarma-widget,
            .callback-widget,
            [data-zadarma],
            div[style*="position: fixed"][style*="bottom"],
            div[style*="position: fixed"][style*="right"],
            div[style*="z-index"][style*="99999"],
            div[style*="z-index: 99999"],
            div[style*="z-index:99999"] {
              display: none !important;
              visibility: hidden !important;
            }
            
            /* Hide any green or blue floating buttons from Zadarma */
            div[style*="background"][style*="green"],
            div[style*="background"][style*="blue"],
            div[style*="background-color"][style*="green"],
            div[style*="background-color"][style*="blue"] {
              display: none !important;
            }
          `
          document.head.appendChild(style)
        }
        
        // Hide widgets immediately
        hideZadarmaWidgets()
        return true
      }
      return false
    }

    // Set up MutationObserver to watch for dynamically added widgets
    const observer = new MutationObserver(() => {
      hideZadarmaWidgets()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Initial check
    if (checkWidget()) {
      observer.disconnect()
      return () => {}
    }

    const intervalId = setInterval(() => {
      setAttempts(prev => {
        const newAttempts = prev + 1
        
        if (checkWidget() || newAttempts >= maxAttempts) {
          clearInterval(intervalId)
          observer.disconnect()
        }
        
        return newAttempts
      })
    }, 500)

    return () => {
      clearInterval(intervalId)
      observer.disconnect()
    }
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
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
        className="absolute inset-0 rounded-full bg-green-500/30"
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