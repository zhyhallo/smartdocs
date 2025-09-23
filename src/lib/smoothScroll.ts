/**
 * Unified optimized smooth scroll utility with consistent behavior across entire landing page
 */
export const smoothScrollTo = (targetPosition: number, duration: number = 800) => {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  // Consistent enhanced easing function for ultra-smooth, natural movement
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const run = easeInOutCubic(progress)
    
    window.scrollTo(0, startPosition + distance * run)
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Unified smooth scroll to element by ID with consistent offset and duration
 */
export const smoothScrollToElement = (elementId: string, offset: number = 80, duration: number = 800) => {
  const element = document.getElementById(elementId)
  if (element) {
    const rect = element.getBoundingClientRect()
    const elementPosition = window.pageYOffset + rect.top
    const offsetPosition = elementPosition - offset
    smoothScrollTo(offsetPosition, duration)
  }
}

/**
 * Unified smooth scroll to top of page with consistent duration
 */
export const smoothScrollToTop = (duration: number = 800) => {
  smoothScrollTo(0, duration)
}