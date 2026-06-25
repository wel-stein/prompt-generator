import { useEffect, useMemo, useState } from 'react'
import { SECTIONS } from './sections.js'
import { generatePrompt } from './generate.js'
import { EXAMPLE } from './example.js'
import SectionCard from './components/SectionCard.jsx'
import OutputPanel from './components/OutputPanel.jsx'

const STORAGE_KEY = 'prompt-structure-generator:v1'

const EMPTY = {
  taskContext: '',
  toneContext: '',
  backgroundData: '',
  detailedTask: '',
  examples: '',
  conversationHistory: '',
  immediateTask: '',
  thinking: false,
  thinkingInstruction: '',
  outputFormatting: '',
  prefilledResponse: '',
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { values: EMPTY, style: 'guided' }
    const saved = JSON.parse(raw)
    return {
      values: { ...EMPTY, ...(saved.values || {}) },
      style: saved.style || 'guided',
    }
  } catch {
    return { values: EMPTY, style: 'guided' }
  }
}

export default function App() {
  // Lazy initializers so localStorage is read only once, on mount.
  const [values, setValues] = useState(() => loadInitial().values)
  const [style, setStyle] = useState(() => loadInitial().style)
  const [copied, setCopied] = useState(false)

  // Persist to localStorage so work survives a refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, style }))
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [values, style])

  const generated = useMemo(
    () => generatePrompt(values, { style }),
    [values, style],
  )

  const filledCount = useMemo(() => {
    let n = 0
    for (const s of SECTIONS) {
      if (s.type === 'thinking') {
        if (values.thinking) n++
      } else if ((values[s.id] || '').trim().length > 0) {
        n++
      }
    }
    return n
  }, [values])

  function handleChange(id, value) {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  async function copyText(text) {
    if (!text) return false
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        return true
      } catch {
        return false
      }
    }
  }

  async function handleCopy() {
    const ok = await copyText(generated)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } else {
      alert('Could not copy automatically. Please select the text and copy manually.')
    }
  }

  function handleDownload() {
    if (!generated) return
    const blob = new Blob([generated], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function handleLoadExample() {
    setValues({ ...EMPTY, ...EXAMPLE })
  }

  function handleClear() {
    if (filledCount > 0 && !confirm('Clear all fields? This cannot be undone.')) return
    setValues(EMPTY)
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__inner">
          <div className="hero__text">
            <h1 className="hero__title">Prompt Structure Generator</h1>
            <p className="hero__subtitle">
              Compose a prompt with the proven 10-part structure, then merge every
              section into a single message ready to paste into any LLM.
            </p>
          </div>
          <div className="hero__tools">
            <button type="button" className="btn btn--ghost" onClick={handleLoadExample}>
              Load example
            </button>
            <button type="button" className="btn btn--ghost" onClick={handleClear}>
              Clear all
            </button>
          </div>
        </div>
      </header>

      <main className="layout">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {SECTIONS.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              values={values}
              onChange={handleChange}
            />
          ))}

          <button
            type="button"
            className={
              'btn btn--primary btn--block btn--lg' + (copied ? ' btn--ok' : '')
            }
            onClick={handleCopy}
            disabled={!generated}
          >
            {copied ? '✓ Copied to clipboard!' : 'Generate & copy prompt'}
          </button>
        </form>

        <div className="rail">
          <OutputPanel
            text={generated}
            style={style}
            onStyleChange={setStyle}
            onCopy={handleCopy}
            onDownload={handleDownload}
            copied={copied}
          />
        </div>
      </main>

      <footer className="foot">
        <span>
          {filledCount} of {SECTIONS.length} sections filled · stored locally in your
          browser
        </span>
      </footer>
    </div>
  )
}
