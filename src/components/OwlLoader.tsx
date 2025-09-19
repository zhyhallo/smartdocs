import { motion } from "framer-motion"

interface OwlLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function OwlLoader({ size = "md", className = "" }: OwlLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  }

  const beakSizes = {
    sm: { borderWidth: '1.5px' },
    md: { borderWidth: '2px' },
    lg: { borderWidth: '3px' }
  }

  const eyeSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  }

  const pupilSizes = {
    sm: "w-0.5 h-0.5",
    md: "w-1 h-1",
    lg: "w-1.5 h-1.5"
  }

  // Main owl animation - gentle swaying with head tilts
  const owlVariants = {
    animate: {
      rotate: [0, -8, 8, -5, 5, 0],
      y: [0, -2, 0, -1, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  }

  // Eye blinking with realistic timing
  const eyeBlinkVariants = {
    animate: {
      scaleY: [1, 0.1, 1, 1, 1, 1, 1, 0.1, 1],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.05, 0.1, 0.7, 0.75, 0.8, 0.85, 0.9, 1]
      }
    }
  }

  // Wing flapping animation
  const wingVariants = {
    animate: {
      rotate: [0, -20, 20, -10, 10, 0],
      scale: [1, 0.9, 1, 0.95, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  }

  // Body breathing animation
  const bodyVariants = {
    animate: {
      scale: [1, 1.05, 1, 1.02, 1],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  }

  // Ear tuft animation
  const earTuftVariants = {
    animate: {
      rotate: [0, 5, -5, 3, -3, 0],
      transition: {
        duration: 3.5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 0.5
      }
    }
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Owl Loader */}
      <motion.div
        className={`relative ${sizeClasses[size]}`}
        variants={owlVariants}
        animate="animate"
      >
        {/* Owl Body with breathing */}
        <motion.div 
          className="absolute inset-0 bg-primary rounded-full shadow-lg"
          variants={bodyVariants}
          animate="animate"
        >
          {/* Wing shadows with flapping */}
          <motion.div 
            className="absolute -left-1 top-2 w-3 h-4 bg-primary/70 rounded-full transform -rotate-12 origin-right"
            variants={wingVariants}
            animate="animate"
          />
          <motion.div 
            className="absolute -right-1 top-2 w-3 h-4 bg-primary/70 rounded-full transform rotate-12 origin-left"
            variants={wingVariants}
            animate="animate"
            style={{ rotateY: 180 }}
          />
          
          {/* Chest highlight */}
          <div className="absolute inset-x-0 bottom-2 h-6 bg-gradient-to-t from-primary-foreground/10 to-transparent rounded-full" />
        </motion.div>

        {/* Owl Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Eyes with realistic blinking */}
          <div className="relative flex space-x-1">
            {/* Left Eye */}
            <motion.div 
              className={`${eyeSizes[size]} bg-white rounded-full relative shadow-inner`}
              variants={eyeBlinkVariants}
              animate="animate"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className={`${pupilSizes[size]} bg-accent rounded-full`}
                  animate={{
                    x: [0, 1, -1, 0],
                    y: [0, 0.5, -0.5, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
            
            {/* Right Eye */}
            <motion.div 
              className={`${eyeSizes[size]} bg-white rounded-full relative shadow-inner`}
              variants={eyeBlinkVariants}
              animate="animate"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className={`${pupilSizes[size]} bg-accent rounded-full`}
                  animate={{
                    x: [0, 1, -1, 0],
                    y: [0, 0.5, -0.5, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Beak with subtle bob */}
        <motion.div 
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 0.5, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          <div 
            className="w-0 h-0 border-l border-r border-b border-transparent"
            style={{ 
              borderLeftWidth: beakSizes[size].borderWidth, 
              borderRightWidth: beakSizes[size].borderWidth, 
              borderBottomWidth: beakSizes[size].borderWidth,
              borderBottomColor: '#fb923c'
            }} 
          />
        </motion.div>

        {/* Animated ear tufts */}
        <motion.div 
          className="absolute -top-1 left-1"
          variants={earTuftVariants}
          animate="animate"
        >
          <div className="w-1 h-2 bg-primary rounded-t-full transform rotate-12 shadow-sm" />
        </motion.div>
        <motion.div 
          className="absolute -top-1 right-1"
          variants={earTuftVariants}
          animate="animate"
          style={{ rotateY: 180 }}
        >
          <div className="w-1 h-2 bg-primary rounded-t-full transform rotate-12 shadow-sm" />
        </motion.div>
      </motion.div>

      {/* Loading dots with wave pattern */}
      <div className="ml-3 flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
              y: [0, -4, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}