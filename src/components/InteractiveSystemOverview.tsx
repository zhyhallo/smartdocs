import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Eye,
  MousePointer,
  Activity,
  Brain,
  Sparkle
} from "@phosphor-icons/react"

export default function InteractiveSystemOverview() {
  const features = [
    {
      icon: Zap,
      title: "Миттєва реакція",
      description: "Термінали реагують на дії користувача менше ніж за 100мс",
      color: "text-yellow-500"
    },
    {
      icon: Eye,
      title: "Візуальний відгук",
      description: "Анімовані елементи показують стан обробки даних",
      color: "text-blue-500"
    },
    {
      icon: MousePointer,
      title: "Інтерактивні зони",
      description: "Кожна секція має свій контекст взаємодії",
      color: "text-green-500"
    },
    {
      icon: Activity,
      title: "Живі дані",
      description: "Фінансові показники оновлюються в реальному часі",
      color: "text-red-500"
    },
    {
      icon: Brain,
      title: "Розумна аналітика",
      description: "Сова-аналітик розуміє тип взаємодії та показує відповідні дані",
      color: "text-purple-500"
    },
    {
      icon: Sparkle,
      title: "Деталізовані ефекти",
      description: "Кожна взаємодія супроводжується унікальними анімаціями",
      color: "text-accent"
    }
  ]

  const interactionTypes = [
    {
      type: "Hover",
      description: "Наведення курсору активує режим аналізу",
      example: "Термінал переходить у стан 'ANALYZING' і показує прогрес сканування"
    },
    {
      type: "Click",
      description: "Клік запускає процес обробки команд",
      example: "Відображається код транзакції та прогрес обробки"
    },
    {
      type: "Form Focus",
      description: "Фокус на полях форми запускає валідацію",
      example: "Терминал показує процес перевірки введених даних"
    },
    {
      type: "Section View",
      description: "Перегляд секцій змінює контекст даних",
      example: "Для кожної секції показуються відповідні операційні дані"
    }
  ]

  return (
    <motion.div
      className="py-16 px-6 bg-gradient-to-r from-muted/20 to-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="mb-4 text-sm px-4 py-2 bg-accent/10 text-accent border-accent/20">
            🚀 Інноваційна система
          </Badge>
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Динамічні терміналі POSNET
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Наша система використовує передові технології React та Framer Motion для створення 
            інтерактивного досвіду роботи з терміналами. Кожна дія користувача відбивається в 
            реальному часі на всіх термінальних екранах.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <feature.icon 
                    className={`${feature.color} mb-4`} 
                    size={32} 
                  />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Interaction Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Типи взаємодії з терміналами
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {interactionTypes.map((interaction, index) => (
                  <motion.div
                    key={interaction.type}
                    className="p-4 border border-border rounded-lg"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {interaction.type}
                      </Badge>
                    </div>
                    <h4 className="font-medium mb-2">{interaction.description}</h4>
                    <p className="text-sm text-muted-foreground italic">
                      "{interaction.example}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Implementation */}
        <motion.div
          className="mt-16 grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>🔧 Технічна реалізація</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">useInteractiveTerminal Hook</h4>
                <p className="text-sm text-muted-foreground">
                  Керує станом терміналів та реагує на події взаємодії
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Global Interaction Context</h4>
                <p className="text-sm text-muted-foreground">
                  Синхронізує всі терміналі на сторінці для єдиного досвіду
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Interactive Components</h4>
                <p className="text-sm text-muted-foreground">
                  Спеціальні кнопки та поля вводу, що інтегровані з системою
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Типи даних</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Фінансові показники</h4>
                <p className="text-sm text-muted-foreground">
                  Сума, кількість транзакцій, статус обробки
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Операційні дані</h4>
                <p className="text-sm text-muted-foreground">
                  Поточна операція, прогрес виконання, код помилки
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Системна інформація</h4>
                <p className="text-sm text-muted-foreground">
                  Тип реєстратора, статус мережі, час оновлення
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}