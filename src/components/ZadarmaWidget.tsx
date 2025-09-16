import { useEffect } from 'react'

declare global {
  interface Window {
    ZCallbackWidgetLinkId: string
    ZCallbackWidgetDomain: string
    ZCallbackWidget?: {
      showWidget: () => void
      hideWidget: () => void
    }
  }
}

export default function ZadarmaWidget() {
  useEffect(() => {
    // Remove any custom styling that might hide Zadarma widgets
    const existingStyle = document.getElementById('zadarma-hide-style')
    if (existingStyle) {
      existingStyle.remove()
    }
  }, [])

  return null // Let Zadarma widget work natively
}