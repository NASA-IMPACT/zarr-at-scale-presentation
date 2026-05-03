# GeoZarr

> Open conventions for geospatial Zarr. CRS, spatial transforms, multiscale pyramids, and climate metadata, composable into a single Earth-science profile.

## What it does

GeoZarr is a set of composable Zarr conventions for storing multidimensional georeferenced grids. Each convention addresses a single concern and can be used on its own or combined: `proj:` records the CRS, `spatial:` records affine transforms between array indices and geographic coordinates, and `multiscales` records resolution pyramids. CF integration, reusing the existing NetCDF Climate & Forecast vocabulary, is under active discussion as an additional convention. A GeoZarr group is just a Zarr group, so any Zarr reader (zarr-python, xarray, zarrita.js) opens it without GeoZarr-specific code.

## Why it matters

- **One profile across stacks:** xarray, GDAL, zarrita.js, deck.gl-zarr, OpenLayers, and others can all consume the same metadata
- **Composable:** use only what you need, layer in CRS without committing to a pyramid, or vice versa
- **Inheritance:** group-level `proj:` and `spatial:` metadata cascade to child arrays, so a single CRS or transform covers a whole archive without per-array duplication
- **OGC standards track:** developed by the OGC GeoZarr Standards Working Group, targeting Architecture Board review by summer 2026

## Core conventions

| Convention | Namespace | Purpose |
|------------|-----------|---------|
| [geo-proj](https://github.com/zarr-conventions/geo-proj) | `proj:` | CRS via EPSG, WKT2, or PROJJSON |
| [spatial](https://github.com/zarr-conventions/spatial) | `spatial:` | Affine transforms from array indices to geographic coordinates |
| [multiscales](https://github.com/zarr-conventions/multiscales) | `multiscales` | Resolution pyramids for tiling and overviews |

All three are at *Proposal* maturity in the [Zarr Conventions Framework](https://github.com/zarr-conventions/.github/blob/main/profile/README.md), targeting *Candidate* (three independent implementations) for V1. Conventions under consideration include CF in Zarr, DGGS in Zarr, and TileMatrixSet.

## See it in action

Browse real GeoZarr datasets at [inspect.geozarr.org](https://inspect.geozarr.org). The [in-browser rendering](/in-browser) demos on this site, ECMWF and AlphaEarth Foundations, both load GeoZarr-conformant arrays directly into deck.gl-zarr, using `proj:` and `spatial:` for georeferencing and `multiscales` to pick the right pyramid level for the current zoom.

## Learn more

- [GeoZarr site](https://geozarr.org)
- [GeoZarr spec repository](https://github.com/zarr-developers/geozarr-spec)
- [OGC GeoZarr SWG](https://agora.ogc.org/c/overview-716766/)
- [Zarr Conventions Framework](https://github.com/zarr-conventions/.github/blob/main/profile/README.md)
