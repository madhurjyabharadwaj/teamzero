import { useMemo } from "react";

const COLORS = [
  "hsl(256 100% 66%)", // Electric Iris
  "hsl(40 100% 58%)", // Saffron Spark
  "hsl(168 73% 40%)", // Deep Verdant
  "hsl(300 80% 65%)", // magenta
  "hsl(220 90% 65%)", // blue
];

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotate: number;
  duration: number;
  delay: number;
};

function makeParticles(count: number, seed: number): Particle[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: 4 + rand() * 9,
    color: COLORS[Math.floor(rand() * COLORS.length)],
    opacity: 0.12 + rand() * 0.45,
    rotate: rand() * 360,
    duration: 14 + rand() * 22,
    delay: -rand() * 20,
  }));
}

/** Ambient triangular particle field drifting on the pure black void. */
export function AmbientBackground() {
  const particles = useMemo(() => makeParticles(90, 20260901), []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {particles.map((p, i) => (
        <svg
          key={i}
          className="ambient-orb absolute"
          width={p.size}
          height={p.size}
          viewBox="0 0 10 10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            animation: `drift-slow ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <path
            d="M5 0.8 L9.2 9.2 L0.8 9.2 Z"
            fill="none"
            stroke={p.color}
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </div>
  );
}
