# EGU 2026 Poster: Zarr at Scale

Source for the EGU 2026 ESSI2.2 poster *Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data* (EGU26-15196) and its companion reference site.

- **Poster (HTML/CSS):** `poster/`
- **Companion site (VitePress):** `site/`
- **Shared figures:** `figures/`
- **Shared design tokens:** `styles/tokens.css`

## Build

### Companion site

```sh
npm install
npm run site:dev       # local dev server
npm run site:build     # builds site/.vitepress/dist/
```

The site is deployed to <https://zarr-at-scale.maxjones.dev/> on push to `main`.

### Poster PDF

The poster is a single HTML page styled at 1600 × 910 mm via CSS `@page`. Open `poster/index.html` in Chrome, then `Cmd+P` and "Save as PDF". The print dialog picks up the page size from CSS automatically.

For a scripted export:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=poster/dist/poster.pdf \
  poster/index.html
```

## Citation

> Jones, M., Hamman, J., Bennett, D., Barron, K., and Magin, J.: Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data, EGU General Assembly 2026, Vienna, Austria, 3–8 May 2026, EGU26-15196, <https://doi.org/10.5194/egusphere-egu26-15196>, 2026.

## License

CC BY 4.0 (matching the abstract's licensing).
