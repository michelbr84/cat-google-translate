<h1 align="center">Cat Google Translate</h1>

<p align="center">
  <img src="./public/catintro.png" alt="Cat Google Translate hero" width="720" />
</p>

Google-like interface to search and generate cat images using the CATAAS (Cat as a Service) API, with multi-language support and advanced options.

API links:
- Site: [cataas.com](https://cataas.com/)
- Docs: [cataas.com/doc.html](https://cataas.com/doc.html)

## Run locally

Requirements: Node.js 18+ and npm.

```sh
git clone https://github.com/michelbr84/cat-google-translate.git
cd cat-google-translate
npm ci
npm run dev
# Open the URL printed in the terminal (e.g., http://localhost:8080/)
```

## Scripts

- `npm run dev`: start Vite dev server
- `npm run build`: production build
- `npm run preview`: preview the production build
- `npm run lint`: run linter

## Features

- Global language selector (pt, en, es, fr, de, it, ja, zh, ru, ar)
- The “Gato” logo word changes language independently on click (does not alter the global language)
- Search bar with “Search Cat” and “I'm Feeling Lucky”
- Advanced options (collapsible):
  - Image type: `type` (xsmall, small, medium, square)
  - Filters: `filter` (blur, mono, negate, custom)
  - Custom HSL: `brightness`, `lightness`, `saturation`, `hue`
  - RGB adjustments: `r`, `g`, `b`
  - Dimensions: `width`, `height`
  - Text on image: `says/:text` (with `fontSize` and `fontColor`)
- Automatic fallback: on load failure, fetch a random cat (`/cat`)

## CATAAS endpoint examples

- Random: `/cat`
- By tag: `/cat/:tag`
- GIF: `/cat/gif`
- With text: `/cat/says/Hello`
- Combo (from docs): `/cat/gif/says/Hello?filter=mono&fontColor=orange&fontSize=20&type=square`

## Known limitations

- `fontColor` on `/cat/says/:text` currently seems to render only black/white. Even when sending named colors (e.g., `red`) or normalized hex (e.g., `#ff0000` → `red`), the result may be black. Tracked in `TODO.md`.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- lucide-react, sonner

## Acknowledgements

- Image API: [CATAAS](https://cataas.com/)
