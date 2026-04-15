---
title: "Summary: Evaluating Large Language Models in Theory of Mind Tasks"
type: summary
sources:
  - raw/references/Kosinski_2024_evaluating-large-language-models-in-theory-of-mind-tasks.pdf
related:
  - "[[theory-of-mind-in-llms]]"
  - "[[sycophancy]]"
  - "[[trust-calibration]]"
  - "[[hallucination]]"
  - "[[situation-awareness-in-human-ai-teams]]"
  - "[[epistemic-independence]]"
tags:
  - theory-of-mind
  - emergent-capability
  - evaluation
  - false-belief
  - social-cognition
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Evaluating Large Language Models in Theory of Mind Tasks

Kosinski (2024) tests whether LLMs can solve false-belief tasks — the gold-standard test for theory of mind (ToM) in humans. ToM is the ability to attribute mental states (beliefs, intentions, desires) to others, including the recognition that others may hold beliefs that differ from reality or from one's own beliefs. It develops in children around age 4–6 and is considered foundational to human social interaction, communication, empathy, and moral judgement.

## Method

The study administers 40 bespoke false-belief tasks to 11 LLMs spanning the GPT-1 through GPT-4 family plus BLOOM. Each task includes a false-belief scenario, three matched true-belief control scenarios, and reversed versions of all four. To score a point, an LLM must correctly answer all 16 prompts (8 scenarios x 2 prompts each) for a single task. Two task types are used: Unexpected Contents Tasks (a container's label mismatches its contents; does the protagonist know the true contents?) and Unexpected Transfer Tasks (an object is moved while the protagonist is absent; where does the protagonist believe the object is?).

The study also employs sentence-by-sentence analysis — feeding stories one sentence at a time and tracking how the model's predicted completions change as information is revealed — to probe whether the model dynamically tracks beliefs as a narrative unfolds.

## Key Findings

**Gradual emergence across model generations.** Older models (GPT-1, GPT-3-ada, GPT-3-babbage, GPT-2XL, GPT-3-curie, BLOOM) solved zero tasks. GPT-3-davinci-002 (January 2022) solved 5% of tasks. GPT-3-davinci-003 and ChatGPT-3.5-turbo (late 2022 and early 2023) solved 20%, matching the performance of 3-year-old children. ChatGPT-4 (June 2023) solved 75%, matching 6-year-old children.

**Strong correlation with language proficiency.** Performance on ToM tasks correlates strongly with general language ability (R = 0.98), suggesting ToM-like behaviour may be a by-product of improved language modelling rather than a separately engineered capability.

**Dynamic belief tracking.** Sentence-by-sentence analysis shows ChatGPT-4 tracks both the actual state of affairs and the protagonist's (potentially false) belief simultaneously. When a story reveals that a bag labelled "chocolate" actually contains popcorn, ChatGPT-4 correctly predicts the protagonist would believe it contains chocolate (matching the label) while the model itself tracks the true contents. This pattern is virtually identical to the pattern observed in reversed scenarios.

**True-belief controls validate the task.** When the protagonist is present for transfers or informed of true contents, ChatGPT-4 correctly predicts the protagonist's belief should not be false — confirming the model is not simply defaulting to one answer type.

**Brittleness under perturbation.** The author acknowledges that ChatGPT-4 performance is not robust to all modifications. After reviewers added true-belief controls and various adjustments, GPT-3-davinci-003's performance dropped substantially (from 90% to 20–60% depending on condition). ChatGPT-4 remained more robust (95% to 75%). The author references Ullman (2023), who demonstrated that trivial alterations to false-belief scenarios cause failures, as an important counterpoint.

## Interpretation and Caveats

Kosinski emphasises that passing false-belief tasks does not prove LLMs possess genuine ToM — only that they produce outputs consistent with ToM-like reasoning on these specific tasks. Failures do not necessarily indicate lack of ability either; they may reflect constrained output expression. The author hypothesises that ToM-like behaviour emerged spontaneously as a by-product of language training, not through explicit engineering. This parallels other emergent capabilities observed with scale.

The implications cut both ways: models that can track others' mental states could be more effective collaborators and assistants, but the same capability could enable more sophisticated manipulation — a concern directly relevant to [[sycophancy]] and [[trust-calibration]] in safety-critical applications.
