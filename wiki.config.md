# Wiki Configuration

## Domain
This wiki is a domain-agnostic technical primer on advanced AI systems (LLMs, agents, multi-agent architectures) for Human Factors and Safety specialists working in complex work domains. The target audience includes HF engineers, safety analysts, reliability researchers, and system designers who need a thorough grounding in the technical capabilities, limitations, and failure modes of AI systems — and what these mean for the design and evaluation of work systems.

The wiki draws examples from nuclear power, oil and gas, aviation, and medical domains. Content should be written at a level accessible to professionals with domain expertise in safety-critical systems but not necessarily in machine learning. Mathematical formalism should be used sparingly and always accompanied by plain-language explanation.

## Writing Approach
Pages are comprehensive reference articles drawing on source material AND broader AI/HF knowledge. When content comes from specific sources, it is cited. When content draws on general AI or HF knowledge beyond the sources, this is clearly indicated. The goal is that each page stands as a thorough reference on its topic — not just a summary of what one paper says, but a complete treatment that a safety professional could rely on.

## Quality Rules
- Summary pages: minimum 300 words
- Foundation articles (foundations/): minimum 800 words, link to >= 3 related pages
- Architecture articles (agent-architectures/): minimum 800 words, link to >= 3 related pages
- Failure mode articles (failure-modes/): minimum 600 words, must include "Relevance to Safety-Critical Systems" section
- Safety/reliability articles (safety-and-reliability/): minimum 800 words, link to >= 3 related pages
- Human-AI interaction articles (human-ai-interaction/): minimum 600 words, link to >= 2 HF concepts
- Design pattern articles (design-patterns/): minimum 600 words, include at least one cross-domain example
- Evaluation articles (evaluation-and-testing/): minimum 600 words
- Domain application articles (domain-applications/): minimum 500 words, reference specific scenarios
- Source paths in frontmatter must match actual files in raw/
- Lint must pass after every phase (zero dead links, zero orphans)
