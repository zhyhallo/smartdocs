import { OwlAnalyst, OwlMascot, OwlIcon } from "@/components"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function SizeOptimizationSummary() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Owl Size Optimization Summary</h1>
        <p className="text-muted-foreground">All owl sizes have been reduced by 60% from original specifications</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>OwlAnalyst (Most Common)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">xs:</span>
              <OwlAnalyst size="xs" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">sm:</span>
              <OwlAnalyst size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">md:</span>
              <OwlAnalyst size="md" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OwlMascot (Interactive)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">xs:</span>
              <OwlMascot size="xs" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">sm:</span>
              <OwlMascot size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">md:</span>
              <OwlMascot size="md" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OwlIcon (Simple)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">xs:</span>
              <OwlIcon size="xs" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">sm:</span>
              <OwlIcon size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">md:</span>
              <OwlIcon size="md" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Size Reduction Details</h2>
        <ul className="space-y-2 text-sm">
          <li>• All owls reduced by 60% from previous sizes</li>
          <li>• Terminals are now properly proportioned to be 25% of owl size</li>
          <li>• Default OwlAnalyst size changed from "lg" to "md"</li>
          <li>• Mobile responsive scaling maintained</li>
          <li>• Background decorative owls remain at xs size with low opacity</li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          These optimized sizes should provide better visual balance throughout the landing page.
        </p>
      </div>
    </div>
  )
}