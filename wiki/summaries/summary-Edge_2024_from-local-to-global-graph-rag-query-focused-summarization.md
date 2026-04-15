---
title: "Summary — From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
type: summary
sources:
  - raw/references/Edge_2024_from-local-to-global-graph-rag-query-focused-summarization.pdf
related:
  - "[[retrieval-augmented-generation]]"
  - "[[knowledge-graphs]]"
  - "[[context-windows]]"
  - "[[hallucination]]"
  - "[[summary-Lewis_2020_retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks]]"
  - "[[summary-Barnett_2024_seven-failure-points-in-rag-systems]]"
tags:
  - graphrag
  - knowledge-graph
  - rag
  - community-detection
  - global-sensemaking
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# From Local to Global: A GraphRAG Approach to Query-Focused Summarization

Edge et al. (2024) from Microsoft Research introduce **GraphRAG**, a graph-based retrieval-augmented generation approach that addresses a fundamental limitation of conventional vector RAG: the inability to answer **global sensemaking queries** — questions that require understanding an entire text corpus rather than retrieving specific facts (e.g., "What are the main themes in this dataset?").

## The Problem with Vector RAG

Standard [[retrieval-augmented-generation]] retrieves individual text chunks based on semantic similarity to a query. This works well for specific factual questions ("When was X founded?") but fails for questions requiring synthesis across the entire corpus. No single chunk contains the answer to a global question; the answer must be assembled from patterns distributed across many documents. This is a query type that maps directly to the sensemaking needs of safety-critical domain experts — who often need to understand patterns, trends, and themes across large document collections (incident reports, operational logs, regulatory correspondence).

## GraphRAG Pipeline

The approach operates in two phases:

**Indexing (offline).** Source documents are chunked, then an LLM extracts entities, relationships, and claims from each chunk. These are aggregated into a knowledge graph. Community detection (Leiden algorithm) partitions the graph into hierarchical communities of closely related entities. An LLM generates summaries at each level of the community hierarchy — from fine-grained leaf communities to broad root-level summaries.

**Query (online).** Given a user query, GraphRAG uses a map-reduce approach over the community summaries: each community summary generates a partial answer (map step), and partial answers are combined into a final global answer (reduce step). The hierarchical community structure means different levels can be used depending on whether breadth or detail is prioritised.

## Key Results

**Comprehensiveness and diversity.** GraphRAG significantly outperformed vector RAG on global sensemaking queries across two datasets (~1M tokens each), achieving 72-83% win rates on comprehensiveness and 62-71% on diversity in head-to-head LLM-judged comparisons.

**Scalability through hierarchy.** Root-level community summaries (C0) used only 2-3% of the tokens required by the most detailed approach while maintaining competitive comprehensiveness (72% win rate over vector RAG) and diversity (62% win rate). This offers a dramatic efficiency advantage for frequent global queries over the same corpus.

**Community summaries as a data index.** The pre-generated community summaries serve as a structured, queryable index of the entire corpus — a form of compressed knowledge representation that can be browsed independently or queried via the map-reduce pipeline.

## Relevance to This Wiki

GraphRAG represents the convergence of [[retrieval-augmented-generation]] and [[knowledge-graphs]] into a unified architecture. For safety-critical applications, the global sensemaking capability is particularly valuable: incident pattern detection, regulatory trend analysis, and cross-event learning all require the kind of corpus-wide synthesis that vector RAG cannot provide. The community hierarchy also provides a natural structure for human review — operators can examine summaries at the appropriate level of abstraction rather than reading individual documents.

However, the approach inherits the hallucination risks of both RAG and LLM-based summarisation: the entity/relationship extraction, community summarisation, and query answering steps all involve LLM generation and are subject to the failure modes described in [[hallucination]] and [[summary-Barnett_2024_seven-failure-points-in-rag-systems|Barnett et al. (2024)]]. The graph index is only as reliable as the LLM's extraction accuracy, and community summaries may introduce or omit information during the abstractive summarisation process.
