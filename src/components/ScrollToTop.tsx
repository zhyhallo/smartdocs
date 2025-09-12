import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { POSTerminal } from "@/components"

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
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false)
    }, 1200)
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
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }

  const owlContainerVariants = {
    normal: {
      y: [0, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      y: [-2, -8, -2],
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    scrolling: {
      y: [0, -20, -40, -60, -80],
      opacity: [1, 0.8, 0.6, 0.8, 1],
      scale: [1, 1.2, 1.1, 1.3, 1],
      transition: {
        duration: 1.2,
        ease: "easeOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    }
  }

  const terminalVariants = {
    normal: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    scrolling: {
      scale: [1, 0.8, 1.1, 0.9, 1],
      opacity: [1, 0.7, 1, 0.8, 1],
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  }

  const arrowVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "backOut",
        delay: 0.3
      }
    },
    animate: {
      y: [0, -12, 0],
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const OwlAnalystScrollButton = () => (
    <div className="relative flex items-center justify-center space-x-1">
      {/* POS Terminal to the left */}
      <div className="flex-shrink-0 mr-1">
        <POSTerminal size="xs" animated={isHovered || isScrolling} />
      </div>
      
      {/* Enlarged Owl to the right */}
      <motion.div 
        className="relative flex-shrink-0"
        variants={owlContainerVariants}
        animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
      >
        {/* Enlarged Owl SVG */}
        <svg
          viewBox="0 0 60 60"
          className="w-10 h-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sparkles Effect on Hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={`sparkle-${i}`}
                    cx={20 + (i * 6)}
                    cy={10 + (i % 2) * 8}
                    r="1"
                    fill="oklch(0.85 0.15 220)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                      y: [0, -8, -16]
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Owl Body */}
          <ellipse
            cx="30"
            cy="40"
            rx="16"
            ry="20"
            fill="oklch(0.55 0.22 240)"
            className="drop-shadow-md"
          />
          
          {/* Owl Head */}
          <motion.circle
            cx="30"
            cy="25"
            r="18"
            fill="oklch(0.65 0.18 220)"
            className="drop-shadow-md"
            animate={isHovered ? {
              scale: [1, 1.05, 1],
              rotate: [0, -2, 2, 0]
            } : {}}
            transition={{ duration: 0.8 }}
          />
          
          {/* Animated Ear Tufts */}
          <motion.path
            d="M20 12 L22 4 L28 10 Z"
            fill="oklch(0.55 0.22 240)"
            animate={isHovered ? {
              rotate: [0, -8, 8, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d="M40 12 L38 4 L32 10 Z"
            fill="oklch(0.55 0.22 240)"
            animate={isHovered ? {
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          
          {/* Eyes */}
          <motion.g
            animate={isHovered ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <circle cx="25" cy="22" r="5" fill="white" />
            <circle cx="35" cy="22" r="5" fill="white" />
            <circle cx="25" cy="22" r="3.5" fill="oklch(0.15 0.08 240)" />
            <circle cx="35" cy="22" r="3.5" fill="oklch(0.15 0.08 240)" />
            <circle cx="26" cy="20" r="1.5" fill="white" opacity="0.9" />
            <circle cx="36" cy="20" r="1.5" fill="white" opacity="0.9" />
          </motion.g>
          
          {/* Animated Glasses */}
          <motion.g 
            opacity="0.7"
            animate={isHovered ? {
              opacity: [0.7, 1, 0.7]
            } : {}}
            transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
          >
            <circle cx="25" cy="22" r="6" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1" />
            <circle cx="35" cy="22" r="6" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1" />
            <line x1="31" y1="22" x2="29" y2="22" stroke="oklch(0.25 0.08 240)" strokeWidth="1" />
          </motion.g>
          
          {/* Beak */}
          <motion.path
            d="M30 28 L26 33 L34 33 Z"
            fill="oklch(0.75 0.15 60)"
            animate={isHovered ? {
              scale: [1, 1.1, 1],
              rotate: [0, -3, 3, 0]
            } : {}}
            transition={{ duration: 0.8 }}
          />
          
          {/* Animated Wings */}
          <motion.ellipse
            cx="18"
            cy="35"
            rx="5"
            ry="12"
            fill="oklch(0.45 0.20 240)"
            animate={isHovered ? {
              rotate: [0, -15, 10, -10, 0],
              y: [0, -1, 0]
            } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "18px 32px" }}
          />
          <motion.ellipse
            cx="42"
            cy="35"
            rx="5"
            ry="12"
            fill="oklch(0.45 0.20 240)"
            animate={isHovered ? {
              rotate: [0, 15, -10, 10, 0],
              y: [0, -1, 0]
            } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "42px 32px" }}
          />
          
          {/* Chest Pattern */}
          <motion.ellipse
            cx="30"
            cy="36"
            rx="8"
            ry="6"
            fill="oklch(0.75 0.12 220)"
            opacity="0.7"
            animate={isHovered ? {
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.9, 0.7]
            } : {}}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          />
          
          {/* Feet */}
          <ellipse cx="26" cy="55" r="3" fill="oklch(0.75 0.15 60)" />
          <ellipse cx="34" cy="55" r="3" fill="oklch(0.75 0.15 60)" />
        </svg>
      </motion.div>
      
      {/* Animated up arrow on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            variants={arrowVariants}
            initial="hidden"
            animate={["visible", "animate"]}
            exit="hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent drop-shadow-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L6 10H10V20H14V10H18L12 4Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg backdrop-blur-sm border border-border/50 hover:shadow-xl cursor-pointer z-50"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: "oklch(0.98 0.02 240 / 0.9)"
          }}
        >
          <OwlAnalystScrollButton />
        </motion.button>
      )}
    </AnimatePresence>
  )
}