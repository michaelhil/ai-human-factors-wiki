---
title: "Summary — SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection"
type: summary
sources:
  - raw/references/Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection.pdf
related:
  - "[[hallucination]]"
  - "[[calibration-and-confidence]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[summary-Xiong_2024_can-llms-express-their-uncertainty-empirical-evaluation-of-confidence-elicitation]]"
  - "[[summary-Huang_2023_survey-on-hallucination-in-large-language-models]]"
tags:
  - hallucination-detection
  - selfcheckgpt
  - consistency
  - black-box
  - sampling
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection

Manakul et al. (2023) propose **SelfCheckGPT**, a method for detecting hallucinations in LLM output that requires no external database, no access to model internals, and no labelled training data. The core insight is simple: if an LLM has genuine knowledge of a fact, stochastically sampled responses will be **consistent** — they will contain the same information. If the LLM is hallucinating, different samples will **diverge** — each sample invents different details because the model lacks a stable knowledge representation for that fact.

## Method

Given an LLM response R to a user query, SelfCheckGPT draws N additional stochastic samples {S¹, S², ..., Sᴺ} using the same query (temperature = 1.0). It then measures consistency between the original response and the samples at the sentence level, producing a hallucination score S(i) ∈ [0, 1] for each sentence, where 0 = factual and 1 = hallucinated.

Five consistency measurement variants were evaluated:

- **BERTScore**: measures semantic similarity between each sentence in R and the most similar sentence in each sample
- **QA**: generates multiple-choice questions from each sentence, checks whether the sampled responses answer them consistently
- **n-gram**: trains a simple language model on the samples and scores each sentence by token probability (rare tokens across samples suggest hallucination)
- **NLI**: uses a natural language inference classifier to check whether samples entail or contradict each sentence
- **Prompt**: directly asks an LLM whether each sentence in R is supported by each sample

## Key Results

**SelfCheckGPT-Prompt is the best performer.** Using GPT-3 or ChatGPT as the evaluator, the Prompt variant achieved a Pearson correlation of 78.32 with human factuality judgments at the passage level — substantially outperforming both grey-box methods (GPT-3 token probabilities: 53.93) and other black-box baselines.

**Consistency-based detection outperforms probability-based detection.** Even the simpler SelfCheckGPT variants (BERTScore, n-gram) outperformed grey-box approaches that use the generating model's own token probabilities. This supports the finding from [[summary-Xiong_2024_can-llms-express-their-uncertainty-empirical-evaluation-of-confidence-elicitation|Xiong et al. (2024)]] that consistency among multiple responses is a stronger signal than single-pass confidence.

**High hallucination rate in GPT-3 output.** Manual annotation of 1,908 GPT-3-generated sentences about WikiBio individuals found 39.9% were major inaccurate (entirely hallucinated), 33.1% were minor inaccurate (some non-factual content), and only 27.0% were accurate. This quantifies the scale of the hallucination problem in unconstrained generation.

**Diminishing returns with sample count.** Performance improved smoothly with more samples, with diminishing gains after approximately 20 samples. Even with N=4 samples, the Prompt variant achieved strong performance.

**Proxy LLMs perform poorly.** Using a different LLM (LLaMA) as a proxy to approximate the generating model's token probabilities performed near random baseline, because different LLMs have different generation patterns. The consistency must be measured using samples from the same model.

## Relevance to This Wiki

SelfCheckGPT is directly relevant to the [[hallucination]] detection challenge in advisory systems. Its zero-resource nature means it can be deployed without curating a domain-specific fact-checking database — a significant practical advantage for specialised industrial domains where such databases rarely exist. The method leverages the very property that normally makes LLMs unreliable — [[non-determinism-and-reproducibility]] — and converts it into a detection signal: inconsistency across samples indicates uncertainty, which correlates with hallucination.

For safety-critical system design, SelfCheckGPT suggests that multi-sample architectures (running the same query multiple times and checking agreement) can serve dual purposes: providing [[calibration-and-confidence]] estimates AND detecting hallucinated content. The trade-off is computational cost — each additional sample requires a full inference pass. However, for high-stakes advisory where the cost of an undetected hallucination exceeds the cost of additional computation, this trade-off may be favourable.
