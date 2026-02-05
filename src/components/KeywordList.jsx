// components/KeywordList.jsx
import React from 'react';

export default function KeywordList({ title, keywords = [], variant = 'matched' }) {
  const isMatched = variant === 'matched';
  return (
    <div className="card">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {keywords.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">None</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {keywords.map((k) => (
            <span
              key={k}
              className={`badge ${isMatched ? 'badge-green' : 'badge-red'}`}
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}