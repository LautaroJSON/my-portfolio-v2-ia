# Content Model — Portfolio

Traduce `cv.md` + los requerimientos funcionales a un modelo de datos tipado
y a historias de usuario por sección. Este es el archivo que reemplaza a la
"HU + Figma" tradicional para las secciones de contenido.

---

## Interfaces de dominio (`/src/interfaces`)

```ts
// navigation.interface.ts
interface ISidebarItem {
  id: 'home' | 'experience' | 'projects' | 'contact';
  labelKey: string; // key de next-intl, no el texto plano
  href: string;
}

// experience.interface.ts
interface IExperience {
  role: string;
  company: string;
  location: string;
  startDate: string; // ISO "2025-05-01"
  endDate: string | null; // null = "Actualidad" / "Present"
  description: string;
  projects: IProjectHighlight[];
  technologies: ITechnology[];
}

interface IProjectHighlight {
  name: string;
  description: string;
}

// technology.interface.ts
interface ITechnology {
  name: string;
  // opcional a futuro: icon?: string (si se agregan íconos por tech)
}

// text-fragment.interface.ts
// Patrón reusable de "texto enriquecido como dato": un párrafo se modela
// como una lista de fragmentos tipados en vez de un string con marcado
// (Markdown/HTML) o JSX hardcodeado. El componente que renderiza esto es
// genérico: itera el array y aplica --color-accent según el flag.
interface ITextFragment {
  text: string;
  accent?: boolean; // true = resaltar en --color-accent (ver design-system.md)
}
// Uso actual: contenido de Home. Reusable a futuro para descripciones de
// IExperience si se quiere resaltar tecnologías dentro del párrafo.

// contact.interface.ts
interface ISocialLink {
  platform: 'github' | 'linkedin' | 'email';
  label: string;
  url: string; // para email: "mailto:..."
  icon: 'Github' | 'Linkedin' | 'Mail'; // nombre exacto del ícono lucide-react
}

interface IContactInfo {
  email: string;
  cvDownloadUrl: string; // /cv-lautaro-fernandez.pdf
  socialLinks: ISocialLink[];
}

// project.interface.ts
interface IProject {
  id: string;
  name: string;
  description: string;
  image?: string; // path en /public, ej. "/projects/thinking-notes.png"
  repoUrl: string;
  deployUrl?: string; // opcional — no todos los proyectos tienen deploy público
  technologies?: string[];
}
```

## Utilidad de fechas (`/src/lib/date.ts`)

- `formatDuration(startDate: string, endDate: string | null, locale: string): string`
- Calcula la diferencia en años/meses **en runtime**, no hardcodeado.
- Si `endDate` es `null` → mostrar `"Actualidad"` (es) / `"Present"` (en) y
  calcular la duración hasta la fecha actual (`new Date()`).
- Formato de salida esperado: `"1 año 3 meses"` / `"1 yr 3 mos"` (ajustar
  singular/plural).

---

## Datos de Experiencia (extraídos de `cv.md`)

> Para implementar en `/src/content/{locale}/experience.ts`, tipado como
> `IExperience[]`, ordenado del más reciente al más antiguo.

### 1. Fullstack Developer — Freelance / Self-Employed

- **Ubicación:** Buenos Aires, Argentina
- **Inicio:** 2025-05 · **Fin:** `null` → "Actualidad"
- **Descripción:** resumen de rol freelance con ownership de producto
- **Proyectos:**
  - Thinking Notes — PWA de notas, React + TypeScript, Google OAuth, backend NestJS multi-tenant, Supabase JWT, Prisma + PostgreSQL
  - Interactive Desktop Web Application — simulación de escritorio con ventanas modales
  - High-Performance Blog — Astro, SSG, MDX, RSS, sitemaps dinámicos, Lighthouse perfecto
  - mundial-al-dia — Bun + Hono, JSX server-rendered, integración football-data.org
- **Tecnologías:** React, TypeScript, NestJS, Google OAuth, Supabase, Prisma, PostgreSQL, Astro, MDX, Bun, Hono

### 2. Frontend Architect — La Nación / Ovidio IT

- **Ubicación:** Vicente López, Buenos Aires, Argentina
- **Inicio:** 2024-12 · **Fin:** 2025-04
- **Descripción:** arquitectura de monorepo Nx, Design System sincronizado Figma↔Confluence
- **Proyectos:** (cv.md no separa proyectos individuales para este puesto —
  usar la descripción como único ítem, o dejar `projects: []` y mostrar solo
  `description`)
- **Tecnologías:** Next.js, React.js, Nx, Storybook, Tailwind CSS, Design Systems

### 3. Mid-Senior Frontend Developer — Emergencias S.A

