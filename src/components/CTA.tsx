import { Button } from "@/components/ui/button"
import { Phone } from "@phosphor-icons/react"

interface CTAProps {
  onContactClick: (service: string) => void
}

export default function CTA({ onContactClick }: CTAProps) {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Готові до інтеграції з POSNET?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Зв'яжіться з нами для детальної консультації або замовлення компонента
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 cursor-pointer"
              onClick={() => onContactClick("Купити Driver POSNET")}
            >
              <Phone className="mr-2" size={20} />
              Замовити дзвінок
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}