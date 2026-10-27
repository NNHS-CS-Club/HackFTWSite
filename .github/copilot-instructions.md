# HackFTW Site — AI Coding Instructions

## Project Overview

Static marketing website for "Hack For the World" (HackFTW), a high school
hackathon in Naperville, IL. Pure HTML/CSS/JS, no build system or frameworks.
Live at: https://hackforthe.world

## Structure

```
index.html              Landing page: hero, about, FAQ, sponsors, CTA, footer
venue/index.html        Venue page: TBD notice, map, venue/parking cards
assets/
  css/style.css         The one stylesheet, shared by every page
  js/main.js            Progressive enhancement only
  fonts/                Bio Sans (display font), woff + woff2
  icons/                Favicons, site.webmanifest, browserconfig.xml
  img/
    brand/              hftw-light (dark text), hftw-dark (light text),
                        og-image.jpg
    backgrounds/        skyline (hero), network (CTA band)
    sponsors/           Sponsor logos
    venue/              entrance, parking-map
    archive/            Retired assets (old Dealer Inspire venue, lockups,
                        the UN SDG wheel)
```

All paths are **relative**, never root-absolute. `index.html` references
`assets/...`; `venue/index.html` references `../assets/...`; `style.css`
references `../img/...` and `../fonts/...`. Links between pages are relative
too (`venue/index.html`, `../index.html`). This keeps the site working when
opened straight from disk over `file://` — Live Server, VS Code previews, and
GitHub Pages project sites all behave, whereas a leading `/` resolves to the
drive root and silently loads nothing.

## Conventions

### Images: PNG + WebP pairs, same basename

Every image lives beside its WebP twin in the same folder
(`sponsors/cisco.png` + `sponsors/cisco.webp`). There is no runtime format
detection — selection is declarative:

```html
<picture>
  <source type="image/webp" srcset="/assets/img/sponsors/cisco.webp">
  <img src="/assets/img/sponsors/cisco.png" alt="Cisco" loading="lazy">
</picture>
```

```css
background-image: url("../img/backgrounds/skyline.png");           /* fallback */
background-image: image-set(
    url("../img/backgrounds/skyline.webp") type("image/webp"),
    url("../img/backgrounds/skyline.png") type("image/png"));
```

**A `<source>` is chosen by MIME type, not by whether the file exists** — only
add the WebP source once the `.webp` is actually committed, or the image breaks.
Generate a missing one with Pillow:

```sh
python -c "from PIL import Image; Image.open('x.png').save('x.webp', 'WEBP', quality=88, method=6)"
```

Flat-colour logos are often smaller as lossless WebP (`lossless=True`); if the
WebP ends up larger than the PNG, drop it and ship the PNG alone.

### CSS

- Single stylesheet, numbered section banners, tabs for indentation.
- Everything derives from the tokens in `:root`: brand colours (`--blue-500`
  `#0065ff`, `--lime-500` `#4ed613`, `--navy-900` `#010e30`, sampled from the
  logo), a `clamp()` type scale (`--step--1` … `--step-4`), `--gutter`,
  `--section-y`, radii, shadows, `--ease`. Change a token, not a literal.
- Layout is intrinsic: `.container` + `grid-template-columns:
  repeat(auto-fit, minmax(min(100%, 20rem), 1fr))`. Avoid `vh`/`vw` for type and
  spacing — the old stylesheet did that and broke on short viewports.
- BEM-ish names (`.faq-card__q`, `.site-nav__link`). Media queries use `rem`.
- Every animation must be covered by the `prefers-reduced-motion` block at the
  bottom of the file.

### JavaScript

`assets/js/main.js` is loaded with `defer` and is **pure progressive
enhancement**: a navbar shadow on scroll and an IntersectionObserver that adds
`.is-visible` to `.reveal` elements. The page must read correctly without it —
that is what the `<noscript>` style block in each `<head>` guarantees. Do not
move content rendering or image selection into JS.

### Accessibility

Keep the skip link, `alt` text on every image, `aria-current="page"` on the
active nav link, `aria-label` on the logo links, `title` on the map iframe, and
the `:focus-visible` outline.

## Editing Guidelines

1. **Event details** live in the hero of `index.html` as `.chip--tbd` chips
   (date/time, venue) plus `.hero__note`. They currently read **TBD** — the
   date, time, and venue have not been decided. The CTA band and the venue
   page's `.notice` repeat that; update all of them together.
2. **Adding a sponsor:** drop the PNG (and WebP, if smaller) into
   `assets/img/sponsors/`, then add a `<picture>` to `.sponsors__logos`.
3. **New page:** copy `venue/index.html`, fix the `../` depth on every asset
   path, update `<title>`, the `og:` tags, and `aria-current`.
4. **Retiring an asset:** move it to `assets/img/archive/` rather than deleting.

## Development Workflow

No build step. `python -m http.server 8000` from the repo root, then refresh.
