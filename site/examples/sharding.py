# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "zarr>=3.1",
#   "numpy",
# ]
# ///
"""Sharding: many small chunks packed into few storage objects."""

import zarr
import numpy as np

# A 1024 x 1024 array with 16x16 inner chunks grouped into 256x256 shards
arr = zarr.create_array(
    store='array.zarr',
    shape=(1024, 1024),
    chunks=(16, 16),       # the unit of access
    shards=(256, 256),     # the unit of storage
    dtype='float32',
    overwrite=True,
)
arr[:] = np.random.random((1024, 1024)).astype('float32')
