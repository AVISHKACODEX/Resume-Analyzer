import React, { useState, useMemo } from 'react';
import './App.css';
import './index.css';

import ProgressBar from './components/ProgressBar.jsx';
import KeywordList from './components/KeywordList.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import TextAreaWithHighlight from './components/TextAreaWithHighlight.jsx';
import { compareKeywords, getSuggestions, extractKeywords } from './utils/keywordMatcher.js';

const SAMPLE_RESUME = `John Doe\n\nFront-end Developer with 5+ years building responsive web apps.\nSkills: React, Redux, TypeScript, JavaScript, HTML, CSS, Tailwind, Vite, Jest, REST APIs.\nExperience: Developed reusable components, optimized performance, collaborated with designers and backend teams.\nProjects: E-commerce, dashboards, analytics.\n`;

const SAMPLE_JD = `We are hiring a Front-end Developer.\nRequirements: React, JavaScript, TypeScript, CSS, HTML, Tailwind, REST, testing (Jest).\nNice to have: Redux, performance optimization, accessibility, Vite.\n`;

export default function App() {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const jdKeywords = useMemo(() => extractKeywords(jd), [jd]);

  const onAnalyze = () => {
    if (!resume.trim() || !jd.trim()) {
      setError('Please provide both Resume and Job Description.');
      setResult(null);
      return;
    }
    setError('');
    const r = compareKeywords(resume, jd);
    setResult(r);
  };

  const onLoadSample = () => {
    setResume(SAMPLE_RESUME);
    setJd(SAMPLE_JD);
    setResult(null);
    setError('');
  };

  const onClear = () => {
    setResume('');
    setJd('');
    setResult(null);
    setError('');
  };

  const suggestions = useMemo(() => (result ? getSuggestions(result.missing) : []), [result]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200 dark:bg-gray-900/70 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Resume Analyzer</h1>
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <button className="btn-secondary" onClick={onLoadSample}>Load Sample</button>
            <button className="btn-secondary" onClick={onClear}>Clear Inputs</button>
            <button className="btn" onClick={onAnalyze}>Analyze Resume</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Inputs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <TextAreaWithHighlight
              label="Resume Input"
              value={resume}
              onChange={setResume}
              placeholder="Paste your resume here..."
              keywords={jdKeywords}
            />
            <p className="mt-2 text-xs text-gray-500">JD keywords will be highlighted to guide improvements.</p>
          </div>
          <div className="card">
            <TextAreaWithHighlight
              label="Job Description Input"
              value={jd}
              onChange={setJd}
              placeholder="Paste the job description here..."
              keywords={jdKeywords}
            />
            <p className="mt-2 text-xs text-gray-500">We use keyword overlap to estimate match.</p>
          </div>
        </section>

        {error && (
          <div className="card border-red-300 dark:border-red-700">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Match Percentage</h2>
                <span className="text-sm text-gray-600 dark:text-gray-300">{result.matched.length}/{result.jdKeywords.length} keywords matched</span>
              </div>
              <ProgressBar percent={result.percentage} />
              <p className="mt-2 text-sm font-medium">{result.percentage}% match</p>
            </div>
            <KeywordList title="Matched Keywords" keywords={result.matched} variant="matched" />
            <KeywordList title="Missing Keywords" keywords={result.missing} variant="missing" />
            <div className="card">
              <h3 className="text-sm font-semibold mb-3">Improvement Suggestions</h3>
              {suggestions.length === 0 ? (
                <p className="text-sm text-gray-500">Looks good! No immediate suggestions.</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* Helper info */}
        <section className="card">
          <h3 className="text-sm font-semibold mb-2">How it works</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We normalize text (lowercase, remove punctuation), extract keywords while ignoring common stop words, and compute match percentage as (matched JD keywords / total JD keywords) × 100. No external APIs; everything runs locally in your browser.
          </p>
        </section>
      </main>
    </div>
  );
}
