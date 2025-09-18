import { memo } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

interface SEOContentProps {
  children: React.ReactNode
  className?: string
  itemScope?: boolean
  itemType?: string
  itemProp?: string
  'aria-label'?: string
  role?: string
}

// SEO-optimized content wrapper with semantic HTML
const SEOContent = memo(function SEOContent({
  children,
  className = '',
  itemScope,
  itemType,
  itemProp,
  'aria-label': ariaLabel,
  role,
  ...props
}: SEOContentProps) {
  return (
    <div
      className={className}
      itemScope={itemScope}
      itemType={itemType}
      itemProp={itemProp}
      aria-label={ariaLabel}
      role={role}
      {...props}
    >
      {children}
    </div>
  )
})

// SEO-optimized heading component
interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  itemProp?: string
  id?: string
}

const SEOHeading = memo(function SEOHeading({ 
  level, 
  children, 
  className = '', 
  itemProp,
  id,
  ...props 
}: SEOHeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  return (
    <Tag
      className={className}
      itemProp={itemProp}
      id={id}
      {...props}
    >
      {children}
    </Tag>
  )
})

// SEO-optimized image component with lazy loading and proper alt tags
interface SEOImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  itemProp?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
}

const SEOImage = memo(function SEOImage({
  src,
  alt,
  className = '',
  width,
  height,
  itemProp,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  ...props
}: SEOImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      itemProp={itemProp}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...props}
    />
  )
})

// SEO-optimized text block with structured data
interface SEOTextProps {
  children: React.ReactNode
  className?: string
  itemProp?: string
  tag?: 'p' | 'span' | 'div'
}

const SEOText = memo(function SEOText({
  children,
  className = '',
  itemProp,
  tag: Tag = 'p',
  ...props
}: SEOTextProps) {
  return (
    <Tag
      className={className}
      itemProp={itemProp}
      {...props}
    >
      {children}
    </Tag>
  )
})

// SEO-optimized list component
interface SEOListProps {
  children: React.ReactNode
  className?: string
  itemScope?: boolean
  itemType?: string
  ordered?: boolean
}

const SEOList = memo(function SEOList({
  children,
  className = '',
  itemScope,
  itemType,
  ordered = false,
  ...props
}: SEOListProps) {
  const Tag = ordered ? 'ol' : 'ul'
  
  return (
    <Tag
      className={className}
      itemScope={itemScope}
      itemType={itemType}
      {...props}
    >
      {children}
    </Tag>
  )
})

// SEO-optimized list item
interface SEOListItemProps {
  children: React.ReactNode
  className?: string
  itemProp?: string
  itemScope?: boolean
  itemType?: string
}

const SEOListItem = memo(function SEOListItem({
  children,
  className = '',
  itemProp,
  itemScope,
  itemType,
  ...props
}: SEOListItemProps) {
  return (
    <li
      className={className}
      itemProp={itemProp}
      itemScope={itemScope}
      itemType={itemType}
      {...props}
    >
      {children}
    </li>
  )
})

// FAQ structured data component
interface FAQItem {
  question: string
  answer: string
}

interface SEOFAQProps {
  faqs: FAQItem[]
  className?: string
}

const SEOFAQ = memo(function SEOFAQ({ faqs, className = '' }: SEOFAQProps) {
  const { t } = useTranslation()

  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <section 
      className={className}
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      {faqs.map((faq, index) => (
        <div
          key={index}
          itemScope
          itemType="https://schema.org/Question"
          className="mb-4"
        >
          <h3 itemProp="name" className="font-semibold mb-2">
            {faq.question}
          </h3>
          <div itemScope itemType="https://schema.org/Answer">
            <div itemProp="text" className="text-muted-foreground">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
})

export {
  SEOContent,
  SEOHeading,
  SEOImage,
  SEOText,
  SEOList,
  SEOListItem,
  SEOFAQ
}

export default SEOContent