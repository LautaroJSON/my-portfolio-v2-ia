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

**Referencia de dirección visual:** terminal ámbar de fósforo (monitores CRT
monocromáticos tipo DEC VT220/Wyse). No es "dark mode + un acento" genérico
— el ámbar existe porque evoca el brillo de fósforo de esas terminales, y
esa referencia es la que justifica cada decisión de la paleta y el "brillo"
sutil de la barra de estado (ver "Firma visual" más abajo).

---

## Paleta de colores

Paleta nombrada (valores base; los tokens CSS reales viven en `@theme` de
`globals.css` bajo nombres semánticos, no bajo estos nombres literales):

```css
--void: #050608; /* fondo detrás de la foto, overlay de contraste */
--graphite: #0b0c0f; /* chrome sólido: sidebar, tabs, texto sobre ámbar */
--bone: #f2f0ea; /* blanco cálido, NO #ffffff puro — base de texto secundario/muted y bordes */
--amber: #f5a623; /* el único acento — "fósforo" */
```

Tokens CSS (`@theme` en `globals.css`), derivados de esos 4 valores:

```css
--color-void: #050608;
--color-panel-bg: rgba(11, 12, 15, 0.62); /* panel principal, glass */
--color-sidebar-bg: #0b0c0f; /* sidebar/tabs/status bar, sólido, sin blur */
--color-sidebar-active-bg: rgba(
  245,
  166,
  35,
  0.1
); /* tintado en ámbar, no gris genérico */
--color-border-subtle: rgba(242, 240, 234, 0.08);
--color-border-strong: rgba(242, 240, 234, 0.16);

--color-text-primary: #c6c6c6; /* gris apagado, ajustado a mano — ya no deriva de --bone como el resto de los textos */
--color-text-secondary: rgba(242, 240, 234, 0.6);
--color-text-muted: rgba(242, 240, 234, 0.35);

--color-accent: #f5a623;
--color-accent-hover: #ffc670;
--color-accent-dim: rgba(
  245,
  166,
  35,
  0.12
); /* fondos tintados de estado activo/hover */
```

Reglas:

- **Un solo acento** (`--color-accent`). Todo estado "activo" o "hover" que
  antes usaba un overlay gris genérico (`rgba(255,255,255,0.06)`) ahora usa
  `--color-accent-dim` — el acento hace ese trabajo también, no solo resalta
  texto.
- El texto primario **no es blanco puro** — es `#c6c6c6`, un gris apagado
  ajustado a mano por el autor para bajar el contraste duro contra el
  fondo oscuro (evita el "dark mode gris + blanco `#fff`" que cansa la
  vista en lecturas largas). A diferencia de `--color-text-secondary`,
  `--color-text-muted` y los `--color-border-*` — que siguen derivando de
  `--bone` vía `rgba(242, 240, 234, *)` —, `--color-text-primary` ya **no**
  comparte esa temperatura cálida: es una excepción deliberada del texto
  de mayor énfasis, no un desvío de consistencia sin querer.
- Tailwind v4: estos tokens se declaran en `@theme` dentro de
  `src/app/[locale]/globals.css` — Tailwind genera las utilidades
  (`bg-panel-bg`, `text-accent`, etc.) automáticamente. No hay
  `tailwind.config.*` en este proyecto (v4 usa CSS-first config). No usar
  valores arbitrarios sueltos (`bg-[#0a0a0a]`) repetidos en varios archivos.

## Tipografía

Pareja deliberada de dos familias de la misma casa tipográfica (IBM Plex),
diseñadas juntas para contexto técnico/de ingeniería — no una mezcla
aleatoria de Google Fonts:

- **`IBM Plex Sans`** (`--font-sans`, vía `next/font/google`): texto de
  contenido y headings. **NO usar monospace para el texto de contenido** —
  el efecto "código" lo da el gutter, no la fuente del body.
- **`IBM Plex Mono`** (`--font-mono`, vía `next/font/google`): fuente
  utilitaria para todo lo que es "chrome" del editor, no prosa — gutter de
  líneas, tabs, status bar, labels de archivo en la sidebar, `TechBadge`.
  Los nombres de tecnologías/archivos se leen como identificadores de
  código, no como texto narrativo.

