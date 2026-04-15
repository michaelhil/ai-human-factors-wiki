---
title: "Non-Determinism and Reproducibility"
type: safety
sources:
  - raw/references/Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design.pdf
  - raw/references/Mizrahi_2024_state-of-what-art-call-for-multi-prompt-llm-evaluation.pdf
related:
  - "[[llm-architecture]]"
  - "[[calibration-and-confidence]]"
  - "[[prompt-sensitivity]]"
  - "[[verification-and-validation-challenges]]"
  - "[[deployment-local-vs-cloud]]"
tags:
  - non-determinism
  - reproducibility
  - safety
  - verification
  - stochastic
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Non-Determinism and Reproducibility

LLM output is stochastic. The model produces a probability distribution over possible next tokens, and the actual token selected depends on the sampling strategy. This property is fundamental to the architecture and has direct implications for verification, testing, and regulatory compliance in safety-critical domains.

## The Sampling Process

The **temperature** parameter controls the randomness of token selection. At higher temperatures (typically 0.3–1.0 in production), selection is randomised across multiple high-probability candidates, producing varied output. At temperature zero with greedy decoding, the process is deterministic in principle — but in practice, floating-point non-associativity in parallel GPU computations introduces small variations even with identical input on the same hardware.

At the temperatures used in operational deployment, **the same input will produce different outputs on repeated runs.** This is by design: stochasticity allows varied, contextually appropriate responses rather than always generating the single most probable sequence. But it means two runs of the same system with identical input are not guaranteed to produce the same analysis, recommendation, or assessment. The variation is not noise around a correct answer — the outputs may differ in substance, emphasis, and even conclusions.

## Implications for Testing

Traditional software V&V assumes deterministic behaviour: the same input produces the same output, enabling requirements tracing, test case verification, and regression testing. LLMs violate this assumption.

A statistical approach to validation would characterise performance as a distribution rather than a point value, requiring:

- Defining acceptable performance distributions (not just pass/fail thresholds)
- Establishing the number of evaluation runs needed for statistical confidence
- Developing metrics that capture output quality as a continuous variable

No such protocol has been developed or accepted for safety-critical applications as of 2026.

## Prompt Sensitivity Compounds the Problem

Small changes in how a question is asked produce large changes in the answer. [[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design|Sclar et al. (2024)]] demonstrated that minor formatting changes (spacing, capitalisation, delimiter choice) can cause accuracy to vary by up to 76 percentage points on the same task. Mizrahi et al. (2024) argue that single-prompt evaluation is insufficient and propose multi-prompt evaluation protocols.

This means the "same" AI advisory system with slightly different prompts is not the same system. Testing with one prompt configuration may not predict behaviour with another, even when the semantic content is identical.

## Operational Consequences

For operators working with AI advisory systems:

- Two queries about the same situation, phrased slightly differently, may produce substantially different assessments
- Shift handover is complicated if the incoming crew receives a different AI assessment from the one the outgoing crew received on the same conditions
- Trust calibration becomes difficult when the system's behaviour varies between interactions

## Model Version Instability

A related challenge: frontier API providers use model aliases (e.g., "gpt-4o", "claude-sonnet-4") that may point to different model checkpoints over time. Providers update these aliases to improve performance or apply policy changes. The developer may not receive notice of the change, and the same API call may produce different behaviour before and after.

For safety-critical applications where the AI system's behaviour is part of the operational safety case, silent model changes are incompatible with configuration management requirements. Local deployment with pinned model versions resolves this — the model weights are a file on disk that does not change unless the operator explicitly replaces it. See [[deployment-local-vs-cloud]].

## The Gap in V&V Methodology

Three elements are currently missing for nuclear-grade reliability characterisation (and analogous gaps exist in other safety-critical domains):

1. **Domain-specific benchmarks**: no standardised tests exist for evaluating LLM performance on domain-specific tasks such as plant state diagnosis, procedure interpretation, or alarm prioritisation
2. **Reliability characterisation methodology**: no accepted method exists for quantifying the reliability of a non-deterministic system to safety-critical standards
3. **Acceptance criteria**: no regulatory body has defined what reliability level is sufficient for LLM-based advisory systems at different tiers of safety significance

Without these elements, LLM-based systems cannot enter probabilistic safety assessment frameworks.

## Relevance to Safety-Critical Systems

1. **Testing requires statistical characterisation.** Individual test cases are insufficient. Reliability must be characterised over many runs with varied phrasings.

2. **Reproducibility is approximate, not exact.** Incident investigation cannot rely on replaying exact outputs. Logging the complete input (context, system prompt, parameters) is essential for post-event analysis.

3. **Cross-domain impact.** In aviation, non-deterministic advisory outputs complicate crew resource management procedures. In medical settings, two clinicians querying the same diagnostic system may receive different recommendations. In oil and gas, sequential well integrity assessments may yield varying conclusions despite unchanged conditions.

4. **Design mitigation.** Lock prompt configurations in production (reducing flexibility but improving reproducibility). Use lower temperatures for safety-critical queries. Log all inputs and outputs for auditability. Evaluate system performance across multiple prompt variations, not just the nominal configuration.
