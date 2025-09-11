import { Button } from "@/components/ui/button"
import { Phone } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlMascot } from "@/components"

interface CTAProps {
  onContactClick: (service: string) => void
}

export default function CTA({ onContactClick }: CTAProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 })

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
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
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
    <section className="py-20 bg-primary/5 relative overflow-hidden" ref={ref}>
      {/* Decorative owls for CTA section */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-16 left-1/4 opacity-5"
          animate={{
            rotate: [0, 10, 0],
            y: [-5, 5, -5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <OwlMascot size="sm" animated={false} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-1/4 opacity-5"
          animate={{
            rotate: [0, -8, 0],
            y: [3, -3, 3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <OwlMascot size="sm" animated={false} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl font-bold text-foreground mb-4"
            variants={itemVariants}
          >
            Готові до інтеграції з POSNET?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            variants={itemVariants}
          >
            Зв'яжіться з нами для детальної консультації або замовлення компонента
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 cursor-pointer"
              onClick={() => onContactClick("Купити Driver POSNET")}
            >
              <motion.div
                className="mr-2"
                whileHover={{ rotate: 10, transition: { duration: 0.2 } }}
              >
                <Phone size={20} />
              </motion.div>
              Замовити дзвінок
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}