---
title: "Summary: McKenzie et al. (2023) — Inverse Scaling: When Bigger Isn't Better"
type: summary
sources:
  - raw/references/McKenzie_2023_inverse-scaling-when-bigger-isnt-better.pdf
related:
  - "[[training-and-alignment]]"
  - "[[calibration-and-confidence]]"
  - "[[hallucination]]"
  - "[[sycophancy]]"
tags:
  - inverse-scaling
  - training
  - scaling-laws
  - failure-mode
  - empirical
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: McKenzie et al. (2023) — Inverse Scaling: When Bigger Isn't Better

**Full citation:** McKenzie, I.R., Lyzhov, A., Pieler, M., Parrish, A., Mueller, A., Prabhu, A., McLean, E., Kirtland, A., Ross, A., Liu, A., Gritsevskiy, A., Wurgaft, D., Kauffman, D., Recchia, G., Liu, J., Cavanagh, J., Weiss, M., Huang, S., Droid, T.F., Tseng, T., Korbak, T., Shen, X., Zhang, Y., Zhou, Z., Kim, N., Bowman, S.R., and Perez, E. (2023). Inverse Scaling: When Bigger Isn't Better. *Transactions on Machine Learning Research*.

## Key Contribution

This paper presents empirical evidence from the Inverse Scaling Prize (a public contest with $100K in prizes) that larger language models can perform **worse** on specific tasks, challenging the assumption that scaling universally improves performance. Across 11 winning tasks evaluated on model series spanning 5 orders of magnitude in training compute (10^18 to 10^23 FLOPs), the authors identify four systematic causes of inverse scaling.

## Four Causes of Inverse Scaling

**1. Strong Prior (4 tasks):** Larger models rely more heavily on memorised training data and less on in-context instructions. When the prompt contradicts the model's training priors, bigger models are worse because they are more "committed" to their learned patterns.
- *Resisting Correction*: asked to repeat sentences with intentional misspellings, larger models "fix" the errors instead
- *Memo Trap*: asked to write a phrase starting like a famous quote but ending differently, larger models complete the memorised quote
- *Redefine*: common symbols are redefined (e.g., π = 462), but larger models use the original meaning
- *Prompt Injection*: prompt instructs model to ignore future instructions; larger models comply more

**2. Unwanted Imitation (1 task):** Larger models better imitate flawed reasoning patterns present in training data.
- *Modus Tollens*: given "if P then Q" and "not Q," the model must infer "not P" — larger models more frequently make the incorrect inference (affirming the consequent), imitating flawed human reasoning in training data

**3. Distractor Task (4 tasks):** When a task contains an easy sub-task that masks the harder real task, larger models latch onto the easy pattern more strongly.
- *Pattern Match Suppression*, *NeQA*, *Sig Figs*, *Into the Unknown*

**4. Spurious Few-Shot (2 tasks):** When few-shot examples have misleading surface patterns, larger models pick up these spurious correlations more aggressively.
- *Hindsight Neglect*, *Repetitive Algebra*

## U-Shaped and Inverted-U Scaling

Some tasks show **U-shaped scaling** (performance decreases then recovers at very large scale) and **inverted-U scaling** (performance improves then gets worse). This means **scaling trends observed with smaller models may not predict the behaviour of larger models** — a finding that undermines the common practice of evaluating on small models to predict large-model behaviour.

## Relevance to This Wiki

For safety professionals, this paper delivers a critical message: **model scale is not a universal solution to reliability problems.** The four causes map directly onto safety concerns: Strong Prior means larger models may ignore safety-relevant instructions when they conflict with training patterns. Unwanted Imitation means larger models may amplify flawed reasoning patterns. Distractor Task means larger models may miss the safety-relevant signal in favour of easier patterns. Spurious Few-Shot means larger models may be more vulnerable to misleading examples. The finding connects to [[training-and-alignment]] (scaling amplifies training biases rather than resolving them), [[sycophancy]] (larger models may be more susceptible to certain agreement patterns), and [[calibration-and-confidence]] (the relationship between model size and reliability is non-monotonic).
