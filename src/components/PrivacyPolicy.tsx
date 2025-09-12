import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Database, Cookie, Eye, FileText } from "@phosphor-icons/react"

interface PrivacyPolicyProps {
  onBackClick?: () => void
}

export default function PrivacyPolicy({ onBackClick }: PrivacyPolicyProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
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
    <motion.div
      className="min-h-screen bg-background py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div className="mb-8" variants={itemVariants}>
          {onBackClick && (
            <Button
              variant="outline"
              onClick={onBackClick}
              className="mb-6 cursor-pointer"
            >
              <ArrowLeft size={16} className="mr-2" />
              Повернутись назад
            </Button>
          )}
          
          <div className="flex items-center mb-4">
            <Shield size={32} className="text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">
              Політика конфіденційності
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg">
            Остання редакція: {new Date().toLocaleDateString('uk-UA')}
          </p>
        </motion.div>

        <motion.div className="space-y-8" variants={itemVariants}>
          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <FileText size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  Загальні положення
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Компанія ModulSoft ("Компанія", "ми", "нас", "наш") зобов'язується захищати 
                  конфіденційність ваших персональних даних. Ця Політика конфіденційності 
                  пояснює, як ми збираємо, використовуємо, зберігаємо та захищаємо вашу 
                  персональну інформацію відповідно до Загального регламенту захисту даних (GDPR) 
                  та Закону України "Про захист персональних даних".
                </p>
                <p>
                  Використовуючи наш веб-сайт або наші послуги, ви погоджуєтесь з умовами 
                  цієї Політики конфіденційності.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Database size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  Персональні дані, які ми збираємо
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>Ми можемо збирати наступні категорії персональних даних:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Контактна інформація:</strong> ім'я, адреса електронної пошти, номер телефону, назва компанії</li>
                  <li><strong>Технічна інформація:</strong> IP-адреса, тип браузера, операційна система, дані про використання сайту</li>
                  <li><strong>Файли cookie:</strong> інформація про ваші налаштування та активність на сайті</li>
                  <li><strong>Комерційна інформація:</strong> історія замовлень, платіжна інформація (зберігається через захищені платіжні системи)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Eye size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  Як ми використовуємо ваші дані
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>Ми використовуємо ваші персональні дані для:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Надання наших продуктів та послуг</li>
                  <li>Обробки замовлень та здійснення платежів</li>
                  <li>Зв'язку з вами щодо ваших запитів</li>
                  <li>Покращення нашого веб-сайту та послуг</li>
                  <li>Відправки маркетингових повідомлень (за вашою згодою)</li>
                  <li>Дотримання юридичних зобов'язань</li>
                  <li>Захисту наших прав та інтересів</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Cookie size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  Файли cookie та відстеження
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Наш веб-сайт використовує файли cookie для покращення функціональності 
                  та аналізу використання сайту. Cookie - це невеликі текстові файли, 
                  які зберігаються на вашому пристрої.
                </p>
                <p><strong>Типи cookie, які ми використовуємо:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Обов'язкові cookie:</strong> необхідні для функціонування сайту</li>
                  <li><strong>Функціональні cookie:</strong> зберігають ваші налаштування</li>
                  <li><strong>Аналітичні cookie:</strong> допомагають нам покращувати сайт</li>
                  <li><strong>Маркетингові cookie:</strong> для персоналізації реклами (за згодою)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  Ваші права
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>Відповідно до GDPR та українського законодавства, ви маєте право:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Доступу до ваших персональних даних</li>
                  <li>Виправлення неточних даних</li>
                  <li>Видалення ваших даних</li>
                  <li>Обмеження обробки</li>
                  <li>Портативності даних</li>
                  <li>Заперечення проти обробки</li>
                  <li>Відкликання згоди в будь-який час</li>
                </ul>
                <p>
                  Для реалізації цих прав зверніться до нас за адресою: 
                  <a href="mailto:info@modulsoft.eu" className="text-accent underline">
                    info@modulsoft.eu
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Database size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  Безпека та зберігання даних
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Ми вживаємо відповідних технічних та організаційних заходів для захисту 
                  ваших персональних даних від несанкціонованого доступу, втрати або 
                  знищення.
                </p>
                <p>
                  Ваші дані зберігаються лише стільки часу, скільки необхідно для 
                  досягнення цілей, для яких вони були зібрані, або відповідно до 
                  юридичних вимог.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <FileText size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  Контактна інформація
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Якщо у вас є питання щодо цієї Політики конфіденційності або ви хочете 
                  реалізувати свої права щодо персональних даних, зверніться до нас:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p><strong>ModulSoft</strong></p>
                  <p>43025, м. Луцьк, вул. Святовасилівська 4/3</p>
                  <p>Телефон: <a href="tel:+380931776504" className="text-accent">+38 (093) 177-65-04</a></p>
                  <p>Email: <a href="mailto:info@modulsoft.eu" className="text-accent">info@modulsoft.eu</a></p>
                </div>
                <p>
                  Ми зобов'язуємося відповісти на ваш запит протягом 30 днів.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}