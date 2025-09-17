import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlAnalyst } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"

export default function FAQ() {
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
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6')
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
    <section id="faq" className="py-20 bg-muted/30">
      <div ref={ref as any} className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - FAQ content */}
          <div>
            <motion.div 
              className="mb-12"
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('faq.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('faq.subtitle')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <AccordionItem 
                      value={`item-${index}`} 
                      className="border-border/50 bg-card rounded-lg px-4 shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-medium cursor-pointer hover:text-primary transition-colors duration-300 py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
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

          {/* Right side - Owl with Question mark */}
          <motion.div 
            className="flex justify-center lg:justify-start xl:justify-center mt-8 lg:mt-0 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative flex items-center justify-center w-full max-w-md">
              {/* Question Mark moved to the left */}
              <motion.div
                className="text-6xl lg:text-7xl xl:text-8xl font-bold text-primary/25 select-none relative mr-8 lg:mr-12"
                initial={{ opacity: 0, scale: 0.8, x: -30 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  x: 0,
                  rotate: [0, 2, -2, 0],
                } : { opacity: 0, scale: 0.8, x: -30 }}
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
                
                {/* Enhanced glowing effect */}
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
                
                {/* Additional subtle pulse effect */}
                <motion.div 
                  className="absolute inset-0 text-accent/20 blur-sm -z-10"
                  animate={{
                    scale: [0.9, 1.2, 0.9],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  ?
                </motion.div>
              </motion.div>

              {/* Owl positioned to the right of question mark */}
              <motion.div
                className="flex-shrink-0 relative z-10"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <OwlAnalyst size="sm" animated={true} withTerminal={false} />
                
                {/* Thought bubbles connecting question mark to owl */}
                <motion.div
                  className="absolute -top-1 -left-2 w-2 h-2 bg-accent/30 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.6, 0.2],
                    x: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1.2
                  }}
                />
                <motion.div
                  className="absolute -top-3 -left-4 w-3 h-3 bg-accent/25 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3],
                    y: [-1, 1, -1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.8
                  }}
                />
                <motion.div
                  className="absolute -top-5 -left-6 w-1.5 h-1.5 bg-primary/40 rounded-full"
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
                            
              {/* Enhanced floating decorative elements with better spacing */}
              <motion.div
                className="absolute -top-8 left-8 w-2 h-2 bg-accent/40 rounded-full"
                animate={{
                  y: [-3, -10, -3],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.3, 1],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.3,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-4 right-2 w-3 h-3 bg-primary/30 rounded-full"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.4, 1],
                  x: [0, 3, 0]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: 1.1,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-12 -left-6 w-1.5 h-1.5 bg-accent/60 rounded-full"
                animate={{
                  rotate: [0, 360],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  delay: 2.5,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute -bottom-2 left-2 w-2.5 h-2.5 bg-primary/25 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, -180, 0]
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: 1.8,
                  ease: "easeInOut"
                }}
              />
              
              {/* Additional floating question marks */}
              <motion.div
                className="absolute -top-12 right-4 text-lg font-bold text-primary/15 select-none"
                animate={{
                  y: [-2, -6, -2],
                  opacity: [0.15, 0.4, 0.15],
                  rotate: [5, -5, 5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.8,
                  ease: "easeInOut"
                }}
              >
                ?
              </motion.div>
              <motion.div
                className="absolute bottom-8 -left-8 text-sm font-bold text-accent/20 select-none"
                animate={{
                  y: [0, 4, 0],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [-3, 3, -3]
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  delay: 2.1,
                  ease: "easeInOut"
                }}
              >
                ?
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}