import { useEffect, useRef } from "react";

const CELL = 20;
const COLS = 28;
const ROWS = 31;

// Classic Pac-Man inspired maze (1=wall, 0=path, 2=dot, 3=power pellet)
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

    // Pac-Man state
    const pac = { x: 14 * CELL, y: 23 * CELL, dx: 1, dy: 0, mouth: 0, mouthDir: 1 };

    // Ghost states - start in different positions
    const ghosts = GHOST_COLORS.map((color, i) => ({
      x: (12 + i * 2) * CELL,
      y: 14 * CELL,
      dx: i % 2 === 0 ? 1 : -1,
      dy: 0,
      color,
      timer: 0,
    }));

    const canMove = (px: number, py: number) => {
      const col = Math.floor(px / CELL);
      const row = Math.floor(py / CELL);
      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return true; // wrap
      return MAZE[row]?.[col] !== 1;
    };

    const getDirections = (px: number, py: number) => {
      const dirs: [number, number][] = [];
      const col = Math.round(px / CELL);
      const row = Math.round(py / CELL);
      if (canMove((col + 1) * CELL, row * CELL)) dirs.push([1, 0]);
      if (canMove((col - 1) * CELL, row * CELL)) dirs.push([-1, 0]);
      if (canMove(col * CELL, (row + 1) * CELL)) dirs.push([0, 1]);
      if (canMove(col * CELL, (row - 1) * CELL)) dirs.push([0, -1]);
      return dirs;
    };

    const drawWall = (r: number, c: number) => {
      ctx.fillStyle = "#1a1a6e";
      ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
      // inner highlight
      ctx.strokeStyle = "#3333cc";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(c * CELL + 2, r * CELL + 2, CELL - 4, CELL - 4);
    };

    const drawDot = (r: number, c: number) => {
      ctx.fillStyle = "#ffb8ae";
      ctx.beginPath();
      ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPowerPellet = (r: number, c: number, frame: number) => {
      ctx.fillStyle = frame % 30 < 15 ? "#ffb8ae" : "#ff6666";
      ctx.beginPath();
      ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPacman = (frame: number) => {
      const mouthAngle = (Math.sin(frame * 0.2) * 0.3 + 0.3);
      const angle = Math.atan2(pac.dy, pac.dx);
      ctx.fillStyle = "#FFFF00";
      ctx.beginPath();
      ctx.arc(
        pac.x + CELL / 2, pac.y + CELL / 2, CELL / 2 - 1,
        angle + mouthAngle, angle + Math.PI * 2 - mouthAngle
      );
      ctx.lineTo(pac.x + CELL / 2, pac.y + CELL / 2);
      ctx.closePath();
      ctx.fill();
    };

    const drawGhost = (g: typeof ghosts[0]) => {
      const cx = g.x + CELL / 2;
      const cy = g.y + CELL / 2;
      ctx.fillStyle = g.color;
      // body
      ctx.beginPath();
      ctx.arc(cx, cy - 2, CELL / 2 - 1, Math.PI, 0);
      ctx.lineTo(cx + CELL / 2 - 1, cy + CELL / 2 - 1);
      // wavy bottom
      for (let i = 0; i < 3; i++) {
        const bx = cx + CELL / 2 - 1 - (i * (CELL - 2) / 3);
        ctx.quadraticCurveTo(bx - (CELL - 2) / 6, cy + CELL / 2 + 3, bx - (CELL - 2) / 3, cy + CELL / 2 - 1);
      }
      ctx.closePath();
      ctx.fill();
      // eyes
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(cx - 3, cy - 3, 3, 0, Math.PI * 2);
      ctx.arc(cx + 3, cy - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#222";
      ctx.beginPath();
      ctx.arc(cx - 3 + g.dx, cy - 3 + g.dy, 1.5, 0, Math.PI * 2);
      ctx.arc(cx + 3 + g.dx, cy - 3 + g.dy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    };

    let frame = 0;
    const speed = 1.2;

    const loop = () => {
      frame++;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      // Draw maze
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = MAZE[r][c];
          if (cell === 1) drawWall(r, c);
          else if (cell === 2) drawDot(r, c);
          else if (cell === 3) drawPowerPellet(r, c, frame);
        }
      }

      // Move pac-man
      const nextPx = pac.x + pac.dx * speed;
      const nextPy = pac.y + pac.dy * speed;

      // Snap to grid for direction changes
      const atGrid = Math.abs(pac.x % CELL) < speed * 1.5 && Math.abs(pac.y % CELL) < speed * 1.5;

      if (atGrid) {
        const dirs = getDirections(pac.x, pac.y);
        if (dirs.length > 0) {
          // Try to keep current direction, otherwise pick random
          const canContinue = dirs.some(([dx, dy]) => dx === pac.dx && dy === pac.dy);
          if (!canContinue || Math.random() < 0.08) {
            const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
            pac.dx = dx;
            pac.dy = dy;
          }
        }
        // Snap
        pac.x = Math.round(pac.x / CELL) * CELL;
        pac.y = Math.round(pac.y / CELL) * CELL;
      }

      if (canMove(pac.x + pac.dx * CELL, pac.y + pac.dy * CELL) || !atGrid) {
        pac.x += pac.dx * speed;
        pac.y += pac.dy * speed;
      }

      // Wrap
      if (pac.x < -CELL) pac.x = W;
      if (pac.x > W) pac.x = -CELL;

      drawPacman(frame);

      // Move ghosts
      ghosts.forEach((g) => {
        g.timer++;
        const gAtGrid = Math.abs(g.x % CELL) < speed * 1.5 && Math.abs(g.y % CELL) < speed * 1.5;
        if (gAtGrid) {
          const dirs = getDirections(g.x, g.y);
          if (dirs.length > 0) {
            const canContinue = dirs.some(([dx, dy]) => dx === g.dx && dy === g.dy);
            if (!canContinue || Math.random() < 0.15) {
              // Slight bias toward pac-man
              const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
              g.dx = dx;
              g.dy = dy;
            }
          }
          g.x = Math.round(g.x / CELL) * CELL;
          g.y = Math.round(g.y / CELL) * CELL;
        }
        if (canMove(g.x + g.dx * CELL, g.y + g.dy * CELL) || !gAtGrid) {
          g.x += g.dx * speed;
          g.y += g.dy * speed;
        }
        if (g.x < -CELL) g.x = W;
        if (g.x > W) g.x = -CELL;

        drawGhost(g);
      });

      requestAnimationFrame(loop);
    };

    const handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center" style={{ opacity: 0.12 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: COLS * CELL,
          height: ROWS * CELL,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};

export default Pacman;
