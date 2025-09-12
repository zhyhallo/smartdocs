import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { POSTerminal } from "@/components"

interface OwlAnalystProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  animated?: boolean
  withTerminal?: boolean
}

type InteractionEvent = {
  type: string
  section?: string
}

export default function OwlAnalyst({ 
  size = "md", 
  className = "", 
  animated = true,
  withTerminal = true
}: OwlAnalystProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isLookingAround, setIsLookingAround] = useState(false)

  // Blink animation timer - increased randomness
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 5000 + Math.random() * 3000) // 5-8 seconds between blinks

    return () => clearInterval(blinkTimer)
  }, [])

  // Look around animation timer
  useEffect(() => {
    const lookTimer = setInterval(() => {
      setIsLookingAround(true)
      setTimeout(() => setIsLookingAround(false), 2000)
    }, 7000 + Math.random() * 5000) // 7-12 seconds between look-arounds

    return () => clearInterval(lookTimer)
  }, [])
  
  const sizeClasses = {
    xs: "w-2 h-2 sm:w-2.5 sm:h-2.5",    // Header/Footer - very small
    sm: "w-3 h-3 sm:w-3.5 sm:h-3.5",    // Small section icons - reduced
    md: "w-4 h-4 sm:w-5 sm:h-5",        // Medium sections - reduced
    lg: "w-6 h-6 sm:w-7 sm:h-7",        // Large sections - reduced  
    xl: "w-8 h-8 sm:w-10 sm:h-10"       // Hero section - significantly reduced
  }

  const owlVariants = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    float: {
      y: [0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    excited: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const headTurnVariants = {
    normal: {
      rotate: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    curious: {
      rotate: [0, -8, 8, -5, 0],
      transition: { duration: 2, ease: "easeInOut" }
    }
  }

  const eyeVariants = {
    normal: {
      scaleY: 1,
      transition: { duration: 0.1 }
    },
    blink: {
      scaleY: 0.1,
      transition: { duration: 0.1 }
    }
  }

  const wingVariants = {
    rest: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.3 }
    },
    active: {
      rotate: [0, -10, 5, -8, 3, 0],
      y: [0, -1, -2, -1, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    excited: {
      rotate: [0, -15, 15, -10, 10, 0],
      y: [0, -2, -3, -2, -1, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const OwlSVG = () => (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Owl Body */}
      <motion.ellipse
        cx="60"
        cy="75"
        rx="28"
        ry="35"
        fill="oklch(0.55 0.22 240)"
        className="drop-shadow-sm"
        animate={
          isClicked ? { scale: [1, 0.95, 1.02, 1] } :
          isHovered ? { scale: [1, 1.02, 1] } : {}
        }
        transition={{ 
          duration: isClicked ? 0.4 : 1.5, 
          repeat: !isClicked ? Infinity : 0 
        }}
      />
      
      {/* Owl Head with turn animation */}
      <motion.g
        variants={headTurnVariants}
        animate={isLookingAround ? "curious" : isHovered ? "curious" : "normal"}
        style={{ transformOrigin: "60px 50px" }}
      >
        <circle
          cx="60"
          cy="50"
          r="30"
          fill="oklch(0.65 0.18 220)"
          className="drop-shadow-sm"
        />
        
        {/* Ear Tufts */}
        <motion.path
          d="M45 25 L48 15 L55 25 Z"
          fill="oklch(0.55 0.22 240)"
          animate={isHovered ? { rotate: [-2, 2, -2] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.path
          d="M75 25 L72 15 L65 25 Z"
          fill="oklch(0.55 0.22 240)"
          animate={isHovered ? { rotate: [2, -2, 2] } : {}}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
        />
        
        {/* Eyes */}
        <circle cx="52" cy="45" r="8" fill="white" />
        <circle cx="68" cy="45" r="8" fill="white" />
        
        {/* Pupils with blink */}
        <motion.circle 
          cx="52" 
          cy="45" 
          r="5" 
          fill="oklch(0.15 0.08 240)"
          variants={eyeVariants}
          animate={isBlinking ? "blink" : "normal"}
        />
        <motion.circle 
          cx="68" 
          cy="45" 
          r="5" 
          fill="oklch(0.15 0.08 240)"
          variants={eyeVariants}
          animate={isBlinking ? "blink" : "normal"}
        />
        
        {/* Eye shine */}
        <circle cx="54" cy="43" r="2" fill="white" opacity="0.8" />
        <circle cx="70" cy="43" r="2" fill="white" opacity="0.8" />
        
        {/* Analytical glasses */}
        <motion.g 
          opacity="0.7"
          animate={
            isHovered ? { 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            } : {}
          }
          transition={{ 
            duration: 1.5, 
            repeat: Infinity 
          }}
        >
          <circle cx="52" cy="45" r="10" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          <circle cx="68" cy="45" r="10" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          <line x1="62" y1="45" x2="58" y2="45" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          
          {/* Lens reflection effect when hovered */}
          {isHovered && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ellipse cx="50" cy="42" rx="3" ry="6" fill="white" opacity="0.4" />
              <ellipse cx="66" cy="42" rx="3" ry="6" fill="white" opacity="0.4" />
            </motion.g>
          )}
        </motion.g>
        
        {/* Beak */}
        <path
          d="M60 52 L55 60 L65 60 Z"
          fill="oklch(0.75 0.15 60)"
        />
      </motion.g>
      
      {/* Animated Wings */}
      <motion.ellipse
        cx="45"
        cy="65"
        rx="8"
        ry="18"
        fill="oklch(0.45 0.20 240)"
        variants={wingVariants}
        animate={
          isClicked ? "excited" :
          isHovered ? "active" : "rest"
        }
        style={{ transformOrigin: "45px 62px" }}
      />
      <motion.ellipse
        cx="75"
        cy="65"
        rx="8"
        ry="18"
        fill="oklch(0.45 0.20 240)"
        variants={wingVariants}
        animate={
          isClicked ? "excited" :
          isHovered ? "active" : "rest"
        }
        style={{ transformOrigin: "75px 62px" }}
      />
      
      {/* Chest Pattern */}
      <ellipse
        cx="60"
        cy="68"
        rx="12"
        ry="10"
        fill="oklch(0.75 0.12 220)"
        opacity="0.6"
      />
      
      {/* Feet */}
      <ellipse cx="55" cy="105" rx="4" ry="3" fill="oklch(0.75 0.15 60)" />
      <ellipse cx="65" cy="105" rx="4" ry="3" fill="oklch(0.75 0.15 60)" />
    </svg>
  )

  if (!animated) {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center ${withTerminal ? 'space-x-1 sm:space-x-2' : ''} max-w-fit`}>
        {withTerminal && (
          <div className="flex-shrink-0 mr-1">
            <POSTerminal 
              size={size === "xl" ? "sm" : size === "lg" ? "sm" : "xs"} 
              animated={false}
            />
          </div>
        )}
        <div className="flex-shrink-0">
          <OwlSVG />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={owlVariants}
      initial="initial"
      animate={
        isClicked ? ["animate", "excited"] :
        ["animate", "float"]
      }
      className={`${sizeClasses[size]} ${className} cursor-pointer select-none owl-container relative flex items-center ${withTerminal ? 'space-x-1 sm:space-x-2' : ''} max-w-fit`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 500)
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label="Interactive owl analyst mascot"
    >
      {/* POS Terminal positioned to the left - only show if withTerminal is true */}
      {withTerminal && (
        <div className="flex-shrink-0 mr-1 sm:mr-2">
          <POSTerminal 
            size={size === "xl" ? "sm" : size === "lg" ? "sm" : "xs"} 
            animated={animated && (isHovered || isClicked)}
          />
        </div>
      )}
      
      {/* Owl positioned to the right */}
      <div className="flex-shrink-0">
        <OwlSVG />
      </div>
      
      {/* Glow effect */}
      <div className="owl-glow-effect" />
      
      {/* Enhanced interaction sparkles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-accent pointer-events-none owl-sparkle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 60}%`,
                  fontSize: `${12 + Math.random() * 8}px`
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 360],
                  y: [0, -20],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.div>
            ))}
            
            {/* Additional magical particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 30],
                  y: [0, -15 - Math.random() * 15],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
              >
                <div 
                  className="w-1 h-1 rounded-full bg-accent"
                  style={{
                    boxShadow: "0 0 4px oklch(0.65 0.18 220)"
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Pulse effect for clicks */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-full owl-pulse"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.9, 1.2, 1.4],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: "radial-gradient(circle, oklch(0.65 0.18 220 / 0.2) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}