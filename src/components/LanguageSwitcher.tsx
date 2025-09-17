import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation, Language } from '@/hooks/useTranslation'
import { CaretDown, Globe } from '@phosphor-icons/react'

const languageNames = {
  uk: 'Українська',
  pl: 'Polski', 
  ru: 'Русский'
}

const languageFlags = {
  uk: '🇺🇦',
  pl: '🇵🇱',
  ru: '🇷🇺'
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:text-accent transition-colors duration-200 rounded-md hover:bg-muted/30"
        aria-label="Change language"
      >
        <Globe size={16} className="text-muted-foreground" />
        <span className="hidden sm:inline font-medium">{languageFlags[language]}</span>
        <span className="hidden md:inline text-sm">{languageNames[language].split('')[0].toUpperCase() + languageNames[language].slice(1, 3)}</span>
        <CaretDown 
          size={12} 
          className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 ${
                  language === lang 
                    ? 'bg-accent/10 text-accent font-medium' 
                    : 'text-card-foreground hover:bg-muted/50'
                }`}
              >
                <span className="text-lg" role="img" aria-label={languageNames[lang]}>
                  {languageFlags[lang]}
                </span>
                <span className="font-medium">{languageNames[lang]}</span>
                {language === lang && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-accent rounded-full"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}