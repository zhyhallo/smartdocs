import { useEffect, useState, useCallback } from "react"
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

  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'found' | 'not-found'>('loading')

  // Function to apply dynamic positioning and additional customizations
  const customizeWidget = useCallback(() => {
    const selectors = [
      '#z-callback-widget-button',
      '.z-callback-widget-button',
      '[id*="zadarma"]',
      '[class*="zadarma"]',
      '[id*="callback"]',
      '[class*="callback"]'
    ]
    
    let widgetButton: HTMLElement | null = null
    
    for (const selector of selectors) {
      widgetButton = document.querySelector(selector) as HTMLElement
      if (widgetButton) break
    }

    if (widgetButton) {
      console.log('✅ Zadarma widget found and customized')
      setWidgetStatus('found')
      
      // Apply dynamic positioning
      widgetButton.style.cssText = `
        position: fixed !important;
        bottom: ${bottomOffset}px !important;
        right: ${rightOffset}px !important;
        z-index: 9998 !important;
        background: oklch(0.55 0.22 240) !important;
        border: 2px solid oklch(0.65 0.18 220) !important;
        border-radius: 50% !important;
        box-shadow: 0 4px 20px oklch(0.55 0.22 240 / 0.3) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        width: 60px !important;
        height: 60px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      `
      
      if (className) {
        widgetButton.classList.add(className)
      }

      // Add corporate branding enhancement
      widgetButton.setAttribute('title', 'Замовити зворотний дзвінок')
      widgetButton.setAttribute('aria-label', 'Кнопка замовлення зворотнього дзвінка від ModulSoft')

      // Apply additional hover effects
      const handleMouseEnter = () => {
        widgetButton!.style.transform = 'scale(1.05)'
        widgetButton!.style.background = 'oklch(0.65 0.18 220) !important'
        widgetButton!.style.boxShadow = '0 6px 25px oklch(0.65 0.18 220 / 0.4) !important'
      }

      const handleMouseLeave = () => {
        widgetButton!.style.transform = 'scale(1)'
        widgetButton!.style.background = 'oklch(0.55 0.22 240) !important'
        widgetButton!.style.boxShadow = '0 4px 20px oklch(0.55 0.22 240 / 0.3) !important'
      }

      // Remove existing event listeners to avoid duplicates
      widgetButton.removeEventListener('mouseenter', handleMouseEnter)
      widgetButton.removeEventListener('mouseleave', handleMouseLeave)
      
      // Add new event listeners
      widgetButton.addEventListener('mouseenter', handleMouseEnter)
      widgetButton.addEventListener('mouseleave', handleMouseLeave)

      return true
    }
    
    return false
  }, [bottomOffset, rightOffset, className])

  useEffect(() => {
    let cleanupFunctions: (() => void)[] = []
    let checkInterval: NodeJS.Timeout | null = null

    // Check for widget multiple times with increasing delays
    const checkForWidget = (attempt = 1, maxAttempts = 30) => {
      console.log(`🔍 Looking for Zadarma widget (attempt ${attempt}/${maxAttempts})`)
      
      if (customizeWidget()) {
        if (checkInterval) {
          clearInterval(checkInterval)
          checkInterval = null
        }
        return // Found and customized
      }

      if (attempt < maxAttempts) {
        const delay = Math.min(attempt * 500, 5000) // Increase delay up to 5 seconds
        setTimeout(() => checkForWidget(attempt + 1, maxAttempts), delay)
      } else {
        console.warn('❌ Zadarma widget not found after all attempts')
        setWidgetStatus('not-found')
        if (checkInterval) {
          clearInterval(checkInterval)
          checkInterval = null
        }
      }
    }

    // Initial check
    checkForWidget()

    // Continuous checking every 3 seconds for the first minute
    checkInterval = setInterval(() => {
      if (widgetStatus === 'loading') {
        customizeWidget()
      }
    }, 3000)

    // Stop checking after 1 minute
    setTimeout(() => {
      if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
      }
    }, 60000)

    // Set up observers to catch the widget when it loads
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedNodes = Array.from(mutation.addedNodes)
          const hasWidgetNode = addedNodes.some(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return false
            
            const element = node as Element
            const id = element.id?.toLowerCase() || ''
            const className = element.className?.toString().toLowerCase() || ''
            const tagName = element.tagName?.toLowerCase() || ''
            
            return id.includes('callback') || id.includes('widget') || id.includes('zadarma') ||
                   className.includes('callback') || className.includes('widget') || className.includes('zadarma') ||
                   tagName === 'iframe' ||
                   element.querySelector('[id*="callback"], [id*="widget"], [id*="zadarma"]') !== null
          })
          
          if (hasWidgetNode) {
            shouldCheck = true
          }
        }
      })
      
      if (shouldCheck && widgetStatus === 'loading') {
        setTimeout(() => {
          console.log('🔄 DOM changed, checking for widget again...')
          customizeWidget()
        }, 100)
      }
    })

    // Observe document body for widget insertion
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    cleanupFunctions.push(() => observer.disconnect())
    cleanupFunctions.push(() => {
      if (checkInterval) {
        clearInterval(checkInterval)
      }
    })

    // Cleanup all functions when component unmounts
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [customizeWidget, widgetStatus])

  // This component doesn't render anything visible - it just manages the widget customization
  return (
    <motion.div
      className="sr-only"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      <span>
        Zadarma Widget Manager - Status: {widgetStatus}
        {process.env.NODE_ENV === 'development' && (
          <span className="ml-2 text-xs">
            ({widgetStatus === 'loading' && 'Шукаємо віджет...'}
            {widgetStatus === 'found' && 'Віджет знайдено ✅'}
            {widgetStatus === 'not-found' && 'Віджет не знайдено ❌'})
          </span>
        )}
      </span>
    </motion.div>
  )
}

/**
 * Hook for programmatic control of the Zadarma widget
 */
export function useZadarmaWidget() {
  const openWidget = () => {
    const widgetButton = document.getElementById('z-callback-widget-button') ||
                        document.querySelector('.z-callback-widget-button') as HTMLElement ||
                        document.querySelector('[id*="zadarma"]') as HTMLElement ||
                        document.querySelector('[class*="zadarma"]') as HTMLElement
    
    if (widgetButton) {
      widgetButton.click()
      console.log('✅ Zadarma widget opened')
    } else {
      console.warn('❌ Zadarma widget not found')
    }
  }

  const isWidgetAvailable = () => {
    return !!(document.getElementById('z-callback-widget-button') ||
              document.querySelector('.z-callback-widget-button') ||
              document.querySelector('[id*="zadarma"]') ||
              document.querySelector('[class*="zadarma"]'))
  }

  return {
    openWidget,
    isWidgetAvailable
  }
}