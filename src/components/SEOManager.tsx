import { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { updateMetaTags, createStructuredData, addStructuredData } from '@/utils/optimization'

export default function SEOManager() {
  const { language, t } = useTranslation()

  useEffect(() => {
    // Update meta tags when language changes
    const title = t('meta.title')
    const description = t('meta.description')
    
    updateMetaTags(language, title, description)
    
    // Add structured data for current language
    const structuredData = createStructuredData(language)
    addStructuredData(structuredData)
    
  }, [language, t])

  // This component doesn't render anything
  return null
}