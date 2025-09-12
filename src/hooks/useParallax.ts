import { useRef, useEffect } from 'react'
import { useTransform, useScroll, MotionValue } from 'framer-motion'

interface ParallaxOptions {
  speed?: number
  direction?: 'up' | 'down'
  offset?: number
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up', offset = 0 } = options
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const multiplier = direction === 'up' ? -1 : 1
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, multiplier * speed * 100]
  )

  return { ref, y }
}

export function useParallaxValue(
  value: MotionValue<number>,
  inputRange: number[],
  outputRange: number[]
) {
  return useTransform(value, inputRange, outputRange)
}

// Advanced parallax hook with custom transform ranges
export function useAdvancedParallax(
  inputRange: number[] = [0, 1],
  outputRange: number[] = [0, -100],
  options: { offset?: [string, string] } = {}
) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ["start end", "end start"]
  })

  const transform = useTransform(scrollYProgress, inputRange, outputRange)

  return { ref, transform, scrollYProgress }
}

// Parallax hook for background elements
export function useBackgroundParallax(speed: number = 0.3) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000])
  
  return y
}

// Multiple parallax layers hook
export function useMultiLayerParallax() {
  const { scrollY } = useScroll()
  
  const slowLayer = useTransform(scrollY, [0, 1000], [0, -100])
  const mediumLayer = useTransform(scrollY, [0, 1000], [0, -200])
  const fastLayer = useTransform(scrollY, [0, 1000], [0, -400])
  
  return { slowLayer, mediumLayer, fastLayer }
}