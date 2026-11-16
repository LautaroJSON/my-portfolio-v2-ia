# Portfolio — Lautaro Fernandez

Portfolio personal de Lautaro Fernandez, Full Stack Engineer
([www.lautarojson.dev](https://www.lautarojson.dev)). Interfaz con estética de
editor de código: sidebar tipo árbol de archivos, fila de pestañas, panel
principal con gutter de números de línea y barra de estado, con acento ámbar
tipo terminal de fósforo sobre base negra.

## Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router, Server Components)
- **Lenguaje:** TypeScript (estricto)
- **Estilos:** Tailwind CSS 4 (animaciones solo con `@keyframes`)
- **Íconos:** [lucide-react](https://lucide.dev)
- **i18n:** [next-intl](https://next-intl.dev), con routing por segmento
  `[locale]` (`/en`, `/es`). Locale por defecto: `en`.
- **Deploy target:** Vercel

## Primeros pasos

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) (redirige a `/en`).

### Scripts disponibles

| Script          | Descripción                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Levanta el servidor de desarrollo |
| `npm run build` | Build de producción               |
| `npm run start` | Sirve el build de producción      |
| `npm run lint`  | Corre ESLint                      |

## Rutas

Cada sección es una ruta real, prerenderizada como HTML estático (SSG) para
los dos idiomas, así el contenido completo llega en el HTML del servidor y es
indexable sin JavaScript:

| Ruta                   | Sección                                               |
| ---------------------- | ----------------------------------------------------- |
| `/[locale]`            | **Home**: presentación, sobre mí y stack principal    |
| `/[locale]/experience` | **Experience**: historial laboral en formato timeline |
| `/[locale]/projects`   | **Projects**: proyectos con repo, demo y tecnologías  |
| `/[locale]/contact`    | **Contact**: email, redes y descarga del CV           |

El shell del editor (`Sidebar`, `TabStrip`, `EditorPanel`, `StatusBar`) vive
en el layout compartido `app/[locale]/layout.tsx`, así que se mantiene entre
rutas. La sección activa se deriva de la URL (`usePathname`), y la navegación
usa el `Link` de next-intl (`src/i18n/navigation.ts`).

## Estructura del proyecto

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx           # <html>, fondo, provider de i18n y shell del editor
│   │   ├── page.tsx             # Home (+ JSON-LD Person)
│   │   ├── experience/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── contact/page.tsx
│   │   └── opengraph-image.tsx  # Imagen Open Graph por idioma
│   ├── sitemap.ts               # 4 secciones × 2 idiomas, con hreflang
│   ├── robots.ts
│   └── icon.tsx
├── components/
│   ├── layout/                  # PortfolioShell, EditorPanel, Sidebar, TabStrip, StatusBar
│   ├── sections/                # Home, Experience, Projects, Contact
│   └── ui/                      # ExperienceCard, ProjectCard, TechBadge, LinkButton, etc.
├── content/                     # Datos de negocio: experience, projects, home, about
│                                # separados por idioma en content/{en,es}
├── interfaces/                  # Interfaces TypeScript del dominio (prefijo I)
├── i18n/                        # routing, request y navigation (next-intl)
├── lib/                         # seo, navegación, fechas, conteo de líneas, fuentes
├── messages/                    # Strings de UI y metadata SEO (en.json, es.json)
└── proxy.ts                     # Middleware de next-intl (redirige / → /en)
public/
├── cv-lautaro-fernandez-en.pdf  # CV descargable en inglés
├── cv-lautaro-fernandez-es.pdf  # CV descargable en español
└── projects/                    # Capturas de los proyectos
```

Ver [AGENTS.md](./AGENTS.md) para las convenciones de código completas y
[docs/](./docs) para el design system y el modelo de contenido.

## SEO

- Metadata por página e idioma con `generateMetadata` (`src/lib/seo.ts`):
  título, descripción, `canonical`, `hreflang` (`en`, `es`, `x-default`),
  Open Graph y Twitter card.
- Textos SEO en `messages/{locale}.json` → `metadata.pages.<sección>`.
- `sitemap.xml` con las 8 URLs y sus alternates; `robots.txt` apuntando al
  sitemap.
- JSON-LD `Person` solo en el home de cada idioma.
- Un único `<h1>` por página.

## i18n

- Rutas `/en/...` y `/es/...`. El locale por defecto es `en`.
- Todo el texto visible sale de `next-intl` (`src/messages/{locale}.json`) o
  de `src/content/{locale}/...`, sin strings hardcodeados en componentes.
- El botón "Download CV" descarga el PDF del idioma actual
  (`contactInfo.cvDownloads` en `src/content/contact.ts`).

## Documentación interna

| Archivo                                          | Contenido                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [AGENTS.md](./AGENTS.md)                         | Convenciones de código y arquitectura                                              |
| [docs/design-system.md](./docs/design-system.md) | Tokens visuales, componentes del estilo "terminal" y comportamiento de navegación  |
| [docs/content-model.md](./docs/content-model.md) | Modelo de datos e historias de usuario por sección                                 |
| [docs/cv.md](./docs/cv.md)                       | Fuente de datos personales/profesionales (uso interno, no exponer datos sensibles) |
