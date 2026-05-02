---
layout: home
hero:
  name: "Zarr at Scale"
  text: "What's new in Zarr"
  tagline: "Working with multi-terabyte Earth-science datasets is now routine."
  actions:
    - theme: brand
      text: Sharding
      link: /sharding
    - theme: alt
      text: Virtualization
      link: /virtualization
    - theme: alt
      text: Variable chunk grids
      link: /variable-chunk-grids
    - theme: alt
      text: In-browser rendering
      link: /in-browser

features:
  - title: Sharding
    details: Many small chunks, few storage objects. Random access of small chunks with the storage footprint of large ones.
    link: /sharding
  - title: Virtualization
    details: Read NetCDF4, HDF5, GRIB, and GeoTIFF archives as one Zarr dataset, no conversion or copies.
    link: /virtualization
  - title: Variable chunk grids
    details: One Zarr array, many chunk sizes. Just landed in zarr-python.
    link: /variable-chunk-grids
  - title: In-browser rendering
    details: Stream Zarr chunks straight to the GPU with Zarrita.js and deck.gl-raster. No server, no pre-rendered tiles.
    link: /in-browser
---

## EGU 2026 poster

This site is the companion to the EGU 2026 poster **Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data** (EGU26-15196), presented in session ESSI2.2 on Monday 4 May 2026.

[View the poster (HTML)](/poster/) · [Download as PDF](/poster.pdf) · [Abstract](https://doi.org/10.5194/egusphere-egu26-15196) · [Source on GitHub](https://github.com/maxrjones/egu26-zarr-at-scale)

## See also

- **Custom codecs:** Zarr V3 supports user-defined compression and pre-filter codecs. See the [Zarr extensions registry](https://github.com/zarr-developers/zarr-extensions/tree/main/codecs).
- **Custom data types:** Zarr V3 supports user-defined data types. See the [data types registry](https://github.com/zarr-developers/zarr-extensions/tree/main/data-types).

## Citation

> Jones, M., Hamman, J., Bennett, D., Barron, K., and Magin, J.: Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data, EGU General Assembly 2026, Vienna, Austria, 3–8 May 2026, EGU26-15196, https://doi.org/10.5194/egusphere-egu26-15196, 2026.
