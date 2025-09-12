import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useId } from "react"
import { useInteractiveTerminal, type InteractionEvent } from "@/hooks/useInteractiveTerminal"
import { useInteractionContext } from "@/hooks/useInteractionContext"

interface OwlAnalystProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animated?: boolean
  terminalPosition?: "left" | "right"
  interactionContext?: string
  onInteraction?: (interaction: InteractionEvent) => void
}

export default function OwlAnalyst({ 
  size = "md", 
  className = "", 
  animated = true,
  terminalPosition = "left",
  interactionContext = "general",
  onInteraction
}: OwlAnalystProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const terminalId = useId()
  
  // Use the interactive terminal hook
  const { data: currentData, isInteracting, handleInteraction } = useInteractiveTerminal(2500)
  
  // Connect to global interaction system
  const { registerTerminal, unregisterTerminal, triggerGlobalInteraction } = useInteractionContext()
  
  // Register this terminal with the global interaction system
  useEffect(() => {
    registerTerminal(terminalId, handleInteraction)
    return () => unregisterTerminal(terminalId)
  }, [terminalId, registerTerminal, unregisterTerminal, handleInteraction])
  
  // Generate random financial data for fallback (keeping existing function for compatibility)
  function generateRandomData() {
    return {
      total: currentData.total,
      transactions: currentData.transactions,
      status: currentData.status,
      time: currentData.time
    }
  }

  // Handle various interactions
  const handleHover = (isHovering: boolean) => {
    setIsHovered(isHovering)
    if (isHovering) {
      const interaction: InteractionEvent = {
        type: "hover",
        section: interactionContext
      }
      handleInteraction(interaction)
      triggerGlobalInteraction(interaction)
      onInteraction?.(interaction)
    }
  }

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 500)
    
    const interaction: InteractionEvent = {
      type: "click",
      section: interactionContext
    }
    handleInteraction(interaction)
    triggerGlobalInteraction(interaction)
    onInteraction?.(interaction)
  }

  // Blink animation timer
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 300)
    }, 4000 + Math.random() * 2000) // Add some randomness

    return () => clearInterval(blinkTimer)
  }, [])
  
  const sizeClasses = {
    sm: "w-28 h-16",
    md: "w-36 h-20", 
    lg: "w-48 h-24",
    xl: "w-60 h-28"
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
      y: [0, -3, 0],
      transition: {
        duration: isInteracting ? 2 : 3,
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

  const terminalVariants = {
    initial: { opacity: 0, scale: 0.95, x: terminalPosition === "left" ? -10 : 10 },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  }

  const headTurnVariants = {
    normal: {
      rotate: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    lookAtTerminal: {
      rotate: terminalPosition === "left" ? -15 : 15,
      transition: { duration: 0.8, ease: "easeInOut" }
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
    typing: {
      rotate: [0, -10, 5, -8, 3, 0],
      y: [0, -1, -2, -1, 0],
      transition: {
        duration: isInteracting ? 0.8 : 1.2,
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
      className="w-16 h-16 flex-shrink-0"
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
          isInteracting ? { scale: [1, 1.02, 1] } : 
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
        animate={isHovered ? "lookAtTerminal" : "normal"}
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
            isInteracting ? { 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            } : 
            isHovered ? { opacity: [0.7, 1, 0.7] } : {}
          }
          transition={{ 
            duration: isInteracting ? 1 : 1.5, 
            repeat: Infinity 
          }}
        >
          <circle cx="52" cy="45" r="10" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          <circle cx="68" cy="45" r="10" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          <line x1="62" y1="45" x2="58" y2="45" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          
          {/* Lens reflection effect when processing */}
          {isInteracting && (
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
      
      {/* Animated Wings - simulate typing */}
      <motion.ellipse
        cx="45"
        cy="65"
        rx="8"
        ry="18"
        fill="oklch(0.45 0.20 240)"
        variants={wingVariants}
        animate={
          isClicked ? "excited" :
          isInteracting ? "typing" : 
          isHovered ? "typing" : "rest"
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
          isInteracting ? "typing" : 
          isHovered ? "typing" : "rest"
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

  const TerminalSVG = () => (
    <motion.div
      className="relative"
      variants={terminalVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <svg
        viewBox="0 0 100 80"
        className="w-20 h-16 flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Terminal Body - Simplified */}
        <rect
          x="5"
          y="10"
          width="90"
          height="60"
          rx="6"
          fill="oklch(0.25 0.08 240)"
          className="drop-shadow-lg"
        />
        
        {/* Screen */}
        <motion.rect
          x="10"
          y="15"
          width="80"
          height="45"
          rx="3"
          fill="oklch(0.15 0.05 240)"
          animate={{
            boxShadow: [
              "0 0 8px oklch(0.65 0.18 220 / 0.3)",
              "0 0 12px oklch(0.65 0.18 220 / 0.5)",
              "0 0 8px oklch(0.65 0.18 220 / 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Simple Power Button */}
        <circle
          cx="85"
          cy="65"
          r="3"
          fill="oklch(0.35 0.08 240)"
        />
        
        {/* Power LED */}
        <motion.circle
          cx="85"
          cy="65"
          r="1"
          fill="oklch(0.65 0.18 220)"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Stand - Simplified */}
        <rect
          x="40"
          y="70"
          width="20"
          height="6"
          fill="oklch(0.35 0.08 240)"
        />
      </svg>
      
      {/* Simple Data display */}
      <motion.div
        className="absolute top-2 left-3 right-3 text-[10px] font-mono text-accent space-y-0.5"
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
      >
        <motion.div
          key={currentData.total}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="truncate"
        >
          ₴{currentData.total}
        </motion.div>
        
        <motion.div
          key={currentData.status}
          className={`text-[8px] truncate ${
            currentData.status === "ACTIVE" ? "text-green-400" : 
            currentData.status === "PROCESSING" ? "text-yellow-400" :
            "text-gray-400"
          }`}
        >
          {currentData.status}
        </motion.div>
      </motion.div>
    </motion.div>
  )

  const containerClass = terminalPosition === "left" ? "flex-row" : "flex-row-reverse"

  if (!animated) {
    return (
      <div className={`flex items-center gap-4 ${containerClass} ${sizeClasses[size]} ${className}`}>
        <TerminalSVG />
        <OwlSVG />
      </div>
    )
  }

  return (
    <motion.div
      variants={owlVariants}
      initial="initial"
      animate={
        isClicked ? ["animate", "excited"] :
        isInteracting ? ["animate", "excited"] :
        ["animate", "float"]
      }
      className={`flex items-center gap-4 ${containerClass} ${sizeClasses[size]} ${className} cursor-pointer select-none`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={handleClick}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      tabIndex={0}
      role="button"
      aria-label="Interactive financial terminal with owl analyst"
    >
      <TerminalSVG />
      <OwlSVG />
      
      {/* Simple interaction sparkles */}
      <AnimatePresence>
        {(isHovered || isInteracting) && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-accent pointer-events-none text-sm"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -15],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Simple interaction glow effect */}
      <AnimatePresence>
        {(isInteracting || isClicked) && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.9, 1.1, 1.2],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              background: "radial-gradient(circle, oklch(0.65 0.18 220 / 0.15) 0%, transparent 60%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}