import { motion } from "framer-motion";
import { Globe, FileText, Briefcase, Mail, Github, Linkedin } from "lucide-react";
import { FacebookIcon, InstagramIcon, DiscordIcon, TelegramIcon } from "@/components/SocialIcons";
import profileImg from "@/assets/profile-pixel.png";
import LinkButton from "@/components/LinkButton";
import SocialIcon from "@/components/SocialIcon";
import Stars from "@/components/Stars";
import Pacman from "@/components/Pacman";

const links = [
  { href: "https://www.facebook.com/minhquoctran2604", title: ">>> Facebook", icon: FacebookIcon, color: "primary" },
  { href: "https://www.instagram.com/minhquoctran2604/", title: ">>> Instagram", icon: InstagramIcon, color: "accent" },
  { href: "https://minhquoctran2604.github.io/cmc-landing/?utm_source=ig&utm_medium=social&utm_content=link_in_bio", title: ">>> Discord", icon: DiscordIcon, color: "secondary" },
  { href: "https://t.me/mqt2604", title: ">>> Telegram", icon: TelegramIcon, color: "primary" },
  { href: "https://github.com/minhquoctran2604", title: ">>> GitHub", icon: Github, color: "accent" },
  { href: "https://www.linkedin.com/in/mqt2604/", title: ">>> LinkedIn", icon: Linkedin, color: "secondary" }];


const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.15, ease: "linear" as const } }
};

const Index = () =>
<div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 scanlines">
    <Stars />
    
    <motion.div
    className="relative z-10 w-full max-w-md flex flex-col items-center gap-8"
    variants={container}
    initial="hidden"
    animate="show">
    
      {/* Profile */}
      <motion.div className="flex flex-col items-center gap-4" variants={item}>
        <div className="pixel-float">
          <img

          alt="Profile"
          className="w-24 h-24 pixel-border"
          style={{ imageRendering: "pixelated" }} src="/lovable-uploads/21fcf257-d2dc-43a4-9281-210be1237bed.jpg" />
        
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-sm sm:text-base text-primary">
            ​minhquoctran2604
          </h1>
          <p className="text-[8px] text-muted-foreground leading-relaxed sm:text-sm">
            Glory Glory Manunited<span className="pixel-blink">_</span>
          </p>
        </div>
      </motion.div>

      {/* HP Bar decoration */}
      <motion.div className="w-full flex items-center gap-2 px-1" variants={item}>
        <span className="text-[8px] text-accent">LVL 69 </span>
        <div className="flex-1 h-2 bg-muted pixel-border overflow-hidden">
          <div className="h-full bg-primary" style={{ width: "85%" }} />
        </div>
        <span className="text-[8px] text-primary">HP</span>
      </motion.div>

      {/* Links */}
      <div className="w-full flex flex-col gap-4">
        {links.map((link) =>
      <motion.div key={link.title} variants={item}>
            <LinkButton {...link} />
          </motion.div>
      )}
      </div>

      {/* Footer */}
      <motion.p
      className="text-[7px] text-muted-foreground tracking-wider"
      variants={item}>
      
        #dob2604
      </motion.p>
    </motion.div>
  </div>;


export default Index;