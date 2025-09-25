import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface OwlMascotProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
  animated?: boolean
  variant?: "default" | "analyst" | "loader" | "tech" | "party"
}

export default function OwlMascot({ 
  size = "md", 
  className = "", 
  animated = true, 
  variant = "default" 
}: OwlMascotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isLookingAround, setIsLookingAround] = useState(false)
  
  const sizeClasses = {
    xs: "w-6 h-6 sm:w-10 sm:h-10",      // Very small - зменшено на мобільних на 50%
    sm: "w-6 h-6 sm:w-14 sm:h-14",      // Small - зменшено на мобільних на 50%
    md: "w-8 h-8 sm:w-20 sm:h-20",      // Medium - зменшено на мобільних на 50%
    lg: "w-18 h-18 sm:w-42 sm:h-42",    // Large - зменшено на мобільних на 50%
    xl: "w-24 h-24 sm:w-54 sm:h-54",    // Extra large - зменшено на мобільних на 50%
    "2xl": "w-30 h-30 sm:w-72 sm:h-72"  // Super large для hero - зменшено на мобільних на 50%
  }

  // Blink animation timer
  useEffect(() => {
    if (!animated || variant === "loader") return
    
    const blinkTimer = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 4000 + Math.random() * 3000)

    return () => clearInterval(blinkTimer)
  }, [animated, variant])

  // Look around animation timer
  useEffect(() => {
    if (!animated || variant === "loader") return
    
    const lookTimer = setInterval(() => {
      setIsLookingAround(true)
      setTimeout(() => setIsLookingAround(false), 2000)
    }, 8000 + Math.random() * 4000)

    return () => clearInterval(lookTimer)
  }, [animated, variant])

  const handleMouseEnter = () => {
    if (variant === "loader") return
    setIsHovered(true)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2000)
  }

  const handleMouseLeave = () => {
    if (variant === "loader") return
    setIsHovered(false)
  }

  // Loader variant
  if (variant === "loader") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          className={`relative ${sizeClasses[size]}`}
          animate={{
            rotate: [0, -8, 8, -5, 5, 0],
            y: [0, -2, 0, -1, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-primary rounded-full shadow-lg"
            animate={{
              scale: [1, 1.05, 1, 1.02, 1],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex space-x-1">
                {[0, 1].map((i) => (
                  <motion.div 
                    key={i}
                    className="w-2 h-2 bg-white rounded-full relative shadow-inner"
                    animate={{
                      scaleY: [1, 0.1, 1, 1, 1, 1, 1, 0.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-accent rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

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

  // Tech variant - для технічних розділів з цифровими ефектами
  if (variant === "tech") {
    return (
      <motion.div
        className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
        animate={{
          rotate: [0, -2, 2, -1, 1, 0],
          scale: [1, 1.02, 0.98, 1.01, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Цифрові частинки навколо сови */}
        <AnimatePresence>
          {(isHovered || showSparkles) && (
            <>
              {['01', '10', '11', '00', '01'].map((binary, i) => (
                <motion.div
                  key={`binary-${i}`}
                  className="absolute text-primary/70 text-xs font-mono font-bold"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + (i % 2) * 60}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.2, 1, 0],
                    y: [0, -20, -40, -60],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                >
                  {binary}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Основне тіло сови з tech стилем */}
        <motion.div
          className="w-full h-full bg-gradient-to-br from-primary/90 via-primary to-primary/80 rounded-full shadow-lg border-2 border-accent/30"
          animate={{
            boxShadow: [
              "0 4px 20px rgba(37, 99, 235, 0.3)",
              "0 4px 30px rgba(37, 99, 235, 0.5)",
              "0 4px 20px rgba(37, 99, 235, 0.3)"
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Очі сови з tech ефектом */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-br from-accent to-accent/80 rounded-full shadow-inner relative"
                  animate={{
                    scale: isBlinking ? [1, 0.1, 1] : 1,
                    boxShadow: [
                      "0 0 5px rgba(147, 51, 234, 0.5)",
                      "0 0 15px rgba(147, 51, 234, 0.8)",
                      "0 0 5px rgba(147, 51, 234, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: isBlinking ? 0.3 : 1.5,
                    repeat: isBlinking ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-1 h-1 bg-white rounded-full"
                      animate={{
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Party variant - святковий варіант з конфеті
  if (variant === "party") {
    return (
      <motion.div
        className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
        animate={{
          rotate: [0, -5, 5, -3, 3, 0],
          y: [0, -3, 0, -2, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Конфеті ефект */}
        <AnimatePresence>
          {(isHovered || showSparkles) && (
            <>
              {['🎉', '🎊', '✨', '🎈', '🎁', '🎂'].map((emoji, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute text-lg"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.3, 1.1, 0],
                    rotate: [0, 180, 360],
                    y: [0, -30, -50, -80],
                    x: [0, Math.random() * 40 - 20],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.15,
                    ease: "easeOut"
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Основне тіло сови зі святковим стилем */}
        <motion.div
          className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-lg border-2 border-yellow-300"
          animate={{
            background: [
              "linear-gradient(to bottom right, #fbbf24, #f97316, #ef4444)",
              "linear-gradient(to bottom right, #f97316, #ef4444, #ec4899)",
              "linear-gradient(to bottom right, #ef4444, #ec4899, #a855f7)",
              "linear-gradient(to bottom right, #fbbf24, #f97316, #ef4444)"
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Очі сови зі святковим ефектом */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-br from-white to-yellow-200 rounded-full shadow-inner relative"
                  animate={{
                    scale: isBlinking ? [1, 0.1, 1] : [1, 1.1, 1],
                  }}
                  transition={{
                    duration: isBlinking ? 0.3 : 0.8,
                    repeat: isBlinking ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-1 h-1 bg-purple-600 rounded-full"
                      animate={{
                        scale: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Main owl variants
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
      scale: 1.15,
      rotate: [0, -3, 3, -2, 2, 0],
      y: [-2, -8, -4, -6, -2],
      transition: {
        duration: 0.8,
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

  const OwlSVG = () => (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Document/Paper animation for new theme */}
      <AnimatePresence>
        {showSparkles && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.g key={`doc-${i}`}>
                <motion.rect
                  x={50 + (i * 20)}
                  y={20 + (i % 2) * 15}
                  width="8"
                  height="12"
                  rx="1"
                  fill="oklch(0.85 0.15 220)"
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    rotate: [-45, 0, 45],
                    y: [0, -15, -30]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.15,
                    ease: "easeOut"
                  }}
                />
                <motion.line
                  x1={52 + (i * 20)}
                  y1={24 + (i % 2) * 15}
                  x2={56 + (i * 20)}
                  y2={24 + (i % 2) * 15}
                  stroke="oklch(0.75 0.12 240)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, delay: i * 0.15 }}
                />
              </motion.g>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Shadow/Glow behind owl */}
      <motion.ellipse
        cx="100"
        cy="140"
        rx="60"
        ry="70"
        fill="url(#owlGlow)"
        opacity="0.3"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="owlGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.75 0.15 240)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="oklch(0.65 0.18 220)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.60 0.20 240)"/>
          <stop offset="100%" stopColor="oklch(0.50 0.24 240)"/>
        </linearGradient>
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.70 0.16 220)"/>
          <stop offset="100%" stopColor="oklch(0.60 0.20 220)"/>
        </linearGradient>
      </defs>

      {/* Owl Body with gradient and modern styling */}
      <ellipse
        cx="100"
        cy="130"
        rx="45"
        ry="55"
        fill="url(#bodyGrad)"
        className="drop-shadow-lg filter"
      />
      
      {/* Subtle body pattern - tech inspired */}
      <motion.g opacity="0.2">
        <path d="M75 110 L125 110" stroke="oklch(0.85 0.10 240)" strokeWidth="1" />
        <path d="M80 120 L120 120" stroke="oklch(0.85 0.10 240)" strokeWidth="0.5" />
        <path d="M85 140 L115 140" stroke="oklch(0.85 0.10 240)" strokeWidth="0.5" />
        <path d="M80 155 L120 155" stroke="oklch(0.85 0.10 240)" strokeWidth="0.5" />
      </motion.g>
      
      {/* Owl Head with gradient */}
      <motion.circle
        cx="100"
        cy="80"
        r="50"
        fill="url(#headGrad)"
        className="drop-shadow-lg filter"
        animate={
          isLookingAround || isHovered ? {
            rotate: [0, -8, 8, -5, 0],
          } : {}
        }
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Modern Ear Tufts - more tech-like */}
      <motion.path
        d="M70 45 L75 25 L85 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={isHovered ? { rotate: [-2, 2, -2] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="drop-shadow-sm"
      />
      <motion.path
        d="M130 45 L125 25 L115 40 Z"
        fill="oklch(0.55 0.22 240)"
        animate={isHovered ? { rotate: [2, -2, 2] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
        className="drop-shadow-sm"
      />
      
      {/* Eye Background with subtle glow */}
      <circle cx="85" cy="75" r="18" fill="white" className="drop-shadow-sm" />
      <circle cx="115" cy="75" r="18" fill="white" className="drop-shadow-sm" />
      
      {/* Eye outer rings for depth */}
      <circle cx="85" cy="75" r="16" fill="none" stroke="oklch(0.90 0.05 240)" strokeWidth="1" opacity="0.3" />
      <circle cx="115" cy="75" r="16" fill="none" stroke="oklch(0.90 0.05 240)" strokeWidth="1" opacity="0.3" />
      
      {/* Enhanced Pupils with blink and expressions */}
      <motion.circle 
        cx="85" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        animate={
          isBlinking ? { scaleY: 0.1 } : 
          isHovered ? { 
            scaleY: [1, 0.8, 1.2, 1], 
            scaleX: [1, 1.1, 0.9, 1],
            fill: ["oklch(0.15 0.08 240)", "oklch(0.25 0.15 240)", "oklch(0.15 0.08 240)"]
          } : {}
        }
        transition={{ duration: isBlinking ? 0.1 : 0.6 }}
        className="drop-shadow-sm"
      />
      <motion.circle 
        cx="115" 
        cy="75" 
        r="12" 
        fill="oklch(0.15 0.08 240)"
        animate={
          isBlinking ? { scaleY: 0.1 } : 
          isHovered ? { 
            scaleY: [1, 0.8, 1.2, 1], 
            scaleX: [1, 1.1, 0.9, 1],
            fill: ["oklch(0.15 0.08 240)", "oklch(0.25 0.15 240)", "oklch(0.15 0.08 240)"]
          } : {}
        }
        transition={{ duration: isBlinking ? 0.1 : 0.6 }}
        className="drop-shadow-sm"
      />
      
      {/* Enhanced eye shine with multiple reflections */}
      <circle cx="88" cy="72" r="3" fill="white" />
      <circle cx="118" cy="72" r="3" fill="white" />
      <circle cx="82" cy="78" r="1.5" fill="white" opacity="0.6" />
      <circle cx="112" cy="78" r="1.5" fill="white" opacity="0.6" />
      
      {/* Modern Beak with gradient */}
      <path
        d="M100 85 L90 95 L110 95 Z"
        fill="oklch(0.75 0.15 60)"
        className="drop-shadow-sm"
      />
      <path
        d="M100 85 L95 90 L105 90 Z"
        fill="oklch(0.85 0.10 60)"
        opacity="0.7"
      />
      
      {/* Enhanced Wings with better animation */}
      <motion.ellipse
        cx="75"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        animate={
          isHovered ? {
            rotate: [0, -25, 15, -20, 10, -15, 5, 0],
            y: [0, -2, -1, -3, -1, -2, 0, 0],
            scale: [1, 1.05, 1]
          } : {}
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "75px 120px" }}
        className="drop-shadow-md"
      />
      <motion.ellipse
        cx="125"
        cy="125"
        rx="15"
        ry="25"
        fill="oklch(0.45 0.20 240)"
        animate={
          isHovered ? {
            rotate: [0, 25, -15, 20, -10, 15, -5, 0],
            y: [0, -2, -1, -3, -1, -2, 0, 0],
            scale: [1, 1.05, 1]
          } : {}
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "125px 120px" }}
        className="drop-shadow-md"
      />
      
      {/* Wing details - feather patterns */}
      <motion.ellipse
        cx="75"
        cy="120"
        rx="8"
        ry="15"
        fill="oklch(0.40 0.22 240)"
        opacity="0.6"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.2 }}
      />
      <motion.ellipse
        cx="125"
        cy="120"
        rx="8"
        ry="15"
        fill="oklch(0.40 0.22 240)"
        opacity="0.6"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.2 }}
      />
      
      {/* Enhanced Chest Pattern - more detailed */}
      <ellipse
        cx="100"
        cy="120"
        rx="25"
        ry="18"
        fill="oklch(0.75 0.12 220)"
        opacity="0.5"
      />
      <ellipse
        cx="100"
        cy="125"
        rx="18"
        ry="12"
        fill="oklch(0.80 0.08 220)"
        opacity="0.4"
      />
      
      {/* Tech-inspired chest pattern */}
      <motion.g opacity="0.3">
        <rect x="92" y="115" width="16" height="1" rx="0.5" fill="oklch(0.85 0.10 240)" />
        <rect x="95" y="120" width="10" height="1" rx="0.5" fill="oklch(0.85 0.10 240)" />
        <rect x="97" y="125" width="6" height="1" rx="0.5" fill="oklch(0.85 0.10 240)" />
      </motion.g>
      
      {/* Enhanced Feet with better detail */}
      <ellipse cx="90" cy="175" rx="10" ry="5" fill="oklch(0.75 0.15 60)" className="drop-shadow-sm" />
      <ellipse cx="110" cy="175" rx="10" ry="5" fill="oklch(0.75 0.15 60)" className="drop-shadow-sm" />
      
      {/* Toe details */}
      <ellipse cx="85" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      <ellipse cx="95" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      <ellipse cx="105" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      <ellipse cx="115" cy="174" rx="2" ry="3" fill="oklch(0.70 0.18 60)" />
      
      {/* Enhanced glasses for analyst variant - more modern tech look */}
      {variant === "analyst" && (
        <motion.g 
          opacity="0.8"
          animate={
            isHovered ? { 
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.05, 1]
            } : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Main lens frames */}
          <circle cx="85" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2.5" />
          <circle cx="115" cy="75" r="20" fill="none" stroke="oklch(0.25 0.08 240)" strokeWidth="2.5" />
          
          {/* Bridge */}
          <line x1="105" y1="75" x2="95" y2="75" stroke="oklch(0.25 0.08 240)" strokeWidth="2.5" />
          
          {/* Lens reflections for tech look */}
          <circle cx="85" cy="75" r="18" fill="none" stroke="oklch(0.85 0.10 220)" strokeWidth="0.5" opacity="0.6" />
          <circle cx="115" cy="75" r="18" fill="none" stroke="oklch(0.85 0.10 220)" strokeWidth="0.5" opacity="0.6" />
          
          {/* Tech-inspired HUD elements */}
          <motion.g opacity="0.4">
            <line x1="75" y1="65" x2="80" y2="65" stroke="oklch(0.60 0.15 200)" strokeWidth="0.5" />
            <line x1="120" y1="65" x2="125" y2="65" stroke="oklch(0.60 0.15 200)" strokeWidth="0.5" />
            <circle cx="85" cy="85" r="1" fill="oklch(0.60 0.15 200)" />
            <circle cx="115" cy="85" r="1" fill="oklch(0.60 0.15 200)" />
          </motion.g>
        </motion.g>
      )}

      {/* Document processing indicators for new invoice theme */}
      {variant === "default" && isHovered && (
        <motion.g>
          {/* Floating document icons */}
          <motion.rect
            x="130"
            y="60"
            width="12"
            height="16"
            rx="1"
            fill="oklch(0.80 0.12 220)"
            opacity="0.7"
            animate={{
              y: [60, 45, 60],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.g>
            <motion.line x1="132" y1="64" x2="140" y2="64" stroke="oklch(0.50 0.18 240)" strokeWidth="0.5" />
            <motion.line x1="132" y1="67" x2="138" y2="67" stroke="oklch(0.50 0.18 240)" strokeWidth="0.5" />
            <motion.line x1="132" y1="70" x2="140" y2="70" stroke="oklch(0.50 0.18 240)" strokeWidth="0.5" />
          </motion.g>
          
          {/* Processing arrow */}
          <motion.path
            d="M145 68 L155 68 M150 63 L155 68 L150 73"
            stroke="oklch(0.60 0.20 120)"
            strokeWidth="1.5"
            fill="none"
            animate={{
              x: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>
      )}
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
      className="cursor-pointer relative max-w-fit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex-shrink-0">
        <OwlSVG />
      </div>
      
      {/* Enhanced interactive elements */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Document/Invoice themed particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`invoice-${i}`}
                className="absolute pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 80 - 40,
                  y: Math.random() * 60 - 30
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -40, -80],
                  rotate: [0, Math.random() * 360]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  left: `${50 + Math.random() * 30 - 15}%`,
                  top: `${50 + Math.random() * 30 - 15}%`,
                  position: 'absolute'
                }}
              >
                <div className="w-4 h-5 bg-primary/20 rounded-sm border border-primary/40 flex flex-col justify-center items-center">
                  <div className="w-2.5 h-0.5 bg-primary/60 rounded mb-0.5"></div>
                  <div className="w-2 h-0.5 bg-primary/40 rounded mb-0.5"></div>
                  <div className="w-2.5 h-0.5 bg-primary/60 rounded"></div>
                </div>
              </motion.div>
            ))}
            
            {/* Success checkmarks for automation theme */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`check-${i}`}
                className="absolute text-green-500 font-bold pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 60 - 30,
                  y: Math.random() * 40 - 20
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -20, -40],
                  rotate: [0, 180]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.4 + 1,
                  ease: "easeOut"
                }}
                style={{
                  fontSize: `${12 + i * 2}px`,
                  left: `${50 + Math.random() * 20 - 10}%`,
                  top: `${50 + Math.random() * 20 - 10}%`,
                  position: 'absolute'
                }}
              >
                ✓
              </motion.div>
            ))}
            
            {/* Tech particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`tech-${i}`}
                className="absolute text-accent/70 font-mono text-xs pointer-events-none"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 50 - 25,
                  y: Math.random() * 30 - 15
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -30, -60],
                  rotate: [0, Math.random() * 90 - 45]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 3,
                  delay: i * 0.2 + 0.5,
                  ease: "easeOut"
                }}
                style={{
                  left: `${50 + Math.random() * 40 - 20}%`,
                  top: `${50 + Math.random() * 40 - 20}%`,
                  position: 'absolute'
                }}
              >
                {['{ }', '</>', 'AI', '1C'][i]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}