import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface POSTerminalProps {
  size?: "xs" | "sm" | "md"
  className?: string
  animated?: boolean
}

export default function POSTerminal({ 
  size = "sm", 
  className = "", 
  animated = true 
}: POSTerminalProps) {
  const [displayNumbers, setDisplayNumbers] = useState(['1234', '567', '890', '123'])

  // Generate running numbers effect
  useEffect(() => {
    if (!animated) return
    
    const interval = setInterval(() => {
      setDisplayNumbers([
        Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
        Math.floor(Math.random() * 999).toString().padStart(3, '0'),
        Math.floor(Math.random() * 999).toString().padStart(3, '0'),
        Math.floor(Math.random() * 999).toString().padStart(3, '0')
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [animated])
  const sizeClasses = {
    xs: "w-3 h-4 sm:w-6 sm:h-8",        // Larger terminal: 50% bigger
    sm: "w-5 h-7 sm:w-8 sm:h-11",       // Larger terminal: 50% bigger  
    md: "w-6 h-8 sm:w-10 sm:h-14"       // Larger terminal: 50% bigger
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
    pulse: {
      scale: [1, 1.02, 1],
      opacity: [1, 0.9, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const screenVariants = {
    normal: {
      opacity: 0.8,
      transition: {
        duration: 0.3
      }
    },
    active: {
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const POSTerminalSVG = () => (
    <svg
      viewBox="0 0 32 40"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Terminal Base */}
      <motion.rect
        x="2"
        y="25"
        width="28"
        height="12"
        rx="2"
        fill="oklch(0.25 0.08 240)"
        className="drop-shadow-sm"
        variants={terminalVariants}
        animate={animated ? "pulse" : "normal"}
      />
      
      {/* Terminal Stand */}
      <rect
        x="12"
        y="20"
        width="8"
        height="8"
        fill="oklch(0.35 0.06 240)"
      />
      
      {/* Screen */}
      <motion.rect
        x="4"
        y="2"
        width="24"
        height="20"
        rx="1"
        fill="oklch(0.15 0.08 240)"
        className="drop-shadow-sm"
        variants={terminalVariants}
        animate={animated ? "pulse" : "normal"}
      />
      
      {/* Screen Content */}
      <motion.rect
        x="6"
        y="4"
        width="20"
        height="16"
        fill="oklch(0.95 0.02 240)"
        variants={screenVariants}
        animate={animated ? "active" : "normal"}
      />
      
      {/* Screen Lines (display data) - animated numbers */}
      <motion.g
        variants={screenVariants}
        animate={animated ? "active" : "normal"}
      >
        <text x="8" y="8" fontSize="1.5" fill="oklch(0.15 0.08 240)" opacity="0.8" fontFamily="monospace">
          {displayNumbers[0]}
        </text>
        <text x="8" y="11" fontSize="1.2" fill="oklch(0.15 0.08 240)" opacity="0.7" fontFamily="monospace">
          {displayNumbers[1]}
        </text>
        <text x="8" y="14" fontSize="1.2" fill="oklch(0.15 0.08 240)" opacity="0.7" fontFamily="monospace">
          {displayNumbers[2]}
        </text>
        <text x="8" y="17" fontSize="1" fill="oklch(0.15 0.08 240)" opacity="0.6" fontFamily="monospace">
          {displayNumbers[3]}
        </text>
      </motion.g>
      
      {/* Power LED */}
      <motion.circle
        cx="26"
        cy="30"
        r="1"
        fill="oklch(0.7 0.25 120)"
        animate={animated ? {
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Keypad buttons */}
      <g opacity="0.6">
        <rect x="6" y="28" width="2" height="2" rx="0.5" fill="oklch(0.45 0.06 240)" />
        <rect x="10" y="28" width="2" height="2" rx="0.5" fill="oklch(0.45 0.06 240)" />
        <rect x="14" y="28" width="2" height="2" rx="0.5" fill="oklch(0.45 0.06 240)" />
        <rect x="6" y="32" width="2" height="2" rx="0.5" fill="oklch(0.45 0.06 240)" />
        <rect x="10" y="32" width="2" height="2" rx="0.5" fill="oklch(0.45 0.06 240)" />
        <rect x="14" y="32" width="2" height="2" rx="0.5" fill="oklch(0.45 0.06 240)" />
      </g>
    </svg>
  )

  if (!animated) {
    return <POSTerminalSVG />
  }

  return (
    <motion.div
      variants={terminalVariants}
      initial="normal"
      whileHover="hover"
      className="cursor-pointer"
    >
      <POSTerminalSVG />
    </motion.div>
  )
}