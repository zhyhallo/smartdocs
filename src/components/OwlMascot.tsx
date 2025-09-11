import { motion } from "framer-motion"

interface OwlMascotProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animated?: boolean
}

export default function OwlMascot({ size = "md", className = "", animated = true }: OwlMascotProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32",
    xl: "w-48 h-48"
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
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
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

  const eyeBlinkVariants = {
    blink: {
      scaleY: [1, 0.1, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
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
      <circle
        cx="100"
        cy="80"
        r="50"
        fill="oklch(0.65 0.18 220)"
        className="drop-shadow-md"
      />
      
      {/* Ear Tufts */}
      <path
        d="M70 45 L75 25 L85 40 Z"
        fill="oklch(0.55 0.22 240)"
      />
      <path
        d="M130 45 L125 25 L115 40 Z"
        fill="oklch(0.55 0.22 240)"
      />
      
      {/* Eyes Background */}
      <circle cx="85" cy="75" r="18" fill="white" />
      <circle cx="115" cy="75" r="18" fill="white" />
      
      {/* Eyes */}
      <motion.circle 
        cx="85" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        variants={eyeBlinkVariants}
        animate="blink"
      />
      <motion.circle 
        cx="115" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        variants={eyeBlinkVariants}
        animate="blink"
      />
      
      {/* Eye shine */}
      <circle cx="88" cy="72" r="3" fill="white" />
      <circle cx="118" cy="72" r="3" fill="white" />
      
      {/* Beak */}
      <path
        d="M100 85 L90 95 L110 95 Z"
        fill="oklch(0.75 0.15 60)"
      />
      
      {/* Wing */}
      <ellipse
        cx="75"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        transform="rotate(-15 75 125)"
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
      
      {/* Glasses (tech touch) */}
      <circle cx="85" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2" opacity="0.6" />
      <circle cx="115" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2" opacity="0.6" />
      <line x1="105" y1="75" x2="95" y2="75" stroke="oklch(0.25 0.08 240)" strokeWidth="2" opacity="0.6" />
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
      className="cursor-pointer"
    >
      <OwlSVG />
    </motion.div>
  )
}