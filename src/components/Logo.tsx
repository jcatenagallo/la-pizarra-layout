import { motion } from "motion/react";

interface PizarraLogoProps {
  size?: number;
  color?: string;
  accentColor?: string;
  animated?: boolean;
}

export function PizarraLogo({
  size = 32,
  color = "#E8E4D9",
  accentColor = "#FFD700",
  animated = true,
}: PizarraLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50
   50"
    >
      {/* Pizarra (marco) */}
      <rect
        x="5"
        y="5"
        width="40"
        height="30"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Línea central */}
      <line x1="25" y1="5" x2="25" y2="35" stroke={color} strokeWidth="1" />

      {/* Círculo central */}
      <circle
        cx="25"
        cy="20"
        r="6"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />

      {/* Base de la pizarra */}
      <line
        x1="5"
        y1="42"
        x2="45"
        y2="42"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Línea táctica animada */}
      {animated ? (
        <motion.line
          x1="15"
          y1="15"
          x2="20"
          y2="25"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ) : (
        <line
          x1="15"
          y1="15"
          x2="20"
          y2="25"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
