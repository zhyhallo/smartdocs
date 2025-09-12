import { motion } from "framer-motion"
import OwlLoader from "./OwlLoader"

interface LoadingStateProps {
  message?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function LoadingState({ 
  message = "Завантаження...", 
  size = "md", 
  className = "" 
}: LoadingStateProps) {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-8 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <OwlLoader size={size} />
      <motion.p
        className="mt-4 text-muted-foreground font-medium"
        variants={messageVariants}
        initial="initial"
        animate="animate"
      >
        {message}
      </motion.p>
    </motion.div>
  )
}