import { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { 
  updateMetaTags, 
  createStructuredData, 
  addStructuredData, 
  performSEOHealthCheck,
  trackUserInteraction 
} from '@/utils/optimization'

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

    // Perform SEO health check in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        const healthCheck = performSEOHealthCheck()
        if (healthCheck && healthCheck.score < 80) {
          console.warn(`SEO Score: ${Math.round(healthCheck.score)}% - Consider improvements`, healthCheck.checks)
        } else if (healthCheck) {
          console.info(`SEO Score: ${Math.round(healthCheck.score)}% - Good!`)
        }
      }, 2000)
    }

    // Track page view for analytics
    trackUserInteraction('page_view', 'Navigation', `landing_${language}`)
    
  }, [language, t])

  // Track scroll depth for engagement metrics
  useEffect(() => {
    let scrollDepths = [25, 50, 75, 90]
    let tracked = new Set()

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          tracked.add(depth)
          trackUserInteraction('scroll_depth', 'Engagement', `${depth}_percent`)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track time on page
  useEffect(() => {
    const startTime = Date.now()

    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      if (timeSpent > 30) { // Only track if user spent more than 30 seconds
        trackUserInteraction('time_on_page', 'Engagement', `${timeSpent}_seconds`)
      }
    }

    const handleUnload = () => trackTimeOnPage()
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackTimeOnPage()
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // This component doesn't render anything
  return null
}