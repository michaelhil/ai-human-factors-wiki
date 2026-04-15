---
title: "Summary: Kandpal et al. (2023) — Large Language Models Struggle to Learn Long-Tail Knowledge"
type: summary
sources:
  - raw/references/Kandpal_2023_large-language-models-struggle-to-learn-long-tail-knowledge.pdf
related:
  - "[[hallucination]]"
  - "[[output-vacuity]]"
  - "[[retrieval-augmented-generation]]"
  - "[[training-and-alignment]]"
tags:
  - long-tail
  - knowledge
  - training-data
  - hallucination
  - empirical
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Kandpal et al. (2023) — LLMs Struggle to Learn Long-Tail Knowledge

**Full citation:** Kandpal, N., Deng, H., Roberts, A., Wallace, E., and Raffel, C. (2023). Large Language Models Struggle to Learn Long-Tail Knowledge. *Proceedings of the 40th International Conference on Machine Learning (ICML 2023)*.

## Key Contribution

This paper establishes a **strong, causal relationship** between the number of times a fact appears in pre-training data and an LLM's ability to answer questions about that fact. The finding explains why LLMs are reliable on common knowledge but fail on rare, specialised, or domain-specific facts — the long tail of the knowledge distribution. This is the mechanistic foundation for the central-tendency bias described in [[output-vacuity]] and a structural cause of [[hallucination]].

## Core Finding

Model accuracy on factoid QA correlates strongly with the number of relevant documents in the pre-training corpus:

- **BLOOM-176B** accuracy on TriviaQA jumps from **~25% to above 55%** as the number of relevant pre-training documents increases from 10¹ to 10⁴
- The relationship is **log-linear** between model parameter count and QA accuracy
- The correlation is consistent across multiple QA datasets (TriviaQA, Natural Questions), pre-training corpora (The Pile, ROOTS, C4, OpenWebText), and model families (GPT-Neo, BLOOM, GPT-3)
- Larger models are better at learning long-tail knowledge, but the improvement requires orders of magnitude more parameters for each increment in rare-fact coverage

## Causal Validation

The correlation could be confounded (perhaps rare facts are inherently harder). The authors establish causality through a counterfactual experiment: they retrain a 4.8B parameter model after removing relevant documents for specific questions from the training data. Model accuracy drops proportionally to the number of documents removed (Figure 5), confirming that the **relationship is causal, not merely correlational**.

## Scaling Cannot Solve This

The log-linear relationship implies that models would need to scale to approximately **one quadrillion (10¹⁵) parameters** to achieve competitive QA accuracy on questions with little support in pre-training data. This is orders of magnitude beyond current or foreseeable hardware. **Scaling alone cannot solve the long-tail knowledge problem.**

## RAG as Partial Mitigation

[[retrieval-augmented-generation]] reduces the dependence on pre-training document count by providing relevant documents at inference time. However, retrieval systems still exhibit a mild dependence on document count — they need the relevant document to exist in the retrieval store, and retrieval quality determines whether it's found. RAG is a "promising approach for capturing the long tail" but not a complete solution.

## Humans Show the Opposite Pattern

An important contrast: human accuracy on QA is actually *highest* for questions with *few* relevant documents — rare, simple factoids that are easy for humans but hard for LLMs. The failure modes are fundamentally different: LLMs fail on rare knowledge because it was underrepresented in training; humans fail on common knowledge because of overload and interference.

## Relevance to This Wiki

This paper provides the mechanistic explanation for two wiki topics. For [[hallucination]]: the three-source causal framework identifies "knowledge boundary" as a cause — Kandpal et al. show precisely how that boundary is determined by training data frequency. For [[output-vacuity]]: the central-tendency bias (retreating to generic output when specific knowledge is lacking) is a direct consequence of this finding — the model defaults to high-frequency patterns when the specific fact falls in the long tail. For safety-critical applications where domain-specific knowledge matters (rare failure modes, unusual configurations, specialised procedures), the implication is clear: the model's parametric knowledge is least reliable exactly where domain expertise matters most.
