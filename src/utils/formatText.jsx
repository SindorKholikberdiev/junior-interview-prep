import React from "react";

// Helper function to parse text and convert backticked parts to bold
export const formatText = (text) => {
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
