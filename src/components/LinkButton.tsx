import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LinkButtonProps {
  href: string;
  title: string;
  icon?: LucideIcon;
}

const LinkButton = ({ href, title, icon: Icon }: LinkButtonProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary text-primary-foreground font-medium text-base rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
    whileTap={{ scale: 0.98 }}
  >
    {Icon && <Icon size={18} />}
    {title}
  </motion.a>
);

export default LinkButton;
