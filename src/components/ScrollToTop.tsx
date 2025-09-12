import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
    <div className="relative flex items-center justify-center">
      {/* Main owl and terminal container */}
      <motion.div 
        className="relative flex items-center gap-2"
        variants={owlContainerVariants}
        animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
      >
        {/* Owl SVG */}
        <svg
          viewBox="0 0 60 60"
          className="w-8 h-8 flex-shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Owl Body */}
          <ellipse
            cx="30"
            cy="38"
            rx="14"
            ry="18"
            fill="oklch(0.55 0.22 240)"
            className="drop-shadow-sm"
          />
          
          {/* Owl Head */}
          <circle
            cx="30"
            cy="25"
            r="15"
            fill="oklch(0.65 0.18 220)"
            className="drop-shadow-sm"
          />
          
          {/* Eyes */}
          <circle cx="26" cy="22" r="4" fill="white" />
          <circle cx="34" cy="22" r="4" fill="white" />
          <circle cx="26" cy="22" r="2.5" fill="oklch(0.15 0.08 240)" />
          <circle cx="34" cy="22" r="2.5" fill="oklch(0.15 0.08 240)" />
          <circle cx="27" cy="21" r="1" fill="white" opacity="0.8" />
          <circle cx="35" cy="21" r="1" fill="white" opacity="0.8" />
          
          {/* Glasses */}
          <g opacity="0.7">
            <circle cx="26" cy="22" r="5" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="0.8" />
            <circle cx="34" cy="22" r="5" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="0.8" />
            <line x1="31" y1="22" x2="29" y2="22" stroke="oklch(0.25 0.08 240)" strokeWidth="0.8" />
          </g>
          
          {/* Beak */}
          <path
            d="M30 26 L27 30 L33 30 Z"
            fill="oklch(0.75 0.15 60)"
          />
          
          {/* Wings */}
          <ellipse cx="22" cy="33" rx="4" ry="9" fill="oklch(0.45 0.20 240)" />
          <ellipse cx="38" cy="33" rx="4" ry="9" fill="oklch(0.45 0.20 240)" />
        </svg>

        {/* Mini Terminal */}
        <motion.div
          variants={terminalVariants}
          animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
        >
          <svg
            viewBox="0 0 32 24"
            className="w-6 h-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Terminal body */}
            <rect
              x="2"
              y="8"
              width="28"
              height="14"
              rx="2"
              fill="oklch(0.25 0.08 240)"
              className="drop-shadow-sm"
            />
            
            {/* Terminal screen */}
            <rect
              x="3"
              y="3"
              width="26"
              height="16"
              rx="1.5"
              fill="oklch(0.15 0.05 240)"
            />
            
            {/* Terminal base */}
            <rect
              x="14"
              y="19"
              width="4"
              height="2"
              fill="oklch(0.35 0.08 240)"
            />
            
            {/* Screen glow */}
            <rect
              x="3"
              y="3"
              width="26"
              height="16"
              rx="1.5"
              fill="url(#miniGlow)"
              opacity="0.4"
            />
            
            {/* Data lines */}
            <g className="text-accent" fontSize="2" fontFamily="monospace">
              <rect x="5" y="6" width="8" height="1" fill="oklch(0.65 0.18 220)" opacity="0.8" />
              <rect x="5" y="9" width="12" height="1" fill="oklch(0.65 0.18 220)" opacity="0.6" />
              <rect x="5" y="12" width="6" height="1" fill="oklch(0.65 0.18 220)" opacity="0.7" />
            </g>
            
            <defs>
              <linearGradient id="miniGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "oklch(0.65 0.18 220)", stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: "oklch(0.65 0.18 220)", stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Animated up arrow on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            variants={arrowVariants}
            initial="hidden"
            animate={["visible", "animate"]}
            exit="hidden"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L6 10H10V20H14V10H18L12 4Z"
                fill="currentColor"
                className="drop-shadow-sm"
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