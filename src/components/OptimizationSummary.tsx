import { motion } from "framer-motion"
import { OwlAnalyst, OwlMascot, OwlIcon } from "@/components"

// This component demonstrates the optimized owl sizes for reference
export default function OptimizationSummary() {
  return (
    <div className="hidden p-8 space-y-8 bg-background">
      <h2 className="text-2xl font-bold">Optimized Owl Sizes</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">OwlAnalyst</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm">xs:</div>
          <OwlAnalyst size="xs" />
          <div className="text-sm">sm:</div>
          <OwlAnalyst size="sm" />
          <div className="text-sm">md:</div>
          <OwlAnalyst size="md" />
          <div className="text-sm">lg:</div>
          <OwlAnalyst size="lg" />
          <div className="text-sm">xl:</div>
          <OwlAnalyst size="xl" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">OwlMascot</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm">xs:</div>
          <OwlMascot size="xs" />
          <div className="text-sm">sm:</div>
          <OwlMascot size="sm" />
          <div className="text-sm">md:</div>
          <OwlMascot size="md" />
          <div className="text-sm">lg:</div>
          <OwlMascot size="lg" />
          <div className="text-sm">xl:</div>
          <OwlMascot size="xl" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">OwlIcon</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm">xs:</div>
          <OwlIcon size="xs" />
          <div className="text-sm">sm:</div>
          <OwlIcon size="sm" />
          <div className="text-sm">md:</div>
          <OwlIcon size="md" />
        </div>
      </div>

      <div className="mt-8 p-4 bg-card rounded-lg">
        <h4 className="font-semibold mb-2">Optimization Summary:</h4>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Owl sizes reduced by 40-50% across all components</li>
          <li>• Terminal sizes increased by 50% for better visibility</li>
          <li>• Spacing optimized to prevent overlap</li>
          <li>• Positioning adjusted to be more decorative</li>
          <li>• Mobile responsiveness maintained</li>
        </ul>
      </div>
    </div>
  )
}