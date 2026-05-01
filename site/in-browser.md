# In-browser rendering

> Render multi-terabyte datasets in the browser. Stream Zarr chunks straight to the GPU. No server, no pre-rendered tiles.

## What it does

Zarrita.js reads Zarr chunks directly from the browser using `fetch`. deck.gl-raster pushes those chunks onto the GPU as raster tiles. The user pans, zooms, and recolors a multi-terabyte dataset interactively, with no server-side rendering pipeline and no pre-rendered tile cache.

## Why it matters

- **No tiling pipeline:** skip the offline pre-render, the tile cache, and the tile server
- **Native cloud-native:** the data lives in Zarr on object storage, the renderer reads it directly
- **Laptop-grade performance:** the GPU does the heavy lifting

![deck.gl-raster Zarr screenshot](/figures/in-browser.png)

## Live demo

(Embed of the chosen deck.gl-raster Zarr demo lands here once the URL is picked. See `dev-docs/poster-implementation-plan.md` Task 11.)

## How to use it

```js
import * as zarr from 'zarrita'
// ... see the deck.gl-raster examples for full Deck setup

const store = zarr.HTTPStore.fromUrl('https://example.com/dataset.zarr')
const arr = await zarr.open(store, { kind: 'array' })
// pass `arr` into a deck.gl-raster layer's tile loader
```

## Learn more

- [Zarrita.js](https://github.com/manzt/zarrita.js)
- [deck.gl-raster examples](https://github.com/visgl/deck.gl-raster)
