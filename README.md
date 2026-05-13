# OG Vanguard — Singapore community

A small React site for the **Singapore OG (Classic) Cardfight!! Vanguard** community: local cardshops, creators, buy links, meta pointers, other SG OG groups, and a playful **Feeling lucky** twin-drive mini page.

**Repository:** [github.com/Caden0002/OGVanguard](https://github.com/Caden0002/OGVanguard)

## Stack

- [React](https://react.dev/) 19 · [Vite](https://vite.dev/) 8
- [React Router](https://reactrouter.com/) 7
- [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`)

## Scripts

| Command        | Description                |
| -------------- | -------------------------- |
| `npm run dev`  | Local dev server (Vite)    |
| `npm run build`| Production build → `dist/` |
| `npm run preview` | Serve `dist` locally    |
| `npm run lint` | ESLint                     |

## Routes

| Path            | Page                                      |
| --------------- | ----------------------------------------- |
| `/`             | Home (shops, groups, creators, buy, meta) |
| `/feelinglucky` | “Feeling lucky · Twin drive” simulation |

Client-side routing is configured for hosting with a SPA fallback (see `netlify.toml`).

## Project layout

- `src/content.js` — Copy, external URLs, and lists (shops, influencers, OG groups, nav).
- `src/pages/` — `HomePage`, `FeelingLuckyPage`.
- `src/components/` — Layout and sections (`SiteHeader`, `SiteFooter`, etc.).
- `public/` — Static assets (logos, card images, `.mov` clips for Feeling lucky).

## Local setup

```bash
git clone https://github.com/Caden0002/OGVanguard.git
cd OGVanguard
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Deploy

Production build:

```bash
npm run build
```

The repo includes **Netlify** redirect rules so deep links (e.g. `/feelinglucky`) resolve to the SPA. Point the Netlify publish directory to `dist` after `npm run build`, or use Netlify’s Vite preset if you build in CI.

## Disclaimer

The site states it is **not affiliated with Bushiroad**. Card imagery and game terms belong to their respective owners.
