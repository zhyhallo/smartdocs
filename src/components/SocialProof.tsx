export default function SocialProof() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Наш досвід</h2>
          <p className="text-lg text-muted-foreground">Довіра клієнтів - наша найкраща рекомендація</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">16+</div>
            <div className="text-muted-foreground">років досвіду</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-muted-foreground">успішних проектів</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">40+</div>
            <div className="text-muted-foreground">сертифікованих спеціалістів</div>
          </div>
        </div>
      </div>
    </section>
  )
}