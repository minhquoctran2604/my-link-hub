import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { FacebookIcon, InstagramIcon, DiscordIcon, TelegramIcon } from "@/components/SocialIcons";
import LinkButton from "@/components/LinkButton";
import SocialIcon from "@/components/SocialIcon";
import Stars from "@/components/Stars";
import Pacman from "@/components/Pacman";
import Mario from "@/components/Mario";

const links = [
  { href: "https://www.facebook.com/minhquoctran2604", title: ">>> Facebook", icon: FacebookIcon, color: "primary" as const },
  { href: "https://www.instagram.com/_1ceq_/", title: ">>> Instagram", icon: InstagramIcon, color: "accent" as const },
  { href: "https://minhquoctran2604.github.io/cmc-landing/?utm_source=ig&utm_medium=social&utm_content=link_in_bio", title: ">>> Discord", icon: DiscordIcon, color: "secondary" as const },
  { href: "https://t.me/mqt2604", title: ">>> Telegram", icon: TelegramIcon, color: "primary" as const },
  { href: "https://github.com/minhquoctran2604", title: ">>> GitHub", icon: Github, color: "accent" as const },
  { href: "https://www.linkedin.com/in/mqt2604/", title: ">>> LinkedIn", icon: Linkedin, color: "secondary" as const },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "linear" as const } },
};

const Index = () => (
  <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 scanlines overflow-hidden">
    <Stars />
    <Pacman />
    <Mario />

    <motion.div
      className="relative z-10 w-full max-w-md flex flex-col items-center gap-7"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Profile */}
      <motion.div className="flex flex-col items-center gap-4" variants={item}>
        <div className="pixel-float">
          <div className="pixel-frame">
            <img
              alt="Profile"
              className="w-24 h-24 block"
              style={{ imageRendering: "pixelated" }}
              src="/lovable-uploads/21fcf257-d2dc-43a4-9281-210be1237bed.jpg"
            />
          </div>
        </div>
        <div className="text-center space-y-3">
          <h1 className="text-base sm:text-xl text-primary leading-relaxed">
            minhquoctran2604
          </h1>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
            Glory Glory Man United<span className="pixel-blink">_</span>
          </p>
        </div>
      </motion.div>

      {/* Pixel divider */}
      <motion.div className="w-full flex items-center gap-2" variants={item} aria-hidden>
        <div className="flex-1 h-[2px] bg-primary/40" />
        <div className="w-[6px] h-[6px] bg-accent" />
        <div className="w-[6px] h-[6px] bg-primary" />
        <div className="w-[6px] h-[6px] bg-secondary" />
        <div className="flex-1 h-[2px] bg-primary/40" />
      </motion.div>

      {/* Links */}
      <div className="w-full flex flex-col gap-3">
        {links.map((link) => (
          <motion.div key={link.title} variants={item}>
            <LinkButton {...link} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        className="flex flex-col items-center gap-2 pt-2"
        variants={item}
      >
        <div className="flex items-center gap-1 text-[8px] text-muted-foreground tracking-widest">
          <span>©</span>
          <span>2026</span>
          <span className="text-primary">·</span>
          <span className="text-accent">#dob2604</span>
        </div>
        <div className="text-[7px] text-muted-foreground/60 tracking-wider uppercase">
          press start to continue
        </div>
      </motion.footer>
    </motion.div>
  </div>
);

export default Index;
