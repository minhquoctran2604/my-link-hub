const Stars = () => {
  // Use deterministic seeded positions so the layout doesn't jump on re-render
  const stars = Array.from({ length: 18 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const seed2 = (i * 4457 + 18869) % 233280;
    return {
      id: i,
      left: `${(seed / 233280) * 100}%`,
      top: `${(seed2 / 233280) * 100}%`,
      delay: `${(i % 5) * 0.4}s`,
      size: i % 4 === 0 ? 3 : 2,
      hue: i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--primary)" : "var(--pixel-cyan)",
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: `hsl(${star.hue})`,
            animation: `twinkle 2.5s steps(1) ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