- **Ubicación:** Coghlan, Buenos Aires, Argentina
- **Inicio:** 2021-07 · **Fin:** 2024-12
- **Descripción:** plataforma de gestión 360°, RBAC, tracking logístico, asistente IA interno
- **Proyectos:**
  - Plataforma de gestión de turnos médicos con RBAC granular
  - App de seguimiento logístico con Google Maps API
  - Asistente de IA con React + ProseMirror sobre base de conocimiento
- **Tecnologías:** TypeScript, React.js, Next.js, GraphQL, REST API, Styled-Components, Google Maps API, ProseMirror

> Nota: no hardcodear "actualidad"/tiempos calculados en el `content`, eso
> se resuelve en el componente vía `formatDuration()`.

---

## Historias de Usuario por sección

### 1. Home

> Como visitante, al entrar al portfolio quiero ver de inmediato una
> presentación breve de Lautaro (rol + stack principal) para entender en
> segundos a qué se dedica.

- Contenido: 1 párrafo corto (2-4 líneas), estilo "hola mundo".
- Keywords técnicas (React, Next.js, TypeScript, NodeJS/NestJS) resaltadas
  en `--color-accent` (ver `design-system.md`).
- Es la sección activa por defecto al cargar `/en` o `/es`.
- Fuente de texto: adaptar el "Resumen profesional" de `cv.md`, no copiar
  literal (está en 3ra persona formal, para Home conviene tono más directo/1ra persona).

#### Copy final (usar tal cual en `/src/content/{locale}/home.ts`)

Modelado como `ITextFragment[]`, no como string plano — ver interfaz
`ITextFragment` más arriba para el porqué de este patrón.

```ts
// es
export const homeContentEs: ITextFragment[] = [
  {
    text: 'Hola, soy Lautaro — Fullstack Developer con más de 4 años construyendo aplicaciones web con ',
  },
  { text: 'React', accent: true },
  { text: ', ' },
  { text: 'Next.js', accent: true },
  { text: ' y ' },
  { text: 'TypeScript', accent: true },
  {
    text: '. Últimamente estoy llevando ese stack un paso más allá: integrando ',
  },
  { text: 'LLMs', accent: true },
  { text: ', ' },
  { text: 'Spec-Driven Development', accent: true },
  { text: ', skills y ' },
  { text: 'agentes de IA', accent: true },
  {
    text: ' en mi flujo de trabajo para diseñar y shippear software más rápido, sin perder calidad.',
  },
];

// en
export const homeContentEn: ITextFragment[] = [
  {
    text: "Hi, I'm Lautaro — a Fullstack Developer with 4+ years building web apps with ",
  },
  { text: 'React', accent: true },
  { text: ', ' },
  { text: 'Next.js', accent: true },
  { text: ', and ' },
  { text: 'TypeScript', accent: true },
  { text: ". Lately I've been pushing that stack further: weaving " },
  { text: 'LLMs', accent: true },
  { text: ', ' },
  { text: 'Spec-Driven Development', accent: true },
  { text: ', skills, and ' },
  { text: 'AI agents', accent: true },
  {
    text: ' into my workflow to design and ship software faster without cutting corners.',
  },
];
```

Render esperado en `HomeSection.tsx` (referencia, no literal):

```tsx
<p>
  {homeContent.map((fragment, i) => (
    <span
      key={i}
      className={fragment.accent ? 'text-accent font-semibold' : undefined}
    >
      {fragment.text}
    </span>
  ))}
</p>
```

### 2. Experiencia / Experience

> Como visitante (probable reclutador/lead técnico) quiero ver el historial
> laboral con fechas, duración y stack usado por puesto, para evaluar
> seniority y fit técnico rápidamente.

- Por cada `IExperience`, mostrar en este orden:
  1. Nombre del puesto — Empresa
  2. Ubicación
  3. Fecha inicio – fecha fin (o "Actualidad"/"Present") · duración calculada
  4. Descripción del puesto
  5. Lista de proyectos destacados (si existen)
  6. Al final del bloque: lista de tecnologías usadas en ESE puesto
     (resaltadas estilo `TechBadge`)
- Ordenar del más reciente al más antiguo.
- Componente principal: `ExperienceCard` (uno por `IExperience`), dentro de
  `ExperienceSection`.

### 3. Proyectos / Projects

> Como visitante quiero ver proyectos destacados con imagen, descripción,
> demo y repositorio, para evaluar trabajo concreto más allá de la
> experiencia laboral.

- Fuente de datos: `src/content/{locale}/projects.ts` (`PROJECTS:
IProject[]`), separado por idioma igual que `experience.ts` — el mismo
  patrón de importación (`PROJECTS as PROJECTS_EN` / `PROJECTS_ES`, con
  un `PROJECTS_BY_LOCALE` en `ProjectsSection`) que ya usan
  `ExperienceSection`/`HomeSection`. Agregar un proyecto = agregar un
  objeto al array en **ambos** archivos (en/es), con el mismo `id`.
