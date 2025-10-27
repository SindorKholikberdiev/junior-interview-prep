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

const topicMeta = {
  html: {
    label: "HTML",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.3 3h15.4l-1.4 15.9L12 21l-6.3-2.1z"
        />
        <path
          fill="currentColor"
          opacity="0.2"
          d="M12 5H7.4l.9 9.5 3.7 1.1 3.7-1.1.5-5.5h-3.8v2h1.8l-.1 1.5-2.1.6-2.1-.6-.2-2.2h1.5l-.1-1.8h-2.9L8 6.8h8.1l.1-1.8H12z"
        />
      </svg>
    ),
  },
  css: {
    label: "CSS",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.3 3h15.4l-1.2 14.1L12 21l-6.5-2.2z"
        />
        <path
          fill="currentColor"
          opacity="0.2"
          d="M12 19l4.3-1.3.3-3.3H12v2h2l-.1.6-1.9.5-1.9-.5-.1-1.3h-1.8l.2 2.8zm4-8.8H8.2l-.1-1.7h8.1l.1-1.7H6.3l.4 4.9h8.9z"
        />
      </svg>
    ),
  },
  javascript: {
    label: "JavaScript",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" />
        <text
          x="12"
          y="15.2"
          textAnchor="middle"
          fontSize="8.2"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="Inter, 'Segoe UI', sans-serif"
        >
          JS
        </text>
      </svg>
    ),
  },
  react: {
    label: "React",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <g
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        >
          <ellipse cx="12" cy="12" rx="8" ry="3.8" />
          <ellipse cx="12" cy="12" rx="8" ry="3.8" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="3.8" transform="rotate(-60 12 12)" />
        </g>
        <circle cx="12" cy="12" r="2.3" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
  nextjs: {
    label: "Next.js",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          fill="currentColor"
          opacity="0.85"
          d="M8.2 8.5h2.2l4.4 6.9V8.5h1.9V16h-2.2l-4.4-6.9V16H8.2z"
        />
      </svg>
    ),
  },
  tailwind: {
    label: "Tailwind",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path
          fill="currentColor"
          opacity="0.9"
          d="M6.3 10.4c1.3-2.7 3-4.1 5.1-4.1 1.6 0 2.7.7 3.7 1.6.8.7 1.4 1 2.1.8.5-.2.9-.6 1.4-1.1 1-1 1.9-1.4 2.9-1.1C20.3 4.9 18.5 4 16.7 4c-2.1 0-3.6.8-5.3 2.4-.9.8-1.5 1-2.2 1-1 0-1.7-.6-2.6-1.3-1.8-1.4-3.5-.9-4.6 1.6.4-.1.7-.2 1.1 0 .9.2 1.5.6 2.5 1.7zm-1 2.9c1.2 2.5 2.7 3.8 4.4 3.8 1.4 0 2.4-.7 3.4-1.5.7-.6 1.1-.8 1.6-.6.4.1.7.5 1 .9.7.8 1.3 1.2 2 1-.6 1.1-2 1.6-3.4 1.2-.7-.2-1.3-.6-1.8-1.1-.7-.6-1.1-.8-1.7-.8-.7 0-1.1.3-1.7.7-1.1.9-2.5.9-3.9-.6.3 0 .6-.1.8-.3-.4-.6-.9-1-1.6-1.7z"
        />
      </svg>
    ),
  },
  typescript: {
    label: "TypeScript",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="Inter, 'Segoe UI', sans-serif"
        >
          TS
        </text>
      </svg>
    ),
  },
  git: {
    label: "Git",
    icon: (
      <svg className={styles.navIconSvg} viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path
          d="M12 5l7 7-7 7-7-7z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M12 9v6m3-3h-6"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
      </svg>
    ),
  },
};

const getTopicMeta = (topic) => {
  const key =
    topic.key ??
    (typeof topic.path === "string"
      ? topic.path.split("/").pop()
      : undefined);
  return topicMeta[key] ?? { label: topic.name };
};

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
          {topics.map((topic) => {
            const meta = getTopicMeta(topic);
            const label = meta.label || topic.name;
            return (
              <li key={topic.path}>
                <NavLink
                  to={topic.path}
                  aria-label={label}
                  title={label}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.activeTopic}`
                      : styles.navLink
                  }
                >
                  <span className={styles.navIconWrapper}>
                    {meta.icon ?? (
                      <span className={styles.navIconFallback}>
                        {label?.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </span>
                  <span className={styles.navLabel}>{label}</span>
                </NavLink>
              </li>
            );
          })}
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
