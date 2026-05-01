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

```python
import virtualizarr
import icechunk
import xarray as xr

# Build a virtual dataset from a directory of NetCDF files
vds = virtualizarr.open_virtual_mfdataset('s3://bucket/era5/*.nc')

# Persist the manifest in an Icechunk repo
repo = icechunk.Repository.create(icechunk.local_filesystem_storage('era5-icechunk'))
session = repo.writable_session('main')
vds.virtualize.to_icechunk(session.store)
session.commit('Initial ERA5 virtual dataset')

# Read it back as a normal Zarr dataset
ds = xr.open_zarr(repo.readonly_session('main').store)
```

## Learn more

- [VirtualiZarr](https://github.com/zarr-developers/VirtualiZarr)
- [Icechunk](https://github.com/earth-mover/icechunk)
- [VirtualiZarr docs](https://virtualizarr.readthedocs.io/)
