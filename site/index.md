---
layout: home
hero:
  name: "Zarr at Scale"
  text: "What's new in Zarr"
  tagline: "Working with multi-terabyte Earth-science datasets is now routine."
  actions:
    - theme: brand
      text: View the poster
      link: /poster/
      target: _blank
      rel: noopener
    - theme: alt
      text: Download as PDF
      link: /poster.pdf
      target: _blank
      rel: noopener
    - theme: alt
      text: Read the abstract
      link: https://doi.org/10.5194/egusphere-egu26-15196
    - theme: alt
      text: View on GitHub
      link: https://github.com/maxrjones/zarr-at-scale-presentation

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
    details: Stream Zarr chunks straight to the GPU with Zarrita.js and deck.gl-zarr. No server, no pre-rendered tiles.
    link: /in-browser
  - title: GeoZarr
    details: Open conventions for geospatial Zarr. CRS, spatial transforms, multiscale pyramids, on the OGC standards track.
    link: /geozarr
---

## EGU 2026 poster

This site is the companion to the EGU 2026 poster **Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data** (EGU26-15196), presented in session ESSI2.2 on Monday 4 May 2026.

## See also

- **Custom codecs:** Zarr V3 supports user-defined compression and pre-filter codecs. See the [Zarr extensions registry](https://github.com/zarr-developers/zarr-extensions/tree/main/codecs).
- **Custom data types:** Zarr V3 supports user-defined data types. See the [data types registry](https://github.com/zarr-developers/zarr-extensions/tree/main/data-types).

## Citation

> Jones, M., Hamman, J., Bennett, D., Barron, K., and Magin, J.: Zarr at scale: virtualization, sharding, and performance optimizations for Earth science data, EGU General Assembly 2026, Vienna, Austria, 3–8 May 2026, EGU26-15196, https://doi.org/10.5194/egusphere-egu26-15196, 2026.
