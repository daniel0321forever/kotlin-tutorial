# Kotlin Tutorial

**Live site:** https://kotlin-tutorial-theta.vercel.app/

An interactive, self-paced Kotlin learning website built with Next.js 16 and Tailwind CSS 4. Progress is tracked locally in the browser — no account or backend required.

## What's inside

The site covers **16 lessons** across three tiers:

| Level | Topics |
|---|---|
| **Beginner** | Hello Kotlin, Variables & Types, Functions, Control Flow, Null Safety |
| **Intermediate** | Classes & Objects, Inheritance, Data Classes, Collections, Lambdas, Extension Functions, Sealed Classes |
| **Advanced** | Generics, Coroutines, DSL Building, Delegation |

Each lesson is a structured page of prose, code examples with syntax highlighting, tip callouts, and bullet lists. A progress bar on the home page shows how many lessons you have completed, and each lesson has a "Mark Complete" button that saves state to `localStorage`.

### Tech stack

- **Next.js 16** (App Router) with TypeScript
- **React 19**
- **Tailwind CSS 4**
- Lesson content is plain TypeScript data files in `app/lib/lessons/` — no CMS or database

## Project structure

```
app/
  lib/lessons/          # Lesson content (beginner.ts, intermediate.ts, advanced.ts)
  components/           # Shared UI components
    BlockRenderer.tsx   # Renders paragraphs, code blocks, notes, lists
    CodeBlock.tsx       # Syntax-highlighted code viewer
    LessonGrid.tsx      # Home-page card grid with completion state
    LessonSidebar.tsx   # In-lesson navigation sidebar
    MarkCompleteButton.tsx
    ProgressBar.tsx
  lesson/[slug]/        # Dynamic lesson page
  page.tsx              # Home page
  layout.tsx
```

## Local development

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads on save.

Other useful commands:

```bash
npm run build    # Production build
npm run start    # Serve the production build locally
npm run lint     # Run ESLint
```

## Deploying

### Vercel (recommended)

The easiest one-click option:

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — leave all settings at their defaults.
4. Click **Deploy**. Vercel gives you a public HTTPS URL immediately.

Every push to `main` triggers an automatic redeploy.

### Self-hosted (Node.js server)

```bash
# 1. Build the app
npm run build

# 2. Start the production server (listens on port 3000 by default)
npm run start

# Override the port if needed
PORT=8080 npm run start
```

Put a reverse proxy (nginx, Caddy, etc.) in front of it to handle TLS and custom domains.

### Self-hosted (Docker)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> **Note:** The standalone output mode must be enabled first. Add `output: 'standalone'` to `next.config.ts`:
> ```ts
> const nextConfig: NextConfig = { output: 'standalone' };
> ```

Build and run:

```bash
docker build -t kotlin-tutorial .
docker run -p 3000:3000 kotlin-tutorial
```

### Static export (optional)

If you want a fully static build with no Node.js server (e.g. GitHub Pages, S3, Cloudflare Pages):

1. Add `output: 'export'` to `next.config.ts`.
2. Run `npm run build` — the output is in the `out/` directory.
3. Upload `out/` to any static host.

> Progress is stored in `localStorage` and works the same regardless of hosting method.

## Adding or editing lessons

Lessons live in `app/lib/lessons/beginner.ts`, `intermediate.ts`, and `advanced.ts`. Each lesson is a plain TypeScript object:

```ts
{
  slug: 'my-lesson',          // URL: /lesson/my-lesson
  title: 'My Lesson',
  level: 'Beginner',          // 'Beginner' | 'Intermediate' | 'Advanced'
  description: 'Short summary shown on the home page card.',
  blocks: [
    { type: 'paragraph', text: 'Prose content here.' },
    { type: 'code', title: 'Example', code: `fun main() { println("hi") }` },
    { type: 'note', text: 'Tip or callout text.' },
    { type: 'list', items: ['Point one', 'Point two'] },
  ],
}
```

Add the object to the relevant array and it appears immediately on the home page and gets its own `/lesson/<slug>` route.
