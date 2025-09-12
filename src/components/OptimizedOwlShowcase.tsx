import { motion } from "framer-motion"
import { OwlAnalyst } from "@/components"

export default function OptimizedOwlShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const sizes = [
    { size: "xs" as const, label: "Header/Footer (xs)", description: "Optimized for navigation" },
    { size: "sm" as const, label: "Small Sections (sm)", description: "For decorative elements" },
    { size: "md" as const, label: "Medium Sections (md)", description: "For main content areas" },
    { size: "lg" as const, label: "Large Sections (lg)", description: "For emphasis areas" },
    { size: "xl" as const, label: "Hero Section (xl)", description: "For primary focus" }
  ]

  return (
    <div className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Оптимізовані розміри сов 🦉
          </h2>
          <p className="text-muted-foreground text-lg">
            Кожен розмір оптимізований для конкретного контексту використання
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sizes.map((sizeConfig, index) => (
            <motion.div
              key={sizeConfig.size}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <OwlAnalyst 
                    size={sizeConfig.size} 
                    animated={true}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {sizeConfig.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {sizeConfig.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 p-6 bg-accent/10 rounded-xl border border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-accent mb-3 flex items-center">
            🎯 Основні поліпшення
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              Зменшені розміри сов в хедері та футері для кращого балансу
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              Оптимізовані пропорції між совою та POS-терміналом
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              Покращена читабельність контенту без перекриттів
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              Адаптивні розміри для різних екранів
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}