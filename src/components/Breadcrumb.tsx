import { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { t } = useTranslation()

  useEffect(() => {
    // Add breadcrumb structured data
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.href
      }))
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-breadcrumb', 'true')
    script.textContent = JSON.stringify(breadcrumbData)
    document.head.appendChild(script)

    return () => {
      const existing = document.querySelector('script[data-breadcrumb]')
      if (existing) {
        existing.remove()
      }
    }
  }, [items])

  return (
    <nav aria-label={t('breadcrumb.navigation')} className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-muted-foreground/60" aria-hidden="true">
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.name}
              </span>
            ) : (
              <a
                href={item.href}
                className="hover:text-primary transition-colors duration-200"
                itemProp="item"
              >
                <span itemProp="name">{item.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}