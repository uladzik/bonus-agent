import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createElement } from "react"
import { en, type Copy } from "./en"
import { ru } from "./ru"

export type Locale = "en" | "ru"

const DICTS: Record<Locale, Copy> = { en, ru }
const STORAGE_KEY = "cadence:locale"

type Ctx = { locale: Locale; copy: Copy; setLocale: (l: Locale) => void }
const LocaleCtx = createContext<Ctx | null>(null)

function read(): Locale {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === "ru" || stored === "en" ? stored : "en"
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(read)

  function setLocale(next: Locale) {
    setLocaleState(next)
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next)
  }

  /* Cmd+Shift+L (mac) / Ctrl+Shift+L (other) flips EN ↔ RU. No visible
     control — the shortcut is the only way in, on purpose: the public
     site reads as EN, RU is reachable for internal demos / Ivan's
     review. */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.shiftKey && (e.key === "L" || e.key === "l")) {
        e.preventDefault()
        setLocale(locale === "en" ? "ru" : "en")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [locale])

  /* Keep <html lang="..."> in sync so screen readers and the browser's
     hyphenation/quotation engine pick the right rules. */
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale
  }, [locale])

  return createElement(LocaleCtx.Provider, { value: { locale, copy: DICTS[locale], setLocale } }, children)
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleCtx)
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>")
  return ctx
}

export function useCopy(): Copy {
  return useLocale().copy
}
