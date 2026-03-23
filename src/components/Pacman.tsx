import { useEffect, useState } from "react";

interface Ghost {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
}

interface PacmanEntity {
  x: number;
  y: number;
  dx: number;
  dy: number;
  mouthOpen: boolean;
}

const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFB852"];
const DOT_COUNT = 20;

const Pacman = () => {
  const [pac, setPac] = useState<PacmanEntity>({
    x: 10, y: 50, dx: 0.8, dy: 0.3, mouthOpen: true,
  });
  const [ghosts] = useState<Ghost[]>(() =>
    GHOST_COLORS.map((color, i) => ({
      id: i,
      x: 60 + Math.random() * 30,
      y: 10 + Math.random() * 80,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      color,
      size: 14,
    }))
  );
  const [dots] = useState(() =>
    Array.from({ length: DOT_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 95 + 2,
      y: Math.random() * 95 + 2,
    }))
  );

  useEffect(() => {
    let frame: number;
    let tick = 0;

    const ghostState = ghosts.map((g) => ({ ...g }));
    const pacState = { ...pac };

    const loop = () => {
      tick++;

      // Update pac
      pacState.x += pacState.dx;
      pacState.y += pacState.dy;
      if (pacState.x > 105) { pacState.x = -5; }
      if (pacState.x < -5) { pacState.x = 105; }
      if (pacState.y > 100 || pacState.y < 0) { pacState.dy *= -1; }
      if (tick % 8 === 0) pacState.mouthOpen = !pacState.mouthOpen;

      // Update ghosts
      ghostState.forEach((g) => {
        g.x += g.dx;
        g.y += g.dy;
        if (g.x > 105) g.x = -5;
        if (g.x < -5) g.x = 105;
        if (g.y > 98 || g.y < 2) g.dy *= -1;
        if (Math.random() < 0.01) {
          g.dx += (Math.random() - 0.5) * 0.3;
          g.dy += (Math.random() - 0.5) * 0.3;
          g.dx = Math.max(-0.7, Math.min(0.7, g.dx));
          g.dy = Math.max(-0.7, Math.min(0.7, g.dy));
        }
      });

      // Apply to DOM directly for smooth animation
      const pacEl = document.getElementById("pac-entity");
      if (pacEl) {
        pacEl.style.left = `${pacState.x}%`;
        pacEl.style.top = `${pacState.y}%`;
        pacEl.style.transform = `scaleX(${pacState.dx < 0 ? -1 : 1})`;
        const mouth = pacEl.querySelector(".pac-mouth") as HTMLElement;
        if (mouth) mouth.style.opacity = pacState.mouthOpen ? "1" : "0";
      }

      ghostState.forEach((g) => {
        const el = document.getElementById(`ghost-${g.id}`);
        if (el) {
          el.style.left = `${g.x}%`;
          el.style.top = `${g.y}%`;
        }
      });

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ opacity: 0.15 }}>
      {/* Dots */}
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: 4,
            height: 4,
            backgroundColor: "hsl(var(--pixel-yellow))",
          }}
        />
      ))}

      {/* Pac-Man */}
      <div
        id="pac-entity"
        className="absolute"
        style={{ left: "10%", top: "50%", transition: "none" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#FFFF00" />
          <circle cx="13" cy="5" r="1.5" fill="#000" />
          <path
            className="pac-mouth"
            d="M10,10 L20,4 L20,16 Z"
            fill="hsl(240, 20%, 8%)"
            style={{ transition: "opacity 0.1s" }}
          />
        </svg>
      </div>

      {/* Ghosts */}
      {ghosts.map((g) => (
        <div
          key={g.id}
          id={`ghost-${g.id}`}
          className="absolute"
          style={{ left: `${g.x}%`, top: `${g.y}%` }}
        >
          <svg width="16" height="18" viewBox="0 0 16 18">
            <path
              d={`M0,18 L0,8 Q0,0 8,0 Q16,0 16,8 L16,18 L13,15 L10,18 L8,15 L6,18 L3,15 Z`}
              fill={g.color}
            />
            <circle cx="5" cy="8" r="2" fill="white" />
            <circle cx="11" cy="8" r="2" fill="white" />
            <circle cx="5.5" cy="8.5" r="1" fill="#222" />
            <circle cx="11.5" cy="8.5" r="1" fill="#222" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Pacman;
