import React from "react";
import { motion } from "framer-motion";

const Mario = () => {
    // Mario pixel data (very simplified 12x12 or similar)
    // We'll use a few variants of movement
    const marios = Array.from({ length: 4 }, (_, i) => ({
        id: i,
        initialX: Math.random() * 80 + 10 + "%",
        initialY: Math.random() * 80 + 10 + "%",
        delay: i * 0.8,
        duration: 2 + Math.random() * 2,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {marios.map((mario) => (
                <motion.div
                    key={mario.id}
                    className="absolute w-8 h-8 pointer-events-none"
                    initial={{ x: mario.initialX, y: mario.initialY, opacity: 0 }}
                    animate={{
                        y: ["0%", "-20px", "0%"],
                        scaleX: [1, -1, 1],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        y: {
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "steps(4)",
                            delay: mario.delay,
                        },
                        scaleX: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "steps(2)",
                            delay: mario.delay,
                        },
                        opacity: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }
                    }}
                    style={{
                        left: mario.initialX,
                        top: mario.initialY,
                    }}
                >
                    {/* Simple Pixel Mario SVG */}
                    <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
                        {/* Hat */}
                        <rect x="5" y="1" width="7" height="1" fill="#FF0000" />
                        <rect x="4" y="2" width="10" height="1" fill="#FF0000" />
                        {/* Hair/Face */}
                        <rect x="4" y="3" width="3" height="1" fill="#8B4513" />
                        <rect x="7" y="3" width="3" height="1" fill="#FFDAB9" />
                        <rect x="10" y="3" width="1" height="1" fill="#000000" />
                        <rect x="11" y="3" width="1" height="1" fill="#FFDAB9" />

                        <rect x="3" y="4" width="1" height="1" fill="#8B4513" />
                        <rect x="4" y="4" width="1" height="1" fill="#FFDAB9" />
                        <rect x="5" y="4" width="1" height="1" fill="#8B4513" />
                        <rect x="6" y="4" width="3" height="1" fill="#FFDAB9" />
                        <rect x="9" y="4" width="1" height="1" fill="#8B4513" />
                        <rect x="10" y="4" width="3" height="1" fill="#FFDAB9" />

                        <rect x="3" y="5" width="1" height="1" fill="#8B4513" />
                        <rect x="4" y="5" width="1" height="1" fill="#FFDAB9" />
                        <rect x="5" y="5" width="2" height="1" fill="#8B4513" />
                        <rect x="7" y="5" width="4" height="1" fill="#FFDAB9" />
                        <rect x="11" y="5" width="1" height="1" fill="#8B4513" />
                        <rect x="12" y="5" width="3" height="1" fill="#FFDAB9" />

                        <rect x="4" y="6" width="2" height="1" fill="#8B4513" />
                        <rect x="6" y="6" width="4" height="1" fill="#FFDAB9" />
                        <rect x="10" y="6" width="4" height="1" fill="#8B4513" />

                        <rect x="6" y="7" width="8" height="1" fill="#FFDAB9" />

                        {/* Shirt/Overalls */}
                        <rect x="4" y="8" width="2" height="1" fill="#FF0000" />
                        <rect x="6" y="8" width="1" height="1" fill="#0000FF" />
                        <rect x="7" y="8" width="3" height="1" fill="#FF0000" />

                        <rect x="3" y="9" width="3" height="1" fill="#FF0000" />
                        <rect x="6" y="9" width="1" height="1" fill="#0000FF" />
                        <rect x="7" y="9" width="2" height="1" fill="#FF0000" />
                        <rect x="9" y="9" width="1" height="1" fill="#FFFF00" />
                        <rect x="10" y="9" width="2" height="1" fill="#FF0000" />

                        <rect x="2" y="10" width="4" height="1" fill="#FFDAB9" />
                        <rect x="6" y="10" width="4" height="1" fill="#0000FF" />
                        <rect x="10" y="10" width="4" height="1" fill="#FFDAB9" />

                        <rect x="2" y="11" width="12" height="1" fill="#0000FF" />
                        <rect x="4" y="12" width="8" height="1" fill="#0000FF" />

                        {/* Shoes */}
                        <rect x="3" y="13" width="3" height="1" fill="#8B4513" />
                        <rect x="10" y="13" width="3" height="1" fill="#8B4513" />
                        <rect x="2" y="14" width="4" height="1" fill="#8B4513" />
                        <rect x="10" y="14" width="4" height="1" fill="#8B4513" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

export default Mario;
