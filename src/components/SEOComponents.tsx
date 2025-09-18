import { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

// Component for dynamic meta tag management
export function DynamicMetaTags() {
  const { language, t } = useTranslation()

  useEffect(() => {
    // Update page-specific meta tags based on current language
    const metaUpdates = [
      {
        name: 'description',
        content: t('meta.description')
      },
      {
        name: 'keywords', 
        content: language === 'uk' 
          ? "POSNET драйвер 1С, фіскальний реєстратор інтеграція, каса 1С, POS система України, модуль каси 1С"
          : language === 'pl'
          ? "sterownik POSNET 1C, integracja kasy fiskalnej, kasa 1C, system POS Polska, moduł kasy 1C"
          : "драйвер POSNET 1С, интеграция фискального регистратора, касса 1С, POS система России"
      },
      {
        property: 'og:title',
        content: t('meta.title')
      },
      {
        property: 'og:description',
        content: t('meta.description')
      },
      {
        property: 'og:locale',
        content: language === 'uk' ? 'uk_UA' : language === 'pl' ? 'pl_PL' : 'ru_RU'
      }
    ]

    metaUpdates.forEach(({ name, property, content }) => {
      let meta = document.querySelector(
        name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      )
      
      if (meta) {
        meta.setAttribute('content', content)
      } else {
        meta = document.createElement('meta')
        if (name) meta.setAttribute('name', name)
        if (property) meta.setAttribute('property', property)
        meta.setAttribute('content', content)
        document.head.appendChild(meta)
      }
    })

    // Update document title
    document.title = t('meta.title')
    
    // Update HTML lang attribute
    document.documentElement.lang = language
    
  }, [language, t])

  return null
}

// Schema.org Breadcrumb component
export function BreadcrumbSchema() {
  const { language, t } = useTranslation()

  useEffect(() => {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": t('breadcrumb.home'),
          "item": "https://modulsoft.eu"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": t('breadcrumb.products'),
          "item": "https://modulsoft.eu/products"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": t('breadcrumb.posnet_driver'),
          "item": `https://modulsoft.eu/driver-posnet-thermal${language !== 'uk' ? `/${language}` : ''}`
        }
      ]
    }

    // Remove existing breadcrumb schema
    const existing = document.querySelector('script[type="application/ld+json"][data-breadcrumb]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-breadcrumb', 'true')
    script.textContent = JSON.stringify(breadcrumbData)
    document.head.appendChild(script)

  }, [language, t])

  return null
}

// Enhanced Product Schema with Reviews
export function ProductSchema() {
  const { language, t } = useTranslation()

  useEffect(() => {
    const productData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Driver POSNET для 1С:Enterprise",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": [
        "Windows 7", "Windows 8", "Windows 10", 
        "Windows 11", "Windows Server 2016", 
        "Windows Server 2019", "Windows Server 2022"
      ],
      "softwareVersion": "2.0",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "ModulSoft",
        "url": "https://modulsoft.eu"
      },
      "publisher": {
        "@type": "Organization", 
        "name": "ModulSoft",
        "logo": {
          "@type": "ImageObject",
          "url": "https://modulsoft.eu/logo.png"
        }
      },
      "description": t('product.description'),
      "inLanguage": language,
      "offers": {
        "@type": "Offer",
        "price": "1500",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01",
        "priceValidUntil": "2025-12-31",
        "seller": {
          "@type": "Organization",
          "name": "ModulSoft"
        },
        "warranty": {
          "@type": "WarrantyPromise",
          "durationOfWarranty": "P12M"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": language === 'uk' ? "Олександр К." : language === 'pl' ? "Aleksander K." : "Александр К."
          },
          "reviewBody": language === 'uk' 
            ? "Відмінний продукт! Швидка інтеграція, стабільна робота. Рекомендую!"
            : language === 'pl'
            ? "Doskonały produkt! Szybka integracja, stabilna praca. Polecam!"
            : "Отличный продукт! Быстрая интеграция, стабильная работа. Рекомендую!",
          "datePublished": "2024-11-01"
        }
      ],
      "softwareRequirements": "1С:Enterprise 8.3+, Windows 7+, .NET Framework 4.5+",
      "memoryRequirements": "512 MB RAM",
      "storageRequirements": "100 MB",
      "featureList": [
        t('features.sales.title'),
        t('features.reports.title'), 
        t('features.status.title'),
        t('features.errors.title'),
        t('features.config.title'),
        t('features.backup.title')
      ]
    }

    // Remove existing product schema
    const existing = document.querySelector('script[type="application/ld+json"][data-product]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-product', 'true')
    script.textContent = JSON.stringify(productData)
    document.head.appendChild(script)

  }, [language, t])

  return null
}

// FAQ Schema component
export function FAQSchema() {
  const { language, t } = useTranslation()

  useEffect(() => {
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('faq.q1'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.a1')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.q2'),
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": t('faq.a2')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.q4'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.a4')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.q6'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.a6')
          }
        }
      ]
    }

    // Remove existing FAQ schema
    const existing = document.querySelector('script[type="application/ld+json"][data-faq]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-faq', 'true')
    script.textContent = JSON.stringify(faqData)
    document.head.appendChild(script)

  }, [language, t])

  return null
}

// Local Business Schema
export function LocalBusinessSchema() {
  const { language, t } = useTranslation()

  useEffect(() => {
    const businessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ModulSoft",
      "image": "https://modulsoft.eu/office-photo.jpg",
      "description": language === 'uk'
        ? "Експерти з автоматизації бізнесу. Розробка та впровадження рішень на базі 1С:Enterprise."
        : language === 'pl' 
        ? "Eksperci w automatyzacji biznesu. Rozwój i wdrażanie rozwiązań opartych na 1C:Enterprise."
        : "Эксперты по автоматизации бизнеса. Разработка и внедрение решений на базе 1С:Enterprise.",
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
      "url": "https://modulsoft.eu",
      "telephone": "+380931776504",
      "email": "info@modulsoft.eu",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "priceRange": "zł zł zł",
      "foundingDate": "2008",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      },
      "areaServed": ["Ukraine", "Poland", "European Union"],
      "knowsAbout": [
        "1С:Enterprise automation",
        "POSNET fiscal printer integration",
        "Business process optimization"
      ]
    }

    // Remove existing business schema
    const existing = document.querySelector('script[type="application/ld+json"][data-business]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-business', 'true')
    script.textContent = JSON.stringify(businessData)
    document.head.appendChild(script)

  }, [language, t])

  return null
}

// Aggregate all SEO components
export function SEOSchemas() {
  return (
    <>
      <DynamicMetaTags />
      <BreadcrumbSchema />
      <ProductSchema />
      <FAQSchema />
      <LocalBusinessSchema />
    </>
  )
}