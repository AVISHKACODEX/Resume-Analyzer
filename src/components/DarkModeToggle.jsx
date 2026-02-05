// components/DarkModeToggle.jsx
import React, { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [enabled]);

  return (
    <button
      type="button"
      className="btn-secondary"
      onClick={() => setEnabled((v) => !v)}
      aria-pressed={enabled}
      title="Toggle dark mode"
    >
      {enabled ? 'Dark: On' : 'Dark: Off'}
    </button>
  );
}