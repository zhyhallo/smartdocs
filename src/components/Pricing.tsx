import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { ParallaxBackground, FloatingElements, OwlMascot } from "@/components"
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
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.3 + i * 0.1,
        ease: "easeOut"
      }
    })
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.6 + i * 0.1,
        ease: "easeOut"
      }
    })
  }

  const buttonVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 20px rgba(37, 99, 235, 0.2)"
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 30px rgba(37, 99, 235, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  // Тарифні плани
  const plans = [
    {
      id: 'basic',
      title: t('pricing.basic.title'),
      price: t('pricing.basic.price'),
      description: t('pricing.basic.description'),
      features: [
        t('pricing.basic.feature1'),
        t('pricing.basic.feature2'),
        t('pricing.basic.feature3'),
        t('pricing.basic.feature4')
      ],
      popular: false,
      bgColor: 'from-blue-50/80 to-indigo-50/80',
      borderColor: 'border-blue-200/60 hover:border-blue-300/80',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'standard',
      title: t('pricing.standard.title'),
      price: t('pricing.standard.price'),
      description: t('pricing.standard.description'),
      popular: t('pricing.standard.popular'),
      features: [
        t('pricing.standard.feature1'),
        t('pricing.standard.feature2'),
        t('pricing.standard.feature3'),
        t('pricing.standard.feature4'),
        t('pricing.standard.feature5')
      ],
      bgColor: 'from-primary/5 to-accent/10',
      borderColor: 'border-primary/30 hover:border-primary/50',
      buttonColor: 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90'
    },
    {
      id: 'enterprise',
      title: t('pricing.enterprise.title'),
      price: t('pricing.enterprise.price'),
      description: t('pricing.enterprise.description'),
      features: [
        t('pricing.enterprise.feature1'),
        t('pricing.enterprise.feature2'),
        t('pricing.enterprise.feature3'),
        t('pricing.enterprise.feature4'),
        t('pricing.enterprise.feature5'),
        t('pricing.enterprise.feature6')
      ],
      popular: false,
      bgColor: 'from-purple-50/80 to-pink-50/80',
      borderColor: 'border-purple-200/60 hover:border-purple-300/80',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ]

  return (
    <section id="pricing" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden" ref={ref}>
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
          className="absolute bottom-32 right-32 text-6xl text-accent/10 font-bold"
          animate={{
            rotate: [0, -20, 20, 0],
            scale: [1, 0.9, 1.1, 1],
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {t('pricing.symbol')}
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 right-20 text-5xl text-primary/8 font-bold"
          animate={{
            rotate: [0, 25, -25, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {t('pricing.symbol')}
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {t('pricing.title')}
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('pricing.subtitle')}
          </motion.p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg"
                    animate={{
                      y: [-2, 2, -2],
                      boxShadow: [
                        "0 4px 20px rgba(37, 99, 235, 0.3)",
                        "0 6px 25px rgba(147, 51, 234, 0.4)",
                        "0 4px 20px rgba(37, 99, 235, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {plan.popular}
                  </motion.div>
                </div>
              )}

              <Card className={`pricing-card border-2 ${plan.borderColor} 
                              shadow-2xl hover:shadow-3xl transition-all duration-500 
                              relative overflow-hidden bg-gradient-to-br ${plan.bgColor} 
                              backdrop-blur-lg h-full flex flex-col
                              ${plan.popular ? 'transform scale-105 md:scale-110' : ''}`}>
                
                {/* Enhanced card background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-xl"></div>
                
                <CardContent className="p-6 sm:p-8 text-center relative z-10 pt-8 flex flex-col h-full">
                  
                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="mb-6">
                    <div className={`text-3xl sm:text-4xl font-bold mb-2 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent' 
                        : 'text-foreground'
                    }`}>
                      {plan.price}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex}
                        className="flex items-center justify-start text-left group"
                        custom={featureIndex}
                        variants={listItemVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover={{ x: 6, transition: { duration: 0.2 } }}
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                          <Check className="text-white" size={12} weight="bold" />
                        </div>
                        <span className="text-sm sm:text-base text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="mt-auto"
                  >
                    <Button
                      className={`w-full py-3 px-6 text-white font-bold rounded-xl shadow-lg transition-all duration-300 ${plan.buttonColor}`}
                      onClick={() => onContactClick(plan.title)}
                    >
                      {t('pricing.cta')}
                    </Button>
                  </motion.div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="text-center mt-8 sm:mt-12 md:mt-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base text-muted-foreground">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-medium">⚡ {t('pricing.activation')}</span>
            </motion.div>
          </div>
          
          {/* Owl Mascot */}
          <div className="mt-8 flex justify-center">
            <OwlMascot variant="default" size="lg" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}