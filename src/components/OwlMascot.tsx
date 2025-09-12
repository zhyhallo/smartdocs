import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { POSTerminal } from "@/components"

interface OwlMascotProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animated?: boolean
}

export default function OwlMascot({ size = "md", className = "", animated = true }: OwlMascotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16", 
    lg: "w-20 h-20",
    xl: "w-26 h-26"
  }

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
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
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

  const eyeBlinkVariants = {
    normal: {
      scaleY: [1, 0.1, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    },
    excited: {
      scaleY: [1, 0.8, 1.2, 1],
      scaleX: [1, 1.1, 0.9, 1],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut"
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
    flap: {
      rotate: [0, -25, 15, -20, 10, -15, 5, 0],
      y: [0, -2, -1, -3, -1, -2, 0, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
      }
    }
  }

  const headVariants = {
    normal: {
      rotate: 0,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    curious: {
      rotate: [0, -8, 12, -6, 8, -4, 6, 0],
      x: [0, -1, 2, -1, 1, -1, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
      }
    }
  }

  const pupilVariants = {
    normal: {
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    lookAround: {
      x: [0, 2, -1, 1, -2, 1, 0],
      y: [0, -1, 1, -2, 1, -1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1]
      }
    }
  }

  const glassesVariants = {
    normal: {
      scale: 1,
      opacity: 0.6,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    shine: {
      scale: [1, 1.05, 1],
      opacity: [0.6, 0.9, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowSparkles(true)
    // Hide sparkles after animation
    setTimeout(() => setShowSparkles(false), 2000)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
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
      
      {/* Owl Head with Animation */}
      <motion.circle
        cx="100"
        cy="80"
        r="50"
        fill="oklch(0.65 0.18 220)"
        className="drop-shadow-md"
        variants={headVariants}
        animate={isHovered ? "curious" : "normal"}
      />
      
      {/* Animated Ear Tufts */}
      <motion.path
        d="M70 45 L75 25 L85 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={{
          rotate: isHovered ? [0, -5, 5, 0] : 0,
          scale: isHovered ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />
      <motion.path
        d="M130 45 L125 25 L115 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={{
          rotate: isHovered ? [0, 5, -5, 0] : 0,
          scale: isHovered ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.1
        }}
      />
      
      {/* Eyes Background with glow effect */}
      <motion.circle 
        cx="85" 
        cy="75" 
        r="18" 
        fill="white"
        animate={{
          r: isHovered ? [18, 20, 18] : 18
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle 
        cx="115" 
        cy="75" 
        r="18" 
        fill="white"
        animate={{
          r: isHovered ? [18, 20, 18] : 18
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Eyes with pupils that can look around */}
      <motion.g variants={pupilVariants} animate={isHovered ? "lookAround" : "normal"}>
        <motion.circle 
          cx="85" 
          cy="75" 
          r="12" 
          fill="oklch(0.15 0.08 240)"
          variants={eyeBlinkVariants}
          animate={isHovered ? "excited" : "normal"}
        />
        <motion.circle 
          cx="115" 
          cy="75" 
          r="12" 
          fill="oklch(0.15 0.08 240)"
          variants={eyeBlinkVariants}
          animate={isHovered ? "excited" : "normal"}
        />
      </motion.g>
      
      {/* Enhanced Eye shine with animation */}
      <motion.circle 
        cx="88" 
        cy="72" 
        r="3" 
        fill="white"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [1, 0.7, 1] : 1
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0
        }}
      />
      <motion.circle 
        cx="118" 
        cy="72" 
        r="3" 
        fill="white"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [1, 0.7, 1] : 1
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
          delay: 0.3
        }}
      />
      
      {/* Animated Beak */}
      <motion.path
        d="M100 85 L90 95 L110 95 Z"
        fill="oklch(0.75 0.15 60)"
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          rotate: isHovered ? [0, -2, 2, 0] : 0
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Animated Wings */}
      <motion.ellipse
        cx="75"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        variants={wingVariants}
        animate={isHovered ? "flap" : "normal"}
        style={{ transformOrigin: "75px 120px" }}
      />
      <motion.ellipse
        cx="125"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        variants={wingVariants}
        animate={isHovered ? "flap" : "normal"}
        style={{ transformOrigin: "125px 120px", transform: "scaleX(-1)" }}
      />
      
      {/* Chest Pattern with pulse */}
      <motion.ellipse
        cx="100"
        cy="120"
        rx="20"
        ry="15"
        fill="oklch(0.75 0.12 220)"
        opacity="0.7"
        animate={{
          scale: isHovered ? [1, 1.05, 1] : 1,
          opacity: isHovered ? [0.7, 0.9, 0.7] : 0.7
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0
        }}
      />
      
      {/* Animated Feet */}
      <motion.ellipse 
        cx="90" 
        cy="175" 
        rx="8" 
        ry="4" 
        fill="oklch(0.75 0.15 60)"
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          y: isHovered ? [0, -1, 0] : 0
        }}
        transition={{ duration: 0.4 }}
      />
      <motion.ellipse 
        cx="110" 
        cy="175" 
        rx="8" 
        ry="4" 
        fill="oklch(0.75 0.15 60)"
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          y: isHovered ? [0, -1, 0] : 0
        }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      
      {/* Animated Glasses (tech touch) */}
      <motion.g variants={glassesVariants} animate={isHovered ? "shine" : "normal"}>
        <circle cx="85" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2" opacity="0.6" />
        <circle cx="115" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2" opacity="0.6" />
        <line x1="105" y1="75" x2="95" y2="75" stroke="oklch(0.25 0.08 240)" strokeWidth="2" opacity="0.6" />
      </motion.g>

      {/* Hover Effect - Magic Aura */}
      <AnimatePresence>
        {isHovered && (
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="oklch(0.85 0.15 220)"
            strokeWidth="1"
            opacity="0.3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.3, 0],
              strokeWidth: [1, 3, 1]
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>
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
      className="cursor-pointer relative flex items-center space-x-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* POS Terminal positioned to the left */}
      <div className="flex-shrink-0 mr-2">
        <POSTerminal 
          size={size === "xl" ? "xs" : size === "lg" ? "xs" : size === "md" ? "xs" : "xs"} 
          animated={animated && isHovered}
        />
      </div>
      
      {/* Owl positioned to the right */}
      <div className="flex-shrink-0">
        <OwlSVG />
      </div>
      
      {/* Additional Floating Hearts on Hover */}
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