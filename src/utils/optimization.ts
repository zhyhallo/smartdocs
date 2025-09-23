// Performance optimization utilities
export interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  entries: PerformanceEntry[];
  id: string;
  isFinal: boolean;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Measure Web Vitals for performance monitoring
export function measureWebVitals() {
  if (typeof window !== 'undefined') {
    // Core Web Vitals measurement
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`Performance: ${entry.name}`, entry);
        
        // Log to analytics if available
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: entry.name,
            value: Math.round(entry.startTime)
          });
        }
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] });
  }
}

// SEO Utilities
export function updateMetaTags(title: string, description: string, lang = 'uk') {
  if (typeof document !== 'undefined') {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    const htmlLang = document.documentElement;
    htmlLang.setAttribute('lang', lang);
  }
}

export function createStructuredData(type: string, data: any) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
}

export function addStructuredData(data: any) {
  if (typeof document !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

export function performSEOHealthCheck() {
  if (typeof document !== 'undefined') {
    const issues: string[] = [];
    
    // Check for title
    if (!document.title || document.title.length < 30) {
      issues.push('Title is too short');
    }
    
    // Check for meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc || !metaDesc.getAttribute('content')) {
      issues.push('Missing meta description');
    }
    
    // Check for h1 tags
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length === 0) {
      issues.push('No H1 tag found');
    } else if (h1Tags.length > 1) {
      issues.push('Multiple H1 tags found');
    }
    
    console.log('SEO Health Check:', issues.length === 0 ? 'All good!' : issues);
  }
}

export function trackUserInteraction(action: string, category = 'User Interaction') {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: window.location.pathname
    });
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
    
    // Preload critical images with IntersectionObserver
    const criticalImages = document.querySelectorAll('img[data-priority="high"]');
    criticalImages.forEach((img) => {
      if (img instanceof HTMLImageElement && img.dataset.src) {
        img.src = img.dataset.src;
        img.loading = 'eager';
      }
    });
  }
}

// Optimize images with lazy loading and WebP support
export function optimizeImages() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Load WebP if supported, fallback to original
          if (img.dataset.src) {
            const webpSrc = img.dataset.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            
            // Test WebP support
            const webp = new Image();
            webp.onload = () => {
              img.src = webpSrc;
              img.classList.add('loaded');
            };
            webp.onerror = () => {
              img.src = img.dataset.src!;
              img.classList.add('loaded');
            };
            
            // Add fade-in effect
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            webp.src = webpSrc;
            
            // Add loaded class after image loads
            img.onload = () => {
              img.style.opacity = '1';
            };
            
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Bundle optimization for dynamic imports
export function optimizeBundle() {
  // Enable modern JS features detection
  if (typeof window !== 'undefined') {
    const modernBrowser = (
      'noModule' in HTMLScriptElement.prototype &&
      'fetch' in window &&
      'CSS' in window && 
      CSS.supports?.('color', 'var(--primary)')
    );
    
    if (modernBrowser) {
      document.documentElement.classList.add('modern-browser');
    } else {
      document.documentElement.classList.add('legacy-browser');
      // Load polyfills only for legacy browsers
      console.warn('Legacy browser detected - consider loading polyfills');
    }
  }
}

// Memory optimization - cleanup functions
export function cleanupResources() {
  if (typeof window !== 'undefined') {
    // Clean up observers
    const observers = (window as any)._observers || [];
    observers.forEach((observer: any) => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
    (window as any)._observers = [];
    
    // Clean up event listeners
    const eventListeners = (window as any)._eventListeners || [];
    eventListeners.forEach(({ element, event, handler }: any) => {
      element.removeEventListener(event, handler);
    });
    (window as any)._eventListeners = [];
  }
}

// Performance-optimized scroll handler
export function createOptimizedScrollHandler(callback: () => void) {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
}

// Component-specific optimizations
export function optimizeComponent(componentName: string) {
  console.log(`Optimizing component: ${componentName}`);
  
  // Component-specific performance hints
  const optimizations = {
    'Hero': () => {
      // Preload hero images and animations
      const heroImages = document.querySelectorAll('.hero-section img');
      heroImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'eager';
          img.decoding = 'sync';
        }
      });
    },
    'Features': () => {
      // Lazy load feature icons
      const featureIcons = document.querySelectorAll('.feature-card svg');
      featureIcons.forEach(icon => {
        icon.setAttribute('loading', 'lazy');
      });
    },
    'ContactModal': () => {
      // Optimize modal rendering
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
      }
    }
  };
  
  const optimize = optimizations[componentName as keyof typeof optimizations];
  if (optimize) {
    setTimeout(optimize, 100); // Defer optimization
  }
}

// Device-specific optimizations
export function applyDeviceOptimizations() {
  if (typeof window === 'undefined') return;
  
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  const isTouch = 'ontouchstart' in window;
  
  // Apply device-specific optimizations
  if (isMobile) {
    document.documentElement.classList.add('mobile-device');
    
    // Reduce animations on mobile for better performance
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .reduce-motion * {
          animation-duration: 0.2s !important;
          transition-duration: 0.2s !important;
        }
        .parallax-element {
          transform: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  if (isTablet) {
    document.documentElement.classList.add('tablet-device');
  }
  
  if (isTouch) {
    document.documentElement.classList.add('touch-device');
    // Optimize touch interactions
    const style = document.createElement('style');
    style.textContent = `
      .touch-device button,
      .touch-device a,
      .touch-device [role="button"] {
        min-height: 44px;
        min-width: 44px;
        touch-action: manipulation;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize all optimizations
export function initializeOptimizations() {
  measureWebVitals();
  preloadCriticalResources();
  optimizeBundle();
  applyDeviceOptimizations();
  performSEOHealthCheck();
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanupResources);
}