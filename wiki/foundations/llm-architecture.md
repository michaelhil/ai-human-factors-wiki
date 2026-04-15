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

The architecture underlying current LLMs is the transformer (Vaswani et al., 2017). Its defining feature is the **self-attention mechanism**, which computes relationships between every pair of positions in the input sequence.

For each token in the context, the model computes three vectors:

- A **query** (what this token is looking for)
- A **key** (what this token offers to others)
- A **value** (the information this token carries)

Attention weights are computed between each query and every key in the context, determining how much each token influences every other token. This computation happens at every layer of the model — for current LLMs, that means 32 to 128 layers deep.

The result is that every token in the context can influence the generation of every subsequent token. There is no built-in partition, wall, or filter that restricts which parts of the context affect which parts of the output. A system prompt at the beginning, a user question in the middle, and a tool result appended at the end all interact through the attention mechanism.

This is not a design choice that can be overridden by careful prompting. It is a mathematical property of the self-attention computation (Phuong and Hutter, 2022). Within a single context, the model processes everything it has been given as one integrated object. It cannot "unsee" information that appears in its context.

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

2. **Token-based processing** means the model has no native understanding of numbers, units, or physical quantities. Numerical reasoning is approximate pattern matching, not computation. See [[hallucination]].

3. **Scale and deployment** determine the trade-off between capability and operational control. See [[deployment-local-vs-cloud]].

4. **No built-in truth mechanism** — the model generates tokens that are statistically probable given training data. When probable text happens to be true, the model appears accurate. When probable text is false, the model produces confident fabrication. See [[calibration-and-confidence]].
