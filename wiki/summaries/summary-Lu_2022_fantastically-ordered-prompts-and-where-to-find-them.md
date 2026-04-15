---
title: "Summary — Fantastically Ordered Prompts and Where to Find Them"
type: summary
sources:
  - raw/references/Lu_2022_fantastically-ordered-prompts-and-where-to-find-them.pdf
related:
  - "[[prompt-sensitivity]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[calibration-and-confidence]]"
  - "[[inference-and-generation]]"
  - "[[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design]]"
tags:
  - prompt-sensitivity
  - few-shot-ordering
  - exemplar-order
  - in-context-learning
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Fantastically Ordered Prompts and Where to Find Them

Lu et al. (2022) demonstrate that the **order in which few-shot examples are presented** to a language model can make the difference between near state-of-the-art performance and near-random guessing — even when the examples themselves are identical. This finding establishes exemplar ordering as a critical but often invisible source of prompt sensitivity.

## Key Findings

**Ordering variance is extreme.** On sentiment classification (SST-2), different permutations of the same four training examples produced accuracy ranging from over 85% (comparable to supervised training on 60,000+ samples) to around 50% (random guessing). This variance persists across all model sizes tested, from GPT-2 (0.1B) to GPT-3 (175B).

**Scaling does not solve the problem.** While larger models generally perform better, they do not eliminate ordering sensitivity. Even GPT-3 175B exhibited substantial performance variation across orderings. Adding more training examples also fails to resolve the issue — high variance remains even with 32-shot prompting.

**Good orderings are not transferable.** A permutation that achieves 88.7% accuracy on one model (GPT-2-XL, 1.5B) may drop to 51.6% on another (GPT-2-Large, 0.8B). Cross-model correlation of ordering performance is essentially random, meaning that prompt engineering validated on one model provides no guarantee of performance on another. This directly undermines the practice of developing prompts on one model and deploying on another.

**Label ordering is also model-specific.** Beyond the order of examples, the order in which labels appear (e.g., positive/negative vs negative/positive) also affects performance, and the optimal label ordering varies randomly across model sizes.

**Root cause: distribution skew.** Analysis revealed that failing orderings produce highly skewed predicted label distributions — the model essentially ignores the task and defaults to predicting one label. This suggests ordering sensitivity is related to how the model calibrates its output distribution based on the last few tokens it has seen (a form of recency bias).

## Entropy-Based Probing Method

The authors propose an automatic method for selecting performant orderings without requiring labelled data:

1. Generate all permutations of the training examples as candidate prompts
2. Use each candidate to generate a **probing set** — synthetic examples from the model's own output distribution
3. Score each ordering by its **GlobalEntropy** — the entropy of the predicted label distribution over the probing set (higher entropy = more balanced predictions = less likely to be degenerate)
4. Select the top-K orderings by entropy score

This method achieves an average 13% relative improvement across 11 text classification datasets and 4 orders of magnitude of model sizes, with consistent improvement and no degradation compared to random ordering.

## Relevance to This Wiki

This paper provides foundational evidence for the [[prompt-sensitivity]] page's treatment of how minor, semantically irrelevant input changes can cause major output variation. The finding complements [[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design|Sclar et al. (2024)]], which demonstrated sensitivity to formatting and wording choices. Together, these papers establish that LLMs are sensitive to the full surface form of their input — content, formatting, wording, AND ordering — in ways that undermine assumptions about consistent behaviour.

For safety-critical system design, the non-transferability of good orderings across models is the most concerning finding: it means that prompt validation must be repeated for every model change, every model update, and potentially every deployment configuration. Prompts cannot be treated as stable, portable artefacts. See also [[non-determinism-and-reproducibility]].
