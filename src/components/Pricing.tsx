import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"

interface PricingProps {
  onContactClick: (service: string) => void
}

export default function Pricing({ onContactClick }: PricingProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const headerVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }

  const priceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: "backOut"
      }
    }
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.7 + (index * 0.1),
        ease: "easeOut"
      }
    })
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.2,
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

  const features = [
    "Повна ліцензія на використання",
    "Технічна підтримка 1 рік",
    "Безкоштовні оновлення 1 рік",
    "Документація та інструкції",
    "Допомога з встановленням"
  ]

  return (
    <section id="pricing" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Ціна та умови</h2>
          <p className="text-lg text-muted-foreground">Прозора ціна без прихованих платежів</p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="border-primary/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <motion.div 
                  className="mb-6"
                  variants={priceVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className="text-4xl font-bold text-primary mb-2">1500 zł</div>
                  <div className="text-muted-foreground">разовий платіж</div>
                </motion.div>

                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center"
                      custom={index}
                      variants={listItemVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { 
                          scale: 1, 
                          rotate: 0,
                          transition: {
                            delay: 0.8 + (index * 0.1),
                            duration: 0.4,
                            ease: "backOut"
                          }
                        } : { scale: 0, rotate: -180 }}
                      >
                        <Check className="text-primary mr-3" size={20} />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={buttonVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    className="w-full text-lg py-6 cursor-pointer" 
                    size="lg"
                    onClick={() => onContactClick("Купити Driver POSNET - 1500 zł")}
                  >
                    Купити зараз
                  </Button>
                </motion.div>

                <motion.p 
                  className="text-xs text-muted-foreground mt-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { 
                    opacity: 1,
                    transition: { delay: 1.5, duration: 0.5 }
                  } : { opacity: 0 }}
                >
                  Активація протягом 24 годин після оплати
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}