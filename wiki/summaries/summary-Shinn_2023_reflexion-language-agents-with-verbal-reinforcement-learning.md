---
title: "Summary — Reflexion: Language Agents with Verbal Reinforcement Learning"
type: summary
sources:
  - raw/references/Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning.pdf
related:
  - "[[self-correction-limitations]]"
  - "[[memory-architectures]]"
  - "[[perceive-reason-act-loop]]"
  - "[[inference-and-generation]]"
  - "[[summary-Yao_2023_react-synergizing-reasoning-and-acting-in-language-models]]"
  - "[[summary-Wei_2022_chain-of-thought-prompting-elicits-reasoning-in-large-language-models]]"
tags:
  - reflexion
  - self-reflection
  - verbal-reinforcement
  - episodic-memory
  - agent-learning
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Reflexion: Language Agents with Verbal Reinforcement Learning

Shinn et al. (2023) propose **Reflexion**, a framework in which LLM agents improve through verbal self-reflection rather than through weight updates. When an agent fails at a task, a self-reflection model generates a natural language analysis of what went wrong, which is stored in episodic memory and made available in subsequent attempts. This creates a form of "verbal reinforcement learning" that is lightweight, interpretable, and does not require model finetuning.

## Architecture

Reflexion uses three modular components:

1. **Actor** — an LLM (built on ReAct or Chain-of-Thought) that generates text and actions conditioned on the current task, its trajectory history, and its episodic memory of past reflections.
2. **Evaluator** — scores the Actor's output using task-specific signals: binary environment rewards (success/fail), heuristic rules, exact match grading, or LLM-generated assessments.
3. **Self-Reflection model** — given a failure signal, the trajectory, and the memory buffer, generates a verbal analysis identifying what went wrong and what to do differently. This reflection is appended to long-term memory.

The system uses two memory types: **short-term memory** (the current trajectory/scratchpad) and **long-term memory** (a sliding window of the most recent self-reflections, typically capped at 3 entries to fit within context limits).

## Key Findings

**Decision-making (AlfWorld).** ReAct + Reflexion completed 130 of 134 household tasks, improving over baseline ReAct by 22% absolute over 12 consecutive learning trials. Performance gains halted between trials 6 and 7, while baseline ReAct converged at a 22% hallucination rate with no improvement trend.

**Reasoning (HotPotQA).** Reflexion improved accuracy by 14% over baseline approaches without access to ground truth context, demonstrating that self-reflection helps the agent correct its own search and reasoning strategies across trials. Episodic memory provided an 8% absolute boost over refinement-only approaches.

**Programming (HumanEval, MBPP).** Reflexion achieved 91% pass@1 on HumanEval Python — surpassing the prior state-of-the-art GPT-4 baseline of 80%. The self-generated unit tests provided a concrete, verifiable feedback signal for the self-reflection loop.

**Ablation results.** Removing either test generation or self-reflection degraded performance, but removing self-reflection had a larger impact. Without the verbal self-reflection component, the agent was unable to translate error signals into actionable improvements — it could detect failures but not learn from them.

**Limitations.** Reflexion struggled on WebShop, a task requiring diverse creative exploration. After four trials, the agent showed no improvement and generated unhelpful self-reflections. The authors conclude that Reflexion is most effective when the action space is constrained enough for the agent to form useful learning signals, but struggles when the problem requires fundamentally different strategies rather than refinements of existing approaches.

## Relevance to This Wiki

Reflexion is a key example of **extrinsic self-correction** — the category that works, as distinct from intrinsic self-correction which does not (see [[self-correction-limitations]]). The improvement comes from external feedback signals (environment rewards, test results), not from the model re-examining its own reasoning in isolation.

The episodic memory architecture connects to [[memory-architectures]] — Reflexion demonstrates that storing verbal self-reflections as memory entries enables a form of within-session learning that persists across task attempts. This is relevant to safety-critical system design: the verbal nature of the reflections makes them inspectable by human operators, providing a window into why the agent changed its approach. However, the reflections are themselves LLM-generated and subject to the same failure modes as any other LLM output — the stated reason for a strategy change may not accurately capture the actual computational basis for the change.

The framework also has implications for [[epistemic-independence]]: Reflexion agents learn from their own failures, but the self-reflection model shares the same biases as the actor model. The "independence" is between trials (temporal diversity), not between models (epistemic diversity).
