---
title: "Summary — Can LLMs Express Their Uncertainty? An Empirical Evaluation of Confidence Elicitation in LLMs"
type: summary
sources:
  - raw/references/Xiong_2024_can-llms-express-their-uncertainty-empirical-evaluation-of-confidence-elicitation.pdf
related:
  - "[[calibration-and-confidence]]"
  - "[[trust-calibration]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[hallucination]]"
  - "[[summary-Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores]]"
  - "[[summary-Kadavath_2022_language-models-mostly-know-what-they-know]]"
tags:
  - calibration
  - confidence-elicitation
  - uncertainty
  - overconfidence
  - black-box
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Can LLMs Express Their Uncertainty? An Empirical Evaluation of Confidence Elicitation in LLMs

Xiong et al. (2024), published at ICLR 2024, present a systematic **black-box framework** for eliciting confidence from LLMs, consisting of three components: prompting strategies, sampling strategies, and aggregation strategies. This is the most comprehensive empirical evaluation of confidence elicitation to date, testing across five models (GPT-3, GPT-3.5, GPT-4, Vicuna-13B, LLaMA-2-70B), eight datasets spanning five reasoning types, and evaluating both calibration (ECE) and failure prediction (AUROC).

## Framework Components

**Prompting strategies** (how to ask for confidence):
- **Vanilla**: simply ask for answer and confidence
- **CoT**: chain-of-thought reasoning before confidence
- **Self-Probing**: generate answer first, then separately ask how likely it is to be correct
- **Multi-Step**: decompose reasoning into steps, assign confidence to each, multiply
- **Top-K**: generate K guesses with probabilities (forces distributional thinking)

**Sampling strategies** (how to generate multiple responses):
- **Self-Random**: sample multiple responses with the same prompt (varying temperature)
- **Prompting**: paraphrase the question to elicit diverse responses
- **Misleading**: feed contrary hints (e.g., "I think the answer might be...") — when the model is uncertain, it is more likely to waver; when confident, it sticks to its answer

**Aggregation strategies** (how to combine multiple responses into a confidence score):
- **Consistency**: fraction of samples agreeing with the final answer
- **Avg-Conf**: weight consistency by verbalized confidence scores
- **Pair-Rank**: use ranking information from Top-K responses to derive a categorical distribution via maximum likelihood estimation

## Key Findings

**Systematic overconfidence.** Vanilla verbalized confidences cluster in the 80-100% range, appearing in multiples of 5, mimicking human patterns of expressing confidence. Average ECE across all models exceeds 0.377, with confidence typically far exceeding accuracy. This overconfidence is not random — it reflects patterns learned from training data about how humans express certainty.

**No single prompting strategy dominates.** Self-Probing is most effective on GPT-4, while Top-K is strongest on GPT-3.5. CoT improves accuracy but does not consistently improve calibration — confirming the finding from [[summary-Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores|Tian et al. (2023)]] that reasoning and calibration are partially independent.

**Sampling with consistency is the strongest approach for failure prediction.** Using 5 sampled responses with consistency aggregation dramatically improved AUROC, particularly on arithmetic tasks (GSM8K: from 54.8% to 92.7% AUROC). This approach effectively converts [[non-determinism-and-reproducibility]] — normally a liability — into a feature: inconsistency across samples becomes a reliable uncertainty signal.

**White-box vs black-box gap is narrow.** Comparing the best black-box methods against white-box approaches (token probabilities) showed only a modest gap (0.522 to 0.605 AUROC), suggesting that black-box methods, though suboptimal, capture much of the available uncertainty information.

**Professional knowledge tasks remain challenging.** All methods struggled on tasks requiring specialised domain knowledge (professional law, business ethics). This is the most relevant finding for safety-critical applications, where the operational domain is precisely the kind of specialised knowledge where calibration is weakest.

**Practical recommendation.** The authors recommend: Top-K prompt + Self-Random sampling + Avg-Conf or Pair-Rank aggregation — balancing efficiency, simplicity, and effectiveness.

## Relevance to This Wiki

This paper provides actionable design guidance for the [[calibration-and-confidence]] challenge. The finding that consistency-based approaches outperform single-pass verbalized confidence has direct implications for advisory system architecture: systems that generate multiple responses and measure agreement provide more reliable uncertainty signals than systems that ask for a single confidence estimate. However, this comes at 5x the computational cost (M=5 samples), creating a latency-vs-calibration trade-off relevant to time-critical applications.

The persistent failure on specialised knowledge tasks is a critical finding for [[trust-calibration]] in safety-critical domains: the very tasks where calibration matters most — rare events, domain-specific procedures, novel conditions — are the ones where current methods provide the least reliable uncertainty estimates.
