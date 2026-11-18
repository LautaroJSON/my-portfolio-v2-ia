import type { IProject } from '@/interfaces/project.interface';

// Origen: github.com/LautaroJSON — mantener los `id` sincronizados con
// src/content/en/projects.ts (mismo id, descripción traducida).
// Ordenados por relevancia para reclutadores.
export const PROJECTS: IProject[] = [
  {
    id: 'randomplay',
    name: 'RandomPlay',
    description:
      'Sistema de reserva de entradas para una cadena de cines ficticia, desplegado de punta a punta: desde la cartelera hasta la elección de butacas y el pago. No hace falta cuenta: un carrito anónimo retiene los asientos por 5 minutos con reservas todo o nada, y el pago funciona con Mercado Pago Checkout Pro (credenciales de prueba), con webhooks firmados, una entrada por asiento y emails de entrega encolados con un Outbox. Backend: API en ASP.NET Core 10 con arquitectura hexagonal, EF Core y PostgreSQL, acceso por roles con JWT (RBAC), rate limiting y tests de integración con Testcontainers, desplegada en Render con Supabase. Frontend: Next.js 16 en Vercel. La cartelera y las fichas de cada película son indexables y se revalidan cada 60 segundos; el flujo de compra cubre la elección de butacas, un carrito con cuenta regresiva sincronizada con el reloj del servidor, el pago (el sitio nunca pide datos de tarjeta) y una página con el estado del pago que muestra cada entrada como un ticket con talón. Cliente de API tipado generado desde OpenAPI, tests unitarios y de componentes con Vitest y MSW, y tests end-to-end con Playwright con y sin JavaScript, incluidos chequeos de accesibilidad con axe.',
    image: '/projects/randomplay.png',
    video: '/projects/randomplay.webm',
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
      'PWA de notas para capturar ideas rápidas. Funciona sin cuenta, guardando las notas en el dispositivo (localStorage, con las imágenes en IndexedDB), o con inicio de sesión con Google vía Supabase Auth para sincronizarlas entre dispositivos. Cada nota agrupa pensamientos independientes de texto o imagen, con guardado automático con debounce, dictado por voz con la Web Speech API, orden por arrastre con dnd-kit, búsqueda, tres temas visuales y exportación a Markdown y PDF. Hecha con React 19, TypeScript y Vite, con tests en Vitest y Testing Library en GitHub Actions y desplegada en Vercel. El backend en NestJS (repositorio aparte) valida los JWT de Supabase, guarda los datos en PostgreSQL con Prisma y valida cada pensamiento tipado con class-validator; con sesión, las imágenes van a Supabase Storage.',
    image: '/projects/thinking-notes.png',
    video: '/projects/thinking-notes.webm',
    repoUrl: 'https://github.com/LautaroJSON/thinking-notes',
    backendRepoUrl: 'https://github.com/LautaroJSON/thinking-notes-backend',
    deployUrl: 'https://thinkingnotes.app/',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Vitest',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Supabase',
    ],
  },
  {
    id: 'mymudae',
    name: 'MyMudae',
    description:
      'Aplicación web 100 % cliente para organizar fuera de Discord un harem de Mudae (bot gacha de personajes para Discord). Pegás el mensaje que manda Mudae y arma un perfil con tus series y personajes: orden por arrastre con dnd-kit (mouse y touch), búsqueda, orden por kakera, varios perfiles por servidor de Discord, tema claro y oscuro, y comandos $sm y $divorce listos para pegar, partidos según el límite de mensajes de Discord y siempre derivados del mismo estado que el orden en pantalla. Sin backend: todo se guarda en localStorage. Monolito modular con arquitectura en capas estilo DDD (dominio, casos de uso y puertos, infraestructura, presentación), un parser defensivo para el formato de los mensajes de Mudae, un test de rendimiento de render con más de 200 personajes y tests con Vitest + Testing Library; cada feature se especificó primero con Spec Kit. Desplegada en Netlify.',
    image: '/projects/mymudae.png',
    video: '/projects/mymudae.webm',
    repoUrl: 'https://github.com/LautaroJSON/my-mudae',
    deployUrl: 'https://mymudae.netlify.app/',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'styled-components',
      'dnd-kit',
      'Vitest',
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
