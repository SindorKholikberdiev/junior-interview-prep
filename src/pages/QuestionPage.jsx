import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnswerDetails from '../components/AnswerDetails/AnswerDetails';
import styles from './QuestionPage.module.css'; // Reuse styles from old TopicPage

// Helper function to parse text and convert backticked parts to bold
const formatText = (text) => {
  if (!text) {
    return null;
  }
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
};

// To dynamically import JSON data
const dataMap = {
  html: () => import('../data/htmlQuestions.json'),
  css: () => import('../data/cssQuestions.json'),
  javascript: () => import('../data/javascriptQuestions.json'),
  react: () => import('../data/reactQuestions.json'),
  nextjs: () => import('../data/nextjsQuestions.json'),
  tailwind: () => import('../data/tailwindQuestions.json'),
  typescript: () => import('../data/typescriptQuestions.json'),
};

function QuestionPage() {
  const { topicName, questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (topicName && questionId && dataMap[topicName]) {
      setIsLoading(true);
      dataMap[topicName]()
        .then(module => {
          const q = module.default.find(item => item.id === questionId);
          if (q) {
            setQuestion(q);
          } else {
            setError('Savol topilmadi.');
          }
        })
        .catch(err => {
          console.error("Failed to load question data:", err);
          setError('Ma\'lumotlarni yuklashda xatolik.');
        })
        .finally(() => setIsLoading(false));
    } else {
        setError('Mavzu yoki savol IDsi noto\'g\'ri.');
        setIsLoading(false);
    }
  }, [topicName, questionId]);

  if (isLoading) {
    return <p>Yuklanmoqda...</p>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!question) {
    return null; // or some other placeholder
  }

  return (
    <>
      <h1 className={styles.questionTitleLg}>{formatText(question.question)}</h1>
      
      <AnswerDetails answer={question.answer} formatText={formatText} />
    </>
  );
}

export default QuestionPage;