- Ambos arrays se mantienen deliberadamente **vacíos por defecto**
  (`PROJECTS: IProject[] = []`) — el autor carga sus propios proyectos
  (nombre, descripción, URLs de repo/deploy, imagen) editando los `.ts`
  directamente, no se inventan datos.
- Estado vacío: si el array del locale activo no tiene entradas,
  `ProjectsSection` muestra el mensaje `// TODO: {comingSoon}` (mismo
  tratamiento que antes), no oculta el ítem de nav.
- Con entradas: grilla `grid-cols-1 sm:grid-cols-2` de `ProjectCard`,
  mobile-first — ver `design-system.md` para el detalle visual.
- Imágenes: opcionales, sueltas en `public/projects/*.png`, referenciadas
  por path relativo en `image`. Sin imagen → placeholder decorativo (no
  colapsa el bloque, mantiene el ritmo de la grilla).
- `repoUrl` es obligatorio (siempre hay repo); `deployUrl` y
  `technologies` son opcionales — el botón de demo solo se renderiza si
  `deployUrl` existe.

### 4. Contacto / Contact

> Como visitante quiero poder escribirle por mail, descargar su CV, o ir a
> su LinkedIn/GitHub, para contactarlo o profundizar en su perfil.

- Contenido **centrado** (a diferencia de Home/Experience/Projects, que
  fluyen a la izquierda) — es la sección de cierre, funciona como CTA final
  más que como contenido a leer.
- Mostrar:
  - Eyebrow + heading, seguidos de una **leyenda corta** (`tagline`, en
    `messages/{locale}.json`) — evita que la sección se sienta vacía con
    solo íconos y un botón.
  - Email (`fernandez.n.lautaro@gmail.com`) — con ícono `Mail`, link `mailto:`
  - LinkedIn (`https://www.linkedin.com/in/lautaro-fernandez-json/`) — ícono `Linkedin`
  - GitHub (`https://github.com/LautaroJSON`) — ícono `Github`
  - Botón/link de descarga de CV → `/cv-lautaro-fernandez.pdf` (agregar el
    PDF real a `public/`, no generarlo desde el `.md`)
- No mostrar teléfono, DNI, dirección ni fecha de nacimiento (dato sensible,
  ver `AGENTS.md`).

#### Datos (`/src/content/contact.ts` — un solo archivo, NO por locale)

Los datos de contacto (email, URLs) no cambian entre idiomas, solo los
labels de UI que los acompañan (esos van en `messages/{locale}.json`, no acá).

```ts
export const contactInfo: IContactInfo = {
  email: 'fernandez.n.lautaro@gmail.com',
  cvDownloadUrl: '/cv-lautaro-fernandez.pdf',
  socialLinks: [
    {
      platform: 'email',
      label: 'Email',
      url: 'mailto:fernandez.n.lautaro@gmail.com',
      icon: 'Mail',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lautaro-fernandez-json/',
      icon: 'Linkedin',
    },
    {
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/LautaroJSON',
      icon: 'Github',
    },
  ],
};
```

- Si algún `SocialLink` tuviera `url` vacía, `ContactSection` lo filtra del
  render (no renderizar un link roto) — el patrón queda ahí por si se
  agrega una red social sin URL confirmada en el futuro.
- `icon` mapea 1:1 al nombre del componente de `lucide-react`
  (`import { Mail, Linkedin, Github, Download } from "lucide-react"`).

#### Strings de UI (`messages/{locale}.json`, no en `content.ts`)

```json
{
  "contact": {
    "heading": "Get in touch", // en — "Contacto" / heading equivalente en es
    "tagline": "Let's build something together — I usually reply within a day.", // es: "Construyamos algo juntos — suelo responder en el día."
    "downloadCv": "Download CV", // es: "Descargar CV"
    "downloadCvAria": "Download Lautaro's CV as PDF" // accesibilidad, ver nota abajo
  }
}
```

#### Componente `ContactSection`

- Reusa `SocialLink` (ya listado en `AGENTS.md` bajo `/components/ui`) para
  cada ítem de `contactInfo.socialLinks`, iterando el array — no un
  componente hardcodeado por red social.
- El botón de descarga de CV es un `LinkButton` (variant `secondary`) con
  `download` apuntando a `cvDownloadUrl`, con ícono `Download` de
  lucide-react.
- Accesibilidad: cada `SocialLink`/botón necesita `aria-label` descriptivo
  (no solo el ícono sin texto), ej. `aria-label="LinkedIn — Lautaro Fernandez"`.
- Sigue el patrón visual de `design-system.md`: dentro del `EditorPanel`
  existente, no un layout nuevo aparte — pero centrado (`flex flex-col
items-center text-center`), a diferencia de las demás secciones.
