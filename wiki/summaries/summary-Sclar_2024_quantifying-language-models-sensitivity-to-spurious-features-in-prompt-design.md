---
title: "Summary: Sclar et al. (2024) — Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design"
type: summary
sources:
  - raw/references/Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design.pdf
related:
  - "[[prompt-sensitivity]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[calibration-and-confidence]]"
  - "[[capability-gradient]]"
tags:
  - prompt-sensitivity
  - formatting
  - reproducibility
  - empirical
  - benchmark
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Sclar et al. (2024) — Quantifying LLM Sensitivity to Spurious Features in Prompt Design

**Full citation:** Sclar, M., Choi, Y., Tsvetkov, Y., and Suhr, A. (2024). Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design. *ICLR 2024*.

## Key Contribution

This paper provides the most systematic quantification of how sensitive LLMs are to meaning-preserving prompt formatting changes. Using FORMATSPREAD, a Bayesian optimisation tool that efficiently explores the space of semantically equivalent prompt formats, the authors demonstrate that performance variation from formatting alone can reach 76 accuracy points — larger than the difference between many model generations. The finding challenges the standard practice of evaluating LLMs on a single prompt format.

## Key Findings

**Performance spread**: across 53 tasks from SuperNaturalInstructions with LLaMA-2-7B, the median performance spread across 10 sampled formats is **7.5 accuracy points**. 20% of tasks show spreads of at least 15 points. Several tasks exceed 70 points of spread. The maximum observed spread is **76 points** — effectively the range from random chance to near-perfect performance, determined entirely by formatting choices.

**Scale and tuning do not eliminate sensitivity**: the spread persists across model sizes (7B to 70B), few-shot settings (0 to 5 examples), and instruction tuning. Larger models and more examples reduce the spread somewhat but do not eliminate it.

**Model comparisons reverse with formatting**: when comparing two models using different prompt formats, the "better" model reverses with probability 0.141 (LLaMA-2-13B vs 70B) and 0.140 (LLaMA-2-7B vs Falcon-7B). Both reversals are statistically significant (p < 0.05) in 76% and 47% of 1000 bootstrap samples respectively. This means a single-format benchmark comparison can produce systematically wrong conclusions about which model is better.

**Atomic formatting changes have large effects**: changing a single element — a separator (`:` vs ` - `), casing (lowercase vs uppercase), spacing, or enumeration format — causes accuracy changes of ≥5 points in **24%** of cases (exact prefix matching) or 11% (probability ranking).

**Format space is non-monotonic**: the performance landscape across formatting choices is highly irregular. Formats that yield high performance for Model M do not reliably yield high performance for Model M'. Local search is ineffective; Bayesian optimisation (Thompson sampling) is needed.

**Prompt embeddings are identifiable**: a classifier achieves ~0.98 accuracy identifying which of 10 formats was used from the model's internal embeddings. Formatting choices produce deterministic, identifiable transformations of the model's representations. The separability of these embeddings correlates with the observed performance spread.

**API-gated models also affected**: GPT-3.5 shows a median spread of 0.064 across 53 tasks, with a maximum spread of 0.876. The effect is smaller than for open models but still meaningful.

## Relevance to This Wiki

This paper provides the quantitative foundation for [[prompt-sensitivity]]. For safety professionals, the critical implications are: (1) **formatting choices are a confounding variable** in any LLM evaluation — a system tested with one prompt format may behave differently with another; (2) **prompt sensitivity sets a structural floor on reproducibility** that cannot be eliminated by model improvement; (3) **single-format benchmarks can be misleading** — multi-format evaluation protocols (as argued by Mizrahi et al., 2024) are needed for reliable system characterisation; (4) for safety-critical systems, **locking the prompt configuration** is essential for reproducibility, but this trades flexibility for consistency.
