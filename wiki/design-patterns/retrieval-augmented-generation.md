---
title: "Retrieval-Augmented Generation"
type: design-pattern
sources:
  - raw/references/Lewis_2020_retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.pdf
  - raw/references/Barnett_2024_seven-failure-points-in-rag-systems.pdf
  - raw/references/Liu_2024_lost-in-the-middle-how-language-models-use-long-contexts.pdf
  - raw/references/Kandpal_2023_large-language-models-struggle-to-learn-long-tail-knowledge.pdf
related:
  - "[[knowledge-graphs]]"
  - "[[hallucination]]"
  - "[[context-windows]]"
  - "[[llm-architecture]]"
  - "[[summary-lewis-2020]]"
  - "[[summary-barnett-2024]]"
tags:
  - rag
  - retrieval
  - knowledge-grounding
  - design-pattern
  - vector-store
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Retrieval-Augmented Generation

Retrieval-Augmented Generation (RAG) is the primary mechanism for grounding LLM output in external knowledge. It augments the model's context with documents retrieved from a knowledge store, reducing reliance on the model's parametric memory and providing access to current, domain-specific information (Lewis et al., 2020).

## How It Works

1. **Indexing**: Documents are split into chunks and embedded into a high-dimensional vector space
2. **Query**: The user's query is embedded into the same space
3. **Retrieval**: The most semantically similar document chunks are retrieved
4. **Generation**: Retrieved chunks are inserted into the model's context, and the model generates its response with this grounding material available

RAG improves factual accuracy by providing the model with relevant, potentially up-to-date information that may not be in its training data. Human evaluators in the original RAG study (Lewis et al., 2020) found RAG generations more factual than parametric-only generation in 42.7% of comparisons, versus only 7.1% the other way — strong evidence that retrieval grounding produces more factual output on average.

## Two RAG Formulations

The original RAG paper (Lewis et al., 2020) defined two variants:

- **RAG-Sequence**: the same retrieved document conditions the entire output sequence. Appropriate when the answer draws from a single coherent source.
- **RAG-Token**: different retrieved documents can condition different output tokens. Appropriate when the answer must synthesise information from multiple sources.

In practice, most production RAG systems use a simpler approach: retrieve top-K chunks, concatenate them into context, and generate. The formal RAG-Sequence/Token distinction matters primarily for understanding why different RAG implementations perform differently on different task types.

## Index Hot-Swapping

A key property of RAG for safety-critical applications: the document index can be replaced at test time without retraining the model. Lewis et al. (2020) demonstrated this by swapping Wikipedia indices from different years — the model's factual knowledge updated accordingly, with 70% accuracy on 2016 world leaders using the 2016 index and 68% for 2018 leaders using the 2018 index.

This is the fundamental advantage over fine-tuning (see [[training-and-alignment]]): knowledge currency can be maintained through a document management process rather than requiring opaque weight modifications. For regulated domains, this means knowledge updates follow the same change control process as any other document revision — a far more auditable path than fine-tuning.

## Documented Failure Modes

Barnett et al. (2024) identified seven failure points in RAG systems:

**Missing content**: the relevant information is not in the knowledge base at all. No retrieval mechanism can find what does not exist.

**Missed retrieval**: the information is in the store but ranks too low to be retrieved. Semantic similarity between the query embedding and the relevant document embedding is insufficient.

**Not extracted**: the information is retrieved and present in the context but the model fails to use it — either ignoring it or failing to recognise its relevance to the query.

**Not in context**: the retrieved documents exceed the available [[context-windows]] space. With limited context budget, some relevant documents must be excluded.

**Wrong format**: the retrieved content is in a format the model struggles to process (tables, structured data, multi-column layouts).

**Incorrect specificity**: the retrieval returns either too broad (generic background) or too narrow (specific detail without context) material for the query.

**Incomplete**: the model uses some but not all of the relevant retrieved information, producing a partial answer.

Additionally, Liu et al. (2024) showed that models underuse information in the middle of long contexts, meaning the ordering of retrieved documents matters. Kandpal et al. (2023) demonstrated that LLMs struggle with long-tail knowledge — precisely the knowledge that RAG is supposed to provide.

## Engineering Lessons

Barnett et al. (2024) derived practical lessons from three deployed RAG systems (research review, education, biomedical Q&A with 15,000 documents):

- **Metadata enrichment helps retrieval**: adding source filename and chunk number to retrieved context improved the reader's extraction accuracy
- **Open-source embedding models can outperform** commercial options on small, domain-specific text — the choice of embedding model matters for domain coverage
- **Continuous calibration is required**: RAG systems receive unknown inputs at runtime, and performance characteristics change with each new LLM release. Monitoring is an operational requirement, not a one-time setup
- **RAG pipelines are suboptimal by construction**: assembled from independently optimised components (chunker, embedder, retriever, reranker, reader) rather than trained end-to-end

## The Over-Retrieval Problem

A critical interaction with [[context-windows]]: over-retrieval actively degrades model performance, even when the relevant information is present and correctly retrieved. The mechanism connects to the [[output-vacuity]] problem — as specific evidence is diluted by surrounding irrelevant context, the model retreats toward generic output.

Poor retrieval precision does not merely waste context space; it causes attention dilution that degrades output quality. This inverts the common engineering instinct to "retrieve more to miss less."

## RAG vs Fine-Tuning

RAG and [[training-and-alignment]] (fine-tuning) are different approaches to domain specialisation:

| Property | RAG | Fine-Tuning |
|----------|-----|-------------|
| Model weights | Unchanged | Modified |
| Knowledge update | Add documents to store | Retrain model |
| Auditability | Retrieved docs are logged and inspectable | Weight changes are opaque |
| V&V impact | Base model separately testable | New model requires full re-evaluation |
| Hallucination | Reduced but not eliminated | May introduce new hallucination modes |

For safety-critical applications, RAG's auditability advantage is significant: the retrieved documents can be inspected after the fact, and the model's base capabilities remain unchanged and separately testable.

## Cross-Domain Example: Procedure Retrieval

Consider an AI advisory system in any safety-critical domain with formal procedures (nuclear operating procedures, aviation checklists, medical treatment protocols, oil and gas well control procedures). When the operator queries the system about the correct response to a developing condition:

1. The RAG system retrieves relevant procedure sections from the document store
2. The model generates a response grounded in the retrieved procedures
3. **Risk**: if the document store contains superseded procedure revisions, the model may retrieve and ground its response in an outdated version
4. **Risk**: if the query is ambiguous, the system may retrieve procedures for a similar but different condition

Procedure currency — ensuring the document store reflects the current approved revision of every document — is therefore a first-order maintenance requirement for RAG systems in regulated domains.

## Relevance to Safety-Critical Systems

1. **RAG does not guarantee consistency with retrieved material.** The model may ignore, misinterpret, or contradict the documents in its context. RAG reduces hallucination rates on average but does not eliminate them for any individual query.

2. **Document store maintenance is a safety function.** Stale, incorrect, or incomplete documents in the knowledge base propagate directly into AI advisory output.

3. **Retrieval quality is a design parameter.** Both under-retrieval (missing relevant documents) and over-retrieval (diluting context with irrelevant material) degrade system performance. Precision matters as much as recall.

4. **Combine with [[knowledge-graphs]]** for structured domains. Where relationships between entities matter (regulatory requirements, equipment hierarchies, procedural logic), graph-based retrieval preserves relational structure that vector similarity search loses.
