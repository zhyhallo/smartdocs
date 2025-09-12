import { motion } from "framer-motion"
import { useBackgroundParallax, useMultiLayerParallax } from "@/hooks/useParallax"

interface ParallaxBackgroundProps {
  variant?: 'dots' | 'circles' | 'geometric' | 'waves'
  intensity?: 'light' | 'medium' | 'strong'
  className?: string
}

export default function ParallaxBackground({ 
  variant = 'dots', 
  intensity = 'light',
  className = ""
}: ParallaxBackgroundProps) {
  const { slowLayer, mediumLayer, fastLayer } = useMultiLayerParallax()
  
  const getOpacity = () => {
    switch (intensity) {
      case 'light': return 0.03
      case 'medium': return 0.06
      case 'strong': return 0.1
      default: return 0.03
    }
  }

  const renderDots = () => (
    <>
      {/* Slow moving dots */}
      <motion.div
        style={{ y: slowLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`slow-${i}`}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: getOpacity()
            }}
          />
        ))}
      </motion.div>

      {/* Medium moving dots */}
      <motion.div
        style={{ y: mediumLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: getOpacity() * 0.8
            }}
          />
        ))}
      </motion.div>

      {/* Fast moving dots */}
      <motion.div
        style={{ y: fastLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`fast-${i}`}
            className="absolute w-3 h-3 bg-secondary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: getOpacity() * 0.6
            }}
          />
        ))}
      </motion.div>
    </>
  )

  const renderCircles = () => (
    <>
      <motion.div
        style={{ y: slowLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`circle-slow-${i}`}
            className="absolute border border-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              opacity: getOpacity()
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: mediumLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`circle-medium-${i}`}
            className="absolute border-2 border-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
              opacity: getOpacity() * 0.8
            }}
          />
        ))}
      </motion.div>
    </>
  )

  const renderGeometric = () => (
    <>
      <motion.div
        style={{ y: slowLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`geo-slow-${i}`}
            className="absolute bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${5 + Math.random() * 10}px`,
              height: `${5 + Math.random() * 10}px`,
              opacity: getOpacity(),
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: mediumLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`geo-medium-${i}`}
            className="absolute bg-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 15}px`,
              height: `${2 + Math.random() * 5}px`,
              opacity: getOpacity() * 0.8,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </motion.div>
    </>
  )

  const renderWaves = () => (
    <>
      <motion.div
        style={{ y: slowLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        <svg 
          width="100%" 
          height="100%" 
          className="absolute inset-0"
          style={{ opacity: getOpacity() }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <path
              key={`wave-${i}`}
              d={`M0,${100 + i * 150} Q${250},${50 + i * 150} ${500},${100 + i * 150} T${1000},${100 + i * 150}`}
              stroke="oklch(0.55 0.22 240)"
              strokeWidth="2"
              fill="none"
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        style={{ y: mediumLayer }}
        className="absolute inset-0 overflow-hidden"
      >
        <svg 
          width="100%" 
          height="100%" 
          className="absolute inset-0"
          style={{ opacity: getOpacity() * 0.8 }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <path
              key={`wave-medium-${i}`}
              d={`M0,${200 + i * 200} Q${300},${150 + i * 200} ${600},${200 + i * 200} T${1200},${200 + i * 200}`}
              stroke="oklch(0.65 0.18 220)"
              strokeWidth="1.5"
              fill="none"
            />
          ))}
        </svg>
      </motion.div>
    </>
  )

  const renderBackground = () => {
    switch (variant) {
      case 'dots': return renderDots()
      case 'circles': return renderCircles()
      case 'geometric': return renderGeometric()
      case 'waves': return renderWaves()
      default: return renderDots()
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {renderBackground()}
    </div>
  )
}