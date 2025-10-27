export const topics = [
  { name: "HTML", path: "/topic/html", key: "html" },
  { name: "CSS", path: "/topic/css", key: "css" },
  { name: "JavaScript", path: "/topic/javascript", key: "javascript" },
  { name: "React", path: "/topic/react", key: "react" },
  { name: "Next.js", path: "/topic/nextjs", key: "nextjs" },
  { name: "Tailwind CSS", path: "/topic/tailwind", key: "tailwind" },
  { name: "TypeScript", path: "/topic/typescript", key: "typescript" },
  { name: "Git", path: "/topic/git", key: "git" },
];

export const dataMap = {
  html: () => import("./htmlQuestions.json"),
  css: () => import("./cssQuestions.json"),
  javascript: () => import("./javascriptQuestions.json"),
  react: () => import("./reactQuestions.json"),
  nextjs: () => import("./nextjsQuestions.json"),
  tailwind: () => import("./tailwindQuestions.json"),
  typescript: () => import("./typescriptQuestions.json"),
  git: () => import("./gitQuestions.json"),
};
