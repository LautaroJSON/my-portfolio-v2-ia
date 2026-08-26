import type { IProject } from '@/interfaces/project.interface';

// Sourced from github.com/LautaroJSON — keep `id`s in sync with
// src/content/es/projects.ts (same id, translated description).
export const PROJECTS: IProject[] = [
  {
    id: 'landing-primavera',
    name: 'Festival de la Primavera',
    description:
      'One-page landing for a fictional event, built as a design/dev portfolio piece: a GSAP parallax hero, an interactive Leaflet map lazy-loaded on scroll, and full keyboard navigation.',
    image: '/projects/landing-primavera.png',
    repoUrl: 'https://github.com/LautaroJSON/landing-primavera',
    deployUrl: 'https://lautarojson.github.io/landing-primavera/',
    technologies: ['Astro', 'Tailwind CSS', 'GSAP', 'Leaflet'],
  },
  {
    id: 'thinking-notes',
    name: 'Thinking Notes',
    description:
      'Minimalist notes-taking PWA built with React, TypeScript, and Vite. The backend lives in a separate repo (github.com/LautaroJSON/thinking-notes-backend), built with NestJS, Prisma, and Supabase JWT auth over PostgreSQL.',
    image: '/projects/thinking-notes.png',
    repoUrl: 'https://github.com/LautaroJSON/thinking-notes',
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
    id: 'mundial-al-dia',
    name: 'mundial-al-dia',
    description:
      'Server-rendered live World Cup 2026 match tracker built on Cloudflare Workers with Hono, pulling real-time data from football-data.org with KV caching.',
    image: '/projects/mundial-al-dia.png',
    repoUrl: 'https://github.com/LautaroJSON/mundial-al-dia',
    deployUrl: 'https://mundial-al-dia.fernandez-n-lautaro.workers.dev/',
    technologies: ['Cloudflare Workers', 'Hono', 'TypeScript'],
  },
  {
    id: 'contabilid-app',
    name: 'Contabilidapp',
    description:
      'Minimalist frontend to track simple accounting: a balance overview, an entry list, and a modal form, built with React, TypeScript, and Tailwind CSS.',
    image: '/projects/contabilid-app.png',
    repoUrl: 'https://github.com/LautaroJSON/contabilid-app',
    deployUrl: 'https://contabilidapp.netlify.app/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'pc-web-debut',
    name: 'Interactive Desktop Web Application',
    description:
      "Interactive web app simulating a desktop environment, with a modal window system to showcase a content creator's character lore.",
    repoUrl: 'https://github.com/LautaroJSON/pc-web-debut',
    technologies: ['React', 'TypeScript', 'Vite'],
  },
  {
    id: 'blog-cafe-front',
    name: 'Café con Leche',
    description:
      'SEO-optimized blog built with Astro, scoring a perfect Lighthouse score: static site generation, MDX content, automated RSS feed, and dynamic sitemaps.',
    image: '/projects/blog-cafe-front.png',
    repoUrl: 'https://github.com/LautaroJSON/blog-cafe-front',
    deployUrl: 'https://caffe-pig-blog.netlify.app/blog/',
    technologies: ['Astro', 'MDX'],
  },
];
