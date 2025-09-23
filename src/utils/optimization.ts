/**
 * Advanced SEO and Performance Optimization Utilities
 * Enhanced for multilingual support and maximum search visibility
 */

// Type definitions for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    analytics?: {
      track: (event: string, properties?: any) => void
    }
    // Yandex.Metrica support
    ym?: (id: number, action: string, target?: string, options?: any) => void
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

// Enhanced Web Vitals monitoring with detailed metrics and reporting
export function measureWebVitals() {
  if (typeof window !== 'undefined') {
    // Core Web Vitals monitoring with enhanced error handling
    if ('PerformanceObserver' in window) {
      try {
        // LCP (Largest Contentful Paint) - Critical for SEO
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          const lcpValue = Math.round(lastEntry.startTime)
          
          console.debug(`LCP: ${lcpValue}ms`)
          
          // Send to multiple analytics platforms
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: lcpValue,
              event_category: 'Performance',
              custom_parameters: {
                page_type: 'landing_page',
                content_type: 'product_page'
              }
            })
          }

          // Yandex.Metrica tracking for Russian markets
          if (window.ym) {
            window.ym(89645123, 'reachGoal', 'LCP_MEASURED', { value: lcpValue })
          }
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // FID (First Input Delay) - User interaction responsiveness
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

        // CLS (Cumulative Layout Shift) - Visual stability
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

        // FCP (First Contentful Paint) - Initial content rendering
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              const fcpValue = Math.round(entry.startTime)
              console.debug(`FCP: ${fcpValue}ms`)
              
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  name: 'FCP',
                  value: fcpValue,
                  event_category: 'Performance',
                  custom_parameters: {
                    critical_resource: 'above_fold_content'
                  }
                })
              }
            }
          })
        })
        fcpObserver.observe({ type: 'paint', buffered: true })

        // TTFB (Time To First Byte) - Server response time
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
        if (navigationEntries.length > 0) {
          const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart
          console.debug(`TTFB: ${Math.round(ttfb)}ms`)
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'TTFB',
              value: Math.round(ttfb),
              event_category: 'Performance'
            })
          }
        }

      } catch (error) {
        console.debug('Performance monitoring setup failed:', error)
      }
    }

    // Connection quality detection for adaptive loading
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      const networkInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      }
      
      console.debug(`Network: ${networkInfo.effectiveType} (${networkInfo.downlink}Mbps, RTT: ${networkInfo.rtt}ms)`)
      
      // Adjust resource loading based on connection
      if (networkInfo.saveData || networkInfo.effectiveType === 'slow-2g') {
        document.documentElement.classList.add('low-bandwidth')
      }
    }
  }
}

// Enhanced resource preloading with intelligent prioritization, multilingual assets, and mobile optimization
export function preloadCriticalResources() {
  if (typeof document !== 'undefined') {
    const existingPreloads = new Set(
      Array.from(document.querySelectorAll('link[rel="preload"]'))
        .map(link => (link as HTMLLinkElement).href)
    )
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768
    const isLowBandwidth = 'connection' in navigator && 
      ((navigator as any).connection?.saveData || 
       (navigator as any).connection?.effectiveType === 'slow-2g' || 
       (navigator as any).connection?.effectiveType === '2g')
    
    // Critical font preloading for multilingual support (reduced on mobile/low bandwidth)
    const criticalFonts = [
      {
        href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
        as: 'font',
        type: 'font/woff2'
      }
    ]
    
    // Only preload fonts if not on slow connection
    if (!isLowBandwidth) {
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
    }

    // Preload critical above-the-fold images based on viewport and device type
    const heroImages = document.querySelectorAll('.hero-section img, .owl-mascot svg')
    let imagesToPreload = isMobile ? 1 : 2 // Fewer images on mobile
    
    heroImages.forEach((img, index) => {
      if (index >= imagesToPreload) return
      
      const element = img as HTMLImageElement | SVGElement
      const src = 'src' in element ? element.src : element.getAttribute('data-src')
      
      if (src && !existingPreloads.has(src) && !isLowBandwidth) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      }
    })

    // Preload critical API endpoints only on good connections
    if (!isLowBandwidth) {
      const criticalEndpoints = [
        'https://api.modulsoft.eu/contact'
      ]

      criticalEndpoints.forEach(endpoint => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = endpoint
        document.head.appendChild(link)
      })
    }

    // DNS prefetch for external domains (lightweight even on slow connections)
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com'
    ]

    externalDomains.forEach(domain => {
      if (!document.querySelector(`link[href*="${domain}"]`)) {
        const link = document.createElement('link')
        link.rel = 'dns-prefetch'
        link.href = `//${domain}`
        document.head.appendChild(link)
      }
    })
  }
}

