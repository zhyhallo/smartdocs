import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface OwlAnalystProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animated?: boolean
  terminalPosition?: "left" | "right"
}

export default function OwlAnalyst({ 
  size = "md", 
  className = "", 
  animated = true,
  terminalPosition = "right" 
}: OwlAnalystProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentData, setCurrentData] = useState(generateRandomData())
  const [isBlinking, setIsBlinking] = useState(false)
  
  // Generate random financial data for terminal display
  function generateRandomData() {
    return {
      total: (Math.random() * 9999 + 1000).toFixed(2),
      transactions: Math.floor(Math.random() * 50 + 10),
      status: Math.random() > 0.3 ? "ACTIVE" : "PROCESSING",
      time: new Date().toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }

  // Update data periodically for "running numbers" effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(generateRandomData())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Blink animation timer
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 300)
    }, 4000)

    return () => clearInterval(blinkTimer)
  }, [])
  
  const sizeClasses = {
    sm: "w-32 h-20",
    md: "w-48 h-28", 
    lg: "w-64 h-36",
    xl: "w-80 h-44"
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
        duration: 3,
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
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const OwlSVG = () => (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 flex-shrink-0"
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
        animate={isHovered ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
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
          animate={isHovered ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <circle cx="52" cy="45" r="10" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          <circle cx="68" cy="45" r="10" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
          <line x1="62" y1="45" x2="58" y2="45" stroke="oklch(0.25 0.08 240)" strokeWidth="1.5" />
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
        animate={isHovered ? "typing" : "rest"}
        style={{ transformOrigin: "45px 62px" }}
      />
      <motion.ellipse
        cx="75"
        cy="65"
        rx="8"
        ry="18"
        fill="oklch(0.45 0.20 240)"
        variants={wingVariants}
        animate={isHovered ? "typing" : "rest"}
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
        viewBox="0 0 140 100"
        className="w-28 h-20 flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Terminal Base */}
        <rect
          x="10"
          y="45"
          width="120"
          height="45"
          rx="4"
          fill="oklch(0.25 0.08 240)"
          className="drop-shadow-lg"
        />
        
        {/* Terminal Screen */}
        <motion.rect
          x="15"
          y="15"
          width="110"
          height="70"
          rx="3"
          fill="oklch(0.15 0.05 240)"
          className="drop-shadow-md"
          animate={{
            boxShadow: [
              "0 0 10px oklch(0.65 0.18 220 / 0.3)",
              "0 0 15px oklch(0.65 0.18 220 / 0.5)",
              "0 0 10px oklch(0.65 0.18 220 / 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Screen glow effect */}
        <motion.rect
          x="15"
          y="15"
          width="110"
          height="70"
          rx="3"
          fill="url(#screenGlow)"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Terminal Stand */}
        <rect
          x="60"
          y="85"
          width="20"
          height="8"
          fill="oklch(0.35 0.08 240)"
        />
        <rect
          x="50"
          y="93"
          width="40"
          height="4"
          rx="2"
          fill="oklch(0.35 0.08 240)"
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "oklch(0.65 0.18 220)", stopOpacity: 0.1 }} />
            <stop offset="50%" style={{ stopColor: "oklch(0.65 0.18 220)", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "oklch(0.65 0.18 220)", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Data display overlay */}
      <motion.div
        className="absolute top-4 left-6 right-6 text-xs font-mono text-accent space-y-1"
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          key={currentData.total}
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          TOTAL: ₴{currentData.total}
        </motion.div>
        <motion.div
          key={currentData.transactions}
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          TX: {currentData.transactions}
        </motion.div>
        <motion.div
          className="flex justify-between"
          key={`${currentData.status}-${currentData.time}`}
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span className={currentData.status === "ACTIVE" ? "text-green-400" : "text-yellow-400"}>
            {currentData.status}
          </span>
          <span>{currentData.time}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )

  const containerClass = terminalPosition === "left" ? "flex-row-reverse" : "flex-row"

  if (!animated) {
    return (
      <div className={`flex items-center gap-4 ${containerClass} ${sizeClasses[size]} ${className}`}>
        <OwlSVG />
        <TerminalSVG />
      </div>
    )
  }

  return (
    <motion.div
      variants={owlVariants}
      initial="initial"
      animate={["animate", "float"]}
      className={`flex items-center gap-4 ${containerClass} ${sizeClasses[size]} ${className} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <OwlSVG />
      <TerminalSVG />
      
      {/* Interaction sparkles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-accent pointer-events-none"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  y: [0, -20],
                  rotate: [0, 180]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}