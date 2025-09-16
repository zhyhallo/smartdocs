import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Warning, Sparkle, Eye } from "@phosphor-icons/react"

interface FormAnimationShowcaseProps {
  className?: string
}

const FormAnimationShowcase: React.FC<FormAnimationShowcaseProps> = ({ className = "" }) => {
  const features = [
    {
      icon: Eye,
      title: "Плаваючі лейбли",
      description: "Лейбли плавно піднімаються при фокусі поля",
      color: "text-blue-500"
    },
    {
      icon: CheckCircle,
      title: "Валідація в реальному часі",
      description: "Миттєва перевірка введених даних",
      color: "text-green-500"
    },
    {
      icon: Warning,
      title: "Анімації помилок",
      description: "Помилки відображаються з струшуванням та кольоровими індикаторами",
      color: "text-red-500"
    },
    {
      icon: Sparkle,
      title: "Ефекти успіху",
      description: "Візуальне підтвердження правильного заповнення",
      color: "text-purple-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={`max-w-2xl mx-auto ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
              <Sparkle size={24} className="text-accent" />
              Анімовані форми з валідацією
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Сучасні анімації для покращення користувацького досвіду
            </p>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-border/50 transition-colors"
            >
              <motion.div
                className={`${feature.color} mt-1`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon size={20} />
              </motion.div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center pt-4"
          >
            <Badge variant="secondary" className="text-xs">
              Плавні переходи
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Валідація в реальному часі
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Доступність
            </Badge>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FormAnimationShowcase