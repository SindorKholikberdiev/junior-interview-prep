import styles from "./TopNav.module.css";

function TopNav({
  isCompact = false,
  theme,
  onToggleTheme,
  language,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onSearchSubmit,
  searchHistory = [],
  onHistorySelect,
  isSearchFocused = false,
  onSidebarToggle,
  isDesktop = true,
  isSidebarOpen = true,
}) {
  const handleLanguageSelect = (event) => {
    onLanguageChange(event.target.value);
  };

  const handleSearchInput = (event) => {
    onSearchChange(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearchSubmit?.();
    }
  };

  const handleHistoryMouseDown = (value) => (event) => {
    event.preventDefault();
    onHistorySelect?.(value);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brandRow}>
        {!isDesktop && (
          <button
            type="button"
            className={styles.menuButton}
            onClick={onSidebarToggle}
            aria-label={isSidebarOpen ? "Menyuni yopish" : "Menyuni ochish"}
          >
            <span aria-hidden="true">{isSidebarOpen ? "âœ•" : "â˜°"}</span>
          </button>
        )}
        <div className={styles.brand}>
          <span className={styles.brandAccent}>Junior</span> Interview Prep
        </div>
      </div>

      <div className={styles.controls}>
        {!isCompact && (
          <label className={styles.searchWrapper}>
            <span className={styles.srOnly}>Savollar bo'yicha qidiruv</span>
            <input
              type="search"
              placeholder="Savol yoki mavzu qidiring..."
              value={searchQuery}
              onChange={handleSearchInput}
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
              onKeyDown={handleSearchKeyDown}
            />
            {isSearchFocused && searchHistory.length > 0 && (
              <ul className={styles.historyList}>
                <li className={styles.historyHeading}>So'nggi qidiruvlar</li>
                {searchHistory.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onMouseDown={handleHistoryMouseDown(item)}
                      className={styles.historyItem}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>
        )}

        <button
          type="button"
          className={styles.themeToggle}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          <span className={styles.themeLabel}>
            {theme === "light" ? "Dark mode" : "Light mode"}
          </span>
        </button>

        <label className={styles.languageSwitcher}>
          <span className={styles.languageLabel}>Til</span>
          <select value={language} onChange={handleLanguageSelect}>
            <option value="uz">Uzbek (UZ)</option>
            <option value="en">English (EN)</option>
          </select>
        </label>
      </div>
    </header>
  );
}

export default TopNav;

