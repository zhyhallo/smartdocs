import { Card, CardContent } from "@/components/ui/card"
import { 
  Printer, 
  Receipt, 
  ChartBar, 
  Plug, 
  Shield, 
  Clock 
} from "@phosphor-icons/react"

export default function Features() {
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

  return (
    <section id="features" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Функціональні можливості</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Повний набір функцій для роботи з касовим обладнанням в системі 1С:Enterprise
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}