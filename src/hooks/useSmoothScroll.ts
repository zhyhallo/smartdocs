import { useEffect } from 'react'
import { smoothScrollToElement, smoothScrollToTop } from '@/lib/smoothScroll'

interface SmoothScrollOptions {
  offset?: number
  duration?: number
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { offset = 80, duration = 1500 } = options

  useEffect(() => {
    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement
      const href = target.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        event.preventDefault()
        
        const targetId = href.substring(1)
        
        // Handle home link specially
        if (targetId === '' || targetId === 'home') {
          smoothScrollToTop(duration)
          return
        }
        
        // Use utility function for element scroll
        smoothScrollToElement(targetId, offset, duration)
      }
    }

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick)
    })

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick)
      })
    }
  }, [offset, duration])
}

export default useSmoothScroll