Escala tipográfica:

- Contenido principal (párrafos de sección): `text-lg` / `leading-relaxed`,
  `font-sans`.
- Headings de sección (`h2`): `text-3xl font-bold tracking-tight`,
  `font-sans`.
- Eyebrow de sección (ver `SectionEyebrow`): `text-xs tracking-wide`,
  `font-mono`, color `--color-text-muted`.
- Nav sidebar / tabs: `text-sm` (sidebar) / `text-xs` (tabs), `font-mono`.
- Números de gutter: `text-sm`, `font-mono`, color `--color-text-muted`,
  `font-variant-numeric: tabular-nums`.
- Status bar: `text-xs font-medium`, `font-mono`.

Dentro del contenido en prosa (párrafo de Home, descripciones de
`ExperienceCard`), las **keywords técnicas siguen en `--color-accent`,
`font-sans font-semibold`** — no monospace, porque son parte del body, no
del chrome. La distinción es: ¿esto es prosa que se lee, o una etiqueta/dato
de interfaz? Prosa → sans. Etiqueta/dato → mono.

## Efecto Glassmorphism (panel principal)

```css
background: var(--color-panel-bg);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid var(--color-border-subtle);
border-radius: 1rem; /* rounded-2xl */
```

Radio de borde más ajustado que la referencia visual original
(`1.5rem`/`rounded-3xl`): un editor real usa esquinas precisas, no muy
redondeadas — `rounded-3xl` en todo el sistema leía más a "app de consumo"
que a herramienta técnica. Elementos internos (sidebar, tabs, badges) usan
radios aún menores (`rounded-xl`/`rounded-lg`) para reforzar la jerarquía:
el panel exterior es la única superficie "suave"; todo lo de adentro es más
recto.

## Scrollbar

Estilo global, declarado una vez en `globals.css` (selector `*` para
`::-webkit-scrollbar`, y `scrollbar-width`/`scrollbar-color` para Firefox) —
aplica a **cualquier** elemento con scroll (el scroll wrapper del
`EditorPanel`, el `overflow-x-auto` del `TabStrip`, cualquier otro que se
agregue), no es un estilo puntual por componente.

```css
scrollbar-width: thin;
scrollbar-color: var(--color-border-strong) transparent;
/* ::-webkit-scrollbar: width/height 10px, track transparente,
   thumb --color-border-strong con radius 3px (no pill — mismo criterio de
   "esquinas precisas" que el resto del sistema), thumb en hover/active
   pasa a ámbar (rgba(245, 166, 35, 0.4)). */
```

- Track transparente: el scrollbar se funde con la superficie que scrollea
  en vez de dibujar una franja de color propia.
- Thumb fino (`10px`) y de esquina casi recta (`3px`), no la píldora
  redondeada por defecto de la mayoría de los sistemas — coherente con el
  resto de los radios "precisos" del sistema.
- Hover/active en ámbar: mismo lenguaje de interacción que sidebar, tabs y
  status bar — el acento es siempre la señal de "esto está activo/en foco".

## Layout general

- Contenedor raíz: centrado, `max-width: ~1400px`, `margin: auto`, con
  padding respecto al viewport para que se vea el fondo alrededor.
- Fondo: imagen full-bleed (`position: fixed`, `object-fit: cover`,
  `inset: 0`, `z-index: -1`), oscurecida con un overlay `bg-void/45` (no un
  `bg-black/20` genérico — usa el mismo tono `--color-void` que el resto de
  la paleta) para contraste. Implementación completa en "Background" más
  abajo.

## Background

Archivo: `public/background-mountain.png` — la foto de montaña que da pie al
glassmorphism del panel (ver "Concepto"). Se implementa en
`src/app/[locale]/layout.tsx`, no por componente, porque es un elemento de
layout raíz compartido por todas las secciones, no algo que dependa de
`activeSection`.

```tsx
import Image from 'next/image';
import backgroundMountain from '../../../public/background-mountain.png';

<Image
  src={backgroundMountain}
  alt=""
  fill
  priority
  className="fixed inset-0 -z-10 object-cover"
/>;
<div className="bg-void/45 fixed inset-0 -z-10" />;
```

