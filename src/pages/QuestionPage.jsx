import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnswerDetails from '../components/AnswerDetails/AnswerDetails';
import styles from './QuestionPage.module.css'; // Reuse styles from old TopicPage
import { formatText } from '../utils/formatText';

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

const normalizeAnswerData = (question) => {
  if (!question) {
    return null;
  }

  if (question.answer) {
    const {
      definition,
      explanation,
      examples,
      interviewAnswer,
      differences,
      whyUsed,
      dependencyArray,
      keyTerms,
      videoUrl,
    } = question.answer;

    return {
      description: definition,
      detailedExplanation: explanation,
      codeExamples: examples,
      interviewAnswer,
      differences,
      whyUsed,
      dependencyArray,
      keyTerms: keyTerms || question.keyTerms,
      videoUrl: videoUrl || question.videoUrl,
    };
  }

  return {
    description: question.description,
    detailedExplanation: question.detailedExplanation,
    codeExamples: question.codeExamples,
    interviewAnswer: question.interviewAnswer,
    differences: question.differences,
    whyUsed: question.whyUsed,
    dependencyArray: question.dependencyArray,
    keyTerms: question.keyTerms,
    videoUrl: question.videoUrl,
  };
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

  const normalizedAnswer = normalizeAnswerData(question);

  return (
    <>
      <h1 className={styles.questionTitleLg}>{formatText(question.question)}</h1>

      <AnswerDetails answer={normalizedAnswer} formatText={formatText} />
    </>
  );
}

export default QuestionPage;
