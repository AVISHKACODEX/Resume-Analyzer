// components/TextAreaWithHighlight.jsx
// Mirrors textarea content into an underlying layer to highlight keywords.
// Lightweight approach suitable for guidance, not exact editor highlighting.

import React, { useMemo } from 'react';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default function TextAreaWithHighlight({
  label,
  value,
  onChange,
  placeholder,
  keywords = [],
}) {
  const highlightedHtml = useMemo(() => {
    if (!value) return '';
    let safe = escapeHtml(value);
    // Sort by length to highlight longer keywords first
    const sorted = [...keywords].sort((a, b) => b.length - a.length);
    for (const k of sorted) {
      if (!k) continue;
      const pattern = new RegExp(`(\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'gi');
      safe = safe.replace(pattern, '<mark class="bg-yellow-200 dark:bg-yellow-700 text-inherit">$1</mark>');
    }
    return safe;
  }, [value, keywords]);

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        {/* Highlight layer */}
        <pre
          className="textarea whitespace-pre-wrap break-words pointer-events-none select-none absolute inset-0 overflow-auto"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightedHtml || escapeHtml(placeholder || '') }}
        />
        {/* Textarea on top */}
        <textarea
          className="textarea relative bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}