// Enhanced structured data with comprehensive multilingual SEO information
export function createStructuredData(language: 'uk' | 'pl' | 'ru' = 'uk') {
  const baseUrl = 'https://modulsoft.eu'
  
  const translations = {
    uk: {
      name: "ModulSoft - Driver POSNET для 1С:Enterprise",
      description: "Професійна зовнішня компонента для інтеграції з фіскальними реєстраторами POSNET. Надійність, стабільність та професійна техпідтримка.",
      currency: "PLN",
      locale: "uk_UA",
      region: "Україна",
      address: "м. Луцьк, вул. Святовасилівська 4/3",
      keywords: ["POSNET", "1С:Enterprise", "фіскальний реєстратор", "інтеграція", "драйвер"]
    },
    pl: {
      name: "ModulSoft - Driver POSNET dla 1C:Enterprise", 
      description: "Gotowy komponent zewnętrzny do integracji z drukarkami fiskalnymi POSNET. Niezawodność, stabilność i profesjonalne wsparcie techniczne.",
      currency: "PLN",
      locale: "pl_PL",
      region: "Polska",
      address: "82-200 Malbork, ul. Łąkowa 15C",
      keywords: ["POSNET", "1C:Enterprise", "drukarka fiskalna", "integracja", "sterownik"]
    },
    ru: {
      name: "ModulSoft - Driver POSNET для 1С:Enterprise",
      description: "Готовая внешняя компонента для интеграции с фискальными регистраторами POSNET. Надежность, стабильность и профессиональная техподдержка.",
      currency: "PLN", 
      locale: "ru_RU",
      region: "Россия",
      address: "г. Луцк, ул. Святовасильевская 4/3",
      keywords: ["POSNET", "1С:Enterprise", "фискальный регистратор", "интеграция", "драйвер"]
    }
  }
  
  const t = translations[language]
  const currentDate = new Date().toISOString().split('T')[0]
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "SoftwareApplication", "LocalBusiness"],
        "@id": `${baseUrl}/#organization-${language}`,
        "name": t.name,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": ["Windows 7", "Windows 8", "Windows 10", "Windows 11", "Windows Server"],
        "softwareVersion": "2.0",
        "url": baseUrl,
        "description": t.description,
        "inLanguage": language,
        "datePublished": "2024-01-01",
        "dateModified": currentDate,
        "keywords": t.keywords.join(', '),
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": t.currency,
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01",
          "priceValidUntil": "2025-12-31",
          "warranty": {
            "@type": "WarrantyPromise", 
            "durationOfWarranty": "P12M",
            "warrantyScope": "Technical support and updates"
          },
          "businessFunction": "http://purl.org/goodrelations/v1#Sell",
          "deliveryMethod": "OnlineOnly",
          "acceptedPaymentMethod": [
            "http://purl.org/goodrelations/v1#BankTransferInAdvance",
            "http://purl.org/goodrelations/v1#PayPal"
          ]
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
            "availableLanguage": ["Ukrainian", "Polish", "Russian"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "17:00"
            }
          }
        ],
        "foundingDate": "2008",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 40,
          "maxValue": 50
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "Ukraine",
            "identifier": "UA"
          },
          {
            "@type": "Country",
            "name": "Poland", 
            "identifier": "PL"
          },
          {
            "@type": "Country",
            "name": "European Union",
            "identifier": "EU"
          }
        ],
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
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "1C Certification",
            "recognizedBy": {
              "@type": "Organization",
              "name": "1C Company"
            }
          }
        ]
      }
    ]
  }
}

