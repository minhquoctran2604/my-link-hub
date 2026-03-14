import { motion } from "framer-motion";
import { Globe, FileText, Briefcase, Mail, Github, Linkedin, Twitter } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import LinkButton from "@/components/LinkButton";
import SocialIcon from "@/components/SocialIcon";

const links = [
  { href: "https://example.com", title: "My Website", icon: Globe },
  { href: "https://example.com/portfolio", title: "Portfolio", icon: Briefcase },
  { href: "https://example.com/blog", title: "Read My Blog", icon: FileText },
  { href: "mailto:hello@example.com", title: "Contact Me", icon: Mail },
];

const socials = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Index = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
    <motion.div
      className="w-full max-w-md flex flex-col items-center gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Profile */}
      <motion.div className="flex flex-col items-center gap-3" variants={item}>
        <img
          src={profileImg}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-border"
        />
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">@yourname</h1>
          <p className="text-sm text-muted-foreground mt-1">Designer & Developer</p>
        </div>
      </motion.div>

      {/* Links */}
      <div className="w-full flex flex-col gap-3">
        {links.map((link) => (
          <motion.div key={link.title} variants={item}>
            <LinkButton {...link} />
          </motion.div>
        ))}
      </div>

      {/* Social Icons */}
      <motion.div className="flex gap-4" variants={item}>
        {socials.map((social) => (
          <SocialIcon key={social.label} {...social} />
        ))}
      </motion.div>
    </motion.div>
  </div>
);

export default Index;
