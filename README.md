# Portfolio — Lautaro Fernandez

Portfolio personal de Lautaro Fernandez, Senior Fullstack Developer. Interfaz
con estética de editor de código (sidebar de navegación tipo árbol de
archivos, panel principal con gutter de números de línea, acento ámbar tipo
terminal de fósforo sobre base negra).

## Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **Lenguaje:** TypeScript (estricto)
- **Estilos:** Tailwind CSS 4
- **Íconos:** [lucide-react](https://lucide.dev)
- **i18n:** [next-intl](https://next-intl.dev), con routing por segmento
  `[locale]` (`/en`, `/es`). Locale por defecto: `en`.
- **Deploy target:** Vercel

## Primeros pasos

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Script          | Descripción                             |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Levanta el servidor de desarrollo        |
| `npm run build` | Build de producción                      |
| `npm run start` | Sirve el build de producción             |
| `npm run lint`  | Corre ESLint                             |

## Estructura del proyecto

```
src/
├── app/[locale]/        # Layout y página raíz, ruteo por idioma
├── components/
│   ├── layout/           # Sidebar, EditorPanel, TabStrip, StatusBar
│   ├── sections/         # Home, Experience, Projects, Contact
│   └── ui/                # ExperienceCard, TechBadge, SocialLink, etc.
├── content/               # Datos de negocio (experiencia, contacto, home),
│                          # separados por idioma en content/{en,es}
├── interfaces/            # Interfaces TypeScript del dominio (prefijo I)
├── i18n/                  # Configuración de next-intl (routing, request)
├── lib/                   # Utilidades (fechas, navegación, fuentes)
└── messages/              # Strings de UI vía next-intl (en.json, es.json)
```

Ver [AGENTS.md](./AGENTS.md) para las convenciones de código completas y
[docs/](./docs) para el design system y el modelo de contenido.

## Secciones

- **Home** — presentación breve (rol + stack principal).
- **Experience** — historial laboral con fechas, duración calculada en
  runtime y tecnologías por puesto.
- **Projects** — placeholder, sin contenido real todavía.
- **Contact** — email, descarga de CV y links a redes.

## i18n

- Rutas `/en` y `/es`. El locale por defecto es `en`.
- Todo el texto visible sale de `next-intl` (`src/messages/{locale}.json`) o
  de `src/content/{locale}/...`, sin strings hardcodeados en componentes.

## Documentación interna

| Archivo                                    | Contenido                                  |
| ------------------------------------------- | ------------------------------------------- |
| [AGENTS.md](./AGENTS.md)                    | Convenciones de código y arquitectura       |
| [docs/design-system.md](./docs/design-system.md) | Tokens visuales y componentes del estilo "terminal" |
| [docs/content-model.md](./docs/content-model.md) | Modelo de datos e historias de usuario por sección |
| [docs/cv.md](./docs/cv.md)                  | Fuente de datos personales/profesionales (uso interno, no exponer datos sensibles) |
