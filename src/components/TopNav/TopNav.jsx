import styles from "./TopNav.module.css";

function TopNav({ theme, onToggleTheme, language, onLanguageChange }) {
  const handleLanguageSelect = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.brandAccent}>Junior</span> Interview Prep
      </div>

      <div className={styles.controls}>
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
