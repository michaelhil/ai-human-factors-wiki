---
title: "Summary: Patil et al. (2023) — Gorilla: Large Language Model Connected with Massive APIs"
type: summary
sources:
  - raw/references/Patil_2023_gorilla-llm-connected-with-massive-apis.pdf
related:
  - "[[tool-calling]]"
  - "[[hallucination]]"
  - "[[retrieval-augmented-generation]]"
  - "[[perceive-reason-act-loop]]"
tags:
  - tool-calling
  - api-hallucination
  - benchmark
  - gorilla
  - empirical
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Patil et al. (2023) — Gorilla: LLM Connected with Massive APIs

**Full citation:** Patil, S.G., Zhang, T., Wang, X., and Gonzalez, J.E. (2023). Gorilla: Large Language Model Connected with Massive APIs. arXiv:2305.15334.

## Key Contribution

This UC Berkeley paper introduces APIBench, the first large-scale benchmark for evaluating LLM tool-calling accuracy across 1,645 real APIs from HuggingFace, TorchHub, and TensorFlow Hub. It documents severe API hallucination rates across frontier models and demonstrates that fine-tuning (Gorilla) and retrieval-augmented approaches can improve tool-calling reliability. The paper provides the foundational hallucination rate figures cited throughout the [[tool-calling]] wiki page.

## APIBench and Evaluation

The benchmark comprises 1,645 APIs with 16,450 instruction-API pairs generated via self-instruct. Evaluation uses **AST sub-tree matching**: the generated API call is parsed into an abstract syntax tree, and functional correctness is determined by whether the generated call's AST is a sub-tree of the reference API's AST. This captures functional equivalence (correct API with valid parameters) while allowing syntactic variation.

## API Hallucination Rates (Zero-Shot, 2023)

| Model | TorchHub | HuggingFace | TensorFlow Hub |
|---|---|---|---|
| GPT-4 | 36.6% | 43.1% | 78.7% |
| GPT-3.5 | 18.8% | 35.7% | 47.9% |
| Claude | 66.0% | 72.7% | 88.5% |
| LLaMA | 93.1% | 71.7% | 83.8% |

Hallucination types include: inventing nonexistent API endpoints, fabricating repository names (e.g., "AutoModel.from_pretrained('dir_name')" with arbitrary names), and generating syntactically valid but semantically wrong calls.

## Key Findings

- **Retrieval can help or hurt**: Adding a retriever (BM25, GPT-Index) sometimes reduces hallucination but can also increase errors. Non-optimal retrievers misguide the model — accuracy dropped 21.5% on TorchHub and 47.6% on HuggingFace with sub-optimal retrieval compared to no retrieval.
- **RLHF reduces tool hallucination**: GPT-3.5 (RLHF-tuned) has fewer hallucination errors than GPT-4 on most benchmarks, suggesting alignment training helps tool-calling reliability.
- **Fine-tuning works**: Gorilla (fine-tuned LLaMA-7B) surpasses GPT-4 on API accuracy with retrieval, demonstrating that domain-specific fine-tuning can dramatically improve tool-calling.
- **Adapts to documentation changes**: Retrieval-aware training enables the model to adapt to test-time API documentation changes — a critical property for production systems where APIs evolve.
- **Constraint handling**: Models struggle with API calls that have constraints (e.g., "accuracy >= 80%, parameters < 10M"). Gorilla handles constraints better than GPT-4 in zero-shot settings.

## Relevance to This Wiki

This paper provides the baseline empirical data for [[tool-calling]] reliability. The hallucination rates (36-93% depending on model and API domain) establish that tool calling is not a solved problem — it is a probabilistic process with high failure rates, especially for less common APIs. The finding that retrieval can *worsen* performance connects to the over-retrieval problem in [[retrieval-augmented-generation]]. For safety-critical applications where tool calls query plant data systems, invoke simulations, or retrieve regulatory text, these hallucination rates translate directly into operational risk.
