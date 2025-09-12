import { Card, CardContent } from "@/components/ui/card"
import { 
  Printer, 
  Receipt, 
  ChartBar, 
  Plug, 
  Shield, 
  Clock 
} from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { OwlMascot, ParallaxBackground, FloatingElements } from "@/components"

export default function Features() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const features = [
    {
      icon: <Receipt size={32} />,
      title: "Фіскальні операції",
      description: "Відкриття/закриття змін, друк фіскальних і нефіскальних чеків"
    },
    {
      icon: <Printer size={32} />,
      title: "Управління друком",
      description: "Повний контроль над процесом друку та форматуванням чеків"
    },
    {
      icon: <ChartBar size={32} />,
      title: "Звітність",
      description: "Генерація X та Z звітів, перегляд статистики продажів"
    },
    {
      icon: <Plug size={32} />,
      title: "Інтеграція з 1С",
      description: "Безшовна інтеграція з системою 1С:Enterprise"
    },
    {
      icon: <Shield size={32} />,
      title: "Надійність",
      description: "Стабільна робота та обробка помилок"
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Підтримка",
      description: "Технічна підтримка та швидке вирішення питань"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
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
        delay: 0.2,
        ease: "backOut"
      }
    }
  }

  return (
    <section id="features" className="py-20 bg-secondary/20 relative overflow-hidden" ref={ref}>
      {/* Parallax Background Elements */}
      <ParallaxBackground variant="geometric" intensity="light" />
      <FloatingElements density="medium" theme="business" />
      
      {/* Decorative floating owls with enhanced parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 opacity-10"
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <OwlMascot size="md" animated={false} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-10 opacity-10"
          animate={{
            y: [10, -10, 10],
            rotate: [3, -3, 3],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <OwlMascot size="sm" animated={false} />
        </motion.div>
        
        {/* Additional floating tech elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Функціональні можливості</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Повний набір функцій для роботи з касовим обладнанням в системі 1С:Enterprise
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 relative overflow-hidden">
                {/* Card background parallax effect */}
                <div className="absolute inset-0 opacity-5">
                  <motion.div
                    className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <motion.div 
                    className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                    variants={iconVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{
                      rotate: { duration: 0.5 },
                      scale: { duration: 0.2 }
                    }}
                  >
                    <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}