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
    t('pricing.features.examples'),
    t('pricing.features.installation')
  ]

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden" ref={ref}>
      {/* Enhanced Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="low" theme="business" />
      
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-xl rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-accent rounded-2xl -rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 border border-primary/50 rotate-12"></div>
      </div>
      
      {/* Enhanced floating currency symbols */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <motion.div
          className="absolute top-20 left-20 text-7xl text-primary/15 font-bold"
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
          className="absolute bottom-32 right-16 text-5xl text-accent/15 font-bold"
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
          💰
        </motion.div>
        
        {/* Additional tech elements for invoice theme */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-16 bg-white/5 border border-primary/20 rounded-lg"
          animate={{
            y: [-8, 8, -8],
            rotate: [-5, 5, -5],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Enhanced Header Section */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-20"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-6 py-3 bg-gradient-to-r from-primary/15 to-accent/15 text-primary rounded-full text-sm font-semibold">
              💎 Вигідні тарифи
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('pricing.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Enhanced Pricing Card */}
        <div className="max-w-lg mx-auto">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="pricing-card border-2 border-primary/30 hover:border-primary/50 
                            shadow-2xl hover:shadow-3xl transition-all duration-500 
                            relative overflow-hidden bg-gradient-to-br from-background/95 to-background/85 
                            backdrop-blur-lg w-full mx-auto">
              
              {/* Enhanced card background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/8"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-xl"></div>
              
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <motion.div 
                  className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 4px 6px rgba(0,0,0,0.1)', '0 8px 15px rgba(0,0,0,0.2)', '0 4px 6px rgba(0,0,0,0.1)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⭐ Популярний вибір
                </motion.div>
              </div>
              
              <CardContent className="p-8 sm:p-10 text-center relative z-10 pt-12">
                
                {/* Enhanced Price Section */}
                <motion.div 
                  className="mb-8 sm:mb-10"
                  variants={priceVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.div 
                    className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {t('pricing.price')}
                  </motion.div>
                  <div className="text-base sm:text-lg text-muted-foreground font-medium">
                    {t('pricing.currency')}
                  </div>
                </motion.div>

                {/* Enhanced Features List */}
                <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-start text-left group"
                      custom={index}
                      variants={listItemVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-4 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <Check className="text-white" size={14} weight="bold" />
                      </div>
                      <span className="text-base sm:text-lg text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <motion.div
                  variants={buttonVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    className="w-full text-lg sm:text-xl py-6 sm:py-7 relative overflow-hidden font-bold
                             bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90
                             shadow-xl hover:shadow-2xl transition-all duration-500 border-0" 
                    size="lg"
                    onClick={() => onContactClick(t('pricing.cta'))}
                  >
                    {/* Enhanced button highlight effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{
                        x: '100%',
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span>🚀</span>
                      {t('pricing.cta')}
                      <span>💫</span>
                    </span>
                  </Button>
                </motion.div>

                {/* Enhanced Activation Note */}
                <motion.div 
                  className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { 
                    opacity: 1,
                    y: 0,
                    transition: { delay: 1.5, duration: 0.5 }
                  } : { opacity: 0, y: 20 }}
                >
                  <p className="text-sm sm:text-base text-foreground/80 font-medium">
                    ⚡ {t('pricing.activation')}
                  </p>
                </motion.div>
                
                {/* Trust indicators */}
                <motion.div 
                  className="flex justify-center gap-6 mt-8 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { 
                    opacity: 1,
                    transition: { delay: 2, duration: 0.5 }
                  } : { opacity: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Безпечно</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Підтримка 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>Гарантія</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}