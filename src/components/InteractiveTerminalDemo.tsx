import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  OwlAnalyst, 
  InteractiveButton, 
  InteractiveInput 
} from "@/components"
import { 
  Play, 
  Pause, 
  ArrowRight, 
  Calculator,
  ChartLine,
  Database
} from "@phosphor-icons/react"

export default function InteractiveTerminalDemo() {
  const [demoValue, setDemoValue] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  const demoActions = [
    {
      title: "Hover Effects",
      description: "Hover over the terminal to see data analysis",
      icon: ChartLine,
      context: "demo-hover"
    },
    {
      title: "Click Interactions", 
      description: "Click to trigger processing states",
      icon: Calculator,
      context: "demo-click"
    },
    {
      title: "Form Integration",
      description: "Form inputs trigger terminal responses",
      icon: Database,
      context: "demo-form"
    }
  ]

  return (
    <motion.div
      className="py-16 px-6 bg-gradient-to-br from-background to-muted/30"
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
          <Badge className="mb-4 text-sm px-4 py-2">
            Interactive Terminal Demo
          </Badge>
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Живі дані, що реагують на дії
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Наш терминал динамічно відображає дані та реагує на взаємодію користувача, 
            створюючи унікальний досвід роботи з POSNET системами.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Demo Controls */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Play className="text-accent" />
                  Демонстрація можливостей
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {demoActions.map((action, index) => (
                  <motion.div
                    key={action.context}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <action.icon className="text-accent" size={24} />
                      <h3 className="font-semibold">{action.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </motion.div>
                ))}

                {/* Interactive Form Demo */}
                <Card className="border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Тестові дані:</h4>
                    <div className="space-y-3">
                      <InteractiveInput
                        placeholder="Введіть суму..."
                        value={demoValue}
                        onChange={(e) => setDemoValue(e.target.value)}
                        sectionContext="demo-form"
                        interactionData={{ field: "amount", value: demoValue }}
                      />
                      <div className="flex gap-2">
                        <InteractiveButton
                          size="sm"
                          sectionContext="demo-form"
                          interactionData={{ action: "calculate", amount: demoValue }}
                        >
                          Обчислити
                        </InteractiveButton>
                        <InteractiveButton
                          size="sm"
                          variant="outline"
                          sectionContext="demo-form"
                          interactionData={{ action: "reset" }}
                          onClick={() => setDemoValue("")}
                        >
                          Скинути
                        </InteractiveButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Terminal Display */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <OwlAnalyst
                size="xl"
                animated={true}
                interactionContext="demo-terminal"
                className="drop-shadow-2xl"
              />
              
              {/* Demo Status Indicators */}
              <motion.div
                className="absolute -top-6 left-0 right-0 flex justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Badge variant="outline" className="text-xs">
                  Інтерактивний режим
                </Badge>
              </motion.div>

              {/* Interactive Hints */}
              <motion.div
                className="absolute -bottom-6 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-muted-foreground">
                  ↑ Наведіть курсор або клікніть для взаємодії
                </p>
              </motion.div>

              {/* Floating Action Indicators */}
              <motion.div
                className="absolute -right-8 top-1/2 transform -translate-y-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <div className="flex flex-col gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {[
            {
              title: "Реальний час",
              description: "Дані оновлюються миттєво при взаємодії",
              icon: "⚡"
            },
            {
              title: "Контекстна реакція",
              description: "Термінал розуміє, в якій секції ви знаходитесь",
              icon: "🎯"
            },
            {
              title: "Візуальний фідбек",
              description: "Анімації та ефекти показують активність системи",
              icon: "✨"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}