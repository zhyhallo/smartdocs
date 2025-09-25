import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type OwlVariant = 'default' | 'happy' | 'sleepy'
type OwlSize = 'small' | 'medium' | 'large'

interface OwlMascotProps {
  variant?: OwlVariant
  size?: OwlSize
  className?: string
  autoAnimate?: boolean
}

export const OwlMascot: React.FC<OwlMascotProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  autoAnimate = true
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 })
  const [showSparkles, setShowSparkles] = useState(false)

  // Size classes
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  // Auto blink effect
  useEffect(() => {
    if (!autoAnimate) return
    
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(blinkTimer)
  }, [autoAnimate])

  // Auto look around effect
  useEffect(() => {
    if (!autoAnimate) return

    const lookTimer = setInterval(() => {
      const x = (Math.random() - 0.5) * 4
      const y = (Math.random() - 0.5) * 3
      setLookDirection({ x, y })
      
      setTimeout(() => {
        setLookDirection({ x: 0, y: 0 })
      }, 1500)
    }, 4000 + Math.random() * 3000)

    return () => clearInterval(lookTimer)
  }, [autoAnimate])

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowSparkles(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTimeout(() => setShowSparkles(false), 500)
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
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    },
    float: {
      y: [0, -5, 0, -3, 0],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
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
        {(showSparkles || isHovered) && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                  y: [0, -20, -40]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                <span className="text-lg">✨</span>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default OwlMascot