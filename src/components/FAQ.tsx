import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlMascot } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"
import { memo, useState, useCallback } from "react"
import { CaretDown } from "@phosphor-icons/react"

const FAQ = memo(function FAQ() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useTranslation()
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const faqItems = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6')
    },
    {
      question: t('faq.q7'),
      answer: t('faq.a7')
    },
    {
      question: t('faq.q8'),
      answer: t('faq.a8')
    }
  ]

  const toggleItem = useCallback((index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }, [])

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-muted/20 via-background to-secondary/10 relative overflow-hidden">
      
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-20 h-20 border border-primary rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-accent rounded-2xl -rotate-12"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-primary/30 rotate-12"></div>
      </div>
      
      <div ref={ref as any} className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Enhanced Mobile-First Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
          
          {/* Enhanced Owl with Question mark */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center items-center w-full mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative flex items-center justify-center w-full max-w-lg mx-auto">
              
              {/* Enhanced Question Mark with modern styling */}
              <motion.div
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold 
                          bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent 
                          select-none relative mr-6 sm:mr-8 lg:mr-12"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  x: 0,
                  rotate: [0, 2, -2, 0],
                } : { opacity: 0, scale: 0.8, x: -20 }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.5 },
                  scale: { duration: 0.8, delay: 0.5 },
                  x: { duration: 0.8, delay: 0.5 },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }
                }}
              >
                ?
                
                {/* Enhanced glowing effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  ?
                </motion.div>
                
                {/* Additional sparkle effects */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-primary/40 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 3,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Enhanced Owl positioning */}
              <motion.div
                className="flex-shrink-0 relative z-10 scale-110 sm:scale-125 md:scale-140 lg:scale-125"
                initial={{ opacity: 0, scale: 0.8, x: 15 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 15 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <OwlMascot variant="analyst" size="xl" animated={true} />
                
                {/* Enhanced floating decorative elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1.2
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 right-4 w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: 2.2
                  }}
                />
                
                {/* Question bubble */}
                <motion.div
                  className="absolute -top-8 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-primary/20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0],
                    y: [0, -5, -5, -10]
                  } : { opacity: 0, scale: 0 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 4,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-xs font-medium text-primary">Є питання?</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced FAQ content */}
          <div className="order-2 lg:order-1 w-full">
            <motion.div 
              className="mb-12 sm:mb-16 text-center lg:text-left"
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div 
                className="inline-block mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="px-6 py-3 bg-gradient-to-r from-primary/15 to-accent/15 text-primary rounded-full text-sm font-semibold">
                  ❓ Часті запитання
                </span>
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('faq.title')}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('faq.subtitle')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="space-y-4 sm:space-y-6">
                {faqItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <div className="faq-item border-2 border-border/30 hover:border-primary/30 
                                   bg-gradient-to-r from-card/90 to-background/90 backdrop-blur-md 
                                   rounded-2xl px-6 sm:px-8 shadow-lg hover:shadow-xl 
                                   transition-all duration-500 group">
                      <button
                        onClick={() => toggleItem(index)}
                        className="faq-trigger w-full text-left font-semibold py-6 sm:py-8 
                                   hover:no-underline focus:no-underline flex items-start justify-between
                                   focus:outline-none cursor-pointer bg-transparent border-none gap-4"
                        type="button"
                      >
                        <span className="faq-text text-base sm:text-lg pr-2 leading-relaxed
                                       group-hover:text-primary transition-colors duration-300 flex-1 text-left font-medium">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: openItems.has(index) ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 mt-1"
                        >
                          <CaretDown size={20} weight="bold" />
                        </motion.div>
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: openItems.has(index) ? "auto" : 0,
                          opacity: openItems.has(index) ? 1 : 0
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="text-muted-foreground pb-6 sm:pb-8 
                                       text-base sm:text-lg leading-relaxed pt-2 border-t border-border/20">
                          {item.answer}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Call-to-action for more questions */}
            <motion.div 
              className="text-center lg:text-left mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <p className="text-lg text-muted-foreground mb-4">
                Не знайшли відповідь на своє питання?
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Зв'яжіться з нами
                <span className="text-lg">→</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default FAQ