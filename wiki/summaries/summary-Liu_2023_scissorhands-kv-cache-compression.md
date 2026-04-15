---
title: "Summary — Scissorhands: Exploiting the Persistence of Importance Hypothesis for LLM KV Cache Compression at Test Time"
type: summary
sources:
  - raw/references/Liu_2023_scissorhands-kv-cache-compression.pdf
related:
  - "[[inference-and-generation]]"
  - "[[context-windows]]"
  - "[[llm-architecture]]"
  - "[[deployment-local-vs-cloud]]"
  - "[[summary-Kwon_2023_paged-attention-for-llm-serving]]"
tags:
  - inference
  - kv-cache
  - memory-management
  - attention
  - compression
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Scissorhands: KV Cache Compression via Persistence of Importance

**Liu et al. (2023)** — Rice University, preprint

## Problem

The KV cache — key and value tensors stored during autoregressive generation to avoid recomputing attention — can consume more memory than the model weights themselves. For OPT-175B at batch size 128 and sequence length 2048, the KV cache requires approximately 950 GB compared to 325 GB for model weights. This memory pressure directly limits the maximum batch size (and therefore throughput) of LLM serving systems. At GPT-3 scale on 8 A100 GPUs, batch size cannot exceed 35 without offloading.

## Key Observation: Persistence of Importance

The authors identify a **repetitive attention pattern** in trained LLMs: when examining attention maps at different generation positions, the same small set of tokens consistently receives high attention scores. This leads to the **persistence of importance hypothesis**: tokens that were pivotal (received high attention) at one generation step will continue to be pivotal at future steps.

Empirical verification across OPT models (6B to 66B) shows persistence ratios above 95% in most transformer layers — meaning the set of important tokens in the second half of a sequence is almost entirely a subset of those identified as important in the first half. Crucially, this pattern exists only in *trained* models; randomly initialised models show no such persistence, suggesting it is a learned property of the attention weights rather than an architectural artefact.

## ScissorHands Algorithm

Based on this hypothesis, ScissorHands maintains a fixed memory budget for the KV cache. When the cache exceeds the budget, it evicts tokens with the lowest accumulated attention scores within a history window. A recent window of tokens is always preserved (regardless of scores) because their importance cannot yet be assessed. The algorithm:

1. Generates tokens normally, growing the KV cache
2. When cache size exceeds budget B, compresses by dropping the least-attended tokens
3. Uses attention scores from a configurable history window (w=400) to measure importance
4. Always preserves the most recent r tokens (r=10)
5. Allocates more budget to later transformer layers (which show lower persistence ratios)

## Results

- **Up to 5x KV cache compression** without accuracy degradation on OPT-66B across language modelling and downstream tasks (HellaSwag, MathQA, PIQA, Winogrande)
- Larger models tolerate compression better — OPT-66B maintains quality at 5x compression where OPT-6B shows some degradation
- **Compatible with 4-bit quantisation**: combining ScissorHands (2x compression) with 4-bit quantisation introduces no compounding errors, enabling simultaneous reduction in both the sequence-length and representation dimensions of the KV cache
- Accuracy is generally maintained with only 15–30% of the original KV cache size

## Theoretical Guarantee

The authors provide a formal bound on the deviation between tokens generated with compressed versus full KV cache. The error bound scales with (1 − B/T_max), meaning it approaches zero as the budget approaches the maximum sequence length, and the power-law distribution of attention scores further tightens this bound.

## Relevance to This Wiki

ScissorHands complements [[summary-Kwon_2023_paged-attention-for-llm-serving|Kwon et al.'s (2023)]] PagedAttention: where PagedAttention reduces memory *waste* through better allocation, ScissorHands reduces memory *need* by discarding unimportant tokens. Together, they represent two orthogonal approaches to the KV cache bottleneck described in [[inference-and-generation]]. For safety-critical deployments, the finding that compression quality improves with model scale is significant — larger, more capable models are also more amenable to memory optimisation, reducing the trade-off between model quality and deployment cost. However, the eviction of tokens raises questions about whether safety-relevant context could be lost during long generation sequences, connecting to [[context-windows]] concerns about information loss over extended interactions.
