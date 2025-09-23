import { Button } from "@/components/ui/button"
import { Phone } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlMascot, ParallaxBackground, FloatingElements } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"
import { Card, CardContent } from "@/components/ui/card"

interface CTAProps {
  onContactClick: (service: string) => void
}

export default function CTA({ onContactClick }: CTAProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useTranslation()

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2 }
    }
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-primary/5 relative overflow-hidden" ref={ref}>
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="high" theme="abstract" />
      
      {/* Enhanced decorative owls - Hidden on mobile for better performance */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-16 left-1/4 opacity-5"
          animate={{
            rotate: [0, 15, -15, 0],
            y: [-8, 8, -8],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <OwlMascot variant="analyst" size="xs" animated={false} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-1/4 opacity-5"
          animate={{
            rotate: [0, -12, 12, 0],
            y: [5, -5, 5],
            x: [-3, 3, -3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <OwlMascot variant="analyst" size="xs" animated={false} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6"
            variants={itemVariants}
          >
            {t('cta.title')}
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
            variants={itemVariants}
          >
            {t('cta.subtitle')}
          </motion.p>
          
          {/* CTA Feature blocks - Mobile-First Cards */}
          <motion.div 
            className="mb-8 sm:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
          >
            {[
              {
                key: 'implementation',
                title: t('cta.features.implementation'),
                icon: '🚀'
              },
              {
                key: 'support',
                title: t('cta.features.support'),
                icon: '🛠️'
              },
              {
                key: 'quality',
                title: t('cta.features.quality'),
                icon: '⭐'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.key}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Card className="feature-card border border-border/50 shadow-sm hover:shadow-lg 
                                transition-all duration-300 bg-background/80 backdrop-blur-sm
                                flex flex-col items-center text-center p-4 sm:p-6
                                min-h-[120px] sm:min-h-[140px]">
                  <CardContent className="p-0 flex flex-col items-center text-center h-full justify-center">
                    
                    {/* Icon and Checkmark Section */}
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <motion.div
                        className="text-xl sm:text-2xl mr-3"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <motion.div
                        className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "#22c55e"
                        }}
                      >
                        <motion.span 
                          className="text-green-600 text-sm font-bold"
                          whileHover={{ color: "#ffffff" }}
                        >
                          ✓
                        </motion.span>
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <p className="text-sm sm:text-base font-medium text-foreground 
                                text-center leading-tight hover:text-primary 
                                transition-colors duration-300">
                      {feature.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Button */}
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
              className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 
                       w-full sm:w-auto max-w-sm mx-auto
                       relative overflow-hidden group
                       hover:shadow-xl transition-all duration-300"
              onClick={() => onContactClick(t('cta.button'))}
            >
              {/* Button highlight effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-md"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              />
              
              {/* Phone icon */}
              <motion.div
                className="mr-2 relative z-10"
                animate={{
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Phone size={20} />
              </motion.div>
              
              <span className="relative z-10">{t('cta.button')}</span>
              
              {/* Ripple effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{
                  x: '100%',
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}