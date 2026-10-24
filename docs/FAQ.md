# FAQ

**Engineering release · Synthetic data only · Not for diagnostic use.**

### Is this for diagnosis?
No. The browser viewer is a **research viewer for evaluation**. It is not a certified diagnostic workstation. See [Intended use and limits](INTENDED-USE.md).

### Where does the software live?
The product repository is private. This repository is the public website surface and hosts the evaluation releases (Mac DMG, binary zip, software bill of materials), screenshots and contact details. There is **no application source** here.

### How do we evaluate?
Ask [sales](mailto:sales@zyvor.dev?subject=Zyvor%20Imaging%20demo%20access) for a hosted demo (browser only), download the Mac DMG (drag to Applications), or use the binary zip (Docker Desktop plus a double-click installer). Ignore the automatic "Source code" archives. Passwords are never published; sales sends logins privately. Step by step: [Getting started](GETTING-STARTED.md).

### I am a doctor. What do I click?
Fastest: email sales for a hosted link. On a Mac: download the DMG, drag **Zyvor Imaging** into Applications, open it, and paste the web address and password from the sales email. Then try: Worklist, open a study, research viewer. Synthetic data only; not for diagnosis.

### Do I have to install anything?
Not for the demo link: it opens in your browser. The Mac app is a normal drag-to-Applications install. Only the "run it on my own PC" option needs Docker Desktop, once.

### Can I try it with my own patients' images?
Please do not. This is an engineering release tested with synthetic data. Use the sample studies, or ask us for more synthetic ones.

### What do the AI features do, and are they on?
They are **off** unless your IT team connects a model they run. They help with search and wording, never with diagnosis, and nothing is saved until you press **Insert**. Suggestions are labelled as such. They have been tested with stub endpoints only.

### Is the de-identified export certified?
No. It produces a pseudonymised research copy and checks for leftover names, identifiers and burned-in text, but it is **not a certified de-identification.** Please review the preview every time.

### Which platforms does it run on?
The Mac app runs on a Mac. The laptop zip runs on a Mac or Windows PC with Docker Desktop. The image is published for `linux/amd64` and `linux/arm64`, so it also runs on servers and clusters. On Apple-silicon Macs the zip's `linux/amd64` image runs through emulation.

### How do I give feedback?
Email [sales@zyvor.dev](mailto:sales@zyvor.dev?subject=Zyvor%20Imaging%20evaluation%20feedback). Tell us what confused you; that is the most useful thing. Feedback issues on GitHub are welcome too, without any patient data (see [CONTRIBUTING](../CONTRIBUTING.md)).

### Who do we contact?
[sales@zyvor.dev](mailto:sales@zyvor.dev) for evaluations and [security@zyvor.dev](mailto:security@zyvor.dev) for security.
