# What's new

**Engineering release · Synthetic data only · Not for diagnostic use.**

## Coming: the advanced research viewer (development build, not yet released)

Not in the 0.3.2 download. See [The advanced research viewer](VIEWER.md) for what it does and what has not been checked.

- MPR with a shared crosshair and tiltable planes; 3D volume rendering and projections with a clip box.
- Several series side by side with hanging protocols and scrolling linked by position.
- Measurements and segments that are saved with the series, and DICOM Segmentation and Structured Report output.
- Still a research viewer, synthetic data only, not for diagnostic use.

## 0.3.1: security and robustness patch

0.3.1 has **no new features** compared with 0.3.0 and **replaces it for everyone.**

- Dependencies were raised to clear security-audit findings.
- Shared PostgreSQL backup and restore handle the new AI-assisted report column; backups made before it still restore.
- The container image `ghcr.io/zyvorai/zyvor-imaging:0.3.1` is public (`linux/amd64` and `linux/arm64`) and `latest` points to it.
- A CycloneDX software bill of materials is attached to the release.

## 0.3.0: safer sharing, fewer surprises

- **Wrong-patient radar.** Prior studies per patient ID, a warning when one ID carries several names, a "Name differs" filter and a badge.
- **Image checks** for CT, MR and radiography, plus a warning when text looks burned into the picture. Plain-language technical checks, not diagnoses.
- **De-identified export** of one study or a hand-picked group, with leak, burned-in text (optional OCR) and free-text checks. Not a certified de-identification.
- **Worklist** date and tag filters, multi-select and a thumbnail grid.
- **Optional AI helpers** (off by default; they need a model your IT team runs): plain-language search, find by meaning, similar studies and a report drafting aid. Suggestions only, labelled, never inserted automatically. Tested with stub endpoints only.
- **Mac app:** prior studies, the wrong-patient banner, listed-study export and the optional AI helpers.
- **Mac app and binary evaluation** (DMG plus laptop zip), and the public container image.

## 0.2.0: first Mac app and binary evaluation

- The first Mac DMG and the first binary (Docker Desktop) zip, so evaluation no longer needs a registry token.

See the [Gallery](GALLERY.md) for the screens, and [Releases](RELEASES.md) for the files.
