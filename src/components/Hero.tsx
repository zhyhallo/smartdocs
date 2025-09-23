import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { OwlMascot, ParallaxBackground, FloatingElements } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"
import { memo } from "react"

interface HeroProps {
  onContactClick: (service: string) => void
}

const Hero = memo(function Hero({ onContactClick }: HeroProps) {
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
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
    <section className="hero-section relative py-12 sm:py-16 md:py-20 lg:py-24 
                       bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="low" theme="tech" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Responsive Layout: Stack vertically on mobile, horizontal on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px]">
            
            {/* Content Section - Left side on desktop, top on mobile */}
            <motion.div 
              className="order-2 lg:order-1 w-full text-center lg:text-left flex flex-col justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-4 sm:mb-6">
                <Badge variant="secondary" className="px-4 py-2">
                  {t('hero.title')} {t('hero.subtitle')} - {t('hero.badge')}
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                          font-bold text-foreground mb-4 sm:mb-6 
                          tracking-tight leading-tight"
                variants={itemVariants}
              >
                {t('hero.title')}
                <motion.span 
                  className="block text-primary mt-2"
                  variants={itemVariants}
                >
                  {t('hero.subtitle')}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-muted-foreground 
                          mb-6 sm:mb-8 leading-relaxed max-w-xl"
                variants={itemVariants}
              >
                {t('hero.description')}
              </motion.p>
              
              <motion.div 
                className="flex justify-center lg:justify-start"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 
                           w-full sm:w-auto max-w-sm
                           flex items-center justify-center
                           hover:scale-105 transition-all duration-300"
                  onClick={() => onContactClick(t('hero.cta.order'))}
                >
                  {t('hero.cta.order')}
                </Button>
              </motion.div>
            </motion.div>

            {/* Owl Mascot - Right side on desktop, top on mobile */}
            <motion.div 
              className="order-1 lg:order-2 flex justify-center lg:justify-end items-center w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative scale-75 sm:scale-85 md:scale-95 lg:scale-100 
                             flex justify-center items-center">
                <OwlMascot 
                  size="2xl" 
                  className="drop-shadow-2xl" 
                />
                
                {/* Enhanced floating elements around owl with parallax */}
                <motion.div
                  className="absolute -right-6 top-12 w-3 h-3 bg-primary/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute -left-4 bottom-16 w-2 h-2 bg-accent/30 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                    x: [0, -4, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute right-8 bottom-8 w-1.5 h-1.5 bg-primary/40 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.8, 0.5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 0.2
                  }}
                />
                
                {/* Additional floating tech elements */}
                <motion.div
                  className="absolute top-6 right-8 text-xs text-primary/30 font-mono"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 2
                  }}
                >
                  {"</>"} 
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Hero