// Enhanced meta tags with comprehensive multilingual SEO optimization
export function updateMetaTags(language: 'uk' | 'pl' | 'ru', title: string, description: string) {
  if (typeof document !== 'undefined') {
    document.title = title
    document.documentElement.lang = language
    
    const translations = {
      uk: {
        keywords: "POSNET драйвер 1С, фіскальний реєстратор інтеграція, каса 1С, POS система України, модуль каси 1С, фіскальний принтер драйвер, POSNET компонента, ModulSoft 1С рішення, автоматизація торгівлі",
        locale: "uk_UA",
        currency: "PLN",
        region: "Ukraine"
      },
      pl: {
        keywords: "sterownik POSNET 1C, integracja kasy fiskalnej, kasa 1C, system POS Polska, moduł kasy 1C, sterownik drukarki fiskalnej, komponent POSNET, rozwiązania 1C ModulSoft, automatyzacja handlu",
        locale: "pl_PL", 
        currency: "PLN",
        region: "Poland"
      },
      ru: {
        keywords: "драйвер POSNET 1С, интеграция фискального регистратора, касса 1С, POS система России, модуль кассы 1С, драйвер фискального принтера, компонента POSNET, решения 1С ModulSoft, автоматизация торговли",
        locale: "ru_RU",
        currency: "PLN",
        region: "Russia"
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
      { selector: 'meta[property="product:price:currency"]', attr: 'content', value: t.currency },
      { selector: 'meta[name="geo.region"]', attr: 'content', value: t.region }
    ]
    
    metaUpdates.forEach(({ selector, attr, value }) => {
      const meta = document.querySelector(selector)
      if (meta) {
        meta.setAttribute(attr, value)
      } else {
        // Create missing meta tags
        const newMeta = document.createElement('meta')
        if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1]
          if (property) {
            newMeta.setAttribute('property', property)
            newMeta.setAttribute('content', value)
            document.head.appendChild(newMeta)
          }
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1]
          if (name) {
            newMeta.setAttribute('name', name)
            newMeta.setAttribute('content', value)
            document.head.appendChild(newMeta)
          }
        }
      }
    })

    // Update canonical URL with language parameter
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonical) {
      const baseUrl = 'https://modulsoft.eu/driver-posnet-thermal'
      canonical.href = language === 'uk' ? baseUrl : `${baseUrl}/${language}`
    }

    // Update hreflang links dynamically
    const hreflangLinks = document.querySelectorAll('link[hreflang]')
    hreflangLinks.forEach(link => {
      const hreflang = link.getAttribute('hreflang')
      if (hreflang === language) {
        ;(link as HTMLLinkElement).href = window.location.href
      }
    })
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

// Enhanced analytics and conversion tracking with multilingual support
export function trackUserInteraction(action: string, category: string, label?: string) {
  const language = document.documentElement.lang || 'uk'
  
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      custom_parameters: {
        page_language: language,
        product_type: 'posnet_driver',
        source: 'landing_page'
      }
    })
  }
  
  // Yandex.Metrica for Russian market
  if (window.ym && language === 'ru') {
    window.ym(89645123, 'reachGoal', `${action}_${category}`, { 
      label,
      language 
    })
  }
  
  // Custom analytics
  if (window.analytics) {
    window.analytics.track(action, {
      category,
      label,
      language,
      source: 'posnet_driver_landing'
    })
  }
}

// Comprehensive SEO health check with multilingual considerations
export function performSEOHealthCheck() {
  if (typeof document !== 'undefined') {
    const language = document.documentElement.lang || 'uk'
    
    const checks = {
      hasTitle: !!document.title && document.title.length >= 30 && document.title.length <= 60,
      hasDescription: (() => {
        const desc = document.querySelector('meta[name="description"]')?.getAttribute('content')
        return !!desc && desc.length >= 120 && desc.length <= 160
      })(),
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasStructuredData: !!document.querySelector('script[type="application/ld+json"]'),
      hasOpenGraph: !!document.querySelector('meta[property^="og:"]'),
      hasTwitterCard: !!document.querySelector('meta[property^="twitter:"]'),
      hasHreflang: !!document.querySelector('link[hreflang]'),
      hasLanguageAttribute: document.documentElement.lang === language,
      imagesHaveAlt: Array.from(document.querySelectorAll('img')).every(img => 
        img.hasAttribute('alt') && (img as HTMLImageElement).alt.trim().length > 0
      ),
      hasRobotsMeta: !!document.querySelector('meta[name="robots"]'),
      hasViewportMeta: !!document.querySelector('meta[name="viewport"]'),
      hasKeywords: (() => {
        const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')
        return !!keywords && keywords.length > 0
      })(),
      linksAreAccessible: Array.from(document.querySelectorAll('a')).every(link => 
        link.hasAttribute('href') && link.textContent?.trim().length
      ),
      headingsHierarchy: (() => {
        const h1Count = document.querySelectorAll('h1').length
        return h1Count === 1
      })(),
      hasContactInfo: !!document.querySelector('[itemtype*="contactPoint"], [href^="tel:"], [href^="mailto:"]')
    }
    
    console.debug('SEO Health Check:', checks)
    
    const score = Object.values(checks).filter(Boolean).length / Object.keys(checks).length * 100
    
    const recommendations: string[] = []
    if (!checks.hasTitle) recommendations.push('Title tag missing or incorrect length (30-60 chars)')
    if (!checks.hasDescription) recommendations.push('Meta description missing or incorrect length (120-160 chars)')
    if (!checks.hasStructuredData) recommendations.push('Add structured data (JSON-LD)')
    if (!checks.hasHreflang) recommendations.push('Add hreflang tags for multilingual SEO')
    if (!checks.imagesHaveAlt) recommendations.push('All images need alt attributes')
    if (!checks.headingsHierarchy) recommendations.push('Use exactly one H1 tag per page')
    
    console.debug(`SEO Score: ${Math.round(score)}%`)
    if (recommendations.length > 0) {
      console.debug('SEO Recommendations:', recommendations)
    }
    
    return { 
      checks, 
      score, 
      recommendations,
      language
    }
  }
  
  return null
}

