// src/App.jsx
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TopNav from "./components/TopNav/TopNav";
import styles from "./App.module.css";

const THEME_STORAGE_KEY = "junior-interview-prep-theme";
const LANGUAGE_STORAGE_KEY = "junior-interview-prep-language";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.localStorage.getItem(THEME_STORAGE_KEY) || "light";
};

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "uz";
  }

  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "uz";
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  return (
    <div className={styles.appContainer}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.mainContent}>
        <TopNav
          theme={theme}
          onToggleTheme={toggleTheme}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
