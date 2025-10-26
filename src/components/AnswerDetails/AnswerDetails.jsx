// src/components/AnswerDetails/AnswerDetails.jsx
import React from 'react';
import styles from './AnswerDetails.module.css';

// This component receives the `answer` object and a `formatText` function as props.
const AnswerDetails = ({ answer, formatText }) => {
  if (!answer) {
    return null;
  }

  return (
    <div className={styles.answerDetail}>
      {/* Render Definition */}
      {answer.definition && (
        <>
          <h2 className={styles.sectionTitle}>Ta'rif:</h2>
          <p>{formatText(answer.definition)}</p>
        </>
      )}

      {/* Render Explanation Paragraphs */}
      {answer.explanation && (
        <>
          <h2 className={styles.sectionTitle}>Batafsil Tushuntirish:</h2>
          {answer.explanation.map((item, index) => (
            <p key={index}>{formatText(item.content)}</p>
          ))}
        </>
      )}

      {/* Render Code Examples */}
      {answer.examples && (
        <>
          <h2 className={styles.sectionTitle}>Kod Misollari:</h2>
          {answer.examples.map((example, index) => (
            <div key={index} className={styles.example}>
              {example.title && <h3>{formatText(example.title)}</h3>}
              {example.description && (
                <p><em>{formatText(example.description)}</em></p>
              )}
              {example.code && (
                <pre><code>{example.code.join("\n")}</code></pre>
              )}
            </div>
          ))}
        </>
      )}

      {/* Render Differences (as list) */}
      {answer.differences && (
        <>
          <h2 className={styles.sectionTitle}>Asosiy Farqlar:</h2>
          <ul>
            {answer.differences.map((diff, index) => (
              <li key={index}>{formatText(diff)}</li>
            ))}
          </ul>
        </>
      )}

      {/* Render Why Used */}
      {answer.whyUsed && (
        <>
          <h2 className={styles.sectionTitle}>Nima uchun ishlatiladi:</h2>
          <p>{formatText(answer.whyUsed)}</p>
        </>
      )}

      {/* Render Dependency Array (as list) */}
      {answer.dependencyArray && (
        <>
          <h2 className={styles.sectionTitle}>Dependency Array Holatlari:</h2>
          <ul>
            {answer.dependencyArray.map((item, index) => (
              <li key={index}>{formatText(item)}</li>
            ))}
          </ul>
        </>
      )}

      {/* Render Interview Answer */}
      {answer.interviewAnswer && (
        <>
          <h2 className={styles.sectionTitle}>Intervyu Javobi:</h2>
          <p className={styles.interviewAnswer}>
            {formatText(answer.interviewAnswer)}
          </p>
        </>
      )}
    </div>
  );
};

export default AnswerDetails;
