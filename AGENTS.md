# AGENTS.md — Portfolio de Lautaro Fernandez

Este archivo es la fuente de verdad para cualquier agente de IA (Claude, Cursor,
Copilot, OpenCode, etc.) que trabaje sobre este repositorio. Leer esto antes
de generar o modificar código.

## Documentos relacionados (leer también)

| Archivo                 | Para qué sirve                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/design-system.md` | Tokens visuales, layout, componentes del estilo "terminal"                                                                                 |
| `docs/content-model.md` | Estructura de datos del contenido (experiencia, contacto, etc.) e HUs por sección                                                          |
| `docs/cv.md`            | Fuente de verdad de datos personales/profesionales (NO exponer datos sensibles como DNI/dirección en el frontend, solo lo laboral/público) |
| `.prettierrc`           | Formateo obligatorio                                                                                                                       |

> ⚠️ `docs/cv.md` contiene datos personales (DNI, dirección, teléfono, fecha de
> nacimiento) que son para uso interno del autor, NO para mostrar en la web.
> Del CV solo se usa: nombre, rol, resumen profesional, experiencia laboral,
> tecnologías, educación, email, LinkedIn y GitHub (si se agrega).

---

## Stack

- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript (estricto, sin `any` salvo justificación explícita en comentario)
- **Estilos:** Tailwind CSS
- **Íconos:** lucide-react (única librería de íconos permitida)
- **i18n:** next-intl, con routing por segmento `[locale]` (`/en`, `/es`).
  Locale por defecto: `en`. `es` explícito en la URL.
- **Deploy target:** Vercel (asumir SSR/SSG compatible con Vercel)

No agregar librerías nuevas (UI kits, animación, state management) sin
consultarlo primero. Este proyecto se mantiene deliberadamente liviano, cualquier animacion se realiza con `@keyframe`

---

## Antes de escribir código

1. Si hay dudas sobre sintaxis/API de Next.js, Tailwind o next-intl, **usar el
   MCP de context7** para traer documentación actualizada de la versión , en vez de asumir por conocimiento previo.
2. Leer `docs/design-system.md` para cualquier componente visual.
3. Leer `docs/content-model.md` para cualquier componente que muestre contenido.
4. Verificar que el dato ya exista en `docs/cv.md` antes de inventar contenido.
   Si falta un dato, preguntar — no inventar experiencia, fechas ni logros.

---

## Convenciones de código (obligatorias)

### Componentes React

- **Siempre Arrow Functions**, nunca `function Component() {}`.
  ```tsx
  export const ExperienceCard = ({ experience }: IExperienceCardProps) => {
    return <div>...</div>;
  };
  ```
- Un componente por archivo. Nombre de archivo = nombre del componente en PascalCase (`ExperienceCard.tsx`).
- Server Components por defecto. Agregar `"use client"` solo si el componente
  usa hooks de estado, efectos, o listeners de eventos del navegador.
- Todo lo que se pueda componentizar, se componentiza: si un bloque de JSX se
  repite o tiene una responsabilidad propia (ej. un ítem de la sidebar, un
  badge de tecnología, una línea del "editor"), es su propio componente.

### Interfaces (TypeScript)

- **Prefijo `I` + PascalCase** para toda interfaz: `IExperience`, `IProject`,
  `ISidebarItem`, `ITechnology`, `ISocialLink`.
- Las props de un componente se tipan con una interfaz `I<NombreComponente>Props`.
  ```tsx
  interface IExperienceCardProps {
    experience: IExperience;
  }
  ```
- Interfaces de dominio (datos) viven en `/src/interfaces`. Interfaces de
  props viven junto a su componente, en el mismo archivo, arriba del componente.
- No usar `type` para modelar entidades de dominio — reservar `interface`
  para eso. `type` está permitido para unions/utility types.

### Nomenclatura general

- Componentes: `PascalCase`
- Hooks: `useCamelCase`
- Funciones utilitarias: `camelCase`
- Constantes globales: `UPPER_SNAKE_CASE`
- Archivos de contenido/datos: `kebab-case`

### Formateo

- Prettier con la config de `.prettierrc`, sin excepciones. No formatear a mano
  ni discutir estilo — correr Prettier.

---

## Arquitectura de carpetas

```
/
├── AGENTS.md

