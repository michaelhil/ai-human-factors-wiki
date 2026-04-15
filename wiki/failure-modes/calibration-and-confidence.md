---
title: "Calibration and Confidence"
type: failure-mode
sources:
  - raw/references/Kadavath_2022_language-models-mostly-know-what-they-know.pdf
  - raw/references/Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores.pdf
  - raw/references/Xiong_2024_can-llms-express-their-uncertainty-empirical-evaluation-of-confidence-elicitation.pdf
  - raw/references/Guo_2017_on-calibration-of-modern-neural-networks.pdf
  - raw/references/Zhao_2021_calibrate-before-use-improving-few-shot-performance-of-language-models.pdf
related:
  - "[[hallucination]]"
  - "[[training-and-alignment]]"
  - "[[sycophancy]]"
  - "[[automation-bias]]"
  - "[[summary-Kadavath_2022_language-models-mostly-know-what-they-know]]"
  - "[[summary-Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores]]"
  - "[[summary-Xiong_2024_can-llms-express-their-uncertainty-empirical-evaluation-of-confidence-elicitation]]"
tags:
  - calibration
  - confidence
  - reliability
  - failure-mode
  - trust
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Calibration and Confidence

A well-calibrated system is one whose stated confidence matches its actual accuracy: when it says it is 80% confident, it is correct 80% of the time. Calibration matters for safety-critical advisory because an operator's trust in an AI assessment should reflect the assessment's actual reliability.

## The Calibration Problem

LLMs are partially calibrated. [[summary-Kadavath_2022_language-models-mostly-know-what-they-know|Kadavath et al. (2022)]] showed that when asked whether they can answer a question correctly, larger models show better calibration than smaller ones. But calibration degrades on harder questions — precisely the questions that matter most in safety-critical use. When the situation is ambiguous, novel, or outside the training distribution, the model's self-assessment becomes less reliable.

## RLHF Makes It Worse

Tian et al. (2023) found that instruction-tuned models are **less calibrated** than their base model counterparts, because the tuning process rewards confident, helpful-sounding responses over hedged or uncertain ones. [[summary-Kadavath_2022_language-models-mostly-know-what-they-know|Kadavath et al. (2022)]] confirmed this with a specific mechanism: RLHF training collapses probability distributions toward high-reward tokens, distorting the calibration that base models exhibit. The damage is measurable across multiple evaluation formats (Figure 9 in Kadavath et al.).

However, a simple temperature rescaling (T≈2.5) largely restores the underlying calibration, suggesting that RLHF does not destroy the model's self-knowledge — it distorts the output distribution in a correctable way. For system designers, this means post-hoc temperature tuning can partially recover calibration in RLHF models.

This is a direct consequence of the [[training-and-alignment]] process: RLHF optimises for responses that humans rate highly, and humans tend to rate confident responses higher than uncertain ones.

## The "I Don't Know" Bias

[[summary-Kadavath_2022_language-models-mostly-know-what-they-know|Kadavath et al. (2022)]] found that models are **systematically biased against "none of the above" responses**. When a multiple-choice option is replaced with "none of the above," both accuracy and calibration degrade significantly. Models avoid selecting this option even when it is correct. This extends beyond multiple-choice: LLMs in general are trained to produce confident, complete responses rather than expressing uncertainty or acknowledging the limits of their knowledge. For safety-critical applications where the correct response is often "I don't know" or "insufficient information," this structural bias toward overconfident answers feeds directly into [[automation-bias]].

## Methods for Eliciting Confidence

There are three broad approaches to extracting confidence from LLMs, with important trade-offs:

- **Logit-based probability** (accessing the model's internal probability distribution over tokens) — historically considered the gold standard, but [[summary-Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores|Tian et al. (2023)]] showed that RLHF-tuned models have systematically overconfident log probabilities. Many API-based deployments do not expose log probabilities at all.
- **Verbalised confidence** (the model stating a numerical or linguistic confidence) — counterintuitively, Tian et al. (2023) found this often produces **better-calibrated** estimates than raw log probabilities for RLHF models, reducing expected calibration error by up to 50%. Specific strategies matter: generating multiple candidate answers before assigning probabilities, or prompting the model to consider alternative answers (inspired by "considering the opposite" from debiasing research), both improve calibration. Chain-of-thought reasoning, however, does not consistently improve calibration — reasoning accuracy and calibration appear to be partially independent capabilities.
- **Consistency-based estimation** (run the same query multiple times and measure agreement) — better calibrated but expensive, requiring multiple inference passes. Xiong et al. (2024) found this approach generally outperforms single-pass verbalised confidence but at significant computational cost.

Calibration quality varies substantially across models: GPT-4 produces significantly better-calibrated verbalized confidence than GPT-3.5-turbo or open-source alternatives. This means that calibration itself is a capability dimension that must be evaluated per-model and per-deployment.

## Design Implications

Confidence indicators on AI advisory displays should be treated with caution. If the model's confidence output is not well calibrated, displaying it may give operators a false sense of knowing how reliable the assessment is — which is worse than providing no confidence information at all.

Post-hoc calibration techniques (Guo et al., 2017; Zhao et al., 2021) can partially address this, but they require a calibration dataset representative of the operational domain. For most specialised industrial domains, such calibration datasets do not exist.

## The Miscalibration Chain

Poor calibration creates a chain of effects:

1. The model produces confident output regardless of actual accuracy
2. Operators cannot distinguish reliable from unreliable assessments
3. Trust calibration becomes impossible — operators either trust everything or trust nothing
4. Over-time, this drives either [[automation-bias]] (trusting all AI output) or disengagement (ignoring all AI output)

Both outcomes defeat the purpose of the advisory system.

## Relevance to Safety-Critical Systems

1. **Confidence displays require empirical validation.** Displaying AI confidence to operators is potentially harmful if the confidence is not calibrated against the actual operational domain.

2. **Harder questions are worse calibrated.** The model is most overconfident precisely when the situation is most uncertain — during novel events, ambiguous conditions, and edge cases.

3. **Cross-domain examples.** In aviation, an overconfident weather assessment could lead to inadequate fuel reserves. In medical diagnostics, overconfident differential diagnosis could delay necessary testing. In oil and gas, overconfident wellbore stability assessment could mask developing hazards.

4. **Design mitigation.** Use consistency-based confidence where feasible (multiple inference passes). Display confidence as a range rather than a point value. Train operators to treat AI confidence as an estimate, not a measurement. Combine AI confidence with independent data quality indicators.
