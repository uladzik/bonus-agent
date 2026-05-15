import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "next-themes"
import "./index.css"
import { AppCadence } from "./AppCadence"

/* Single-route: Bonus Agent / Cadence landing is the home page.
   ThemeProvider mounts a `class` attribute on <html> ("light" / "dark"),
   defaults to the OS-level preference, and persists user toggles to
   localStorage. The Tailwind v4 `dark` variant (`&:is(.dark *)` in
   index.css) reads that class. */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppCadence />
    </ThemeProvider>
  </StrictMode>,
)
