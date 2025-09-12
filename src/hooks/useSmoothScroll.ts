import { useEffect } from 'react'

interface SmoothScrollOptions {
  offset?: number
  duration?: number
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { offset = 80, duration = 800 } = options

  useEffect(() => {
    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement
      const href = target.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        event.preventDefault()
        
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          
          // Custom smooth scroll animation
          const startPosition = window.pageYOffset
          const distance = offsetPosition - startPosition
          const startTime = performance.now()
          
          function animation(currentTime: number) {
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)
            
            // Easing function (ease-out cubic)
            const ease = 1 - Math.pow(1 - progress, 3)
            
            window.scrollTo(0, startPosition + distance * ease)
            
            if (progress < 1) {
              requestAnimationFrame(animation)
            }
          }
          
          requestAnimationFrame(animation)
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