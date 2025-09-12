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

  const arrowVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    },
    animate: {
      y: [0, -8, 0],
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
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
        {/* Owl Body - matching footer colors */}
        <ellipse
          cx="50"
          cy="65"
          rx="18"
          ry="22"
          fill="oklch(0.55 0.22 240)"
          className="drop-shadow-sm"
        />
        
        {/* Owl Head - matching footer colors */}
        <circle
          cx="50"
          cy="40"
          r="20"
          fill="oklch(0.65 0.18 220)"
          className="drop-shadow-sm"
        />
        
        {/* Ear Tufts - matching footer colors */}
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
        
        {/* Eyes with animation - matching footer colors */}
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
        
        {/* Beak - matching footer colors */}
        <path
          d="M50 42 L45 47 L55 47 Z"
          fill="oklch(0.75 0.15 60)"
        />
        
        {/* Wings with animation - matching footer colors */}
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
        
        {/* Chest - matching footer colors */}
        <ellipse
          cx="50"
          cy="58"
          rx="8"
          ry="6"
          fill="oklch(0.75 0.12 220)"
          opacity="0.7"
        />
        
        {/* Feet - matching footer colors */}
        <ellipse cx="45" cy="82" rx="3" ry="2" fill="oklch(0.75 0.15 60)" />
        <ellipse cx="55" cy="82" rx="3" ry="2" fill="oklch(0.75 0.15 60)" />

        {/* Glasses for tech look - matching footer */}
        <circle cx="43" cy="37" r="9" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1" opacity="0.4" />
        <circle cx="57" cy="37" r="9" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1" opacity="0.4" />
        <line x1="52" y1="37" x2="48" y2="37" stroke="oklch(0.25 0.08 240)" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* Upward Arrow Animation on Hover */}
      <AnimatePresence>
        {isHovered && !isScrolling && (
          <>
            {/* Main animated arrow */}
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2"
              variants={arrowVariants}
              initial="hidden"
              animate="animate"
              exit="hidden"
            >
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm"
              >
                <path
                  d="M12 2L7 7L8.41 8.41L11 5.83V14H13V5.83L15.59 8.41L17 7L12 2Z"
                  fill="oklch(0.65 0.18 220)"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>

            {/* Additional floating arrows for more effect */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`arrow-${i}`}
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{
                  top: `-${20 + i * 8}px`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  y: 10
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1, 0.5],
                  y: [10, -10, -30]
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <svg
                  width={`${16 - i * 2}`}
                  height={`${12 - i * 1}`}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1L4 5L5.41 6.41L7 4.83V10H9V4.83L10.59 6.41L12 5L8 1Z"
                    fill={`oklch(${0.65 + i * 0.1} 0.18 220)`}
                    opacity={0.7 - i * 0.1}
                  />
                </svg>
              </motion.div>
            ))}

            {/* Text indicator */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 5
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.8],
                y: [5, 0, 0, -5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-xs font-medium text-accent bg-white px-2 py-1 rounded-full shadow-sm border border-border/20">
                Вгору
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
          className="fixed bottom-6 right-6 z-50 rounded-full p-3 cursor-pointer group bg-transparent"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
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