import type { IExperience } from '@/interfaces/experience.interface';

export const EXPERIENCES: IExperience[] = [
  {
    role: 'Independent Full Stack Engineer',
    company: 'Self-directed projects',
    location: 'Buenos Aires, Argentina',
    startDate: '2025-04-01',
    endDate: null,
    description:
      'Self-directed projects, not client work. I own the full cycle: requirements, architecture, implementation, testing and deployment. Frontends with React and Next.js; backends with NestJS, ASP.NET Core and Cloudflare Workers.',
    projects: [
      {
        name: 'RandomPlay',
        description:
          'Ticket booking system for a fictional cinema chain. ASP.NET Core 10 API with hexagonal architecture, EF Core and PostgreSQL, plus a Next.js frontend with a typed API client generated from OpenAPI.',
      },
      {
        name: 'Thinking Notes',
        description:
          'Notes PWA built with React and TypeScript, with Google sign-in through Supabase Auth. NestJS backend that validates Supabase JWTs, uses Prisma over PostgreSQL and validates input with class-validator.',
      },
      {
        name: 'Calorie Tracker',
        description:
          'Local-first mobile app built with React Native and Expo, with Android releases automated through GitHub Actions and EAS.',
      },
      {
        name: 'mundial-al-dia',
        description:
          'World Cup 2026 match tracker on Cloudflare Workers with Hono: server-rendered JSX pages, data from the football-data.org API and responses cached with the Workers Cache API.',
      },
      {
        name: 'Café con Leche',
        description:
          'SEO-focused blog built with Astro: static site generation, MDX content, automated RSS feed and sitemap.',
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
    company: 'Ovidio IT Consulting (client: La Nación)',
    location: 'Vicente López, Buenos Aires, Argentina',
    startDate: '2024-12-01',
    endDate: '2025-04-01',
    description:
      'Designed an Nx monorepo in Next.js to shorten time-to-market, centralizing reusable UI components across products. Automated component scaffolding with custom Nx generators, Tailwind CSS and Storybook, removing manual boilerplate. Integrated an automated Design System that synced Figma assets with Confluence documentation.',
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
      'Member of a 20+ engineer product team with 3–4 frontend developers, working with UI/UX, Product and Business under Scrum. On several products I was the only frontend developer and built them end to end, starting from empty repositories. Performed code review and pull request validation for the frontend team.',
    projects: [
      {
        name: 'Medical Appointment Management Platform',
        description:
          'Digitized medical appointment scheduling and patient management, with granular role-based access control (RBAC).',
      },
      {
        name: 'Home Logistics Tracking App',
        description:
          'Integrated the Google Maps API for route optimization and real-time tracking of medical transport units.',
      },
      {
        name: 'Internal AI Assistant',
        description:
          'Built with React and ProseMirror and connected to the corporate knowledge base to answer technical and operational queries.',
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
