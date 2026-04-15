---
title: "Summary — Context Graph"
type: summary
sources:
  - raw/references/Xu_2024_context-graph.pdf
related:
  - "[[knowledge-graphs]]"
  - "[[retrieval-augmented-generation]]"
  - "[[hallucination]]"
  - "[[summary-Peng_2024_graph-retrieval-augmented-generation-survey]]"
  - "[[summary-Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms]]"
tags:
  - knowledge-graph
  - context
  - provenance
  - grounding
  - reasoning
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Context Graph

**Xu et al. (2024)** — IDEA Research / CUHK / CAS, preprint

## Problem

Standard [[knowledge-graphs]] represent knowledge as triples — (head entity, relation, tail entity). This representation discards crucial contextual information that affects meaning: temporal validity (when a fact was true), geographic scope (where it applies), provenance (where the information came from), confidence levels, quantitative data, and event-specific details. The loss of context causes four concrete problems:

1. **Contradictory triples**: the same entity pair with the same relation can appear with conflicting tail entities when context distinguishes them (e.g., "stays in" vs "lives in" both flatten to the same relation)
2. **Temporal ambiguity**: a single triple (Steve Jobs, chairman of, Apple Inc.) cannot represent that this relationship held at different times under different circumstances
3. **Invalid rule learning**: KG reasoning methods learn patterns like (X, works_in, Y) ∧ (Y, city_of, Z) → (X, citizen_of, Z), which may hold in some contexts but not others
4. **Incomplete answers**: questions requiring quantitative or temporal reasoning cannot be answered from triples alone

## Context Graph Definition

A Context Graph (CG) extends the triple to a **quadruple**: (head entity, relation, tail entity, relation context). Context is categorised into two types:

- **Entity contexts**: attributes, types, descriptions, aliases, reference links, images, and other metadata about individual entities
- **Relation contexts**: temporal information, geographic locations, quantitative data, provenance, confidence levels, event-specific details, and supplementary information about the relationships between entities

This extension preserves the structural clarity of typed relationships while adding the metadata needed for nuanced reasoning.

## CGR³ Reasoning Paradigm

The authors propose CGR³ (Context Graph Reasoning with Retrieval, Ranking, and Reasoning), a three-step paradigm that leverages LLMs to reason over context graphs:

1. **Retrieval**: gather candidate entities and their contexts from the CG, including supporting triples with similar relations and textual context from linked knowledge bases (e.g., Wikipedia via Wikidata mappings)
2. **Ranking**: use an LLM fine-tuned with LoRA to rank candidate entities based on both structural knowledge (from KG embeddings) and contextual semantics
3. **Reasoning**: the LLM determines whether sufficient information has been retrieved to answer the query; if not, the process iterates by retrieving along new reasoning paths

## Key Results

Evaluated on FB15k237 and YAGO3-10 for KG completion, and on WebQSP and CWQ for question answering:

- Context integration consistently improves performance across all embedding-based KGC models tested (RotatE, ComplEx, GIE)
- Entity descriptions provide the strongest individual context type for KGC
- The iterative retrieve-rank-reason loop enables multi-hop reasoning that single-pass methods cannot handle
- LLMs effectively leverage contextual information to disambiguate entities and relationships that are indistinguishable in triple-only representations

## Relevance to This Wiki

The Context Graph concept directly addresses a gap in [[knowledge-graphs]] for safety-critical applications: operational knowledge is inherently contextual. A regulatory requirement has temporal validity (when was it issued? is it superseded?), a maintenance procedure has applicability conditions (which equipment configuration?), and an operating limit has provenance (which technical specification? which revision?). Standard KG triples cannot represent these distinctions. The quadruple structure — adding relation context for temporal validity, provenance, and confidence — maps naturally to safety-critical domain needs where knowing *when* a fact was valid and *where it came from* is as important as the fact itself. The CGR³ paradigm's iterative reasoning also connects to [[retrieval-augmented-generation]] patterns: rather than retrieving all information at once, the system progressively gathers context until it has sufficient grounding to answer — a pattern that reduces both [[hallucination]] risk and unnecessary context consumption.
