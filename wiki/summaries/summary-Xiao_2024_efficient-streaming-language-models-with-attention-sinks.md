---
title: "Summary: Xiao et al. (2024) — Efficient Streaming Language Models with Attention Sinks"
type: summary
sources:
  - raw/references/Xiao_2024_efficient-streaming-language-models-with-attention-sinks.pdf
related:
  - "[[context-windows]]"
  - "[[context-management-risks]]"
  - "[[llm-architecture]]"
  - "[[inference-and-generation]]"
tags:
  - attention-sinks
  - streaming
  - context-window
  - kv-cache
  - inference
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Xiao et al. (2024) — Efficient Streaming Language Models with Attention Sinks

**Full citation:** Xiao, G., Tian, Y., Chen, B., Han, S., and Lewis, M. (2024). Efficient Streaming Language Models with Attention Sinks. *ICLR 2024*.

## Key Contribution

This MIT/Meta AI paper discovers the **attention sink** phenomenon — LLMs assign disproportionately high attention scores to the first few tokens in a sequence regardless of their semantic content — and introduces **StreamingLLM**, a framework that exploits this discovery to enable stable inference on sequences of unlimited length without retraining.

## The Attention Sink Phenomenon

**Discovery:** Visualising attention maps across all layers and heads of Llama-2-7B reveals that beyond the first two layers, the model heavily attends to the initial token across all layers and heads, irrespective of what that token is (Figure 2).

**Why it happens:** The softmax function in attention prevents attention scores from being truly zero. When the current token's embedding has sufficient self-contained information for prediction, the model needs to allocate its excess attention budget somewhere. It dumps this onto the initial tokens, which — by the autoregressive nature of training — are visible to all subsequent tokens. The initial tokens serve as computational sinks, not as semantically important anchors.

**Evidence it's positional, not semantic:** Replacing the first 4 tokens with `\n` linebreak tokens (semantically meaningless) achieves comparable perplexity restoration to keeping the original tokens. The absolute position of the starting tokens, not their content, is what matters.

## Quantitative Impact

| Configuration (Llama-2-13B) | Perplexity (PPL) |
|---|---|
| Dense Attention (full context) | 5.40 |
| Window Attention (1024 recent, no initial) | **5158.07** |
| StreamingLLM (4 initial + 1020 recent) | **5.60** |

Removing the initial tokens causes a **955× increase in perplexity** — the model's output becomes incoherent. Reintroducing just 4 initial tokens alongside a sliding window of recent tokens restores near-optimal performance (5.60 vs 5.40).

## StreamingLLM

The framework maintains two KV cache regions: (1) **attention sink tokens** (first 4 initial tokens) that stabilise the attention computation, and (2) a **rolling KV cache** of the most recent tokens. This enables:
- Stable language modelling on texts of **4 million+ tokens**
- Up to **22.2× speedup** over the sliding window with recomputation baseline
- Works with Llama-2, MPT, Falcon, and Pythia without any fine-tuning
- Compatible with relative position encodings (RoPE, ALiBi)

## Pre-Training Insight

Adding a dedicated learnable attention sink token at position 0 during pre-training (tested on 160M parameter models from scratch) eliminates the need for multiple initial tokens. A single dedicated sink token suffices, suggesting that future models could be designed with built-in attention sinks for streaming deployment.

## Relevance to This Wiki

This paper provides the mechanistic explanation for a critical property in [[context-windows]]: why removing initial tokens from the context causes catastrophic failure, and why any context management scheme (truncation, compression) must preserve these tokens. For safety-critical applications running long monitoring sessions, StreamingLLM's approach — keeping a fixed set of initial anchor tokens plus a rolling recent window — is a practical strategy for maintaining stable inference over shift-length sessions without the [[hallucination]] risk of summarisation-based compression (see [[context-management-risks]]).
