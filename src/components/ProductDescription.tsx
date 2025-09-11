import { Plug, Shield, Users } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"

export default function ProductDescription() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  }

  const benefits = [
    {
      icon: <Plug size={32} className="text-primary" />,
      title: "Легка інтеграція",
      description: "Швидке підключення до 1С без додаткових налаштувань"
    },
    {
      icon: <Shield size={32} className="text-primary" />,
      title: "Надійність",
      description: "Стабільна робота та захист від збоїв"
    },
    {
      icon: <Users size={32} className="text-primary" />,
      title: "Підтримка",
      description: "Команда експертів завжди готова допомогти"
    }
  ]

  return (
    <section id="product" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold text-foreground mb-8"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Що це за компонент?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Driver POSNET / Thermal - це зовнішня компонента для системи 1С:Enterprise, яка забезпечує 
            повну інтеграцію з фіскальними реєстраторами POSNET та Thermal. Компонент вирішує всі задачі 
            роботи з касовим обладнанням: від друку чеків до ведення звітності.
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="text-center group cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                  variants={iconVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    {benefit.icon}
                  </motion.div>
                </motion.div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}