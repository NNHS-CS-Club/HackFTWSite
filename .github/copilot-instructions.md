# HackFTW Site - AI Coding Instructions

## Project Overview
Static marketing website for "Hack For the World" (HackFTW) - a high school hackathon in Naperville, IL. Pure HTML/CSS/JS with no build system or frameworks. Live at: https://hackforthe.world

## Architecture & Structure

**Multi-Page Static Site:**
- Root: Main landing page ([index.html](index.html), [script.js](script.js), [style.css](style.css))
- `/venue/`: Venue information subpage (separate HTML/JS files)
- `/contact/`: Contact page (currently empty/placeholder)
- Shared CSS: All pages use root [style.css](style.css)

**Asset Organization:**
- `/fonts/`: Custom fonts (BioSans, BioSansBold)
- `/icons/`: Favicons and app icons
- `/images/`: Dual-format images (PNG/WebP) for browser compatibility
  - Structure: `images/{png,webp}/filename.{png,webp}`
  - WebP used as progressive enhancement

## Critical Conventions

### Image Handling Pattern
**WebP Detection with Fallback:** All JavaScript files implement runtime WebP support detection:

```javascript
function canUseWebP() {
  var elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  return false;
}

var webp = "png";  // Default fallback
window.onload = () => {
  if (canUseWebP()) { webp = "webp"; }
  // Dynamically set background images using detected format
  document.getElementById("logo-parent").style.backgroundImage = "url('images/" + webp + "/parallax1." + webp + "')";
}
```

**Path Adjustments:** Subpages ([venue/script.js](venue/script.js)) use relative paths (`../images/`) while root uses absolute (`/images/`).

### HTML Patterns
- **No quotes for simple attributes:** `<html lang=en>` not `lang="en"`
- **Picture elements with WebP sources:**
  ```html
  <picture>
    <source srcset="images/webp/file.webp" type="image/webp">
    <img src="images/png/file.png">
  </picture>
  ```
- **Inline event handlers:** Navigation uses `onclick="window.location.href = '/#'"` and `onclick="window.open('mailto:...', 'mail');event.preventDefault()"`

### CSS Structure
- **Custom fonts first:** `@font-face` declarations for BioSans at top of [style.css](style.css)
- **Grid-based layouts:** Hero section and CTAs use CSS Grid with explicit row/column assignments
  ```css
  grid-template: 35% 20% 6% 9% 12% / 11% 78% 11%;
  grid-row: 2/3; grid-column: 2/3;
  ```
- **Responsive with flexbox:** FAQ items use `flex: 47%` for two-column wrapping
- **Color scheme:** Primary blue `#0065ff`, dark overlay `rgba(1, 14, 48, 0.7)`

### Navigation & Links
- **Sticky navbar:** Fixed position with `.sticky` class
- **Absolute paths for root-level links:** `/venue/`, `/icons/`, etc.
- **External registration:** Links to Google Forms for event registration
- **Donation links:** Via Hack Club Bank (hcb.hackclub.com)

## Component Patterns

### Hero Section
Background image set via JavaScript (WebP detection), dark overlay with grid layout, responsive to viewport height (`vh` units)

### FAQ Section
Flexbox grid with `.faq-item` at `flex: 47%`, wraps on mobile. Items use inline HTML (`<strong>`, `<br>`) for formatting.

### Sponsors Section (Currently Commented Out)
HTML structure exists in comments for future activation. Uses tiered sponsor categories (Platinum/Gold/Silver) with responsive image grids.

## Development Workflow

**No Build System:** Direct file editing and browser refresh. No transpilation, bundling, or preprocessing.

**Testing:**
- Open files directly in browser or use simple HTTP server (e.g., `python -m http.server`)
- Test WebP fallback by disabling WebP in browser DevTools

**Deployment:** 
- Static file hosting (likely via Vercel/Netlify based on domain)
- No build step required

**Browser Compatibility:**
- Supports legacy browsers via PNG fallbacks
- Uses `<picture>` elements and `<noscript>` for progressive enhancement

## File Relationships
- **Subpages load root CSS:** `<link rel="stylesheet" href="../style.css">` (venue, contact)
- **Icons configured via:** [browserconfig.xml](browserconfig.xml), [site.webmanifest](icons/site.webmanifest)
- **Duplicate script logic:** [script.js](script.js) and [venue/script.js](venue/script.js) share WebP detection code with path adjustments

## Editing Guidelines

1. **Adding images:** Place in both `/images/png/` and `/images/webp/` with matching filenames
2. **New pages:** Copy [venue/index.html](venue/index.html) structure, adjust paths (add `../` for root assets)
3. **Styling:** Prefer viewport units (`vh`, `vw`) over fixed pixels for responsive design
4. **Event info updates:** Modify date/time in [index.html](index.html#L53) `#place-and-date` element
5. **Sponsor activation:** Uncomment [sponsors section](index.html#L82-L95) and add sponsor image assets
