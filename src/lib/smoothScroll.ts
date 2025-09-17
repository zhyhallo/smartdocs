/**
 * Smooth scroll utility with custom easing animation
 */
export const smoothScrollTo = (targetPosition: number, duration: number = 1500) => {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  // Improved easing function for more natural movement
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = easeInOutCubic(timeElapsed / duration)
    
    window.scrollTo(0, startPosition + distance * run)
    
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  requestAnimationFrame(animation)
}

/**
 * Smooth scroll to element by ID with offset
 */
export const smoothScrollToElement = (elementId: string, offset: number = 80, duration: number = 1500) => {
  const element = document.getElementById(elementId)
  if (element) {
    const rect = element.getBoundingClientRect()
    const elementPosition = window.pageYOffset + rect.top
    const offsetPosition = elementPosition - offset
    smoothScrollTo(offsetPosition, duration)
  }
}

/**
 * Smooth scroll to top of page
 */
export const smoothScrollToTop = (duration: number = 1500) => {
  smoothScrollTo(0, duration)
}