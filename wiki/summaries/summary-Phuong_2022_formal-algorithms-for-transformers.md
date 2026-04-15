---
title: "Summary: Phuong & Hutter (2022) — Formal Algorithms for Transformers"
type: summary
sources:
  - raw/references/Phuong_2022_formal-algorithms-for-transformers.pdf
related:
  - "[[llm-architecture]]"
  - "[[inference-and-generation]]"
  - "[[context-windows]]"
tags:
  - transformer
  - formal-algorithms
  - architecture
  - pseudocode
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Phuong & Hutter (2022) — Formal Algorithms for Transformers

**Full citation:** Phuong, M. and Hutter, M. (2022). Formal Algorithms for Transformers. Technical report, DeepMind. arXiv:2207.09238.

## Key Contribution

This DeepMind report provides the first self-contained, mathematically precise algorithmic description of transformer architectures — what they are, how they are trained, what they are used for, their key components, and how tokenization works. The complete pseudocode is approximately 50 lines, compared to the thousands of lines of source code that implement real transformers. It serves as a formal reference accessible to a general technical audience (Phuong and Hutter, 2022).

## Key Concepts Formalized

**Three transformer variants.** The paper distinguishes three architectures that are often conflated:
- **Encoder-decoder (EDT)** — the original Transformer (Vaswani et al., 2017), using bidirectional attention in the encoder and masked attention in the decoder. Used for sequence-to-sequence tasks like translation.
- **Encoder-only (BERT)** — uses bidirectional (unmasked) attention over the full input. Trained on masked language modelling. Used for classification and text representation.
- **Decoder-only (GPT/Gopher)** — uses unidirectional (masked) attention where each token can attend only to preceding tokens. Trained on next-token prediction. **This is the architecture of all current frontier LLMs** (GPT-4, Claude, Llama, Gemini).

The distinction matters: the causal mask in decoder-only models is what makes generation autoregressive — each token can only depend on previous tokens, never future ones. This is the formal basis for the property described in [[llm-architecture]] that the model builds output token-by-token.

**Temperature parameter formalized.** The inference algorithm (Algorithm 14, DInference) shows that temperature τ controls sampling: at τ=0 the model selects the highest-probability token (greedy/deterministic), at τ=1 it samples faithfully from the learned distribution, and as τ→∞ it approaches uniform random sampling. This formalizes the [[inference-and-generation]] treatment of temperature as a dial between determinism and randomness.

**Tokenization as algorithm.** Byte Pair Encoding (BPE) is presented as a formal compression algorithm: iteratively merge the most frequent pair of adjacent tokens until the vocabulary reaches the desired size. This grounds the informal description of tokenization in [[llm-architecture]].

**Attention as algorithm.** The attention computation is given in precise pseudocode (Algorithm 3-5): compute query-key dot products, scale, apply softmax, weight the values. Multi-head attention runs H parallel instances with separate learned projections. The masked variant sets future-position scores to -∞ before softmax, effectively zeroing out attention to future tokens.

## Relevance to This Wiki

For safety professionals, the value of this paper is precision. The informal descriptions in [[llm-architecture]] — "every token can influence every other token" — are grounded here in specific algorithms. The causal mask formalizes why generation is sequential (relevant to latency in [[inference-and-generation]]). The temperature parameter formalization clarifies why [[non-determinism-and-reproducibility]] is architectural, not accidental. The three-variant distinction clarifies that "transformer" is not one architecture but a family, and that the decoder-only variant used by current LLMs has specific properties (autoregressive, causal) that the other variants do not share.
