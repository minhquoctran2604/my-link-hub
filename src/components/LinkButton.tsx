import { motion } from "framer-motion";
import React from "react";

interface LinkButtonProps {
  href: string;
  title: string;
  icon?: React.ComponentType<any>;
  color?: "primary" | "accent" | "secondary";
}

type Palette = {
  // Default state: muted bg, accent-colored text + border
  base: string;
  // Hover: filled with accent color, dark text for contrast
  hover: string;
  // RGB triplet for the glow shadow (matches the accent hue)
  glowRgb: string;
};

const palettes: Record<string, Palette> = {
  primary: {
    base: "bg-muted text-primary border-primary",
    hover: "hover:bg-primary hover:text-background hover:border-primary",
    glowRgb: "34, 197, 94",
  },
  accent: {
    base: "bg-muted text-accent border-accent",
    hover: "hover:bg-accent hover:text-background hover:border-accent",
    glowRgb: "234, 179, 8",
  },
  secondary: {
    base: "bg-muted text-secondary border-secondary",
    hover: "hover:bg-secondary hover:text-background hover:border-secondary",
    glowRgb: "168, 85, 247",
  },
};

const LinkButton = ({ href, title, icon: Icon, color = "primary" }: LinkButtonProps) => {
  const p = palettes[color] ?? palettes.primary;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ y: 0 }}
      transition={{ type: "tween", duration: 0.08, ease: "linear" }}
      className={`group relative flex items-center gap-3 w-full px-5 py-4 text-[10px] sm:text-xs leading-relaxed border-2 ${p.base} ${p.hover} pixel-press`}
      style={{
        // hard offset glow shadow (arcade button under-light)
        boxShadow: `4px 4px 0 0 rgba(${p.glowRgb}, 0.55), 4px 4px 0 1px hsl(var(--border))`,
      }}
    >
      {Icon && (
        <span className="transition-transform duration-100 group-hover:-translate-x-0.5 shrink-0">
          <Icon size={16} strokeWidth={2.5} />
        </span>
      )}
      <span className="flex-1 truncate">{title}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-[10px] shrink-0">
        ▶
      </span>
    </motion.a>
  );
};

export default LinkButton;
