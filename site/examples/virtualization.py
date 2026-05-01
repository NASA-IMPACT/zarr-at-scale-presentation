# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "virtualizarr==2.4.0",
#   "zarr==3.1.6",
#   "obstore",
#   "obspec-utils>=0.9.0",
#   "icechunk>=2.0",
#   "xarray",
#   "h5py",
# ]
# ///
"""Virtualization: read archival NetCDF files as a single Zarr dataset.

Lists a slice of NASA NEX-GDDP-CMIP6 daily climate projections from public S3,
builds a virtual dataset with VirtualiZarr's v2 API, persists the manifest in
Icechunk, and reads it back as a normal Zarr dataset.
"""

import tempfile
from pathlib import Path

import virtualizarr as vz
import xarray as xr
from obspec_utils.glob import glob
from obspec_utils.registry import ObjectStoreRegistry
from obstore.store import from_url

import icechunk

BUCKET = "s3://nex-gddp-cmip6/"
# A small, deterministic subset: ACCESS-CM2 historical surface air temperature, 5 years.
PATTERN = "NEX-GDDP-CMIP6/ACCESS-CM2/historical/r1i1p1f1/tas/*201[0-4]*.nc"

# 1. Build an obstore-backed registry for the public bucket (anonymous reads).
store = from_url(BUCKET, region="us-west-2", skip_signature=True)
registry = ObjectStoreRegistry({BUCKET: store})

# 2. List the input files via obspec-utils glob — no per-file HEAD requests.
urls = [f"{BUCKET}{path}" for path in glob(store, PATTERN)]
print(f"virtualizing {len(urls)} files")

# 3. Build one virtual dataset spanning all of them (v2 API).
parser = vz.parsers.HDFParser()
vds = vz.open_virtual_mfdataset(
    urls, registry=registry, parser=parser, combine="by_coords"
)

config = icechunk.ObjectStoreConfig.S3(
    icechunk.S3Options(region="us-west-2", anonymous=True)
)

# 4. Tell Icechunk how to read virtual chunks from the public S3 bucket.
container = icechunk.VirtualChunkContainer(
    BUCKET,
    config,
)
config = icechunk.RepositoryConfig(virtual_chunk_containers={BUCKET: container})

# 5. Persist the manifest in an Icechunk repo (transactional commits).
workdir = Path(tempfile.mkdtemp(prefix="virtualization-demo-"))
repo = icechunk.Repository.create(
    icechunk.local_filesystem_storage(str(workdir / "nex-gddp-icechunk")),
    config=config,
    authorize_virtual_chunk_access={BUCKET: None},
)
session = repo.writable_session("main")
vds.virtualize.to_icechunk(session.store)
session.commit("Initial NEX-GDDP-CMIP6 virtual dataset")

# 6. Read it back as a normal Zarr dataset.
ds = xr.open_zarr(repo.readonly_session("main").store, consolidated=False)
print(ds)