// Enhanced image optimization with WebP and lazy loading, mobile-specific optimizations
export function optimizeImages() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    // WebP support detection
    const supportsWebP = (() => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      return canvas.toDataURL('image/webp').startsWith('data:image/webp')
    })()

    // Mobile detection for different optimization strategies
    const isMobile = window.innerWidth <= 768
    const isLowBandwidth = 'connection' in navigator && 
      ((navigator as any).connection?.effectiveType === 'slow-2g' || 
       (navigator as any).connection?.effectiveType === '2g')

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            
            // Handle data-src lazy loading
            if (img.dataset.src && !img.src.includes(img.dataset.src)) {
              let src = img.dataset.src
              
              // Use smaller images on mobile/low bandwidth
              if (isMobile || isLowBandwidth) {
                src = src.replace(/@2x\./g, '.')
                src = src.replace(/_large\./g, '_medium.')
              }
              
              // Replace with WebP if supported
              if (supportsWebP && src.match(/\.(jpg|jpeg|png)$/i)) {
                src = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
              }
              
              img.src = src
              img.classList.remove('lazy')
            }
            
            // Handle srcset for responsive images
            if (img.dataset.srcset) {
              let srcset = img.dataset.srcset
              
              // Replace with WebP versions in srcset
              if (supportsWebP) {
                srcset = srcset.replace(/\.(jpg|jpeg|png)(\s+\d+[wx])/gi, '.webp$2')
              }
              
              img.srcset = srcset
              delete img.dataset.srcset
            }
            
            // Add loaded class for fade-in effects
            img.classList.add('loaded')
            observer.unobserve(img)
          }
        })
      },
      {
        rootMargin: isMobile ? '100px 0px' : '50px 0px', // Larger margin on mobile for smoother scrolling
        threshold: 0.01
      }
    )
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src], img[data-srcset], .lazy-image').forEach(img => {
      imageObserver.observe(img)
    })

    // Mobile-specific image optimizations
    if (isMobile) {
      // Preload critical above-the-fold images
      const criticalImages = document.querySelectorAll('.hero-section img, .owl-mascot')
      criticalImages.forEach((img, index) => {
        if (index < 2) { // Only preload first 2 critical images on mobile
          const element = img as HTMLImageElement
          if (element.dataset.src && !element.src) {
            element.src = element.dataset.src
          }
        }
      })
    }
  }
}

// Advanced sitemap generation with multilingual support
export function generateSitemapData() {
  const baseUrl = 'https://modulsoft.eu'
  const currentDate = new Date().toISOString().split('T')[0]
  
  return {
    urls: [
      // Main product pages
      {
        loc: `${baseUrl}/driver-posnet-thermal`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '1.0',
        alternates: [
          { hreflang: 'uk', href: `${baseUrl}/driver-posnet-thermal` },
          { hreflang: 'pl', href: `${baseUrl}/pl/driver-posnet-thermal` },
          { hreflang: 'ru', href: `${baseUrl}/ru/driver-posnet-thermal` },
          { hreflang: 'x-default', href: `${baseUrl}/driver-posnet-thermal` }
        ]
      },
      // Contact pages
      {
        loc: `${baseUrl}/contacts`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.8',
        alternates: [
          { hreflang: 'uk', href: `${baseUrl}/contacts` },
          { hreflang: 'pl', href: `${baseUrl}/pl/kontakt` },
          { hreflang: 'ru', href: `${baseUrl}/ru/kontakty` }
        ]
      },
      // Legal pages
      {
        loc: `${baseUrl}/privacy-policy`,
        lastmod: currentDate,
        changefreq: 'yearly',
        priority: '0.3',
        alternates: [
          { hreflang: 'uk', href: `${baseUrl}/privacy-policy` },
          { hreflang: 'pl', href: `${baseUrl}/pl/polityka-prywatnosci` },
          { hreflang: 'ru', href: `${baseUrl}/ru/politika-konfidencialnosti` }
        ]
      }
    ]
  }
}