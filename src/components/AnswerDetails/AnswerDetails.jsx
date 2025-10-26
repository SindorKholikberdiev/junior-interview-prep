// src/components/AnswerDetails/AnswerDetails.jsx
import React from 'react';
import styles from './AnswerDetails.module.css';

/**
 * Detailed explanation qaydlarini mos ravishda render qiladi.
 * Har bir element string yoki `title/content/items` shaklidagi obyekt bo'lishi mumkin.
 */
const renderExplanationItem = (item, key, formatText) => {
  if (!item) {
    return null;
  }

  if (typeof item === 'string') {
    return <p key={key}>{formatText(item)}</p>;
  }

  const { title, type, content, items } = item;

  if (Array.isArray(items) && items.length > 0) {
    return (
      <div key={key}>
        {title && <h4>{formatText(title)}</h4>}
        <ul>
          {items.map((listItem, listIndex) => (
            <li key={`${key}-${listIndex}`}>{formatText(listItem)}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (Array.isArray(content) && content.length > 0) {
    return (
      <div key={key}>
        {title && <h4>{formatText(title)}</h4>}
        {content.map((nested, nestedIndex) =>
          renderExplanationItem(nested, `${key}-${nestedIndex}`, formatText)
        )}
      </div>
    );
  }

  if (type === 'paragraph' || typeof content === 'string') {
    return <p key={key}>{formatText(content || '')}</p>;
  }

  return null;
};

const AnswerDetails = ({ answer, formatText }) => {
  if (!answer) {
    return null;
  }

  const { description, detailedExplanation, codeExamples, interviewAnswer } =
    answer;

  return (
    <div className={styles.answerDetail}>
      {description && (
        <>
          <h2 className={styles.sectionTitle}>Aniq va tushunarli ta'rif:</h2>
          <p>{formatText(description)}</p>
        </>
      )}

      {Array.isArray(detailedExplanation) && detailedExplanation.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Batafsil tushuntirish:</h2>
          {detailedExplanation.map((item, index) =>
            renderExplanationItem(item, index, formatText)
          )}
        </>
      )}

      {Array.isArray(codeExamples) && codeExamples.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Kod misollari:</h2>
          {codeExamples.map((example, index) => (
            <div key={index} className={styles.example}>
              {example.title && <h3>{formatText(example.title)}</h3>}
              {example.description && (
                <p>
                  <em>{formatText(example.description)}</em>
                </p>
              )}
              {Array.isArray(example.code) && (
                <pre>
                  <code>{example.code.join('\n')}</code>
                </pre>
              )}
            </div>
          ))}
        </>
      )}

      {interviewAnswer && (
        <>
          <h2 className={styles.sectionTitle}>Intervyu javobi:</h2>
          <p className={styles.interviewAnswer}>
            {formatText(interviewAnswer)}
          </p>
        </>
      )}
    </div>
  );
};

export default AnswerDetails;
