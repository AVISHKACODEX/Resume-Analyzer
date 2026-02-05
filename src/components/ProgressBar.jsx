// components/ProgressBar.jsx
import React from 'react';

export default function ProgressBar({ percent = 0 }) {
  const value = Math.max(0, Math.min(100, percent));
  return (
    <div className="progress" aria-label="Match percentage">
      <div
        className="progress-inner"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}