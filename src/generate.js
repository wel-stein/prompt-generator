import { DEFAULT_THINKING } from './sections.js'

const has = (s) => typeof s === 'string' && s.trim().length > 0
const t = (s) => s.trim()

/**
 * Merge the form values into a single prompt string.
 *
 * @param {object} v       form values keyed by section id
 * @param {object} options { style: 'guided' | 'xml' | 'markdown' }
 * @returns {string}
 */
export function generatePrompt(v, { style = 'guided' } = {}) {
  const thinkingText = v.thinking ? t(v.thinkingInstruction || DEFAULT_THINKING) : ''
  const parts = []

  if (style === 'markdown') {
    if (has(v.taskContext)) parts.push(`## Task context\n${t(v.taskContext)}`)
    if (has(v.toneContext)) parts.push(`## Tone context\n${t(v.toneContext)}`)
    if (has(v.backgroundData))
      parts.push(`## Background data & documents\n${t(v.backgroundData)}`)
    if (has(v.detailedTask))
      parts.push(`## Detailed task description & rules\n${t(v.detailedTask)}`)
    if (has(v.examples)) parts.push(`## Examples\n${t(v.examples)}`)
    if (has(v.conversationHistory))
      parts.push(`## Conversation history\n${t(v.conversationHistory)}`)
    if (has(v.immediateTask)) parts.push(`## Your task\n${t(v.immediateTask)}`)
    if (thinkingText) parts.push(`## Thinking\n${thinkingText}`)
    if (has(v.outputFormatting))
      parts.push(`## Output formatting\n${t(v.outputFormatting)}`)
    return withPrefill(parts.join('\n\n'), v, 'markdown')
  }

  if (style === 'xml') {
    if (has(v.taskContext)) parts.push(tag('task_context', v.taskContext))
    if (has(v.toneContext)) parts.push(tag('tone_context', v.toneContext))
    if (has(v.backgroundData)) parts.push(tag('background_data', v.backgroundData))
    if (has(v.detailedTask)) parts.push(tag('detailed_task_description', v.detailedTask))
    if (has(v.examples)) parts.push(tag('examples', v.examples))
    if (has(v.conversationHistory))
      parts.push(tag('conversation_history', v.conversationHistory))
    if (has(v.immediateTask)) parts.push(tag('immediate_task', v.immediateTask))
    if (thinkingText) parts.push(tag('thinking_instruction', thinkingText))
    if (has(v.outputFormatting)) parts.push(tag('output_formatting', v.outputFormatting))
    return withPrefill(parts.join('\n\n'), v, 'xml')
  }

  // 'guided' (default) — natural-language framing with XML tags around data blocks,
  // following the recommended prompt-engineering structure.
  if (has(v.taskContext)) parts.push(t(v.taskContext))
  if (has(v.toneContext)) parts.push(t(v.toneContext))
  if (has(v.backgroundData))
    parts.push(
      `Here is some background data, documents, and context you should reference for your task:\n${tag('context', v.backgroundData)}`,
    )
  if (has(v.detailedTask))
    parts.push(
      `Here is the detailed description of your task and the rules you must follow:\n${tag('instructions', v.detailedTask)}`,
    )
  if (has(v.examples))
    parts.push(`Here are some examples of how to respond:\n${tag('examples', v.examples)}`)
  if (has(v.conversationHistory))
    parts.push(
      `Here is the conversation history so far:\n${tag('history', v.conversationHistory)}`,
    )
  if (has(v.immediateTask)) parts.push(t(v.immediateTask))
  if (thinkingText) parts.push(thinkingText)
  if (has(v.outputFormatting)) parts.push(t(v.outputFormatting))
  return withPrefill(parts.join('\n\n'), v, 'guided')
}

function tag(name, content) {
  const body = typeof content === 'string' ? t(content) : content
  return `<${name}>\n${body}\n</${name}>`
}

function withPrefill(body, v, style) {
  if (!has(v.prefilledResponse)) return body
  const prefill = t(v.prefilledResponse)
  if (style === 'xml') {
    return `${body}\n\n${tag('prefilled_response', prefill)}`
  }
  const note =
    "Assistant (prefilled response — paste this as the start of the assistant's turn):"
  return `${body}\n\n---\n${note}\n${prefill}`
}
