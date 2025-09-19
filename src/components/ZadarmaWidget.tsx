import { useState, useEffect } from "react"
import { Phone } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useTranslation } from "@/hooks/useTranslation"

declare global {
  interface Window {
    ZCallbackWidget?: {
      open?: () => void
      close?: () => void
      init?: () => void
    }
  }
}

export default function ZadarmaWidget() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if Zadarma widget is loaded
    const checkWidget = () => {
      if (window.ZCallbackWidget) {
        setIsLoaded(true)
      } else {
        setTimeout(checkWidget, 500)
      }
    }

    checkWidget()
  }, [])

  const handleWidgetClick = () => {
    if (window.ZCallbackWidget && window.ZCallbackWidget.open) {
      window.ZCallbackWidget.open()
    }
  }

  if (!isLoaded) {
    return null
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 zadarma-widget"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <motion.button
        onClick={handleWidgetClick}
        className="w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg hover:shadow-xl 
                   flex items-center justify-center text-primary-foreground transition-all duration-300
                   cursor-pointer relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={t('widget.callback.title')}
      >
        <motion.div
          initial={false}
          whileHover={{
            rotate: [0, 15, -15, 0],
            transition: { duration: 0.6, repeat: Infinity }
          }}
        >
          <Phone size={24} weight="fill" />
        </motion.div>
        
        {/* Ring animation */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/30 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.button>
    </motion.div>
  )
}