import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlIcon } from "@/components"
import { useRef } from "react"

export default function FAQ() {
  const ref = useRef<HTMLElement>(null)
  const [, isInView] = useInView({ threshold: 0.1 })

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
    <section id="faq" className="py-20">
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Часто задавані питання</h2>
              <p className="text-lg text-muted-foreground">Відповіді на найпопулярніші питання</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <AccordionItem value={`item-${index}`} className="border-border/50">
                      <AccordionTrigger className="text-left font-medium cursor-pointer hover:text-primary transition-colors duration-200">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
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
            className="flex justify-center lg:justify-end lg:pr-8 xl:pr-12 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative lg:ml-auto lg:max-w-fit flex items-center gap-6">
              {/* Owl to the left of question mark */}
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <OwlIcon size="xs" animated={true} showTerminal={false} />
              </motion.div>

              {/* Large Question Mark */}
              <motion.div
                className="text-8xl lg:text-9xl font-bold text-primary/20 select-none"
                animate={{
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ?
              </motion.div>
                            
              {/* Floating dots around the composition */}
              <motion.div
                className="absolute -top-4 left-8 w-2 h-2 bg-accent rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute bottom-0 -right-4 w-3 h-3 bg-primary/40 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}