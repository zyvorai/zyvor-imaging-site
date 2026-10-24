# Releases

**Engineering release · Synthetic data only · Not for diagnostic use.**

The files are on the [GitHub Releases page](https://github.com/zyvorai/zyvor-imaging-site/releases). **Ignore GitHub's automatic "Source code" links:** this repository holds no application source.

## What is in a release

| File | For | What it is |
|---|---|---|
| `Zyvor-Imaging-<version>.dmg` | Doctors on a Mac | The Mac app. Signed with a Developer ID and notarized by Apple. Drag it into Applications. |
| `zyvor-imaging-binary-<version>-<date>.zip` | Mac or Windows laptop, offline | The archive for Docker Desktop: the application image (`image/zyvor-imaging.tar`), a Compose file and double-click installers (`scripts/mac-install.command`, `scripts/win-install.cmd`). It needs **no registry access and no token.** |
| `zyvor-imaging-<version>.sbom.cdx.json` | IT and security reviewers | A **CycloneDX** software bill of materials (available from 0.3.0). |
| Container image | IT | `ghcr.io/zyvorai/zyvor-imaging:<version>` (and `latest`). Public. `linux/amd64` and `linux/arm64`. |

## Versions

| Version | Release | Notes |
|---|---|---|
| **0.3.1** (latest) | [v0.3.1-binary.1](https://github.com/zyvorai/zyvor-imaging-site/releases/tag/v0.3.1-binary.1) | Security and robustness patch. No new features. **Replaces 0.3.0 for everyone.** |
| 0.3.0 | [v0.3.0-binary.1](https://github.com/zyvorai/zyvor-imaging-site/releases/tag/v0.3.0-binary.1) | Mac app and binary evaluation: wrong-patient radar, image checks, de-identified export, filters, optional AI helpers. |
| 0.2.0 | [v0.2.0-binary.1](https://github.com/zyvorai/zyvor-imaging-site/releases/tag/v0.2.0-binary.1) | First Mac app and binary evaluation. |

What changed in each: [What's new](WHATS-NEW.md).

## Verify the Mac DMG

Because the DMG is signed and notarized, macOS can check it for you. In Terminal, in the folder you downloaded it to:

```sh
spctl -a -t open --context context:primary-signature -vv Zyvor-Imaging-<version>.dmg
```

A good download says **`accepted`** and **`source=Notarized Developer ID`**, with the origin `Developer ID Application: ZYVORAI LABS PRIVATE LIMITED (NX667LTDQ2)`. To confirm Apple's notarization ticket is attached:

```sh
xcrun stapler validate Zyvor-Imaging-<version>.dmg
```

which should print **`The validate action worked!`**. If either check fails, delete the file, download it again from the Releases page, and tell [security@zyvor.dev](mailto:security@zyvor.dev) if it still fails.

## Read the software bill of materials

```sh
python3 -c "import json,sys; d=json.load(open(sys.argv[1])); print(d['bomFormat'], d['specVersion'], len(d['components']), 'components')" zyvor-imaging-<version>.sbom.cdx.json
```

Any CycloneDX-aware tool (for example a dependency scanner) can read the same file.

## Pull the image

```sh
docker pull ghcr.io/zyvorai/zyvor-imaging:<version>
```

The image is public, so no login or token is needed.
