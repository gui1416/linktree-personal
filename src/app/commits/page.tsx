import { Suspense } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GitCommit, GitBranch, ExternalLink, Github, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type GithubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
};

type GithubCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
};

async function getGithubCommits() {
  const username = "gui1416"

  try {
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
      next: { revalidate: 3600 },
    })

    if (!reposResponse.ok) {
      throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`)
    }

    const repos: GithubRepo[] = await reposResponse.json()

    const commitsPromises = repos.map(async (repo: GithubRepo) => {
      const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=5`, {
        next: { revalidate: 3600 },
      })

      if (!commitsResponse.ok) {
        console.error(`Erro ao buscar commits para ${repo.name}: ${commitsResponse.status}`)
        return []
      }

      const commits: GithubCommit[] = await commitsResponse.json()

      return commits.map((commit: GithubCommit) => ({
        repo: {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
        },
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
        url: commit.html_url,
        branch: "main",
      }))
    })

    const commitsArrays = await Promise.all(commitsPromises)

    const allCommits = commitsArrays.flat().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return allCommits
  } catch (error) {
    console.error("Erro ao buscar dados do GitHub:", error)
    return []
  }
}

type Commit = {
  repo: {
    name: string;
    url: string;
    description: string | null;
    stars: number;
    language: string | null;
  };
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
  branch: string;
};

function CommitCard({ commit }: { commit: Commit }) {
  const commitDate = new Date(commit.date)
  const timeAgo = formatDistanceToNow(commitDate, { addSuffix: true, locale: ptBR })

  const shortMessage = commit.message.length > 100 ? commit.message.substring(0, 97) + "..." : commit.message

  const shortSha = commit.sha.substring(0, 7)

  return (
    <Card className="mb-4 animate-fade-in">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <Link
              href={commit.repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <CardTitle className="text-base sm:text-lg">{commit.repo.name}</CardTitle>
            </Link>
            <CardDescription className="mt-1 text-xs sm:text-sm">
              {commit.repo.description || "Sem descrição"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {commit.repo.language && (
              <Badge variant="outline" className="text-xs">
                {commit.repo.language}
              </Badge>
            )}
            {commit.repo.stars > 0 && (
              <Badge variant="secondary" className="text-xs">
                ★ {commit.repo.stars}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-2">
        <div className="space-y-2">
          <p className="font-medium text-sm sm:text-base">{shortMessage}</p>
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground gap-2">
            <div className="flex items-center">
              <GitBranch className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>{commit.branch}</span>
            </div>
            <span className="mx-1 hidden sm:inline">•</span>
            <div className="flex items-center">
              <GitCommit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <code className="bg-muted px-1 py-0.5 rounded text-xs">{shortSha}</code>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm gap-2">
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <time dateTime={commit.date}>{timeAgo}</time>
          <span className="mx-1">por</span>
          <span className="font-medium">{commit.author}</span>
        </div>
        <Link
          href={commit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center"
        >
          Ver commit <ExternalLink className="h-3 w-3 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}

function CommitSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <Skeleton className="h-5 w-32 sm:w-40" />
            <Skeleton className="h-4 w-48 sm:w-60 mt-2" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-2">
        <Skeleton className="h-4 sm:h-5 w-full mb-2" />
        <Skeleton className="h-4 sm:h-5 w-3/4" />
        <div className="flex items-center gap-2 mt-3">
          <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
          <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between">
        <Skeleton className="h-3 sm:h-4 w-32 sm:w-40 mb-2 sm:mb-0" />
        <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
      </CardFooter>
    </Card>
  )
}

async function CommitsList() {
  const commits = await getGithubCommits()

  if (commits.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Github className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Nenhum commit encontrado</h3>
          <p className="text-muted-foreground text-center">
            Não foi possível encontrar commits nos repositórios públicos ou ocorreu um erro ao buscar os dados.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      {commits.map((commit, index) => (
        <CommitCard key={`${commit.repo.name}-${commit.sha}-${index}`} commit={commit} />
      ))}
    </div>
  )
}

export default function Atualizacoes() {
  return (
    <div className="container mx-auto max-w-4xl py-6 px-3 sm:py-8 sm:px-4">
      <div className="mb-6 animate-fade-in">
        <Button variant="ghost" asChild className="mb-4 -ml-2 px-2 h-10 sm:h-auto">
          <Link href="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 animate-fade-in">Atualizações</h1>
        <p className="text-muted-foreground mb-6 sm:mb-8 animate-fade-in delay-100 text-sm sm:text-base">
          Acompanhe minhas contribuições mais recentes em projetos de código aberto no GitHub.
        </p>
      </div>

      <Suspense
        fallback={
          <>
            <CommitSkeleton />
            <CommitSkeleton />
            <CommitSkeleton />
          </>
        }
      >
        <CommitsList />
      </Suspense>

      <div className="mt-6 sm:mt-8 text-center animate-fade-in">
        <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
          Quer ver mais do meu trabalho? Visite meu perfil completo no GitHub.
        </p>
        <Link
          href="https://github.com/gui1416"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm sm:text-base"
        >
          <Github className="h-4 w-4 sm:h-5 sm:w-5" />
          github.com/gui1416
        </Link>
      </div>
    </div>
  )
}
