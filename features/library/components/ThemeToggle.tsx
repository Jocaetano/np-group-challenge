"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./Button";

const storageKey = "northstar-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(storageKey, next ? "dark" : "light");
    } catch {
      // Keep the theme usable when browser storage is unavailable.
    }
    setDark(next);
  };

  return (
    <Button
      variant="icon"
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      title={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
