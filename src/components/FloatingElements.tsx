import { motion } from "framer-motion"
import { useParallax } from "@/hooks/useParallax"

interface FloatingElementsProps {
  density?: 'low' | 'medium' | 'high'
  theme?: 'tech' | 'business' | 'abstract'
  className?: string
}

export default function FloatingElements({ 
  density = 'medium',
  theme = 'tech',
  className = ""
}: FloatingElementsProps) {
  const { y: slowY } = useParallax({ speed: 0.2, direction: 'up' })
  const { y: mediumY } = useParallax({ speed: 0.4, direction: 'down' })
  const { y: fastY } = useParallax({ speed: 0.6, direction: 'up' })

  const getElementCount = () => {
    switch (density) {
      case 'low': return { slow: 3, medium: 2, fast: 1 }
      case 'medium': return { slow: 5, medium: 3, fast: 2 }
      case 'high': return { slow: 8, medium: 5, fast: 3 }
      default: return { slow: 5, medium: 3, fast: 2 }
    }
  }

  const counts = getElementCount()

  const getTechElements = () => (
    <>
      {/* Database icons floating */}
      {Array.from({ length: counts.slow }).map((_, i) => (
        <motion.div
          key={`tech-slow-${i}`}
          style={{ y: slowY }}
          className="absolute"
          style={{
            left: `${10 + (i * 20)}%`,
            top: `${20 + (i * 15)}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, delay: i * 0.5 }
          }}
        >
          <div className="w-6 h-6 bg-primary/10 border border-primary/20 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-primary/30 rounded"></div>
          </div>
        </motion.div>
      ))}

      {/* Circuit-like patterns */}
      {Array.from({ length: counts.medium }).map((_, i) => (
        <motion.div
          key={`tech-medium-${i}`}
          style={{ y: mediumY }}
          className="absolute"
          style={{
            right: `${10 + (i * 25)}%`,
            top: `${30 + (i * 20)}%`,
          }}
        >
          <svg width="40" height="40" className="opacity-10">
            <path
              d="M5,5 L35,5 L35,20 L20,20 L20,35 L5,35 Z"
              stroke="oklch(0.55 0.22 240)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="20" cy="20" r="3" fill="oklch(0.65 0.18 220)" opacity="0.3" />
          </svg>
        </motion.div>
      ))}

      {/* Code brackets */}
      {Array.from({ length: counts.fast }).map((_, i) => (
        <motion.div
          key={`tech-fast-${i}`}
          style={{ y: fastY }}
          className="absolute text-2xl font-mono text-accent/20"
          style={{
            left: `${60 + (i * 15)}%`,
            bottom: `${20 + (i * 25)}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1
          }}
        >
          {'{ }'}
        </motion.div>
      ))}
    </>
  )

  const getBusinessElements = () => (
    <>
      {/* Receipt/document icons */}
      {Array.from({ length: counts.slow }).map((_, i) => (
        <motion.div
          key={`business-slow-${i}`}
          style={{ y: slowY }}
          className="absolute"
          style={{
            left: `${15 + (i * 18)}%`,
            top: `${25 + (i * 12)}%`,
          }}
        >
          <div className="w-8 h-10 bg-card/50 border border-border/30 rounded-sm shadow-sm">
            <div className="p-1 space-y-1">
              <div className="h-1 bg-primary/20 rounded"></div>
              <div className="h-1 bg-primary/20 rounded w-3/4"></div>
              <div className="h-1 bg-primary/20 rounded w-1/2"></div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Currency symbols */}
      {Array.from({ length: counts.medium }).map((_, i) => (
        <motion.div
          key={`business-medium-${i}`}
          style={{ y: mediumY }}
          className="absolute text-lg font-bold text-accent/15"
          style={{
            right: `${20 + (i * 20)}%`,
            top: `${40 + (i * 15)}%`,
          }}
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 2
          }}
        >
          zł
        </motion.div>
      ))}

      {/* Chart bars */}
      {Array.from({ length: counts.fast }).map((_, i) => (
        <motion.div
          key={`business-fast-${i}`}
          style={{ y: fastY }}
          className="absolute"
          style={{
            left: `${70 + (i * 10)}%`,
            bottom: `${30 + (i * 20)}%`,
          }}
        >
          <div className="flex items-end space-x-1">
            {Array.from({ length: 4 }).map((_, j) => (
              <motion.div
                key={j}
                className="w-2 bg-primary/20 rounded-t"
                style={{ height: `${8 + j * 4}px` }}
                animate={{
                  scaleY: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5 + j * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </>
  )

  const getAbstractElements = () => (
    <>
      {/* Floating orbs */}
      {Array.from({ length: counts.slow }).map((_, i) => (
        <motion.div
          key={`abstract-slow-${i}`}
          style={{ y: slowY }}
          className="absolute"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 18)}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8
          }}
        >
          <div 
            className="w-12 h-12 rounded-full"
            style={{
              background: `radial-gradient(circle, oklch(0.65 0.18 220 / 0.2) 0%, transparent 70%)`
            }}
          />
        </motion.div>
      ))}

      {/* Geometric shapes */}
      {Array.from({ length: counts.medium }).map((_, i) => (
        <motion.div
          key={`abstract-medium-${i}`}
          style={{ y: mediumY }}
          className="absolute"
          style={{
            right: `${25 + (i * 18)}%`,
            top: `${20 + (i * 25)}%`,
          }}
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1
          }}
        >
          <div className="w-8 h-8 border border-accent/20 transform rotate-45"></div>
        </motion.div>
      ))}

      {/* Flowing lines */}
      {Array.from({ length: counts.fast }).map((_, i) => (
        <motion.div
          key={`abstract-fast-${i}`}
          style={{ y: fastY }}
          className="absolute"
          style={{
            left: `${50 + (i * 20)}%`,
            bottom: `${25 + (i * 15)}%`,
          }}
        >
          <svg width="60" height="20" className="opacity-20">
            <motion.path
              d={`M0,10 Q15,${5 + i * 2} 30,10 Q45,${15 - i * 2} 60,10`}
              stroke="oklch(0.55 0.22 240)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 1.5
              }}
            />
          </svg>
        </motion.div>
      ))}
    </>
  )

  const renderElements = () => {
    switch (theme) {
      case 'tech': return getTechElements()
      case 'business': return getBusinessElements()
      case 'abstract': return getAbstractElements()
      default: return getTechElements()
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {renderElements()}
    </div>
  )
}