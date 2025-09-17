import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X } from "@phosphor-icons/react"
import { toast } from "sonner"

interface DirectCallWidgetProps {
  onContactClick?: (service: string) => void
}

/**
 * Direct call widget as a final fallback if Zadarma doesn't load
 */
export default function DirectCallWidget({ onContactClick }: DirectCallWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ phone: '', name: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  
  useEffect(() => {
    let checkCount = 0
    const maxChecks = 20 // Check for 40 seconds (20 * 2s)

    const checkForZadarmaWidget = () => {
      const widget = document.getElementById('z-callback-widget-button') ||
                    document.querySelector('.z-callback-widget-button') ||
                    document.querySelector('[id*="zadarma"]') ||
                    document.querySelector('[class*="zadarma"]') ||
                    document.querySelector('[id*="callback"]') ||
                    document.querySelector('[class*="callback"]')
      
      if (widget && widget.offsetParent !== null) { // Check if visible
        console.log('✅ Zadarma widget found, hiding fallback')
        setShouldShow(false)
        return true
      }
      
      checkCount++
      
      if (checkCount >= maxChecks) {
        console.log('⚡ Showing fallback call widget (Zadarma not loaded)')
        setShouldShow(true)
        return true
      }
      
      return false
    }

    // Initial check after a delay
    const initialTimer = setTimeout(() => {
      if (!checkForZadarmaWidget()) {
        const interval = setInterval(() => {
          if (checkForZadarmaWidget()) {
            clearInterval(interval)
          }
        }, 2000)

        // Cleanup interval after max checks
        setTimeout(() => clearInterval(interval), maxChecks * 2000)
      }
    }, 3000) // Wait 3 seconds before starting checks

    return () => clearTimeout(initialTimer)
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.phone.trim()) {
      toast.error("Введіть номер телефону")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call or trigger contact modal
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (onContactClick) {
        const service = `Зворотний дзвінок${formData.name ? ` - ${formData.name}` : ''} (${formData.phone})`
        onContactClick(service)
      }
      
      toast.success("Заявку відправлено! Передзвонимо протягом години")
      setIsOpen(false)
      setFormData({ phone: '', name: '' })
    } catch (error) {
      toast.error("Помилка відправки. Спробуйте ще раз")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!shouldShow) return null

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: [0, -2, 2, 0],
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 8px 30px oklch(0.55 0.22 240 / 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[120px] right-5 z-[9997] 
                   w-14 h-14 bg-primary text-primary-foreground 
                   rounded-full shadow-lg
                   flex items-center justify-center
                   transition-all duration-300 ease-in-out
                   hover:bg-accent focus:outline-none focus:ring-4 focus:ring-primary/30"
        title="Замовити зворотний дзвінок"
        aria-label="Кнопка замовлення зворотнього дзвінка"
        transition={{
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }
        }}
      >
        <Phone size={24} weight="fill" />
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />
      </motion.button>

      {/* Popup form */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999]"
            />
            
            {/* Form popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-[180px] right-5 z-[10000]
                         bg-card border border-border rounded-lg shadow-xl p-4
                         w-80 max-w-[calc(100vw-40px)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">
                  Замовити дзвінок
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Закрити"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+380 XX XXX XX XX"
                    className="w-full px-3 py-2 border border-input rounded-md 
                               bg-background text-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Ім'я
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ваше ім'я"
                    className="w-full px-3 py-2 border border-input rounded-md 
                               bg-background text-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.phone.trim()}
                  className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md
                           font-medium transition-colors
                           hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/30
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Відправляємо...' : 'Замовити дзвінок'}
                </button>
              </form>
              
              <p className="text-xs text-muted-foreground mt-2">
                Ми передзвонимо протягом години
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}