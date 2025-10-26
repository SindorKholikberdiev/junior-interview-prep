// src/App.jsx
import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TopNav from "./components/TopNav/TopNav";
import styles from "./App.module.css";
import { dataMap, topics } from "./data/topicConfig";

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

const getIsCompactScreen = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 400px)").matches;
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [searchQuery, setSearchQuery] = useState("");
  const [allQuestionsByTopic, setAllQuestionsByTopic] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchPanelHovered, setIsSearchPanelHovered] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const getIsDesktop = () =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true;
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  const [isCompact, setIsCompact] = useState(getIsCompactScreen);
  const [isSidebarOpen, setIsSidebarOpen] = useState(getIsDesktop);
  const searchBlurTimeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    let isMounted = true;
    const loadAllQuestions = async () => {
      try {
        const entries = await Promise.all(
          Object.entries(dataMap).map(([topicKey, loader]) =>
            loader().then((module) => [topicKey, module.default ?? []])
          )
        );
        if (!isMounted) {
          return;
        }
        const mapped = entries.reduce((acc, [key, list]) => {
          acc[key] = list;
          return acc;
        }, {});
        setAllQuestionsByTopic(mapped);
      } catch (error) {
        console.error("Savollarni yuklashda xatolik:", error);
      }
    };

    loadAllQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  const topicNameMap = useMemo(() => {
    const map = {};
    topics.forEach((topic) => {
      const topicKey = topic.key ?? topic.path.split("/").pop();
      map[topicKey] = topic.name;
    });
    return map;
  }, []);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const isSearchActive =
    (isSearchFocused || isSearchPanelHovered) && normalizedSearch.length > 0;
  const globalSearchResults = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }
    const results = [];
    Object.entries(allQuestionsByTopic).forEach(([topicKey, list]) => {
      list.forEach((item) => {
        if (item.question.toLowerCase().includes(normalizedSearch)) {
          results.push({
            ...item,
            topicKey,
            topicName: topicNameMap[topicKey] || topicKey,
          });
        }
      });
    });
    return results;
  }, [allQuestionsByTopic, normalizedSearch, topicNameMap]);

  useEffect(() => {
    const handleResize = () => {
      const desktop = getIsDesktop();
       const compact = getIsCompactScreen();
      setIsDesktop(desktop);
       setIsCompact(compact);
      setIsSidebarOpen((prev) => (desktop ? true : prev));
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  const handleSearchChange = (nextQuery) => {
    setSearchQuery(nextQuery);
  };

  const handleSearchFocus = () => {
    if (searchBlurTimeoutRef.current) {
      clearTimeout(searchBlurTimeoutRef.current);
      searchBlurTimeoutRef.current = null;
    }
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    if (searchBlurTimeoutRef.current) {
      clearTimeout(searchBlurTimeoutRef.current);
    }
    searchBlurTimeoutRef.current = setTimeout(() => {
      setIsSearchFocused(false);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (searchBlurTimeoutRef.current) {
        clearTimeout(searchBlurTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return;
    }
    setSearchHistory((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)];
      return next.slice(0, 3);
    });
  };

  const handleHistorySelect = (value) => {
    setSearchQuery(value);
    setIsSearchFocused(true);
    setSearchHistory((prev) => {
      const next = [value, ...prev.filter((item) => item !== value)];
      return next.slice(0, 3);
    });
  };

  const handleSearchResultsHoverChange = (hovering) => {
    if (hovering) {
      if (searchBlurTimeoutRef.current) {
        clearTimeout(searchBlurTimeoutRef.current);
        searchBlurTimeoutRef.current = null;
      }
      setIsSearchPanelHovered(true);
    } else {
      setIsSearchPanelHovered(false);
    }
  };

  const toggleSidebar = () => {
    if (isDesktop) {
      return;
    }
    setIsSidebarOpen((prev) => !prev);
  };

  const handleNavigation = () => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <Sidebar
          isCompact={isCompact}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchFocus={handleSearchFocus}
          onSearchBlur={handleSearchBlur}
          onSearchSubmit={handleSearchSubmit}
          searchHistory={searchHistory}
          onHistorySelect={handleHistorySelect}
          isSearchFocused={isSearchFocused}
          searchResults={globalSearchResults}
          topicNameMap={topicNameMap}
          isSearchActive={isSearchActive}
          onSearchPanelHoverChange={handleSearchResultsHoverChange}
          onNavigate={handleNavigation}
        />
      </aside>
      {!isDesktop && isSidebarOpen && (
        <div className={styles.backdrop} onClick={handleNavigation} />
      )}
      <main className={styles.mainContent}>
        <TopNav
          isCompact={isCompact}
          theme={theme}
          onToggleTheme={toggleTheme}
          language={language}
          onLanguageChange={handleLanguageChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchFocus={handleSearchFocus}
          onSearchBlur={handleSearchBlur}
          onSearchSubmit={handleSearchSubmit}
          searchHistory={searchHistory}
          onHistorySelect={handleHistorySelect}
          isSearchFocused={isSearchFocused}
          onSidebarToggle={toggleSidebar}
          isDesktop={isDesktop}
          isSidebarOpen={isSidebarOpen}
        />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
