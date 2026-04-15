---
title: "Summary: Kadavath et al. (2022) — Language Models (Mostly) Know What They Know"
type: summary
sources:
  - raw/references/Kadavath_2022_language-models-mostly-know-what-they-know.pdf
related:
  - "[[calibration-and-confidence]]"
  - "[[training-and-alignment]]"
  - "[[hallucination]]"
  - "[[trust-calibration]]"
tags:
  - calibration
  - self-knowledge
  - confidence
  - rlhf
  - empirical
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Kadavath et al. (2022) — Language Models (Mostly) Know What They Know

**Full citation:** Kadavath, S., Conerly, T., Askell, A., Henighan, T., Drain, D., Perez, E., Schiefer, N., Hatfield-Dodds, Z., DasSarma, N., Tran-Johnson, E., Johnston, S., El-Showk, S., Jones, A., Elhage, N., Hume, T., Chen, A., Bai, Y., Bowman, S., Fort, S., Ganguli, D., Hernandez, D., Jacobson, J., Kernion, J., Kravec, S., Lovitt, L., Ndousse, K., Olsson, C., Ringer, S., Amodei, D., Brown, T., Clark, J., Joseph, N., Mann, B., McCandlish, S., Olah, C., and Kaplan, J. (2022). Language Models (Mostly) Know What They Know. arXiv:2207.05221.

## Key Contribution

This Anthropic paper systematically studies whether LLMs can evaluate the correctness of their own outputs and predict which questions they can answer. It establishes that larger models are better calibrated on structured tasks, introduces P(True) and P(IK) as methods for eliciting model self-knowledge, and identifies critical limitations — particularly that RLHF training damages calibration and that out-of-distribution calibration degrades.

## Key Findings

**Calibration improves with scale:** On diverse multiple-choice tasks (BIG Bench, MMLU, TruthfulQA, LogiQA), larger models produce better-calibrated probability distributions. Calibration also improves from zero-shot to few-shot prompting. Critically, the question format matters: models need visible lettered answer choices to achieve good calibration.

**P(True) — self-evaluation works:** When asked to evaluate whether their own generated sample is correct (by assigning a probability P(True)), models can reliably distinguish correct from incorrect answers. The 52B model's P(True) scores show clear separation between correct and incorrect samples. Showing models many of their own T=1 samples before evaluation further improves this discrimination — a finding reminiscent of self-consistency approaches.

**P(IK) — models can predict their own knowledge boundaries:** Models trained to predict P(IK) — the probability that they know the answer, without reference to a specific proposed answer — can partially generalise across tasks. P(IK) appropriately increases when relevant source materials are added to context, and when mathematical hints are provided. However, P(IK) struggles with calibration on out-of-distribution tasks.

**RLHF damages calibration (Figure 9):** RLHF-finetuned models appear very poorly calibrated compared to base models. RL training collapses probability distributions toward high-reward tokens, distorting the calibration that base models exhibit. However, a simple temperature adjustment (T≈2.5) largely restores calibration, suggesting the underlying self-knowledge is preserved but needs rescaling after RLHF.

**"None of the above" breaks models:** Replacing an answer option with "none of the above" significantly degrades both accuracy and calibration. Models are biased against selecting this option. This is relevant for safety-critical applications where the correct response is often "I don't know" — models systematically avoid this response even when it would be appropriate.

## The Calibration Paradox for Safety

The paper reveals a core tension: models are well-calibrated on tasks within their training distribution but calibration degrades on out-of-distribution tasks. For safety-critical applications, this means the model's confidence estimates are least reliable precisely when they matter most — during novel situations, unusual conditions, and edge cases that fall outside the training distribution. The "mostly" in the title is load-bearing: models know what they know on familiar territory, but their self-assessment degrades in unfamiliar territory.

## Relevance to This Wiki

This paper is the primary empirical source for the [[calibration-and-confidence]] wiki page's treatment of LLM self-knowledge. For safety professionals, three findings matter most: (1) RLHF damages calibration, connecting directly to the [[training-and-alignment]] discussion of alignment as statistical shaping; (2) out-of-distribution calibration degrades, meaning confidence displays are least reliable during the unusual conditions that safety-critical systems exist to handle; and (3) models are systematically biased against "I don't know" responses, creating a structural tendency toward overconfident answers that feeds [[automation-bias]] in operators.
