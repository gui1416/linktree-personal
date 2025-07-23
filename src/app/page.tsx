import { ThemeToggle } from "@/components/theme-toggle"
import { LinkButton } from "@/components/link-button"
import { SocialIcons } from "@/components/social-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function LinktreePage() {
 return (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
   <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card/80 backdrop-blur-sm animate-scale-in">
    <CardContent className="p-6">
     <div className="absolute top-4 right-4 animate-slide-in">
      <ThemeToggle />
     </div>

     <div className="flex flex-col items-center space-y-6 py-4">
      <Avatar className="w-24 h-24 border-2 border-primary animate-fade-in">
       <AvatarImage src="https://github.com/gui1416.png?height=96&width=96" alt="Guilherme" />
       <AvatarFallback>GM</AvatarFallback>
      </Avatar>

      <div className="text-center space-y-2 animate-fade-in delay-100">
       <h1 className="text-2xl font-bold">Guilherme Machado</h1>
       <p className="text-muted-foreground">
        Desenvolvedor Full Stack & Designer UI/UX. Criando experiências digitais incríveis desde 2020.
       </p>
      </div>

      <div className="w-full space-y-3 pt-4">
       <LinkButton href="https://portifolio-v8.vercel.app/hero" icon="briefcase" className="animate-fade-in delay-200">
        Meu Portfólio
       </LinkButton>
       <LinkButton href="https://drive.google.com/file/d/17Zl6Th_r_KCQN9z0tagauV2Ch9y7JDdO/view?usp=sharing" icon="file-text" className="animate-fade-in delay-300">
        Currículo
       </LinkButton>
       <LinkButton href="https://drive.google.com/drive/folders/1Z9xQtGcCLisL0YaYH4XfEWrPvkxZ9Z8r?usp=sharing" icon="award" className="animate-fade-in delay-400">
        Certificados
       </LinkButton>
       <LinkButton href="https://forms.gle/i5Vkv2VVyzxuJTMn6" icon="calendar" className="animate-fade-in delay-500">
        Agendar Contato
       </LinkButton>
       <LinkButton href="/commits" icon="git-commit" className="animate-fade-in delay-500">
        Últimos Commits
       </LinkButton>
      </div>
     </div>
    </CardContent>
   </Card>

   <footer className="mt-8 mb-4 animate-fade-in delay-500">
    <SocialIcons />
   </footer>
  </div>
 )
}
