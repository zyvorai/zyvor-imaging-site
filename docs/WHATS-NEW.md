# What's new

**Engineering release · Synthetic data only · Not for diagnostic use.**

## 0.4.4: India / telerad research patterns

Image only (`ghcr.io/zyvorai/zyvor-imaging:0.4.4`); the Mac app and zip stay at 0.4.0.

- Referring facility on the worklist (from DICOM site tags), TAT age, report templates, and a WhatsApp/SMS-style report notify card you wire to your own webhook — research labelled, not a Meta WhatsApp product.
- Drawn from the India PACS shortlist (Medsynapse, RADSpa, SoftLink, 5C, Nandico, and peers).

## 0.4.3: research gap follow-up

Image only (`ghcr.io/zyvorai/zyvor-imaging:0.4.3`); the Mac app and zip stay at 0.4.0.

- Teaching packs, FHIR ImagingStudy, prior prefetch, critical-result ack, share/collab, smart scrollbar, MPEG DICOM video, GSPS overlays.
- Research PET/CT fusion (same FoR) + SUVbw, free oblique MPR, interactive CPR with cross-cuts, MG/PT-CT hanging, CAD SR overlays, SM overview.
- RT Dose summary JSON and measurement-tracks CSV — research labelled, not planning or diagnostic tools.

## 0.4.2: the live demo shows how to sign in

Image only (`ghcr.io/zyvorai/zyvor-imaging:0.4.2`). The sign-in page of the [live demo](https://demo.zyvor.dev) now shows its read-only login with a button that fills it in, so nobody has to look for it.

## 0.4.1: polish, and a live demo

Image only (`ghcr.io/zyvorai/zyvor-imaging:0.4.1`); the Mac app and zip stay at 0.4.0.

- No error on the sign-in page, three sample orders in the demo, and the image scrolls into view on short windows.
- A **shared live demo** you can open in a browser: [demo.zyvor.dev:8443](https://demo.zyvor.dev:8443), read-only, made-up studies, reset every night. The login is on the [website](https://zyvorai.github.io/zyvor-imaging-site/#live).
- Three [tutorials](tutorials/README.md) with recorded animations.

## 0.4.0: the advanced research viewer

New in 0.4.0; not in 0.3.2. See [The advanced research viewer](VIEWER.md) for what it does and what has not been checked.

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
