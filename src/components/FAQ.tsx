import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlIcon } from "@/components"

export default function FAQ() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const faqItems = [
    {
      question: "Чи підходить для всіх версій 1С:Enterprise?",
      answer: "Компонент підтримує 1С:Enterprise 8.3 та новіші версії. Для точної сумісності з вашою версією зв'яжіться з нашими спеціалістами."
    },
    {
      question: "Як відбувається процес установки?",
      answer: "Після придбання ви отримуєте компонент та детальну інструкцію. Наші спеціалісти також можуть допомогти з установкою дистанційно."
    },
    {
      question: "Що робити, якщо мій реєстратор іншої моделі?",
      answer: "Компонент працює з реєстраторами POSNET та Thermal. Для інших моделей ми можемо розробити індивідуальне рішення."
    },
    {
      question: "Як здійснюється оплата?",
      answer: "Оплата можлива банківським переказом або через електронні платіжні системи. Після оплати ви одразу отримуєте доступ до компонента."
    },
    {
      question: "Чи надаються оновлення?",
      answer: "Так, протягом року після покупки всі оновлення надаються безкоштовно. Далі можна продовжити підписку на оновлення."
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
      <div ref={ref} className="container mx-auto px-4 max-w-7xl">
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
                Часто задавані питання
              </h2>
              <p className="text-lg text-muted-foreground">
                Відповіді на найпопулярніші питання про наш продукт
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
            className="flex justify-center lg:justify-center xl:justify-end lg:pr-4 xl:pr-8 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative flex items-center justify-center gap-8 lg:gap-6 xl:gap-8">
              {/* Owl to the left of question mark */}
              <motion.div
                className="flex-shrink-0 relative z-10"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <OwlIcon size="sm" animated={true} showTerminal={true} />
                
                {/* Thought bubble connecting owl to question mark */}
                <motion.div
                  className="absolute -top-2 -right-1 w-3 h-3 bg-accent/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute -top-4 right-1 w-2 h-2 bg-accent/40 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.5
                  }}
                />
              </motion.div>

              {/* Large Question Mark */}
              <motion.div
                className="text-7xl lg:text-8xl xl:text-9xl font-bold text-primary/30 select-none relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 1, -1, 0],
                } : { opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.7 },
                  scale: { duration: 0.8, delay: 0.7 },
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }
                }}
              >
                ?
                
                {/* Glowing effect behind question mark */}
                <div className="absolute inset-0 text-primary/10 blur-sm -z-10">
                  ?
                </div>
              </motion.div>
                            
              {/* Floating decorative dots */}
              <motion.div
                className="absolute -top-6 left-1/4 w-2 h-2 bg-accent/50 rounded-full"
                animate={{
                  y: [-2, -8, -2],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-2 -right-6 w-3 h-3 bg-primary/30 rounded-full"
                animate={{
                  y: [0, 6, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-1/3 -left-8 w-1.5 h-1.5 bg-accent rounded-full"
                animate={{
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 2,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}