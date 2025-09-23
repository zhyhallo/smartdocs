import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { smoothScrollToTop } from "@/lib/smoothScroll"
import { OwlMascot } from "@/components"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > 200)
    }

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setIsMobile(width <= 768)
      setScreenHeight(height)
    }

    // Initialize values
    handleResize()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollToTop = () => {
    setIsScrolling(true)
    smoothScrollToTop(1500)
    setTimeout(() => {
      setIsScrolling(false)
    }, 1600)
  }

  // Calculate position
  const getBottomPosition = () => {
    if (typeof window === 'undefined') return '24px'
    
    const width = window.innerWidth
    const height = screenHeight || window.innerHeight
    
    if (width <= 768) {
      // Мобільні пристрої: 3/4 від висоти екрану
      return `${Math.max(height * 0.25, 80)}px` // Мінімум 80px знизу
    } else if (width <= 1024) {
      // Планшети: трохи вище
      return `${Math.max(height * 0.15, 60)}px`
    }
    
    return '24px' // Десктоп
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
          className="scroll-to-top fixed right-6 z-40 p-3 rounded-full 
                     backdrop-blur-sm border border-border/30
                     shadow-lg hover:shadow-xl transition-shadow duration-300
                     focus:outline-none focus:ring-2 focus:ring-primary/50"
          style={{
            bottom: getBottomPosition(),
            background: "transparent"
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