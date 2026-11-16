import type { IExperience } from '@/interfaces/experience.interface';

export const EXPERIENCES: IExperience[] = [
  {
    role: 'Independent Full Stack Engineer',
    company: 'Proyectos propios',
    location: 'Buenos Aires, Argentina',
    startDate: '2025-04-01',
    endDate: null,
    description:
      'Proyectos propios, no trabajos para clientes. Me encargo del ciclo completo: requisitos, arquitectura, implementación, testing y despliegue. Frontends con React y Next.js; backends con NestJS, ASP.NET Core y Cloudflare Workers.',
    projects: [
      {
        name: 'RandomPlay',
        description:
          'Sistema de reserva de entradas para una cadena de cines ficticia. API en ASP.NET Core 10 con arquitectura hexagonal, EF Core y PostgreSQL, y un frontend en Next.js con un cliente de API tipado generado desde OpenAPI.',
      },
      {
        name: 'Thinking Notes',
        description:
          'PWA de notas hecha con React y TypeScript, con inicio de sesión con Google vía Supabase Auth. Backend en NestJS que valida los JWT de Supabase, usa Prisma sobre PostgreSQL y valida los datos de entrada con class-validator.',
      },
      {
        name: 'Calorie Tracker',
        description:
          'App móvil local-first hecha con React Native y Expo, con releases de Android automatizados con GitHub Actions y EAS.',
      },
      {
        name: 'mundial-al-dia',
        description:
          'Seguimiento de partidos del Mundial 2026 sobre Cloudflare Workers con Hono: páginas JSX renderizadas en el servidor, datos de la API de football-data.org y respuestas cacheadas con la Cache API de Workers.',
      },
      {
        name: 'Café con Leche',
        description:
          'Blog orientado a SEO hecho con Astro: generación estática, contenido en MDX, feed RSS automático y sitemap.',
      },
    ],
    technologies: [
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'NestJS' },
      { name: 'C#' },
      { name: 'ASP.NET Core' },
      { name: 'PostgreSQL' },
      { name: 'Prisma' },
      { name: 'Supabase' },
      { name: 'React Native' },
      { name: 'Expo' },
      { name: 'Cloudflare Workers' },
      { name: 'Hono' },
      { name: 'Astro' },
    ],
  },
  {
    role: 'Frontend Architect',
    company: 'Ovidio IT Consulting (cliente: La Nación)',
    location: 'Vicente López, Buenos Aires, Argentina',
    startDate: '2024-12-01',
    endDate: '2025-04-01',
    description:
      'Diseñé un monorepo Nx en Next.js para acortar el time-to-market, centralizando componentes UI reutilizables entre productos. Automaticé la creación de componentes con generadores propios de Nx, Tailwind CSS y Storybook, eliminando el boilerplate manual. Integré un Design System automatizado que sincronizaba los assets de Figma con la documentación en Confluence.',
    projects: [],
    technologies: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'Nx' },
      { name: 'Storybook' },
      { name: 'Tailwind CSS' },
      { name: 'Design Systems' },
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Emergencias',
    location: 'Coghlan, Buenos Aires, Argentina',
    startDate: '2021-07-01',
    endDate: '2024-12-01',
    description:
      'Parte de un equipo de producto de más de 20 ingenieros, con 3 a 4 desarrolladores frontend, trabajando con UI/UX, Producto y Negocio bajo Scrum. En varios productos fui el único desarrollador frontend y los construí de punta a punta, partiendo de repositorios vacíos. Realicé code review y validación de pull requests del equipo frontend.',
    projects: [
      {
        name: 'Plataforma de gestión de turnos médicos',
        description:
          'Digitalización de la agenda de turnos médicos y de la gestión de pacientes, con control de acceso basado en roles (RBAC) granular.',
      },
      {
        name: 'Seguimiento logístico domiciliario',
        description:
          'Integración con la API de Google Maps para optimizar rutas y seguir en tiempo real a las unidades de traslado médico.',
      },
      {
        name: 'Asistente de IA interno',
        description:
          'Construido con React y ProseMirror y conectado a la base de conocimiento corporativa para responder consultas técnicas y operativas.',
      },
    ],
    technologies: [
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'GraphQL' },
      { name: 'REST API' },
      { name: 'Styled-Components' },
      { name: 'Google Maps API' },
      { name: 'ProseMirror' },
    ],
  },
];
