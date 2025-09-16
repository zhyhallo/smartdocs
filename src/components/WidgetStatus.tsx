import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Development-only component to show Zadarma widget status
 */
export default function WidgetStatus() {
  const [status, setStatus] = useState<'checking' | 'found' | 'not-found'>('checking')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      setIsVisible(false)
      return
    }

    const checkWidget = () => {
      const widget = document.getElementById('z-callback-widget-button') ||
                    document.querySelector('.z-callback-widget-button') ||
                    document.querySelector('[id*="zadarma"]') ||
                    document.querySelector('[class*="zadarma"]') ||
                    document.querySelector('[id*="callback"]') ||
                    document.querySelector('[class*="callback"]')
      
      if (widget) {
        setStatus('found')
        console.log('✅ Zadarma widget is active:', widget)
      } else {
        setStatus('not-found')
        console.log('❌ Zadarma widget not found')
      }
    }

    // Check immediately
    checkWidget()

    // Check periodically
    const interval = setInterval(checkWidget, 2000)

    // Auto-hide after 10 seconds if found
    const hideTimer = setTimeout(() => {
      if (status === 'found') {
        setIsVisible(false)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(hideTimer)
    }
  }, [status])

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed top-4 left-4 z-[9999] 
                   bg-card border border-border rounded-lg shadow-lg p-3
                   text-sm font-mono max-w-xs"
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'checking' ? 'bg-yellow-500 animate-pulse' :
            status === 'found' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className="text-foreground">
            Zadarma Widget: {
              status === 'checking' ? 'Перевірка...' :
              status === 'found' ? 'Активний ✅' : 'Не знайдено ❌'
            }
          </span>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 text-muted-foreground hover:text-foreground
                     w-4 h-4 flex items-center justify-center text-xs"
          aria-label="Закрити"
        >
          ×
        </button>

        {status === 'not-found' && (
          <div className="text-xs text-muted-foreground mt-2">
            Показано резервну кнопку дзвінка
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}