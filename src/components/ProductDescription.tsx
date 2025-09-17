import { Plug, Shield, Users } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { ParallaxBackground, FloatingElements } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"

export default function ProductDescription() {
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
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
        ease: "backOut"
      }
    }
  }

  const benefits = [
    {
      icon: <Plug size={32} className="text-primary" />,
      title: t('product.benefits.integration'),
      description: t('product.benefits.integration.desc')
    },
    {
      icon: <Shield size={32} className="text-primary" />,
      title: t('product.benefits.reliability'),
      description: t('product.benefits.reliability.desc')
    },
    {
      icon: <Users size={32} className="text-primary" />,
      title: t('product.benefits.support'),
      description: t('product.benefits.support.desc')
    }
  ]

  return (
    <section id="product" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="low" theme="tech" />
      
      {/* Additional tech-themed floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-16 right-20 opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            y: [-5, 5, -5]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity },
            y: { duration: 3, repeat: Infinity }
          }}
        >
          <div className="w-8 h-8 border-2 border-primary/30 rounded">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded"></div>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-24 left-16 opacity-10"
          animate={{
            rotate: [0, -15, 15, 0],
            scale: [0.8, 1.3, 0.8],
            x: [-3, 3, -3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <Plug size={32} className="text-accent" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 left-20 opacity-5"
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 5, -5, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-2xl font-mono text-primary">1C</div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold text-foreground mb-8"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            {t('product.title')}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {t('product.description')}
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="text-center group cursor-pointer relative"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                {/* Individual card parallax background */}
                <div className="absolute inset-0 rounded-lg opacity-5 pointer-events-none">
                  <motion.div
                    className="absolute -top-5 -right-5 w-12 h-12 bg-primary/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.7
                    }}
                  />
                </div>
                
                <motion.div 
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300 relative overflow-hidden"
                  variants={iconVariants}
                >
                  {/* Icon container background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full"
                    whileHover={{
                      scale: 1.2,
                      rotate: 180,
                      transition: { duration: 0.4 }
                    }}
                  />
                  
                  <motion.div
                    className="relative z-10"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                      transition: { 
                        scale: { duration: 0.2 },
                        rotate: { duration: 0.5 }
                      } 
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                </motion.div>
                
                <motion.h3 
                  className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300"
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {benefit.title}
                </motion.h3>
                
                <motion.p 
                  className="text-muted-foreground"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {benefit.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}