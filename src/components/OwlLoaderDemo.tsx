import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { OwlLoader, OwlSpinner, OwlProgress, LoadingState } from "@/components"

/**
 * Demo component showcasing different owl loading animations
 * Can be used for testing or as a style guide reference
 */
export default function OwlLoaderDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const triggerDemo = (demoType: string) => {
    setActiveDemo(demoType)
    setTimeout(() => setActiveDemo(null), 3000)
  }

  // Simulate progress for the progress demo
  useEffect(() => {
    if (activeDemo === 'progress') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 50)
      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [activeDemo])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          🦉 Owl Loading Animations
        </h2>
        <p className="text-muted-foreground">
          Charming owl-themed loading states for your application
        </p>
      </div>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Size Variations</CardTitle>
          <CardDescription>
            Different sizes for different contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <h4 className="font-medium">Main Loader</h4>
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-center">
                  <OwlLoader size="sm" />
                  <p className="mt-2 text-xs text-muted-foreground">Small</p>
                </div>
                <div className="text-center">
                  <OwlLoader size="md" />
                  <p className="mt-2 text-xs text-muted-foreground">Medium</p>
                </div>
                <div className="text-center">
                  <OwlLoader size="lg" />
                  <p className="mt-2 text-xs text-muted-foreground">Large</p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium">Spinner</h4>
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-center">
                  <OwlSpinner size="sm" />
                  <p className="mt-2 text-xs text-muted-foreground">Small</p>
                </div>
                <div className="text-center">
                  <OwlSpinner size="md" />
                  <p className="mt-2 text-xs text-muted-foreground">Medium</p>
                </div>
                <div className="text-center">
                  <OwlSpinner size="lg" />
                  <p className="mt-2 text-xs text-muted-foreground">Large</p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium">Progress</h4>
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-center">
                  <OwlProgress progress={25} size="sm" showPercentage={false} />
                  <p className="mt-2 text-xs text-muted-foreground">25%</p>
                </div>
                <div className="text-center">
                  <OwlProgress progress={50} size="md" showPercentage={false} />
                  <p className="mt-2 text-xs text-muted-foreground">50%</p>
                </div>
                <div className="text-center">
                  <OwlProgress progress={75} size="lg" showPercentage={false} />
                  <p className="mt-2 text-xs text-muted-foreground">75%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Demos */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Demos</CardTitle>
          <CardDescription>
            Try different loading states and see them in action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              onClick={() => triggerDemo('form')} 
              disabled={activeDemo !== null}
              className="cursor-pointer"
            >
              Form Submit
            </Button>
            <Button 
              onClick={() => triggerDemo('spinner')} 
              disabled={activeDemo !== null}
              variant="outline"
              className="cursor-pointer"
            >
              Quick Spinner
            </Button>
            <Button 
              onClick={() => triggerDemo('progress')} 
              disabled={activeDemo !== null}
              variant="secondary"
              className="cursor-pointer"
            >
              File Upload
            </Button>
            <Button 
              onClick={() => triggerDemo('processing')} 
              disabled={activeDemo !== null}
              variant="ghost"
              className="cursor-pointer"
            >
              Processing
            </Button>
          </div>

          <div className="min-h-[140px] flex items-center justify-center border border-border rounded-lg bg-muted/20">
            <AnimatePresence mode="wait">
              {activeDemo === 'form' && (
                <LoadingState 
                  key="form"
                  message="Відправляємо заявку..." 
                  size="md" 
                />
              )}
              {activeDemo === 'spinner' && (
                <div key="spinner" className="flex flex-col items-center gap-3">
                  <OwlSpinner size="lg" />
                  <p className="text-muted-foreground font-medium">Швидке завантаження...</p>
                </div>
              )}
              {activeDemo === 'progress' && (
                <div key="progress" className="flex flex-col items-center gap-3">
                  <OwlProgress progress={progress} size="lg" />
                  <p className="text-muted-foreground font-medium">Завантажуємо файл...</p>
                </div>
              )}
              {activeDemo === 'processing' && (
                <LoadingState 
                  key="processing"
                  message="Обробляємо запит..." 
                  size="lg" 
                />
              )}
              {activeDemo === null && (
                <motion.p 
                  key="placeholder"
                  className="text-muted-foreground italic text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Натисніть кнопку для демонстрації анімації
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            How to integrate owl loading in different contexts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Button with Loading</h4>
            <pre className="text-sm text-muted-foreground bg-background p-3 rounded overflow-x-auto">
{`<Button disabled={isLoading}>
  {isLoading ? (
    <div className="flex items-center gap-2">
      <OwlLoader size="sm" />
      <span>Loading...</span>
    </div>
  ) : (
    "Submit"
  )}
</Button>`}
            </pre>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Quick Spinner</h4>
            <pre className="text-sm text-muted-foreground bg-background p-3 rounded overflow-x-auto">
{`{isLoading && <OwlSpinner size="md" />}`}
            </pre>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Progress Indicator</h4>
            <pre className="text-sm text-muted-foreground bg-background p-3 rounded overflow-x-auto">
{`<OwlProgress 
  progress={uploadProgress} 
  size="lg"
  showPercentage={true}
/>`}
            </pre>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Full Page Loading</h4>
            <pre className="text-sm text-muted-foreground bg-background p-3 rounded overflow-x-auto">
{`{isLoading && (
  <LoadingState 
    message="Завантаження..." 
    size="lg" 
    className="min-h-screen"
  />
)}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}