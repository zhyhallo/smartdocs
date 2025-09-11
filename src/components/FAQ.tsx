import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"

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
    <section id="faq" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Часто задавані питання</h2>
          <p className="text-lg text-muted-foreground">Відповіді на найпопулярніші питання</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
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
      </div>
    </section>
  )
}