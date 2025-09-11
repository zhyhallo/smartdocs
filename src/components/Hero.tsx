import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroProps {
  onContactClick: (service: string) => void
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
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
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 cursor-pointer"
              onClick={() => onContactClick("Купити Driver POSNET")}
            >
              Купити зараз - 1500 zł
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}