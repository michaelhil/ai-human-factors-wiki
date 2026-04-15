---
title: "Summary — The Curse of Recursion: Training on Generated Data Makes Models Forget"
type: summary
sources:
  - raw/references/Shumailov_2024_ai-models-collapse-when-trained-on-recursively-generated-data.pdf
related:
  - "[[monoculture-collapse]]"
  - "[[training-and-alignment]]"
  - "[[degradation-characteristics]]"
  - "[[hallucination]]"
tags:
  - model-collapse
  - training-data
  - recursive-generation
  - distribution-shift
  - degradation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# The Curse of Recursion: Training on Generated Data Makes Models Forget

Shumailov et al. (2024), published in Nature, demonstrate **model collapse** — a degenerative process where generative models trained on data produced by previous generations of models progressively lose information about the true data distribution. The distribution tails shrink, rare events disappear, and the model eventually converges to a narrow, low-variance approximation that bears little resemblance to reality.

## The Mechanism

Model collapse occurs through two compounding error sources:

**Statistical approximation error.** Finite sampling from a model inevitably loses low-probability events. When the model generates training data for the next generation, rare events are underrepresented or missing entirely. Over generations, the tails of the distribution are progressively truncated — probable events are overestimated while improbable events are underestimated and eventually forgotten.

**Functional approximation error.** The model architecture cannot perfectly represent the true distribution. This introduces systematic bias at the first generation, and the bias compounds through recursive training. Even with perfect sampling, functional approximation error alone can cause collapse.

The paper provides mathematical proof that for discrete distributions, recursive training forms a Markov chain that is **guaranteed to converge to a delta function** — a point estimate with zero variance. Model collapse is not a risk to be mitigated; under recursive training conditions, it is a mathematical inevitability.

## Two Phases of Collapse

**Early model collapse.** The model begins losing information about the tails of the distribution. Rare events become rarer, then disappear. The model's knowledge of the world narrows to common, high-frequency patterns. Quality degradation may be subtle at first — the model still performs well on common cases.

**Late model collapse.** The distribution converges to a point estimate with very small variance. The model produces near-identical outputs regardless of input, having lost the diversity and nuance of the original data. Demonstrated empirically with OPT-125m fine-tuned over 9 generations: coherent text degraded to repetitive, nonsensical output.

## The Internet Pollution Problem

The paper's most consequential finding is about the trajectory of web-scraped training data. As LLMs generate increasingly large volumes of internet content, future models trained on web-crawled data will inevitably train on AI-generated text, creating the recursive loop that drives model collapse. The authors argue that the value of verifiably human-generated content will increase dramatically as this effect takes hold.

## Relevance to This Wiki

Model collapse connects directly to [[monoculture-collapse]]: if multiple models are trained or fine-tuned on overlapping AI-generated data, they will converge toward similar distributional blind spots — amplifying common-cause failure risks. The tail-trimming effect is particularly concerning for safety-critical applications, where the events that matter most (rare failures, novel conditions, edge cases) are precisely the low-probability events that model collapse eliminates first.

For [[training-and-alignment]], model collapse implies that data provenance — tracking whether training data is human-generated or AI-generated — becomes a critical quality assurance concern. For [[degradation-characteristics]], model collapse describes a form of **silent progressive degradation**: the model's coverage narrows over training generations without producing obvious error signals, making the degradation difficult to detect through standard benchmarking on common cases.
