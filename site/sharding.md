# Sharding

> Many small chunks, few storage objects. Random access of small chunks with the storage footprint of large ones.

## What it does

Sharding packs many chunks of a Zarr array into a single storage object. The shard's internal chunk index lets readers fetch any specific chunk via a byte-range request, so random access stays as fast as having one chunk per object, while the total number of storage objects drops by orders of magnitude.

## Why it matters

- **HPC filesystems:** escape per-file inode pressure when an array would otherwise produce hundreds of thousands of chunk files
- **Cloud object stores:** escape per-object overhead (request cost, listing latency) on S3, GCS, Azure
- **Same access patterns:** existing Zarr readers transparently support sharded arrays via byte-range reads

![Sharding diagram](/figures/sharding.svg)

## How to use it

```python
import zarr
import numpy as np

# A 1024 x 1024 array with 16x16 inner chunks grouped into 256x256 shards
arr = zarr.create_array(
    store='array.zarr',
    shape=(1024, 1024),
    chunks=(16, 16),       # the unit of access
    shards=(256, 256),     # the unit of storage
    dtype='float32',
)
arr[:] = np.random.random((1024, 1024)).astype('float32')
```

## Learn more

- [Sharding codec spec](https://github.com/zarr-developers/zarr-specs/blob/main/docs/v3/codecs/sharding-indexed/index.rst)
- [zarr-python sharding API](https://zarr.readthedocs.io/en/stable/user-guide/arrays.html#sharding)
