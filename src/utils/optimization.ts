/**
 * Advanced SEO and Performance Optimization Utilities
 */

// Type definitions for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    analytics?: {
      track: (event: string, properties?: any) => void
    }
  }
}

// Performance entry types for Web Vitals
interface PerformanceNavigationEntry extends PerformanceEntry {
  processingStart?: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

// Enhanced Web Vitals monitoring with detailed metrics
export function measureWebVitals() {
  if (typeof window !== 'undefined') {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      try {
        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.debug(`LCP: ${Math.round(lastEntry.startTime)}ms`)
          
          // Send to analytics if available
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lastEntry.startTime),
              event_category: 'Performance'
            })
          }
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // FID (First Input Delay) 
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            const navEntry = entry as PerformanceNavigationEntry
            if (navEntry.processingStart) {
              const fidValue = Math.round(navEntry.processingStart - entry.startTime)
              console.debug(`FID: ${fidValue}ms`)
              
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  name: 'FID',
                  value: fidValue,
                  event_category: 'Performance'
                })
              }
            }
          })
        })
        fidObserver.observe({ type: 'first-input', buffered: true })

        // CLS (Cumulative Layout Shift)
        let clsScore = 0
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const layoutEntry = entry as LayoutShiftEntry
            if (!layoutEntry.hadRecentInput) {
              clsScore += layoutEntry.value
              console.debug(`CLS: ${clsScore.toFixed(4)}`)
            }
          })
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })

        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              console.debug(`FCP: ${Math.round(entry.startTime)}ms`)
              
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  name: 'FCP',
                  value: Math.round(entry.startTime),
                  event_category: 'Performance'
                })
              }
            }
          })
        })
        fcpObserver.observe({ type: 'paint', buffered: true })

      } catch (error) {
        console.debug('Performance monitoring setup failed:', error)
      }
    }

    // Connection quality detection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      console.debug(`Network: ${connection.effectiveType} (${connection.downlink}Mbps)`)
    }
  }
}

// Enhanced resource preloading with intelligent prioritization
export function preloadCriticalResources() {
  if (typeof document !== 'undefined') {
    const existingPreloads = new Set(
      Array.from(document.querySelectorAll('link[rel="preload"]'))
        .map(link => (link as HTMLLinkElement).href)
    )
    
    // Critical font preloading
    const criticalFonts = [
      {
        href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
        as: 'font',
        type: 'font/woff2'
      }
    ]
    
    criticalFonts.forEach(font => {
      if (!existingPreloads.has(font.href)) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = font.as
        link.type = font.type
        link.crossOrigin = 'anonymous'
        link.href = font.href
        document.head.appendChild(link)
      }
    })

    // Preload critical images based on viewport
    const heroImages = document.querySelectorAll('.hero-section img')
    heroImages.forEach(img => {
      const imgElement = img as HTMLImageElement
      if (imgElement.src && !existingPreloads.has(imgElement.src)) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = imgElement.src
        document.head.appendChild(link)
      }
    })
  }
}

// Intelligent lazy loading with intersection observer optimization
export function optimizeImages() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            
            // Handle data-src lazy loading
            if (img.dataset.src && !img.src.includes(img.dataset.src)) {
              img.src = img.dataset.src
              img.classList.remove('lazy')
            }
            
            // Handle srcset for responsive images
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset
              delete img.dataset.srcset
            }
            
            // Add loaded class for fade-in effects
            img.classList.add('loaded')
            observer.unobserve(img)
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    )
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
      imageObserver.observe(img)
    })
  }
}

// Enhanced structured data with comprehensive SEO information
export function createStructuredData(language: 'uk' | 'pl' | 'ru' = 'uk') {
  const baseUrl = 'https://modulsoft.eu'
  
  const translations = {
    uk: {
      name: "ModulSoft - Driver POSNET для 1С:Enterprise",
      description: "Професійна зовнішня компонента для інтеграції з фіскальними реєстраторами POSNET",
      currency: "UAH",
      locale: "uk_UA",
      region: "Україна"
    },
    pl: {
      name: "ModulSoft - Driver POSNET dla 1C:Enterprise", 
      description: "Profesjonalny komponent zewnętrzny do integracji z drukarkami fiskalnymi POSNET",
      currency: "PLN",
      locale: "pl_PL",
      region: "Polska"
    },
    ru: {
      name: "ModulSoft - Driver POSNET для 1С:Enterprise",
      description: "Профессиональная внешняя компонента для интеграции с фискальными регистраторами POSNET",
      currency: "RUB", 
      locale: "ru_RU",
      region: "Россия"
    }
  }
  
  const t = translations[language]
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "SoftwareApplication"],
        "@id": `${baseUrl}/#organization`,
        "name": t.name,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": ["Windows 7", "Windows 8", "Windows 10", "Windows 11", "Windows Server"],
        "softwareVersion": "2.0",
        "url": baseUrl,
        "description": t.description,
        "inLanguage": language,
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": t.currency,
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01",
          "priceValidUntil": "2025-12-31",
          "warranty": {
            "@type": "WarrantyPromise", 
            "durationOfWarranty": "P12M"
          }
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "вул. Святовасилівська 4/3",
          "addressLocality": "Луцьк",
          "addressRegion": "Волинська область", 
          "postalCode": "43025",
          "addressCountry": "UA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 50.7472,
          "longitude": 25.3254
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+380931776504",
            "contactType": "customer service",
            "email": "info@modulsoft.eu",
            "availableLanguage": ["Ukrainian", "Polish", "Russian"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+380931776502", 
            "contactType": "technical support",
            "availableLanguage": ["Ukrainian", "Polish", "Russian"]
          }
        ],
        "foundingDate": "2008",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 40
        },
        "areaServed": ["UA", "PL", "EU"],
        "knowsAbout": ["1C Enterprise", "Business Automation", "ERP Systems", "POS Systems", "Fiscal Printers"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "sameAs": [
          "https://www.facebook.com/ModulSoft",
          "https://www.linkedin.com/company/modulsoft",
          "https://t.me/modulsoft"
        ]
      }
    ]
  }
}

