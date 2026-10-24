# Getting started

**Engineering release · Synthetic data only · Not for diagnostic use.**

## Before you start

- Use **synthetic data only.** Please do not load real patient images into an evaluation.
- The viewer is for **research and evaluation, not for diagnosis.**
- Your username, password and web address arrive **by email**. They are never published, here or on the website.

## Pick one way to try it

### 1. Open a demo link (easiest, about 2 minutes, nothing to install)

1. [Email us](mailto:sales@zyvor.dev?subject=Zyvor%20Imaging%20demo%20access&body=Hello%2C%20please%20send%20me%20a%20demo%20link%20and%20login.%20My%20role%20is%3A%20(doctor%20%2F%20technologist%20%2F%20IT)). We send a web link, a username and a password.
2. Open the link in Chrome, Safari or Edge and sign in.
3. You land on the Overview. Go to [your 10-minute test](#your-10-minute-test).

### 2. Mac app (about 5 minutes)

1. Open the [latest release](https://github.com/zyvorai/zyvor-imaging-site/releases/latest) and download **`Zyvor-Imaging-<version>.dmg`**. Pick the DMG, **not** "Source code".
2. Open the disk image and drag **Zyvor Imaging** onto **Applications**.
3. Open the app. If macOS says it cannot be opened, see [Troubleshooting](TROUBLESHOOTING.md#the-mac-says-the-app-cannot-be-opened).
4. Paste the web address from our email and sign in with the username and password we sent.

The DMG is signed and notarized by Apple. To check it yourself, see [Releases](RELEASES.md#verify-the-mac-dmg).

### 3. Run it on your own PC (Mac or Windows, about 15 minutes the first time)

Use this when you have no internet, or want the archive on your own machine.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) **once**, then start it and wait until it says it is running. On Windows, enable WSL2.
2. Download the **binary zip** (`zyvor-imaging-binary-<version>-<date>.zip`) from the [latest release](https://github.com/zyvorai/zyvor-imaging-site/releases/latest) and unzip it. It carries the application image, so it needs **no registry access and no token.**
3. Double-click the installer for your computer:
   - **Mac:** `scripts/mac-install.command`
   - **Windows:** `scripts/win-install.cmd`
4. Your browser opens at <http://127.0.0.1:8080> (an address that only your own computer can reach). The login is in the file **`DEMO-LOGIN.txt`** in the unzipped folder.

To stop it later: `docker compose -f compose.release.yaml down`

> Python 3 is needed only to generate the private login file (standard library only, no pip). On Windows: `winget install Python.Python.3.12` if it is missing.

### For IT teams

The same image can be pulled from the registry (`ghcr.io/zyvorai/zyvor-imaging`, public, `linux/amd64` and `linux/arm64`), run with Compose or Helm, or installed with one command on k3s/Kubernetes (NodePort token login, or an Envoy + Keycloak HTTPS edge). Both cluster options auto-seed synthetic studies. Ask [sales](mailto:sales@zyvor.dev?subject=Zyvor%20Imaging%20cluster%20evaluation) for the deployment documentation that goes with your evaluation.

## Your 10-minute test

Tick these off as you go. They need version 0.3.0 or newer; if you were sent a demo link, ask which version it runs.

**Look around (3 minutes)**

- [ ] **Overview.** See the study counts and the tiles that say what needs attention.
- [ ] **Study worklist.** Try the search box, then switch between the list and the picture grid.
- [ ] **Open a study.** Scroll through the images and drag to change brightness (window/level).

**Try the safety features (4 minutes)**

- [ ] Find a small amber badge such as **1 check** or **name differs** on the worklist and click it.
- [ ] In the study view, read the **Image checks** panel and the **Prior studies** list. Does it tell you what you would expect?
- [ ] If your role allows it (radiologist or admin), press **De-identified...**, read the preview, and download the pseudonymised copy.

**Tell us (3 minutes)**

- [ ] If your role allows it, type a short draft report and save it.
- [ ] Write down anything that confused you, was slow, or that you expected and did not find.
- [ ] [Send it to us](mailto:sales@zyvor.dev?subject=Zyvor%20Imaging%20evaluation%20feedback&body=What%20I%20tried%3A%0A%0AWhat%20confused%20me%3A%0A%0AWhat%20I%20expected%20and%20did%20not%20find%3A%0A%0AMy%20role%20(doctor%20%2F%20technologist%20%2F%20IT)%3A). Short and honest is perfect.

## Next

- Something not working? [Troubleshooting](TROUBLESHOOTING.md)
- Questions about what it is and is not? [Intended use and limits](INTENDED-USE.md) · [FAQ](FAQ.md)
