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
                       bg-gradient-to-br from-secondary/20 via-background to-primary/5 overflow-hidden">
      {/* Enhanced Parallax Background Elements */}
      <ParallaxBackground variant="subtle" />
      <FloatingElements density="low" theme="tech" />
      
      {/* Additional background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-lg rotate-12"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border border-accent rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-primary/30 rotate-45"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[600px]">
            
            {/* Enhanced Content Section */}
            <motion.div 
              className="order-2 lg:order-1 w-full text-center lg:text-left flex flex-col justify-center space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Enhanced Badge */}
              <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-2">
                <Badge variant="secondary" className="px-6 py-3 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors">
                  <span className="mr-2">🚀</span>
                  {t('hero.badge')}
                </Badge>
              </motion.div>
              
              {/* Enhanced Typography */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                          font-bold text-foreground 
                          tracking-tight leading-[1.1]"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('hero.title')}
                </span>
                <motion.span 
                  className="block text-foreground/90 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold"
                  variants={itemVariants}
                >
                  {t('hero.subtitle')}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground 
                          leading-relaxed max-w-2xl font-medium"
                variants={itemVariants}
              >
                {t('hero.description')}
              </motion.p>
              
              {/* Enhanced CTA Button */}
              <motion.div 
                className="flex justify-center lg:justify-start pt-4"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  size="lg" 
                  className="text-lg sm:text-xl px-10 sm:px-12 py-6 sm:py-7 
                           w-full sm:w-auto max-w-sm
                           flex items-center justify-center gap-3
                           bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90
                           shadow-lg hover:shadow-xl transition-all duration-300
                           border-0 font-semibold"
                  onClick={() => onContactClick(t('hero.cta.order'))}
                >
                  <span>✨</span>
                  {t('hero.cta.order')}
                  <span>🎯</span>
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8 text-sm text-muted-foreground"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Швидке впровадження</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>24/7 підтримка</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Гарантія якості</span>
                </div>
              </motion.div>
            </motion.div>
            {/* Enhanced Owl Mascot Section */}
            <motion.div 
              className="order-1 lg:order-2 flex justify-center lg:justify-end items-center w-full relative"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              {/* Main Owl Container with enhanced styling */}
              <div className="relative scale-75 sm:scale-85 md:scale-95 lg:scale-110 xl:scale-125 
                             flex justify-center items-center">
                
                {/* Glowing background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <OwlMascot 
                  size="2xl" 
                  className="drop-shadow-2xl relative z-10" 
                />
                
                {/* Enhanced floating tech elements with better positioning */}
                <motion.div
                  className="absolute -right-8 top-16 flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg border border-primary/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                    y: [0, -12, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  <span className="text-primary text-sm font-mono">1C</span>
                </motion.div>
                
                <motion.div
                  className="absolute -left-6 bottom-20 flex items-center justify-center w-10 h-6 bg-accent/10 rounded border border-accent/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                    x: [0, -8, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1
                  }}
                >
                  <span className="text-accent text-xs font-bold">BAS</span>
                </motion.div>
                
                <motion.div
                  className="absolute right-12 bottom-12 flex items-center justify-center w-6 h-6 bg-green-500/10 rounded-full border border-green-500/20"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.9, 0.6],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 0.2
                  }}
                >
                  <span className="text-green-600 text-xs">✓</span>
                </motion.div>
                
                {/* Document/Invoice floating animation */}
                <motion.div
                  className="absolute top-8 right-2 flex flex-col items-center"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1.5
                  }}
                >
                  <div className="w-6 h-8 bg-white border border-primary/30 rounded-sm shadow-sm mb-1"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                </motion.div>
                
                {/* Automation arrows */}
                <motion.div
                  className="absolute top-1/2 -right-4 text-primary/60"
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2
                  }}
                >
                  <span className="text-lg">→</span>
                </motion.div>
                
                {/* Additional tech particles */}
                <motion.div
                  className="absolute top-12 left-8 text-xs text-primary/40 font-mono"
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    rotate: [0, -15, 0],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: 3
                  }}
                >
                  {"{ AI }"}
                </motion.div>
                
                <motion.div
                  className="absolute bottom-8 left-4 text-xs text-accent/40 font-mono"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 1.8
                  }}
                >
                  {"OCR"}
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