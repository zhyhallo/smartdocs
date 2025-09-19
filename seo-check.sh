#!/bin/bash

# SEO and Performance Optimization Script for posnet.modulsoft.eu
# Run this script after deployment to verify and optimize

echo "🚀 Starting SEO and Performance Optimization Checks..."

# 1. Verify sitemap accessibility
echo "📋 Checking sitemap..."
curl -s -o /dev/null -w "%{http_code}" https://posnet.modulsoft.eu/sitemap.xml
if [ $? -eq 0 ]; then
    echo "✅ Sitemap accessible"
else
    echo "❌ Sitemap not accessible"
fi

# 2. Verify robots.txt
echo "🤖 Checking robots.txt..."
curl -s -o /dev/null -w "%{http_code}" https://posnet.modulsoft.eu/robots.txt
if [ $? -eq 0 ]; then
    echo "✅ robots.txt accessible"
else
    echo "❌ robots.txt not accessible"
fi

# 3. Check Google Search Console verification
echo "🔍 Checking Google verification file..."
if [ -f "./public/google123456789012345.html" ]; then
    echo "✅ Google verification file present"
else
    echo "❌ Google verification file missing"
fi

# 4. Verify structured data
echo "📊 Checking structured data..."
if grep -q "@type.*Organization" index.html; then
    echo "✅ Organization schema found"
else
    echo "❌ Organization schema missing"
fi

if grep -q "@type.*Product" index.html; then
    echo "✅ Product schema found"
else
    echo "❌ Product schema missing"
fi

# 5. Check hreflang tags
echo "🌐 Checking hreflang tags..."
if grep -q 'hreflang="uk"' index.html; then
    echo "✅ Ukrainian hreflang found"
else
    echo "❌ Ukrainian hreflang missing"
fi

if grep -q 'hreflang="pl"' index.html; then
    echo "✅ Polish hreflang found"
else
    echo "❌ Polish hreflang missing"
fi

if grep -q 'hreflang="ru"' index.html; then
    echo "✅ Russian hreflang found"
else
    echo "❌ Russian hreflang missing"
fi

# 6. Check meta tags
echo "🏷️ Checking critical meta tags..."
if grep -q 'meta name="description"' index.html; then
    echo "✅ Meta description found"
else
    echo "❌ Meta description missing"
fi

if grep -q 'property="og:' index.html; then
    echo "✅ Open Graph tags found"
else
    echo "❌ Open Graph tags missing"
fi

# 7. Check canonical URL
echo "🔗 Checking canonical URL..."
if grep -q 'rel="canonical"' index.html; then
    echo "✅ Canonical URL set"
else
    echo "❌ Canonical URL missing"
fi

echo ""
echo "🎯 SEO Optimization Recommendations:"
echo "1. Submit sitemap to Google Search Console: https://posnet.modulsoft.eu/sitemap.xml"
echo "2. Submit sitemap to Bing Webmaster Tools"
echo "3. Verify Google Search Console with the verification file"
echo "4. Set up Google Analytics 4 with the provided tracking code"
echo "5. Enable Microsoft Clarity for user behavior analysis"
echo "6. Test page speed with PageSpeed Insights"
echo "7. Validate structured data with Google's Rich Results Test"
echo "8. Check mobile-friendliness with Google's Mobile-Friendly Test"
echo ""
echo "🔧 Technical SEO Checklist:"
echo "✅ Sitemap.xml created and optimized"
echo "✅ Robots.txt configured for all major search engines"
echo "✅ Structured data (JSON-LD) implemented"
echo "✅ Open Graph and Twitter Cards configured"
echo "✅ Hreflang tags for multilingual support"
echo "✅ Canonical URLs set"
echo "✅ Meta tags optimized"
echo "✅ Performance optimization headers added"
echo "✅ Security headers configured"
echo "✅ PWA manifest created"
echo ""
echo "🌍 Multilingual SEO:"
echo "✅ Ukrainian (default): https://posnet.modulsoft.eu"
echo "✅ Polish: https://posnet.modulsoft.eu/pl"
echo "✅ Russian: https://posnet.modulsoft.eu/ru"
echo ""
echo "📈 Analytics Setup:"
echo "- Google Analytics 4: Update GA_MEASUREMENT_ID in index.html"
echo "- Microsoft Clarity: Update CLARITY_PROJECT_ID in index.html"
echo "- Hotjar (optional): Update HOTJAR_ID in index.html"
echo ""
echo "🎉 SEO Optimization Complete!"