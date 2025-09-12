import React, { useEffect, useRef, useState } from "react"
import { useInteractionContext } from "@/hooks/useInteractionContext"
import { type InteractionEvent } from "@/hooks/useInteractiveTerminal"

interface InteractiveSectionProps {
  children: React.ReactNode
  sectionId: string
  triggerOnView?: boolean
  triggerOnHover?: boolean
  className?: string
}

export function InteractiveSection({
  children,
  sectionId,
  triggerOnView = true,
  triggerOnHover = false,
  className = ""
}: InteractiveSectionProps) {
  const { triggerGlobalInteraction } = useInteractionContext()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)

  useEffect(() => {
    if (!triggerOnView || hasBeenViewed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true)
          const interaction: InteractionEvent = {
            type: "section_view",
            section: sectionId
          }
          triggerGlobalInteraction(interaction)
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [triggerOnView, hasBeenViewed, sectionId, triggerGlobalInteraction])

  const handleHover = () => {
    if (triggerOnHover) {
      const interaction: InteractionEvent = {
        type: "hover",
        section: sectionId
      }
      triggerGlobalInteraction(interaction)
    }
  }

  const handleScroll = () => {
    const interaction: InteractionEvent = {
      type: "scroll",
      section: sectionId
    }
    triggerGlobalInteraction(interaction)
  }

  // Add scroll listener
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let scrollTimeout: NodeJS.Timeout
    const handleScrollEvent = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 100) // Debounce scroll events
    }

    section.addEventListener('scroll', handleScrollEvent, { passive: true })
    return () => {
      section.removeEventListener('scroll', handleScrollEvent)
      clearTimeout(scrollTimeout)
    }
  }, [sectionId])

  return (
    <div
      ref={sectionRef}
      className={className}
      onMouseEnter={triggerOnHover ? handleHover : undefined}
      data-section={sectionId}
    >
      {children}
    </div>
  )
}

// Higher-order component version
export function withInteractiveSection<T extends object>(
  Component: React.ComponentType<T>,
  sectionId: string,
  options: {
    triggerOnView?: boolean
    triggerOnHover?: boolean
  } = {}
) {
  return function InteractiveWrappedComponent(props: T) {
    return (
      <InteractiveSection
        sectionId={sectionId}
        triggerOnView={options.triggerOnView}
        triggerOnHover={options.triggerOnHover}
      >
        <Component {...props} />
      </InteractiveSection>
    )
  }
}