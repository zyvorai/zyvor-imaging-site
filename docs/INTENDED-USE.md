# Intended use and limits

**Engineering release · Synthetic data only · Not for diagnostic use.**

Zyvor Imaging is an **engineering / evaluation release.** This page says plainly what that means.

## What it is

- A **medical imaging archive** that stores original DICOM, a **research viewer** in the browser, **reporting** (drafts, finalisation, immutable revisions) and a **scanner gateway**.
- Something you run on infrastructure you control, and evaluate with **synthetic data**.

## What it is not

| It is not | Meaning |
|---|---|
| A diagnostic workstation | The viewer is a research viewer (from 0.4.0 it includes an MPR / 3D research viewer, see [The advanced research viewer](VIEWER.md)). It is **not validated for diagnostic decisions.** There is no MPR or 3D diagnostic workstation claim. |
| A certified medical product | There is **no clinical validation and no regulatory certification claim** (for example HIPAA, MDR or FDA). |
| A certified de-identification | The de-identified export is a pseudonymised research copy with leak checks. It is **not a certified de-identification.** |
| An AI diagnosis tool | The optional AI helpers are off by default, assist with search and wording only, and never diagnose. Automatic analysis is limited to **technical image checks**. |
| Ready for real patient data | It has been built and tested with **synthetic data only.** Do not load real patient studies into an evaluation, especially a public one. |

## What would be needed for real clinical use

These require real systems and qualified reviewers and are **not** part of this release:

- Clinical diagnostic validation, display and measurement calibration, and the regulatory approval that applies where you are.
- Scanner and independent-viewer acceptance for your specific vendors, beyond the tested protocol exchanges.
- Your own identity-provider integration, role and MFA mappings, account lifecycle and certificate provisioning.
- A deployed, monitored cluster with managed database and object storage, load testing, a security review and recovery drills.

## Always stated alongside

Engineering release. Synthetic data only. Not for diagnostic use. No clinical validation or regulatory certification claim. Research 2D viewer only.

Questions: [sales@zyvor.dev](mailto:sales@zyvor.dev) · [security@zyvor.dev](mailto:security@zyvor.dev)
