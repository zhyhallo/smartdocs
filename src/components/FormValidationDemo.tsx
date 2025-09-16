import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Envelope, User, Building, Eye, Warning, CheckCircle } from "@phosphor-icons/react"
import AnimatedFormField from "./AnimatedFormField"
import { ValidationSummary, useFormValidation } from "./FormValidationComponents"

const FormValidationDemo: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false)
  
  const validationConfig = {
    phone: {
      required: true,
      phone: true,
      minLength: 10
    },
    email: {
      required: true,
      email: true
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    company: {
      maxLength: 100
    },
    password: {
      required: true,
      minLength: 8,
      custom: (value: string) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Пароль повинен містити велику літеру, малу літеру та цифру"
        }
        return null
      }
    }
  }

  const { 
    validationState, 
    updateField, 
    isFormValid,
    resetForm 
  } = useFormValidation(['phone', 'email', 'name', 'company', 'password'], validationConfig)

  const demoVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-foreground">
          Демонстрація анімацій валідації форм
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Інтерактивний демо-стенд для перевірки всіх анімаційних ефектів форм:
          валідація в реальному часі, плаваючі лейбли, анімації помилок та успіху
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Eye size={12} />
            Плаваючі лейбли
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Warning size={12} />
            Анімації помилок
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle size={12} />
            Індикатори успіху
          </Badge>
        </div>

        <Button 
          onClick={() => setShowDemo(!showDemo)}
          className="mt-4"
          size="lg"
        >
          {showDemo ? "Приховати демо" : "Показати демо"}
        </Button>
      </motion.div>

      <AnimatePresence>
        {showDemo && (
          <motion.div
            variants={demoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Demo Form */}
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Тестова форма
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Validation Summary */}
                  <ValidationSummary 
                    validationState={validationState}
                    className="mb-4"
                  />

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <AnimatedFormField
                      id="demo-phone"
                      type="tel"
                      label="Телефон"
                      icon={<Phone size={16} />}
                      placeholder="+380 XX XXX XX XX"
                      value={validationState.phone.value}
                      validation={validationConfig.phone}
                      onChange={(value, isValid, error) => updateField('phone', value, isValid, error)}
                    />

                    <AnimatedFormField
                      id="demo-email"
                      type="email"
                      label="Email"
                      icon={<Envelope size={16} />}
                      placeholder="test@example.com"
                      value={validationState.email.value}
                      validation={validationConfig.email}
                      onChange={(value, isValid, error) => updateField('email', value, isValid, error)}
                    />

                    <AnimatedFormField
                      id="demo-name"
                      type="text"
                      label="Повне ім'я"
                      icon={<User size={16} />}
                      placeholder="Іван Іванович Іваненко"
                      value={validationState.name.value}
                      validation={validationConfig.name}
                      onChange={(value, isValid, error) => updateField('name', value, isValid, error)}
                    />

                    <AnimatedFormField
                      id="demo-company"
                      type="text"
                      label="Компанія (необов'язково)"
                      icon={<Building size={16} />}
                      placeholder="ТОВ 'Приклад'"
                      value={validationState.company.value}
                      validation={validationConfig.company}
                      onChange={(value, isValid, error) => updateField('company', value, isValid, error)}
                    />

                    <AnimatedFormField
                      id="demo-password"
                      type="password"
                      label="Пароль"
                      placeholder="Введіть надійний пароль"
                      value={validationState.password.value}
                      validation={validationConfig.password}
                      onChange={(value, isValid, error) => updateField('password', value, isValid, error)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      disabled={!isFormValid}
                    >
                      {isFormValid ? "Відправити ✓" : "Заповніть всі поля"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                    >
                      Очистити
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Overview */}
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    Функції валідації
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">Плаваючі лейбли</h4>
                        <p className="text-xs text-muted-foreground">
                          Анімовані лейбли, що піднімаються при фокусі
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">Валідація в реальному часі</h4>
                        <p className="text-xs text-muted-foreground">
                          Перевірка даних з затримкою (debouncing)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">Анімації помилок</h4>
                        <p className="text-xs text-muted-foreground">
                          Струшування та кольорові індикатори
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">Індикатори прогресу</h4>
                        <p className="text-xs text-muted-foreground">
                          Візуальний показник заповнення форми
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">Показ/приховування пароля</h4>
                        <p className="text-xs text-muted-foreground">
                          Кнопка перегляду з плавними переходами
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">Складні правила валідації</h4>
                        <p className="text-xs text-muted-foreground">
                          Email, телефон, довжина, користувацькі правила
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-sm mb-2">Спробуйте:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Клікніть у поля для перегляду анімації лейблів</li>
                      <li>• Введіть неправильний email або телефон</li>
                      <li>• Очистіть обов'язкові поля</li>
                      <li>• Спостерігайте за прогрес-баром</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FormValidationDemo