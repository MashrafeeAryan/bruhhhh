# Just breathe.

A static portfolio with a transparent puppy header, typing headline, and six floating objects linking to dedicated work pages.

## Pages

- GPU Computing: NVIDIA MatX, AMD Iris, CUDA Neural Network Engine, RunOnGPU
- AI & ML: Microsoft × Cornell Break Through Tech / Pulse2BP, Chexsa, neural-network learning
- Rust: CrabShell
- MLH: Apache Arrow / Parquet contributions
- Projects: CampCrunch, RunOnGPU, Chexsa
- Research: ASU contact-angle work and the RSC review publication

The six pages contain 17 entries, including projects featured in more than one relevant section. LeetCode practice links to the public practice repository in the footer.

## Edit and build

Content lives in `portfolio.json`. Update titles, problem statements, contributions, outcomes, links, and PR statuses there. Then run:

```sh
node build.mjs
node check.mjs
```

The generator writes the homepage and six directory index pages. Commit the generated HTML along with the source. No dependencies or build service are needed for hosting. `app.js` adds typing, pointer tilt, and GPU-page filters. Navigation, case studies, and links work without JavaScript.

To preview locally:

```sh
python -m http.server 8080
```

GitHub Pages serves `main` from the repository root at https://mashrafeearyan.github.io/bruhhhh/.

## Add another section

Add an entry to `portfolio.json` with a unique id, name, accent, intro, image, and cases, then rerun the generator. The homepage wraps additional items into new rows. Each case has a problem, contribution, result, and optional public links.

Homepage GPU, Rust, and MLH artwork currently uses `assets/objects.png`, a transparent sprite sheet. AI, Projects, and Research have separate transparent images. Motion is CSS/JavaScript applied to rendered artwork, rather than WebGL models. Reduced-motion preferences are respected.

## Content and evidence

The supplied résumé informs experience summaries; public repositories and PR descriptions support project details. PR statuses were verified October 18, 2026 and are snapshots, not a live GitHub integration.

- NVIDIA MatX: https://github.com/NVIDIA/MatX/pull/1224 (merged), /1227 (merged), /1265 (open)
- AMD Iris: https://github.com/ROCm/iris/pull/581 (draft)
- Arrow: https://github.com/apache/arrow/pull/52580 (draft); #52579 is the earlier closed submission, not an additional achievement
- Pulse2BP: https://github.com/Break-Through-Tech/Microsoft-1A-educational-blood-pressure-estimation
- CrabShell: https://github.com/MashrafeeAryan/CrabShell
- RSC publication: https://pubs.rsc.org/en/content/articlehtml/2026/lp/d5lp00380f

Performance claims are scoped to their source: the 704× CUDA result is a project benchmark against its own single-threaded CPU implementation, not a general framework comparison. Résumé-reported experiment and application metrics are labeled accordingly. No unverified final Pulse2BP model score is claimed. Private research code has not been published or linked.

The publication is listed separately from the ASU internship. The original résumé PDF, phone number, and email have not been uploaded.

## Artwork

Assets were made with OpenAI's built-in image generation tool:

- `assets/dog.png`: background removal from the supplied puppy photo, preserving its identity and fur with alpha transparency.
- `assets/objects.png`: NVIDIA GPU, orange Rust crab, colorful MLH badge on a transparent sheet.
- `assets/ai.png`: polished ice-blue glass neural-network sculpture, silver filaments, transparent background.
- `assets/projects.png`: silver/lavender 3D developer folder with floating code tiles, transparent background.
- `assets/research.png`: white ceramic and silver microscope with violet glass, transparent background.

New icon prompts requested a centered individual object, ample clear padding, restrained rim lighting, no floor, no cast shadow, no words, and actual alpha transparency. Case-study graphics are illustrative interface diagrams, not measured experimental plots.

## Validation

`node check.mjs` verifies local links, generated-page structure, asset references, and required case-study fields. Desktop and 390px mobile checks covered section navigation, case-study expansion, and NVIDIA/AMD filtering. The site has no analytics, account system, or backend.
