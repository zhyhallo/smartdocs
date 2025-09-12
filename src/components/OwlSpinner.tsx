import { motion } from "framer-motion"

interface OwlSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * A simpler owl spinner for minimal loading states
 * Perfect for inline loading or when you need less animation
 */
export default function OwlSpinner({ size = "md", className = "" }: OwlSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10"
  }

  const eyeSizes = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2"
  }

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity
      }
    }
  }

  const eyeBlinkVariants = {
    animate: {
      scaleY: [1, 0.1, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
        variants={spinnerVariants}
        animate="animate"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
        
        {/* Spinning arc */}
        <div className="absolute inset-0 border-2 border-transparent border-t-primary border-r-primary rounded-full" />
        
        {/* Owl face in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            {/* Eyes */}
            <div className="flex space-x-0.5">
              <motion.div 
                className={`${eyeSizes[size]} bg-white rounded-full`}
                variants={eyeBlinkVariants}
                animate="animate"
              />
              <motion.div 
                className={`${eyeSizes[size]} bg-white rounded-full`}
                variants={eyeBlinkVariants}
                animate="animate"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}