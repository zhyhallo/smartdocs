import { motion } from "framer-motion"
import { useInView } from "@/hooks/useInView"
import { useTranslation } from "@/hooks/useTranslation"

export default function SocialProof() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useTranslation()

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  }

  const statVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "backOut"
      }
    }
  }

  const stats = [
    {
      number: "16+",
      label: t('social.experience'),
      color: "text-primary"
    },
    {
      number: "200+",
      label: t('social.projects'),
      color: "text-accent"
    },
    {
      number: "40+",
      label: t('social.specialists'),
      color: "text-primary"
    }
  ]

  return (
    <section className="py-20 bg-secondary/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('social.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('social.subtitle')}</p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="group cursor-pointer"
              variants={statVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className={`text-4xl font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                variants={numberVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}