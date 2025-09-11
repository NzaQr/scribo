"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const preferredTheme = savedTheme || "dark"
    setTheme(preferredTheme)
    document.documentElement.classList.toggle("dark", preferredTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative h-9 w-9 p-0 hover:bg-primary/10 transition-colors"
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
          theme === "light" ? "scale-100 rotate-0" : "scale-0 rotate-180"
        }`}
      >
        <Sun className="h-4 w-4 text-primary" />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-180"
        }`}
      >
        <Moon className="h-4 w-4 text-primary" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
