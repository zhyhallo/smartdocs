import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { ParallaxBackground, FloatingElements } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"

interface PricingProps {
  onContactClick: (service: string) => void
}

export default function Pricing({ onContactClick }: PricingProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useTranslation()

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
    t('pricing.features.license'),
    t('pricing.features.documentation'),
    t('pricing.features.installation')
  ]

  return (
    <section id="pricing" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="low" theme="business" />
      
      {/* Additional floating currency symbols with enhanced parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-6xl text-primary/10 font-bold"
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 0.9, 1],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {t('pricing.symbol')}
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-16 text-4xl text-accent/10 font-bold"
          animate={{
            rotate: [0, -20, 20, 0],
            scale: [0.8, 1.2, 0.8],
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          1500
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 right-20 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-16 h-16 border-4 border-primary rounded-full flex items-center justify-center">
            <Check size={24} className="text-primary" />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('pricing.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('pricing.subtitle')}</p>
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
            <Card className="border-primary/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
              {/* Card background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-accent/5 rounded-full"></div>
              
              <CardContent className="p-8 text-center relative z-10">
                <motion.div 
                  className="mb-6"
                  variants={priceVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.div 
                    className="text-4xl font-bold text-primary mb-2"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {t('pricing.price')}
                  </motion.div>
                  <div className="text-muted-foreground">{t('pricing.currency')}</div>
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
                      whileHover={{
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
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
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                          transition: { duration: 0.3 }
                        }}
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
                    className="w-full text-lg py-6 cursor-pointer relative overflow-hidden" 
                    size="lg"
                    onClick={() => onContactClick(t('pricing.cta'))}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{
                        x: '100%',
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                    />
                    <span className="relative z-10">{t('pricing.cta')}</span>
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
                  {t('pricing.activation')}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}