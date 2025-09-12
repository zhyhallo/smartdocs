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
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    },
    scrolling: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  const owlVariants = {
    normal: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      y: [-1, -3, -1],
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    scrolling: {
      y: [0, -15, -8, -20, -5, -25, 0],
      rotate: [0, -10, 5, -15, 8, -5, 0],
      scale: [1, 1.1, 1.05, 1.15, 1.08, 1.12, 1],
      transition: {
        duration: 1.2,
        ease: "easeOut",
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
      }
    }
  }

  const wingVariants = {
    normal: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      rotate: [0, -15, 10, -10, 5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    scrolling: {
      rotate: [0, -30, 25, -35, 20, -40, 0],
      y: [0, -3, -1, -4, -2, -5, 0],
      transition: {
        duration: 1.2,
        ease: "easeOut",
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
      }
    }
  }

  const eyeVariants = {
    normal: {
      scaleY: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      scaleY: [1, 0.2, 1.2, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }
    },
    scrolling: {
      scaleY: [1, 0.1, 1.3, 1, 0.2, 1.4, 1],
      scaleX: [1, 1.1, 0.9, 1.2, 0.8, 1.1, 1],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
      }
    }
  }

  const ScrollOwl = () => (
    <motion.div
      variants={owlVariants}
      initial="normal"
      animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
      className="flex items-center justify-center w-12 h-12 relative"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Owl Body */}
        <ellipse
          cx="50"
          cy="65"
          rx="18"
          ry="22"
          fill="oklch(0.55 0.22 240)"
          className="drop-shadow-sm"
        />
        
        {/* Owl Head */}
        <circle
          cx="50"
          cy="40"
          r="20"
          fill="oklch(0.65 0.18 220)"
          className="drop-shadow-sm"
        />
        
        {/* Ear Tufts */}
        <path
          d="M35 25 L38 15 L42 25 Z"
          fill="oklch(0.55 0.22 240)"
        />
        <path
          d="M65 25 L62 15 L58 25 Z"
          fill="oklch(0.55 0.22 240)"
        />
        
        {/* Eyes Background */}
        <circle cx="43" cy="37" r="7" fill="white" />
        <circle cx="57" cy="37" r="7" fill="white" />
        
        {/* Eyes with animation */}
        <motion.circle 
          cx="43" 
          cy="37" 
          r="5" 
          fill="oklch(0.15 0.08 240)"
          variants={eyeVariants}
          animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
        />
        <motion.circle 
          cx="57" 
          cy="37" 
          r="5" 
          fill="oklch(0.15 0.08 240)"
          variants={eyeVariants}
          animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
        />
        
        {/* Eye shine */}
        <circle cx="45" cy="35" r="1.5" fill="white" />
        <circle cx="59" cy="35" r="1.5" fill="white" />
        
        {/* Beak */}
        <path
          d="M50 42 L45 47 L55 47 Z"
          fill="oklch(0.75 0.15 60)"
        />
        
        {/* Wings with animation */}
        <motion.ellipse
          cx="37"
          cy="60"
          rx="6"
          ry="10"
          fill="oklch(0.45 0.20 240)"
          variants={wingVariants}
          animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
          style={{ transformOrigin: "37px 58px" }}
        />
        <motion.ellipse
          cx="63"
          cy="60"
          rx="6"
          ry="10"
          fill="oklch(0.45 0.20 240)"
          variants={wingVariants}
          animate={isScrolling ? "scrolling" : isHovered ? "hover" : "normal"}
          style={{ transformOrigin: "63px 58px", transform: "scaleX(-1)" }}
        />
        
        {/* Chest */}
        <ellipse
          cx="50"
          cy="58"
          rx="8"
          ry="6"
          fill="oklch(0.75 0.12 220)"
          opacity="0.7"
        />
        
        {/* Feet */}
        <ellipse cx="45" cy="82" rx="3" ry="2" fill="oklch(0.75 0.15 60)" />
        <ellipse cx="55" cy="82" rx="3" ry="2" fill="oklch(0.75 0.15 60)" />
      </svg>

      {/* Flying trail particles during scroll */}
      <AnimatePresence>
        {isScrolling && (
          <>
            {/* Wind trail lines */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`wind-${i}`}
                className="absolute w-px bg-accent/40 rounded-full"
                style={{
                  left: `${30 + i * 6}%`,
                  top: `${60 + i * 4}%`,
                  height: '3px',
                }}
                initial={{
                  opacity: 0,
                  scaleY: 0.5,
                  x: 0
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scaleY: [0.5, 2, 0.5],
                  x: [0, -15, -30],
                  y: [0, 5, -10]
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Feather particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`feather-${i}`}
                className="absolute text-xs opacity-60"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 20 - 10,
                  y: 10
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  y: [10, -25, -45],
                  x: [Math.random() * 20 - 10, Math.random() * 30 - 15, Math.random() * 40 - 20],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  color: 'oklch(0.65 0.18 220)',
                  fontSize: '6px'
                }}
              >
                🪶
              </motion.div>
            ))}

            {/* Magic sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: 'oklch(0.85 0.15 220)',
                  left: `${40 + Math.random() * 20}%`,
                  top: `${40 + Math.random() * 20}%`
                }}
                initial={{
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -20, -40],
                  x: [0, Math.sin(i) * 10, Math.sin(i * 2) * 15]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Hover glow effect */}
      <AnimatePresence>
        {(isHovered || isScrolling) && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, oklch(0.85 0.15 220 / 0.2) 0%, transparent 70%)',
              transform: 'scale(1.5)'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [1.5, 2, 1.5]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 scroll-to-top-button rounded-full p-2 shadow-lg hover:shadow-xl cursor-pointer border border-border/20 group"
          variants={buttonVariants}
          initial="hidden"
          animate={isScrolling ? "scrolling" : "visible"}
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={scrollToTop}
          aria-label="Прокрутити до верху"
          title="Повернутися до верху - натисни на сову!"
        >
          <ScrollOwl />
        </motion.button>
      )}
    </AnimatePresence>
  )
}