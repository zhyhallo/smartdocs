import React from "react"

interface ParallaxBackgroundProps {
  children?: React.ReactNode
  className?: string
  variant?: "subtle" | "medium" | "strong"
}

export default function ParallaxBackground({
  children,
  className = "",
  variant = "subtle"
}: ParallaxBackgroundProps) {
  // Simplified static background without complex parallax
  return (
    <div className={`relative ${className}`}>
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-muted opacity-50" />
      
      {/* Simple floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: "3s" }} />
      </div>
      
      {children}
    </div>
  )
}