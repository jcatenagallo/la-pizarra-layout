---
name: create-design-variant
description: Crea una nueva variante de diseño de La Pizarra a partir de una paleta de colores. Usar cuando el usuario pida crear un nuevo tema, variante de colores, o copia del layout principal en una ruta nueva.
argument-hint: "[ruta] [paleta de colores en formato tabla o lista]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(npm run build), Skill(frontend-design)
---

# Create Design Variant

Crea una nueva variante de diseño de La Pizarra aplicando la paleta de colores que el usuario proporciona.

## Paleta del usuario

$ARGUMENTS

## Regla de color obligatoria

**Verde NUNCA puede usarse como fondo principal de la aplicación.** Cualquier tono de verde no puede ser el `bg-*` del contenedor `min-h-screen`. Sí puede usarse en cualquier otro lugar: match cards, header, sidebar, league headers, ticker, botones, badges, bordes, textos, acentos, etc.

## Instrucciones

### Paso 1: Determinar la ruta

El usuario indicará en qué ruta crear la variante (ej: `/5`, `/7`). Usar ese número N.
El archivo se llamará `src/designs/Design{N}.jsx` y la función exportada `Design{N}`.

Verificar en `src/App.jsx` que la ruta no esté ya ocupada. Si lo está, avisar al usuario.

### Paso 2: Invocar /frontend-design

Usa la skill `/frontend-design` pasándole esta tarea:

> Crear `src/designs/Design{N}.jsx` como copia del layout de Design1.jsx, aplicando la siguiente paleta de colores: [incluir la paleta del usuario].
> El layout y estructura deben ser idénticos a Design1.jsx. Solo cambian los colores.

### Paso 3: Mapear colores del Design1 a la nueva paleta

El Design1 (`src/designs/Design1.jsx`) es SIEMPRE la base. Usa estos tokens de referencia para saber qué reemplazar:

#### Fondos
| Token en Design1 | Elemento |
|---|---|
| `bg-[#14100e]` | Fondo principal de la página (`min-h-screen`) |
| `bg-stadium-night` | Fondos oscuros: flip digits, ticker label, sidebar |
| `bg-stadium-night/80` | Fondo del sidebar container |
| `bg-stadium-night/50` | Date picker botón no seleccionado |
| `bg-stadium-ochre` | League header, botón seleccionado, close button sheet |
| `bg-stadium-ochre/20` | Sidebar sección destacados header |
| `bg-stadium-ochre/10` | Sidebar país header |
| `bg-stadium-red` | Fondo del ticker en vivo |
| `from-[#1a5629] via-[#145d23] to-[#0d431a]` | Gradiente de match cards |
| `from-stadium-ochre via-[#c4942f] to-stadium-ochre` | Gradiente league section header |

#### Bordes
| Token en Design1 | Elemento |
|---|---|
| `border-stadium-ochre` | Header border bottom |
| `border-stadium-ochre/40` | Bordes de match cards, league sections, separadores |
| `border-stadium-ochre/50` | Bordes del ticker, league header bottom |
| `border-stadium-ochre/30` | Sidebar container, footer |
| `border-stadium-ochre/20` | Sidebar divisores, sidebar bordes internos |
| `border-t border-stadium-ochre/20` | Flip digit borde superior |

#### Textos
| Token en Design1 | Elemento |
|---|---|
| `text-stadium-ochre` | Título "LA PIZARRA", texto acento sidebar |
| `text-stadium-chalk` | Nombres de equipos, scores, texto principal |
| `text-stadium-chalk/60` | Texto secundario (minutos ticker, date picker no seleccionado) |
| `text-stadium-chalk/50` | Tagline |
| `text-stadium-chalk/40` | Empty state icon y texto |
| `text-stadium-chalk/30` | Footer |
| `text-stadium-night` | Texto sobre fondos de acento (league header, date seleccionado) |
| `text-[#F0C850]` | Minutos de eventos en match cards |
| `text-white` | Texto en match cards (time, team names), ticker |

#### Componentes con props de color
| Prop | Valor en Design1 | Elemento |
|---|---|---|
| `PizarraLogo color` | `#F5F0E6` | Color principal del logo |
| `PizarraLogo accentColor` | `#D4A03D` | Color de acento del logo |
| `TacticalBackground color` | `#D4A03D` | Color de líneas tácticas |
| `TacticalBackground opacity` | `0.08` | Opacidad del fondo táctico |
| `TacticalElements color` | `#D4A03D` | Color de elementos tácticos |
| `TacticalElements opacity` | `0.12` | Opacidad de elementos tácticos |

#### Ticker en vivo
| Token en Design1 | Elemento |
|---|---|
| `bg-stadium-red` | Fondo del banner ticker |
| `bg-red-500` | Punto pulsante indicador |
| `text-white` | "EN VIVO" label, nombres en ticker |
| `text-stadium-ochre` (en bold) | Score en ticker |

#### Elementos que NO se cambian
- SVG icons (GoalIcon, CardIcon, SubstitutionIcon) mantienen sus colores
- `text-green-400` / `text-red-400` en substituciones
- Estructura del layout, imports, lógica de datos
- Animaciones de Framer Motion
- `bg-black/50`, `from-white/5` y otros overlays genéricos del flip digit

### Paso 4: Registrar variante en MobileSidebar

El `MobileSidebar` (`src/components/MobileSidebar.jsx`) usa un sistema de variantes. Agregar una nueva entrada al objeto `variants`:

```jsx
nuevaVariante: {
  button: 'bg-... text-... border ...',     // Botón flotante
  indicator: 'bg-...',                       // Punto de filtro activo
  sheet: 'border-r border-... bg-...',       // Sheet drawer
  sheetBg: 'bg-...',                         // Fondo sticky del close
  close: 'bg-... hover:bg-... text-...',     // Botón cerrar
},
```

Luego en el nuevo Design, pasar `variant="nuevaVariante"` al `<MobileSidebar>`.

**Convención:** El botón mobile debe usar los mismos colores que el ticker/banner de partidos en vivo.

### Paso 5: Registrar ruta en App.jsx

```jsx
import Design{N} from './designs/Design{N}';

// Dentro de <Routes>:
<Route path="/{N}" element={<Design{N} />} />
```

### Paso 6: Verificar

Ejecutar `npm run build` para confirmar que compila sin errores.

## Variantes existentes (mantener actualizado)

| Ruta | Archivo | Paleta | Variante mobile |
|------|---------|--------|-----------------|
| `/` | `Design1.jsx` | Ochre/grass retro stadium | `stadium` (default) |
| `/1` | `Design1.jsx` (sin ticker) | Misma | `stadium` |
| `/2` | `Design1.jsx` (ticker bottom) | Misma | `stadium` |
| `/3` | `Design3.jsx` | Slate mono + emerald live | `slate` |
