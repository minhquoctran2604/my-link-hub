import { motion } from "framer-motion";
import React from "react";

interface LinkButtonProps {
  href: string;
  title: string;
  icon?: React.ComponentType<any>;
  color?: string;
}

const LinkButton = ({ href, title, icon: Icon, color = "primary" }: LinkButtonProps) => {
  const colorMap: Record<string, string> = {
    primary: "bg-muted text-primary pixel-border-primary hover:bg-primary hover:text-background",
    accent: "bg-muted text-accent pixel-border-accent hover:bg-accent hover:text-background",
    secondary: "bg-muted text-secondary pixel-border hover:bg-secondary hover:text-background",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 w-full px-5 py-4 text-[10px] sm:text-xs leading-relaxed transition-all duration-100 ${colorMap[color] || colorMap.primary}`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "tween", duration: 0.05 }}
    >
      {Icon && <Icon size={16} strokeWidth={2.5} />}
      <span>{title}</span>
    </motion.a>
  );
};

export default LinkButton;
