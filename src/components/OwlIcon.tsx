import { motion } from "framer-motion"
import { useState } from "react"
import { POSTerminal } from "@/components"

interface OwlIconProps {
  size?: "xs" | "sm" | "md"
  className?: string
  animated?: boolean
  showTerminal?: boolean
}

export default function OwlIcon({ 
  size = "sm", 
  className = "", 
  animated = true,
  showTerminal = true 
}: OwlIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    xs: "w-8 h-8 sm:w-10 sm:h-10",       // Extra small - for FAQ and minimal usage
    sm: "w-10 h-10 sm:w-12 sm:h-12",     // Small - default
    md: "w-12 h-12 sm:w-16 sm:h-16"      // Medium - for hero sections
  }

  const owlVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  }

  const eyeBlinkVariants = {
    normal: {
      scaleY: [1, 0.1, 1],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut"
      }
    }
  }

  const OwlIconSVG = () => (
    <svg
      viewBox="0 0 40 40"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple Owl Body */}
      <ellipse
        cx="20"
        cy="28"
        rx="12"
        ry="10"
        fill="oklch(0.55 0.22 240)"
      />
      
      {/* Simple Owl Head */}
      <circle
        cx="20"
        cy="18"
        r="12"
        fill="oklch(0.65 0.18 220)"
      />
      
      {/* Simple Ear Tufts */}
      <path d="M12 8 L14 2 L18 8 Z" fill="oklch(0.55 0.22 240)" />
      <path d="M28 8 L26 2 L22 8 Z" fill="oklch(0.55 0.22 240)" />
      
      {/* Simple Eyes */}
      <circle cx="16" cy="16" r="3" fill="white" />
      <circle cx="24" cy="16" r="3" fill="white" />
      
      {/* Simple Pupils with blink */}
      <motion.circle 
        cx="16" 
        cy="16" 
        r="2" 
        fill="oklch(0.15 0.08 240)"
        variants={eyeBlinkVariants}
        animate={animated ? "normal" : {}}
      />
      <motion.circle 
        cx="24" 
        cy="16" 
        r="2" 
        fill="oklch(0.15 0.08 240)"
        variants={eyeBlinkVariants}
        animate={animated ? "normal" : {}}
      />
      
      {/* Simple eye shine */}
      <circle cx="17" cy="15" r="0.8" fill="white" opacity="0.9" />
      <circle cx="25" cy="15" r="0.8" fill="white" opacity="0.9" />
      
      {/* Simple Glasses (tech touch) */}
      <g opacity="0.7">
        <circle cx="16" cy="16" r="4" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="0.8" />
        <circle cx="24" cy="16" r="4" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="0.8" />
        <line x1="20" y1="16" x2="20" y2="16" stroke="oklch(0.25 0.08 240)" strokeWidth="0.8" />
      </g>
      
      {/* Simple Beak */}
      <path d="M20 20 L17 23 L23 23 Z" fill="oklch(0.75 0.15 60)" />
      
      {/* Simple Wings */}
      <ellipse cx="12" cy="24" rx="3" ry="6" fill="oklch(0.45 0.20 240)" />
      <ellipse cx="28" cy="24" rx="3" ry="6" fill="oklch(0.45 0.20 240)" />
      
      {/* Simple chest pattern */}
      <ellipse cx="20" cy="22" rx="4" ry="3" fill="oklch(0.75 0.12 220)" opacity="0.6" />
      
      {/* Simple feet */}
      <ellipse cx="17" cy="36" rx="2" ry="1.5" fill="oklch(0.75 0.15 60)" />
      <ellipse cx="23" cy="36" rx="2" ry="1.5" fill="oklch(0.75 0.15 60)" />
    </svg>
  )

  if (!animated) {
    if (showTerminal) {
      return (
        <div className="flex items-center space-x-1">
          <div className="flex-shrink-0">
            <POSTerminal size="xs" animated={false} />
          </div>
          <div className="flex-shrink-0">
            <OwlIconSVG />
          </div>
        </div>
      )
    }
    return <OwlIconSVG />
  }

  return (
    <motion.div
      variants={owlVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`cursor-pointer inline-flex items-center space-x-1 ${showTerminal ? '' : 'justify-center'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTerminal && (
        <div className="flex-shrink-0 mr-1">
          <POSTerminal size="sm" animated={isHovered} />
        </div>
      )}
      <div className="flex-shrink-0">
        <OwlIconSVG />
      </div>
    </motion.div>
  )
}