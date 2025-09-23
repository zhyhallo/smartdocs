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
          {/* Mobile-First Layout: Stack vertically on all devices, center everything */}
          <div className="flex flex-col items-center text-center space-y-8 lg:space-y-12">
            
            {/* Owl Mascot - Show first on mobile for visual impact */}
            <motion.div 
              className="order-1 flex justify-center items-center w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative scale-75 sm:scale-85 md:scale-95 lg:scale-100 
                             flex justify-center items-center">
                <OwlMascot 
                  size="2xl" 
                  className="drop-shadow-2xl mx-auto" 
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

            {/* Content Section */}
            <motion.div 
              className="order-2 w-full max-w-4xl mx-auto text-center flex flex-col items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="w-full flex justify-center mb-4 sm:mb-6">
                <Badge variant="secondary" className="text-center px-4 py-2">
                  {t('hero.title')} {t('hero.subtitle')} - {t('hero.badge')}
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                          font-bold text-foreground mb-4 sm:mb-6 
                          tracking-tight leading-tight text-center
                          max-w-4xl mx-auto"
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
                          mb-6 sm:mb-8 leading-relaxed text-center 
                          max-w-2xl mx-auto px-4"
                variants={itemVariants}
              >
                {t('hero.description')}
              </motion.p>
              
              <motion.div 
                className="w-full flex justify-center"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 
                           w-full sm:w-auto max-w-sm mx-auto
                           flex items-center justify-center
                           hover:scale-105 transition-all duration-300"
                  onClick={() => onContactClick(t('hero.cta.order'))}
                >
                  {t('hero.cta.order')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Experience badge */}
      <motion.div
        className="absolute top-8 right-4 sm:top-12 sm:right-8 md:top-16 md:right-12 
                  bg-primary/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 
                  border border-primary/20 shadow-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">16+</div>
          <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {t('hero.experience')}
          </div>
        </div>
      </motion.div>
    </section>
  )
})

export default Hero