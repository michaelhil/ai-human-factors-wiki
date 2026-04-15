---
title: "Summary — Self-Refine: Iterative Refinement with Self-Feedback"
type: summary
sources:
  - raw/references/Madaan_2023_self-refine-iterative-refinement-with-self-feedback.pdf
related:
  - "[[self-correction-limitations]]"
  - "[[inference-and-generation]]"
  - "[[calibration-and-confidence]]"
  - "[[summary-Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning]]"
  - "[[summary-Huang_2023_large-language-models-cannot-self-correct-reasoning-yet]]"
tags:
  - self-refine
  - iterative-refinement
  - self-feedback
  - prompting
  - generation-quality
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Self-Refine: Iterative Refinement with Self-Feedback

Madaan et al. (2023) introduce **Self-Refine**, an iterative approach where a single LLM generates an initial output, provides feedback on that output, and then refines it based on its own feedback — repeating until a stopping condition is met. Unlike [[summary-Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning|Reflexion]], Self-Refine operates within a single generation pass with no cross-trial memory. The approach requires no training data, finetuning, or reinforcement learning — it operates purely through three task-specific prompts: generation, feedback, and refinement.

## Architecture

Self-Refine uses three prompts with a single model M:

1. **Generate** — produce initial output y₀ from input x
2. **Feedback** — given the input and current output, generate specific, actionable feedback identifying problems and suggesting improvements
3. **Refine** — given the input, all previous outputs, and all feedback, produce an improved version

The process iterates between feedback and refinement steps until either the feedback indicates no further improvement is needed or a maximum iteration count (typically 4) is reached. All previous iterations are retained in context to help the model avoid repeating mistakes.

## Key Findings

**Consistent improvement across tasks.** Self-Refine improved performance on all 7 evaluated tasks across GPT-3.5, ChatGPT, and GPT-4. Improvements ranged from 5% to 40% absolute, with the largest gains on preference-based tasks (dialogue response generation: +49.2% with GPT-4) and the smallest on math reasoning (+0.2% with GPT-4, 92.9% → 93.1%).

**Feedback quality is critical.** Ablation studies showed that specific, actionable feedback significantly outperformed generic feedback. In code optimisation, Self-Refine feedback scored 27.5 vs 26.0 for generic feedback vs 24.8 for no feedback. In sentiment reversal, switching from Self-Refine feedback to generic feedback caused a 10-point performance drop (43.2 → 31.2), and removing feedback entirely caused the task to fail completely (score of 0).

**Diminishing returns.** Most improvement occurred in the first 1-2 iterations. By iteration 3, marginal gains were small. Performance did not always increase monotonically — on multi-aspect tasks, improvement in one dimension could cause regression in another.

**Better than generating multiple samples.** Self-Refine with one refinement outperformed generating 4 independent samples and selecting the best, demonstrating that iterative feedback-driven improvement is more effective than simple resampling.

**Weaker models fail at self-refinement.** Vicuna-13B could not reliably generate structured feedback or follow refinement prompts, instead producing conversational assistant-style responses. This suggests Self-Refine requires instruction-following capability above a threshold, with implications for [[capability-gradient]] assessment.

**Error analysis.** In qualitative analysis of 70 code optimisation and math reasoning samples, feedback was predominantly actionable, with the majority correctly identifying problems. When Self-Refine failed, 33% of cases were due to feedback inaccurately pinpointing the error location, 61% were due to feedback suggesting an inappropriate fix, and only 6% were due to the refiner incorrectly implementing good feedback. Notably, the refiner was resilient enough to correct errors even when feedback was partially incorrect (33% of successful cases).

## Relevance to This Wiki

Self-Refine occupies an important middle ground in the [[self-correction-limitations]] landscape. Unlike the pure intrinsic self-correction that [[summary-Huang_2023_large-language-models-cannot-self-correct-reasoning-yet|Huang et al. (2023)]] showed to be ineffective, Self-Refine uses structured feedback prompts that elicit more informative critique than simple "reconsider your answer" instructions. However, the near-zero improvement on math reasoning aligns with Huang's finding — the technique works best on generation quality tasks (style, engagement, code efficiency) where the feedback prompt can identify concrete surface-level issues, and worst on reasoning tasks where the model's feedback shares the same reasoning biases that produced the original error.

For safety-critical systems, the key distinction is between **quality improvement** (where Self-Refine works — making text clearer, code more efficient, responses more engaging) and **correctness improvement** (where it largely does not — fixing logical errors, catching factual mistakes, improving reasoning). Advisory systems should not rely on Self-Refine-style loops for correctness assurance, but may benefit from them for output quality and format compliance.
