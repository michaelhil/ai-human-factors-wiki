---
title: "Summary: Huang et al. (2024) — Large Language Models Cannot Self-Correct Reasoning Yet"
type: summary
sources:
  - raw/references/Huang_2023_large-language-models-cannot-self-correct-reasoning-yet.pdf
related:
  - "[[self-correction-limitations]]"
  - "[[epistemic-independence]]"
  - "[[calibration-and-confidence]]"
  - "[[training-and-alignment]]"
tags:
  - self-correction
  - reasoning
  - empirical
  - intrinsic-correction
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Huang et al. (2024) — LLMs Cannot Self-Correct Reasoning Yet

**Full citation:** Huang, J., Chen, X., Mishra, S., Zheng, H.S., Yu, A.W., Song, X., and Zhou, D. (2024). Large Language Models Cannot Self-Correct Reasoning Yet. *ICLR 2024*.

## Key Contribution

This Google DeepMind paper provides the definitive empirical demonstration that **intrinsic self-correction** — an LLM attempting to correct its own reasoning without external feedback — does not improve and frequently degrades performance on reasoning tasks. The paper systematically dismantles claims from prior work (Reflexion, Self-Refine, multi-agent debate) by showing that their apparent improvements relied on oracle labels, unfair comparisons, or sub-optimal initial prompts.

## Quantitative Results

Performance after two rounds of intrinsic self-correction (Tables 3-4):

| Model | Benchmark | Standard | Round 1 | Round 2 | Change |
|---|---|---|---|---|---|
| GPT-3.5 | GSM8K | **75.9%** | 75.1% | 74.7% | -1.2% |
| GPT-4 | GSM8K | **95.5%** | 91.5% | 89.0% | -6.5% |
| GPT-4 | CommonSenseQA | **82.0%** | 79.5% | 80.0% | -2.0% |
| Llama-2 | GSM8K | **62.0%** | 43.5% | 36.5% | -25.5% |

In every case, standard prompting without self-correction outperforms or matches self-correction. Llama-2 shows catastrophic degradation of 25.5 percentage points.

**Analysis of answer changes (Figure 1, GPT-3.5 on GSM8K):** 74.7% of answers remain unchanged after self-correction. Of the changed answers, the model is **more likely to flip correct answers to incorrect** (8.8%) than to fix incorrect answers to correct (7.0%). Self-correction is net-destructive.

## Why Prior Work Appeared to Show Improvement

The paper identifies three systematic issues (Table 1):

1. **Oracle labels (RCI, Reflexion):** These methods used ground-truth answer labels to decide when to stop the correction loop — telling the model whether its answer was right or wrong. In practice, if you already know the correct answer, there is no need for self-correction. The improvement came from the oracle, not from the model's self-correction ability.

2. **Unfair comparison (Multi-Agent Debate):** Debate methods use multiple model calls (3-5 agents × multiple rounds), but were compared to single-call baselines. When compared fairly (same total number of model calls using self-consistency — multiple independent samples with majority vote), debate provides no advantage.

3. **Sub-optimal initial prompts (Self-Refine):** The feedback prompt contained more informative instructions about the task than the initial prompt. The improvement came from better prompting, not from self-correction. Incorporating the feedback prompt's instructions into the initial prompt yields the same or better results without self-correction.

## The Fundamental Explanation

If the model is well-aligned and paired with a good initial prompt, the initial response is already optimal for the given prompt and decoding strategy. The self-correction feedback prompt adds an additional instruction that may bias the model away from its already-optimal initial response. In intrinsic self-correction, the model has no new information — it is re-processing the same context with an additional "check your work" instruction that introduces noise rather than signal.

## Relevance to This Wiki

This paper is the primary empirical source for [[self-correction-limitations]]. For safety professionals, the critical implication is: **asking an AI system to "double-check" its own analysis provides no assurance and may actively degrade quality**, unless the check is grounded in external evidence. The finding that multi-agent debate with same-model copies also fails reinforces the [[epistemic-independence]] argument — multiple instances of the same model do not provide independent verification. The dismantling of prior claims (oracle labels, unfair comparison, prompt improvement) is methodologically important: it teaches evaluators to scrutinise what "self-correction" actually means in any AI system proposal.
