---
title: "Summary: The Berkeley Function Calling Leaderboard (BFCL)"
type: summary
sources:
  - raw/references/Patil_2025_berkeley-function-calling-leaderboard.pdf
related:
  - "[[tool-calling]]"
  - "[[hallucination]]"
  - "[[memory-architectures]]"
  - "[[capability-gradient]]"
  - "[[non-determinism-and-reproducibility]]"
tags:
  - tool-calling
  - benchmark
  - function-calling
  - evaluation
  - memory
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: The Berkeley Function Calling Leaderboard (BFCL)

Patil et al. (2025) present BFCL, the de facto standard benchmark for evaluating LLM function-calling capabilities. Published at ICML 2025, the benchmark has been adopted by all major model developers. BFCL is notable for its comprehensive scope — spanning single-turn, multi-turn, crowd-sourced, and agentic evaluation — and for revealing that while models have improved dramatically on simple function calls, **multi-turn agentic tasks and memory management remain fundamentally weak**.

## Benchmark Structure

BFCL comprises four components with 5,551 question-function-answer pairs across Python, Java, JavaScript, REST APIs, and SQL:

1. **Single-turn** (2,251 curated entries) — Five categories: Simple (one tool, one call), Multiple (many tools, one call), Parallel (one tool, multiple calls), Parallel Multiple (many tools, many calls), and Irrelevance (tools available but no call expected). Evaluated via Abstract Syntax Tree (AST) matching, which correlates strongly with execution-based evaluation while being scalable and deterministic.

2. **Crowd-sourced** (64,517 real queries from users) — Genuine function-calling interactions submitted by real users, filtered and human-edited. Serves as a contamination stress test: models that memorised the curated dataset show performance drops on crowd-sourced queries.

3. **Multi-turn** (1,000 queries across 8 API suites) — Sustained conversations requiring context management, missing parameter handling, missing function detection, and long-context reasoning. Evaluated via state-based (final state matches ground truth) and response-based (correct execution path) methods.

4. **Agentic** — Five real-world domains: web search (DuckDuckGo), memory management (key-value store), database queries, and chatbot context. Tests stateful reasoning and dynamic decision-making in realistic settings.

## Key Findings

**Frontier models excel on simple calls but struggle on agentic tasks.** Top models achieve ~85-90% on single-turn but drop to ~70% on holistic evaluation that includes multi-turn and agentic categories. The gap between simple and complex function calling remains the central challenge.

**Memory management is the weakest capability.** Even the best model (o1-2024-12-17) reaches only approximately 12% accuracy on memory management tasks. Models demonstrate consistent failures in: key-value store operations (saving as one key vs splitting into multiple), key retrieval (guessing keys instead of listing available ones first), and giving up after a single retrieval failure instead of trying alternative approaches. This directly connects to the [[memory-architectures]] challenge — agents that cannot reliably manage external state have a fundamental limitation for sustained operation.

**Three primary error types in multi-turn tasks.** LLM-as-judge error analysis categorises failures into: (1) **Failed to Understand Environment State** (most prevalent) — the model hallucinated or assumed incorrect environment state, attempted actions in wrong directories, or terminated prematurely due to state misalignment; (2) **Failed to Understand User's Request** — the model misinterpreted user intent, returning unsorted data or executing trades instead of checking prices; (3) **Failed to Understand Function Documentation** — the model misread or misused API specifications.

**FC mode vs prompting mode.** Models with native function-calling (FC mode) produce more structured, parseable outputs but can be inflexible in complex scenarios. Prompting-based models are more flexible for complex multi-tool scenarios but produce three times more decoding issues. In the parallel multiple category, FC models show more incorrect function-call counts (77.5 vs 21 errors), suggesting structured output constraints limit compositional flexibility.

**Rapid improvement trajectory.** Function-calling performance improved from ~42% (GPT-4, June 2023) to ~85% (GPT-4o, September 2024) as function calling became a post-training objective. This 43-percentage-point improvement in 15 months demonstrates that tool-calling reliability is trainable — but the persistent weakness on multi-turn and memory tasks suggests these require architectural, not just training, solutions.

## Relevance to This Wiki

BFCL provides the most current empirical picture of [[tool-calling]] reliability, directly updating the Gorilla-era benchmarks already in the wiki. The finding that memory management is the weakest link connects to [[memory-architectures]] — reliable external state management is a prerequisite for agent operation in safety-critical contexts where sessions may last hours. The three error types (environment state, user request, documentation) provide a concrete failure taxonomy for [[tool-calling]] that complements the more general failure modes already documented. The rapid improvement trajectory (42% → 85% in 15 months) suggests that tool-calling reliability may continue to improve, but the plateau on complex agentic tasks indicates fundamental limits that training alone may not resolve.
