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
import { OwlAnalyst, ParallaxBackground, FloatingElements } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"
import { memo } from "react"

const Features = memo(function Features() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useTranslation()

  const features = [
    {
      icon: <Receipt size={32} />,
      title: t('features.sales.title'),
      description: t('features.sales.desc')
    },
    {
      icon: <ChartBar size={32} />,
      title: t('features.reports.title'),
      description: t('features.reports.desc')
    },
    {
      icon: <Plug size={32} />,
      title: t('features.status.title'),
      description: t('features.status.desc')
    },
    {
      icon: <Shield size={32} />,
      title: t('features.errors.title'),
      description: t('features.errors.desc')
    },
    {
      icon: <Printer size={32} />,
      title: t('features.config.title'),
      description: t('features.config.desc')
    },
    {
      icon: <Clock size={32} />,
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "backOut"
      }
    }
  }

  return (
    <section id="features" className="py-20 bg-secondary/20 relative overflow-hidden" ref={ref}>
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="medium" theme="business" />
      
      {/* Decorative floating owls with enhanced parallax */}
      <div className="absolute inset-0 pointer-events-none">
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
          <OwlAnalyst 
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
          <OwlAnalyst 
            size="xs" 
            animated={false} 
          />
        </motion.div>
        
        {/* Additional floating tech elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
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
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('features.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 relative overflow-hidden flex flex-col">
                {/* Card background parallax effect */}
                <div className="absolute inset-0 opacity-5">
                  <motion.div
                    className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </div>
                
                <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between min-h-[200px]">
                  <motion.div 
                    className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                    variants={iconVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{
                      rotate: { duration: 0.5 },
                      scale: { duration: 0.2 }
                    }}
                  >
                    <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 min-h-[3.5rem] flex items-start">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
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