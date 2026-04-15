---
title: "Summary — Just Ask for Calibration: Strategies for Eliciting Calibrated Confidence Scores"
type: summary
sources:
  - raw/references/Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores.pdf
related:
  - "[[calibration-and-confidence]]"
  - "[[training-and-alignment]]"
  - "[[trust-calibration]]"
  - "[[hallucination]]"
  - "[[summary-Kadavath_2022_language-models-mostly-know-what-they-know]]"
tags:
  - calibration
  - confidence
  - verbalized-confidence
  - rlhf
  - elicitation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Just Ask for Calibration: Strategies for Eliciting Calibrated Confidence Scores

Tian et al. (2023) investigate methods for extracting well-calibrated confidence estimates from RLHF-tuned LLMs (GPT-3.5-turbo, GPT-4, Claude-1, Claude-2, and Llama-2-70B-Chat). Their central finding is that **verbalized confidences — where the model expresses its confidence in natural language — are often better-calibrated than the model's raw conditional probabilities**, reversing assumptions about the superiority of internal probability-based approaches.

## Key Findings

**RLHF damages token-level calibration.** Raw model log probabilities from RLHF-LMs are consistently overconfident. This stems from the RLHF training objective, which encourages the model to allocate probability mass to the most preferred answers rather than maintaining distribution fidelity. The consequence is that relying on token-level probabilities for confidence estimation is unreliable for the instruction-tuned models that are most widely deployed in practice.

**Verbalized confidence outperforms conditional probabilities.** Across TriviaQA, SciQ, and TruthfulQA, asking the model to state a numerical confidence score produced better-calibrated estimates than extracting log probabilities — often reducing expected calibration error (ECE) by a relative 50%. This is a counterintuitive finding: the model's explicit self-assessment is more reliable than its implicit probability signal.

**Multiple strategies for verbalized confidence.** The paper evaluates several elicitation strategies:
- **Verb. 1S top-1**: ask for one answer with a confidence score — simple but reasonably effective
- **Verb. 1S top-k**: ask for k answers with probabilities — generating multiple candidates before assigning probabilities improves calibration
- **Verb. 2S CoT**: two-stage chain-of-thought then confidence — CoT did not consistently improve calibration
- **Ling. 1S human**: ask the model to express confidence using natural language likelihood expressions (e.g., "almost certain", "likely", "not sure") — also effective, potentially more interpretable for human operators
- **Considering the opposite**: prompting the model to generate alternative answers before providing confidence (inspired by debiasing techniques from psychology) — improves calibration significantly

**GPT-4 is better calibrated than GPT-3.5-turbo.** The verbalized calibration gap between models is substantial. GPT-4's ability to verbalise well-calibrated confidences is significantly stronger. Claude models showed mixed results — verbalized calibration was less consistent compared to GPT-4.

**Chain-of-thought does not improve calibration.** Adding CoT reasoning before confidence elicitation did not consistently reduce calibration error. This suggests that calibration and reasoning accuracy are partially independent capabilities — a model can reason correctly but still be miscalibrated about its certainty, and vice versa.

**Open-source models lag.** Llama-2-70B-Chat showed notably weaker verbalized calibration than closed-source models, though it still outperformed its own conditional probabilities.

## Relevance to This Wiki

This paper provides the empirical foundation for the confidence elicitation strategies discussed in [[calibration-and-confidence]]. For safety-critical system design, the finding that verbalized confidence can outperform internal probabilities has practical implications: systems can potentially achieve better calibration without requiring access to model internals (log probabilities), which many API-based deployments do not expose. However, the model-dependent nature of this result — GPT-4 significantly outperforms others — means that calibration quality itself becomes a dimension of [[trust-calibration]] that varies across deployments.

The failure of chain-of-thought to improve calibration is important for system designers who might assume that asking a model to "think carefully about its confidence" would produce better estimates. Calibration appears to be a property that requires specific elicitation strategies (like considering alternatives) rather than general reasoning enhancement.
