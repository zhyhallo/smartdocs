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
      {/* Sparkles animation for interactive elements */}
      <AnimatePresence>
        {showSparkles && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={`sparkle-${i}`}
                cx={30 + (i * 30) + Math.sin(i) * 20}
                cy={30 + (i % 3) * 50}
                r="2"
                fill="url(#sparkleGradient)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360],
                  y: [0, -20, -40]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: "easeOut",
                  repeat: 1
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <defs>
        {/* Owl body gradient */}
        <radialGradient id="owlBodyGradient" cx="0.5" cy="0.4" r="0.8">
          <stop offset="0%" stopColor="oklch(0.85 0.08 260)" />
          <stop offset="50%" stopColor="oklch(0.75 0.12 250)" />
          <stop offset="100%" stopColor="oklch(0.65 0.15 240)" />
        </radialGradient>

        {/* Wing gradient */}
        <linearGradient id="wingGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.15 250)" />
          <stop offset="100%" stopColor="oklch(0.6 0.18 240)" />
        </linearGradient>

        {/* Eye gradient */}
        <radialGradient id="eyeGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="oklch(0.95 0.02 180)" />
          <stop offset="70%" stopColor="oklch(0.90 0.05 200)" />
          <stop offset="100%" stopColor="oklch(0.80 0.08 220)" />
        </radialGradient>

        {/* Beak gradient */}
        <linearGradient id="beakGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.75 0.15 70)" />
          <stop offset="100%" stopColor="oklch(0.65 0.20 60)" />
        </linearGradient>

        {/* Sparkle gradient */}
        <radialGradient id="sparkleGradient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="oklch(0.85 0.15 280)" />
          <stop offset="100%" stopColor="oklch(0.70 0.20 270)" />
        </radialGradient>

        {/* Shadow filter */}
        <filter id="owlShadow" x="-50%" y="-30%" width="200%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* Shadow behind owl */}
      <motion.ellipse
        cx="100"
        cy="165"
        rx="45"
        ry="8"
        fill="oklch(0.3 0.05 260)"
        opacity="0.2"
        animate={{
          rx: [40, 50, 40],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main owl body */}
      <motion.ellipse
        cx="100"
        cy="120"
        rx="50"
        ry="45"
        fill="url(#owlBodyGradient)"
        filter="url(#owlShadow)"
        animate={{
          ry: [44, 46, 44],
          rx: [49, 51, 49]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Owl head (slightly overlapping body) */}
      <motion.circle
        cx="100"
        cy="85"
        r="42"
        fill="url(#owlBodyGradient)"
        animate={{
          r: [41, 43, 41]
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Left wing */}
      <motion.ellipse
        cx="70"
        cy="125"
        rx="18"
        ry="35"
        fill="url(#wingGradient)"
        animate={
          variant === "happy" ? {
            rotate: [-5, -15, -5],
            rx: [18, 20, 18]
          } : {
            rotate: [-8, -5, -8]
          }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Right wing */}
      <motion.ellipse
        cx="130"
        cy="125"
        rx="18"
        ry="35"
        fill="url(#wingGradient)"
        animate={
          variant === "happy" ? {
            rotate: [5, 15, 5],
            rx: [18, 20, 18]
          } : {
            rotate: [8, 5, 8]
          }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Ear tufts */}
      <motion.ellipse
        cx="82"
        cy="55"
        rx="6"
        ry="15"
        fill="url(#wingGradient)"
        transform="rotate(-20 82 55)"
        animate={{
          ry: [14, 16, 14],
          rotate: [-22, -18, -22]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.ellipse
        cx="118"
        cy="55"
        rx="6"
        ry="15"
        fill="url(#wingGradient)"
        transform="rotate(20 118 55)"
        animate={{
          ry: [14, 16, 14],
          rotate: [22, 18, 22]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Large owl eyes */}
      <motion.circle
        cx="88"
        cy="80"
        r="16"
        fill="url(#eyeGradient)"
        stroke="oklch(0.6 0.15 240)"
        strokeWidth="1"
        animate={{
          r: isBlinking ? [16, 2, 16] : [15.5, 16.5, 15.5]
        }}
        transition={{
          duration: isBlinking ? 0.3 : 3,
          repeat: isBlinking ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.circle
        cx="112"
        cy="80"
        r="16"
        fill="url(#eyeGradient)"
        stroke="oklch(0.6 0.15 240)"
        strokeWidth="1"
        animate={{
          r: isBlinking ? [16, 2, 16] : [15.5, 16.5, 15.5]
        }}
        transition={{
          duration: isBlinking ? 0.3 : 3,
          repeat: isBlinking ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pupils */}
      <motion.circle
        cx={88 + lookDirection.x * 2}
        cy={80 + lookDirection.y * 2}
        r="6"
        fill="oklch(0.2 0.1 260)"
        animate={{
          r: isBlinking ? [6, 0, 6] : [5.5, 6.5, 5.5]
        }}
        transition={{
          duration: isBlinking ? 0.3 : 2,
          repeat: isBlinking ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.circle
        cx={112 + lookDirection.x * 2}
        cy={80 + lookDirection.y * 2}
        r="6"
        fill="oklch(0.2 0.1 260)"
        animate={{
          r: isBlinking ? [6, 0, 6] : [5.5, 6.5, 5.5]
        }}
        transition={{
          duration: isBlinking ? 0.3 : 2,
          repeat: isBlinking ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Eye highlights */}
      <motion.circle
        cx={90 + lookDirection.x}
        cy={78 + lookDirection.y}
        r="2"
        fill="oklch(0.95 0.02 180)"
        animate={{
          opacity: isBlinking ? [1, 0, 1] : [0.8, 1, 0.8],
          r: [1.5, 2.5, 1.5]
        }}
        transition={{
          duration: isBlinking ? 0.3 : 2.5,
          repeat: isBlinking ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.circle
        cx={114 + lookDirection.x}
        cy={78 + lookDirection.y}
        r="2"
        fill="oklch(0.95 0.02 180)"
        animate={{
          opacity: isBlinking ? [1, 0, 1] : [0.8, 1, 0.8],
          r: [1.5, 2.5, 1.5]
        }}
        transition={{
          duration: isBlinking ? 0.3 : 2.5,
          repeat: isBlinking ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beak */}
      <motion.path
        d="M100 95 L95 105 L105 105 Z"
        fill="url(#beakGradient)"
        animate={
          variant === "happy" ? {
            d: [
              "M100 95 L95 105 L105 105 Z",
              "M100 95 L94 106 L106 106 Z", 
              "M100 95 L95 105 L105 105 Z"
            ]
          } : {
            scale: [1, 1.05, 1]
          }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Chest pattern */}
      <motion.ellipse
        cx="100"
        cy="135"
        rx="25"
        ry="20"
        fill="oklch(0.80 0.06 250)"
        opacity="0.6"
        animate={{
          ry: [19, 21, 19],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Chest feather lines */}
      {[...Array(3)].map((_, i) => (
        <motion.line
          key={`feather-${i}`}
          x1="100"
          y1={125 + i * 8}
          x2="100"
          y2={132 + i * 8}
          stroke="oklch(0.70 0.10 240)"
          strokeWidth="1.5"
          opacity="0.4"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            y1: [125 + i * 8, 124 + i * 8, 125 + i * 8]
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Feet */}
      <motion.ellipse
        cx="85"
        cy="160"
        rx="8"
        ry="4"
        fill="url(#beakGradient)"
        animate={{
          ry: [3.5, 4.5, 3.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.ellipse
        cx="115"
        cy="160"
        rx="8"
        ry="4"
        fill="url(#beakGradient)"
        animate={{
          ry: [3.5, 4.5, 3.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Claws */}
      {[...Array(6)].map((_, i) => (
        <motion.line
          key={`claw-${i}`}
          x1={80 + (i % 3) * 3 + (i >= 3 ? 32 : 0)}
          y1="162"
          x2={80 + (i % 3) * 3 + (i >= 3 ? 32 : 0)}
          y2="167"
          stroke="oklch(0.4 0.15 50)"
          strokeWidth="1"
          animate={{
            y2: [166, 168, 166]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      ))}
    </svg>
  )
      <motion.ellipse
        cx="100"
        cy="140"
        rx="60"
        ry="70"
        fill="url(#owlGlow)"
        opacity="0.3"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="owlGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.75 0.15 240)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="oklch(0.65 0.18 220)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.60 0.20 240)"/>
          <stop offset="100%" stopColor="oklch(0.50 0.24 240)"/>
        </linearGradient>
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.70 0.16 220)"/>
          <stop offset="100%" stopColor="oklch(0.60 0.20 220)"/>
        </linearGradient>
      </defs>

      {/* Owl Body with gradient and modern styling */}
      <ellipse
        cx="100"
        cy="130"
        rx="45"
        ry="55"
        fill="url(#bodyGrad)"
        className="drop-shadow-lg filter"
      />
      
      {/* Subtle body pattern - tech inspired */}
      <motion.g opacity="0.2">
        <path d="M75 110 L125 110" stroke="oklch(0.85 0.10 240)" strokeWidth="1" />
        <path d="M80 120 L120 120" stroke="oklch(0.85 0.10 240)" strokeWidth="0.5" />
        <path d="M85 140 L115 140" stroke="oklch(0.85 0.10 240)" strokeWidth="0.5" />
        <path d="M80 155 L120 155" stroke="oklch(0.85 0.10 240)" strokeWidth="0.5" />
      </motion.g>
      
      {/* Owl Head with gradient */}
      <motion.circle
        cx="100"
        cy="80"
        r="50"
        fill="url(#headGrad)"
        className="drop-shadow-lg filter"
        animate={
          isLookingAround || isHovered ? {
            rotate: [0, -8, 8, -5, 0],
          } : {}
        }
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Modern Ear Tufts - more tech-like */}
      <motion.path
        d="M70 45 L75 25 L85 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={isHovered ? { rotate: [-2, 2, -2] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="drop-shadow-sm"
      />
      <motion.path
        d="M130 45 L125 25 L115 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={isHovered ? { rotate: [2, -2, 2] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
        className="drop-shadow-sm"
      />
      
      {/* Eye Background with subtle glow */}
      <circle cx="85" cy="75" r="18" fill="white" className="drop-shadow-sm" />
      <circle cx="115" cy="75" r="18" fill="white" className="drop-shadow-sm" />
      
      {/* Eye outer rings for depth */}
      <circle cx="85" cy="75" r="16" fill="none" stroke="oklch(0.90 0.05 240)" strokeWidth="1" opacity="0.3" />
      <circle cx="115" cy="75" r="16" fill="none" stroke="oklch(0.90 0.05 240)" strokeWidth="1" opacity="0.3" />
      
      {/* Enhanced Pupils with blink and expressions */}
      <motion.circle 
        cx="85" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        animate={
          isBlinking ? { scaleY: 0.1 } : 
          isHovered ? { 
            scaleY: [1, 0.8, 1.2, 1], 
            scaleX: [1, 1.1, 0.9, 1],
            fill: ["oklch(0.15 0.08 240)", "oklch(0.25 0.15 240)", "oklch(0.15 0.08 240)"]
          } : {}
        }
        transition={{ duration: isBlinking ? 0.1 : 0.6 }}
        className="drop-shadow-sm"
      />
      <motion.circle 
        cx="115" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        animate={
          isBlinking ? { scaleY: 0.1 } : 
          isHovered ? { 
            scaleY: [1, 0.8, 1.2, 1], 
            scaleX: [1, 1.1, 0.9, 1],
            fill: ["oklch(0.15 0.08 240)", "oklch(0.25 0.15 240)", "oklch(0.15 0.08 240)"]
          } : {}
        }
        transition={{ duration: isBlinking ? 0.1 : 0.6 }}
        className="drop-shadow-sm"
      />
      
      {/* Enhanced eye shine with multiple reflections */}
      <circle cx="88" cy="72" r="3" fill="white" />
      <circle cx="118" cy="72" r="3" fill="white" />
      <circle cx="82" cy="78" r="1.5" fill="white" opacity="0.6" />
      <circle cx="112" cy="78" r="1.5" fill="white" opacity="0.6" />
      
      {/* Modern Beak with gradient */}
      <path
        d="M100 85 L90 95 L110 95 Z"
        fill="oklch(0.75 0.15 60)"
        className="drop-shadow-sm"
      />
      <path
        d="M100 85 L95 90 L105 90 Z"
        fill="oklch(0.85 0.10 60)"
        opacity="0.7"
      />
      
      {/* Enhanced Wings with better animation */}
      <motion.ellipse
        cx="75"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        animate={
          isHovered ? {
            rotate: [0, -25, 15, -20, 10, -15, 5, 0],
            y: [0, -2, -1, -3, -1, -2, 0, 0],
            scale: [1, 1.05, 1]
          } : {}
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "75px 120px" }}
        className="drop-shadow-md"
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
            y: [0, -2, -1, -3, -1, -2, 0, 0],
            scale: [1, 1.05, 1]
          } : {}
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "125px 120px" }}
        className="drop-shadow-md"
      />
      
      {/* Wing details - feather patterns */}
      <motion.ellipse
        cx="75"
        cy="120"
        rx="8"
        ry="15"
        fill="oklch(0.40 0.22 240)"
        opacity="0.6"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.2 }}
      />
      <motion.ellipse
        cx="125"
        cy="120"
        rx="8"
        ry="15"
        fill="oklch(0.40 0.22 240)"
        opacity="0.6"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.2 }}
      />
      
      {/* Enhanced Chest Pattern - more detailed */}
      <ellipse
        cx="100"
        cy="120"
        rx="25"
        ry="18"
        fill="oklch(0.75 0.12 220)"
        opacity="0.5"
      />
      <ellipse
        cx="100"
        cy="125"
        rx="18"
        ry="12"
        fill="oklch(0.80 0.08 220)"
        opacity="0.4"
      />
      
      {/* Tech-inspired chest pattern */}
      <motion.g opacity="0.3">
        <rect x="92" y="115" width="16" height="1" rx="0.5" fill="oklch(0.85 0.10 240)" />
        <rect x="95" y="120" width="10" height="1" rx="0.5" fill="oklch(0.85 0.10 240)" />
        <rect x="97" y="125" width="6" height="1" rx="0.5" fill="oklch(0.85 0.10 240)" />
      </motion.g>
      
      {/* Enhanced Feet with better detail */}
      <ellipse cx="90" cy="175" rx="10" ry="5" fill="oklch(0.75 0.15 60)" className="drop-shadow-sm" />
      <ellipse cx="110" cy="175" rx="10" ry="5" fill="oklch(0.75 0.15 60)" className="drop-shadow-sm" />
      
      {/* Toe details */}
      <ellipse cx="85" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      <ellipse cx="95" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      <ellipse cx="105" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      <ellipse cx="115" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      
      {/* Enhanced glasses for analyst variant - more modern tech look */}
      {variant === "analyst" && (
        <motion.g 
          opacity="0.8"
          animate={
            isHovered ? { 
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.05, 1]
            } : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Main lens frames */}
          <circle cx="85" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2.5" />
          <circle cx="115" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2.5" />
          
          {/* Bridge */}
          <line x1="105" y1="75" x2="95" y2="75" stroke="oklch(0.25 0.08 240)" strokeWidth="2.5" />
          
          {/* Lens reflections for tech look */}
          <circle cx="85" cy="75" r="18" fill="none" stroke="oklch(0.85 0.10 220)" strokeWidth="0.5" opacity="0.6" />
          <circle cx="115" cy="75" r="18" fill="none" stroke="oklch(0.85 0.10 220)" strokeWidth="0.5" opacity="0.6" />
          
          {/* Tech-inspired HUD elements */}
          <motion.g opacity="0.4">
            <line x1="75" y1="65" x2="80" y2="65" stroke="oklch(0.60 0.15 200)" strokeWidth="0.5" />
            <line x1="120" y1="65" x2="125" y2="65" stroke="oklch(0.60 0.15 200)" strokeWidth="0.5" />
            <circle cx="85" cy="85" r="1" fill="oklch(0.60 0.15 200)" />
            <circle cx="115" cy="85" r="1" fill="oklch(0.60 0.15 200)" />
          </motion.g>
        </motion.g>
      )}

      {/* Document processing indicators for new invoice theme */}
      {variant === "default" && isHovered && (
        <motion.g>
          {/* Floating document icons */}
          <motion.rect
            x="130"
            y="60"
            width="12"
            height="16"
            rx="1"
            fill="oklch(0.80 0.12 220)"
            opacity="0.7"
            animate={{
              y: [60, 45, 60],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.g>
            <motion.line x1="132" y1="64" x2="140" y2="64" stroke="oklch(0.50 0.18 240)" strokeWidth="0.5" />
            <motion.line x1="132" y1="67" x2="138" y2="67" stroke="oklch(0.50 0.18 240)" strokeWidth="0.5" />
            <motion.line x1="132" y1="70" x2="140" y2="70" stroke="oklch(0.50 0.18 240)" strokeWidth="0.5" />
          </motion.g>
          
          {/* Processing arrow */}
          <motion.path
            d="M145 68 L155 68 M150 63 L155 68 L150 73"
            stroke="oklch(0.60 0.20 120)"
            strokeWidth="1.5"
            fill="none"
            animate={{
              x: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
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
      
      {/* Enhanced interactive elements */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Document/Invoice themed particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`invoice-${i}`}
                className="absolute pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 80 - 40,
                  y: Math.random() * 60 - 30
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -40, -80],
                  rotate: [0, Math.random() * 360]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  left: `${50 + Math.random() * 30 - 15}%`,
                  top: `${50 + Math.random() * 30 - 15}%`,
                  position: 'absolute'
                }}
              >
                <div className="w-4 h-5 bg-primary/20 rounded-sm border border-primary/40 flex flex-col justify-center items-center">
                  <div className="w-2.5 h-0.5 bg-primary/60 rounded mb-0.5"></div>
                  <div className="w-2 h-0.5 bg-primary/40 rounded mb-0.5"></div>
                  <div className="w-2.5 h-0.5 bg-primary/60 rounded"></div>
                </div>
              </motion.div>
            ))}
            
            {/* Success checkmarks for automation theme */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`check-${i}`}
                className="absolute text-green-500 font-bold pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 60 - 30,
                  y: Math.random() * 40 - 20
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -20, -40],
                  rotate: [0, 180]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.4 + 1,
                  ease: "easeOut"
                }}
                style={{
                  fontSize: `${12 + i * 2}px`,
                  left: `${50 + Math.random() * 20 - 10}%`,
                  top: `${50 + Math.random() * 20 - 10}%`,
                  position: 'absolute'
                }}
              >
                ✓
              </motion.div>
            ))}
            
            {/* Tech particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`tech-${i}`}
                className="absolute text-accent/70 font-mono text-xs pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 50 - 25,
                  y: Math.random() * 30 - 15
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -30, -60],
                  rotate: [0, Math.random() * 90 - 45]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 3,
                  delay: i * 0.2 + 0.5,
                  ease: "easeOut"
                }}
                style={{
                  left: `${50 + Math.random() * 40 - 20}%`,
                  top: `${50 + Math.random() * 40 - 20}%`,
                  position: 'absolute'
                }}
              >
                {['{ }', '</>', 'AI', '1C'][i]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}