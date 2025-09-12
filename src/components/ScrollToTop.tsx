import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { OwlMascot } from "@/components"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isFlying, setIsFlying] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    setIsFlying(true)
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Reset flying state after animation
    setTimeout(() => {
      setIsFlying(false)
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
    flying: {
      y: -100,
      scale: 1.2,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const owlVariants = {
    normal: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      rotate: [0, -5, 5, 0],
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        times: [0, 0.33, 0.66, 1]
      }
    },
    flying: {
      rotate: [0, -10, 10, -5, 5, 0],
      y: [-2, -8, -4, -10, -6, -2],
      transition: {
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 bg-primary/90 scroll-to-top-button rounded-full p-4 shadow-lg hover:shadow-xl cursor-pointer border border-primary/20"
          variants={buttonVariants}
          initial="hidden"
          animate={isFlying ? "flying" : "visible"}
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
          aria-label="Прокрутити до верху"
          title="Повернутися до верху"
        >
          <motion.div
            variants={owlVariants}
            initial="normal"
            animate={isFlying ? "flying" : "normal"}
            whileHover="hover"
          >
            <OwlMascot 
              size="sm" 
              animated={false}
              className="w-12 h-12 filter brightness-0 invert"
            />
          </motion.div>
          
          {/* Floating particles effect on flying */}
          <AnimatePresence>
            {isFlying && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                      scale: 1
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 40,
                      y: Math.random() * -30 - 10,
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    style={{
                      left: `${20 + Math.random() * 20}px`,
                      top: `${20 + Math.random() * 20}px`
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