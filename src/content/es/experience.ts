import type { IExperience } from '@/interfaces/experience.interface';

export const EXPERIENCES: IExperience[] = [
  {
    role: 'Fullstack Developer',
    company: 'Freelance / Self-Employed',
    location: 'Buenos Aires, Argentina',
    startDate: '2025-05-01',
    endDate: null,
    description:
      'Ownership de producto end-to-end en proyectos freelance, desde la arquitectura hasta el despliegue, en frontends con React/Next.js y backends con NestJS, Bun y Astro.',
    projects: [
      {
        name: 'Thinking Notes',
        description:
          'PWA de notas con React y TypeScript, con integración de Google OAuth. Backend multi-tenant en NestJS con autenticación JWT de Supabase, Prisma ORM sobre PostgreSQL y validación estricta con class-validator.',
      },
      {
        name: 'Interactive Desktop Web Application',
        description:
          'Aplicación web interactiva que simula un entorno de escritorio, con sistema de ventanas modales para mostrar el lore de un personaje de un creador de contenido.',
      },
      {
        name: 'High-Performance Blog',
        description:
          'Blog optimizado para SEO con Astro y puntaje perfecto en Lighthouse: SSG, contenido MDX, feeds RSS automatizados y sitemaps dinámicos.',
      },
      {
        name: 'mundial-al-dia',
        description:
          'Aplicación full-stack con Bun y Hono que sirve páginas JSX renderizadas en servidor con datos de fútbol en tiempo real, integrando la API de football-data.org.',
      },
    ],
    technologies: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'NestJS' },
      { name: 'Google OAuth' },
      { name: 'Supabase' },
      { name: 'Prisma' },
      { name: 'PostgreSQL' },
      { name: 'Astro' },
      { name: 'MDX' },
      { name: 'Bun' },
      { name: 'Hono' },
    ],
  },
  {
    role: 'Frontend Architect',
    company: 'La Nación / Ovidio IT',
    location: 'Vicente López, Buenos Aires, Argentina',
    startDate: '2024-12-01',
    endDate: '2025-04-01',
    description:
      'Arquitectura de un monorepo Nx en Next.js para optimizar el time-to-market, centralizando componentes UI reutilizables entre productos. Automatización del flujo de desarrollo con generadores personalizados de Nx, Tailwind CSS y Storybook, eliminando la configuración manual de boilerplate. Integración de un Design System automatizado que sincronizaba assets de Figma con documentación en Confluence.',
    projects: [],
    technologies: [
      { name: 'Next.js' },
      { name: 'React.js' },
      { name: 'Nx' },
      { name: 'Storybook' },
      { name: 'Tailwind CSS' },
      { name: 'Design Systems' },
    ],
  },
  {
    role: 'Mid-Senior Frontend Developer',
    company: 'Emergencias S.A',
    location: 'Coghlan, Buenos Aires, Argentina',
    startDate: '2021-07-01',
    endDate: '2024-12-01',
    description:
      'Desarrollo de una plataforma de gestión 360° con control de acceso basado en roles (RBAC), seguimiento logístico en tiempo real y un asistente de IA interno, además de la supervisión de Code Review y Pull Requests en el equipo frontend.',
    projects: [
      {
        name: 'Plataforma de gestión de turnos médicos',
        description:
          'Digitalización de la agenda de turnos médicos y la gestión de pacientes con control de acceso basado en roles (RBAC) granular, reduciendo errores administrativos.',
      },
      {
        name: 'Seguimiento logístico domiciliario',
        description:
          'Integración con Google Maps API para optimización de rutas y tracking en tiempo real de unidades de transporte médico.',
      },
      {
        name: 'Asistente de IA interno',
        description:
          'Construido con React y ProseMirror, conectado a la base de conocimiento corporativa, reduciendo los tiempos de resolución de consultas técnicas y operativas.',
      },
    ],
    technologies: [
      { name: 'TypeScript' },
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'GraphQL' },
      { name: 'REST API' },
      { name: 'Styled-Components' },
      { name: 'Google Maps API' },
      { name: 'ProseMirror' },
    ],
  },
];
