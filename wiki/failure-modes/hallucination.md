---
title: "Hallucination"
type: failure-mode
sources:
  - raw/references/Huang_2023_survey-on-hallucination-in-large-language-models.pdf
  - raw/references/Ji_2023_survey-of-hallucination-in-natural-language-generation.pdf
  - raw/references/Zhang_2023_sirens-song-in-the-ai-ocean-survey-on-hallucination-in-llms.pdf
  - raw/references/Tonmoy_2024_comprehensive-survey-of-hallucination-mitigation-techniques.pdf
  - raw/references/Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection.pdf
  - raw/references/Dokas_2025_from-hallucinations-to-hazards.pdf
related:
  - "[[calibration-and-confidence]]"
  - "[[retrieval-augmented-generation]]"
  - "[[knowledge-graphs]]"
  - "[[automation-bias]]"
  - "[[llm-architecture]]"
tags:
  - hallucination
  - reliability
  - failure-mode
  - fabrication
  - safety
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Hallucination

Hallucination refers to LLM output that is fluent, confident, and factually incorrect. It is the most widely discussed failure mode of LLMs and the one with the most direct safety implications for advisory systems in complex work domains.

## Types of Hallucination

The term covers several distinct failure modes (Huang et al., 2023; Ji et al., 2023; Zhang et al., 2023):

**Factual hallucination**: the model states something that contradicts established facts. It might assert that a system uses a component it does not, or cite a regulatory document that does not exist.

**Logical hallucination**: the model performs invalid reasoning steps. It might conclude that a parameter is within limits when the numbers in its own output show otherwise, or draw conclusions that do not follow from its premises.

**Entity hallucination**: the model confuses similar entities. It might mix up two systems with similar names, or attribute a property of one instrument to a different instrument.

**Fabrication**: the model invents data points, references, events, or details. It might cite a nonexistent publication, invent a numerical value for a parameter it was not given, or describe an event that did not occur.

## Structural Causes

These failures have structural causes rooted in [[llm-architecture]]. LLMs predict the next token based on statistical patterns learned during training. The model has no internal mechanism for checking whether its output is true. It generates tokens that are probable given the context, which often aligns with truth (because truthful text was prevalent in training data) but sometimes does not.

Hallucination is more likely when:

- The query involves topics underrepresented in training data
- Precise numerical reasoning is required (which token prediction handles poorly)
- Long-form generation is involved, where each token's small probability of error compounds across hundreds or thousands of tokens
- The model lacks access to relevant grounding documents

## The Confidence-Without-Correctness Problem

The most dangerous property of hallucination for safety-critical use: LLMs produce fluent, well-structured, assured text regardless of the accuracy of the underlying content. A hallucinated assessment reads exactly like a correct one. There is no surface-level cue — no hesitation marker, no visible uncertainty — that distinguishes a correct analysis from a confident fabrication.

An operator reading an AI-generated assessment cannot tell from the text alone whether it is right. This directly creates risk for [[automation-bias]]: the operator accepts a confident wrong answer because it appears authoritative.

## Empirical Rates

Hallucination rates on grounded summarisation have fallen to 1–2% on short documents but persist at 10–12% on longer, more complex documents (as of 2026). In safety-critical domains specifically, benchmarks for hazard identification found that no model surpassed 70% accuracy. The pattern is consistent: substantial improvement on well-structured tasks, persistent significant failure rates on complex, multi-step, or safety-critical applications.

The trajectory matters: hallucination rates decrease with model scale and improved training, but hallucination as a phenomenon does not disappear. The structural causes (statistical prediction without truth grounding, distributional gaps, the confidence-without-correctness property) persist across model generations.

## Mitigation Approaches

**[[retrieval-augmented-generation]]** reduces hallucination by grounding generation in retrieved documents. The model generates responses with relevant source material in its context, reducing reliance on parametric memory alone.

**[[knowledge-graphs]]** can block assertions that contradict verified domain knowledge. A guardrail check verifies whether the model's output is consistent with the knowledge graph before the output reaches the user.

**Consistency checking** across multiple generations (Manakul et al., 2023) can flag unreliable outputs. If the model gives different answers to the same question across multiple runs, the inconsistent answers are less likely to be reliable.

**Structured output constraints** restrict the space of possible outputs (JSON schemas, typed fields), eliminating some formatting-level fabrication. But a model can produce a perfectly valid JSON object containing entirely fabricated values — the structure is correct while the content is not.

None of these eliminates hallucination. Each reduces its frequency and provides partial detection capability.

## Relevance to Safety-Critical Systems

1. **Hallucination is not a bug to be fixed — it is a property of the architecture.** Any system design that assumes AI output is correct by default is fundamentally flawed.

2. **Detection is harder than prevention.** Because hallucinated output is fluent and confident, operators cannot reliably detect it without independent verification. System design must assume hallucination will occur and provide verification mechanisms.

3. **Compounding in agent loops.** When an agent hallucinates a fact, subsequent reasoning steps that depend on that fact compound the error. In multi-step tool-calling chains, a single hallucinated parameter can cascade through several steps. See [[tool-calling]].

4. **Domain-specific risk.** Hallucination is most likely precisely in the situations where it is most dangerous: rare events, novel conditions, and topics underrepresented in training data. The model is least reliable when the operational situation is most unusual.

5. **Cross-domain examples.** In aviation, a hallucinated weather report could inform incorrect routing decisions. In medical settings, a fabricated drug interaction could reach a clinician's decision support display. In oil and gas, a hallucinated pressure reading in a wellbore analysis could mask a developing kick. The common thread is that the hallucinated output appears indistinguishable from correct output.
