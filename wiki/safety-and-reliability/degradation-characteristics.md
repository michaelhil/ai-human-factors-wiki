---
title: "Degradation Characteristics"
type: safety
sources:
  - raw/references/NRC_2024_ML24241A252.pdf
related:
  - "[[hallucination]]"
  - "[[context-windows]]"
  - "[[calibration-and-confidence]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[nuclear-ai-regulatory-considerations]]"
tags:
  - degradation
  - silent-failure
  - safety
  - reliability
  - monitoring
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Degradation Characteristics

How an AI system fails matters as much as whether it fails. Different degradation patterns require different detection strategies and carry different risks for operators relying on AI advisory output.

## Three Degradation Patterns

### Gradual Degradation

Output quality decreases as the task moves further from the training distribution: more [[hallucination]], less precise language, less accurate reasoning. This mode is detectable if the operator evaluates AI output critically, because the degradation is usually visible as vagueness, hedging, or inconsistency.

**Example across domains:** An AI advisory system asked about routine operating conditions produces specific, well-grounded responses. As conditions become more unusual — a rare combination of equipment states, an off-normal configuration — the responses become progressively less specific, more hedged, and more likely to contain errors.

### Catastrophic Failure

A single critical error (wrong tool call, fabricated fact, logically invalid conclusion) embedded in otherwise normal-looking output. This mode is hard to detect because the surrounding text is coherent and confident. The error does not announce itself.

**Example across domains:** During an otherwise routine assessment, the AI correctly identifies four out of five relevant factors but fabricates the fifth — citing a nonexistent procedure, inventing a parameter value, or confusing one piece of equipment with another. The single error is camouflaged by correct surrounding analysis.

### Silent Degradation

The system continues producing fluent, confident output that is systematically wrong. The output looks normal; the quality has changed. **This is the most dangerous mode** because there is no indicator, internal or external, that performance has degraded.

Silent degradation is structurally analogous to a class of digital system failures in safety-critical domains where displays continue to present information without signalling that the information's reliability has changed. Operators initially lack clear indication that their information sources are unreliable.

## Triggering Conditions

Several conditions increase the likelihood of degradation:

- **Long sessions**: accumulated context fills the [[context-windows]], forcing compression that may lose critical information
- **Novel conditions**: situations underrepresented in training data push the model toward the edges of its competence
- **Multiple information sources**: conflicting or ambiguous inputs from tools, retrieved documents, and conversation history
- **Context compression**: when older context is summarised, the summarisation may hallucinate or lose temporal ordering
- **Data drift**: operational data diverges from training data over time — the distribution of inputs in production shifts away from what the model was trained on. In safety-critical domains, regulatory bodies identify data drift as a trigger for corrective maintenance ([[summary-NRC_2024_ML24241A252|CNSC/ONR/NRC, 2024]])
- **Model drift**: the model ceases to faithfully represent the underlying phenomena being modelled, even if the input data remains similar. Retraining to correct drift introduces its own risks (overfitting, new biases), creating a tension between maintaining currency and maintaining stability

## Detection Strategies

| Degradation Pattern | Detection Approach |
|---|---|
| Gradual | Specificity metrics (is output becoming more generic?), consistency checking across multiple queries |
| Catastrophic | Knowledge graph guardrails, cross-agent verification, human spot-checking |
| Silent | Periodic independent verification against known-good data, regression testing against benchmark queries |

Silent degradation is the hardest to detect because the system continues to pass surface-level quality checks. Detection requires proactive verification mechanisms that do not rely on the system's own self-assessment (since [[self-correction-limitations]] mean the system cannot reliably detect its own degraded state).

## The Forsmark Analogy

Silent degradation is structurally analogous to failures documented in industrial operating experience. In nuclear domain experience, UPS failures during electrical transients have caused loss of safety system indications, creating periods where operators lacked accurate information about plant state without clear warning that their displays were unreliable. The analogy to LLM behaviour is structural: an LLM that loses context or begins producing degraded outputs after a long session continues to present its outputs with the same surface confidence. In both cases, the system continues to present information without signalling that the information's reliability has changed.

Similar patterns exist in other domains: autopilot mode confusion in aviation (where the system behaves differently from what the pilot expects without clear annunciation), and alarm system failures in process control (where a failed alarm processor continues to display the last-known state rather than indicating loss of function).

## Relevance to Safety-Critical Systems

1. **Silent degradation is the primary concern.** Gradual and catastrophic failures are at least potentially detectable. Silent degradation can persist indefinitely, systematically biasing operator decisions without any visible warning.

2. **Monitoring must be independent of the monitored system.** Using the same model to check its own output (without external grounding) does not detect degradation caused by the model's own biases.

3. **Session length is a risk factor.** Longer sessions increase context pressure and the probability of all three degradation modes. Periodic session resets with fresh context may be safer than continuous long-running sessions.

4. **V&V limitations compound degradation risk.** No current method can quantify the failure probability of an AI component ([[summary-NRC_2024_ML24241A252|CNSC/ONR/NRC, 2024]]). Because previous performance confirmation can quickly become obsolete through data drift or retraining, safety assurance must derive from system architecture (output bounding, monitoring, modularisation) rather than component-level reliability claims.

5. **Cross-domain examples.** In aviation, a navigation advisory that silently degrades from "optimised routing" to "plausible-looking but suboptimal routing" over a long flight. In medical monitoring, a patient assessment system that gradually shifts from condition-specific analysis to generic observations as the clinical picture becomes complex. In oil and gas, a drilling advisory that silently stops discriminating between normal and abnormal conditions during a long well-control operation.
