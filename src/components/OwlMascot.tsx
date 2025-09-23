import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface OwlMascotProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
  animated?: boolean
  variant?: "default" | "analyst" | "loader"
}

export default function OwlMascot({ 
  size = "md", 
  className = "", 
  animated = true, 
  variant = "default" 
}: OwlMascotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isLookingAround, setIsLookingAround] = useState(false)
  
  const sizeClasses = {
    xs: "w-6 h-6 sm:w-10 sm:h-10",      // Very small - зменшено на мобільних на 50%
    sm: "w-6 h-6 sm:w-14 sm:h-14",      // Small - зменшено на мобільних на 50%
    md: "w-8 h-8 sm:w-20 sm:h-20",      // Medium - зменшено на мобільних на 50%
    lg: "w-18 h-18 sm:w-42 sm:h-42",    // Large - зменшено на мобільних на 50%
    xl: "w-24 h-24 sm:w-54 sm:h-54",    // Extra large - зменшено на мобільних на 50%
    "2xl": "w-30 h-30 sm:w-72 sm:h-72"  // Super large для hero - зменшено на мобільних на 50%
  }

  // Blink animation timer
  useEffect(() => {
    if (!animated || variant === "loader") return
    
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 4000 + Math.random() * 3000)

    return () => clearInterval(blinkTimer)
  }, [animated, variant])

  // Look around animation timer
  useEffect(() => {
    if (!animated || variant === "loader") return
    
    const lookTimer = setInterval(() => {
      setIsLookingAround(true)
      setTimeout(() => setIsLookingAround(false), 2000)
    }, 8000 + Math.random() * 4000)

    return () => clearInterval(lookTimer)
  }, [animated, variant])

  const handleMouseEnter = () => {
    if (variant === "loader") return
    setIsHovered(true)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2000)
  }

  const handleMouseLeave = () => {
    if (variant === "loader") return
    setIsHovered(false)
  }

  // Loader variant
  if (variant === "loader") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          className={`relative ${sizeClasses[size]}`}
          animate={{
            rotate: [0, -8, 8, -5, 5, 0],
            y: [0, -2, 0, -1, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-primary rounded-full shadow-lg"
            animate={{
              scale: [1, 1.05, 1, 1.02, 1],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex space-x-1">
                {[0, 1].map((i) => (
                  <motion.div 
                    key={i}
                    className="w-2 h-2 bg-white rounded-full relative shadow-inner"
                    animate={{
                      scaleY: [1, 0.1, 1, 1, 1, 1, 1, 0.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-accent rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="ml-3 flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
                y: [0, -4, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Main owl variants
  const owlVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    },
    hover: {
      scale: 1.15,
      rotate: [0, -3, 3, -2, 2, 0],
      y: [-2, -8, -4, -6, -2],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    float: {
      y: [-2, 2, -2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const OwlSVG = () => (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sparkles Effect */}
      <AnimatePresence>
        {showSparkles && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={`sparkle-${i}`}
                cx={60 + (i * 15)}
                cy={30 + (i % 3) * 20}
                r="2"
                fill="oklch(0.85 0.15 220)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -10, -20]
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
        cx="100"
        cy="130"
        rx="45"
        ry="55"
        fill="oklch(0.55 0.22 240)"
        className="drop-shadow-md"
      />
      
      {/* Owl Head */}
      <motion.circle
        cx="100"
        cy="80"
        r="50"
        fill="oklch(0.65 0.18 220)"
        className="drop-shadow-md"
        animate={
          isLookingAround || isHovered ? {
            rotate: [0, -8, 8, -5, 0],
          } : {}
        }
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Ear Tufts */}
      <motion.path
        d="M70 45 L75 25 L85 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={isHovered ? { rotate: [-2, 2, -2] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M130 45 L125 25 L115 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={isHovered ? { rotate: [2, -2, 2] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
      />
      
      {/* Eyes Background */}
      <circle cx="85" cy="75" r="18" fill="white" />
      <circle cx="115" cy="75" r="18" fill="white" />
      
      {/* Pupils with blink */}
      <motion.circle 
        cx="85" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        animate={
          isBlinking ? { scaleY: 0.1 } : 
          isHovered ? { scaleY: [1, 0.8, 1.2, 1], scaleX: [1, 1.1, 0.9, 1] } : {}
        }
        transition={{ duration: isBlinking ? 0.1 : 0.4 }}
      />
      <motion.circle 
        cx="115" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        animate={
          isBlinking ? { scaleY: 0.1 } : 
          isHovered ? { scaleY: [1, 0.8, 1.2, 1], scaleX: [1, 1.1, 0.9, 1] } : {}
        }
        transition={{ duration: isBlinking ? 0.1 : 0.4 }}
      />
      
      {/* Eye shine */}
      <circle cx="88" cy="72" r="3" fill="white" />
      <circle cx="118" cy="72" r="3" fill="white" />
      
      {/* Beak */}
      <path
        d="M100 85 L90 95 L110 95 Z"
        fill="oklch(0.75 0.15 60)"
      />
      
      {/* Wings */}
      <motion.ellipse
        cx="75"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        animate={
          isHovered ? {
            rotate: [0, -25, 15, -20, 10, -15, 5, 0],
            y: [0, -2, -1, -3, -1, -2, 0, 0]
          } : {}
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "75px 120px" }}
      />
      <motion.ellipse
        cx="125"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        animate={
          isHovered ? {
            rotate: [0, 25, -15, 20, -10, 15, -5, 0],
            y: [0, -2, -1, -3, -1, -2, 0, 0]
          } : {}
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "125px 120px" }}
      />
      
      {/* Chest Pattern */}
      <ellipse
        cx="100"
        cy="120"
        rx="20"
        ry="15"
        fill="oklch(0.75 0.12 220)"
        opacity="0.7"
      />
      
      {/* Feet */}
      <ellipse cx="90" cy="175" rx="8" ry="4" fill="oklch(0.75 0.15 60)" />
      <ellipse cx="110" cy="175" rx="8" ry="4" fill="oklch(0.75 0.15 60)" />
      
      {/* Glasses for analyst variant */}
      {variant === "analyst" && (
        <motion.g 
          opacity="0.7"
          animate={
            isHovered ? { 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            } : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <circle cx="85" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2" />
          <circle cx="115" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2" />
          <line x1="105" y1="75" x2="95" y2="75" stroke="oklch(0.25 0.08 240)" strokeWidth="2" />
        </motion.g>
      )}
    </svg>
  )

  if (!animated) {
    return <OwlSVG />
  }

  return (
    <motion.div
      variants={owlVariants}
      initial="initial"
      animate={["animate", "float"]}
      whileHover="hover"
      className="cursor-pointer relative max-w-fit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex-shrink-0">
        <OwlSVG />
      </div>
      
      {/* Interactive sparkles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-accent pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 60 - 30,
                  y: Math.random() * 40 - 20
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  y: [0, -30, -60],
                  rotate: [0, 180, 360]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                style={{
                  fontSize: `${8 + i * 2}px`,
                  left: `${50 + Math.random() * 20 - 10}%`,
                  top: `${50 + Math.random() * 20 - 10}%`,
                  position: 'absolute',
                  pointerEvents: 'none'
                }}
              >
                💙
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}