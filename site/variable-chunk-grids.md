# Variable chunk grids

> One array, many chunk sizes. Match chunk size to data density. Fine where it matters, coarse where it doesn't.

## What it does

A Zarr array can now have non-uniform chunks along any axis. Instead of every chunk being the same size, you specify a list of chunk sizes per axis. The array's metadata records the irregular grid, and readers fetch only the chunks that overlap the requested region.

## Why it matters

- **Match chunk size to data density:** fine chunks where data is dense or accessed often, coarse chunks elsewhere
- **Time-axis archives:** fine chunks for recent observations or forecast horizons, coarse chunks for older history
- **Less wasted storage:** no padding sparse regions to fit a uniform grid

![Variable chunk grid along a time axis](/figures/variable-chunk-grids.svg)

## How to use it

Run with `uv run site/examples/variable-chunk-grids.py`. Rectilinear chunks are experimental in zarr 3.2.0 and must be enabled via `zarr.config`.

<<< @/examples/variable-chunk-grids.py{python}

## Learn more

- [ZEP 0003: Variable chunking](https://github.com/zarr-developers/zeps/blob/main/draft/ZEP0003.md)
- [zarr-python release notes](https://zarr.readthedocs.io/en/stable/release-notes.html)
