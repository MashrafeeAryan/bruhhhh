# Just breathe.

Minimal interactive portfolio: transparent puppy header icon, a typing “Just breathe.” headline, “I just do stuff.” introduction, and floating GPU, Rust, and MLH objects with large readable titles.

## Run locally

No build or dependencies required. Serve this directory with any static HTTP server (for example `python -m http.server 8080`) and open http://localhost:8080.

## Add interests

Edit `interests.js`. Each entry supplies its name, category, caption, detail copy, destination link, accent color, and image. New entries automatically wrap into additional rows. Use `image: 'assets/your-image.png'` for a separate transparent asset and omit `spritePosition`. The first three entries currently use a shared generated transparent artwork sheet, ready to replace later.

## Edit your introduction

Update the introduction and footer in `index.html`. Current interest descriptions are illustrative; no credentials or organizational affiliation are claimed.

## Publish on GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/ (root)**, and save. The expected address is https://mashrafeearyan.github.io/bruhhhh/ (remove the space from the username). GitHub displays the verified live URL after deployment.

## Features

- Responsive grid that grows with more entries
- Floating artwork, pointer tilt, and GPU hover glow
- Click/tap detail panels, keyboard focus and Escape-to-close
- Reduced-motion support
- Relative paths for GitHub Pages project hosting

Artwork was generated using OpenAI's built-in image generation tool. Motion uses CSS and JavaScript over rendered images, rather than WebGL models. Brand imagery is illustrative. No analytics or backend is included.

`assets/dog.png` is a transparent cutout generated from the supplied puppy photograph using the built-in image generation tool. Prompt: remove the entire background, preserve the white puppy's identity, face, fur, seated pose and paws, and use clean alpha transparency with no added objects. Typing and floating motion respect reduced-motion preferences.
