import React from "react"

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
  // Simplified version - just return the children without complex interactions
  return (
    <div 
      id={sectionId}
      className={className}
      data-section={sectionId}
    >
      {children}
    </div>
  )
}