# /// script
# requires-python = ">=3.11"
# dependencies = ["qrcode"]
# ///
"""Generate the 6 QR codes used by the poster.

Run with: uv run scripts/generate-qrs.py
"""

from pathlib import Path

import qrcode
from qrcode.image.svg import SvgPathImage

BASE = "https://zarr-at-scale.maxjones.dev"
TARGETS = {
    "header":               f"{BASE}/",
    "sharding":             f"{BASE}/sharding",
    "virtualization":       f"{BASE}/virtualization",
    "variable-chunk-grids": f"{BASE}/variable-chunk-grids",
    "in-browser":           f"{BASE}/in-browser",
    "geozarr-spec":         "https://github.com/zarr-developers/geozarr-spec",
}

OUT_DIR = Path(__file__).parent.parent / "figures" / "qr"
OUT_DIR.mkdir(parents=True, exist_ok=True)

for name, url in TARGETS.items():
    qr = qrcode.QRCode(
        border=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(image_factory=SvgPathImage)
    out = OUT_DIR / f"{name}.svg"
    img.save(str(out))
    print(f"{out.relative_to(OUT_DIR.parent.parent)} -> {url}")
