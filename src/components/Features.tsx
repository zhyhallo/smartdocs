import { Card, CardContent } from "@/components/ui/card"
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
    <section id="features" className="py-12 sm:py-16 md:py-20 bg-secondary/20 relative overflow-hidden" ref={ref}>
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="medium" theme="business" />
      
      {/* Decorative floating owls - Hidden on mobile for better performance */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-20 right-10 opacity-10"
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
          className="absolute bottom-32 left-10 opacity-10"
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Mobile-First Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
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
              <Card className="feature-card h-full border border-border/50 shadow-sm hover:shadow-lg 
                              transition-all duration-300 bg-background/80 backdrop-blur-sm
                              flex flex-col items-center text-center p-4 sm:p-6
                              min-h-[280px] sm:min-h-[320px]">
                <CardContent className="p-0 flex flex-col items-center text-center h-full justify-between">
                  
                  {/* Icon Section */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <motion.div 
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl 
                               flex items-center justify-center text-primary
                               hover:bg-primary/20 transition-colors duration-300"
                      variants={hoverVariants}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 
                                  text-center leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed 
                                text-center max-w-xs">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

export default Features