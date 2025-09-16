import { useEffect } from "react"
import { motion } from "framer-motion"

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
 * ZadarmaWidget component provides enhanced integration and customization
 * for the Zadarma callback widget with corporate blue-white theme styling
 */
export default function ZadarmaWidget({ config = {} }: ZadarmaWidgetProps) {
  const {
    bottomOffset = 120,
    rightOffset = 20,
    className = ""
  } = config

  useEffect(() => {
    // Function to apply dynamic positioning and additional customizations
    const customizeWidget = () => {
      const widgetButton = document.getElementById('z-callback-widget-button') ||
                          document.querySelector('.z-callback-widget-button') as HTMLElement

      if (widgetButton) {
        // Apply dynamic positioning
        widgetButton.style.bottom = `${bottomOffset}px`
        widgetButton.style.right = `${rightOffset}px`
        
        if (className) {
          widgetButton.classList.add(className)
        }

        // Add corporate branding enhancement
        widgetButton.setAttribute('title', 'Замовити зворотний дзвінок')
        widgetButton.setAttribute('aria-label', 'Кнопка замовлення зворотнього дзвінка від ModulSoft')

        // Apply additional hover effects
        const handleMouseEnter = () => {
          widgetButton.style.transform = 'scale(1.05)'
          widgetButton.style.boxShadow = '0 6px 25px oklch(0.65 0.18 220 / 0.4)'
        }

        const handleMouseLeave = () => {
          widgetButton.style.transform = 'scale(1)'
          widgetButton.style.boxShadow = '0 4px 20px oklch(0.55 0.22 240 / 0.3)'
        }

        widgetButton.addEventListener('mouseenter', handleMouseEnter)
        widgetButton.addEventListener('mouseleave', handleMouseLeave)

        // Cleanup function
        return () => {
          widgetButton.removeEventListener('mouseenter', handleMouseEnter)
          widgetButton.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }

    // Initial customization attempt
    customizeWidget()

    // Set up observers to catch the widget when it loads
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes)
          const hasWidgetNode = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && (
              (node as Element).id?.includes('callback-widget') ||
              ((node as Element).className && typeof (node as Element).className === 'string' && (node as Element).className.includes('callback-widget'))
            )
          )
          
          if (hasWidgetNode) {
            // Delay to ensure widget is fully rendered
            setTimeout(customizeWidget, 100)
          }
        }
      })
    })

    // Observe document body for widget insertion
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup observer
    return () => {
      observer.disconnect()
    }
  }, [bottomOffset, rightOffset, className])

  // This component doesn't render anything visible - it just manages the widget customization
  return (
    <motion.div
      className="sr-only"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      <span>Zadarma Widget Manager</span>
    </motion.div>
  )
}

/**
 * Hook for programmatic control of the Zadarma widget
 */
export function useZadarmaWidget() {
  const openWidget = () => {
    const widgetButton = document.getElementById('z-callback-widget-button') ||
                        document.querySelector('.z-callback-widget-button') as HTMLElement
    
    if (widgetButton) {
      widgetButton.click()
    } else {
      console.warn('Zadarma widget not found')
    }
  }

  const isWidgetAvailable = () => {
    return !!(document.getElementById('z-callback-widget-button') ||
              document.querySelector('.z-callback-widget-button'))
  }

  return {
    openWidget,
    isWidgetAvailable
  }
}