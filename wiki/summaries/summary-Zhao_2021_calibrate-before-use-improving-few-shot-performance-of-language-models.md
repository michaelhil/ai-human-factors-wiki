---
title: "Summary: Calibrate Before Use — Improving Few-Shot Performance of Language Models"
type: summary
sources:
  - raw/references/Zhao_2021_calibrate-before-use-improving-few-shot-performance-of-language-models.pdf
related:
  - "[[calibration-and-confidence]]"
  - "[[prompt-sensitivity]]"
  - "[[inference-and-generation]]"
  - "[[summary-Guo_2017_on-calibration-of-modern-neural-networks]]"
  - "[[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design]]"
  - "[[summary-Lu_2022_fantastically-ordered-prompts-and-where-to-find-them]]"
tags:
  - calibration
  - few-shot
  - prompt-sensitivity
  - bias
  - contextual-calibration
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Calibrate Before Use — Improving Few-Shot Performance of Language Models

Zhao et al. (2021) demonstrate that GPT-3's few-shot learning is highly unstable — accuracy can vary from near chance to near state-of-the-art depending on the choice of prompt format, training examples, and even the ordering of those examples — and propose *contextual calibration* as a simple correction that substantially reduces this instability.

## The Instability Problem

Few-shot in-context learning allows LLMs to perform tasks by providing a few examples in the prompt, without parameter updates. Despite the appeal, the paper shows this approach is unreliable:

- **Example permutation**: Simply reversing the order of two training examples in a sentiment classification prompt can swing GPT-3 2.7B accuracy from 88.5% to 51.3% (near random chance).
- **Format sensitivity**: Across 15 different prompt formats for the same task (SST-2), accuracy ranges from 54% to 93%.
- **Training example selection**: Different random selections of training examples produce widely varying accuracy, and this variance does not decrease with more examples or larger models.

## Three Biases

The paper identifies three systematic biases that explain the instability:

**Majority label bias**: The model is biased toward answers that appear more frequently in the prompt. If two positive and one negative example are provided, the model over-predicts positive. This also explains why accuracy often drops from 0-shot to 1-shot — introducing a single training example biases the model toward repeating that example's label.

**Recency bias**: The model preferentially generates answers that appear toward the end of the prompt, because autoregressive models update hidden states left-to-right. Training examples near the end of the prompt are "overpredicted" at rates of 8–16% above the ground truth.

**Common token bias**: The model is biased toward tokens that are frequent in its pre-training data, which may be suboptimal for the downstream task. For fact retrieval, the model preferentially outputs common entities (e.g., "America") even when the correct answer is a rare entity (e.g., "Saint Lucia").

All three biases result in a **shift in the output distribution** — the model's predictions are systematically skewed before it even sees the actual test input.

## Contextual Calibration

The proposed fix is elegant: estimate the model's bias by feeding it a content-free input (e.g., "N/A") and observing what the model predicts when it has no task-relevant information. The content-free prediction reveals the model's prior bias. Then apply an affine transformation to the output probabilities to make this content-free prediction uniform across labels.

The method requires no additional training data, takes seconds to compute, and consistently improves both GPT-3 and GPT-2 across text classification, fact retrieval, and information extraction tasks. Average accuracy improves by up to 30 percentage points absolute; worst-case accuracy improves substantially; and variance across different prompt choices is reduced.

## Implications for Safety-Critical Systems

This paper provides mechanistic evidence for what [[prompt-sensitivity]] documents empirically: LLM outputs are not determined solely by the task-relevant content of the prompt but are systematically influenced by superficial features (label frequency, example ordering, token commonality). For safety-critical applications, the finding that simply reordering identical examples can halve accuracy is alarming — it means that two operators using the same system with slightly different prompt configurations may get dramatically different advice.

Contextual calibration partially addresses this at the token-probability level, but the underlying biases (recency, majority label, common token) are structural properties of autoregressive generation, not bugs to be patched. [[summary-Guo_2017_on-calibration-of-modern-neural-networks|Guo et al. (2017)]] showed that neural networks are systematically overconfident; Zhao et al. show that in the few-shot setting, they are also systematically *biased* in directions that depend on arbitrary prompt features rather than task-relevant information.
