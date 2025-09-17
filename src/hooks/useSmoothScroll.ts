import { useEffect } from 'react'

interface SmoothScrollOptions {
  offset?: number
  duration?: number
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { offset = 100, duration = 1000 } = options

  useEffect(() => {
    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement
      const href = target.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        event.preventDefault()
        
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          // Use a more precise method to get element position
          const elementPosition = targetElement.offsetTop
          const offsetPosition = elementPosition - offset
          
          // Use native smooth scroll with improved behavior
          window.scrollTo({ 
            top: offsetPosition, 
            behavior: 'smooth' 
          })
        }
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