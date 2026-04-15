---
title: "Summary — Graph Retrieval-Augmented Generation: A Survey"
type: summary
sources:
  - raw/references/Peng_2024_graph-retrieval-augmented-generation-survey.pdf
related:
  - "[[knowledge-graphs]]"
  - "[[retrieval-augmented-generation]]"
  - "[[hallucination]]"
  - "[[tool-calling]]"
  - "[[summary-Edge_2024_from-local-to-global-graph-rag-query-focused-summarization]]"
  - "[[summary-Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms]]"
tags:
  - graph-rag
  - knowledge-graph
  - retrieval
  - grounding
  - survey
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Graph Retrieval-Augmented Generation: A Survey

**Peng et al. (2024)** — Peking University / Zhejiang University / Ant Group, J. ACM, September 2024

## What the Paper Does

This is the first comprehensive survey of **GraphRAG** — retrieval-augmented generation that retrieves from graph-structured databases rather than text corpora. The authors formalise the GraphRAG workflow, categorise existing methods across its three stages, and survey downstream tasks, benchmarks, and industrial applications.

## Why GraphRAG Over Text RAG

Traditional [[retrieval-augmented-generation]] retrieves text chunks by embedding similarity. The authors identify three limitations this creates: (1) it neglects relationships between entities that cannot be captured by similarity alone, (2) concatenating retrieved text passages produces redundant context that triggers the "lost in the middle" phenomenon, and (3) text RAG can only retrieve from a local subset of documents, failing to synthesise global information. GraphRAG addresses these by retrieving structured graph elements — nodes, triplets, paths, or subgraphs — that preserve relational information and reduce context length through abstraction.

## The GraphRAG Framework

The survey formalises GraphRAG into three stages:

**1. Graph-Based Indexing (G-Indexing)**: Constructing or selecting a graph database and building indices. Graph data comes from either open knowledge graphs (Wikidata, DBpedia, domain-specific KGs) or self-constructed graphs built from documents via entity extraction and relation mapping. Indexing methods include graph indexing (preserving full structure), text indexing (converting graph data to textual descriptions), vector indexing (embedding graph data), and hybrid approaches.

**2. Graph-Guided Retrieval (G-Retrieval)**: Extracting relevant graph elements in response to queries. The survey categorises retrievers as non-parametric (heuristic graph traversal), LM-based (language models generating retrieval paths), or GNN-based (graph neural networks scoring relevance). Retrieval granularity varies from individual nodes to triplets, paths, subgraphs, or hybrid combinations. Retrieval paradigms include one-shot retrieval, iterative retrieval (adaptive refinement), and multi-stage retrieval. Enhancement techniques include query expansion, query decomposition, knowledge merging, and knowledge pruning.

**3. Graph-Enhanced Generation (G-Generation)**: Producing output from retrieved graph data. Generators can be GNNs (for discriminative tasks), LMs (for generative tasks), or hybrid GNN-LM systems. Graph data must be converted into LM-compatible formats: adjacency/edge tables, natural language descriptions, code-like representations, syntax trees, or node sequences. Generation can be enhanced before (pre-generation enrichment), during (mid-generation graph interaction), or after (post-generation verification).

## Key Design Trade-offs

The survey identifies several trade-offs relevant to system design:

- **Retrieval granularity vs efficiency**: finer granularity (nodes, triplets) enables faster retrieval but may miss contextual relationships; coarser granularity (subgraphs) captures more context but is computationally expensive
- **Once vs iterative retrieval**: single-pass retrieval is faster but less accurate; iterative retrieval refines results but adds latency — critical for time-sensitive applications
- **Graph format for LMs**: no single format dominates; natural language descriptions are most intuitive but verbose, while code-like formats preserve structure but may confuse models not trained on graph languages

## Relevance to This Wiki

This survey provides the systematic framework for understanding how [[knowledge-graphs]] integrate with LLMs beyond the simple KG-augmentation described in earlier sources. For safety-critical advisory systems, the three-stage decomposition (indexing, retrieval, generation) maps to distinct design decisions with different failure modes at each stage. The retrieval granularity taxonomy is particularly relevant: for regulatory compliance queries, path-level retrieval can trace the chain from a general design criterion through technical specifications to specific action requirements, while subgraph retrieval can capture the full context around an equipment system. The survey's coverage of self-constructed graphs — built from documents rather than pre-existing knowledge bases — is relevant to domains where formal KGs do not yet exist but operational documents contain structured knowledge. See [[knowledge-graphs]] for how these patterns apply to safety-critical domains and [[retrieval-augmented-generation]] for comparison with text-based approaches.
