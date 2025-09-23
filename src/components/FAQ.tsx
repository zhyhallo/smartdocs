import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlMascot } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"
import { memo } from "react"

const FAQ = memo(function FAQ() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useTranslation()

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
    }
  ]

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
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div ref={ref as any} className="container mx-auto px-4 max-w-7xl">
        
        {/* Mobile-First Layout: Stack vertically */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-start">
          
          {/* Owl with Question mark - Show first on mobile */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center items-center w-full mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative flex items-center justify-center w-full max-w-sm mx-auto">
              
              {/* Question Mark positioned to the left */}
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                          text-primary/30 select-none relative mr-4 sm:mr-6 lg:mr-8"
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
                
                {/* Glowing effects */}
                <motion.div 
                  className="absolute inset-0 text-primary/15 blur-md -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.25, 0.15]
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
              </motion.div>

              {/* Owl positioned to the right */}
              <motion.div
                className="flex-shrink-0 relative z-10 scale-100 sm:scale-110 md:scale-125 lg:scale-100"
                initial={{ opacity: 0, scale: 0.8, x: 15 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 15 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <OwlMascot variant="analyst" size="xl" animated={true} />
                
                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-2 -left-2 w-2 h-2 bg-accent/30 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1.2
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 right-2 w-1.5 h-1.5 bg-primary/40 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: 2.2
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* FAQ content */}
          <div className="order-2 lg:order-1 w-full">
            <motion.div 
              className="mb-8 sm:mb-12 text-center lg:text-left"
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('faq.title')}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {t('faq.subtitle')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <AccordionItem 
                      value={`item-${index}`} 
                      className="faq-item border border-border/50 bg-card/80 backdrop-blur-sm 
                                rounded-lg px-4 sm:px-6 shadow-sm hover:shadow-md 
                                transition-all duration-300"
                    >
                      <AccordionTrigger className="faq-trigger text-left font-medium py-4 sm:py-5 
                                                  hover:no-underline focus:no-underline">
                        <span className="faq-text text-sm sm:text-base pr-2 leading-relaxed
                                      hover:text-primary transition-colors duration-300">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 sm:pb-5 
                                                  text-sm sm:text-base leading-relaxed">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="pt-2"
                        >
                          {item.answer}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default FAQ