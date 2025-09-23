/**
 * Unified smooth scroll utility - використовує нативний CSS scroll-behavior
 */

/**
 * Unified smooth scroll to element by ID with consistent offset
 */
export const smoothScrollToElement = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const rect = element.getBoundingClientRect()
    const elementPosition = window.pageYOffset + rect.top
    const offsetPosition = elementPosition - offset
    
    window.scrollTo({ 
      top: offsetPosition, 
      behavior: 'smooth' 
    })
  }
}

/**
 * Unified smooth scroll to top of page
 */
export const smoothScrollToTop = () => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  })
}