interface CountryBadgeProps {
  countryId: string;
  size?: number;
}

export function CountryBadge({ countryId, size = 20 }: CountryBadgeProps) {
  const width = size * 1.5;
  const height = size;

  const flags: Record<string, JSX.Element> = {
    // España - rojo/amarillo/rojo horizontal con escudo simplificado
    esp: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="30" height="20" fill="#c60b1e" />
        <rect y="5" width="30" height="10" fill="#ffc400" />
        <rect x="6" y="7" width="4" height="6" fill="#c60b1e" rx="0.5" />
      </svg>
    ),

    // Inglaterra - Cruz de San Jorge
    eng: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="30" height="20" fill="#ffffff" />
        <rect x="12" y="0" width="6" height="20" fill="#ce1124" />
        <rect x="0" y="7" width="30" height="6" fill="#ce1124" />
      </svg>
    ),

    // Italia - verde/blanco/rojo vertical
    ita: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="10" height="20" fill="#009246" />
        <rect x="10" width="10" height="20" fill="#ffffff" />
        <rect x="20" width="10" height="20" fill="#ce2b37" />
      </svg>
    ),

    // Alemania - negro/rojo/amarillo horizontal
    ger: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="30" height="6.67" fill="#000000" />
        <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
        <rect y="13.33" width="30" height="6.67" fill="#ffcc00" />
      </svg>
    ),

    // Francia - azul/blanco/rojo vertical
    fra: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="10" height="20" fill="#002654" />
        <rect x="10" width="10" height="20" fill="#ffffff" />
        <rect x="20" width="10" height="20" fill="#ce1126" />
      </svg>
    ),

    // Argentina - celeste/blanco/celeste
    arg: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="30" height="6.67" fill="#74acdf" />
        <rect y="6.67" width="30" height="6.67" fill="#ffffff" />
        <rect y="13.33" width="30" height="6.67" fill="#74acdf" />
      </svg>
    ),

    // Brasil - verde con rombo amarillo y círculo azul
    bra: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="30" height="20" fill="#009c3b" />
        <polygon points="15,2 28,10 15,18 2,10" fill="#ffdf00" />
        <circle cx="15" cy="10" r="4" fill="#002776" />
        <path d="M11.5 10.5 Q15 8 18.5 10.5" stroke="#ffffff" strokeWidth="0.8" fill="none" />
      </svg>
    ),

    // Internacional (UEFA/FIFA) - globo simplificado
    int: (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="30" height="20" fill="#1a472a" />
        <circle cx="15" cy="10" r="6" stroke="#c4a747" strokeWidth="1" fill="none" />
        <ellipse cx="15" cy="10" rx="2.5" ry="6" stroke="#c4a747" strokeWidth="0.7" fill="none" />
        <line x1="9" y1="10" x2="21" y2="10" stroke="#c4a747" strokeWidth="0.7" />
        <line x1="15" y1="4" x2="15" y2="16" stroke="#c4a747" strokeWidth="0.7" />
      </svg>
    ),
  };

  const flag = flags[countryId];

  if (!flag) {
    // Fallback: bandera genérica gris
    return (
      <svg width={width} height={height} viewBox="0 0 30 20" fill="none">
        <rect width="30" height="20" fill="#444" rx="1" />
        <text x="15" y="13" fontSize="8" fill="#888" textAnchor="middle">?</text>
      </svg>
    );
  }

  return (
    <span className="inline-flex rounded-sm overflow-hidden shadow-sm" style={{ width, height }}>
      {flag}
    </span>
  );
}
