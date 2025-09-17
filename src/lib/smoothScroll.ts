/**
 * Optimized smooth scroll utility with better performance and easing
 */
export const smoothScrollTo = (targetPosition: number, duration: number = 800) => {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  // Optimized easing function for smoother, more natural movement
  const easeInOutQuart = (t: number): number => {
    return t < 0.5 
      ? 8 * t * t * t * t 
      : 1 - 8 * (--t) * t * t * t
  }

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const run = easeInOutQuart(progress)
    
    window.scrollTo(0, startPosition + distance * run)
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Optimized smooth scroll to element by ID with offset
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
 * Optimized smooth scroll to top of page
 */
export const smoothScrollToTop = (duration: number = 800) => {
  smoothScrollTo(0, duration)
}