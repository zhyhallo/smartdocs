import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Phone, Envelope, MapPin, Clock, Headset } from "@phosphor-icons/react"
import { useTranslation } from "@/hooks/useTranslation"

interface ContactPageProps {
  onBackClick?: () => void
  onContactClick?: (service: string) => void
}

export default function ContactPage({ onBackClick, onContactClick }: ContactPageProps) {
  const { t } = useTranslation()
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

  const contactSections = [
    {
      title: t('contacts.address.title'),
      icon: MapPin,
      content: (
        <div className="space-y-2">
          <p className="font-semibold text-foreground">{t('contacts.address.value')}</p>
        </div>
      )
    },
    {
      title: t('contacts.sales.title'),
      icon: Phone,
      content: (
        <div className="space-y-2">
          <a href="tel:+380931776504" className="block text-accent hover:underline cursor-pointer">
            +38 (093) 177-65-04
          </a>
          <a href="tel:+48588810566" className="block text-accent hover:underline cursor-pointer">
            +48 (588) 81-05-66
          </a>
          <a href="tel:+380987482235" className="block text-accent hover:underline cursor-pointer">
            +38 (098) 748-22-35
          </a>
          <a href="mailto:sales@modulsoft.eu" className="block text-accent hover:underline cursor-pointer">
            sales@modulsoft.eu
          </a>
        </div>
      )
    },
    {
      title: t('contacts.support.title'),
      icon: Headset,
      content: (
        <div className="space-y-2">
          <a href="tel:+380931776502" className="block text-accent hover:underline cursor-pointer">
            +38 (093) 177-65-02
          </a>
          <a href="tel:+380979455263" className="block text-accent hover:underline cursor-pointer">
            +38 (097) 945-52-63
          </a>
          <a href="tel:+380661438469" className="block text-accent hover:underline cursor-pointer">
            +38 (066) 143-84-69
          </a>
          <a href="https://24.modulsoft.eu" target="_blank" rel="noopener noreferrer" className="block text-accent hover:underline cursor-pointer">
            {t('contacts.portal.title')}: 24.modulsoft.eu
          </a>
        </div>
      )
    },
    {
      title: t('contacts.accounting.title'),
      icon: Envelope,
      content: (
        <div className="space-y-2">
          <a href="tel:+380931776506" className="block text-accent hover:underline cursor-pointer">
            +38 (093) 177-65-06
          </a>
          <a href="mailto:buh@firma-modul.com.ua" className="block text-accent hover:underline cursor-pointer">
            buh@firma-modul.com.ua
          </a>
        </div>
      )
    },
    {
      title: t('contacts.schedule.title'),
      icon: Clock,
      content: (
        <div className="space-y-2">
          <p className="text-foreground">{t('contacts.schedule.weekdays')}</p>
          <p className="text-foreground">{t('contacts.schedule.weekend')}</p>
        </div>
      )
    }
  ]

  return (
    <motion.div
      className="min-h-screen bg-background py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div className="mb-12" variants={itemVariants}>
          {onBackClick && (
            <Button
              variant="outline"
              onClick={onBackClick}
              className="mb-6 cursor-pointer"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t('contacts.back')}
            </Button>
          )}
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('contacts.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contactSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-border/50 h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <section.icon size={24} className="text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-muted-foreground">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Потрібна консультація?
              </h3>
              <p className="text-muted-foreground mb-6">
                Наші експерти готові відповісти на всі ваші питання та допомогти підібрати оптимальне рішення
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => onContactClick?.("Отримати консультацію")}
                  className="cursor-pointer"
                >
                  Отримати консультацію
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}