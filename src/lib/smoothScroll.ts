/**
 * Optimized smooth scroll utility with enhanced easing and longer duration for smoother experience
 */
export const smoothScrollTo = (targetPosition: number, duration: number = 1200) => {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  // Enhanced easing function for ultra-smooth, natural movement
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
 * Enhanced smooth scroll to element by ID with offset and longer duration
 */
export const smoothScrollToElement = (elementId: string, offset: number = 100, duration: number = 1200) => {
  const element = document.getElementById(elementId)
  if (element) {
    const rect = element.getBoundingClientRect()
    const elementPosition = window.pageYOffset + rect.top
    const offsetPosition = elementPosition - offset
    smoothScrollTo(offsetPosition, duration)
  }
}

/**
 * Enhanced smooth scroll to top of page with longer duration
 */
export const smoothScrollToTop = (duration: number = 1200) => {
  smoothScrollTo(0, duration)
}