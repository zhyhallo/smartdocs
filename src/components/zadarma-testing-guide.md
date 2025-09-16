# 🧪 Zadarma Widget Testing Guide

## Quick Test Checklist

### ✅ Visual Verification
1. **Button Appearance**: Look for a blue circular button in bottom-right corner
2. **Position**: Should be above the owl scroll-to-top button
3. **Hover Effect**: Should scale and show rotating gradient border
4. **Mobile View**: Should adapt size and position on mobile devices

### ✅ Functional Testing
1. **Click Test**: Click the button to open the callback form
2. **Form Styling**: Verify the popup matches your blue-white theme
3. **Form Interaction**: Test input fields and buttons
4. **Close Test**: Ensure the modal closes properly

### ✅ Integration Verification
1. **Z-Index**: Widget should appear below scroll-to-top button
2. **Responsive**: Test on different screen sizes
3. **No Conflicts**: Ensure no overlap with other elements
4. **Performance**: Smooth animations and transitions

### 🔧 Troubleshooting

#### If Widget Doesn't Appear
- Check browser console for JavaScript errors
- Verify internet connection for external script loading
- Check if ad blockers are interfering

#### If Styling Looks Wrong
- Clear browser cache and hard refresh (Ctrl+F5)
- Check if custom CSS is being loaded
- Verify no CSS conflicts with other styles

#### If Positioning is Off
- Check viewport size and zoom level
- Verify mobile vs desktop breakpoints
- Test on different browsers

### 📱 Browser Testing
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### 💡 Expected Behavior

**Desktop:**
- Blue circular button (60x60px) with shadow
- Hover: Scale to 105% with enhanced shadow
- Position: 20px from right, 120px from bottom

**Mobile:**
- Smaller button (56x56px)
- Position: 16px from right, 100px from bottom
- Touch-friendly interaction area

**Modal:**
- Clean white background
- Blue header with white text
- Form inputs with blue focus states
- Blue primary buttons, gray secondary buttons

---

**Integration Status**: ✅ Complete  
**Theme Compatibility**: ✅ Fully Matched  
**Accessibility**: ✅ ARIA Labels Added  
**Performance**: ✅ Optimized