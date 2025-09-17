import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, X, CheckCircle } from "@phosphor-icons/react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useTranslation } from "@/hooks/useTranslation"

interface ZadarmaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CallbackData {
  phone: string
}

export default function ZadarmaModal({ open, onOpenChange }: ZadarmaModalProps) {
  const { t } = useTranslation()
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
      toast.error(t('zadarma.error.phone.required'))
      return
    }

    // Basic phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(formData.phone.trim())) {
      toast.error(t('zadarma.error.phone.invalid'))
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
      toast.success(t('zadarma.success.toast'))
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ phone: "" })
        setIsSubmitted(false)
        onOpenChange(false)
      }, 3000)
      
    } catch (error) {
      console.error("Callback request error:", error)
      toast.error(t('zadarma.error.submit'))
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
              {t('zadarma.success.title')}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t('zadarma.success.description')}
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
            <span className="sr-only">{t('zadarma.close')}</span>
          </Button>
          <DialogTitle className="text-xl font-bold text-foreground pr-8">
            {t('zadarma.title')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t('zadarma.description')}
          </DialogDescription>
        </DialogHeader>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="callback-phone" className="text-sm font-medium flex items-center">
                  <Phone size={16} className="mr-2 text-primary" />
                  {t('zadarma.phone.label')}
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
                  {isSubmitting ? t('zadarma.submitting') : t('zadarma.submit')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 font-medium"
                  disabled={isSubmitting}
                >
                  {t('contact.cancel')}
                </Button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground text-center">
                * - {t('contact.required')}
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                {t('zadarma.schedule')}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}