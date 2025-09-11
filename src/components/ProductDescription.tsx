import { Plug, Shield, Users } from "@phosphor-icons/react"

export default function ProductDescription() {
  return (
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
  )
}