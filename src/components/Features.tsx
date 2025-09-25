import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Printer, 
  Receipt, 
  ChartBar, 
  Plug, 
  Shield, 
  Clock 
} from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlMascot, ParallaxBackground, FloatingElements } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"
import { memo } from "react"

const Features = memo(function Features() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useTranslation()

  const features = [
    {
      icon: <Receipt size={28} />,
      title: t('features.sales.title'),
      description: t('features.sales.desc')
    },
    {
      icon: <ChartBar size={28} />,
      title: t('features.reports.title'),
      description: t('features.reports.desc')
    },
    {
      icon: <Plug size={28} />,
      title: t('features.status.title'),
      description: t('features.status.desc')
    },
    {
      icon: <Shield size={28} />,
      title: t('features.errors.title'),
      description: t('features.errors.desc')
    },
    {
      icon: <Printer size={28} />,
      title: t('features.config.title'),
      description: t('features.config.desc')
    },
    {
      icon: <Clock size={28} />,
      title: t('features.backup.title'),
      description: t('features.backup.desc')
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const hoverVariants = {
    hover: {
      scale: 1.03,
      y: -4,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: { 
        duration: 0.1
      }
    }
  }

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-secondary/10 via-background to-primary/5 relative overflow-hidden" ref={ref}>
      {/* Enhanced Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="medium" theme="business" />
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-primary rounded-2xl rotate-12"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 border border-accent rounded-lg -rotate-6"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 border border-primary/40 rotate-45"></div>
      </div>
      
      {/* Enhanced decorative floating owls */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <motion.div
          className="absolute top-20 right-10 opacity-15"
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <OwlMascot variant="analyst" 
            size="sm" 
            animated={false} 
          />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-10 opacity-12"
          animate={{
            y: [10, -10, 10],
            rotate: [3, -3, 3],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <OwlMascot variant="analyst" 
            size="xs" 
            animated={false} 
          />
        </motion.div>
        
        {/* Additional floating documents */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-10 bg-white/10 border border-primary/20 rounded-sm"
          animate={{
            y: [-5, 5, -5],
            rotate: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
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
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-20"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              💡 Ключові переваги
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('features.title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Enhanced Mobile-First Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Card className="feature-card h-full border-2 border-border/30 hover:border-primary/30 
                              shadow-md hover:shadow-xl transition-all duration-500 
                              bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-md
                              flex flex-col items-center text-center p-6 sm:p-8
                              min-h-[300px] sm:min-h-[340px] group
                              relative overflow-hidden">
                
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-0 flex flex-col items-center text-center h-full justify-between relative z-10">
                  
                  {/* Enhanced Icon Section */}
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/15 to-accent/10 
                               rounded-3xl flex items-center justify-center text-primary
                               hover:from-primary/25 hover:to-accent/15 transition-all duration-500
                               shadow-lg hover:shadow-xl group-hover:scale-110"
                      variants={hoverVariants}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feature.icon}
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Content Section */}
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 
                                  text-center leading-tight group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed 
                                text-center max-w-sm group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Subtle animation indicator */}
                  <motion.div 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 
                             bg-gradient-to-r from-primary to-accent rounded-full opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "2rem" }}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call-to-action section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Готові автоматизувати обробку документів?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-primary/30 hover:border-primary 
                       hover:bg-primary/5 transition-all duration-300"
            >
              Дізнатися більше ↓
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
})

export default Features