├── .prettierrc
├── docs/
│   ├── design-system.md     (CV descargable, sección Contacto)
│   ├── cv.md     (CV descargable, sección Contacto)
│   └── content-model.md
├── public/
│   ├── cv-lautaro-fernandez.pdf      (CV descargable, sección Contacto)
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            (layout con Sidebar + fondo)
│   │   │   ├── page.tsx              (orquesta las secciones scrolleables)
│   │   │   └── globals.css
│   │   └── sitemap.ts / robots.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarNavItem.tsx
│   │   │   └── EditorPanel.tsx       (contenedor con gutter de líneas)
│   │   ├── sections/
│   │   │   ├── HomeSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── LineNumberGutter.tsx
│   │       ├── TechBadge.tsx
│   │       ├── ExperienceCard.tsx
│   │       └── SocialLink.tsx
│   ├── interfaces/
│   │   ├── navigation.interface.ts   (ISidebarItem, INavSection)
│   │   ├── experience.interface.ts   (IExperience, IProjectHighlight)
│   │   ├── technology.interface.ts   (ITechnology)
│   │   └── contact.interface.ts      (ISocialLink, IContactInfo)
│   ├── content/
│   │   ├── en/
│   │   │   └── experience.ts
│   │   └── es/
│   │       └── experience.ts
│   ├── lib/
│   │   ├── date.ts                   (formatDuration: calcula tiempo total)
│   │   └── seo.ts                    (helpers de metadata por locale)
│   ├── messages/
│   │   ├── en.json                   (strings de UI vía next-intl)
│   │   └── es.json
│   └── i18n/
│       ├── routing.ts
│       └── request.ts
```

- **`/content`**: datos "de negocio" (experiencia, proyectos) tipados con las
  interfaces de `/interfaces`, separados por idioma porque son texto largo
  (descripciones) y no vale la pena forzarlos dentro de los JSON de next-intl.
- **`/messages`**: strings cortos de interfaz (labels de nav, botones,
  metadata SEO genérica) vía next-intl.

---

## i18n

- Rutas: `/en/...` y `/es/...`. Locale por defecto: **`en`**.
- Si el usuario entra a `/` sin locale, redirigir a `/en`.
- Todo string visible al usuario sale de `next-intl` (`messages/{locale}.json`)
  o de `/content/{locale}/...`. **Cero strings hardcodeados en componentes.**
- El selector de idioma (si se agrega) debe preservar la sección/scroll actual.

---

## SEO

- Metadata dinámica por locale usando el `generateMetadata` de Next.js
  (App Router), no `<Head>` manual.
- Palabras clave objetivo a incluir de forma natural en `title`/`description`/
  contenido (no keyword stuffing): "Fullstack Developer", "Desarrollador Web",
  "React", "Next.js", "TypeScript", "Frontend Developer" (variar EN/ES).
- `hreflang` / `alternates.languages` configurado para `en` y `es` en el
  layout raíz (next-intl lo resuelve, pero verificar que se genere).
- Open Graph image (`og-image.png`) + `sitemap.ts` + `robots.ts` obligatorios.
- Usar `<h1>` único por página para el nombre + rol (ej. "Lautaro Fernandez —
  Fullstack Developer"), jerarquía de headings correcta en cada sección.

---

## Qué NO hacer

- No usar `function` para declarar componentes.
- No poner lógica de negocio (cálculo de duración, ordenamiento) dentro del JSX — va en `/lib`.
- No hardcodear texto visible fuera de `messages/` o `/content`.
- No exponer datos sensibles de `cv.md` (DNI, dirección, teléfono, fecha de nacimiento).
- No inventar proyectos, URLs de repo/deploy ni imágenes para
  `src/content/{locale}/projects.ts` — esos archivos los completa el
  autor a mano (ver `content-model.md`). Si están vacíos, la sección debe
  seguir mostrando el estado "Coming soon", no contenido de relleno.
- No romper el efecto visual de "editor de código" (gutter de números) al
  agregar nuevas secciones.
