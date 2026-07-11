import { motion } from "framer-motion";

const Mario = () => {
    // Two tiny decorative marios at the corners — never overlap content (max-w-md centered)
    const marios = [
        { id: 0, side: "left", top: "12%", delay: 0 },
        { id: 1, side: "right", top: "72%", delay: 1.2 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
            {marios.map((mario) => (
                <motion.div
                    key={mario.id}
                    className="absolute w-6 h-6 pointer-events-none opacity-50"
                    style={{
                        [mario.side === "left" ? "left" : "right"]: "4%",
                        top: mario.top,
                    }}
                    animate={{
                        y: ["0px", "-8px", "0px"],
                    }}
                    transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "steps(4)",
                        delay: mario.delay,
                    }}
                >
                    {/* Tiny 8x8 pixel Mario sprite */}
                    <svg viewBox="0 0 8 10" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
                        {/* Hat */}
                        <rect x="2" y="0" width="4" height="1" fill="#E60012" />
                        <rect x="1" y="1" width="6" height="1" fill="#E60012" />
                        {/* Face */}
                        <rect x="1" y="2" width="2" height="1" fill="#FFD7B5" />
                        <rect x="3" y="2" width="2" height="1" fill="#FFD7B5" />
                        <rect x="5" y="2" width="2" height="1" fill="#FFD7B5" />
                        {/* Eyes */}
                        <rect x="3" y="3" width="1" height="1" fill="#000" />
                        <rect x="5" y="3" width="1" height="1" fill="#000" />
                        <rect x="2" y="4" width="4" height="1" fill="#FFD7B5" />
                        {/* Mustache */}
                        <rect x="2" y="5" width="4" height="1" fill="#5A2D0C" />
                        {/* Shirt */}
                        <rect x="1" y="6" width="6" height="1" fill="#E60012" />
                        {/* Overalls */}
                        <rect x="2" y="7" width="4" height="1" fill="#1E40AF" />
                        {/* Legs */}
                        <rect x="1" y="8" width="2" height="1" fill="#1E40AF" />
                        <rect x="5" y="8" width="2" height="1" fill="#1E40AF" />
                        {/* Shoes */}
                        <rect x="0" y="9" width="3" height="1" fill="#5A2D0C" />
                        <rect x="5" y="9" width="3" height="1" fill="#5A2D0C" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

export default Mario;
