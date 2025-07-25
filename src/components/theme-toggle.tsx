"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
 const { theme, setTheme } = useTheme()
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
  setMounted(true)
 }, [])

 if (!mounted) {
  return null
 }

 return (
  <Button
   variant="ghost"
   size="icon"
   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
   aria-label="Alternar tema"
   className="rounded-full transition-transform hover:scale-110"
  >
   {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
  </Button>
 )
}
