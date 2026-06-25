# Prompt Structure Generator

A small React web app for composing prompts with the proven **10-part prompt
structure**, then merging every section into a single, copy-ready message you can
paste into any LLM.

![10-part prompt structure](https://img.shields.io/badge/prompt-structure-10%20parts-e2574c)

## The structure

Each form field maps to one part of the structure (empty fields are skipped when
merging):

| # | Section | What goes here |
|---|---------|----------------|
| 1 | Task context | The model's role / persona and the high-level objective |
| 2 | Tone context | The voice and attitude to adopt |
| 3 | Background data, documents, and images | Reference material to ground the answer |
| 4 | Detailed task description & rules | Step-by-step instructions and guardrails |
| 5 | Examples | Few-shot examples of ideal input/output |
| 6 | Conversation history | Prior turns to take into account |
| 7 | Immediate task description or request | The specific thing to do right now |
| 8 | Thinking step by step | Toggle to ask the model to reason first |
| 9 | Output formatting | Exactly how the answer should be shaped |
| 10 | Prefilled response | The start of the model's reply (optional) |

## Features

- **Live preview** — the merged prompt updates as you type.
- **Three output formats** — Guided (natural language + XML tags, recommended),
  XML tags, or Markdown headings.
- **Generate & copy** in one click, plus **Download .txt**.
- **Load example** — fills every field with a complete worked example.
- **Auto-saved** — your work is persisted to `localStorage`.
- **Responsive** — two columns on desktop, stacked on mobile.
- Character / word / approximate token counts.

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Tech stack

- [React 18](https://react.dev/)
- [Vite 5](https://vite.dev/)
- Plain CSS (no UI framework)

## Project structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # State, persistence, copy/download, layout
├── sections.js           # The 10 section definitions (order, colors, copy)
├── generate.js           # Merges form values into the final prompt
├── example.js            # The "Load example" data
├── styles.css            # All styling
└── components/
    ├── SectionCard.jsx   # One form section (text field or thinking toggle)
    └── OutputPanel.jsx   # Live preview, format switch, copy/download
```

## License

MIT
