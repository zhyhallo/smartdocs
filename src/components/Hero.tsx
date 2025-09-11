import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface HeroProps {
  onContactClick: (service: string) => void
}

export default function Hero({ onContactClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-6">
              Готове рішення для 1С:Enterprise
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight"
            variants={itemVariants}
          >
            Driver POSNET / Thermal
            <motion.span 
              className="block text-primary"
              variants={itemVariants}
            >
              для 1С:Enterprise
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Професійна зовнішня компонента для інтеграції з фіскальними реєстраторами POSNET та Thermal. 
            Надійність, стабільність і повна техпідтримка.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 cursor-pointer"
              onClick={() => onContactClick("Купити Driver POSNET")}
            >
              Купити зараз - 1500 zł
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}