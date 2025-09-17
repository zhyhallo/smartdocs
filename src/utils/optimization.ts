/**
 * SEO and Performance Optimization Utilities
 */

// Create structured data for SEO
export function createStructuredData(language: 'uk' | 'pl' | 'ru' = 'uk') {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ModulSoft",
    "url": "https://modulsoft.eu",
    "logo": "https://modulsoft.eu/logo.png",
    "description": language === 'uk' 
      ? "Розробка та впровадження програмного забезпечення для бізнесу"
      : language === 'pl'
      ? "Rozwój i wdrażanie oprogramowania dla biznesu" 
      : "Разработка и внедрение программного обеспечения для бизнеса",
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

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Driver POSNET / Thermal для 1С:Enterprise",
    "description": language === 'uk'
      ? "Професійна зовнішня компонента для інтеграції з фіскальними реєстраторами POSNET / Thermal"
      : language === 'pl'
      ? "Profesjonalny komponent zewnętrzny do integracji z drukarkami fiskalnymi POSNET / Thermal"
      : "Профессиональная внешняя компонента для интеграции с фискальными регистраторами POSNET / Thermal",
    "offers": {
      "@type": "Offer",
      "price": language === 'ru' ? "1500" : "1500",
      "priceCurrency": language === 'pl' ? "PLN" : language === 'ru' ? "RUB" : "UAH",
      "availability": "https://schema.org/InStock"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "ModulSoft"
    }
  }

  return { organizationData, productData }
}

// Performance monitoring
export function measureWebVitals() {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log Core Web Vitals
        if (entry.entryType === 'measure') {
          console.log(`${entry.name}: ${entry.duration}ms`)
        }
      }
    })
    
    observer.observe({ entryTypes: ['measure'] })
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.as = 'font'
    fontLink.type = 'font/woff2'
    fontLink.crossOrigin = 'anonymous'
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
    document.head.appendChild(fontLink)
    
    // Preload critical images (when they exist)
    const criticalImages = [
      '/owl-mascot.svg',
      '/modulsoft-logo.svg'
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }
}

// Optimize images with lazy loading
export function optimizeImages() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || img.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }
}

// Update meta tags for each language
export function updateMetaTags(language: 'uk' | 'pl' | 'ru', title: string, description: string) {
  if (typeof document !== 'undefined') {
    // Update title
    document.title = title
    
    // Update meta description
    let descMeta = document.querySelector('meta[name="description"]')
    if (!descMeta) {
      descMeta = document.createElement('meta')
      descMeta.setAttribute('name', 'description')
      document.head.appendChild(descMeta)
    }
    descMeta.setAttribute('content', description)
    
    // Update language
    document.documentElement.lang = language
    
    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:locale', content: language === 'uk' ? 'uk_UA' : language === 'pl' ? 'pl_PL' : 'ru_RU' }
    ]
    
    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    })
  }
}

// Add structured data to head
export function addStructuredData(data: any) {
  if (typeof document !== 'undefined') {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}

// Optimize CSS loading
export function optimizeCSSLoading() {
  if (typeof document !== 'undefined') {
    // Use requestIdleCallback for non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="preload"][as="style"]')
    
    function loadCSS(link: HTMLLinkElement) {
      link.rel = 'stylesheet'
    }
    
    if ('requestIdleCallback' in window) {
      nonCriticalCSS.forEach(link => {
        requestIdleCallback(() => loadCSS(link as HTMLLinkElement))
      })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        nonCriticalCSS.forEach(link => loadCSS(link as HTMLLinkElement))
      }, 100)
    }
  }
}