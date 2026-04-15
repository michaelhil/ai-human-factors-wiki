# AI for Human Factors and Safety Wiki — Agent Schema

This schema governs how AI agents work with this wiki. It references `wiki.config.md` for domain context, writing approach, and quality rules. This schema evolves: when a session reveals better conventions or missing operations, propose updates to this file.

## Directory Structure

```
ai-human-factors-wiki/
├── raw/                          # Layer 1: Immutable sources
│   ├── private/                  # Proprietary material (gitignored)
│   │   └── *.md                  # 6 proprietary reports — use for structure/topics only
│   └── references/               # Public references — cite freely
│       └── *.pdf                 # ~78 academic papers and regulatory docs
├── wiki/                         # Layer 2: Compiled knowledge
│   ├── index.md                  # Main wiki index with section headings
│   ├── glossary.md               # Cross-referenced glossary
│   ├── scope.md                  # Topic area definitions
│   ├── log.md                    # Change log
│   ├── summaries/                # One summary per source
│   ├── foundations/              # LLM architecture, training, alignment, inference
│   ├── agent-architectures/      # Single/multi-agent patterns, coordination, memory, tools
│   ├── failure-modes/            # Hallucination, calibration, sycophancy, context issues
│   ├── safety-and-reliability/   # Risk properties, epistemic independence, V&V
│   ├── human-ai-interaction/     # Automation bias, trust, SA, team cognition
│   ├── design-patterns/          # HSI design, delivery modes, governance, RAG, KG
│   ├── evaluation-and-testing/   # Benchmarking, HRA methods, assessment frameworks
│   └── domain-applications/      # Cross-domain scenarios (nuclear, aviation, O&G, medical)
├── wiki.config.md                # Domain, writing approach, quality rules
├── CLAUDE.md                     # This file — agent schema
├── mkdocs.yml                    # MkDocs Material configuration
└── scripts/
    └── wiki-check.ts             # Lint/quality check script
```

### Source handling rules
- `raw/` is immutable. Never modify source files.
- `raw/private/` contains proprietary reports. Use them for extracting structure, arguments, topics, classifications, and scenario inspiration. **Never cite them directly, never reproduce their text, never reference them in frontmatter source paths.** Treat as background knowledge only.
- `raw/references/` contains public documents. Cite freely. Reference in frontmatter `sources:` fields.

## Page Format

Every wiki page MUST have YAML frontmatter:

```yaml
---
title: "Page Title"
type: summary | foundation | architecture | failure-mode | safety | interaction | design-pattern | evaluation | application
sources:
  - raw/references/Author_Year_short-title.pdf
related:
  - "[[wikilink-to-related-page]]"
tags:
  - lowercase-keyword
confidence: high | medium | low
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### Type definitions
- `summary` — One summary per source document (in `summaries/`)
- `foundation` — LLM architecture, training, alignment, inference concepts
- `architecture` — Agent and multi-agent architectural patterns
- `failure-mode` — Specific failure modes of LLMs, agents, or multi-agent systems
- `safety` — Risk properties, independence, common-cause failure, V&V
- `interaction` — Human-AI interaction: trust, bias, SA, team cognition
- `design-pattern` — HSI design, delivery modes, governance, knowledge grounding
- `evaluation` — Testing methods, benchmarks, HRA, assessment frameworks
- `application` — Domain-specific scenarios and examples

## Naming Conventions

- Kebab-case filenames for content pages: `llm-architecture.md`, `epistemic-independence.md`
- Summaries: `summary-<SourceFilename-without-extension>.md` — the summary filename must exactly match the source filename in `raw/references/` with `summary-` prepended. Example: source `raw/references/Vaswani_2017_attention-is-all-you-need.pdf` → summary `wiki/summaries/summary-Vaswani_2017_attention-is-all-you-need.md`. This creates a 1:1 mechanical mapping between sources and summaries with zero ambiguity.
- No spaces in filenames. Underscores are used in summary filenames to match source naming convention.

## Interlinking

- Use `[[page-name]]` wikilinks without file extension
- Cross-reference liberally — every page should link to related concepts
- The glossary links to full articles; articles link back where appropriate
- **Inline citations should link to summary pages** where one exists. Use piped wikilink format: `[[summary-Author_Year_title|Author et al. (Year)]]`. Link on first mention per page; subsequent mentions can be plain text.
- **Summaries index entries** use the format: `- [[summary-Author_Year_title]] — Bottom-line finding`. The text after the dash should be a **one-line bottom-line** capturing the key takeaway (e.g., "Intrinsic self-correction degrades performance; only external feedback helps"), NOT just the paper title. The author/year is already in the filename; the title adds no value. The bottom-line should help a reader decide whether to click through.

## Operations

### INGEST
**MANDATORY: Always use `/wiki-ingest` via the Skill tool.** Do not process sources by manually reading PDFs and writing summaries — even when you know the steps. One skill invocation per source, every time, no exceptions.

1. Read source completely (read directly — do not delegate to sub-agents)
2. Extract knowledge according to wiki structure and page types
3. Write pages with full detail — check each page against quality rules IMMEDIATELY after writing
4. Update `wiki/index.md` with `[[wikilinks]]` to new pages
5. Run lint (dead links, orphans, missing frontmatter, source path validation)
6. Log changes in `wiki/log.md`

### QUERY
1. Read `wiki/index.md` to orient
2. Find relevant pages by topic
3. Synthesise answer with `[[wikilink]]` citations

### LINT
Check for:
- Dead `[[wikilinks]]` pointing to non-existent pages
- Orphan pages (no incoming links)
- Missing or incomplete frontmatter
- Source paths that don't match actual files in `raw/`
- Pages below word count minimums per type (see `wiki.config.md`)

### UPDATE
1. Update `updated:` date in frontmatter
2. Note contradictions between sources explicitly
3. Preserve page history through the change log
4. Log all changes in `wiki/log.md`

### PROCESS FEEDBACK
1. Retrieve GitHub issues with `wiki-feedback` label
2. Analyse feedback type (correction, suggestion, missing, unclear)
3. Propose changes for user approval
4. Execute approved changes
5. Archive processed issues

### STRUCTURE DISCUSSION
When the user wants to reorganise the wiki:
1. List sources in `raw/` (including `raw/private/`) and scan their headings/TOCs
2. Propose content directories and page types based on sources and domain
3. Refine with user until agreed
4. Define quality rules per type (word minimums, structural requirements)
5. Create agreed directories in `wiki/`
6. Write or update `wiki/index.md` with section headings
7. Add quality rules per type to `wiki.config.md`
8. Update the page format section of this file with agreed types
