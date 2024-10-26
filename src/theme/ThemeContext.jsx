import { useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((prev) => {
      const currentTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", currentTheme);
      return currentTheme;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
