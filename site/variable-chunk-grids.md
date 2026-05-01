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

```python
import zarr

# 1D array with variable chunks along axis 0:
# coarse chunks for older data, fine chunks for recent
arr = zarr.create_array(
    store='timeseries.zarr',
    shape=(8760,),                                  # one year, hourly
    chunks=(2048, 1024, 512, 256, 128, 64, 32),     # variable chunks
    dtype='float32',
)
```

See the [zarr-python release notes](https://zarr.readthedocs.io/en/stable/release-notes.html) for the exact API once shipped.

## Learn more

- [ZEP 0003: Variable chunking](https://github.com/zarr-developers/zeps/blob/main/draft/ZEP0003.md)
- [zarr-python release notes](https://zarr.readthedocs.io/en/stable/release-notes.html)
