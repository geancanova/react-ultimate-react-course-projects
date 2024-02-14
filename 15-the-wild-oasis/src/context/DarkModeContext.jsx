import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(
    function () {
      const html = document.documentElement;

      if (isDarkMode) {
        html.classList.remove("dark-mode");
        html.classList.add("light-mode");
      } else {
        html.classList.remove("light-mode");
        html.classList.add("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error(
      "DarkModeContext was used outside of DarkModeContextProvider"
    );

  return context;
}

export { DarkModeProvider, useDarkMode };
