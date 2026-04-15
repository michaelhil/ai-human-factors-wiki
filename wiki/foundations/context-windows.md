---
title: "Context Windows"
type: foundation
sources:
  - raw/references/Liu_2024_lost-in-the-middle-how-language-models-use-long-contexts.pdf
  - raw/references/Du_2025_context-length-alone-hurts.pdf
  - raw/references/Xiao_2024_efficient-streaming-language-models-with-attention-sinks.pdf
related:
  - "[[llm-architecture]]"
  - "[[context-management-risks]]"
  - "[[memory-architectures]]"
  - "[[retrieval-augmented-generation]]"
  - "[[summary-Liu_2024_lost-in-the-middle-how-language-models-use-long-contexts]]"
  - "[[summary-Xiao_2024_efficient-streaming-language-models-with-attention-sinks]]"
tags:
  - context-window
  - attention
  - lost-in-the-middle
  - context-rot
  - working-memory
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Context Windows

The context window is the fixed-size buffer of tokens an LLM processes at each inference step. It is the model's working memory — everything the model can "see" at once. Understanding context windows is critical because they impose absolute information boundaries on AI advisory systems.

## Size and Scale

Current production models (2026) support context windows ranging from 128,000 to over 1,000,000 tokens, corresponding roughly to 100,000–800,000 words of text. To provide scale: 128,000 tokens corresponds to roughly 200–300 pages of text. A 1-million-token window could hold several thousand pages.

## The Absolute Boundary

The context window is an absolute information boundary. What is outside the window does not exist for the model. The model has no awareness of information it has not been given, no access to its own training data at inference time, and no ability to observe the world except through what has been placed in its context.

In practice, the usable capacity is less than the raw size. A typical agent invocation allocates tokens across: the system prompt (several thousand tokens), conversation history (variable), tool results and retrieved documents (variable), and room for the model's response. In operational settings with rich tool output and long sessions, the effective capacity for new information can be a fraction of the total window.

## The Lost-in-the-Middle Effect

LLMs do not use information uniformly across the context window. Liu et al. (2024) demonstrated a distinctive **U-shaped performance curve**: models perform best when relevant information is at the very beginning (primacy bias) or end (recency bias) of the context, and significantly degrade when it is in the middle.

**Quantitative impact:** On multi-document question answering with 20 retrieved documents, accuracy drops by **over 20 percentage points** when the answer document moves from the edges to the middle of the context. Most strikingly, performance with the answer in the middle of 20-30 documents can drop **below closed-book performance** — providing the model with documents containing the answer produces worse results than giving it no documents at all, if the answer is in the middle.

This effect is confirmed even on simple synthetic retrieval tasks (matching UUID key-value pairs), ruling out comprehension as the cause — it is a **positional attention bias** inherent to the decoder-only architecture (see [[llm-architecture]]). Encoder-decoder models show more robustness within their training-time context window, but current frontier LLMs are all decoder-only.

Extended context models do not help: when inputs fit in both standard and extended windows, performance is nearly identical. Larger windows provide more capacity but do not improve the model's ability to use information at any position.

For safety-critical applications, this has direct design implications: the most important information should be placed at the beginning or end of the context, document ordering in [[retrieval-augmented-generation]] is a design parameter, and over-retrieval can push relevant information into the low-attention middle zone.

## Context Rot

Recent research has formalised the performance cost of context growth. Testing 18 frontier models, Hong, Troynikov, and Huber (2025) found that every model exhibits measurable performance degradation at every context length increment, even on simple retrieval tasks.

Du et al. (2025) extended this finding: even when the model can perfectly retrieve all relevant information from its context, performance still degrades by 13.9% to 85% as input length increases. The degradation persists even when irrelevant tokens are replaced with whitespace or masked entirely, indicating that the sheer length of the input — independent of distraction — imposes a processing cost.

This is an architectural property of transformer-based attention: as the number of tokens grows, the model's finite attention budget spreads thinner across more pairwise relationships, and the effective processing quality for any individual piece of evidence diminishes.

## Attention Sinks

Xiao et al. (2024) discovered that LLMs assign disproportionately high attention scores to the first few tokens in a sequence, regardless of their semantic content. The effect is dramatic: removing the initial tokens from a Llama-2-13B context causes perplexity to spike from 5.40 to **5,158** — a 955× degradation that renders output incoherent. Reintroducing just **4 initial tokens** alongside a 1,020-token recent window restores perplexity to 5.60.

**Why it happens:** The softmax function in the [[llm-architecture]] attention mechanism prevents attention values from being truly zero. When the current token has sufficient self-contained information, the model dumps excess attention onto the earliest tokens — which, by the autoregressive nature of training, are visible to all subsequent tokens. The effect is **positional, not semantic**: replacing the first 4 tokens with meaningless linebreak characters achieves comparable restoration.

**StreamingLLM** exploits this by maintaining two KV cache regions: (1) attention sink tokens (first 4) that anchor the computation, and (2) a rolling window of recent tokens. This enables stable inference on sequences of **4 million+ tokens** with up to 22.2× speedup, without retraining.

For safety-critical applications running long monitoring sessions, any context management scheme — truncation, compression, or sliding window — **must preserve the initial tokens** or provide equivalent anchoring. See [[context-management-risks]].

## Context Discipline

The context rot evidence inverts a common engineering instinct. The standard approach to [[retrieval-augmented-generation]] is to retrieve generously — include more documents to reduce the chance of missing something relevant. But over-retrieval actively degrades response quality, even when the relevant information is present and correctly retrieved.

**Context discipline** — being deliberate and selective about what enters the context — is therefore a first-line defence against both context rot and [[output-vacuity]]. Practical strategies include:

- Limiting retrieved documents to the minimum that covers the query
- Using metadata filters (document type, revision date, operating mode) to pre-screen retrieval results
- Placing the most critical information at the beginning and end of the context
- Periodically resetting context with a fresh summary anchored to current state

## Relevance to Safety-Critical Systems

For AI advisory systems in complex work domains:

1. **Session length is bounded by context capacity.** Monitoring sessions that run for hours will exceed the window. When context fills, information must be discarded, compressed, or moved — each option introduces risks. See [[context-management-risks]].

2. **Information ordering affects accuracy.** Display and retrieval systems must be designed with primacy and recency effects in mind.

3. **More context is not always better.** Over-stuffing the context window degrades the quality of reasoning about the information that matters most.

4. **Multi-agent systems compound the problem.** Each agent maintains its own context window, and different agents may lose different information as contexts fill, causing their situational pictures to diverge.
