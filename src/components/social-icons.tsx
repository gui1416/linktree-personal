import type React from "react"
import Link from "next/link"
import { Instagram, Github, Linkedin, Mail, MessageCircle } from "lucide-react"

// Interface para os links de redes sociais
interface SocialLink {
 href: string
 icon: React.ReactNode
 label: string
}

export function SocialIcons() {
 // Lista de links de redes sociais
 const socialLinks: SocialLink[] = [
  {
   href: "https://www.instagram.com/guilhermerm2005?igsh=d2Vja3hvb21lem1i&utm_source=qr",
   icon: <Instagram className="h-5 w-5" />,
   label: "Instagram",
  },
  {
   href: "https://github.com/gui1416/",
   icon: <Github className="h-5 w-5" />,
   label: "GitHub",
  },
  {
   href: "https://www.linkedin.com/in/guilherme-rabelo-3aa160294/",
   icon: <Linkedin className="h-5 w-5" />,
   label: "LinkedIn",
  },
  {
   href: "mailto:guirmdev@gmail.com",
   icon: <Mail className="h-5 w-5" />,
   label: "Email",
  },
  {
   href: "https://wa.me/5511969954587?text=Ol%C3%A1%2C%20vim%20pelo%20seu%20site!",
   icon: <MessageCircle className="h-5 w-5" />,
   label: "WhatsApp",
  },
 ]

 return (
  <div className="flex flex-wrap justify-center gap-3">
   {socialLinks.map((link, index) => (
    <SocialIconLink key={index} href={link.href} aria-label={link.label}>
     {link.icon}
    </SocialIconLink>
   ))}
  </div>
 )
}

interface SocialIconLinkProps {
 href: string
 children: React.ReactNode
 "aria-label": string
}

function SocialIconLink({ href, children, "aria-label": ariaLabel }: SocialIconLinkProps) {
 return (
  <Link
   href={href}
   target="_blank"
   rel="noopener noreferrer"
   aria-label={ariaLabel}
   className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 hover:scale-110"
  >
   {children}
  </Link>
 )
}
