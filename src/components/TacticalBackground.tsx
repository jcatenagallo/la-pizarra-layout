import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TacticalBackgroundProps {
  variant?: "default" | "minimal" | "intense" | "abstract" | "geometric";
  opacity?: number;
  animated?: boolean;
  color?: string;
}

export function TacticalBackground({
  variant = "default",
  opacity = 0.15,
  animated = true,
  color = "#E8E4D9",
}: TacticalBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const strokeWidth = 1.5;
  const dashArray = animated ? "4 4" : "none";

  // Random positions for tactical elements (adjusted for 1000x500 viewBox)
  const players = [
    { x: 100, y: 120, type: "x" },
    { x: 200, y: 200, type: "o" },
    { x: 300, y: 100, type: "x" },
    { x: 400, y: 280, type: "o" },
    { x: 500, y: 150, type: "x" },
    { x: 600, y: 220, type: "o" },
    { x: 700, y: 130, type: "x" },
    { x: 800, y: 200, type: "o" },
    { x: 900, y: 160, type: "x" },
    { x: 950, y: 280, type: "o" },
  ];

  const arrows = [
    { x1: 120, y1: 120, x2: 250, y2: 100, curve: 30 },
    { x1: 230, y1: 200, x2: 370, y2: 150, curve: -40 },
    { x1: 530, y1: 150, x2: 650, y2: 220, curve: 50 },
    { x1: 720, y1: 130, x2: 850, y2: 180, curve: -30 },
    { x1: 880, y1: 160, x2: 970, y2: 130, curve: 20 },
  ];

  const renderFieldLines = () => (
    <g className="field-lines">
      {/* Main field outline - full width */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="500"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 1.5}
        rx="2"
      />

      {/* Center line */}
      <line
        x1="500"
        y1="0"
        x2="500"
        y2="500"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Center circle */}
      <circle
        cx="500"
        cy="250"
        r="80"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Center dot */}
      <circle cx="500" cy="250" r="4" fill={color} />

      {/* Left penalty area */}
      <rect
        x="0"
        y="100"
        width="120"
        height="300"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Left goal area */}
      <rect
        x="0"
        y="175"
        width="50"
        height="150"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Left penalty arc */}
      <path
        d={`M 120 180 A 60 60 0 0 1 120 320`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Left penalty spot */}
      <circle cx="80" cy="250" r="3" fill={color} />

      {/* Right penalty area */}
      <rect
        x="880"
        y="100"
        width="120"
        height="300"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Right goal area */}
      <rect
        x="950"
        y="175"
        width="50"
        height="150"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Right penalty arc */}
      <path
        d={`M 880 180 A 60 60 0 0 0 880 320`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Right penalty spot */}
      <circle cx="920" cy="250" r="3" fill={color} />

      {/* Corner arcs */}
      <path
        d="M 0 10 A 10 10 0 0 1 10 0"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 990 0 A 10 10 0 0 1 1000 10"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 0 490 A 10 10 0 0 0 10 500"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 990 500 A 10 10 0 0 0 1000 490"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </g>
  );

  const renderPlayer = (
    x: number,
    y: number,
    type: "x" | "o",
    index: number,
  ) => {
    const delay = index * 0.2;
    const size = type === "x" ? 15 : 12;

    if (type === "x") {
      return (
        <motion.g
          key={`player-${index}`}
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={
            mounted && animated
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ delay, duration: 0.5, type: "spring" }}
        >
          <motion.line
            x1={x - size}
            y1={y - size}
            x2={x + size}
            y2={y + size}
            stroke={color}
            strokeWidth={strokeWidth * 1.2}
            strokeLinecap="round"
            animate={
              animated
                ? {
                    x: [0, Math.random() * 10 - 5, 0],
                    y: [0, Math.random() * 10 - 5, 0],
                  }
                : {}
            }
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1={x + size}
            y1={y - size}
            x2={x - size}
            y2={y + size}
            stroke={color}
            strokeWidth={strokeWidth * 1.2}
            strokeLinecap="round"
            animate={
              animated
                ? {
                    x: [0, Math.random() * 10 - 5, 0],
                    y: [0, Math.random() * 10 - 5, 0],
                  }
                : {}
            }
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>
      );
    }

    return (
      <motion.circle
        key={`player-${index}`}
        cx={x}
        cy={y}
        r={size}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 1.2}
        initial={animated ? { opacity: 0, scale: 0 } : {}}
        animate={
          mounted && animated
            ? {
                opacity: 1,
                scale: 1,
                cx: animated ? [x, x + Math.random() * 20 - 10, x] : x,
                cy: animated ? [y, y + Math.random() * 20 - 10, y] : y,
              }
            : { opacity: 1, scale: 1 }
        }
        transition={{
          delay,
          duration: 0.5,
          type: "spring",
          cx: { duration: 10 + index, repeat: Infinity },
          cy: { duration: 10 + index, repeat: Infinity },
        }}
      />
    );
  };

  const renderArrow = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    curve: number,
    index: number,
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 + curve;
    const pathLength = 300;
    const delay = index * 0.3 + 0.5;

    return (
      <motion.g key={`arrow-${index}`}>
        <motion.path
          d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={animated ? pathLength : "none"}
          initial={animated ? { strokeDashoffset: pathLength, opacity: 0 } : {}}
          animate={
            mounted && animated
              ? { strokeDashoffset: 0, opacity: 1 }
              : { opacity: 1 }
          }
          transition={{ delay, duration: 1.5, ease: "easeOut" }}
        />
        {/* Arrow head */}
        <motion.polygon
          points={`${x2},${y2} ${x2 - 12},${y2 - 6} ${x2 - 12},${y2 + 6}`}
          fill={color}
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={
            mounted && animated
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ delay: delay + 1.2, duration: 0.3 }}
          style={{ transformOrigin: `${x2}px ${y2}px` }}
        />
      </motion.g>
    );
  };

  if (variant === "minimal") {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ opacity }}
      >
        <svg
          viewBox="-40 -40 1080 580"
          className="w-full h-full"
          preserveAspectRatio="xMidYMin meet"
        >
          {renderFieldLines()}
        </svg>
      </div>
    );
  }

  if (variant === "abstract") {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ opacity }}
      >
        <svg
          viewBox="-40 -40 1080 580"
          className="w-full h-full"
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Abstract geometric patterns inspired by tactical boards */}
          <motion.circle
            cx="300"
            cy="300"
            r="150"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            animate={animated ? { rotate: 360 } : {}}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px" }}
          />
          <motion.circle
            cx="900"
            cy="400"
            r="200"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            animate={animated ? { rotate: -360 } : {}}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "900px 400px" }}
          />
          <motion.rect
            x="500"
            y="150"
            width="200"
            height="200"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            animate={animated ? { rotate: 45 } : {}}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "600px 250px" }}
          />
          {/* Floating X and O */}
          {[...Array(15)].map((_, i) => (
            <motion.g
              key={i}
              animate={
                animated
                  ? {
                      y: [0, -30, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }
                  : {}
              }
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {i % 2 === 0 ? (
                <g
                  transform={`translate(${100 + i * 80}, ${150 + (i % 3) * 150})`}
                >
                  <line
                    x1="-8"
                    y1="-8"
                    x2="8"
                    y2="8"
                    stroke={color}
                    strokeWidth={strokeWidth}
                  />
                  <line
                    x1="8"
                    y1="-8"
                    x2="-8"
                    y2="8"
                    stroke={color}
                    strokeWidth={strokeWidth}
                  />
                </g>
              ) : (
                <circle
                  cx={100 + i * 80}
                  cy={200 + (i % 4) * 100}
                  r="10"
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                />
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "geometric") {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ opacity }}
      >
        <svg
          viewBox="-40 -40 1080 580"
          className="w-full h-full"
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Hexagonal grid pattern */}
          {[...Array(8)].map((_, row) =>
            [...Array(12)].map((_, col) => {
              const x = col * 110 + (row % 2) * 55;
              const y = row * 95;
              return (
                <motion.polygon
                  key={`hex-${row}-${col}`}
                  points={`${x},${y - 30} ${x + 26},${y - 15} ${x + 26},${y + 15} ${x},${y + 30} ${x - 26},${y + 15} ${x - 26},${y - 15}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={0.5}
                  initial={{ opacity: 0 }}
                  animate={mounted ? { opacity: [0.2, 0.5, 0.2] } : {}}
                  transition={{
                    duration: 3,
                    delay: (row + col) * 0.1,
                    repeat: Infinity,
                  }}
                />
              );
            }),
          )}
          {/* Connecting lines */}
          {arrows.map((arrow, i) => (
            <motion.line
              key={`line-${i}`}
              x1={arrow.x1}
              y1={arrow.y1}
              x2={arrow.x2}
              y2={arrow.y2}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={mounted ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "intense") {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: opacity * 1.5 }}
      >
        <svg
          viewBox="-40 -40 1080 580"
          className="w-full h-full"
          preserveAspectRatio="xMidYMin meet"
        >
          {renderFieldLines()}
          {/* More players and arrows */}
          {players.map((p, i) =>
            renderPlayer(p.x, p.y, p.type as "x" | "o", i),
          )}
          {players.map((p, i) =>
            renderPlayer(
              p.x + 50,
              p.y + 100,
              p.type === "x" ? "o" : "x",
              i + 10,
            ),
          )}
          {arrows.map((a, i) =>
            renderArrow(a.x1, a.y1, a.x2, a.y2, a.curve, i),
          )}
          {arrows.map((a, i) =>
            renderArrow(
              a.x1 + 100,
              a.y1 + 100,
              a.x2 + 100,
              a.y2 + 50,
              -a.curve,
              i + 5,
            ),
          )}
          {/* Additional tactical markings */}
          <motion.ellipse
            cx="400"
            cy="350"
            rx="100"
            ry="60"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            animate={animated ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ transformOrigin: "400px 350px" }}
          />
          <motion.ellipse
            cx="800"
            cy="350"
            rx="80"
            ry="50"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            animate={animated ? { rotate: [0, -15, 15, 0] } : {}}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ transformOrigin: "800px 350px" }}
          />
        </svg>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      <svg
        viewBox="-40 -40 1080 580"
        className="w-full h-full"
        preserveAspectRatio="xMidYMin meet"
      >
        {renderFieldLines()}
        {players.map((p, i) => renderPlayer(p.x, p.y, p.type as "x" | "o", i))}
        {arrows.map((a, i) => renderArrow(a.x1, a.y1, a.x2, a.y2, a.curve, i))}
      </svg>
    </div>
  );
}