// Enhanced meta tags with comprehensive SEO optimization
export function updateMetaTags(language: 'uk' | 'pl' | 'ru', title: string, description: string) {
  if (typeof document !== 'undefined') {
    document.title = title
    document.documentElement.lang = language
    
    const translations = {
      uk: {
        keywords: "POSNET драйвер 1С, фіскальний реєстратор інтеграція, каса 1С, POS система України, модуль каси 1С, фіскальний принтер драйвер, POSNET компонента, ModulSoft 1С рішення",
        locale: "uk_UA",
        currency: "UAH"
      },
      pl: {
        keywords: "sterownik POSNET 1C, integracja kasy fiskalnej, kasa 1C, system POS Polska, moduł kasy 1C, sterownik drukarki fiskalnej, komponent POSNET, rozwiązania 1C ModulSoft",
        locale: "pl_PL", 
        currency: "PLN"
      },
      ru: {
        keywords: "драйвер POSNET 1С, интеграция фискального регистратора, касса 1С, POS система России, модуль кассы 1С, драйвер фискального принтера, компонента POSNET, решения 1С ModulSoft",
        locale: "ru_RU",
        currency: "RUB"
      }
    }
    
    const t = translations[language]
    
    const metaUpdates = [
      { selector: 'meta[name="description"]', attr: 'content', value: description },
      { selector: 'meta[name="keywords"]', attr: 'content', value: t.keywords },
      { selector: 'meta[property="og:title"]', attr: 'content', value: title },
      { selector: 'meta[property="og:description"]', attr: 'content', value: description },
      { selector: 'meta[property="og:locale"]', attr: 'content', value: t.locale },
      { selector: 'meta[property="twitter:title"]', attr: 'content', value: title },
      { selector: 'meta[property="twitter:description"]', attr: 'content', value: description },
      { selector: 'meta[property="product:price:currency"]', attr: 'content', value: t.currency }
    ]
    
    metaUpdates.forEach(({ selector, attr, value }) => {
      const meta = document.querySelector(selector)
      if (meta) {
        meta.setAttribute(attr, value)
      }
    })

    // Update canonical URL with language parameter
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonical) {
      const baseUrl = 'https://modulsoft.eu/driver-posnet-thermal'
      canonical.href = language === 'uk' ? baseUrl : `${baseUrl}/${language}`
    }
  }
}

// Optimized structured data injection with duplicate prevention
export function addStructuredData(data: any) {
  if (typeof document !== 'undefined') {
    // Remove existing dynamic structured data
    const existing = document.querySelectorAll('script[type="application/ld+json"][data-dynamic]')
    existing.forEach(script => script.remove())
    
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-dynamic', 'true')
    script.textContent = JSON.stringify(data, null, 0) // Minified JSON
    document.head.appendChild(script)
  }
}

// SEO-optimized sitemap generation for dynamic content
export function generateSitemapData() {
  const baseUrl = 'https://modulsoft.eu'
  const currentDate = new Date().toISOString().split('T')[0]
  
  return {
    urls: [
      {
        loc: `${baseUrl}/driver-posnet-thermal`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '1.0',
        alternates: [
          { hreflang: 'uk', href: `${baseUrl}/driver-posnet-thermal` },
          { hreflang: 'pl', href: `${baseUrl}/pl/driver-posnet-thermal` },
          { hreflang: 'ru', href: `${baseUrl}/ru/driver-posnet-thermal` }
        ]
      },
      {
        loc: `${baseUrl}/contacts`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        loc: `${baseUrl}/privacy-policy`,
        lastmod: currentDate,
        changefreq: 'yearly',
        priority: '0.3'
      }
    ]
  }
}

// Advanced analytics and conversion tracking
export function trackUserInteraction(action: string, category: string, label?: string) {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      custom_parameter: 'posnet_driver_landing'
    })
  }
  
  // Also track with custom analytics if available
  if (window.analytics) {
    window.analytics.track(action, {
      category,
      label,
      source: 'posnet_driver_landing'
    })
  }
}

// SEO health check and monitoring
export function performSEOHealthCheck() {
  if (typeof document !== 'undefined') {
    const checks = {
      hasTitle: !!document.title,
      hasDescription: !!document.querySelector('meta[name="description"]'),
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasStructuredData: !!document.querySelector('script[type="application/ld+json"]'),
      hasOpenGraph: !!document.querySelector('meta[property^="og:"]'),
      hasTwitterCard: !!document.querySelector('meta[property^="twitter:"]'),
      hasHreflang: !!document.querySelector('link[hreflang]'),
      imagesHaveAlt: Array.from(document.querySelectorAll('img')).every(img => 
        img.hasAttribute('alt') && (img as HTMLImageElement).alt.trim().length > 0
      )
    }
    
    console.debug('SEO Health Check:', checks)
    
    const score = Object.values(checks).filter(Boolean).length / Object.keys(checks).length * 100
    console.debug(`SEO Score: ${Math.round(score)}%`)
    
    return { checks, score }
  }
  
  return null
}