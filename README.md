# Resume Analyzer (React + Tailwind)

A clean, professional, and responsive web app that analyzes a Resume against a Job Description and calculates a match percentage based on keyword overlap. All logic is written in JavaScript and runs entirely in the browser — no backend, no database, no AI API.

## Features
- Two large inputs: Resume and Job Description
- Analyze button computes overlap of keywords (stop words ignored)
- Match Percentage with animated progress bar
- Matched keywords (green) and Missing keywords (red)
- Simple improvement suggestions (e.g., "Add experience with React")
- Validation if any input is empty
- Clean card-based layout, responsive design
- Dark mode toggle
- Clear inputs button
- Keyword highlighting inside text areas (JD keywords highlighted)

## Tech Stack
- React (functional components)
- Tailwind CSS
- Vite

## How It Works
- Normalize text (lowercase, remove punctuation)
- Extract keywords (split by spaces, remove common stop words)
- Compare Resume keywords against Job Description keywords
- Calculate match: `(matched / total JD keywords) * 100`

## Project Structure
```
resume-analyzer/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── src/
│   ├── App.jsx           # Main UI and logic
│   ├── App.css
│   ├── index.css         # Tailwind directives and utilities
│   ├── main.jsx          # React entry
│   ├── components/
│   │   ├── DarkModeToggle.jsx
│   │   ├── KeywordList.jsx
│   │   ├── ProgressBar.jsx
│   │   └── TextAreaWithHighlight.jsx
│   └── utils/
│       └── keywordMatcher.js
└── vite.config.js
```

## Sample Data
You can load sample content using the "Load Sample" button. Here are the sample texts:

- Sample Resume:
```
John Doe

Front-end Developer with 5+ years building responsive web apps.
Skills: React, Redux, TypeScript, JavaScript, HTML, CSS, Tailwind, Vite, Jest, REST APIs.
Experience: Developed reusable components, optimized performance, collaborated with designers and backend teams.
Projects: E-commerce, dashboards, analytics.
```

- Sample Job Description:
```
We are hiring a Front-end Developer.
Requirements: React, JavaScript, TypeScript, CSS, HTML, Tailwind, REST, testing (Jest).
Nice to have: Redux, performance optimization, accessibility, Vite.
```

## Setup & Scripts
1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```
Open the local URL printed in the terminal (e.g., `http://localhost:5173/`).

3. Build for production:
```
npm run build
```

## Notes
- Dark mode is controlled by toggling the `dark` class on the root element.
- Keyword highlighting overlays a marked layer underneath the textarea for a simple visual aid.
- Stop words are defined in `src/utils/keywordMatcher.js`.
- All logic is client-side JavaScript.

## License
AVISHKACODEX
