import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Database, Cookie, Eye, FileText } from "@phosphor-icons/react"
import { useTranslation } from "@/hooks/useTranslation"

interface PrivacyPolicyProps {
  onBackClick?: () => void
}

export default function PrivacyPolicy({ onBackClick }: PrivacyPolicyProps) {
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
              {t('privacy.back')}
            </Button>
          )}
          
          <div className="flex items-center mb-4">
            <Shield size={32} className="text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">
              {t('privacy.title')}
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg">
            {t('privacy.last-updated')}: {new Date().toLocaleDateString('uk-UA')}
          </p>
        </motion.div>

        <motion.div className="space-y-8" variants={itemVariants}>
          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <FileText size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  {t('privacy.general.title')}
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  {t('privacy.general.content1')}
                </p>
                <p>
                  {t('privacy.general.content2')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Database size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  {t('privacy.data.title')}
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>{t('privacy.data.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>{t('privacy.data.contact')}</strong></li>
                  <li><strong>{t('privacy.data.technical')}</strong></li>
                  <li><strong>{t('privacy.data.cookies')}</strong></li>
                  <li><strong>{t('privacy.data.commercial')}</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Eye size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  {t('privacy.usage.title')}
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>{t('privacy.usage.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.usage.services')}</li>
                  <li>{t('privacy.usage.orders')}</li>
                  <li>{t('privacy.usage.contact')}</li>
                  <li>{t('privacy.usage.improve')}</li>
                  <li>{t('privacy.usage.marketing')}</li>
                  <li>{t('privacy.usage.legal')}</li>
                  <li>{t('privacy.usage.protection')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Cookie size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  {t('privacy.cookies.title')}
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  {t('privacy.cookies.description')}
                </p>
                <p><strong>{t('privacy.cookies.types')}</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>{t('privacy.cookies.essential')}</strong></li>
                  <li><strong>{t('privacy.cookies.functional')}</strong></li>
                  <li><strong>{t('privacy.cookies.analytics')}</strong></li>
                  <li><strong>{t('privacy.cookies.marketing')}</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Shield size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  {t('privacy.rights.title')}
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>{t('privacy.rights.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.rights.access')}</li>
                  <li>{t('privacy.rights.rectification')}</li>
                  <li>{t('privacy.rights.erasure')}</li>
                  <li>{t('privacy.rights.restriction')}</li>
                  <li>{t('privacy.rights.portability')}</li>
                  <li>{t('privacy.rights.objection')}</li>
                  <li>{t('privacy.rights.withdraw')}</li>
                </ul>
                <p>
                  {t('privacy.rights.contact')}{' '}
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
                  {t('privacy.security.title')}
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  {t('privacy.security.protection')}
                </p>
                <p>
                  {t('privacy.security.retention')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <FileText size={24} className="text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">
                  {t('privacy.contact.title')}
                </h2>
              </div>
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  {t('privacy.contact.intro')}
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p><strong>ModulSoft</strong></p>
                  <p>43025, м. Луцьк, вул. Святовасилівська 4/3</p>
                  <p>Телефон: <a href="tel:+380931776504" className="text-accent">+38 (093) 177-65-04</a></p>
                  <p>Email: <a href="mailto:info@modulsoft.eu" className="text-accent">info@modulsoft.eu</a></p>
                </div>
                <p>
                  {t('privacy.contact.response')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}