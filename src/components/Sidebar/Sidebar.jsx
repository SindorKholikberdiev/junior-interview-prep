import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";

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

const topics = [
  { name: "HTML", path: "/topic/html" },
  { name: "CSS", path: "/topic/css" },
  { name: "JavaScript", path: "/topic/javascript" },
  { name: "React", path: "/topic/react" },
  { name: "Next.js", path: "/topic/nextjs" },
  { name: "Tailwind CSS", path: "/topic/tailwind" },
  { name: "TypeScript", path: "/topic/typescript" },
];

// To dynamically import JSON data
const dataMap = {
  html: () => import("../../data/htmlQuestions.json"),
  css: () => import("../../data/cssQuestions.json"),
  javascript: () => import("../../data/javascriptQuestions.json"),
  react: () => import("../../data/reactQuestions.json"),
  nextjs: () => import("../../data/nextjsQuestions.json"),
  tailwind: () => import("../../data/tailwindQuestions.json"),
  typescript: () => import("../../data/typescriptQuestions.json"),
};

function Sidebar() {
  const { topicName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sidebarContainerRef = useRef(null);
  const questionsListRef = useRef(null);

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
      questions.length > 0 &&
      questionsListRef.current &&
      sidebarContainerRef.current
    ) {
      const offsetTop = questionsListRef.current.offsetTop;
      const targetScroll = offsetTop * 0.65;
      customSmoothScroll(sidebarContainerRef.current, targetScroll, 200); // 200ms duration
    }
  }, [questions]);

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

        {topicName && (
          <>
            <hr className={styles.divider} />
            <h3 className={styles.questionsHeader} ref={questionsListRef}>
              Savollar
            </h3>
            {isLoading ? (
              <p>Yuklanmoqda...</p>
            ) : (
              <ul className={styles.questionList}>
                {questions.map((q) => (
                  <li key={q.id}>
                    <NavLink
                      to={`/topic/${topicName}/${q.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.questionLink} ${styles.activeQuestion}`
                          : styles.questionLink
                      }
                    >
                      {q.question}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
