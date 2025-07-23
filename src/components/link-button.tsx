import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
 Instagram,
 Linkedin,
 Briefcase,
 MessageCircle,
 Mail,
 Github,
 Twitter,
 Youtube,
 ExternalLink,
 FileText,
 Award,
 Calendar,
 GitCommit,
 type LucideIcon,
} from "lucide-react"

const icons: Record<string, LucideIcon> = {
 instagram: Instagram,
 linkedin: Linkedin,
 briefcase: Briefcase,
 "message-circle": MessageCircle,
 mail: Mail,
 github: Github,
 twitter: Twitter,
 youtube: Youtube,
 link: ExternalLink,
 "file-text": FileText,
 award: Award,
 calendar: Calendar,
 "git-commit": GitCommit,
}

interface LinkButtonProps {
 href: string
 children: React.ReactNode
 icon?: string
 className?: string
}

export function LinkButton({ href, children, icon = "link", className = "" }: LinkButtonProps) {
 const IconComponent = icons[icon] || ExternalLink

 return (
  <Button
   asChild
   variant="outline"
   className={`w-full justify-start h-12 px-4 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md dark:hover:bg-primary/10 hover:bg-primary/10 group ${className}`}
  >
   <Link href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">
    <IconComponent className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
    <span className="flex-grow text-center">{children}</span>
   </Link>
  </Button>
 )
}
