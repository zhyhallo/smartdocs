import { useEffect, useState } from 'react'
import { Phone } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

declare global {
  interface Window {
    ZCallbackWidgetLinkId?: string
    ZCallbackWidgetDomain?: string
    ZCallbackWidget?: {
      showWidget: () => void
      hideWidget: () => void
    }
  }
}

export default function ZadarmaWidget() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const loadZadarmaScript = () => {
      if (typeof window === 'undefined') return
      
      // Check if already loaded
      if (document.querySelector('script[src*="zadarma"]')) {
        setIsScriptLoaded(true)
        return
      }

      console.log('Loading Zadarma widget script...')
      
      // Set up configuration
      window.ZCallbackWidgetLinkId = 'edec1cbf8a1f75508f534464a2b4fa55'
      window.ZCallbackWidgetDomain = 'my.zadarma.com'

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.async = true
      script.src = `https://my.zadarma.com/callbackWidget/js/main.min.js?v=1.15.4`
      
      script.onload = () => {
        console.log('Zadarma script loaded successfully')
        setIsScriptLoaded(true)
        addCustomStyles()
      }
      
      script.onerror = (error) => {
        console.error('Failed to load Zadarma script:', error)
        if (retryCount < 2) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1)
          }, 2000)
        }
      }

      document.head.appendChild(script)
    }

    const addCustomStyles = () => {
      // Remove existing styles
      const existingStyle = document.getElementById('zadarma-custom-style')
      if (existingStyle) existingStyle.remove()

      const style = document.createElement('style')
      style.id = 'zadarma-custom-style'
      style.innerHTML = `
        /* Hide default Zadarma button since we have our own */
        .zcallback-widget-button,
        .zcallback-widget-button-container {
          display: none !important;
        }
        
        /* Style the popup */
        .zcallback-widget-popup {
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid oklch(0.88 0.04 240) !important;
          z-index: 10001 !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .zcallback-widget-popup .zcallback-widget-header {
          background: linear-gradient(135deg, oklch(0.55 0.22 240), oklch(0.65 0.18 220)) !important;
          color: white !important;
          border-radius: 12px 12px 0 0 !important;
          padding: 16px 20px !important;
          font-weight: 600 !important;
        }
        
        .zcallback-widget-popup .zcallback-widget-body {
          background-color: oklch(0.98 0.02 240) !important;
          padding: 24px !important;
        }
        
        .zcallback-widget-popup input {
          border: 1px solid oklch(0.88 0.04 240) !important;
          border-radius: 8px !important;
          padding: 12px !important;
          font-size: 14px !important;
          font-family: 'Inter', sans-serif !important;
          background: white !important;
          transition: border-color 0.2s ease !important;
        }
        
        .zcallback-widget-popup input:focus {
          border-color: oklch(0.55 0.22 240) !important;
          outline: none !important;
          box-shadow: 0 0 0 3px oklch(0.55 0.22 240 / 0.1) !important;
        }
        
        .zcallback-widget-popup button {
          background: linear-gradient(135deg, oklch(0.55 0.22 240), oklch(0.65 0.18 220)) !important;
          color: white !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 12px 24px !important;
          font-weight: 600 !important;
          font-family: 'Inter', sans-serif !important;
          cursor: pointer !important;
          transition: transform 0.2s ease !important;
        }
        
        .zcallback-widget-popup button:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px oklch(0.55 0.22 240 / 0.3) !important;
        }
        
        .zcallback-widget-popup .zcallback-widget-close {
          color: rgba(255, 255, 255, 0.8) !important;
          font-size: 20px !important;
          font-weight: bold !important;
          transition: color 0.2s ease !important;
        }
        
        .zcallback-widget-popup .zcallback-widget-close:hover {
          color: white !important;
        }
        
        /* Hide unwanted elements */
        .zcallback-widget-info,
        .zcallback-info-button,
        .zcallback-widget-powered {
          display: none !important;
        }
      `
      document.head.appendChild(style)
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadZadarmaScript)
    } else {
      loadZadarmaScript()
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', loadZadarmaScript)
    }
  }, [retryCount])

  const handleWidgetClick = () => {
    console.log('Widget button clicked')
    
    // Try to show Zadarma widget first
    if (window.ZCallbackWidget && typeof window.ZCallbackWidget.showWidget === 'function') {
      console.log('Showing Zadarma widget')
      window.ZCallbackWidget.showWidget()
    } else {
      console.log('Zadarma widget not available, showing fallback')
      setShowFallback(true)
    }
  }

  return (
    <>
      {/* Custom Zadarma trigger button */}
      <motion.div
        className="fixed bottom-4 right-4 z-[10000]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          className="w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          onClick={handleWidgetClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Замовити зворотний дзвінок"
        >
          <Phone size={24} weight="fill" className="group-hover:scale-110 transition-transform duration-200" />
        </motion.button>
      </motion.div>

      {/* Fallback modal */}
      <AnimatePresence>
        {showFallback && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFallback(false)}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl max-w-sm w-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-primary to-accent p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary-foreground">
                    Зворотний дзвінок
                  </h3>
                  <button
                    onClick={() => setShowFallback(false)}
                    className="text-primary-foreground/80 hover:text-primary-foreground text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <Phone size={48} className="mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground mb-6">
                  Зателефонуйте нам прямо зараз або ми передзвонимо вам протягом 5 хвилин
                </p>
                
                <div className="space-y-3">
                  <a
                    href="tel:+380931776504"
                    className="block w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    📞 +38 (093) 177-65-04
                  </a>
                  <a
                    href="tel:+380987482235"
                    className="block w-full bg-secondary text-secondary-foreground py-3 px-4 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                  >
                    📞 +38 (098) 748-22-35
                  </a>
                  <a
                    href="mailto:info@modulsoft.eu"
                    className="block w-full bg-accent text-accent-foreground py-3 px-4 rounded-lg hover:bg-accent/90 transition-colors font-medium"
                  >
                    ✉️ info@modulsoft.eu
                  </a>
                </div>
                
                <p className="mt-4 text-xs text-muted-foreground">
                  Пн-Пт: 8:00-17:00 | Сб-Нд: вихідні
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}