# Security overview

**Engineering release · Synthetic data only · Not for diagnostic use.**

A summary of the controls you can point at in an evaluation, and, just as important, what this release does **not** claim. To report a vulnerability, read [SECURITY.md](../SECURITY.md).

## Controls

| Area | What is in place |
|---|---|
| **Roles** | Named roles enforced on the server. Optional TOTP. |
| **Browser sessions** | HttpOnly cookies, `Secure` when TLS terminates at the edge, `SameSite`, and hashed session identifiers on the server. |
| **Mutations** | State-changing requests are origin-checked. |
| **Organisation sign-in** | OIDC authorization code flow with **PKCE (S256)**, `state`, `nonce` and verified RS256 claims. Requiring an MFA claim is configurable. Organisation sign-in is available on the k3s edge. |
| **Scanner gateway** | A calling-AE allowlist, and TLS for non-loopback listeners. |
| **DICOM archive** | Original bytes stored unchanged, UID hierarchy checks, duplicate handling and integrity scans on your volume or bucket. |
| **Objects** | Immutable write path with **checksum verification on read.** Portable backup tooling for local and shared backends. |
| **Audit** | Activity is recorded in an audit trail, with an integrity check you can run from the app. |
| **Supply chain** | Every release ships a **CycloneDX software bill of materials**, and dependencies were raised to clear security-audit findings in 0.3.1. See [Releases](RELEASES.md). |

## What this release does not claim

- **No certification.** There is no HIPAA, MDR, FDA or similar certification claim, and no clinical validation. See [Intended use and limits](INTENDED-USE.md).
- **Login throttling is per application process.** Put rate limits on your ingress and identity provider as well.
- **MFA depends on your identity provider** truthfully issuing the required signed claim.
- **Operators with database or object-store control can rewrite data and hashes.** The audit chain is a local integrity check; it is not signed by an external party.
- **Your environment matters.** Secrets, TLS, encryption at rest, bucket permissions, database administration, OS and container patching, off-site backups, capacity, retention, monitoring and incident response all need real operational configuration on your side.
- **Do not load real patient data into an evaluation.** Original DICOM can carry identifiers in metadata, private fields and burned-in pixels.

## Reporting a vulnerability

Email **[security@zyvor.dev](mailto:security@zyvor.dev)**. Please do not include patient data, real images or credentials, and do not open a public issue for a vulnerability. Details: [SECURITY.md](../SECURITY.md).
