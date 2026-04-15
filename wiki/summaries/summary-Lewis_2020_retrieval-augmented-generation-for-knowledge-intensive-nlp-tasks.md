---
title: "Summary: Lewis et al. (2020) — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
type: summary
sources:
  - raw/references/Lewis_2020_retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.pdf
related:
  - "[[retrieval-augmented-generation]]"
  - "[[hallucination]]"
  - "[[knowledge-graphs]]"
  - "[[training-and-alignment]]"
tags:
  - rag
  - retrieval
  - knowledge-grounding
  - foundational
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Lewis et al. (2020) — Retrieval-Augmented Generation

**Full citation:** Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W., Rocktäschel, T., Riedel, S., and Kiela, D. (2021). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *NeurIPS 2020*.

## Key Contribution

This paper introduces the RAG framework, the foundational architecture for combining a pre-trained language model (the parametric memory) with a document retrieval system (the non-parametric memory). The generator conditions its output on documents retrieved from an external index, reducing reliance on knowledge stored in the model's parameters. RAG set the conceptual template that all subsequent retrieval-augmented systems build on, and is the primary subject of the [[retrieval-augmented-generation]] wiki page.

## Architecture

RAG combines two components trained end-to-end:

1. **Retriever** — a Dense Passage Retrieval (DPR) model using dual BERT encoders. The query and documents are embedded into a shared vector space; the top-K most similar documents are retrieved via Maximum Inner Product Search (MIPS).
2. **Generator** — a BART seq2seq model that generates output conditioned on the query concatenated with retrieved documents.

**Two formulations** address how retrieval interacts with generation:
- **RAG-Sequence**: the same retrieved document conditions the entire output sequence. Appropriate when the answer draws from a single coherent source.
- **RAG-Token**: different retrieved documents can condition different output tokens. Appropriate when the answer synthesises information from multiple sources (e.g., Jeopardy question generation combining facts from different documents).

## Key Findings

- **Factuality improvement**: human evaluators found RAG generations more factual than parametric-only BART in 42.7% of comparisons, versus BART preferred only 7.1% of the time. RAG generates more specific, diverse, and factual language.
- **State-of-the-art on knowledge-intensive tasks**: RAG achieved state-of-the-art on three open-domain QA benchmarks (Natural Questions, TriviaQA, WebQuestions) and competitive performance on fact verification (FEVER) and abstractive QA (MS-MARCO).
- **Index hot-swapping**: the non-parametric memory (document index) can be replaced at test time without retraining the model. Swapping from a 2016 Wikipedia index to a 2018 index updated the model's world knowledge, with 70% accuracy on questions about 2016 leaders and 68% for 2018 leaders. This demonstrates the key advantage over fine-tuning: knowledge currency without retraining.
- **Learned retrieval outperforms BM25**: the dense retriever substantially outperforms traditional word-overlap retrieval (BM25) on most tasks, validating the differentiable retrieval approach.

## The Parametric vs Non-Parametric Distinction

The paper frames the core design choice clearly: knowledge can reside in the model's parameters (learned during training, expensive to update, opaque) or in an external document store (inspectable, updatable without retraining, auditable). RAG combines both, using parametric memory for reasoning and non-parametric memory for factual grounding.

This distinction maps directly to the wiki's comparison between [[training-and-alignment]] (fine-tuning = modifying parametric memory) and [[retrieval-augmented-generation]] (RAG = adding non-parametric memory). For safety-critical applications where auditability and knowledge currency matter, the non-parametric path is preferred because the retrieved documents can be inspected, logged, and updated through a controlled change process.

## Relevance to This Wiki

This paper established the architectural pattern that is now standard for grounding LLMs in domain-specific knowledge. For safety professionals, the key takeaway is the index hot-swapping result: RAG allows knowledge updates without model retraining, which means the knowledge base can be maintained through a controlled document management process rather than requiring the opaque weight modifications that fine-tuning entails. The factuality improvement provides empirical evidence that retrieval grounding works, while also establishing that it is an improvement on average — not a guarantee for individual queries. The failure modes identified in subsequent work (see [[retrieval-augmented-generation]] and Barnett et al., 2024) build on this foundation.
