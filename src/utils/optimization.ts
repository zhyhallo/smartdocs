/**
 * Optimized Performance and SEO Utilities
 */

// Performance monitoring (simplified)
export function measureWebVitals() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation' || entry.entryType === 'paint') {
            console.debug(`${entry.name || entry.entryType}: ${entry.duration || entry.startTime}ms`)
          }
        }
      })
      
      observer.observe({ entryTypes: ['navigation', 'paint'] })
    } catch (error) {
      console.debug('Performance monitoring not available')
    }
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof document !== 'undefined') {
    // Only preload if not already loaded
    const existingPreloads = document.querySelectorAll('link[rel="preload"]')
    const preloadedHrefs = Array.from(existingPreloads).map(link => (link as HTMLLinkElement).href)
    
    const fontHref = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
    
    if (!preloadedHrefs.includes(fontHref)) {
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      fontLink.href = fontHref
      document.head.appendChild(fontLink)
    }
  }
}

// Optimize images with intersection observer
export function optimizeImages() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src && !img.src.includes(img.dataset.src)) {
              img.src = img.dataset.src
              img.classList.remove('lazy')
              observer.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    )
    
    // Only observe images that haven't been processed
    document.querySelectorAll('img[data-src]:not([src])').forEach(img => {
      imageObserver.observe(img)
    })
  }
}

// Create optimized structured data
export function createStructuredData(language: 'uk' | 'pl' | 'ru' = 'uk') {
  const baseUrl = 'https://modulsoft.eu'
  
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "SoftwareApplication"],
    "name": "ModulSoft - Driver POSNET / Thermal для 1С:Enterprise",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Windows",
    "url": baseUrl,
    "description": language === 'uk' 
      ? "Професійна зовнішня компонента для інтеграції з фіскальними реєстраторами POSNET / Thermal"
      : language === 'pl'
      ? "Profesjonalny komponent zewnętrzny do integracji z drukarkami fiskalnymi POSNET / Thermal"
      : "Профессиональная внешняя компонента для интеграции с фискальными регистраторами POSNET / Thermal",
    "offers": {
      "@type": "Offer",
      "price": "1500",
      "priceCurrency": language === 'pl' ? "PLN" : language === 'ru' ? "RUB" : "UAH",
      "availability": "https://schema.org/InStock"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "вул. Святовасилівська 4/3",
      "addressLocality": "Луцьк",
      "postalCode": "43025",
      "addressCountry": "UA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+380931776504",
      "contactType": "customer service",
      "email": "info@modulsoft.eu"
    }
  }
}

// Optimized meta tags update
export function updateMetaTags(language: 'uk' | 'pl' | 'ru', title: string, description: string) {
  if (typeof document !== 'undefined') {
    document.title = title
    document.documentElement.lang = language
    
    const metaUpdates = [
      { selector: 'meta[name="description"]', attr: 'content', value: description },
      { selector: 'meta[property="og:title"]', attr: 'content', value: title },
      { selector: 'meta[property="og:description"]', attr: 'content', value: description },
      { selector: 'meta[property="og:locale"]', attr: 'content', 
        value: language === 'uk' ? 'uk_UA' : language === 'pl' ? 'pl_PL' : 'ru_RU' }
    ]
    
    metaUpdates.forEach(({ selector, attr, value }) => {
      const meta = document.querySelector(selector)
      if (meta) {
        meta.setAttribute(attr, value)
      }
    })
  }
}

// Add structured data to head (prevent duplicates)
export function addStructuredData(data: any) {
  if (typeof document !== 'undefined') {
    // Remove existing structured data to prevent duplicates
    const existing = document.querySelector('script[type="application/ld+json"][data-dynamic]')
    if (existing) {
      existing.remove()
    }
    
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-dynamic', 'true')
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}