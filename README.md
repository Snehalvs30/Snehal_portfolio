# Snehal Shinde – Portfolio

Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + Motion + Lenis.

## Run it locally

You need Node.js 20.9 or newer (`node -v` to check).

```bash
npm install      # downloads the libraries (first time only)
npm run dev      # starts the site at http://localhost:3000
```

Other commands:

```bash
npm run lint     # check code for problems
npm run build    # production build (what Vercel runs)
npm run start    # serve the production build locally
```

## Where to edit things

| I want to change…                   | Edit this                                   |
| ----------------------------------- | ------------------------------------------- |
| Any text, link, job, project, skill | `data/content.ts`                           |
| Colors                              | the `:root` block in `app/globals.css`      |
| Fonts                               | `app/layout.tsx`                            |
| The résumé PDF                      | replace `public/Snehal-Shinde-Resume.pdf`   |
| Project screenshots                 | add images to `public/projects/`, then set `image` in `data/content.ts` |

Search `data/content.ts` for `TODO` to find every placeholder (GitHub links,
demo links, screenshots, your final site URL).

## Contact form (one-time setup)

The form on the Contact section sends messages to your inbox through
**Web3Forms**, a free service, so your email address never appears on the page.

1. Go to web3forms.com, enter **snehalshinde3028@gmail.com**, and they email
   you an **access key**.
2. In the project folder, copy `.env.example` to a new file named `.env.local`
   and paste the key after `NEXT_PUBLIC_WEB3FORMS_KEY=`.
3. Restart `npm run dev`, then send yourself a test message.
4. On Vercel: Project → Settings → Environment Variables → add
   `NEXT_PUBLIC_WEB3FORMS_KEY` with the same key, then redeploy.

Until a key is added, the form shows a friendly message asking visitors to use
"Send me an email" instead.

## Folder structure

```
snehal-portfolio/
├── app/
│   ├── globals.css        colors, base styles, reduced-motion rules
│   ├── icon.svg           browser tab icon
│   ├── layout.tsx         fonts, metadata, theme script, smooth scroll
│   └── page.tsx           puts the sections in order
├── components/
│   ├── Hero.tsx           name, typing quote, rotating role, profile links
│   ├── WhatIDo.tsx        "I build software, ship it fast..." statement
│   ├── Experience.tsx     sideways experience & education timeline
│   ├── Projects.tsx       pinned project name + scrolling pictures
│   ├── Expertise.tsx      bento cards with live visuals and ink-spread hover
│   ├── ThisIsMe.tsx       "This is me." zoom + developing photo
│   ├── About.tsx          (not on the page right now)
│   ├── Contact.tsx        form, hidden email, links, live local time
│   ├── StackSection.tsx   makes each section slide over the previous one as you scroll
│   ├── SectionLabel.tsx   small spaced label at the top of sections
│   ├── SectionHeading.tsx shared heading (used by About)
│   ├── NavLink.tsx        smooth in-page links that also move focus
│   ├── SmoothScroll.tsx   Lenis + Motion reduced-motion setup
│   └── icons.tsx          small inline SVG icons
├── data/
│   └── content.ts         ALL site content
├── public/
│   ├── Snehal-Shinde-Resume.pdf
│   ├── about/snehal.jpg   your film-grain photo
│   └── projects/          project pictures (sample-*.svg are placeholders)
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Deploy

1. Create an empty repository on github.com (no README).
2. In this folder:

```bash
git init
git add .
git commit -m "First version of portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

3. Go to vercel.com, sign in with GitHub, click **Add New → Project**, pick the
   repo, and click **Deploy**. No settings need changing.
4. Copy your new URL into `site.siteUrl` in `data/content.ts`, then:

```bash
git add .
git commit -m "Set site URL"
git push
```

Every push to `main` redeploys automatically.
