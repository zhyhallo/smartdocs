import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { smoothScrollToTop } from "@/lib/smoothScroll"
import { OwlMascot } from "@/components"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    setIsScrolling(true)
    smoothScrollToTop(1500)
    setTimeout(() => {
      setIsScrolling(false)
    }, 1600)
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 400
      }
    },
    hover: {
      scale: 1.1,
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeInOut" }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
                     backdrop-blur-sm border border-border/30
                     shadow-lg hover:shadow-xl transition-shadow duration-300
                     focus:outline-none focus:ring-2 focus:ring-primary/50"
          style={{
            background: "oklch(0.98 0.02 240 / 0.9)"
          }}
          aria-label="Scroll to top"
          disabled={isScrolling}
        >
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="relative"
              animate={
                isScrolling ? {
                  y: [0, -20, -40, -60, -80],
                  scale: [1, 1.2, 1.1, 1.3, 1],
                  transition: {
                    duration: 1.2,
                    ease: "easeOut",
                    times: [0, 0.25, 0.5, 0.75, 1]
                  }
                } : isHovered ? {
                  scale: 1.1,
                  y: [-2, -8, -2],
                  transition: { duration: 0.6, ease: "easeOut" }
                } : {}
              }
            >
              <OwlMascot size="sm" animated={true} />
            </motion.div>

            {/* Animated arrow pointing up */}
            <AnimatePresence>
              {isHovered && !isScrolling && (
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                             text-primary text-lg font-bold pointer-events-none"
                  initial={{ opacity: 0, y: 10, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [10, -5, -15],
                    scale: [0, 1.2, 1]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                >
                  ↑
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}