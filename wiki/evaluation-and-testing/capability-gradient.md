---
title: "The Capability Gradient for AI Testing"
type: evaluation
sources: []
related:
  - "[[hra-methods-for-ai]]"
  - "[[deployment-local-vs-cloud]]"
  - "[[retrieval-augmented-generation]]"
  - "[[tool-calling]]"
  - "[[multi-agent-taxonomy]]"
tags:
  - evaluation
  - testing
  - prototyping
  - capability-gradient
  - methodology
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# The Capability Gradient for AI Testing

The central barrier to responsible adoption of AI agent systems in safety-critical operations is the distance between what can be built and what can be assessed. The capability gradient provides a structured path for building testing environments where claims about AI systems can be investigated experimentally. Each level adds one architectural capability, and the investigations at each level produce evidence that the field currently lacks.

## The Build-vs-Assess Gap

On the building side, the technology is available: frontier LLMs answer domain-specific questions with apparent fluency, [[retrieval-augmented-generation]] grounds output in documentation, multi-agent architectures coordinate multiple models, and [[tool-calling]] interfaces allow agents to query databases and invoke simulations. A motivated domain engineer with access to an AI coding agent can prototype a multi-agent advisory system in weeks.

On the assessment side, almost nothing exists. No domain-specific benchmarks, no multi-agent evaluation frameworks, no empirical human-AI interaction data from operational contexts, no validated HRA parameters for AI-assisted operations.

The consequence: building outpaces assessment. Systems can be prototyped faster than they can be evaluated, and evaluation methods themselves need development alongside the systems they measure.

## The Eight Levels

| Level | Capability Added | Core Investigations |
|---|---|---|
| **0** | Structured evaluation of a frontier model | Domain knowledge, [[hallucination]], [[calibration-and-confidence]], [[prompt-sensitivity]] |
| **1** | Local deployment and model comparison | System prompt effects, error correlation, reproducibility; see [[deployment-local-vs-cloud]] |
| **2** | Knowledge grounding ([[retrieval-augmented-generation]] and [[knowledge-graphs]]) | Retrieval failure modes, guardrail effectiveness, document-type performance |
| **3** | [[tool-calling]] and the ReAct loop | Tool chain reliability, selection accuracy, information asymmetry |
| **4** | Simulator coupling | Forward projection, boundary condition accuracy, physics-LLM distinction |
| **5** | Persistent agent with [[memory-architectures]] | Context management under accumulation, memory fidelity, operator modelling |
| **6** | Multi-agent coordination (see [[multi-agent-taxonomy]]) | [[epistemic-independence]], productive disagreement, [[multi-agent-coordination-failures]] |
| **7** | Human in the loop | Decision quality, [[trust-calibration]], override behaviour, [[hra-methods-for-ai]] parameter estimation |

## Key Properties

**Levels are additive.** Nothing built at a lower level is discarded. The Level 0 evaluation harness is reused at every subsequent level. The Level 2 knowledge grounding becomes the tool interface at Level 3.

**Levels are framed as experiments, not technologies.** The question at each level is "what can you now investigate?" The technology is the means; the investigation is the contribution.

**Accessible entry points.** Levels 0–1 require only API access (Level 0) or a computer with sufficient memory (Level 1). A reader with no prior AI development experience can reach Level 1 in a day and produce preliminary evidence about domain knowledge, hallucination patterns, and prompt sensitivity.

**Full gradient timeline.** Level 0 can be completed in a single day. The full gradient to Level 7 (including formal human-in-the-loop studies) represents 6–12 months of sustained effort. Readers can stop at any level and have produced something useful.

## What Each Level Produces

- **Level 0–1**: domain-specific LLM benchmark data that is currently missing
- **Level 2–3**: functioning agent evaluation harness with knowledge grounding and tool reliability data
- **Level 4–5**: persistent agent infrastructure with simulation coupling and memory management evidence
- **Level 6**: infrastructure to test the [[epistemic-independence]] hypothesis
- **Level 7**: empirical human-AI interaction data for [[hra-methods-for-ai]] parameter estimation

## The Operational Model

The gradient assumes a domain professional specifying what to build (requirements, interfaces, physics, constraints) while an AI coding agent handles implementation. This makes the full gradient accessible to domain experts who are not software engineers — the operational model reflects how AI-assisted development works in practice.

## Relevance to Safety-Critical Systems

1. **The gradient closes the build-vs-assess gap.** Each level produces evidence that addresses specific gaps identified in the AI safety analysis literature.

2. **Domain-agnostic structure.** The gradient applies to any safety-critical domain: replace the reactor scenario with a drilling scenario (oil and gas), a flight management scenario (aviation), or a clinical scenario (medical), and the same eight levels apply with domain-specific content.

3. **Evidence compounds across levels.** Level 7 human-AI interaction studies are more informative when conducted on a system that has been systematically evaluated through Levels 0–6, because the lower-level evidence contextualises the human factors findings.
