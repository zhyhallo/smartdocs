import { useState, useEffect } from 'react'
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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set Zadarma configuration
    window.ZCallbackWidgetLinkId = 'edec1cbf8a1f75508f534464a2b4fa55'
    window.ZCallbackWidgetDomain = 'my.zadarma.com'

    // Create and load the Zadarma script
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = true
    script.src = `https://${window.ZCallbackWidgetDomain}/callbackWidget/js/main.min.js?v=1.15.4`
    
    script.onload = () => {
      setIsLoaded(true)
      // Hide the default Zadarma widget button
      const style = document.createElement('style')
      style.textContent = `
        #ZCallbackWidget {
          display: none !important;
        }
      `
      document.head.appendChild(style)
    }

    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.documentElement.firstChild?.appendChild(script)
    }

    return () => {
      // Cleanup
      script.remove()
    }
  }, [])

  const handleCallbackClick = () => {
    if (window.ZCallbackWidget && isLoaded) {
      window.ZCallbackWidget.showWidget()
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