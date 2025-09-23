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
    <section className="hero-section relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="low" theme="tech" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Content */}
          <motion.div 
            className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-4 md:mb-6">
                {t('hero.title')} {t('hero.subtitle')} - {t('hero.badge')}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 tracking-tight leading-tight"
              variants={itemVariants}
            >
              {t('hero.title')}
              <motion.span 
                className="block text-primary"
                variants={itemVariants}
              >
                {t('hero.subtitle')}
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed"
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
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 cursor-pointer w-full sm:w-auto"
                onClick={() => onContactClick(t('hero.cta.order'))}
              >
                {t('hero.cta.order')}
              </Button>
            </motion.div>
          </motion.div>

        {/* Right side - Owl Mascot */}
          <motion.div 
            className="flex justify-center order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative scale-75 sm:scale-90 md:scale-100">
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
    </section>
  )
})

export default Hero