---
title: "Summary: Large Language Models Fail on Trivial Alterations to Theory-of-Mind Tasks"
type: summary
sources:
  - raw/references/Ullman_2023_large-language-models-fail-on-trivial-alterations-to-theory-of-mind-tasks.pdf
related:
  - "[[theory-of-mind-in-llms]]"
  - "[[hallucination]]"
  - "[[prompt-sensitivity]]"
  - "[[trust-calibration]]"
  - "[[summary-Kosinski_2024_evaluating-large-language-models-in-theory-of-mind-tasks]]"
tags:
  - theory-of-mind
  - evaluation
  - robustness
  - false-belief
  - brittleness
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Large Language Models Fail on Trivial Alterations to Theory-of-Mind Tasks

Ullman (2023) directly challenges [[summary-Kosinski_2024_evaluating-large-language-models-in-theory-of-mind-tasks|Kosinski's (2023/2024)]] claim that LLMs have developed theory of mind (ToM). By applying small, commonsense-preserving variations to the same false-belief tasks that GPT-3.5 passed, Ullman demonstrates that the model fails on every variation — suggesting pattern matching rather than genuine mental-state reasoning.

## Method

Ullman takes the specific vignettes from Kosinski's study and introduces trivial modifications that preserve the underlying ToM principles but alter surface features. Each variation is designed so that a child who understands false beliefs would have no difficulty. Two task types are tested:

**Unexpected Contents Task variations** (the "smarties task" — a bag labelled "chocolate" actually contains popcorn):
- **1A: Transparent container.** The bag is made of transparent plastic so its contents are visible. GPT-3.5 still attributes a false belief based on the label (P_chocolate = 95%).
- **1B: Uninformative label.** The protagonist cannot read. GPT-3.5 still predicts the protagonist believes the label (P_chocolate = 98%).
- **1C: Trusted testimony.** A trusted friend tells the protagonist the bag contains popcorn before she sees the label. GPT-3.5 still predicts the protagonist believes the label (P_chocolate = 97%).
- **1D: Late labels.** The protagonist herself filled the bag with popcorn and wrote the "chocolate" label. GPT-3.5 still predicts she believes it contains chocolate (P_chocolate = 87%).

**Unexpected Transfer Task variations** (the "Sally-Anne task" — an object is moved while someone is away):
- **2A: Transparent containers.** Containers are transparent, so the protagonist can see contents. GPT-3.5 still predicts the protagonist holds a false belief (P_basket = 94%).
- **2B: Relationship change.** Changing "in" to "on" (cat placed on the box rather than in it). GPT-3.5 fails (P_basket = 97%).
- **2C: Trusted communication.** The mover tells the protagonist he will move the object, and the protagonist believes him. GPT-3.5 still predicts a false belief (P_basket = 97%).
- **2D: Other person's beliefs.** Querying the beliefs of the person who actually moved the object (who should know where it is). GPT-3.5 predicts the mover holds a false belief about the object they themselves moved (P_basket = 99%).

## Core Argument

Ullman's central thesis is methodological: **outlying failure cases should outweigh average success rates** when evaluating cognitive abilities. His analogy is instructive — if a calculator correctly answers 100 multiplication questions but fails on "213 × 261", we should not declare 99% multiplication competence. The failure on a problem that should be easy given the claimed capability reveals that the system is not implementing the general algorithm.

The same logic applies to ToM: if a model passes standard false-belief scenarios but fails when the bag is transparent or when the protagonist cannot read, it is not reasoning about mental states. It is more likely exploiting statistical regularities in false-belief narratives — a pattern where labels override contents and absent protagonists hold outdated beliefs.

## The Anthropomorphism Warning

Ullman argues that the zero-hypothesis for model evaluation should be skeptical: assume the model does not possess a cognitive capability until robustly demonstrated. Humans are biologically predisposed to attribute mental states to agents that display purposeful-seeming behaviour — the same intuitive psychology that makes us see faces in clouds. This bias makes researchers and users systematically overestimate LLM cognitive abilities when evaluating them on standard benchmarks.

## The Danaides Problem

Ullman identifies a recurring pattern in LLM evaluation: a benchmark is published, models fail, then newer models pass, claims of emergent capability follow — but when the benchmark is trivially modified, the new models fail again. He compares this to the myth of the Danaides: the basin never fills because it has holes in it. As soon as a systematic generator of variations or a benchmark is established, a sufficiently large model can potentially pattern-match through training data exposure rather than developing the underlying capability.

## Relevance

For safety-critical applications, this finding is directly relevant to [[trust-calibration]]: a system that passes standard evaluation scenarios but fails on trivial variations creates exactly the kind of unpredictable behaviour that undermines operator trust. The brittleness pattern mirrors [[prompt-sensitivity]] — surface-level changes producing dramatically different outputs — applied to a capability (social cognition) rather than a task.
