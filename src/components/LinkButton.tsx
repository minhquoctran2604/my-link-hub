import { motion } from "framer-motion";
import React from "react";

interface LinkButtonProps {
  href: string;
  title: string;
  icon?: React.ComponentType<any>;
  color?: "primary" | "accent" | "secondary";
}

type Palette = {
  base: string;
  hover: string;
  glowRgb: string;
};

const palettes: Record<string, Palette> = {
  primary: {
    base: "bg-muted text-primary border-primary",
    hover: "hover:bg-primary/20 hover:text-primary hover:border-primary/60",
    glowRgb: "34, 197, 94",
  },
  accent: {
    base: "bg-muted text-accent border-accent",
    hover: "hover:bg-accent/20 hover:text-accent hover:border-accent/60",
    glowRgb: "234, 179, 8",
  },
  secondary: {
    base: "bg-muted text-secondary border-secondary",
    hover: "hover:bg-secondary/20 hover:text-secondary hover:border-secondary/60",
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
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ type: "tween", duration: 0.08, ease: "linear" }}
      className={`group relative flex items-center gap-3 w-full px-5 py-4 text-[10px] sm:text-xs leading-relaxed border-2 ${p.base} ${p.hover} pixel-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
      style={{
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
