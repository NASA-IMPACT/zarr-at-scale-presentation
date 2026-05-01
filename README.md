# EGU 2026 Poster: Zarr at Scale

Source for the EGU 2026 ESSI2.2 poster *Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data* (EGU26-15196) and its companion reference site.

- **Poster (paged.js):** `poster/`
- **Companion site (VitePress):** `site/`
- **Shared figures:** `figures/`
- **Shared design tokens:** `styles/tokens.css`

## Build

```sh
npm install
npm run poster:build   # builds poster/dist/poster.pdf
npm run site:build     # builds site/.vitepress/dist/
npm run site:dev       # local dev server for the site
```

The site is deployed to <https://zarr-developers.github.io/egu26-zarr-at-scale/> on push to `main`.

## Citation

> Jones, M., Hamman, J., Bennett, D., Barron, K., and Magin, J.: Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data, EGU General Assembly 2026, Vienna, Austria, 3–8 May 2026, EGU26-15196, <https://doi.org/10.5194/egusphere-egu26-15196>, 2026.

## License

CC BY 4.0 (matching the abstract's licensing).
