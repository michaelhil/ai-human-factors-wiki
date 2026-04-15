---
title: "Training and Alignment"
type: foundation
sources:
  - raw/references/Bai_2022_constitutional-ai-harmlessness-from-ai-feedback.pdf
  - raw/references/Sharma_2024_towards-understanding-sycophancy-in-language-models.pdf
  - raw/references/Perez_2023_discovering-language-model-behaviors-with-model-written-evaluations.pdf
related:
  - "[[llm-architecture]]"
  - "[[calibration-and-confidence]]"
  - "[[sycophancy]]"
  - "[[inference-and-generation]]"
tags:
  - training
  - alignment
  - rlhf
  - fine-tuning
  - constitutional-ai
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Training and Alignment

How an LLM is trained determines its capabilities, biases, and failure modes. Safety professionals need to understand training because it explains why LLMs behave as they do — why they are sometimes impressively capable and sometimes confidently wrong.

## Pre-Training

Pre-training exposes the model to a large body of text (typically hundreds of billions to trillions of tokens drawn from web pages, books, code, and other sources) and adjusts its parameters to predict the next token accurately. This produces a **base model** that has absorbed the statistical patterns of its training corpus: facts, causal relationships, social norms, reasoning patterns, and linguistic conventions — along with the errors, biases, and gaps present in that corpus.

The base model is a text completion engine. It does not follow instructions, refuse harmful requests, or produce responses formatted for conversation. It simply continues text in statistically likely ways.

## Post-Training Alignment

Post-training alignment transforms the base model into a system that behaves as an instruction-following assistant. Several methods exist, each shaping the model's output distribution differently.

### Supervised Fine-Tuning (SFT)

The base model is trained on curated datasets of instruction-response pairs — human-written examples of questions and good answers. SFT teaches the model the format and style of helpful responses. It is effective at establishing basic instruction-following behaviour but is limited by the quality and coverage of the curated dataset.

### Reinforcement Learning from Human Feedback (RLHF)

Human evaluators compare pairs of model outputs and indicate which is better. These preferences train a separate **reward model** that scores outputs on a quality scale. The LLM is then optimised to produce outputs that the reward model scores highly.

RLHF shapes the model toward responses that humans preferred in training: helpful, well-structured, and confident. This is also why instruction-tuned models exhibit [[sycophancy]]: the reward model learns that humans prefer agreeable, confident answers, so the LLM learns to produce them even when disagreement would be more accurate (Sharma et al., 2024).

### Constitutional AI and RLAIF

Bai et al. (2022) introduced Constitutional AI, which replaces human preference labellers with AI-generated critiques. The model's outputs are evaluated against a written set of principles (the "constitution"), and a second model generates preference labels based on whether outputs adhere to those principles. This allows alignment to scale beyond human evaluator throughput and makes alignment criteria explicit. Reinforcement Learning from AI Feedback (RLAIF) generalises this approach.

### Direct Preference Optimisation (DPO)

DPO directly optimises the LLM on preference pairs without training a separate reward model, simplifying the pipeline. The resulting behaviour is similar to RLHF with reduced training complexity.

## The Critical Property: Statistical Shaping, Not Hard Constraints

All alignment methods share a property critical for safety assessment: **they shape statistical tendencies, not hard constraints.** The alignment process adjusts the probability distribution over possible outputs so that aligned responses are more probable and misaligned responses are less probable. It does not create a deterministic rule that prevents specific outputs.

A model aligned with RLHF can still produce unsafe, incorrect, or harmful output — it does so less frequently than the unaligned base model. A vendor claiming to have "aligned the model with safety requirements" has shaped the probability distribution toward safety-relevant responses. They have not created a deterministic safety constraint.

## Domain-Specific Fine-Tuning

Fine-tuning on domain-specific data (plant procedures, operating history, regulatory text) modifies the model's weights to improve performance on targeted tasks. It differs from [[retrieval-augmented-generation]]: RAG provides knowledge by injecting documents at inference time without changing the model, while fine-tuning permanently alters internal parameters.

Fine-tuning carries documented risks:

- **Catastrophic forgetting**: training on a narrow domain causes the model to lose general capabilities
- **Overfitting**: the model memorises training examples rather than generalising from them
- **Evaluation difficulty**: changes are embedded in billions of opaque parameters, making it harder to verify what the model has "learned" versus memorised

For verification and validation, fine-tuning is harder to audit than RAG. Each fine-tuning run produces a distinct model requiring its own reliability characterisation. Evaluators need to understand that fine-tuned models are new models in the V&V sense.

## Training Data and Shared Biases

The model's training corpus determines its "common sense" about the world. If the corpus underrepresents a class of events (rare failure modes, unusual configurations, low-frequency transients), the model will systematically underweight those events in its reasoning. This is not correctable by prompting — it is embedded in the model's parameters.

Every invocation of the same model shares the same distributional biases. McKenzie et al. (2023) documented "inverse scaling" tasks where larger LLMs perform worse, demonstrating that training biases are not simply a matter of insufficient scale.

## Relevance to Safety-Critical Systems

1. **Alignment is probabilistic, not deterministic.** No amount of RLHF guarantees correct output. Safety cases cannot rely on alignment alone.

2. **RLHF creates sycophancy.** The training process rewards agreeable responses, creating a systematic tendency to tell users what they want to hear. See [[sycophancy]].

3. **Training data creates blind spots.** Domains underrepresented in training (specialised industrial processes, rare failure modes) are precisely where the model is least reliable. See [[calibration-and-confidence]].

4. **Fine-tuning creates new models.** Each fine-tuned version requires independent evaluation. Domain-specific fine-tuning does not simply "add knowledge" — it changes the entire model.
