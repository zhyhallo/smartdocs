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
    const { organizationData, productData } = createStructuredData(language)
    
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]:not([data-keep])')
    existingScripts.forEach(script => {
      if (script.textContent?.includes('"@type": "Organization"') || 
          script.textContent?.includes('"@type": "Product"')) {
        script.remove()
      }
    })
    
    // Add new structured data
    addStructuredData(organizationData)
    addStructuredData(productData)
    
  }, [language, t])

  // This component doesn't render anything
  return null
}