import type { VercelRequest, VercelResponse } from '@vercel/node'

interface FeedbackPayload {
  page: string
  section: string
  type: 'correction' | 'suggestion' | 'missing' | 'unclear'
  text: string
  name: string
  wiki_version: string
  timestamp: string
}

const ALLOWED_ORIGINS = [
  /\.github\.io$/,
  /localhost/,
]

const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) return false
  return ALLOWED_ORIGINS.some(pattern => pattern.test(origin))
}

const createIssueBody = (payload: FeedbackPayload): string => {
  const metaBlock = [
    '<!-- WIKI-FEEDBACK-META',
    `page: ${payload.page}`,
    `section: ${payload.section}`,
    `type: ${payload.type}`,
    `wiki_version: ${payload.wiki_version}`,
    `timestamp: ${payload.timestamp}`,
    `reporter: ${payload.name}`,
    'WIKI-FEEDBACK-META -->',
  ].join('\n')

  const humanBlock = [
    `**Page:** \`${payload.page}\``,
    `**Section:** \`${payload.section}\``,
    `**Type:** ${payload.type}`,
    `**Reporter:** ${payload.name}`,
    '',
    '---',
    '',
    payload.text,
  ].join('\n')

  return `${metaBlock}\n\n${humanBlock}`
}

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const origin = req.headers.origin as string | undefined

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const payload = req.body as FeedbackPayload

  if (!payload.page || !payload.section || !payload.type || !payload.text) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  const ghToken = process.env.GITHUB_PAT
  const ghRepo = process.env.GITHUB_REPO

  if (!ghToken || !ghRepo) {
    res.status(500).json({ error: 'Server configuration error' })
    return
  }

  const title = `[${payload.type}] ${payload.page}#${payload.section}`
  const body = createIssueBody(payload)
  const labels = ['wiki-feedback', `type:${payload.type}`]

  const response = await fetch(`https://api.github.com/repos/${ghRepo}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ghToken}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, labels }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('GitHub API error:', errorText)
    res.status(502).json({ error: 'Failed to create issue' })
    return
  }

  const issue = await response.json()
  res.status(201).json({ issue_number: issue.number })
}
