import { DEFAULT_THINKING } from '../sections.js'

/**
 * Renders one section of the prompt-structure form.
 * Handles both the free-text fields and the special "thinking" toggle (section 8).
 */
export default function SectionCard({ section, values, onChange }) {
  const { id, number, title, color, description, placeholder, type } = section
  const filled =
    type === 'thinking' ? values.thinking : (values[id] || '').trim().length > 0

  return (
    <section className="card" style={{ '--accent': color }}>
      <header className="card__head">
        <span className="card__num" aria-hidden="true">
          {number}
        </span>
        <div className="card__titles">
          <h2 className="card__title">{title}</h2>
          <p className="card__desc">{description}</p>
        </div>
        {filled && (
          <span className="card__check" title="This section has content">
            ✓
          </span>
        )}
      </header>

      {type === 'thinking' ? (
        <div className="card__body">
          <label className="switch">
            <input
              type="checkbox"
              checked={values.thinking}
              onChange={(e) => onChange('thinking', e.target.checked)}
            />
            <span className="switch__track" aria-hidden="true">
              <span className="switch__thumb" />
            </span>
            <span className="switch__label">
              Ask the model to think step by step
            </span>
          </label>

          {values.thinking && (
            <textarea
              className="card__input"
              value={values.thinkingInstruction}
              placeholder={DEFAULT_THINKING}
              onChange={(e) => onChange('thinkingInstruction', e.target.value)}
              rows={3}
            />
          )}
        </div>
      ) : (
        <div className="card__body">
          <textarea
            className="card__input"
            value={values[id] || ''}
            placeholder={placeholder}
            onChange={(e) => onChange(id, e.target.value)}
            rows={4}
          />
        </div>
      )}
    </section>
  )
}
