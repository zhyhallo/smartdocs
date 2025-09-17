import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, X, CheckCircle } from "@phosphor-icons/react"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface ZadarmaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CallbackData {
  phone: string
}

export default function ZadarmaModal({ open, onOpenChange }: ZadarmaModalProps) {
  const [formData, setFormData] = useState<CallbackData>({
    phone: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (value: string) => {
    setFormData({ phone: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.phone.trim()) {
      toast.error("Будь ласка, введіть номер телефону")
      return
    }

    // Basic phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(formData.phone.trim())) {
      toast.error("Будь ласка, введіть корректний номер телефону")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call to Zadarma or your callback service
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would normally send the data to Zadarma API or your backend
      console.log("Submitting callback request:", { 
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        service: "Driver POSNET / Thermal consultation"
      })
      
      setIsSubmitted(true)
      toast.success("Заявку на дзвінок успішно відправлено! Ми зателефонуємо вам протягом 5 хвилин.")
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ phone: "" })
        setIsSubmitted(false)
        onOpenChange(false)
      }, 3000)
      
    } catch (error) {
      console.error("Callback request error:", error)
      toast.error("Помилка відправки заявки. Спробуйте ще раз або зателефонуйте нам безпосередньо.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ phone: "" })
      setIsSubmitted(false)
      onOpenChange(false)
    }
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-green-700 mb-2">
              Заявку прийнято!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Ми зателефонуємо вам протягом 5 хвилин для консультації щодо Driver POSNET / Thermal.
            </DialogDescription>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <X size={16} />
            <span className="sr-only">Закрити</span>
          </Button>
          <DialogTitle className="text-xl font-bold text-foreground pr-8">
            Замовити зворотний дзвінок
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Введіть ваш номер телефону, і ми зателефонуємо вам протягом 5 хвилин
          </DialogDescription>
        </DialogHeader>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="callback-phone" className="text-sm font-medium flex items-center">
                  <Phone size={16} className="mr-2 text-primary" />
                  Номер телефону *
                </Label>
                <Input
                  id="callback-phone"
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="border-border/50 focus:border-primary"
                  required
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 font-medium tracking-wide"
                  disabled={isSubmitting || !formData.phone.trim()}
                >
                  <Phone size={16} className="mr-2" />
                  {isSubmitting ? "Відправляємо..." : "Замовити дзвінок"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 font-medium"
                  disabled={isSubmitting}
                >
                  Скасувати
                </Button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground text-center">
                * - обов'язкове поле для заповнення
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                Час роботи: Пн-Пт з 8:00 до 17:00
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}