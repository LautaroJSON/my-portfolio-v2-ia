import type { IProject } from '@/interfaces/project.interface';

// Origen: github.com/LautaroJSON — mantener los `id` sincronizados con
// src/content/en/projects.ts (mismo id, descripción traducida).
// Ordenados por relevancia para reclutadores.
export const PROJECTS: IProject[] = [
  {
    id: 'randomplay',
    name: 'RandomPlay',
    description:
      'Sistema de reserva de entradas para una cadena de cines ficticia. Backend: API en ASP.NET Core 10 con arquitectura hexagonal, EF Core y PostgreSQL, autenticación JWT con acceso por roles (RBAC), retención de asientos por 5 minutos, reservas todo o nada, rate limiting y tests de integración con Testcontainers. Frontend: Next.js con páginas públicas preparadas para SEO, un cliente de API tipado generado desde OpenAPI y tests end-to-end con Playwright y chequeos de accesibilidad con axe.',
    image: '/projects/randomplay.png',
    repoUrl: 'https://github.com/LautaroJSON/cinema-system-randomplay-frontend',
    backendRepoUrl:
      'https://github.com/LautaroJSON/cinema-system-randomplay-backend',
    // deployUrl: pendiente — todavía no está desplegado.
    technologies: [
      'C#',
      'ASP.NET Core',
      'EF Core',
      'PostgreSQL',
      'Next.js',
      'TypeScript',
      'Playwright',
      'Testcontainers',
    ],
  },
  {
    id: 'thinking-notes',
    name: 'Thinking Notes',
    description:
      'PWA de notas hecha con React, TypeScript y Vite, con inicio de sesión con Google vía Supabase Auth. El backend en NestJS (repositorio aparte) valida los JWT de Supabase, guarda los datos en PostgreSQL con Prisma y valida los datos de entrada con class-validator.',
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
      'Registro de calorías local-first hecho con React Native y Expo. Funciona íntegramente en el dispositivo, sin backend ni cuenta: calcula un objetivo calórico diario a partir del perfil, registra comidas y ejercicio, y guarda todo con AsyncStorage. Los releases de Android están automatizados con GitHub Actions y EAS.',
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
      'Landing de una sola página para un evento ficticio, pensada como pieza de portfolio de diseño y desarrollo: hero con parallax en GSAP, mapa interactivo con Leaflet que se carga al hacer scroll y navegación completa por teclado.',
    image: '/projects/landing-primavera.png',
    repoUrl: 'https://github.com/LautaroJSON/landing-primavera',
    deployUrl: 'https://lautarojson.github.io/landing-primavera/',
    technologies: ['Astro', 'Tailwind CSS', 'GSAP', 'Leaflet'],
  },
  {
    id: 'mundial-al-dia',
    name: 'mundial-al-dia',
    description:
      'Seguimiento de partidos del Mundial 2026 sobre Cloudflare Workers con Hono. Las páginas se renderizan en el servidor con JSX, los datos vienen de la API de football-data.org y las respuestas se cachean con la Cache API de Workers.',
    image: '/projects/mundial-al-dia.png',
    repoUrl: 'https://github.com/LautaroJSON/mundial-al-dia',
    deployUrl: 'https://mundial-al-dia.fernandez-n-lautaro.workers.dev/',
    technologies: ['Cloudflare Workers', 'Hono', 'TypeScript'],
  },
  {
    id: 'blog-cafe-front',
    name: 'Café con Leche',
    description:
      'Blog orientado a SEO hecho con Astro: generación estática, contenido en MDX, feed RSS automático y sitemap.',
    image: '/projects/blog-cafe-front.png',
    repoUrl: 'https://github.com/LautaroJSON/blog-cafe-front',
    deployUrl: 'https://caffe-pig-blog.netlify.app/blog/',
    technologies: ['Astro', 'MDX'],
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
      'Aplicación web que recrea un sistema operativo de escritorio en el navegador, con un sistema de ventanas para presentar contenido. Hecha con React, TypeScript y Vite.',
    image: '/projects/pc-web-debut.png',
    repoUrl: 'https://github.com/LautaroJSON/pc-web-debut',
    technologies: ['React', 'TypeScript', 'Vite'],
  },
];
