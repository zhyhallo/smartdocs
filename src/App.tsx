import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Printer, 
  Receipt, 
  ChartBar, 
  Plug, 
  Shield, 
  Clock, 
  Users, 
  Phone, 
  Envelope,
  Check,
  Menu,
  X
} from "@phosphor-icons/react"
import ContactModal from "@/components/ContactModal"
import { Toaster } from "sonner"

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactService, setContactService] = useState("Консультація")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const openContactModal = (service: string = "Консультація") => {
    setContactService(service)
    setIsContactModalOpen(true)
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-primary">ModulSoft</div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#product" className="text-foreground hover:text-primary transition-colors">Продукт</a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Функції</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Ціна</a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
              <div className="flex items-center space-x-4">
                <a href="tel:+48123456789" className="text-muted-foreground hover:text-primary transition-colors">
                  +48 123 456 789
                </a>
                <Button onClick={() => openContactModal("Замовити дзвінок")} variant="outline" size="sm">
                  Замовити дзвінок
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#product" className="text-foreground hover:text-primary transition-colors">Продукт</a>
                <a href="#features" className="text-foreground hover:text-primary transition-colors">Функції</a>
                <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Ціна</a>
                <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
                <Separator />
                <a href="tel:+48123456789" className="text-muted-foreground">+48 123 456 789</a>
                <Button onClick={() => openContactModal("Замовити дзвінок")} variant="outline" size="sm" className="w-fit">
                  Замовити дзвінок
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Готове рішення для 1С:Enterprise
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Driver POSNET / Thermal
              <span className="block text-primary">для 1С:Enterprise</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Професійна зовнішня компонента для інтеграції з фіскальними реєстраторами POSNET та Thermal. 
              Надійність, стабільність і повна техпідтримка.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => openContactModal("Купити Driver POSNET")}
              >
                Купити зараз - 1500 зл
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => openContactModal("Отримати демо")}
              >
                Отримати демо
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section id="product" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Що це за компонент?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Driver POSNET / Thermal - це зовнішня компонента для системи 1С:Enterprise, яка забезпечує 
              повну інтеграцію з фіскальними реєстраторами POSNET та Thermal. Компонент вирішує всі задачі 
              роботи з касовим обладнанням: від друку чеків до ведення звітності.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plug size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Легка інтеграція</h3>
                <p className="text-muted-foreground">Швидке підключення до 1С без додаткових налаштувань</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Надійність</h3>
                <p className="text-muted-foreground">Стабільна робота та захист від збоїв</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Підтримка</h3>
                <p className="text-muted-foreground">Команда експертів завжди готова допомогти</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ціна та умови</h2>
            <p className="text-lg text-muted-foreground">Прозора ціна без прихованих платежів</p>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="border-primary/50 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">1500 zł</div>
                  <div className="text-muted-foreground">разовий платіж</div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="text-primary mr-3" size={20} />
                    <span>Повна ліцензія на використання</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-primary mr-3" size={20} />
                    <span>Технічна підтримка 1 рік</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-primary mr-3" size={20} />
                    <span>Безкоштовні оновлення 1 рік</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-primary mr-3" size={20} />
                    <span>Документація та інструкції</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-primary mr-3" size={20} />
                    <span>Допомога з встановленням</span>
                  </div>
                </div>
                <Button 
                  className="w-full text-lg py-6" 
                  size="lg"
                  onClick={() => openContactModal("Купити Driver POSNET - 1500 zł")}
                >
                  Купити зараз
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Активація протягом 24 годин після оплати
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Наш досвід</h2>
            <p className="text-lg text-muted-foreground">Довіра клієнтів - наша найкраща рекомендація</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">16+</div>
              <div className="text-muted-foreground">років досвіду</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">успішних проектів</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">40+</div>
              <div className="text-muted-foreground">сертифікованих спеціалістів</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Часто задавані питання</h2>
            <p className="text-lg text-muted-foreground">Відповіді на найпопулярніші питання</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Готові до інтеграції з POSNET?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Зв'яжіться з нами для детальної консультації або замовлення компонента
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => openContactModal("Купити Driver POSNET")}
              >
                <Phone className="mr-2" size={20} />
                Замовити дзвінок
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => openContactModal("Написати листа")}
              >
                <Envelope className="mr-2" size={20} />
                Написати листа
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">ModulSoft</div>
            <p className="text-background/80 mb-6">
              Професійні рішення для автоматизації бізнесу
            </p>
            <div className="flex justify-center space-x-8 mb-6">
              <a href="mailto:info@modulsoft.eu" className="text-background/80 hover:text-background transition-colors">
                info@modulsoft.eu
              </a>
              <a href="tel:+48123456789" className="text-background/80 hover:text-background transition-colors">
                +48 123 456 789
              </a>
            </div>
            <Separator className="bg-background/20 mb-6" />
            <p className="text-background/60 text-sm">
              © 2024 ModulSoft. Всі права захищені. | 
              <a href="#" className="hover:text-background transition-colors ml-2">Політика приватності</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal 
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        defaultService={contactService}
      />

      {/* Toast Notifications */}
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App