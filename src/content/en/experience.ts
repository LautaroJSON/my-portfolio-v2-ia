import type { IExperience } from '@/interfaces/experience.interface';

export const EXPERIENCES: IExperience[] = [
  {
    role: 'Fullstack Developer',
    company: 'Freelance / Self-Employed',
    location: 'Buenos Aires, Argentina',
    startDate: '2025-05-01',
    endDate: null,
    description:
      'End-to-end product ownership across freelance projects, from architecture to deployment, spanning React/Next.js frontends and NestJS, Bun, and Astro backends.',
    projects: [
      {
        name: 'Thinking Notes',
        description:
          'Notes-taking PWA built with React and TypeScript, with Google OAuth integration. Multi-tenant NestJS backend using Supabase JWT auth, Prisma ORM over PostgreSQL, and strict validation with class-validator.',
      },
      {
        name: 'Interactive Desktop Web Application',
        description:
          "Interactive web app simulating a desktop environment, with a modal window system to showcase a content creator's character lore.",
      },
      {
        name: 'High-Performance Blog',
        description:
          'SEO-optimized blog built with Astro scoring a perfect Lighthouse score: SSG, MDX content, automated RSS feeds, and dynamic sitemaps.',
      },
      {
        name: 'mundial-al-dia',
        description:
          'Full-stack app built with Bun and Hono serving server-rendered JSX pages with real-time football data, integrating the football-data.org API.',
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
      'Architected an Nx monorepo in Next.js to optimize time-to-market, centralizing reusable UI components across products. Automated the development workflow with custom Nx generators, Tailwind CSS, and Storybook, eliminating manual component boilerplate. Integrated an automated Design System syncing Figma assets with Confluence documentation.',
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
      'Built a 360° management platform with role-based access control (RBAC), real-time logistics tracking, and an internal AI assistant, while overseeing code review and pull request validation across the frontend team.',
    projects: [
      {
        name: 'Medical Appointment Management Platform',
        description:
          'Digitized medical appointment scheduling and patient management with granular role-based access control (RBAC), reducing administrative errors.',
      },
      {
        name: 'Home Logistics Tracking App',
        description:
          'Integrated Google Maps API for route optimization and real-time tracking of medical transport units.',
      },
      {
        name: 'Internal AI Assistant',
        description:
          'Built with React and ProseMirror and connected to the corporate knowledge base, reducing resolution times for technical and operational queries.',
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
