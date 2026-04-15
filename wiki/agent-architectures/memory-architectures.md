---
title: "Memory Architectures"
type: architecture
sources:
  - raw/references/Sumers_2024_cognitive-architectures-for-language-agents.pdf
  - raw/references/Park_2023_generative-agents-interactive-simulacra-of-human-behavior.pdf
  - raw/references/Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning.pdf
related:
  - "[[context-windows]]"
  - "[[perceive-reason-act-loop]]"
  - "[[context-management-risks]]"
  - "[[retrieval-augmented-generation]]"
  - "[[summary-Park_2023_generative-agents-interactive-simulacra-of-human-behavior]]"
tags:
  - memory
  - architecture
  - episodic
  - semantic
  - agent
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Memory Architectures

An LLM agent's memory determines what it knows beyond its current [[context-windows]]. Memory design is a critical architectural decision because it shapes what information the agent can access, how accurately it recalls past events, and how its knowledge degrades over time.

## Four Memory Types

### In-Context Memory
The content of the current context window — the agent's working memory. It is volatile (lost when the context is cleared), limited in size, and the only memory the model processes directly. Everything the agent "knows" at a given moment must be in this window or retrievable into it.

### Episodic Memory
Stores the history of past interactions: prior conversations, tool calls and results, events the agent has observed. At each invocation, relevant episodes are retrieved and injected into context. This gives the agent continuity across sessions, at the cost of context window space for the retrieved history.

The most influential episodic memory design is the **memory stream** from [[summary-Park_2023_generative-agents-interactive-simulacra-of-human-behavior|Park et al. (2023)]]. Each agent maintains a chronologically ordered list of natural language observations. Retrieval uses **three-factor scoring**:

1. **Recency**: exponential decay — recent memories score higher
2. **Importance**: LLM-assigned significance score (1-10) — life-changing events outrank mundane observations
3. **Relevance**: cosine similarity between current situation and memory embeddings

This multi-factor approach outperforms pure semantic search (which misses temporal context) or pure recency (which misses important old memories). The architecture also introduces **reflection** — periodic synthesis of memories into higher-level abstractions ("what have I learned?") that are added back to the memory stream. Reflection is a form of structured memory compression that preserves meaning, offering an alternative to the lossy compression strategies in [[context-management-risks]].

A distinct use of episodic memory appears in **Reflexion** ([[summary-Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning|Shinn et al., 2023]]), where agents store verbal self-reflections after task failures. Rather than recording observations, the memory stores diagnostic summaries of what went wrong and what to try differently. This creates a trial-and-error learning loop without weight updates: the agent improves across attempts by consulting its accumulated failure analyses. The memory window is typically limited to the most recent 3 reflections to fit within context constraints. This pattern is effective for tasks with clear success/failure signals but struggles when failures do not yield actionable lessons (see [[self-correction-limitations]]).

### Semantic Memory
Stores distilled factual knowledge: entities, relationships, domain-specific facts. This is the domain of vector stores and [[knowledge-graphs]]. Semantic memory provides knowledge that was not in the model's training data or that needs to be more current or more accurate than what training provides.

### Procedural Memory
Stores reusable instructions, code templates, and skills. In some agent frameworks, procedural memory allows the agent to acquire new capabilities by writing and storing code that can be invoked in future sessions.

## Memory Scoping

How memory is scoped — what is private to one agent versus shared with others — is a design choice with direct implications for what agents know about each other and the shared task. In multi-agent systems, memory scoping determines:

- Whether agents can access each other's observations
- Whether a shared situational picture exists
- Whether agents independently develop potentially divergent views of the same situation

## Collaborative Memory

A design pattern where humans and AI agents jointly build episodic and semantic memory. Rather than the agent accumulating memory in isolation, the operator writes entries (shift log notes, observations, assessments) and the agent suggests structured tags, cross-references to related past events, and links to relevant procedures.

The resulting memory store carries **human editorial authority** (the operator reviewed and approved each entry) while benefiting from the agent's ability to recall and cross-reference across a larger corpus. Collaborative memory is more trustworthy than purely automated memory because the human acts as a continuous validation layer during construction.

## Temporal Organisation

Rather than treating memory as a flat chronological log, structuring it along operationally meaningful temporal boundaries (shifts, days, outage periods) with explicit cross-links between related entries enables temporal queries that flat retrieval cannot support. Queries like "how often has this equipment shown this behaviour in the last 90 days?" or "is the frequency increasing?" require searching across temporal boundaries and matching on operational signature rather than keyword similarity.

Temporally structured episodic memory operates on structured metadata rather than on semantic similarity search over narrative text, making it more precise and less susceptible to retrieval failure modes.

## Memory Failure Modes

| Failure Mode | Description | Consequence |
|---|---|---|
| **Retrieval miss** | Relevant memory exists but is not retrieved (poor query-memory alignment) | Agent reasons without information it "should" know |
| **Stale memory** | Retrieved memory reflects outdated state | Agent acts on information that is no longer true |
| **Hallucinated memory** | Memory generated by LLM summarisation contains fabricated details | False information treated as established fact |
| **Memory flooding** | Too much retrieved memory fills context window | Dilutes the agent's attention on current task; see [[context-windows]] |
| **Asymmetric recall** | In multi-agent settings, different agents retrieve different subsets of shared history | Agents develop divergent situational pictures |

## Relevance to Safety-Critical Systems

1. **Memory is reconstruction, not recording.** When episodic memory is stored as LLM-generated summaries, each retrieval is a reconstruction subject to [[hallucination]] risk. Only verbatim storage preserves original fidelity.

2. **Temporal structure matters for operational domains.** Shift-based, procedure-based, or event-based temporal organisation enables the kinds of queries that safety professionals need: trend detection, recurrence analysis, and cross-event pattern matching.

3. **Collaborative memory is more trustworthy.** Human-in-the-loop memory construction creates an audit trail with human editorial oversight. For regulated domains, this is significantly stronger than purely automated memory accumulation.

4. **Memory scoping is an independence concern.** If two agents share memory freely, they share information states, which undermines any claim of independent assessment. Memory isolation is a prerequisite for [[epistemic-independence]].
