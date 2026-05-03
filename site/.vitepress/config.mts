import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Zarr at Scale',
  description: "What's new in Zarr: working with multi-terabyte Earth-science datasets is now routine.",
  base: '/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Sharding', link: '/sharding' },
      { text: 'Virtualization', link: '/virtualization' },
      { text: 'Variable chunks', link: '/variable-chunk-grids' },
      { text: 'In-browser', link: '/in-browser' },
      { text: 'GeoZarr', link: '/geozarr' }
    ],
    sidebar: [
      {
        text: 'Reference cards',
        items: [
          { text: 'Sharding', link: '/sharding' },
          { text: 'Virtualization', link: '/virtualization' },
          { text: 'Variable chunk grids', link: '/variable-chunk-grids' },
          { text: 'In-browser rendering', link: '/in-browser' },
          { text: 'GeoZarr', link: '/geozarr' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/maxrjones/zarr-at-scale-presentation' }
    ],
    footer: {
      message: 'EGU 2026 · ESSI2.2 · EGU26-15196',
      copyright: 'CC BY 4.0'
    }
  }
})
