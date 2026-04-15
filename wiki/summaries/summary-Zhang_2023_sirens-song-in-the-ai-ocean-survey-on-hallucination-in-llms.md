---
title: "Summary: Siren's Song in the AI Ocean — A Survey on Hallucination in Large Language Models"
type: summary
sources:
  - raw/references/Zhang_2023_sirens-song-in-the-ai-ocean-survey-on-hallucination-in-llms.pdf
related:
  - "[[hallucination]]"
  - "[[calibration-and-confidence]]"
  - "[[retrieval-augmented-generation]]"
  - "[[self-correction-limitations]]"
  - "[[training-and-alignment]]"
  - "[[inference-and-generation]]"
  - "[[summary-Huang_2023_survey-on-hallucination-in-large-language-models]]"
  - "[[summary-Tonmoy_2024_comprehensive-survey-of-hallucination-mitigation-techniques]]"
tags:
  - hallucination
  - survey
  - taxonomy
  - benchmarks
  - mitigation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Siren's Song in the AI Ocean — A Survey on Hallucination in Large Language Models

Zhang et al. (2023) survey hallucination in LLMs with a taxonomy organised around what the output conflicts with, a lifecycle analysis of hallucination sources, a comprehensive benchmark review, and a structured treatment of mitigation strategies across the full LLM pipeline.

## Three-Type Taxonomy

The survey proposes three hallucination types based on what the generated content conflicts with:

**Input-conflicting hallucination** — the output deviates from the user's input. In summarisation, the model may replace entity names (e.g., changing "Hill" to "Lucas"); in long-context scenarios, models fabricate details not present in the source material (e.g., LLaMA 3.1 70B attributing a detail to Steve Jobs that was never in the provided text). This type maps to the "faithfulness hallucination — instruction/context inconsistency" categories in [[summary-Huang_2023_survey-on-hallucination-in-large-language-models|Huang et al. (2024)]].

**Context-conflicting hallucination** — the output contradicts the model's own previously generated content. In multi-turn conversation, the model may introduce a fact (e.g., identifying Silver as NBA Commissioner) then later contradict itself (referring to Stern instead). This self-contradiction arises from limitations in maintaining long-term coherence across extended generations.

**Fact-conflicting hallucination** — the output contradicts established world knowledge. This is the most studied type and the most dangerous for safety-critical applications, as the model generates incorrect factual claims that can mislead users who lack independent verification capability.

## Hallucination Sources Across the Lifecycle

The survey maps hallucination causes to each stage of the LLM lifecycle:

**Pre-training**: Parametric memorisation of noisy web-scraped data embeds misinformation directly into model weights. The massive scale of pre-training corpora makes it impossible to verify all content, and the model cannot distinguish reliable from unreliable sources during training.

**Supervised fine-tuning (SFT)**: A critical finding is that SFT can *introduce* hallucination. When SFT data contains knowledge that exceeds the model's parametric knowledge from pre-training, the model learns to generate confidently beyond its knowledge boundary. The survey identifies this as "behaviour cloning" — the model imitates the style and confidence of human demonstrations without understanding the underlying knowledge. Some SFT datasets (e.g., Alpaca) contain hallucinated answers due to insufficient human inspection.

**RLHF**: Reward models can encode biases that encourage hallucination. The survey describes "hallucination snowballing" — models prefer self-consistency over correction, continuing to build on an initial hallucinated claim rather than correcting it, because the reward model penalises hedging and rewards confident, coherent responses. This creates a perverse incentive structure where the alignment process amplifies rather than reduces fabrication.

**Inference**: Generation-time risks include sampling from the distribution tail (higher temperature increases hallucination risk) and the compounding effect of autoregressive generation, where each token is conditioned on all previous tokens including potentially hallucinated ones.

## Benchmarks and Evaluation

The survey catalogues 15+ hallucination benchmarks, distinguishing between *generation* formats (the model must produce text) and *discrimination* formats (the model must classify statements as factual or hallucinated). Key benchmarks include TruthfulQA (817 questions designed to elicit imitative falsehoods), FActScore (atomic fact decomposition for long-form generation), HaluEval (35,000 samples with automatic construction), and FACTOR (4,030 text completion items).

Three approaches to uncertainty estimation are identified for hallucination detection: logit-based methods (increasingly inaccessible as models become closed-source), verbalize-based methods (directly prompting for confidence — but models display systematic overconfidence), and consistency-based methods (sampling multiple responses and measuring agreement — the approach validated by [[summary-Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection|SelfCheckGPT]]).

## Mitigation Strategies

The survey covers mitigation across all lifecycle stages: curating pre-training data, honesty-oriented SFT (incorporating refusal responses), honesty-oriented RL (reward functions that penalise wrong answers more heavily than hedged ones), decoding strategies (context-aware decoding, contrastive layer decoding), knowledge retrieval (generation-time supplement and post-hoc correction), and exploiting uncertainty. A notable addition is **multi-agent interaction** — using multiple LLMs to debate and converge on consensus, which connects to [[self-correction-limitations]] (debate provides the external feedback that intrinsic self-correction lacks).

## Relevance

The survey's lifecycle framing is valuable for safety analysis because it identifies different intervention points — some hallucination causes can be addressed at training time, others only at inference time, and some (like parametric memorisation of misinformation) require ongoing mitigation throughout the system's operational life.
