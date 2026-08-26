import type { IProject } from '@/interfaces/project.interface';

// Origen: github.com/LautaroJSON — mantener los `id` sincronizados con
// src/content/en/projects.ts (mismo id, descripción traducida).
export const PROJECTS: IProject[] = [
  {
    id: 'landing-primavera',
    name: 'Festival de la Primavera',
    description:
      'Landing de una sola página para un evento ficticio, pensada como pieza de portfolio de diseño/desarrollo: hero con parallax en GSAP, mapa interactivo con Leaflet cargado de forma diferida al hacer scroll, y navegación completa por teclado.',
    image: '/projects/landing-primavera.png',
    repoUrl: 'https://github.com/LautaroJSON/landing-primavera',
    deployUrl: 'https://lautarojson.github.io/landing-primavera/',
    technologies: ['Astro', 'Tailwind CSS', 'GSAP', 'Leaflet'],
  },
  {
    id: 'thinking-notes',
    name: 'Thinking Notes',
    description:
      'PWA minimalista de notas hecha con React, TypeScript y Vite. El backend vive en un repo aparte (github.com/LautaroJSON/thinking-notes-backend), hecho con NestJS, Prisma y autenticación JWT de Supabase sobre PostgreSQL.',
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
      'Tracker de partidos en vivo del Mundial 2026, server-rendered sobre Cloudflare Workers con Hono, con datos en tiempo real de football-data.org y caché en KV.',
    image: '/projects/mundial-al-dia.png',
    repoUrl: 'https://github.com/LautaroJSON/mundial-al-dia',
    deployUrl: 'https://mundial-al-dia.fernandez-n-lautaro.workers.dev/',
    technologies: ['Cloudflare Workers', 'Hono', 'TypeScript'],
  },
  {
    id: 'contabilid-app',
    name: 'Contabilidapp',
    description:
      'Frontend minimalista para llevar una contabilidad simple: resumen de balance, listado de movimientos y formulario modal, hecho con React, TypeScript y Tailwind CSS.',
    image: '/projects/contabilid-app.png',
    repoUrl: 'https://github.com/LautaroJSON/contabilid-app',
    deployUrl: 'https://contabilidapp.netlify.app/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'pc-web-debut',
    name: 'Interactive Desktop Web Application',
    description:
      'Aplicación web interactiva que simula un entorno de escritorio, con sistema de ventanas modales para mostrar el lore de un personaje de un creador de contenido.',
    repoUrl: 'https://github.com/LautaroJSON/pc-web-debut',
    technologies: ['React', 'TypeScript', 'Vite'],
  },
  {
    id: 'blog-cafe-front',
    name: 'Café con Leche',
    description:
      'Blog optimizado para SEO hecho con Astro, con Lighthouse perfecto: generación estática, contenido en MDX, RSS automático y sitemaps dinámicos.',
    image: '/projects/blog-cafe-front.png',
    repoUrl: 'https://github.com/LautaroJSON/blog-cafe-front',
    deployUrl: 'https://caffe-pig-blog.netlify.app/blog/',
    technologies: ['Astro', 'MDX'],
  },
];
