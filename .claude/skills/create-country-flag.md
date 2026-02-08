# Skill: Create Country Flag

Genera banderas SVG para el componente `CountryBadge` de La Pizarra.

## Cuándo usar esta skill

Cuando el usuario pida agregar una bandera de un nuevo país al proyecto.

## Patrón establecido

Las banderas siguen estas reglas:

### Dimensiones y ViewBox
- **ViewBox**: `0 0 30 20` (proporción 3:2, estándar de banderas)
- **Width**: `size * 1.5` (donde size es el prop del componente)
- **Height**: `size`

### Estilo visual
- Banderas **simplificadas pero reconocibles**
- Sin bordes ni sombras en el SVG (el contenedor agrega `rounded-sm overflow-hidden shadow-sm`)
- Colores oficiales de cada bandera
- Detalles mínimos: solo los elementos esenciales para identificar el país

### Estructura del código

```tsx
// [País] - descripción breve del diseño
countryCode: (
  <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
    {/* Elementos de la bandera */}
  </svg>
),
```

### Ejemplos de patrones comunes

**Franjas horizontales** (ej: Alemania, Argentina):
```tsx
<rect width="30" height="6.67" fill="#color1" />
<rect y="6.67" width="30" height="6.67" fill="#color2" />
<rect y="13.33" width="30" height="6.67" fill="#color3" />
```

**Franjas verticales** (ej: Francia, Italia):
```tsx
<rect width="10" height="20" fill="#color1" />
<rect x="10" width="10" height="20" fill="#color2" />
<rect x="20" width="10" height="20" fill="#color3" />
```

**Cruz** (ej: Inglaterra, países nórdicos):
```tsx
<rect width="30" height="20" fill="#background" />
<rect x="12" y="0" width="6" height="20" fill="#crossColor" />
<rect x="0" y="7" width="30" height="6" fill="#crossColor" />
```

**Con elemento central** (ej: Brasil):
```tsx
<rect width="30" height="20" fill="#background" />
<polygon points="15,2 28,10 15,18 2,10" fill="#shapeColor" />
<circle cx="15" cy="10" r="4" fill="#centerColor" />
```

## Archivo a modificar

`src/components/CountryBadge.tsx`

Agregar la nueva bandera dentro del objeto `flags`:

```tsx
const flags: Record<string, JSX.Element> = {
  // ... banderas existentes ...

  // Nueva bandera aquí
  newCountryCode: (
    <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
      {/* Elementos */}
    </svg>
  ),
};
```

## También actualizar

Si es un país nuevo (no solo una competición), agregar en `src/data/matches.js`:

```js
// En el array countries
{ id: 'countryCode', name: 'Nombre del País', flag: '🏳️' }, // flag ya no se usa pero mantener por compatibilidad
```

## Banderas actuales implementadas

| Código | País | Diseño |
|--------|------|--------|
| `esp` | España | Rojo-amarillo-rojo horizontal con escudo |
| `eng` | Inglaterra | Cruz de San Jorge |
| `ita` | Italia | Verde-blanco-rojo vertical |
| `ger` | Alemania | Negro-rojo-amarillo horizontal |
| `fra` | Francia | Azul-blanco-rojo vertical |
| `arg` | Argentina | Celeste-blanco-celeste horizontal |
| `bra` | Brasil | Verde + rombo amarillo + esfera azul |
| `int` | Internacional | Globo dorado sobre verde |

## Recursos para colores oficiales

- Wikipedia tiene los colores hex oficiales de cada bandera
- Buscar "[país] flag colors hex" para encontrar los valores exactos
