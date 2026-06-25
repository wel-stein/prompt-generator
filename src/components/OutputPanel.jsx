const STYLES = [
  { id: 'guided', label: 'Guided', hint: 'Natural language + XML tags (recommended)' },
  { id: 'xml', label: 'XML tags', hint: 'Every section wrapped in a semantic tag' },
  { id: 'markdown', label: 'Markdown', hint: 'Section headings (## Task context …)' },
]

export default function OutputPanel({
  text,
  style,
  onStyleChange,
  onCopy,
  onDownload,
  copied,
}) {
  const chars = text.length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const tokens = Math.ceil(chars / 4) // rough heuristic: ~4 chars per token

  return (
    <aside className="output">
      <div className="output__head">
        <h2 className="output__title">Generated prompt</h2>
        <div className="output__styles" role="group" aria-label="Output format">
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              title={s.hint}
              className={'chip' + (style === s.id ? ' chip--active' : '')}
              onClick={() => onStyleChange(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="output__box">
        {text ? (
          <pre className="output__pre">{text}</pre>
        ) : (
          <div className="output__empty">
            <p>Your merged prompt will appear here.</p>
            <p className="output__empty-sub">
              Fill in the sections on the left — empty ones are skipped automatically.
            </p>
          </div>
        )}
      </div>

      <div className="output__foot">
        <div className="output__stats">
          <span>{chars.toLocaleString()} chars</span>
          <span>{words.toLocaleString()} words</span>
          <span>~{tokens.toLocaleString()} tokens</span>
        </div>
        <div className="output__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onDownload}
            disabled={!text}
          >
            Download .txt
          </button>
          <button
            type="button"
            className={'btn btn--primary' + (copied ? ' btn--ok' : '')}
            onClick={onCopy}
            disabled={!text}
          >
            {copied ? '✓ Copied!' : 'Copy prompt'}
          </button>
        </div>
      </div>
    </aside>
  )
}
