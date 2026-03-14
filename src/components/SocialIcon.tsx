import { LucideIcon } from "lucide-react";

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SocialIcon = ({ href, icon: Icon, label }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-2 text-muted-foreground hover:text-primary transition-colors duration-100 pixel-glitch"
  >
    <Icon size={18} strokeWidth={2.5} />
  </a>
);

export default SocialIcon;
