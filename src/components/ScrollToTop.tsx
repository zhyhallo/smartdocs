import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "@phosphor-icons/react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

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
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false)
    }, 800)
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    },
    scrolling: {
      y: -10,
      scale: 1.1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const arrowVariants = {
    normal: {
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      y: [0, -3, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    scrolling: {
      y: [0, -8, -4, -12, -6, -10, -3, 0],
      scale: [1, 1.2, 1.1, 1.3, 1.15, 1.25, 1.05, 1],
      transition: {
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
      }
    }
  }

  const UpArrowIcon = () => (
    <motion.div
      variants={arrowVariants}
      initial="normal"
      animate={isScrolling ? "scrolling" : "normal"}
      whileHover="hover"
      className="flex items-center justify-center"
    >
      <ArrowUp 
        size={24} 
        weight="bold"
        className="text-primary"
      />
    </motion.div>
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-sm scroll-to-top-button rounded-full p-3 shadow-lg hover:shadow-xl cursor-pointer border border-border/20"
          variants={buttonVariants}
          initial="hidden"
          animate={isScrolling ? "scrolling" : "visible"}
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
          aria-label="Прокрутити до верху"
          title="Повернутися до верху"
        >
          <UpArrowIcon />
          
          {/* Floating arrow effects on scroll */}
          <AnimatePresence>
            {isScrolling && (
              <>
                {/* Multiple floating arrows */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`arrow-${i}`}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{
                      opacity: 0,
                      y: 0,
                      scale: 1
                    }}
                    animate={{
                      opacity: [0, 1, 0.5, 0],
                      y: [0, -20, -35, -50],
                      scale: [1, 1.2, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    <ArrowUp 
                      size={20} 
                      weight="bold"
                      className="text-accent"
                    />
                  </motion.div>
                ))}
                
                {/* Trail effect */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`trail-${i}`}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    initial={{
                      x: 12,
                      y: 20,
                      opacity: 0.8,
                      scale: 1
                    }}
                    animate={{
                      x: 12 + Math.sin(i * 0.5) * 8,
                      y: [20, 0, -10, -25],
                      opacity: 0,
                      scale: [1, 1.5, 1, 0]
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Upward motion lines */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`motion-line-${i}`}
                    className="absolute w-0.5 bg-accent/60 rounded-full"
                    style={{
                      left: `${8 + i * 2}px`,
                      height: '2px',
                    }}
                    initial={{
                      y: 15,
                      opacity: 0,
                      scaleY: 1
                    }}
                    animate={{
                      y: -25,
                      opacity: [0, 1, 0],
                      scaleY: [1, 3, 1]
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  )
}