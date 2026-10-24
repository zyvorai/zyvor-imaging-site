# Troubleshooting

**Engineering release · Synthetic data only · Not for diagnostic use.**

Still stuck after this page? Email [sales@zyvor.dev](mailto:sales@zyvor.dev). We are happy to book ten minutes and walk you through it. Never send patient data or passwords by email.

## The Mac says the app cannot be opened

Right-click (or Control-click) the app and choose **Open**, then confirm. You only need to do this the first time.

If the message mentions the app being "damaged" or from an unidentified developer, check that you downloaded the **DMG** from the [Releases](https://github.com/zyvorai/zyvor-imaging-site/releases/latest) page and not a "Source code" archive, and see [how to verify the download](RELEASES.md#verify-the-mac-dmg).

## Docker says it is not running

Open Docker Desktop and wait until the status says it is running (this can take a minute). Then double-click the installer again.

On Windows, also check that WSL2 is enabled for Docker Desktop.

## My browser did not open by itself

Open your browser and go to **<http://127.0.0.1:8080>**. That address is only your own computer.

## I do not know my login

- **Laptop zip:** open `DEMO-LOGIN.txt` in the unzipped folder.
- **Demo link or Mac app against a hosted demo:** reply to our email and we will resend it.

Logins are never published on this repository or on the website.

## The page is blank or stuck

Reload the page, or try another browser (Chrome, Safari or Edge). If it is still stuck, tell us what you clicked last.

## The installer says Python is missing

Python 3 is used once to generate the private login file (standard library only). Install it, then run the installer again. On Windows: `winget install Python.Python.3.12`.

## I downloaded "Source code" and it has nothing to run

GitHub adds "Source code (zip)" and "Source code (tar.gz)" links to every release automatically. This repository holds **no application source**, so those archives only contain the website. Download the **`.dmg`** or the **binary `.zip`** from the list of assets instead.

## I would rather have someone walk me through it

Of course. Email [sales@zyvor.dev](mailto:sales@zyvor.dev) and we will book ten minutes.
