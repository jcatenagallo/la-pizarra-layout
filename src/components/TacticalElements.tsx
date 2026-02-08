import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TacticalElementsProps {
  opacity?: number;
  color?: string;
}

export function TacticalElements({
  opacity = 0.15,
  color = "#E8E4D9",
}: TacticalElementsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const players = [
    { x: 100, y: 120, type: "x" },
    { x: 200, y: 200, type: "o" },
    { x: 300, y: 100, type: "x" },
    { x: 400, y: 280, type: "o" },
    { x: 500, y: 150, type: "x" },
    { x: 600, y: 220, type: "o" },
    { x: 700, y: 130, type: "x" },
    { x: 800, y: 200, type: "o" },
  ];

  const arrows = [
    { x1: 120, y1: 120, x2: 250, y2: 100, curve: 30 },
    { x1: 230, y1: 200, x2: 370, y2: 150, curve: -40 },
    { x1: 530, y1: 150, x2: 650, y2: 220, curve: 50 },
    { x1: 720, y1: 130, x2: 850, y2: 180, curve: -30 },
  ];

  return (
    <div
      className="fixed inset-0                  
  pointer-events-none overflow-hidden"
      style={{
        opacity,
      }}
    >
      <svg
        viewBox="-40 -40 1080 580"
        className="w-full h-full"
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Players */}
        {players.map((p, i) =>
          p.type === "x" ? (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.2 }}
            >
              <motion.line
                x1={p.x - 15}
                y1={p.y - 15}
                x2={p.x + 15}
                y2={p.y + 15}
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                animate={{
                  x: [0, Math.random() * 10 - 5, 0],
                  y: [0, Math.random() * 10 - 5, 0],
                }}
                transition={{ duration: 8 + i, repeat: Infinity }}
              />
              <motion.line
                x1={p.x + 15}
                y1={p.y - 15}
                x2={p.x - 15}
                y2={p.y + 15}
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                animate={{
                  x: [0, Math.random() * 10 - 5, 0],
                  y: [0, Math.random() * 10 - 5, 0],
                }}
                transition={{ duration: 8 + i, repeat: Infinity }}
              />
            </motion.g>
          ) : (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={12}
              fill="none"
              stroke={color}
              strokeWidth={1.8}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                mounted
                  ? {
                      opacity: 1,
                      scale: 1,
                      cx: [p.x, p.x + Math.random() * 20 - 10, p.x],
                    }
                  : {}
              }
              transition={{
                delay: i * 0.2,
                cx: {
                  duration: 10 + i,
                  repeat: Infinity,
                },
              }}
            />
          ),
        )}
        {/* Arrows */}
        {arrows.map((a, i) => (
          <motion.g key={`arrow-${i}`}>
            <motion.path
              d={`M ${a.x1} ${a.y1} Q   
  ${(a.x1 + a.x2) / 2} ${(a.y1 + a.y2) / 2 + a.curve}
   ${a.x2} ${a.y2}`}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray={300}
              initial={{ strokeDashoffset: 300, opacity: 0 }}
              animate={
                mounted
                  ? {
                      strokeDashoffset: 0,
                      opacity: 1,
                    }
                  : {}
              }
              transition={{ delay: i * 0.3 + 0.5, duration: 1.5 }}
            />
            <motion.polygon
              points={`${a.x2},${a.y2} ${a.x2 - 12},${a.y2 - 6}  
  ${a.x2 - 12},${a.y2 + 6}`}
              fill={color}
              initial={{ opacity: 0, scale: 0 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.3 + 1.7 }}
              style={{ transformOrigin: `${a.x2}px ${a.y2}px` }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
