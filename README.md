# AllRange Design Website

Official website for AllRange Design (樂橙設計), a professional spatial design and curation studio.
This project is built with **Next.js 15**, **Tailwind CSS v4**, and **Framer Motion**.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev)
- **Deployment**: GitHub Pages

## Project Structure

- `src/app`: App directory (Next.js 13+).
- `src/components/sections`: Landing page sections (Hero variations, About, etc.).
- `public/images`: Static assets (placeholders, logos).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/allrange.tw](http://localhost:3000/allrange.tw) with your browser to see the result (Note the `basePath`).

## Deployment (GitHub Pages)

This project is configured to deploy automatically to GitHub Pages via GitHub Actions.

1.  Push changes to `main` branch.
2.  The workflow `.github/workflows/deployment.yml` will trigger.
3.  The static export is built and deployed to the `gh-pages` branch.
4.  Site is live at: `https://[username].github.io/allrange.tw/`

### Important Note on Images
Since the site is hosted on a subdirectory (`/allrange.tw`), all static assets (images) must be referenced with this prefix, e.g., `/allrange.tw/images/foo.png`.

## Credits

Designed and Developed for AllRange Design.
