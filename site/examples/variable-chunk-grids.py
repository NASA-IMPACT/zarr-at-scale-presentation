# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "zarr==3.2.0",
# ]
# ///
"""Variable (rectilinear) chunk grid: one array, many chunk sizes per axis."""

import zarr
import numpy as np

# Rectilinear chunks are experimental in zarr 3.2.0; opt in via config.
zarr.config.set({'array.rectilinear_chunks': True})

# 1D array with variable chunks along axis 0:
# coarse chunks for older data, fine chunks for recent.
# Chunk edges along an axis must sum to >= the shape extent.
arr = zarr.create_array(
    store='timeseries.zarr',
    shape=(8760,),                                                # one year, hourly
    chunks=[(4096, 2048, 1024, 512, 512, 256, 256, 56)],          # variable chunks along axis 0
    dtype='float32',
    overwrite=True,
)
arr[:] = np.random.random((8760,)).astype('float32')
print('rectilinear chunk sizes:', arr.read_chunk_sizes)
