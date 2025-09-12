import { motion } from "framer-motion"
import { POSTerminal } from "@/components"

interface OwlProgressProps {
  progress: number // 0-100
  size?: "sm" | "md" | "lg"
  className?: string
  showPercentage?: boolean
}

/**
 * Owl-themed progress indicator
 * Perfect for file uploads, form submissions, or any process with known progress
 */
export default function OwlProgress({ 
  progress, 
  size = "md", 
  className = "",
  showPercentage = true 
}: OwlProgressProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20", 
    lg: "w-24 h-24"
  }

  const strokeWidths = {
    sm: 3,
    md: 4,
    lg: 5
  }

  const radius = {
    sm: 28,
    md: 36,
    lg: 44
  }

  const circumference = 2 * Math.PI * radius[size]
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Owl gets happier as progress increases
  const owlMood = progress > 80 ? 'happy' : progress > 50 ? 'neutral' : 'focused'

  const eyeVariants = {
    focused: { scaleY: 1, y: 0 },
    neutral: { scaleY: 1, y: 0 },
    happy: { 
      scaleY: [1, 0.3, 1],
      y: [0, 1, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
    }
  }

  const bodyVariants = {
    focused: { scale: 1, rotate: 0 },
    neutral: { scale: 1, rotate: 0 },
    happy: { 
      scale: [1, 1.05, 1],
      rotate: [0, -2, 2, 0],
      transition: { duration: 1, repeat: Infinity }
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <div className="flex items-center space-x-3">
        {/* POS Terminal */}
        <div className="flex-shrink-0">
          <POSTerminal size="xs" animated={true} />
        </div>
        
        {/* Owl Progress Circle */}
        <div className={`relative ${sizeClasses[size]}`}>
        {/* Progress Circle */}
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius[size]}
            stroke="currentColor"
            strokeWidth={strokeWidths[size]}
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius[size]}
            stroke="currentColor"
            strokeWidth={strokeWidths[size]}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        {/* Owl in center */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          variants={bodyVariants}
          animate={owlMood}
        >
          <div className="w-8 h-8 bg-primary rounded-full relative">
            {/* Eyes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-1">
                <motion.div 
                  className="w-1.5 h-1.5 bg-white rounded-full relative"
                  variants={eyeVariants}
                  animate={owlMood}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-accent rounded-full" />
                  </div>
                </motion.div>
                <motion.div 
                  className="w-1.5 h-1.5 bg-white rounded-full relative"
                  variants={eyeVariants}
                  animate={owlMood}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-accent rounded-full" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Beak */}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
              <div 
                className="w-0 h-0 border-l border-r border-b border-transparent"
                style={{ 
                  borderLeftWidth: '1px', 
                  borderRightWidth: '1px', 
                  borderBottomWidth: '1px',
                  borderBottomColor: '#fb923c'
                }} 
              />
            </div>

            {/* Ear tufts */}
            <div className="absolute -top-0.5 left-1">
              <div className="w-0.5 h-1 bg-primary rounded-t-full transform rotate-12" />
            </div>
            <div className="absolute -top-0.5 right-1">
              <div className="w-0.5 h-1 bg-primary rounded-t-full transform -rotate-12" />
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Progress percentage */}
      {showPercentage && (
        <motion.div 
          className="mt-2 text-sm font-medium text-foreground"
          key={progress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  )
}