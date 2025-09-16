# 📞 Zadarma Callback Widget Integration

## ✨ Overview

The Zadarma callback widget has been successfully integrated into your ModulSoft landing page with complete customization to match your blue-white corporate theme.

## 🎨 Design Integration

### Visual Styling
- **Corporate Colors**: Matches your blue-white theme perfectly
- **Button Design**: Circular blue button with hover effects
- **Positioning**: Bottom right, positioned above the scroll-to-top button  
- **Animations**: Smooth transitions and enhanced hover effects

### Theme Features
- ✅ Primary blue color (`oklch(0.55 0.22 240)`)
- ✅ Accent blue for hover (`oklch(0.65 0.18 220)`)
- ✅ White text on blue backgrounds
- ✅ Consistent with existing UI components
- ✅ Inter font family matching your site

## 🔧 Technical Implementation

### Files Modified
1. **`/index.html`** - Added Zadarma widget script
2. **`/src/index.css`** - Comprehensive widget styling
3. **`/src/components/ZadarmaWidget.tsx`** - Custom React integration
4. **`/src/App.tsx`** - Widget component integration

### Widget Configuration
```javascript
// Widget credentials
var ZCallbackWidgetLinkId = 'edec1cbf8a1f75508f534464a2b4fa55';
var ZCallbackWidgetDomain = 'my.zadarma.com';
```

### Custom Styling Features
- Custom positioning (120px from bottom, 20px from right)
- z-index management (below scroll-to-top button)
- Animated hover effects with rotating border
- Mobile responsive design
- Enhanced accessibility

## 📱 Responsive Behavior

### Desktop
- Full-size button with hover animations
- Positioned in bottom-right corner
- Smooth interactions with existing elements

### Mobile
- Smaller button size (56x56px)
- Adjusted positioning for mobile screens
- Popup modal responsive design

## 🎯 User Experience

### Button States
1. **Default**: Blue circular button with subtle shadow
2. **Hover**: Scale effect + enhanced shadow + rotating border
3. **Active**: Form modal opens with corporate styling

### Popup Modal
- Clean white background with blue accents
- Form inputs styled to match your theme
- Buttons follow your design system
- Success/error messages in corporate colors

## 🔧 Programmatic Control

### Using the useZadarmaWidget Hook
```typescript
import { useZadarmaWidget } from "@/components/ZadarmaWidget"

function MyComponent() {
  const { openWidget, isWidgetAvailable } = useZadarmaWidget()
  
  const handleCustomClick = () => {
    if (isWidgetAvailable()) {
      openWidget()
    }
  }
  
  return (
    <button onClick={handleCustomClick}>
      Custom Call Button
    </button>
  )
}
```

## 🚀 Features

### Enhanced Integration
- ✅ Automatic positioning management
- ✅ Corporate branding consistency
- ✅ Mobile responsiveness  
- ✅ Accessibility improvements
- ✅ Performance optimized
- ✅ Error handling

### Animation Effects
- ✅ Hover scale effects
- ✅ Rotating gradient border on hover
- ✅ Smooth modal transitions
- ✅ Form interaction feedback

## 🎨 Color Palette Used

```css
/* Primary button */
--widget-primary: oklch(0.55 0.22 240);
--widget-primary-hover: oklch(0.65 0.18 220);

/* Background and text */
--widget-background: oklch(0.98 0.02 240);
--widget-text: oklch(0.15 0.08 240);

/* Form elements */
--widget-input: oklch(0.96 0.02 240);
--widget-border: oklch(0.88 0.04 240);
```

## ⚙️ Configuration Options

### ZadarmaWidget Props
- `bottomOffset`: Distance from bottom (default: 120px)
- `rightOffset`: Distance from right (default: 20px)
- `className`: Additional CSS classes for customization

## 📈 Benefits

1. **Brand Consistency**: Matches your existing design perfectly
2. **User Experience**: Smooth, professional interactions  
3. **Accessibility**: Proper ARIA labels and keyboard navigation
4. **Mobile Friendly**: Optimized for all screen sizes
5. **Performance**: Lightweight integration with optimization

## 🔧 Maintenance

### Widget Updates
The widget will auto-update from Zadarma's servers. Your custom styling will persist across updates.

### Customization Changes
All styling is contained in `/src/index.css` under the "Zadarma Widget Custom Styling" section.

---

**Status**: ✅ **Fully Integrated and Styled**  
**Positioning**: ✅ **Bottom-right, above scroll-to-top**  
**Theme**: ✅ **Blue-white corporate colors**  
**Responsive**: ✅ **Mobile and desktop optimized**