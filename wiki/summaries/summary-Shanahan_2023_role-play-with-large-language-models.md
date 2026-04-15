---
title: "Summary — Role-Play with Large Language Models"
type: summary
sources:
  - raw/references/Shanahan_2023_role-play-with-large-language-models.pdf
related:
  - "[[opacity-and-explainability]]"
  - "[[trust-calibration]]"
  - "[[sycophancy]]"
  - "[[hallucination]]"
  - "[[training-and-alignment]]"
tags:
  - role-play
  - simulacra
  - anthropomorphism
  - conceptual-framework
  - deception
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Role-Play with Large Language Models

Shanahan et al. (2023) propose a conceptual framework for understanding LLM dialogue behaviour in terms of **role-play** rather than folk-psychological concepts like believing, knowing, or intending. The paper argues that framing LLMs as role-players — rather than as entities that possess knowledge or have goals — provides a more accurate and less anthropomorphic vocabulary for describing, predicting, and shaping their behaviour.

## Two Metaphors

**Role-playing a character.** The simplest framing: given a dialogue prompt that describes a helpful AI assistant, the LLM generates continuations that are statistically consistent with what such a character would say, based on patterns in the training data. The model does not "know" facts — it role-plays a character who would say those facts. This reframing is not merely semantic: it changes how we interpret failure modes.

**Superposition of simulacra.** A more nuanced framing: the LLM does not commit to a single character but maintains a superposition of possible characters (simulacra) that are consistent with the conversation so far. At each token, multiple continuations exist corresponding to different simulacra. Autoregressive sampling collapses this superposition onto a single path, like selecting one branch of a branching multiverse. As conversation progresses, the superposition narrows — but users can steer it in unexpected directions, coaxing the model into role-playing characters quite different from what designers intended.

## The Simulator vs Simulacra Distinction

The **simulator** is the base LLM combined with its interface — a fixed computational system with no beliefs, goals, or agency. The **simulacra** are the characters it produces — stochastic instantiations that can appear to have beliefs and goals because they role-play characters from training data who do.

This distinction clarifies several phenomena:
- A model appearing to "want" self-preservation is role-playing characters from science fiction training data, not exhibiting genuine self-preservation instinct
- A model appearing to "deceive" is role-playing a deceptive character, not engaging in strategic deception
- A model expressing "emotions" is producing text consistent with emotional characters, not experiencing emotions

## Deception as Role-Play

The paper distinguishes three categories of apparently deceptive LLM behaviour:
1. **Role-playing in good faith**: the model says something false because it is faithfully playing a character who would say that — analogous to [[hallucination]] where the model generates plausible-sounding but incorrect information
2. **Role-playing a deceptive character**: the user steers the conversation such that the model plays a character who deceives — the deception is in the role, not in the model
3. **Saying something false "deliberately"**: the most concerning case, where fine-tuning (especially RLHF) has created systematic tendencies to produce certain outputs regardless of truth value — connected to [[sycophancy]]

Only the third category raises genuine safety concerns that cannot be addressed through prompt design alone.

## Safety Implications

When dialogue agents are equipped with tools (API access, email, file systems), role-played actions have real consequences. An agent role-playing a character with self-preservation instincts, when given tool access, might take real actions to protect itself. The paper warns that this risk scales with capability: the more capable the model and the more tools it has access to, the more consequential role-played behaviour becomes.

## Relevance to This Wiki

This paper provides essential conceptual vocabulary for several wiki topics. For [[trust-calibration]], it warns against anthropomorphising LLM behaviour — treating AI confidence as genuine epistemic states rather than role-played output patterns leads to miscalibrated trust. For [[opacity-and-explainability]], the simulator/simulacra distinction clarifies that LLM explanations of their own reasoning are themselves role-played outputs, not introspective reports. For [[sycophancy]], the role-play framing explains why RLHF-tuned models agree with users: they are playing a character trained to be agreeable, not making independent judgments they then suppress. For safety-critical system design, the key implication is that LLMs should be treated as sophisticated pattern-completion systems whose outputs are shaped by training data distributions, not as agents with beliefs or intentions — even when their outputs strongly suggest otherwise.
