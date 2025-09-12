import { motion } from "framer-motion"

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
  const sizeClasses = {
    xs: "w-4 h-5",
    sm: "w-6 h-8", 
    md: "w-8 h-10"
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
      
      {/* Screen Lines (display data) */}
      <motion.g
        variants={screenVariants}
        animate={animated ? "active" : "normal"}
      >
        <rect x="8" y="6" width="16" height="1" fill="oklch(0.15 0.08 240)" opacity="0.7" />
        <rect x="8" y="9" width="12" height="1" fill="oklch(0.15 0.08 240)" opacity="0.7" />
        <rect x="8" y="12" width="14" height="1" fill="oklch(0.15 0.08 240)" opacity="0.7" />
        <rect x="8" y="15" width="10" height="1" fill="oklch(0.15 0.08 240)" opacity="0.7" />
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