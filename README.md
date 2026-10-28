# HackFTWSite

The official website for the Hack For the World hackathon held in Naperville, IL

Live at: https://hackforthe.world

## Running it locally

No build step — it is plain HTML, CSS, and JS. All paths are relative, so you
can just open `index.html` in a browser. To serve it instead:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>. The Live Server extension works too; this
workspace is pinned to port 5501 in `.vscode/settings.json`.

## Structure

```
index.html              Landing page
venue/index.html        Venue page
assets/
  css/style.css         The one stylesheet, shared by every page
  js/main.js            Progressive enhancement only (nav shadow, scroll reveal)
  fonts/                Bio Sans, the brand display font
  icons/                Favicons, webmanifest, browserconfig
  img/
    brand/              Logos and the Open Graph share image
    backgrounds/        Full-bleed section backgrounds
    sponsors/           Sponsor logos, PNG + WebP side by side
    venue/              Photos and maps of the venue
    archive/            Retired assets kept for reference
```

## Conventions

- **Images ship as a PNG/WebP pair** under the same basename. Use `<picture>`
  for `<img>` and `image-set()` for CSS backgrounds — only add a WebP `<source>`
  when the `.webp` file actually exists, or the browser will pick it and fail.
- **Paths are always relative**, never starting with `/` — a leading slash
  resolves to the drive root when the page is opened over `file://` and the
  stylesheet silently fails to load.
- **Styling flows from the tokens** in the `:root` block at the top of
  `style.css` (colours, type scale, spacing, radii, shadows). Change a token
  rather than hard-coding a value.
- **Event details live in `index.html`**: the hero chips (`.chip--tbd`) carry the
  date, time, and venue. They currently read TBD.
