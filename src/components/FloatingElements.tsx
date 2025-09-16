import { motion } from "framer-motion"

interface FloatingElementsProps {
  theme?: "tech" | "business" | "abstract"
  density?: "light" | "medium" | "dense" | "low" | "high"
  className?: string
}

export default function FloatingElements({
  theme = "tech",
  density = "light",
  className = ""
}: FloatingElementsProps) {
  // Simplified static elements for better performance
  const elements = [
    { id: 1, x: "10%", y: "20%", size: "w-2 h-2" },
    { id: 2, x: "80%", y: "15%", size: "w-3 h-3" },
    { id: 3, x: "15%", y: "70%", size: "w-2 h-2" },
    { id: 4, x: "75%", y: "65%", size: "w-4 h-4" },
    { id: 5, x: "90%", y: "50%", size: "w-2 h-2" }
  ]

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((element, index) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} rounded-full bg-primary/20`}
          style={{
            left: element.x,
            top: element.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2], 
            scale: [1, 1.2, 1],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />
      ))}
    </div>
  )
}