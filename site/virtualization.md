# Virtualization

> Read archival files as one Zarr dataset. No conversion, no copies. Point at NetCDF4, HDF5, GRIB, GeoTIFF.

## What it does

VitualiZarr scans existing archival files and builds a *virtual* Zarr manifest that records where every chunk lives inside those files. Icechunk stores and version-controls the manifest with transactional commits. xarray then reads across the whole archive as if it were a single Zarr dataset, with no copying or rewriting of the original data.

## Why it matters

- **No conversion costs:** terabyte-scale archives can be exposed as Zarr datasets without rewriting them
- **Atomic updates:** Icechunk commits are transactional, so adding or amending data in the manifest is safe under concurrent writes
- **Format-agnostic:** the same manifest can point at NetCDF4, HDF5, GRIB, GeoTIFF, FITS, and more

![Virtualization flow](/figures/virtualization.svg)

## How to use it

Run with `uv run site/examples/virtualization.py`. The script lists a slice of NASA NEX-GDDP-CMIP6 from public S3 with `obspec-utils`, builds the virtual dataset with VirtualiZarr's v2 API, persists it in Icechunk, and reads it back.

<<< @/examples/virtualization.py{python}

## Learn more

- [VirtualiZarr](https://github.com/zarr-developers/VirtualiZarr)
- [Icechunk](https://github.com/earth-mover/icechunk)
- [VirtualiZarr docs](https://virtualizarr.readthedocs.io/)
