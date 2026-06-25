// The 10-part prompt structure.
// Order matters — this is the sequence the fields are rendered AND merged in.
// `color` mirrors the accent colors from the reference "Prompt structure" diagram.
// `type` is "textarea" for free-text fields and "thinking" for the special toggle.

export const SECTIONS = [
  {
    id: 'taskContext',
    number: 1,
    title: 'Task context',
    color: '#e2574c',
    type: 'textarea',
    description:
      'Who the model should be and the overall job. Set the role / persona and the high-level objective.',
    placeholder:
      'You will be acting as an AI customer success agent named Max for a SaaS company called AcmeCloud. Your goal is to help customers accurately and resolve their issues.',
  },
  {
    id: 'toneContext',
    number: 2,
    title: 'Tone context',
    color: '#e08a3c',
    type: 'textarea',
    description: 'The voice and attitude the model should adopt in its responses.',
    placeholder:
      'You should maintain a friendly, patient and professional customer-service tone. Be concise but warm.',
  },
  {
    id: 'backgroundData',
    number: 3,
    title: 'Background data, documents, and images',
    color: '#7e8b3d',
    type: 'textarea',
    description:
      'Reference material the model should ground its answer in — docs, data, policies, transcripts.',
    placeholder:
      'AcmeCloud plans:\n- Free: 5 GB storage, 1 user\n- Pro: $10/mo, 1 TB, 5 users\n- Business: $25/mo, unlimited\nRefunds available within 30 days of purchase.',
  },
  {
    id: 'detailedTask',
    number: 4,
    title: 'Detailed task description & rules',
    color: '#2fa98c',
    type: 'textarea',
    description:
      'Step-by-step instructions and the rules / guardrails the model must follow.',
    placeholder:
      '- Only answer questions about AcmeCloud.\n- If you do not know, say so and offer to escalate to a human.\n- Never invent pricing or policy that is not in the background data.\n- Do not discuss competitors.',
  },
  {
    id: 'examples',
    number: 5,
    title: 'Examples',
    color: '#4f86d6',
    type: 'textarea',
    description:
      'Few-shot examples of ideal input/output. The single most effective way to steer behaviour.',
    placeholder:
      '<example>\nCustomer: How much storage is on the free plan?\nMax: Great question! The Free plan includes 5 GB for 1 user. Need more room? Pro bumps that to 1 TB.\n</example>',
  },
  {
    id: 'conversationHistory',
    number: 6,
    title: 'Conversation history',
    color: '#8b7fd4',
    type: 'textarea',
    description: 'Prior turns of the conversation the model should take into account.',
    placeholder:
      "Customer: Hi, I think I was charged twice this month.\nMax: I'm sorry to hear that! Let me look into that duplicate charge for you.",
  },
  {
    id: 'immediateTask',
    number: 7,
    title: 'Immediate task description or request',
    color: '#d4519e',
    type: 'textarea',
    description:
      'The single, specific thing you want done right now. Keep it clear and direct.',
    placeholder:
      'The customer now asks: "Can I get a refund for the extra charge? I\'m on the Pro plan." Write your reply to the customer.',
  },
  {
    id: 'thinking',
    number: 8,
    title: 'Thinking step by step / take a deep breath',
    color: '#e0696f',
    type: 'thinking',
    description:
      'Ask the model to reason before answering. Great for analysis, math and multi-step tasks.',
    placeholder:
      'Think step by step before you answer. Do your reasoning inside <thinking></thinking> tags first.',
  },
  {
    id: 'outputFormatting',
    number: 9,
    title: 'Output formatting',
    color: '#8a8a8a',
    type: 'textarea',
    description: 'Exactly how the answer should be shaped — structure, length, tags, format.',
    placeholder:
      'Respond in a short paragraph addressed directly to the customer. If you must escalate, end with the line: [ESCALATE TO HUMAN].',
  },
  {
    id: 'prefilledResponse',
    number: 10,
    title: 'Prefilled response (if any)',
    color: '#3a3a44',
    type: 'textarea',
    description:
      "The start of the model's reply, to steer format or skip preamble. Paste as the assistant's turn.",
    placeholder: 'Max:',
  },
]

// Default instruction used when the "thinking" toggle is enabled.
export const DEFAULT_THINKING =
  'Think step by step before you answer. Take a deep breath and work through the problem carefully, then give your final answer.'
