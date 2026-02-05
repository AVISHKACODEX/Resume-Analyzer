// utils/keywordMatcher.js
// All logic written in JavaScript, no external APIs.

// Common English stop words to ignore in keyword extraction
export const STOP_WORDS = new Set([
  'a','an','the','and','or','but','if','then','else','when','at','by','for','in','of','on','to','up','with','as','is','are','was','were','be','been','being','from','that','this','those','these','it','its','your','you','we','our','their','they','he','she','him','her','his','hers','do','does','did','doing','have','has','had','having','can','could','should','would','may','might','must','will','shall','i','me','my','mine','not','no','yes'
]);

// Normalize text: lowercase, remove punctuation, collapse spaces
export function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    // Keep letters, numbers, + and -; replace other punctuation with space
    .replace(/[^a-z0-9+\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract unique keywords from text by splitting on whitespace and removing stop words
export function extractKeywords(str) {
  const normalized = normalizeText(str);
  if (!normalized) return [];
  const words = normalized.split(' ');
  const keywords = words.filter(w => w && !STOP_WORDS.has(w));
  // Deduplicate while preserving order
  const seen = new Set();
  const unique = [];
  for (const w of keywords) {
    if (!seen.has(w)) {
      seen.add(w);
      unique.push(w);
    }
  }
  return unique;
}

// Compare resume keywords to job description keywords
export function compareKeywords(resumeText, jdText) {
  const resumeKeywords = extractKeywords(resumeText);
  const jdKeywords = extractKeywords(jdText);

  const resumeSet = new Set(resumeKeywords);
  const jdSet = new Set(jdKeywords);

  const matched = jdKeywords.filter(k => resumeSet.has(k));
  const missing = jdKeywords.filter(k => !resumeSet.has(k));

  const percentage = jdKeywords.length === 0
    ? 0
    : Math.round((matched.length / jdKeywords.length) * 100);

  return {
    resumeKeywords,
    jdKeywords,
    matched,
    missing,
    percentage,
  };
}

// Generate simple improvement suggestions from missing keywords
export function getSuggestions(missingKeywords) {
  if (!missingKeywords || missingKeywords.length === 0) return [];
  // Map each missing keyword to a simple suggestion
  // Limit to top 10 to avoid overwhelming the UI
  return missingKeywords.slice(0, 10).map(k => `Add experience with ${k}`);
}