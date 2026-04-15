---
title: "Summary — Survey of Hallucination in Natural Language Generation"
type: summary
sources:
  - raw/references/Ji_2023_survey-of-hallucination-in-natural-language-generation.pdf
related:
  - "[[hallucination]]"
  - "[[calibration-and-confidence]]"
  - "[[retrieval-augmented-generation]]"
  - "[[training-and-alignment]]"
  - "[[summary-Huang_2023_survey-on-hallucination-in-large-language-models]]"
tags:
  - hallucination
  - survey
  - faithfulness
  - factuality
  - mitigation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Survey of Hallucination in Natural Language Generation

Ji et al. (2023) provide a comprehensive survey of hallucination across natural language generation tasks, published in ACM Computing Surveys. The paper covers hallucination in abstractive summarisation, dialogue generation, generative question answering, data-to-text generation, machine translation, vision-language generation, and — in a section updated in 2024 — large language models. It establishes a foundational taxonomy and reviews contributors, metrics, and mitigation methods.

## Hallucination Taxonomy

The paper distinguishes two fundamental types:

**Intrinsic hallucination**: the generated output **contradicts** the source content. For example, a summary that states a vaccine was approved in 2021 when the source says 2019. These are always erroneous and detectable by source comparison.

**Extrinsic hallucination**: the generated output **cannot be verified** from the source — it is neither supported nor contradicted. For example, adding information about clinical trials not mentioned in the source document. Extrinsic hallucinations are not always incorrect — they may draw on valid world knowledge — but they are unverifiable from the given context, making them risky in contexts where faithfulness to source material matters.

This distinction matters for safety-critical systems because different tasks have different hallucination tolerances. Summarisation and data-to-text tasks require strict faithfulness (low tolerance for either type), while dialogue systems tolerate more extrinsic hallucination because user engagement benefits from drawing on broader knowledge.

## Contributors to Hallucination

**Data-related contributors**: source-reference divergence in training data (the target output in training contains information not in the source); heuristic data collection that pairs mismatched sources and targets; noisy or inconsistent training data.

**Training and inference contributors**: the standard likelihood maximisation objective can encourage the model to generate likely text rather than faithful text; exposure bias (the model trains on gold targets but at inference conditions on its own previous output); decoder strategies like beam search can amplify hallucination patterns.

## Metrics and Evaluation

The paper categorises hallucination metrics into:
- **Statistical metrics** (e.g., ROUGE, BLEU) — measure surface overlap but miss semantic hallucination
- **Model-based metrics** (e.g., BERTScore, entailment classifiers, QA-based evaluation) — better at detecting semantic divergence but require task-specific calibration
- **Human evaluation** — remains the gold standard but is expensive and inconsistent across annotators

## Mitigation Methods

- **Data-related methods**: improving training data quality, filtering source-reference divergent pairs, augmenting with faithful examples
- **Architecture and training methods**: faithful attention mechanisms, multi-task learning with entailment objectives, reinforcement learning with faithfulness rewards
- **Inference methods**: constrained decoding, knowledge-grounded generation (see [[retrieval-augmented-generation]]), post-hoc verification and editing

## Relevance to This Wiki

This survey provides the theoretical foundation for the [[hallucination]] page's treatment of hallucination types and causes. The intrinsic/extrinsic taxonomy is particularly valuable for safety-critical system design: intrinsic hallucinations (contradicting provided information) are categorically unacceptable in advisory systems, while extrinsic hallucinations (adding unverifiable information) require more nuanced assessment depending on the application context. The survey complements [[summary-Huang_2023_survey-on-hallucination-in-large-language-models|Huang et al. (2023)]], which focuses specifically on LLM hallucination, by providing the broader NLG context and establishing that hallucination is a fundamental property of neural text generation, not a problem unique to large language models.
