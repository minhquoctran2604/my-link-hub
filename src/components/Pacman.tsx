import { useEffect, useRef } from "react";

const CELL = 20;
const COLS = 28;
const ROWS = 31;

const MAZE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFB852"];

// Path cells for movement
const pathCells: [number, number][] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    if (MAZE[r]?.[c] !== 1) pathCells.push([r, c]);
  }
}

const getNeighbors = (r: number, c: number): [number, number][] => {
  const dirs: [number, number][] = [[0,1],[0,-1],[1,0],[-1,0]];
  const result: [number, number][] = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;
    // Wrap horizontally
    const wc = nc < 0 ? COLS - 1 : nc >= COLS ? 0 : nc;
    if (nr >= 0 && nr < ROWS && MAZE[nr]?.[wc] !== 1) {
      result.push([nr, wc]);
    }
  }
  return result;
};

interface Entity {
  r: number;
  c: number;
  tr: number; // target row
  tc: number; // target col
  prevR: number;
  prevC: number;
  progress: number; // 0-1 interpolation between prev and current
  color: string;
  isChasing: boolean;
  targetEntity: number; // index of entity being chased
}

const Pacman = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = COLS * CELL;
    const H = ROWS * CELL;
    canvas.width = W;
    canvas.height = H;

    // Initialize entities: pac-man + 4 ghosts
    const randomPath = () => pathCells[Math.floor(Math.random() * pathCells.length)];

    const entities: Entity[] = [
      // Pac-Man
      (() => {
        const [r, c] = randomPath();
        return { r, c, tr: r, tc: c, prevR: r, prevC: c, progress: 1, color: "#FFFF00", isChasing: false, targetEntity: -1 };
      })(),
      // Ghosts
      ...GHOST_COLORS.map((color, i) => {
        const [r, c] = randomPath();
        return { r, c, tr: r, tc: c, prevR: r, prevC: c, progress: 1, color, isChasing: true, targetEntity: 0 };
      }),
    ];

    // Ghosts chase pac-man, pac-man wanders. Periodically switch roles.
    let chaseMode = true;
    let modeTimer = 0;

    const pickNextCell = (e: Entity) => {
      const neighbors = getNeighbors(e.r, e.c);
      if (neighbors.length === 0) return;

      if (e.isChasing && e.targetEntity >= 0) {
        // Chase: pick neighbor closest to target
        const target = entities[e.targetEntity];
        let best = neighbors[0];
        let bestDist = Infinity;
        for (const [nr, nc] of neighbors) {
          // Don't reverse unless only option
          if (neighbors.length > 1 && nr === e.prevR && nc === e.prevC) continue;
          const dist = Math.abs(nr - target.r) + Math.abs(nc - target.c);
          if (dist < bestDist) {
            bestDist = dist;
            best = [nr, nc];
          }
        }
        e.prevR = e.r;
        e.prevC = e.c;
        e.r = best[0];
        e.c = best[1];
      } else {
        // Wander: random but avoid reversing
        const filtered = neighbors.length > 1
          ? neighbors.filter(([nr, nc]) => !(nr === e.prevR && nc === e.prevC))
          : neighbors;
        const [nr, nc] = filtered[Math.floor(Math.random() * filtered.length)];
        e.prevR = e.r;
        e.prevC = e.c;
        e.r = nr;
        e.c = nc;
      }
      e.progress = 0;
    };

    const moveSpeed = 0.045; // progress per frame

    const drawMaze = (frame: number) => {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = MAZE[r][c];
          if (cell === 1) {
            ctx.fillStyle = "#1a1a6e";
            ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
            ctx.strokeStyle = "#3333cc";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(c * CELL + 2, r * CELL + 2, CELL - 4, CELL - 4);
          } else if (cell === 2) {
            ctx.fillStyle = "#ffb8ae";
            ctx.beginPath();
            ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (cell === 3) {
            ctx.fillStyle = frame % 30 < 15 ? "#ffb8ae" : "#ff6666";
            ctx.beginPath();
            ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const getEntityPos = (e: Entity) => {
      const t = easeInOut(Math.min(e.progress, 1));
      // Handle wrapping
      let pr = e.prevR, pc = e.prevC;
      let cr = e.r, cc = e.c;
      // If wrapping horizontally
      if (Math.abs(cc - pc) > 2) {
        if (cc > pc) pc += COLS;
        else cc += COLS;
      }
      const x = lerp(pc * CELL + CELL / 2, cc * CELL + CELL / 2, t) % (COLS * CELL);
      const y = lerp(pr * CELL + CELL / 2, cr * CELL + CELL / 2, t);
      return { x: x < 0 ? x + W : x, y };
    };

    const drawPacMan = (e: Entity, frame: number) => {
      const { x, y } = getEntityPos(e);
      const mouthAngle = Math.abs(Math.sin(frame * 0.15)) * 0.8;
      const dx = e.c - e.prevC;
      const dy = e.r - e.prevR;
      const angle = Math.atan2(dy || 0, dx || 0);

      ctx.fillStyle = "#FFFF00";
      ctx.beginPath();
      ctx.arc(x, y, CELL / 2 - 1, angle + mouthAngle, angle + Math.PI * 2 - mouthAngle);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();

      // Eye
      const eyeAngle = angle + Math.PI / 4;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(x + Math.cos(eyeAngle) * 4, y + Math.sin(eyeAngle) * 4 - 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawGhost = (e: Entity, frame: number) => {
      const { x, y } = getEntityPos(e);
      const wobble = Math.sin(frame * 0.1) * 1;

      ctx.fillStyle = e.color;
      ctx.beginPath();
      ctx.arc(x, y - 2, CELL / 2 - 1, Math.PI, 0);
      ctx.lineTo(x + CELL / 2 - 1, y + CELL / 2 - 1);
      // Wavy skirt
      const segments = 4;
      const segW = (CELL - 2) / segments;
      for (let i = 0; i < segments; i++) {
        const sx = x + CELL / 2 - 1 - i * segW;
        const wob = (i % 2 === 0 ? 1 : -1) * (2 + wobble);
        ctx.quadraticCurveTo(sx - segW / 2, y + CELL / 2 - 1 + wob, sx - segW, y + CELL / 2 - 1);
      }
      ctx.closePath();
      ctx.fill();

      // Eyes
      const lookDx = e.c - e.prevC;
      const lookDy = e.r - e.prevR;
      for (const ox of [-3, 3]) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x + ox, y - 3, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2222aa";
        ctx.beginPath();
        ctx.arc(x + ox + (lookDx || 0) * 1.2, y - 3 + (lookDy || 0) * 1.2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let frame = 0;
    let animId: number;

    const loop = () => {
      frame++;
      modeTimer++;

      // Switch chase/scatter mode periodically
      if (modeTimer > 400) {
        modeTimer = 0;
        chaseMode = !chaseMode;
        // When scattered, ghosts wander
        entities.forEach((e, i) => {
          if (i > 0) e.isChasing = chaseMode;
        });
        // Occasionally pac-man chases a ghost (power pellet mode)
        if (!chaseMode && Math.random() < 0.3) {
          entities[0].isChasing = true;
          entities[0].targetEntity = 1 + Math.floor(Math.random() * 4);
        } else {
          entities[0].isChasing = false;
        }
      }

      // Update entity movement
      entities.forEach((e) => {
        e.progress += moveSpeed;
        if (e.progress >= 1) {
          e.progress = 1;
          pickNextCell(e);
        }
      });

      // Draw
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      drawMaze(frame);
      drawPacMan(entities[0], frame);
      for (let i = 1; i < entities.length; i++) {
        drawGhost(entities[i], frame);
      }

      animId = requestAnimationFrame(loop);
    };

    // Init movement
    entities.forEach((e) => pickNextCell(e));
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center" style={{ opacity: 0.15 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};

export default Pacman;
