# axiomcura.github.io

Personal portfolio website for Erik Serrano.

## How to Update Content

Most site content is managed in [`data/site.json`](data/site.json):

- `profile`: name, title, institution, location, short summary, portrait, and CV link
- `about`: biography paragraphs and quick facts
- `focusAreas`: current research themes
- `software`: software projects, logos, descriptions, and links
- `publications`: publication titles, authors, venues, and URLs
- `skills`: technical skill groups
- `education`: degree history
- `contact`: contact text and links

After editing the JSON file, run the site from a local server so the browser can load `data/site.json`.

## Local Development

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Files

- [`index.html`](index.html): semantic page structure
- [`styles.css`](styles.css): responsive blue professional theme
- [`script.js`](script.js): renders the site from `data/site.json`
- [`data/site.json`](data/site.json): editable portfolio content
- [`images/`](images): profile image and software logos
- [`documents/`](documents): CV and supporting documents

## Deployment

This repository is designed for GitHub Pages. Push changes to the publishing branch configured in GitHub Pages to update the live site.
