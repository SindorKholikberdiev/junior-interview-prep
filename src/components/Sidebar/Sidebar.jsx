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
  searchResults = [],
  topicNameMap = {},
  isSearchActive = false,
  onSearchPanelHoverChange,
}) {
  const { topicName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sidebarContainerRef = useRef(null);
  const questionsListRef = useRef(null);
  const filteredQuestions = isSearchActive ? [] : questions;

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
