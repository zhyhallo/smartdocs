import { Button } from "@/components/ui/button"
import { Phone } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlMascot, ParallaxBackground, FloatingElements } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"

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

  return (
    <section className="py-20 bg-primary/5 relative overflow-hidden" ref={ref}>
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="high" theme="abstract" />
      
      {/* Enhanced decorative owls for CTA section */}
      <div className="absolute inset-0 pointer-events-none">
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
        
        {/* Additional floating call-to-action elements */}
        <motion.div
          className="absolute top-1/3 right-16 text-primary/10 text-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          📞
        </motion.div>
        
        <motion.div
          className="absolute top-20 left-12 opacity-10"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-16 h-16 border-3 border-accent rounded-full flex items-center justify-center">
            <Phone size={24} className="text-accent" />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl font-bold text-foreground mb-4"
            variants={itemVariants}
          >
            {t('cta.title')}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            variants={itemVariants}
          >
            {t('cta.subtitle')}
          </motion.p>
          
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
              className="text-lg px-8 py-4 cursor-pointer relative overflow-hidden group"
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
          
          {/* CTA Feature blocks */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
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
                className="feature-card bg-card border border-border/50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group relative"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  className="text-2xl mb-3"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                
                <div className="flex items-center justify-center mb-2">
                  <motion.div
                    className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2"
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
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </p>
                </div>
                
                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}