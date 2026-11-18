import type { IProject } from '@/interfaces/project.interface';

// Sourced from github.com/LautaroJSON — keep `id`s in sync with
// src/content/es/projects.ts (same id, translated description).
// Ordered by relevance for recruiters.
export const PROJECTS: IProject[] = [
  {
    id: 'randomplay',
    name: 'RandomPlay',
    description:
      'Ticket booking system for a fictional cinema chain, live end to end: from the movie listings to seat selection and payment. Buyers need no account: an anonymous cart holds the seats for 5 minutes with all-or-nothing reservations, and checkout runs on Mercado Pago Checkout Pro (test credentials) with signed webhooks, one ticket per seat and delivery emails queued through an Outbox. Backend: ASP.NET Core 10 API with hexagonal architecture, EF Core and PostgreSQL, JWT role-based access (RBAC), rate limiting and integration tests with Testcontainers, deployed on Render with Supabase. Frontend: Next.js 16 on Vercel. The movie listings and movie pages are indexable and revalidated every 60 seconds; the purchase flow covers seat selection, a cart with a countdown synced to the server clock, payment (the site never asks for card details) and a payment status page that shows each ticket with a tear-off stub. Typed API client generated from OpenAPI, unit and component tests with Vitest and MSW, and Playwright end-to-end tests run with and without JavaScript, including axe accessibility checks.',
    image: '/projects/randomplay.png',
    repoUrl: 'https://github.com/LautaroJSON/cinema-system-randomplay-frontend',
    backendRepoUrl:
      'https://github.com/LautaroJSON/cinema-system-randomplay-backend',
    deployUrl: 'https://cinema-system-randomplay-frontend.vercel.app',
    technologies: [
      'C#',
      'ASP.NET Core',
      'EF Core',
      'PostgreSQL',
      'Next.js',
      'TypeScript',
      'Mercado Pago',
      'Vitest',
      'Playwright',
      'Testcontainers',
    ],
  },
  {
    id: 'thinking-notes',
    name: 'Thinking Notes',
    description:
      'Notes PWA built with React, TypeScript and Vite, with Google sign-in through Supabase Auth. The NestJS backend (separate repository) validates Supabase JWTs, stores data in PostgreSQL through Prisma and validates input with class-validator.',
    image: '/projects/thinking-notes.png',
    repoUrl: 'https://github.com/LautaroJSON/thinking-notes',
    backendRepoUrl: 'https://github.com/LautaroJSON/thinking-notes-backend',
    deployUrl: 'https://lautarojson.github.io/thinking-notes/',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Supabase',
    ],
  },
  {
    id: 'calorie-tracker',
    name: 'Calorie Tracker',
    description:
      'Local-first calorie tracker built with React Native and Expo. It runs entirely on the device, with no backend or account: it calculates a daily calorie goal from the user profile, logs food and exercise, and stores everything with AsyncStorage. Android releases are automated with GitHub Actions and EAS.',
    image: '/projects/calorie-tracker.png',
    repoUrl: 'https://github.com/LautaroJSON/calorie-tracker',
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Jest',
      'GitHub Actions',
      'EAS',
    ],
  },
  {
    id: 'landing-primavera',
    name: 'Festival de la Primavera',
    description:
      'One-page landing for a fictional event, built as a design and development portfolio piece: GSAP parallax hero, an interactive Leaflet map lazy-loaded on scroll, and full keyboard navigation.',
    image: '/projects/landing-primavera.png',
    repoUrl: 'https://github.com/LautaroJSON/landing-primavera',
    deployUrl: 'https://lautarojson.github.io/landing-primavera/',
    technologies: ['Astro', 'Tailwind CSS', 'GSAP', 'Leaflet'],
  },
  {
    id: 'mundial-al-dia',
    name: 'mundial-al-dia',
    description:
      'World Cup 2026 match tracker running on Cloudflare Workers with Hono. Pages are rendered on the server with JSX, match data comes from the football-data.org API, and responses are cached with the Workers Cache API.',
    image: '/projects/mundial-al-dia.png',
    repoUrl: 'https://github.com/LautaroJSON/mundial-al-dia',
    deployUrl: 'https://mundial-al-dia.fernandez-n-lautaro.workers.dev/',
    technologies: ['Cloudflare Workers', 'Hono', 'TypeScript'],
  },
  {
    id: 'blog-cafe-front',
    name: 'Café con Leche',
    description:
      'SEO-focused blog built with Astro: static site generation, MDX content, automated RSS feed and sitemap.',
    image: '/projects/blog-cafe-front.png',
    repoUrl: 'https://github.com/LautaroJSON/blog-cafe-front',
    deployUrl: 'https://caffe-pig-blog.netlify.app/blog/',
    technologies: ['Astro', 'MDX'],
  },
  {
    id: 'contabilid-app',
    name: 'Contabilidapp',
    description:
      'Minimal frontend for simple bookkeeping: a balance overview, an entry list and a modal form, built with React, TypeScript and Tailwind CSS.',
    image: '/projects/contabilid-app.png',
    repoUrl: 'https://github.com/LautaroJSON/contabilid-app',
    deployUrl: 'https://contabilidapp.netlify.app/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'pc-web-debut',
    name: 'Interactive Desktop Web Application',
    description:
      'Web app that recreates a desktop operating system in the browser, with a window system to present content. Built with React, TypeScript and Vite.',
    image: '/projects/pc-web-debut.png',
    repoUrl: 'https://github.com/LautaroJSON/pc-web-debut',
    technologies: ['React', 'TypeScript', 'Vite'],
  },
];
