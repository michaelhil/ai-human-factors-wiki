---
title: "Summary — Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
type: summary
sources:
  - raw/references/Wei_2022_chain-of-thought-prompting-elicits-reasoning-in-large-language-models.pdf
related:
  - "[[inference-and-generation]]"
  - "[[calibration-and-confidence]]"
  - "[[capability-gradient]]"
  - "[[prompt-sensitivity]]"
  - "[[self-correction-limitations]]"
  - "[[summary-Yao_2023_react-synergizing-reasoning-and-acting-in-language-models]]"
tags:
  - chain-of-thought
  - prompting
  - reasoning
  - emergent-abilities
  - few-shot-learning
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

Wei et al. (2022) introduce **chain-of-thought (CoT) prompting**, a method where few-shot exemplars include intermediate reasoning steps rather than just input-output pairs. This simple modification — requiring no model finetuning, architecture changes, or additional training data — significantly improves performance on tasks requiring multi-step reasoning.

## Key Findings

**The technique.** Standard few-shot prompting provides question-answer pairs as demonstrations. Chain-of-thought prompting augments each exemplar with a natural language reasoning trace showing how the answer was derived. For example, instead of "Q: ... A: 11", the exemplar reads "Q: ... A: Roger started with 5 balls. 2 cans of 3 tennis balls each is 6. 5 + 6 = 11."

**Emergent scale dependence.** CoT prompting is an emergent ability: it only provides performance gains with models of approximately 100 billion parameters or larger. Smaller models produce illogical chains of thought that actually hurt performance relative to standard prompting. This scale threshold has significant implications for deployment — the technique's benefits are not accessible to smaller, locally-deployable models.

**Arithmetic reasoning.** On the GSM8K benchmark of math word problems, PaLM 540B with CoT prompting achieved 56.9% accuracy — surpassing the prior state of the art set by a finetuned GPT-3 with a verifier (55%). Standard prompting on the same model achieved only 17.9%. Similar gains were observed across SVAMP, ASDiv, AQuA, and MAWPS benchmarks.

**Commonsense and symbolic reasoning.** CoT prompting also improved performance on commonsense reasoning tasks (CSQA, StrategyQA, Date Understanding, Sports Understanding, SayCan) and symbolic reasoning tasks (last letter concatenation, coin flip tracking). For symbolic reasoning, CoT facilitated out-of-domain generalisation to longer sequences than those in the few-shot exemplars.

**Ablation studies.** The authors isolated why CoT works through several ablation variants: (1) equation-only prompting (producing just a mathematical equation) did not help substantially, indicating that the natural language decomposition is key; (2) variable computation only (outputting dots proportional to equation length) provided no benefit, ruling out simple compute allocation as the mechanism; (3) placing the chain of thought after the answer rather than before it eliminated gains, confirming that the sequential reasoning process — not just knowledge activation — drives improvement.

**Error analysis.** Of 50 randomly sampled errors from PaLM 62B on GSM8K, 46% of the generated chains of thought were almost correct (minor calculation errors, symbol mapping mistakes, or one missing reasoning step), while 54% had major errors in semantic understanding or coherence. Scaling from 62B to 540B parameters fixed a substantial portion of errors across all categories.

**Robustness.** CoT prompting proved robust across different annotators, different exemplar orderings, varying numbers of exemplars, and different language models (GPT-3, LaMDA, PaLM). While there was performance variance across conditions, all CoT configurations substantially outperformed standard prompting baselines.

## Relevance to This Wiki

This paper is foundational to understanding [[inference-and-generation]] strategies for LLMs. CoT prompting was the precursor to the ReAct pattern ([[summary-Yao_2023_react-synergizing-reasoning-and-acting-in-language-models|Yao et al., 2023]]) and modern reasoning models (o-series, extended thinking). The emergent scale dependence finding is directly relevant to [[capability-gradient]] — the same prompting strategy can produce radically different outcomes depending on model size. The finding that CoT chains can contain plausible-looking but incorrect reasoning connects to [[calibration-and-confidence]] concerns and the broader challenge of [[opacity-and-explainability]] in AI advisory systems. For safety-critical deployments, CoT provides a window into model reasoning but does not guarantee correctness — the reasoning trace itself can be a source of [[hallucination]].
