import { motion } from "framer-motion";
import { Globe, FileText, Briefcase, Mail, Github, Linkedin } from "lucide-react";
import { FacebookIcon, InstagramIcon, DiscordIcon, TelegramIcon } from "@/components/SocialIcons";
import profileImg from "@/assets/profile-pixel.png";
import LinkButton from "@/components/LinkButton";
import SocialIcon from "@/components/SocialIcon";
import Stars from "@/components/Stars";

const links = [
  { href: "https://facebook.com", title: ">>> Facebook", icon: FacebookIcon, color: "primary" },
  { href: "https://instagram.com", title: ">>> Instagram", icon: InstagramIcon, color: "accent" },
  { href: "https://discord.gg", title: ">>> Discord", icon: DiscordIcon, color: "secondary" },
  { href: "https://t.me", title: ">>> Telegram", icon: TelegramIcon, color: "primary" },
  { href: "https://github.com", title: ">>> GitHub", icon: Github, color: "accent" },
  { href: "https://linkedin.com", title: ">>> LinkedIn", icon: Linkedin, color: "secondary" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.15, ease: "linear" as const } },
};

const Index = () => (
  <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 scanlines">
    <Stars />
    
    <motion.div
      className="relative z-10 w-full max-w-md flex flex-col items-center gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Profile */}
      <motion.div className="flex flex-col items-center gap-4" variants={item}>
        <div className="pixel-float">
          <img
            src={profileImg}
            alt="Profile"
            className="w-24 h-24 pixel-border"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-sm sm:text-base text-primary">
            @yourname
          </h1>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground leading-relaxed">
            Designer & Developer<span className="pixel-blink">_</span>
          </p>
        </div>
      </motion.div>

      {/* HP Bar decoration */}
      <motion.div className="w-full flex items-center gap-2 px-1" variants={item}>
        <span className="text-[8px] text-accent">LVL 99</span>
        <div className="flex-1 h-2 bg-muted pixel-border overflow-hidden">
          <div className="h-full bg-primary" style={{ width: "85%" }} />
        </div>
        <span className="text-[8px] text-primary">HP</span>
      </motion.div>

      {/* Links */}
      <div className="w-full flex flex-col gap-4">
        {links.map((link) => (
          <motion.div key={link.title} variants={item}>
            <LinkButton {...link} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        className="text-[7px] text-muted-foreground tracking-wider"
        variants={item}
      >
        #1ceQ
      </motion.p>
    </motion.div>
  </div>
);

export default Index;
