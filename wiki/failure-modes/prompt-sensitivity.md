---
title: "Prompt Sensitivity"
type: failure-mode
sources:
  - raw/references/Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design.pdf
  - raw/references/Lu_2022_fantastically-ordered-prompts-and-where-to-find-them.pdf
  - raw/references/Zhao_2021_calibrate-before-use-improving-few-shot-performance-of-language-models.pdf
  - raw/references/Mizrahi_2024_state-of-what-art-call-for-multi-prompt-llm-evaluation.pdf
related:
  - "[[non-determinism-and-reproducibility]]"
  - "[[calibration-and-confidence]]"
  - "[[llm-architecture]]"
  - "[[sycophancy]]"
  - "[[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design]]"
tags:
  - prompt-sensitivity
  - reliability
  - failure-mode
  - reproducibility
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Prompt Sensitivity

Small changes in how a question is asked produce large changes in the answer. This is a structural reliability concern for any AI advisory system because it means the "same" system with slightly different prompts is functionally not the same system.

## The Evidence

### Format Sensitivity ([[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design|Sclar et al., 2024]])

The most systematic study of prompt formatting sensitivity tested semantically equivalent prompt formats across 53 tasks with multiple models. Key findings:

- **Performance spread up to 76 accuracy points** from formatting changes alone (LLaMA-2-7B). The median spread across tasks is 7.5 points with just 10 sampled formats.
- **Atomic changes have large effects**: changing a single formatting element (separator `:` vs ` - `, casing, spacing) causes ≥5 point accuracy changes in **24% of cases**.
- **Scale does not eliminate sensitivity**: the spread persists across model sizes (7B to 70B), few-shot settings (0 to 5), and instruction tuning. Larger models reduce but do not eliminate the effect.
- **Model comparison rankings reverse**: when comparing two models using different prompt formats, the "better" model reverses with probability 14% — a single-format benchmark can systematically misidentify which model is better.
- **API models also affected**: GPT-3.5 shows a median spread of 6.4 points across 53 tasks, with maximum spread of 87.6 points.

### Example Ordering (Lu et al., 2022)

The ordering of few-shot examples in a prompt can swing accuracy from near-random to near-state-of-the-art. Simply reordering the examples — without changing their content — changes performance dramatically.

### Few-Shot Biases (Zhao et al., 2021)

Three systematic biases in few-shot settings:
- **Majority label bias**: the model favours labels that appear more frequently in the examples
- **Recency bias**: the model favours labels from examples near the end of the prompt
- **Common token bias**: the model favours tokens that are generally more common in its training data

## Why It Happens

Prompt sensitivity is a consequence of [[llm-architecture]]. The self-attention mechanism processes the entire context as an integrated object. Formatting tokens (spaces, delimiters, line breaks) participate in attention computations alongside content tokens. When formatting changes, the attention pattern shifts, and the probability distribution over possible outputs changes accordingly.

This is not a deficiency of specific models — it is a property of the transformer architecture. Improvements in model scale and training reduce sensitivity on average but do not eliminate it.

## Implications for Advisory Systems

**An operator asking the same question in slightly different words may get substantially different answers.** This makes trust calibration difficult — if the system's behaviour varies with phrasing, operators cannot build a stable mental model of when to rely on it and when to question it.

**Testing with one prompt configuration does not predict behaviour with another.** Mizrahi et al. (2024) argue that single-prompt evaluation of LLMs is insufficient and propose multi-prompt evaluation protocols that measure performance across semantically equivalent but syntactically varied prompts.

**System design must choose between flexibility and reproducibility.** Locking the prompt configuration (using fixed templates, structured input formats) reduces sensitivity but limits how operators can interact with the system. Allowing free-form queries preserves flexibility but accepts that outputs will vary with phrasing.

## Relevance to Safety-Critical Systems

1. **Prompt sensitivity sets a floor on reproducibility.** No amount of model improvement fully eliminates this — it is structural. System evaluation must characterise performance across prompt variations, not just on the nominal prompt.

2. **Standardised input formats reduce risk.** Structured query templates that constrain how operators interact with the system reduce the surface area for prompt sensitivity. This trades flexibility for consistency.

3. **Cross-domain examples.** In aviation, different phrasing of a weather query might produce different risk assessments from the same AI advisory. In medical settings, how a clinician phrases a diagnostic question affects the AI's differential diagnosis. In oil and gas, the same wellbore data queried with different wording may produce different stability assessments.

4. **Implications for multi-prompt evaluation.** Any reliability characterisation of an AI advisory system should include testing with varied prompt phrasings to establish the range of output variation, not just point performance on a single formulation.
