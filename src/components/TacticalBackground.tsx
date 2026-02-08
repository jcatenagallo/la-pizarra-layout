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

  // Random positions for tactical elements
  const players = [
    { x: 150, y: 200, type: "x" },
    { x: 250, y: 280, type: "o" },
    { x: 350, y: 150, type: "x" },
    { x: 450, y: 350, type: "o" },
    { x: 550, y: 200, type: "x" },
    { x: 650, y: 300, type: "o" },
    { x: 750, y: 180, type: "x" },
    { x: 850, y: 280, type: "o" },
    { x: 950, y: 220, type: "x" },
    { x: 1050, y: 350, type: "o" },
  ];

  const arrows = [
    { x1: 170, y1: 200, x2: 300, y2: 150, curve: 30 },
    { x1: 280, y1: 280, x2: 420, y2: 200, curve: -40 },
    { x1: 580, y1: 200, x2: 700, y2: 300, curve: 50 },
    { x1: 770, y1: 180, x2: 900, y2: 250, curve: -30 },
    { x1: 980, y1: 220, x2: 1100, y2: 180, curve: 20 },
  ];

  const renderFieldLines = () => (
    <g className="field-lines">
      {/* Main field outline */}
      <rect
        x="100"
        y="100"
        width="1000"
        height="500"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 1.5}
        rx="2"
      />

      {/* Center line */}
      <line
        x1="600"
        y1="100"
        x2="600"
        y2="600"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Center circle */}
      <circle
        cx="600"
        cy="350"
        r="80"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Center dot */}
      <circle cx="600" cy="350" r="4" fill={color} />

      {/* Left penalty area */}
      <rect
        x="100"
        y="200"
        width="120"
        height="300"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Left goal area */}
      <rect
        x="100"
        y="275"
        width="50"
        height="150"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Left penalty arc */}
      <path
        d={`M 220 280 A 60 60 0 0 1 220 420`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Left penalty spot */}
      <circle cx="180" cy="350" r="3" fill={color} />

      {/* Right penalty area */}
      <rect
        x="980"
        y="200"
        width="120"
        height="300"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Right goal area */}
      <rect
        x="1050"
        y="275"
        width="50"
        height="150"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Right penalty arc */}
      <path
        d={`M 980 280 A 60 60 0 0 0 980 420`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Right penalty spot */}
      <circle cx="1020" cy="350" r="3" fill={color} />

      {/* Corner arcs */}
      <path
        d="M 100 110 A 10 10 0 0 1 110 100"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 1090 100 A 10 10 0 0 1 1100 110"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 100 590 A 10 10 0 0 0 110 600"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M 1090 600 A 10 10 0 0 0 1100 590"
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
          viewBox="0 0 1200 700"
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
          viewBox="0 0 1200 700"
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
          viewBox="0 0 1200 700"
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
          viewBox="0 0 1200 700"
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
        viewBox="0 0 1200 700"
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
