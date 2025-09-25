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
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/8 via-background to-accent/8 relative overflow-hidden" ref={ref}>
      {/* Enhanced Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="high" theme="abstract" />
      
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-primary rounded-3xl rotate-12"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 border border-accent rounded-2xl -rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-primary/40 rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 border border-accent/40 -rotate-30"></div>
      </div>
      
      {/* Enhanced decorative owls */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <motion.div
          className="absolute top-16 left-1/4 opacity-8"
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
          <OwlMascot variant="analyst" size="sm" animated={false} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-1/4 opacity-8"
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
          <OwlMascot variant="party" size="sm" animated={true} />
        </motion.div>
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/3 right-1/5 w-8 h-10 bg-white/5 border border-primary/20 rounded-md"
          animate={{
            y: [-6, 6, -6],
            rotate: [-8, 8, -8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Enhanced header section */}
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-6 py-3 bg-gradient-to-r from-primary/15 to-accent/15 text-primary rounded-full text-sm font-semibold">
              🎯 Готові розпочати
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('cta.title')}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg text-muted-foreground mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('cta.subtitle')}
          </motion.p>
          
          {/* Enhanced CTA Feature blocks */}
          <motion.div 
            className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {[
              {
                key: 'implementation',
                title: t('cta.features.implementation'),
                icon: '🚀',
                description: 'Швидке налаштування за 1 день'
              },
              {
                key: 'support',
                title: t('cta.features.support'),
                icon: '🛠️',
                description: 'Професійна допомога 24/7'
              },
              {
                key: 'quality',
                title: t('cta.features.quality'),
                icon: '⭐',
                description: '100% гарантія результату'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.key}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Card className="feature-card border-2 border-border/30 hover:border-primary/30 
                                shadow-lg hover:shadow-xl transition-all duration-500 
                                bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-md
                                flex flex-col items-center text-center p-6 sm:p-8 group
                                min-h-[180px] sm:min-h-[200px] relative overflow-hidden">
                  
                  {/* Card background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-0 flex flex-col items-center text-center h-full justify-between relative z-10">
                    
                    {/* Enhanced Icon Section */}
                    <div className="flex flex-col items-center mb-4">
                      <motion.div
                        className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.4 }
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 
                                 flex items-center justify-center shadow-md group-hover:shadow-lg 
                                 transition-shadow duration-300"
                        whileHover={{
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <motion.span 
                          className="text-white text-lg font-bold"
                          whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.2 }
                          }}
                        >
                          ✓
                        </motion.span>
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 
                                   group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground 
                                   group-hover:text-foreground/80 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enhanced CTA Button */}
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
              className="text-xl sm:text-2xl px-12 sm:px-16 py-6 sm:py-8 
                       w-full sm:w-auto max-w-md mx-auto
                       relative overflow-hidden group font-bold
                       bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90
                       shadow-xl hover:shadow-2xl transition-all duration-500 border-0"
              onClick={() => onContactClick(t('cta.button'))}
            >
              {/* Enhanced button background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              />
              
              {/* Enhanced phone icon animation */}
              <motion.div
                className="mr-3 relative z-10"
                animate={{
                  y: [0, -3, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Phone size={24} weight="bold" />
              </motion.div>
              
              <span className="relative z-10 flex items-center gap-3">
                {t('cta.button')}
                <motion.span
                  animate={{
                    x: [0, 4, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </span>
              
              {/* Enhanced ripple effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{
                  x: '100%',
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              />
            </Button>
          </motion.div>
          
          {/* Additional trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1,
              y: 0,
              transition: { delay: 1, duration: 0.6 }
            } : { opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Безкоштовна консультація</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Без зобов'язань</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Відповідь за 1 годину</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}