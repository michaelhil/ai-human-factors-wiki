---
title: "LLM Architecture"
type: foundation
sources:
  - raw/references/Vaswani_2017_attention-is-all-you-need.pdf
  - raw/references/Phuong_2022_formal-algorithms-for-transformers.pdf
related:
  - "[[context-windows]]"
  - "[[training-and-alignment]]"
  - "[[inference-and-generation]]"
  - "[[hallucination]]"
  - "[[tool-calling]]"
  - "[[summary-vaswani-2017]]"
  - "[[summary-phuong-2022]]"
tags:
  - transformer
  - architecture
  - attention
  - tokenisation
  - neural-network
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# LLM Architecture

A large language model (LLM) is a neural network trained on a large text corpus to predict the next token in a sequence. Understanding how LLMs work at the architectural level is essential for safety professionals because many failure modes — hallucination, prompt sensitivity, non-determinism — are properties of the architecture rather than defects of specific implementations.

## The Transformer

The architecture underlying all current LLMs is the transformer (Vaswani et al., 2017). Its defining feature is the **self-attention mechanism**, which computes relationships between every pair of positions in the input sequence. The transformer replaced the recurrent neural networks (RNNs) that previously dominated sequence modelling, offering a critical advantage: self-attention processes all positions simultaneously, enabling the massive GPU parallelisation that made scaling to hundreds of billions of parameters feasible. RNNs process tokens sequentially, creating a fundamental bottleneck that limited model scale.

## Self-Attention: Query, Key, Value

For each token in the context, the model computes three vectors:

- A **query** (what this token is looking for)
- A **key** (what this token offers to others)
- A **value** (the information this token carries)

Attention is computed as: Attention(Q, K, V) = softmax(QK^T / √d_k) · V, where Q, K, and V are matrices of queries, keys, and values. The scaling factor √d_k prevents dot products from growing large enough to push the softmax into regions with extremely small gradients, which would impede training (Vaswani et al., 2017).

The result: every token in the context can influence the generation of every subsequent token. There is no built-in partition, wall, or filter that restricts which parts of the context affect which parts of the output. A system prompt at the beginning, a user question in the middle, and a tool result appended at the end all interact through the attention mechanism.

This is not a design choice that can be overridden by careful prompting. It is a mathematical property of the self-attention computation (Phuong and Hutter, 2022). Within a single context, the model processes everything it has been given as one integrated object. It cannot "unsee" information that appears in its context.

## Decoder-Only Architecture

The original transformer (Vaswani et al., 2017) used an encoder-decoder structure for translation tasks. Current frontier LLMs (GPT-4, Claude, Llama, Gemini) are all **decoder-only** transformers (Phuong and Hutter, 2022). The decoder-only variant uses **masked (causal) self-attention**: each token can attend only to tokens at the same or earlier positions in the sequence, never to future tokens. Formally, attention scores for future positions are set to -∞ before the softmax, zeroing out their contribution.

This causal mask is what makes generation **autoregressive** — the model builds output token-by-token, each conditioned on everything before it but nothing after it. It is also why generation is inherently sequential (each token depends on the previous), even though training can be parallelised (all positions are known in advance). This sequential generation property is the fundamental latency constraint discussed in [[inference-and-generation]].

The encoder-only variant (BERT) uses bidirectional (unmasked) attention and is used for classification and text representation, not for generation. It is not used in current LLM advisory systems and is not further treated in this wiki.

## Multi-Head Attention

Rather than computing a single attention function, the transformer runs **h parallel attention heads** (h=8 in the original model, up to 128 in current frontier models), each with different learned projections. The results are concatenated and projected. This allows the model to jointly attend to information from different representation subspaces at different positions — one head might attend to syntactic relationships while another attends to semantic ones.

Multi-head attention is why transformers can capture multiple types of relationships simultaneously. For safety-critical applications, the key implication is that the model's representation of any given token is shaped by multiple parallel attention patterns, making the model's reasoning about any single piece of information inherently multi-faceted and difficult to decompose.

## Positional Encoding

