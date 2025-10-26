import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { formatText } from "../../utils/formatText";
import { topics, dataMap } from "../../data/topicConfig";

// Helper function for custom smooth scrolling
function customSmoothScroll(element, to, duration) {
  const start = element.scrollTop;
  const change = to - start;
  const startTime = performance.now();

  // Easing function (ease-in-out-quad)
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  function animateScroll() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);

    element.scrollTop = start + change * easedProgress;

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

function Sidebar({
  isCompact = false,
  searchQuery = "",
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onSearchSubmit,
  searchHistory = [],
  onHistorySelect,
  isSearchFocused = false,
  searchResults = [],
  topicNameMap = {},
  isSearchActive = false,
  onSearchPanelHoverChange,
  onNavigate = () => {},
}) {
  const { topicName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sidebarContainerRef = useRef(null);
  const questionsListRef = useRef(null);
  const filteredQuestions = isSearchActive ? [] : questions;
  const handleQuestionNavigate = () => {
    onNavigate();
  };
  const handleSearchInput = (event) => {
    onSearchChange?.(event.target.value);
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

  useEffect(() => {
    if (topicName && dataMap[topicName]) {
      setIsLoading(true);
      dataMap[topicName]()
        .then((module) => {
          setQuestions(module.default);
        })
        .catch((err) => {
          console.error("Failed to load question data:", err);
          setQuestions([]);
        })
        .finally(() => setIsLoading(false));
    } else {
      setQuestions([]);
    }
  }, [topicName]);

  useEffect(() => {
    if (
      !isSearchActive &&
      questions.length > 0 &&
      questionsListRef.current &&
      sidebarContainerRef.current
    ) {
      const offsetTop = questionsListRef.current.offsetTop;
      const targetScroll = offsetTop * 0.65;
      customSmoothScroll(sidebarContainerRef.current, targetScroll, 200);
    }
  }, [questions, isSearchActive]);

  const shouldShowTopicQuestions = Boolean(topicName) && !isSearchActive;

  return (
    <div className={styles.sidebarContainer} ref={sidebarContainerRef}>
      {isCompact && (
        <div className={styles.mobileSearchBar}>
          <label className={styles.mobileSearchWrapper}>
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
              <ul className={styles.mobileHistoryList}>
                <li className={styles.mobileHistoryHeading}>
                  So'nggi qidiruvlar
                </li>
                {searchHistory.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onMouseDown={handleHistoryMouseDown(item)}
                      className={styles.mobileHistoryItem}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>
      )}
      <h2>
        <Link to="/" className={styles.headerLink}>
          Mavzular
        </Link>
      </h2>
      <nav>
        <ul className={styles.navList}>
          {topics.map((topic) => (
            <li key={topic.path}>
              <NavLink
                to={topic.path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.activeTopic}`
                    : styles.navLink
                }
              >
                {topic.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {shouldShowTopicQuestions && (
          <>
            <hr className={styles.divider} />
            <h3 className={styles.questionsHeader} ref={questionsListRef}>
              Savollar
            </h3>
            {isLoading ? (
              <p>Yuklanmoqda...</p>
            ) : (
              <ul className={styles.questionList}>
                {filteredQuestions.map((q) => (
                  <li key={q.id}>
                    <NavLink
                      to={`/topic/${topicName}/${q.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.questionLink} ${styles.activeQuestion}`
                          : styles.questionLink
                      }
                      onClick={handleQuestionNavigate}
                    >
                      {formatText(q.question)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {isSearchActive && (
          <>
            <hr className={styles.divider} />
            <h3 className={styles.questionsHeader}>Qidiruv natijalari</h3>
            <ul
              className={styles.questionList}
              onMouseEnter={() => onSearchPanelHoverChange?.(true)}
              onMouseLeave={() => onSearchPanelHoverChange?.(false)}
            >
              {searchResults.length === 0 ? (
                <li className={styles.emptyState}>
                  <span>Natija topilmadi.</span>
                </li>
              ) : (
                searchResults.map((result) => (
                  <li key={`${result.topicKey}-${result.id}`}>
                    <NavLink
                      to={`/topic/${result.topicKey}/${result.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.questionLink} ${styles.activeQuestion}`
                          : styles.questionLink
                      }
                      onClick={handleQuestionNavigate}
                    >
                      {formatText(result.question)}
                      <span className={styles.topicBadge}>
                        {topicNameMap[result.topicKey] ||
                          result.topicName ||
                          result.topicKey}
                      </span>
                    </NavLink>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
