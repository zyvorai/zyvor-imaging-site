# Security policy

## Reporting a vulnerability

Email **[security@zyvor.dev](mailto:security@zyvor.dev)**. Please do **not** open a public issue for a vulnerability.

Include what you found, where (the Mac app, the laptop zip, the container image or the website), the version, and the steps to reproduce it. **Do not include patient data, real images or credentials** in a report.

## Scope

- The evaluation releases published here: the Mac DMG, the binary zip and the container image `ghcr.io/zyvorai/zyvor-imaging`.
- This website and the files in this repository.

There is no application source in this repository, so reports about source code cannot be handled here; send them by email and we will route them.

## Supported versions

Security fixes ship in the newest evaluation release. **Use 0.4.0 or later; 0.3.1 and earlier are withdrawn.** Check the [latest release](https://github.com/zyvorai/zyvor-imaging-site/releases/latest).

## What to expect

Zyvor Imaging is an engineering / evaluation release built and tested with synthetic data only. See the [security overview](docs/SECURITY-OVERVIEW.md) for the controls in place and what is not claimed.