Self-attention has no inherent notion of sequence order — it computes pairwise relationships between positions regardless of where they occur. To inject position information, the transformer adds **positional encodings** (sine and cosine functions of different frequencies) to the input embeddings. This allows the model to learn to attend to relative positions, so it can distinguish "the first instruction" from "a later instruction" even though the attention computation itself is position-agnostic.

## Quadratic Complexity

Self-attention computes relationships between every pair of positions, giving **O(n² · d) complexity per layer**, where n is the sequence length and d is the model dimension. This quadratic scaling in sequence length is why [[context-windows]] have practical limits. Doubling the context window quadruples the attention computation. This is the fundamental architectural constraint behind the context rot phenomenon documented in [[context-windows]] — as context grows, the finite attention budget spreads thinner across more pairwise relationships.

In contrast, recurrent layers have O(n · d²) complexity — linear in sequence length but quadratic in dimension. The transformer trades spatial complexity (quadratic in sequence length) for temporal parallelism (constant sequential operations vs. O(n) for RNNs). This trade-off is why transformers scale to enormous model sizes but struggle with very long contexts.

## Tokenisation

A **token** is not a word. Tokens are sub-word units, typically 3–5 characters long, produced by a tokeniser that segments text into a fixed vocabulary. The word "temperature" might be two tokens; the number "1247.3" might be three or four.

This matters for technical domains: the model processes "1247.3 psig" as a sequence of token fragments, not as a numerical value with units. It cannot perform arithmetic on numbers the way a calculator can. It predicts the next token based on patterns in its training data, which may or may not correspond to correct computation. This is a structural reason why LLMs make numerical errors — they are predicting likely token sequences, not performing mathematical operations.

## Model Scale

Current frontier models (as of 2026) have hundreds of billions of parameters, require multiple high-end GPUs to run, and cost on the order of $0.01 to $0.10 per query depending on input length. Capable open-weight models in the 70-billion-parameter range can run on a single high-end server with one or two GPUs, at lower cost per query but with reduced capability.

## Multimodal Extensions

Current frontier models also accept image and audio inputs (multimodal models). For safety-critical work domains, this extends the potential application space to display interpretation, equipment photograph analysis, and diagram reading. It also extends the failure mode space: visual hallucination (misidentifying objects in images), diagram misinterpretation, and false pattern detection in visual data.

## Statelessness

The base model has no memory between invocations. Each inference call starts fresh with whatever context is provided. There is no process running between calls, no background thread of reasoning, no retained impression from the previous session.

The distinction between the base model and the system built around it is critical. The base model is stateless: it processes its current context and produces output, with no mechanism to carry information forward. But the agent system built around the model is typically not stateless — agent frameworks maintain memory stores, session management, and in some systems scheduled invocation. From the model's perspective, each call is independent. From the system's perspective, continuity is maintained by re-injecting stored context at each invocation.

This means the model does not "learn" from operational experience in real time. Any adaptation requires external mechanisms to store, retrieve, and inject prior experience into future contexts. See [[memory-architectures]].

## Why This Matters for Safety Professionals

The architectural properties described here have direct consequences:

1. **Unified attention** means information placed anywhere in the context can influence any output. System prompts do not create hard boundaries — they are instructions weighted alongside everything else. See [[prompt-sensitivity]].

2. **Quadratic scaling** means that longer contexts are not just more expensive but functionally degraded — the model's ability to attend to any individual piece of information decreases as context grows. See [[context-windows]].

3. **Token-based processing** means the model has no native understanding of numbers, units, or physical quantities. Numerical reasoning is approximate pattern matching, not computation. See [[hallucination]].

4. **Parallelisation enabled scale** — the transformer's ability to process all positions simultaneously is why LLMs could grow to hundreds of billions of parameters. But this same property (no sequential processing) means the model has no built-in mechanism for ordered reasoning. See [[inference-and-generation]].

5. **No built-in truth mechanism** — the model generates tokens that are statistically probable given training data. When probable text happens to be true, the model appears accurate. When probable text is false, the model produces confident fabrication. See [[calibration-and-confidence]].

6. **Scale and deployment** determine the trade-off between capability and operational control. See [[deployment-local-vs-cloud]].
