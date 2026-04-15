---
title: "The Hybrid Decision Pipeline"
type: design-pattern
sources:
  - raw/references/Lewis_2020_retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.pdf
  - raw/references/Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms.pdf
related:
  - "[[retrieval-augmented-generation]]"
  - "[[knowledge-graphs]]"
  - "[[tool-calling]]"
  - "[[hallucination]]"
  - "[[governance-gates]]"
tags:
  - decision-pipeline
  - design-pattern
  - defence-in-depth
  - hybrid-architecture
  - decision-types
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# The Hybrid Decision Pipeline

Not every decision is an LLM decision. A well-designed AI advisory system uses different technologies for different types of decisions, reserving LLMs for the tasks they do best and using deterministic systems where they are more appropriate. This page describes the decision-type spectrum and the layered pipeline that results.

## The Decision-Type Spectrum

The boundary between LLM territory and non-LLM territory is not a line between simple and complex tasks. It is a line between tasks whose decision logic can be **fully specified** and tasks requiring **contextual judgement**.

### Category 1: Deterministic Threshold Decisions
A measured value crosses a threshold; a predetermined action follows. Rule engines, Boolean logic, and qualified digital systems handle these with properties LLMs cannot match: deterministic execution, guaranteed response time, formally verifiable logic. Any decision that reduces to "if condition then action" with fully enumerable conditions belongs to deterministic systems.

### Category 2: Quantitative Pattern Detection
Trend monitoring on numerical time series (vibration analysis, heat rate tracking, chemistry trending). Statistical process control methods (CUSUM, EWMA, Shewhart charts) and trained ML classifiers produce results that are faster, more reproducible, and better calibrated than LLM assessments.

LLMs add value here as the **interpretation layer**: once a statistical method flags an anomalous trend, the LLM contextualises it — querying maintenance records, checking operating experience, evaluating whether the trend matches known patterns.

### Category 3: Structured Procedural Decisions
Procedure step sequencing, regulatory requirement tracking, surveillance scheduling. These are governed by explicit rules with typed relationships. A [[knowledge-graphs]] encoding these rules combined with a rule engine provides deterministic, auditable tracking.

LLMs contribute at the **interpretive boundary**: when the operational situation does not map cleanly to procedures, when multiple requirements interact in unaddressed ways, or when the operator needs explanation.

### Category 4: Knowledge-Based Diagnostic Reasoning
Root cause analysis, anomaly investigation, operating experience synthesis. No pre-specified rule set covers the full space because the combinations are too numerous and context-dependent. This is where LLM capabilities (information synthesis, natural language reasoning, pattern recognition) are most directly applicable.

### Category 5: Ambiguous Multi-Source Synthesis Under Uncertainty
Compound events with conflicting indications. Multiple sources provide contradictory evidence. The correct diagnosis requires weighing evidence quality, considering common-cause explanations, and maintaining multiple hypotheses. Multi-agent architectures with adversarial review, model diversity, [[knowledge-graphs]] constraint checking, and human [[governance-gates]] represent the appropriate approach.

## The Layered Pipeline

The five categories imply an architecture where different technologies handle different layers:

| Layer | Technology | Function | Latency |
|---|---|---|---|
| 1 | Rule engine | Hard constraints: limits, operability, prerequisites | Milliseconds |
| 2 | LLM reasoning | Contextual analysis within Layer 1 constraints | Seconds |
| 3 | KG validation | Verify LLM output against domain model | Hundreds of ms |
| 4 | Human review | Final authority on safety-significant decisions | Variable |

**Layer 1** evaluates hard constraints. This is deterministic, produces results in milliseconds, and its logic is formally verifiable.

**Layer 2** is LLM reasoning within the constrained space. The LLM receives constraint evaluation results as context and reasons about the situation within those bounds.

**Layer 3** is [[knowledge-graphs]] validation. It ensures the LLM's assessment does not assert relationships or recommend actions that contradict the verified domain model.

**Layer 4** is human review — the operator exercises final decision authority.

## Defence-in-Depth Mapping

This pipeline maps naturally to defence-in-depth:

- **[[retrieval-augmented-generation]]** provides the first barrier by constraining generation to retrieved source material
- **[[knowledge-graphs]]** validation adds a second barrier by checking assertions against verified data
- **Human oversight** constitutes the third barrier
- **Runtime monitoring** serves as the surveillance function verifying each layer's integrity

No single layer is sufficient. The reliability argument depends on their combination, and the failure modes of each layer must be analysed both independently and for potential common-cause failure.

## Cross-Domain Example

Consider an AI advisory system supporting anomaly investigation in any process control domain:

1. **Layer 1 (Rule engine)**: confirms the anomalous parameter is outside its normal band but within safety limits — no immediate protective action required
2. **Layer 2 (LLM)**: queries maintenance records, finds a recent calibration, checks operating experience for similar patterns, hypothesises that the anomaly is calibration-related
3. **Layer 3 (KG validation)**: verifies that the calibration record exists in the maintenance database, that the hypothesised mechanism is physically plausible given system configuration, and that the recommended monitoring plan does not conflict with regulatory requirements
4. **Layer 4 (Human review)**: the operator evaluates the AI assessment, confirms it aligns with their own observations, and approves the monitoring plan

Each layer catches errors the previous layer might pass. A hallucinated maintenance record (Layer 2 error) is caught by Layer 3 KG validation. A KG with a stale equipment record (Layer 3 error) might be caught by the operator's knowledge in Layer 4.

## Relevance to Safety-Critical Systems

1. **Use the right tool for each decision type.** LLMs are powerful but not universal. Deterministic tasks should use deterministic systems. LLMs should handle contextual reasoning where their capabilities provide genuine value.

2. **The pipeline latency profile matters.** The LLM is the dominant latency contributor (seconds). For time-critical applications, pre-computation and caching of common patterns can bypass the LLM layer for known situations.

3. **Layer independence strengthens the architecture.** Each layer should have distinct failure modes. If the rule engine and the KG share the same data source (and that source is stale), Layers 1 and 3 share a common cause.
