---
title: "Summary: Bai et al. (2022) — Constitutional AI: Harmlessness from AI Feedback"
type: summary
sources:
  - raw/references/Bai_2022_constitutional-ai-harmlessness-from-ai-feedback.pdf
related:
  - "[[training-and-alignment]]"
  - "[[sycophancy]]"
  - "[[calibration-and-confidence]]"
  - "[[opacity-and-explainability]]"
tags:
  - constitutional-ai
  - alignment
  - rlaif
  - training
  - safety
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Bai et al. (2022) — Constitutional AI

**Full citation:** Bai, Y., Kadavath, S., Kundu, S., Askell, A., Kernion, J., Jones, A., Chen, A., Goldie, A., Mirhoseini, A., McKinnon, C., et al. (2022). Constitutional AI: Harmlessness from AI Feedback. arXiv:2212.08073.

## Key Contribution

This Anthropic paper introduces Constitutional AI (CAI), a method for training AI systems to be harmless without using human feedback labels for harmfulness. Instead, human oversight is expressed through a written set of principles (the "constitution"), and the AI itself generates the critiques and preference labels used for alignment training. The method produces models that are both more harmless and less evasive than standard RLHF, achieving what the authors describe as a Pareto improvement on the helpfulness-harmlessness frontier.

## Two-Stage Process

**Stage 1 — Supervised Learning (Critique → Revision → SL):** The model generates responses to harmful prompts, then critiques its own responses against randomly sampled constitutional principles, and revises them. The revised responses are used to fine-tune the model. The authors found that the first revision removed most harmful content, with subsequent revisions producing more subtle improvements. Importantly, the revised responses engage with sensitive topics in a thoughtful manner rather than refusing to discuss them — addressing the evasiveness problem that plagued earlier RLHF-trained models.

**Stage 2 — Reinforcement Learning from AI Feedback (RLAIF):** The SL-trained model generates pairs of responses, and a separate model evaluates which response better adheres to the constitutional principles. These AI-generated preference labels train a preference model, which then provides the reward signal for RL training. This replaces the tens of thousands of human preference labels that standard RLHF requires.

## Key Findings

- **Pareto improvement over RLHF:** CAI models are less harmful than standard RLHF at a given level of helpfulness (Figure 2 in the paper). Standard RLHF models that are trained to be helpful tend to become more harmful; those trained to be harmless become evasive. CAI breaks this trade-off.
- **Chain-of-thought improves AI supervision quality:** Using CoT reasoning for the critique and preference evaluation steps significantly improves the quality of AI-generated alignment labels, particularly for larger models.
- **Scaling supervision:** Models larger than 52B parameters with CoT approach the quality of human-feedback-trained preference models, suggesting that AI supervision can scale with model capability.
- **16 constitutional principles suffice:** The entire harmlessness training is steered by approximately 16 natural language principles, chosen ad hoc for this research. The principles are publicly available and inspectable.

## The Explicit Principles Property

For safety-critical applications, the most important property of CAI is that the alignment criteria are **explicit, inspectable natural language documents** rather than opaque reward model weights. In standard RLHF, the alignment criteria are implicit in thousands of human preference labels that no one can collectively summarise. In CAI, the constitution is a short document that can be read, audited, debated, and version-controlled. This transparency property connects directly to the [[opacity-and-explainability]] concerns: CAI makes one layer of the alignment process — the criteria — transparent, even though the model's internal processing remains opaque.

## Relevance to This Wiki

For safety professionals, this paper provides essential detail on how modern AI alignment works and why it produces the behaviours documented in [[sycophancy]] and [[calibration-and-confidence]]. The key takeaway: alignment through CAI (and RLHF more generally) shapes statistical tendencies, not hard constraints. A model aligned with CAI is less likely to produce harmful output, but the constitutional principles cannot prevent it deterministically. The Pareto improvement finding is encouraging — CAI does better than RLHF on the helpfulness-harmlessness trade-off — but the fundamental property described in [[training-and-alignment]] holds: alignment is probabilistic, not guaranteed.
