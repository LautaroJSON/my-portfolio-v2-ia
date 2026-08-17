# Design System — Portfolio "Terminal/Editor"

Fuente: captura de referencia (layout tipo VS Code / editor de código,
glassmorphism sobre foto de montaña). Este documento es la única fuente de
verdad visual — cualquier componente nuevo debe respetar estos tokens antes
de improvisar estilo.

---

## Concepto

Interfaz que imita un editor de código: sidebar de navegación estilo árbol
de archivos, panel principal con gutter de números de línea, tipografía
sans-serif normal (NO monospace en el body, el efecto "código" lo da el
gutter, no la fuente), acento en amber/naranja sobre base negra, todo
flotando en una card con glassmorphism sobre una foto full-bleed de fondo.

---

## Paleta de colores

```css
--color-bg-photo: /* imagen de fondo full-bleed, paisaje montaña/atardecer */ --color-panel-bg:
  rgba(15, 15, 20, 0.55); /* panel principal, glass */
--color-sidebar-bg: #0a0a0a; /* sidebar, sólido, sin blur */
--color-sidebar-active-bg: rgba(255, 255, 255, 0.06);
--color-border-subtle: rgba(255, 255, 255, 0.1);

--color-text-primary: #ffffff;
--color-text-secondary: rgba(255, 255, 255, 0.55); /* gutter, nav inactivo */
--color-text-muted: rgba(255, 255, 255, 0.35);

--color-accent: #f5a623; /* keywords técnicas: React, Next.js, etc. */
--color-accent-hover: #ffb84d;
```

Tailwind: mapear estos valores en `tailwind.config` bajo `theme.extend.colors`
(`panel`, `sidebar`, `accent`, etc.) — no usar valores arbitrarios sueltos
(`bg-[#0a0a0a]`) repetidos en varios archivos.

## Tipografía

- Familia: sans-serif del sistema o una geométrica tipo Inter (`next/font`).
  **No usar monospace para el texto de contenido** — solo el gutter de
  números puede tener un tinte tabular (`font-variant-numeric: tabular-nums`).
- Tamaños:
  - Texto de contenido principal: `text-lg` / `leading-relaxed`
  - Nav sidebar: `text-sm` / `text-base`
  - Números de gutter: `text-sm`, color `--color-text-muted`

## Efecto Glassmorphism (panel principal)

```css
background: var(--color-panel-bg);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid var(--color-border-subtle);
border-radius: 1.5rem; /* rounded-2xl / rounded-3xl */
```

## Layout general

- Contenedor raíz: centrado, `max-width: ~1400px`, `margin: auto`, con
  padding respecto al viewport para que se vea el fondo alrededor.
- Fondo: imagen full-bleed (`position: fixed`, `object-fit: cover`,
  `inset: 0`, `z-index: -1`), oscurecida levemente con un overlay para
  contraste (`bg-black/20` sobre la imagen).
- Grid interno de 2 columnas:
  - Sidebar: ancho fijo `~300px` (`w-[300px]`)
  - Panel de contenido: `flex-1`
- Mobile (`< 768px`): sidebar colapsa arriba como barra horizontal o menú
  hamburguesa; el panel pasa a ocupar el 100% del ancho. Mantener el gutter
  de líneas en mobile si el ancho lo permite; si no, ocultarlo (`hidden md:block`).

## Sidebar

- Fondo sólido negro (`--color-sidebar-bg`), **sin** blur (contraste con el
  panel principal que sí tiene glass).
- Cada ítem de navegación:
  - Prefijo literal `"> "` en `--color-text-secondary`
  - Texto del label en blanco si está activo, `--color-text-secondary` si no
  - Estado activo: `bg-sidebar-active-bg`, `rounded-lg`, el prefijo `>` puede
    pasar a `--color-accent` para reforzar el estado activo
  - Padding: `px-4 py-2.5`, espaciado entre ítems `space-y-1`
- Ítems: Home, Experiencia/Experience, Proyectos/Projects, Contacto/Contact
  (traducidos según locale activo).

## Panel principal — efecto "editor"

- Gutter de números de línea a la izquierda, ancho fijo (~`w-8`), alineado
  a la derecha, color `--color-text-muted`, `select-none` (no seleccionable).
- El gutter **sigue mostrando números en líneas vacías** — es decorativo,
  simula un archivo abierto completo, no solo las líneas con contenido.
- El contenido real empieza después del gutter con un separador sutil
  (`border-r border-border-subtle` o solo gap).
- Dentro del contenido, las **keywords técnicas van en `--color-accent`,
  `font-semibold`**: nombres de tecnologías, títulos de puesto, nombres de
  proyecto. El resto del texto en `--color-text-primary`.

## Componentes derivados de este sistema

| Componente              | Descripción                                                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `EditorPanel`           | Wrapper con glass + gutter de líneas, recibe children y cuenta líneas automáticamente o por prop                                             |
| `LineNumberGutter`      | Columna de números, recibe `lineCount`                                                                                                       |
| `SidebarNavItem`        | Ítem individual de nav con prefijo `>` y estado activo                                                                                       |
| `TechBadge`             | Texto de tecnología en color accent (usado en experiencia) — no es un "chip" con fondo, es texto resaltado, salvo que se decida lo contrario |
| `Avatar/Badge` circular | Esquina inferior izquierda, fuera del panel, logo/inicial                                                                                    |

## Íconos (lucide-react)

- Usar íconos de `lucide-react` en: sección Contacto (mail, github, linkedin,
  download), y opcionalmente como prefijo de sección en vez del `>` si se
  decide iterar el diseño — **por ahora mantener el `>` textual**, no
  reemplazar por ícono sin confirmarlo.
- Tamaño estándar de ícono: `size={18}` o `size={20}`, `strokeWidth={1.5}`
  para que combine con la estética fina del diseño.
- Color de íconos: `--color-text-secondary` por defecto, `--color-accent`
  en hover.

## Qué NO hacer

- No usar fuente monospace en el texto de contenido (solo el gutter puede
  tener tabular-nums).
- No agregar sombras duras, gradientes saturados ni colores fuera de la
  paleta definida.
- No eliminar el efecto de números de línea al agregar nuevas secciones.
- No usar más de un color de acento.
