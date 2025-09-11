import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "@phosphor-icons/react"

interface PricingProps {
  onContactClick: (service: string) => void
}

export default function Pricing({ onContactClick }: PricingProps) {
  return (
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
                className="w-full text-lg py-6 cursor-pointer" 
                size="lg"
                onClick={() => onContactClick("Купити Driver POSNET - 1500 zł")}
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
  )
}