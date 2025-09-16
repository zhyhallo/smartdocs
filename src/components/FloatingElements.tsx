import { motion } from "framer-motion"
import { useMultiLayerParallax } from "@/hooks/useParallax"

interface FloatingElementsProps {
  theme?: "tech" | "business" | "abstract"
  density?: "light" | "medium" | "dense" | "low" | "high"
  className?: string
}

export default function FloatingElements({
  theme = "tech",
  density = "medium",
  className = ""
}: FloatingElementsProps) {
  const { slowLayer, mediumLayer, fastLayer } = useMultiLayerParallax()

  // Use the parallax values directly
  const slowY = slowLayer
  const mediumY = mediumLayer
  const fastY = fastLayer

  // Density settings - normalize different naming conventions
  const densityMap = {
    light: { slow: 2, medium: 3, fast: 2 },
    low: { slow: 2, medium: 3, fast: 2 }, // alias for light
    medium: { slow: 3, medium: 4, fast: 3 },
    dense: { slow: 4, medium: 6, fast: 4 },
    high: { slow: 4, medium: 6, fast: 4 } // alias for dense
  }
  const counts = densityMap[density]

  const getTechElements = () => (
    <>
      {/* Database icons floating */}
      {Array.from({ length: counts.slow }).map((_, i) => (
        <motion.div
          key={`tech-slow-${i}`}
          className="absolute"
          style={{
            y: slowY,
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
          <svg width="24" height="24" className="opacity-10 text-primary">
            <path
              fill="currentColor"
              d="M12,3 L20,9 L20,15 L12,21 L4,15 L4,9 L12,3 Z M12,5.7 L6.4,10 L6.4,14 L12,18.3 L17.6,14 L17.6,10 L12,5.7 Z"
            />
          </svg>
        </motion.div>
      ))}

      {/* Circuit patterns */}
      {Array.from({ length: counts.medium }).map((_, i) => (
        <motion.div
          key={`tech-medium-${i}`}
          className="absolute"
          style={{
            y: mediumY,
            right: `${10 + (i * 25)}%`,
            top: `${30 + (i * 20)}%`,
          }}
        >
          <svg width="40" height="40" className="opacity-10">
            <path
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-accent"
              d="M5,5 L35,5 L35,20 L20,20 L20,35 L5,35 Z"
            />
            <circle cx="20" cy="20" r="3" fill="currentColor" className="text-primary" />
          </svg>
        </motion.div>
      ))}

      {/* Code brackets */}
      {Array.from({ length: counts.fast }).map((_, i) => (
        <motion.div
          key={`tech-fast-${i}`}
          className="absolute text-2xl font-mono text-accent/20"
          style={{
            y: fastY,
            left: `${60 + (i * 15)}%`,
            bottom: `${20 + (i * 25)}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          {i % 2 === 0 ? "{}" : "</>"}
        </motion.div>
      ))}
    </>
  )

  const getBusinessElements = () => (
    <>
      {/* Chart bars */}
      {Array.from({ length: counts.slow }).map((_, i) => (
        <motion.div
          key={`biz-slow-${i}`}
          className="absolute"
          style={{
            y: slowY,
            left: `${15 + (i * 25)}%`,
            top: `${25 + (i * 10)}%`,
          }}
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        >
          <div className="w-4 h-8 bg-primary/20 rounded-sm" />
        </motion.div>
      ))}

      {/* Currency symbols */}
      {Array.from({ length: counts.medium }).map((_, i) => (
        <motion.div
          key={`biz-medium-${i}`}
          className="absolute text-xl text-accent/15 font-bold"
          style={{
            y: mediumY,
            right: `${20 + (i * 20)}%`,
            bottom: `${30 + (i * 15)}%`,
          }}
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.7
          }}
        >
          {["€", "$", "£"][i % 3]}
        </motion.div>
      ))}

      {/* Document icons */}
      {Array.from({ length: counts.fast }).map((_, i) => (
        <motion.div
          key={`biz-fast-${i}`}
          className="absolute"
          style={{
            y: fastY,
            left: `${50 + (i * 12)}%`,
            top: `${40 + (i * 18)}%`,
          }}
        >
          <svg width="20" height="20" className="opacity-15 text-secondary">
            <rect
              x="2"
              y="2"
              width="12"
              height="16"
              fill="currentColor"
              rx="1"
            />
            <rect
              x="4"
              y="6"
              width="8"
              height="1"
              fill="white"
            />
            <rect
              x="4"
              y="9"
              width="6"
              height="1"
              fill="white"
            />
          </svg>
        </motion.div>
      ))}
    </>
  )

  const getAbstractElements = () => (
    <>
      {/* Geometric shapes */}
      {Array.from({ length: counts.slow }).map((_, i) => (
        <motion.div
          key={`abstract-slow-${i}`}
          className="absolute"
          style={{
            y: slowY,
            left: `${20 + (i * 30)}%`,
            top: `${15 + (i * 20)}%`,
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 1.2
          }}
        >
          <div className="w-6 h-6 bg-accent/10 rotate-45" />
        </motion.div>
      ))}

      {/* Circles */}
      {Array.from({ length: counts.medium }).map((_, i) => (
        <motion.div
          key={`abstract-medium-${i}`}
          className="absolute"
          style={{
            y: mediumY,
            right: `${15 + (i * 22)}%`,
            bottom: `${25 + (i * 18)}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.8
          }}
        >
          <div className="w-8 h-8 bg-primary/20 rounded-full" />
        </motion.div>
      ))}

      {/* Lines */}
      {Array.from({ length: counts.fast }).map((_, i) => (
        <motion.div
          key={`abstract-fast-${i}`}
          className="absolute"
          style={{
            y: fastY,
            left: `${40 + (i * 15)}%`,
            top: `${35 + (i * 12)}%`,
          }}
          animate={{
            scaleX: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4
          }}
        >
          <div className="w-12 h-0.5 bg-accent/30" />
        </motion.div>
      ))}
    </>
  )

  const renderElements = () => {
    switch (theme) {
      case "tech":
        return getTechElements()
      case "business":
        return getBusinessElements()
      case "abstract":
        return getAbstractElements()
      default:
        return getTechElements()
    }
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {renderElements()}
    </div>
  )
}