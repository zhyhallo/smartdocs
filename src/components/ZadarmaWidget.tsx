import { useEffect } from 'react'

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
  useEffect(() => {
    // Ensure Zadarma script loads properly
    const initZadarmaWidget = () => {
      if (typeof window !== 'undefined') {
        window.ZCallbackWidgetLinkId = 'edec1cbf8a1f75508f534464a2b4fa55'
        window.ZCallbackWidgetDomain = 'my.zadarma.com'
        
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="zadarma"]')
        if (!existingScript) {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.charset = 'utf-8'
          script.async = true
          script.src = `https://${window.ZCallbackWidgetDomain}/callbackWidget/js/main.min.js?v=1.15.4`
          
          const firstScript = document.getElementsByTagName('script')[0]
          if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript)
          } else {
            document.head.appendChild(script)
          }
        }
        
        // Remove any conflicting styles
        const existingStyle = document.getElementById('zadarma-hide-style')
        if (existingStyle) {
          existingStyle.remove()
        }
        
        // Custom widget button styling
        setTimeout(() => {
          const widgetStyle = document.createElement('style')
          widgetStyle.id = 'zadarma-custom-style'
          widgetStyle.innerHTML = `
            /* Style the Zadarma widget button */
            .zcallback-widget-button {
              background-color: oklch(0.55 0.22 240) !important;
              border: none !important;
              border-radius: 50% !important;
              width: 60px !important;
              height: 60px !important;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
              transition: all 0.3s ease !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              z-index: 9999 !important;
              position: fixed !important;
              bottom: 20px !important;
              right: 20px !important;
            }
            
            .zcallback-widget-button:hover {
              transform: scale(1.05) !important;
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3) !important;
            }
            
            .zcallback-widget-button svg,
            .zcallback-widget-button img {
              width: 28px !important;
              height: 28px !important;
              filter: brightness(0) invert(1) !important;
            }
            
            /* Style the widget popup */
            .zcallback-widget-popup {
              border-radius: 12px !important;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
              border: 1px solid oklch(0.88 0.04 240) !important;
            }
            
            .zcallback-widget-popup .zcallback-widget-header {
              background-color: oklch(0.55 0.22 240) !important;
              color: white !important;
              border-radius: 12px 12px 0 0 !important;
              padding: 16px !important;
            }
            
            .zcallback-widget-popup .zcallback-widget-body {
              background-color: oklch(0.98 0.02 240) !important;
              padding: 20px !important;
            }
            
            /* Hide any additional icons or info buttons */
            .zcallback-widget-info,
            .zcallback-info-button {
              display: none !important;
            }
          `
          document.head.appendChild(widgetStyle)
        }, 2000)
      }
    }

    // Initialize immediately if DOM is ready
    if (document.readyState === 'complete') {
      initZadarmaWidget()
    } else {
      window.addEventListener('load', initZadarmaWidget)
      return () => window.removeEventListener('load', initZadarmaWidget)
    }
  }, [])

  return null
}