- **Import estático** (`import backgroundMountain from '...png'`), no
  `src="/background-mountain.png"` como string: al importar el archivo,
  Next.js infiere `width`/`height` automáticamente y evita el layout shift
  que un `<Image fill>` con `src` de string puede introducir mientras carga
  la imagen — es la forma recomendada por Next.js para assets locales que
  viven en el repo (no vienen de un CMS/URL externa).
- `alt=""`: la imagen es puramente decorativa (ambientación visual, no
  contenido informativo) — `alt` vacío es la práctica correcta de
  accesibilidad para que los lectores de pantalla la salteen, en vez de
  narrar un texto descriptivo irrelevante.
- `fill`: la imagen no tiene tamaño intrínseco en el layout — ocupa el 100%
  del contenedor posicionado (`html`/`body`), que es el comportamiento que
  necesita un fondo full-bleed.
- `priority`: es contenido above-the-fold visible apenas carga la página
  (todo el fondo depende de esta imagen) — le dice a Next.js que la
  precargue en vez de aplicar lazy loading por defecto, evitando el flash
  sin fondo al entrar.
- `className="fixed inset-0 -z-10 object-cover"`:
  - `fixed inset-0`: cubre el viewport completo y **no scrollea** — no hay
    scroll de página en este layout (ver "Panel principal — altura fija con
    scroll interno"), así que el fondo queda estático detrás de todo.
  - `-z-10`: la manda detrás del contenido y del overlay de contraste, que
    también son `fixed inset-0` pero sin `z-index` negativo.
  - `object-cover`: recorta la imagen para llenar el viewport sin
    distorsionar el aspect ratio, igual que `background-size: cover` — el
    criterio "full-bleed" del sistema (ver "Layout general").
- El `<div className="bg-void/45 fixed inset-0 -z-10" />` inmediatamente
  después es el overlay de contraste: mismo `--color-void` que el resto de
  la paleta (no un negro genérico), al 45% de opacidad, para que el texto
  `--color-text-primary` sobre el panel de glass siga siendo legible sin
  apagar la foto por completo.

## Comportamiento de navegación y layout

Estas reglas no se ven en una captura estática, son de comportamiento —
tienen prioridad sobre cualquier suposición que la IA haga por defecto.

- El click en un ítem de la sidebar (o en un tab, ver "Firma visual") cambia
  un estado de sección activa (`activeSection`, controlado en
  `PortfolioShell`, el componente padre que orquesta las secciones).
- Dentro del `EditorPanel`, **se renderiza solo el componente de la sección
  activa**; las demás no están montadas en el DOM (`{activeSection === 'home'
&& <HomeSection />}`, no `display: none` — deben desmontarse, no solo
  ocultarse visualmente).
- El estado "activo" de cada `SidebarNavItem`/tab se deriva directamente de
  `activeSection === item.id` — no hace falta `IntersectionObserver` ni
  detectar scroll, porque no hay scroll de página que trackear.
- Los `id` de sección (`#home`, `#experience`, etc.) y el `scrollIntoView`
  quedan obsoletos con este modelo — no deben quedar referenciados en el
  código.

### Sidebar

- **Altura = contenido propio** (`h-fit`), sin `sticky` — no hace falta,
  porque no hay scroll de página que la sidebar deba "seguir". El layout es
  de una sola vista (viewport), no de scroll largo.
- Vive **dentro** del `EditorPanel`, no como columna hermana a nivel de
  página (ver estructura abajo).

### Panel principal (EditorPanel) — altura fija con scroll interno

- **`height: 95vh` fijo**, nunca automática ni con `min-height`.
- El `EditorPanel` imita la ventana completa de un IDE tipo VS Code:
  contiene la sidebar (file explorer), una fila de tabs, el gutter+contenido
  con scroll propio, y una status bar — todo dentro de una sola card de
  glass con padding interno (`p-3`).
- Estructura real (no es un grid 2D de una sola pasada — ver nota):

  ```
  EditorPanel (flex-col, h-95vh, p-3, gap-3)
  ├─ fila principal (grid: grid-cols-1 md:grid-cols-[auto_1fr], flex-1)
  │   ├─ Sidebar (columna 1, self-start)
  │   └─ pane editor (columna 2, border, rounded-lg, overflow-hidden)
  │       ├─ TabStrip (shrink-0)
  │       └─ scroll wrapper (flex-1, overflow-y-auto)
  │           ├─ LineNumberGutter
  │           └─ contenido de la sección activa (contentRef)
  └─ StatusBar (shrink-0, ancho completo)
  ```

  Se implementa como un `flex-col` exterior (fila principal + status bar) en
  vez de un `grid` único de 2 filas × 2 columnas, porque el conteo de
  columnas cambia por breakpoint (`grid-cols-1` en mobile, `grid-cols-[auto_1fr]`
  en desktop) y el auto-placement de grid no ubica de forma confiable 3
  elementos con distinto "span" a través de ese cambio de columnas. El grid
  de 2 columnas queda acotado a la fila principal (sidebar | editor), donde
  sí es estable.

- **`overflow-y: auto`** vive en el "scroll wrapper" (gutter + contenido
  juntos) — si el contenido de la sección activa excede el alto disponible,
  aparece scroll **interno de ese wrapper**, nunca scroll de la página
  completa ni de la sidebar/tabs/status bar.
- El gutter y el contenido comparten el mismo contenedor con scroll, para
  que se desplacen sincronizados (como en un editor real: los números
  "scrollean con" el código) — es una sola cosa que scrollea, no dos
  sincronizadas por JS.

#### Algoritmo de `updateLineCount`

Vive en `src/lib/line-count.ts` (`calculateLineCount`), llamado desde
`EditorPanel.tsx` — no en `LineNumberGutter.tsx`, que solo recibe `lineCount`
y renderiza.

Constante fija: `LINE_HEIGHT_PX = 20` (alto de cada número en
`LineNumberGutter`, coincide con el `line-height` real de `text-sm` en
Tailwind — 14px/20px — así que el gutter queda pixel-exacto sin necesidad de
leer `getComputedStyle` por línea).

```ts
const LINE_HEIGHT_PX = 20;

export const calculateLineCount = (contentElement: HTMLElement): number => {
  const styles = getComputedStyle(contentElement);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  const rawHeight = contentElement.scrollHeight - paddingTop - paddingBottom;
  const contentHeight = Math.round(rawHeight);

  return Math.floor(contentHeight / LINE_HEIGHT_PX);
};
```

- `scrollHeight` (no `clientHeight`) porque necesitamos el alto real del
  contenido aunque exceda el viewport visible del panel.
- Recalcular en `ResizeObserver` sobre `contentRef` — sigue disparando por
  cambio de idioma, cambio de sección activa (contenido distinto), y resize
  de ventana.
- Sin piso de `min-height` en el cálculo — el piso visual lo da el
  `height: 95vh` fijo del panel en CSS, no una línea mínima calculada en JS.

## Sidebar

- Fondo sólido (`--color-sidebar-bg`), **sin** blur (contraste con el pane
  editor que sí tiene glass), con `border border-border-subtle` propio y
  `rounded-xl` — se lee como un panel separado dentro del `EditorPanel`, no
  solo un color de fondo distinto.
- Ancho: `w-56` en desktop (no los `~300px` de la referencia original — un
  file explorer real es angosto; los labels ahora son nombres de archivo
  cortos, no frases traducidas largas).
- Cada ítem de navegación (`SidebarNavItem`):
  - Prefijo literal `"> "` — `--color-text-muted` inactivo,
    `--color-accent` activo.
  - Label visible = **nombre de archivo** (`home.tsx`, `experience.tsx`,
    `projects.tsx`, `contact.tsx`), `font-mono text-sm` — no la etiqueta
    traducida. El label traducido (`nav.home`, etc.) se usa como
    `aria-label` del botón, para que la navegación siga siendo accesible en
    el idioma activo aunque el nombre de archivo no se traduzca (los
    archivos, como los nombres de tecnología, no se traducen).
  - Texto en `--color-text-primary` si está activo, `--color-text-secondary`
    si no.
  - Estado activo: `bg-sidebar-active-bg` (tintado en ámbar, no gris),
    `rounded-lg`.
  - Padding: `px-3 py-2`, espaciado entre ítems `space-y-1`.
  - Foco visible: `focus-visible:outline-2 focus-visible:outline-accent`.

## Panel principal — efecto "editor"

- Gutter de números de línea a la izquierda, ancho fijo `w-10`,
  **alineado a la derecha** (`items-end`), `font-mono`, color
  `--color-text-muted`, `select-none` (no seleccionable).
- El gutter **sigue mostrando números en líneas vacías** — es decorativo,
  simula un archivo abierto completo, no solo las líneas con contenido.
- El contenido real empieza después del gutter con un separador sutil
  (`border-l border-border-subtle`).
- Dentro del contenido en prosa, las **keywords técnicas van en
  `--color-accent`, `font-sans font-semibold`** (no mono — ver Tipografía):
  nombres de tecnologías, títulos de puesto, nombres de proyecto. El resto
  del texto en `--color-text-primary`.
- La sidebar vive dentro del panel principal (ver estructura arriba).

## Composición y jerarquía por sección

Regla general aplicada acá (skill `better-layout`): el espacio entre grupos
debe ser **al menos 2x** el espacio dentro de un grupo. Un `space-y-*`
uniforme para todo el contenido de una sección no comunica jerarquía —
agrupar visualmente lo que está relacionado y separar más lo que empieza
una idea nueva. Todos los tokens usados acá son los ya definidos arriba —
ninguna regla de esta sección introduce color, fuente ni radio nuevo.

### Home

- El párrafo (`ITextFragment[]`) se mantiene **sin cambios** — mismo dato,
  mismo copy, mismo tratamiento (`font-sans`, keywords en `--color-accent
font-semibold`).
- Se agrega una segunda fila debajo, **derivada de los mismos fragments**
  (los que tienen `accent: true`), no copy nuevo: unidos con `" · "`.
  Tratamiento: `font-mono text-xs`, color `--color-text-secondary` — sigue
  la misma distinción tipográfica del sistema (prosa → sans, etiqueta/dato
  → mono): en el párrafo esas palabras son parte de una oración; acá son
  metadata escaneable, como un tag. No repetir `--color-accent` en esta
  fila — ya cumplió su función de resaltado arriba, repetirlo le resta
  jerarquía al párrafo.
- Gap entre el párrafo y esta fila: suelto (nuevo grupo), no el
  `leading-relaxed` interno del párrafo.

**Status chips** (bajo el eyebrow, antes del `h1`): fila `flex flex-wrap
gap-3` de `StatusChip` — disponibilidad (`● {texto}`), ubicación (ícono
`MapPin` de `lucide-react` + `profile.location`) y hora local en vivo
(`LocalTimeBadge`). Mismo criterio que el resto del sistema: el chrome
refleja estado real, no texto fijo (ver "Firma visual" — acá aplicado
fuera del `EditorPanel` chrome, en contenido, porque es información real
sobre el autor, no decoración). `gap-3` entre chips (12px, controles con
borde — ver `better-layout`), `flex-wrap` obligatorio: en ES los tres
chips juntos no entran en una fila de mobile.

- `StatusChip`: wrapper visual común (`border-border-subtle
text-text-secondary rounded-lg border px-2.5 py-1 font-mono text-xs`),
  reusado por los tres — evita repetir el estilo de badge tres veces.
- `LocalTimeBadge` es el único client component de Home (`'use client'`) —
  recibe el `aria-label` traducido por prop, ya que vive fuera del árbol
  de Server Components y no puede llamar a `getTranslations` directamente.
  Formatea con `Intl.DateTimeFormat` fijo a `timeZone:
'America/Argentina/Buenos_Aires'` (la hora del autor, no la del
  visitante). Los dígitos quedan `aria-hidden` y el `aria-label` describe
  el propósito del chip, para no forzar a un lector de pantalla a releer
  números que cambian cada segundo.
- Implementado con `useSyncExternalStore` (no `useState`/`useEffect` +
  `setInterval`): es la API pensada para "valor externo que cambia con el
  tiempo", con un `getServerSnapshot` que devuelve `null` — evita el
  mismatch de hidratación que daría intentar leer la hora real en el
  render de servidor (el server no conoce el reloj del visitante) sin
  necesitar un `useEffect` que dispare un setState extra en el primer
  render.

### Experience (`ExperienceCard`)

Línea de tiempo vertical real, no un hairline decorativo. Cada card es una
fila `flex` de 2 columnas: marcador (círculo + línea conectora) y
contenido.

**Marcador**:

- Círculo: anillo fino `h-3 w-3 rounded-full border-2 border-accent`, sin
  relleno — es el único lugar donde el acento ámbar vive fuera de
  texto/badges, marcando cada hito como un punto real de la carrera (no
  decorativo).
- Línea conectora: `w-px flex-1 bg-border-subtle`, **dentro** de la
  columna marcador de cada hito (no un overlay absoluto aparte). Al vivir
  en una columna `flex-col` cuya altura la define la columna de contenido
  (más alta), la línea rellena hasta el borde inferior de ese hito; como
  el siguiente `<article>` arranca inmediatamente después sin gap externo
  (el espaciado lo da el `pb-10` interno del contenido, no un `space-y-*`
  entre cards), la línea se ve continua entre círculos. El último hito no
  la dibuja (`isLast`).

**Contenido** (`space-y-4`, 4 grupos con la regla de 2x entre ellos):

1. **Rango de años** (`2022 – 2024`, o `2024 – {t('present')}`) —
   `font-mono text-sm`, `--color-text-secondary`. Solo año, no mes+año —
   es el ancla visual del hito en la timeline, no necesita precisión de
   mes ahí (esa precisión vive en la duración, punto 2).
2. **Header cluster** (`space-y-1`, gap apretado — un solo bloque de
   identidad): rol (`h3`, `font-sans font-bold`, `--color-text-primary`),
   empresa debajo (`text-sm`, `--color-text-secondary`), y ubicación +
   duración entre paréntesis debajo de eso (`"Buenos Aires, Argentina (1
yr 3 mos)"`, `font-mono text-xs`, `--color-text-muted`) — tres líneas
   separadas, no combinadas en una sola como antes.
3. **Descripción** — sin cambios (`font-sans`, `--color-text-primary`).
4. **Proyectos** (si existen) — sin cambios respecto a la versión previa.
5. **Tecnologías como literal de array de código** (`[React, TypeScript,
NestJS]`) en vez de `TechBadge`: `font-mono text-sm`, corchetes y comas
   en `--color-text-muted` (puntuación), nombres de tecnología en
   `--color-accent` (identificadores) — mismo criterio de sintaxis
   resaltada que el resto del "chrome" de editor del sitio. `TechBadge`
   sigue existiendo para Home/Projects, no se tocó ese componente.

> Nota: el orden de la información sigue siendo el de `content-model.md`
> (rol → ubicación/fechas → descripción → proyectos → tecnologías) — este
> cambio es de **presentación** (timeline + array literal), no de orden
> de datos.

### Projects (`ProjectCard`)

- Estado vacío (`projects.ts` del locale activo sin entradas): sin restructuración, línea
  `// TODO` bajo el heading — se lee como "placeholder intencional", no
  contenido incompleto.
- Estado con contenido: **una sola columna** (`grid-cols-1 gap-6`), cada
  card ocupa el ancho completo del `panel` — no hay grilla de 2 columnas.
  La adaptación mobile/desktop no la resuelve el grid, la resuelve la
  card misma según orientación (ver siguiente punto).
- Card (`border border-border-subtle rounded-lg`, sin el radio mayor del
  panel exterior — mismo criterio de esquinas precisas que el resto del
  chrome interno). Orientación del layout via el variant nativo de
  Tailwind `landscape:`/`portrait:` (media feature `orientation`, no un
  breakpoint de ancho — reacciona a un teléfono rotado igual que a una
  ventana de escritorio):
  - **`portrait` (default, mobile-first)**: `flex-col` — media arriba
    (`aspect-video`, ancho completo, `border-b`), info abajo. Es la forma
    "card" clásica.
  - **`landscape`**: `flex-row` — media a la izquierda con ancho fijo
    (`w-64`, `border-e` en vez de `border-b`) y alto estirado al de la
    columna de info (`align-items: stretch` por defecto en flex), info a
    la derecha ocupando el resto (`flex-1`). Mismo componente, no hay un
    `ProjectCardHorizontal` aparte.
  1. **Media** (`object-cover`) — opcional. Sin imagen, el bloque **no
     colapsa**: placeholder con ícono (`Code2` de `lucide-react`) +
     `// no preview` en mono, sobre `--color-sidebar-bg`, en ambas
     orientaciones.
  2. **Título** — sans, bold, nombre propio del proyecto (no se traduce).
  3. **Descripción breve** — sans, `text-secondary`, `flex-1` (empuja los
     botones al pie de la card aunque la descripción sea corta, para
     alinear la fila de acciones entre cards de distinta altura).
  4. **Tech tags** (opcional) — mismo tratamiento que `TechBadge` de
     Experience.
  5. **Acciones** — hasta dos `LinkButton`: "Live demo" (`primary`, solo
     si `deployUrl` existe) + "Code" (`secondary`, siempre, con
     `GithubIcon`).
- Mismo `SectionEyebrow` (`// projects`) que las demás secciones.

### Contact

Única sección **centrada** del sitio (`flex flex-col items-center
text-center`) — Home/Experience/Projects fluyen a la izquierda como
contenido de editor; Contact es la sección de cierre y funciona como CTA
final, no como algo que se "lee".

Tres grupos, de arriba a abajo (`gap-8` entre grupos):

1. **Eyebrow + heading** (`space-y-1`, gap apretado — un solo bloque de
   identidad, igual que el header cluster de `ExperienceCard`).
2. **Tagline** — una línea corta (`text-lg text-secondary`, `max-w-md` para
   que no estire de punta a punta en desktop) que le da presencia a la
   sección: sin ella, solo quedan íconos + un botón, que en el scroll
   wrapper de 95vh se siente vacío. String en `messages.contact.tagline`,
   no hardcodeado.
3. **Contacto directo + CV**, agrupados juntos (`gap-6`) porque ambos son
   _acciones_, a diferencia del tagline que es lectura:
   - Íconos de Email + LinkedIn + GitHub (`SocialLink`, `flex flex-wrap
justify-center`), sin cambios de estilo respecto a lo ya definido.
   - Botón de descarga de CV: `LinkButton` variant `secondary` (ver
     componente en la tabla de abajo — mismo control que usan las acciones
     de `ProjectCard`), ícono `Download` de `lucide-react`.

## Firma visual: chrome honesto de editor

El elemento distintivo de esta interfaz no es decorativo — es que el chrome
del "editor" (tabs, status bar) refleja estado real de la app, no texto
fijo. Toda la audacia visual de este sistema está concentrada acá; el resto
del diseño se mantiene deliberadamente tranquilo.

### TabStrip

- Fila de tabs sobre el gutter+contenido, una por sección
  (`home.tsx` / `experience.tsx` / `projects.tsx` / `contact.tsx`),
  `font-mono text-xs`, `role="tablist"`/`role="tab"`.
- Clickear un tab cambia `activeSection` igual que clickear en la sidebar —
  dos formas de "abrir un archivo", igual que en un IDE real (file explorer
  - tab bar controlando el mismo estado).
- Tab activo: `border-t-2 border-t-accent`, texto `--color-text-primary`,
  fondo `--color-panel-bg`. Tabs inactivos: `--color-text-muted`,
  `border-t-transparent`.

### StatusBar

- Franja de ancho completo al pie del `EditorPanel`, fondo **sólido
  `--color-accent`** (no texto tintado — relleno completo, el único lugar
  del sistema donde el acento se usa así), texto `--color-sidebar-bg`
  (oscuro sobre ámbar), `font-mono text-xs`.
- Contenido, todo real — nada decorativo:
  - Izquierda: nombre de archivo de la sección activa.
  - Derecha: cantidad de líneas (el mismo `lineCount` que calcula el
    gutter — no un número inventado), `UTF-8`, locale activo (`EN`/`ES`).
- Animación `phosphor-glow` (`@keyframes phosphor-pulse` en `globals.css`):
  un brillo de `box-shadow` muy lento (4s, ease-in-out, infinito) que evoca
  la persistencia de fósforo de una terminal CRT ámbar. Es la única
  animación ambiental del sistema — respeta
  `prefers-reduced-motion: reduce` (se desactiva por completo).

### SectionEyebrow

- Línea `// <label>` en `font-mono text-xs text-text-muted` sobre el
  heading de cada sección (`// whoami` en Home, `// experience`,
  `// contact`, `// projects`) — un comentario de código como recurso
  tipográfico, no un adorno: es información real de estructura (qué
  sección es esto), igual que un comentario real precede a una función.

## Componentes derivados de este sistema

| Componente              | Descripción                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `EditorPanel`           | Wrapper con glass + sidebar + tabs + gutter/contenido con scroll + status bar, `height: 95vh` fijo                                        |
| `LineNumberGutter`      | Columna de números (`font-mono`, alineada a la derecha), recibe `lineCount`                                                               |
| `Sidebar`               | File explorer: `NAV_ITEMS` como botones, controlado por `activeSection`/`onSelect`                                                        |
| `SidebarNavItem`        | Ítem individual de nav, label = nombre de archivo, `aria-label` = label traducido                                                         |
| `TabStrip`              | Fila de tabs por sección, misma fuente de estado que la sidebar (ver Firma visual)                                                        |
| `StatusBar`             | Franja inferior con datos reales del estado activo (ver Firma visual)                                                                     |
| `SectionEyebrow`        | Label `// texto` sobre cada heading de sección                                                                                            |
| `ExperienceCard`        | Card de puesto laboral con 4 niveles de agrupación (ver Composición y jerarquía por sección)                                              |
| `TechBadge`             | Nombre de tecnología en `--color-accent`, `font-mono` — no es un "chip" con fondo, es texto resaltado                                     |
| `ProjectCard`           | Card de proyecto: media opcional, título, descripción, tech tags, acciones (ver Projects)                                                 |
| `LinkButton`            | `<a>` con variantes `primary`/`secondary` (mismos tokens que `HeroCtaButton`); usado en Projects y en el botón de descargar CV de Contact |
| `StatusChip`            | Wrapper de badge reusado por disponibilidad, ubicación y hora local en Home                                                               |
| `LocalTimeBadge`        | Client component: `StatusChip` con la hora en vivo de Buenos Aires (`setInterval`, ver Home)                                              |
| `Avatar/Badge` circular | Esquina inferior izquierda, fuera del panel, logo/inicial — **sin implementar todavía**                                                   |

## Íconos (lucide-react)

- Usar íconos de `lucide-react` en: sección Contacto (mail, download).
  Github/Linkedin se dibujan a mano como SVG inline porque `lucide-react`
  eliminó los íconos de marca registrada del paquete — no agregar una
  librería de íconos nueva solo para esos dos.
- Prefijo de sección: mantener el `>` textual, no reemplazar por ícono sin
  confirmarlo.
- Tamaño estándar de ícono: `size={18}` o `size={20}`, `strokeWidth={1.5}`
  para que combine con la estética fina del diseño.
- Color de íconos: `--color-text-secondary` por defecto, `--color-accent`
  en hover.

## Qué NO hacer

- No usar fuente monospace en el texto de contenido en prosa (solo el
  chrome: gutter, tabs, status bar, sidebar, badges, y ahora la línea de
  metadata de Home/Experience).
- No introducir una tercera familia tipográfica — el sistema es
  intencionalmente `IBM Plex Sans` + `IBM Plex Mono`, nada más.
- No agregar sombras duras, gradientes saturados ni colores fuera de la
  paleta definida.
- No eliminar el efecto de números de línea al agregar nuevas secciones.
- No usar más de un color de acento.
- No usar `border-radius` tipo pill/`rounded-full` en ningún control interno
  (botones, badges, tabs) — el sistema usa esquinas precisas en todo el
  chrome, ver Glassmorphism y Scrollbar.
- No agregar animación fuera de la `phosphor-glow` de la status bar sin
  justificarlo — la audacia visual de este sistema está concentrada ahí a
  propósito; más movimiento la diluye.
