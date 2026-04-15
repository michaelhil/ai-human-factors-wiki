---
title: "Knowledge Graphs"
type: design-pattern
sources:
  - raw/references/Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms.pdf
  - raw/references/Edge_2024_from-local-to-global-graph-rag-query-focused-summarization.pdf
  - raw/references/Peng_2024_graph-retrieval-augmented-generation-survey.pdf
  - raw/references/Xu_2024_context-graph.pdf
related:
  - "[[retrieval-augmented-generation]]"
  - "[[hallucination]]"
  - "[[governance-gates]]"
  - "[[hybrid-decision-pipeline]]"
  - "[[summary-Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms]]"
  - "[[summary-Edge_2024_from-local-to-global-graph-rag-query-focused-summarization]]"
  - "[[summary-Peng_2024_graph-retrieval-augmented-generation-survey]]"
tags:
  - knowledge-graph
  - guardrail
  - design-pattern
  - grounding
  - constraint
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Knowledge Graphs

Knowledge graphs (KGs) store information as typed entity-relationship triples: (entity A, relationship, entity B). They provide structured grounding that can both inform and constrain LLM output, offering capabilities that vector-based [[retrieval-augmented-generation]] alone cannot provide.

## Structure

A domain-specific KG encodes the formal relationships in a work domain. Examples:

- (Pressurizer, controls, RCS_Pressure)
- (Tech_Spec_LCO_3.4.1, limits, RCS_Pressure_Max)
- (EOP_E0, initiated_by, Reactor_Trip)

Graph-RAG retrieves information by traversing typed relationships rather than by embedding similarity. When queried about the limits for a specific parameter, graph retrieval follows typed edges to the regulatory limit, producing a structurally grounded answer rather than the most similar text passage.

## Empirical Effectiveness

[[summary-Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms|Agrawal et al. (2024)]] survey evidence that KG augmentation is the most effective single intervention for reducing [[hallucination]]:

- **80%+ improvement** in answer correctness on QA tasks from augmenting with KG facts — more effective than increasing model size
- **66.8% → 85.7%** accuracy on reasoning tasks (ChatGPT + RoG with KG augmentation)
- **88.2%** accuracy in medical diagnosis (MindMap with clinical reasoning graph)

The effectiveness ceiling is set by KG quality and coverage. Methods that rely on KG retrieval are bottlenecked by the completeness and currency of the knowledge graph — reinforcing that knowledge base maintenance is a safety function.

## Three Uses of KGs with LLMs

[[summary-Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms|Agrawal et al. (2024)]] classify KG-LLM integration into three categories:

1. **Knowledge-Aware Inference** — KG used at inference time, no model change: KG-augmented retrieval (structured graph traversal vs vector similarity), KG-augmented reasoning (model follows graph paths for multi-step reasoning), and KG-controlled generation (the guardrail function below)
2. **Knowledge-Aware Training** — KG integrated into pre-training or fine-tuning, embedding structured knowledge into weights
3. **Knowledge-Aware Validation** — KG used post-generation to verify output against structured facts (the fact-checking layer in the [[hybrid-decision-pipeline]])

The trend since 2022: inference-time methods have overtaken training-time methods because retraining frontier models is impractical. Inference-time KG augmentation is also more auditable — the KG queries are logged, the facts are inspectable.

## GraphRAG: Systematic Integration of Graphs and LLMs

[[summary-Peng_2024_graph-retrieval-augmented-generation-survey|Peng et al. (2024)]] formalise Graph Retrieval-Augmented Generation (GraphRAG) as a three-stage framework, each introducing distinct design choices and failure modes:

1. **Graph-Based Indexing**: constructing or selecting a graph database and building indices (graph-structural, text-based, vector-based, or hybrid). The graph source can be an existing open KG (Wikidata, domain-specific ontologies) or a self-constructed graph built from documents via entity extraction and relation mapping. For domains without pre-existing formal KGs, self-construction is the primary path but introduces extraction quality as a bottleneck.

2. **Graph-Guided Retrieval**: extracting relevant graph elements (nodes, triplets, paths, or subgraphs) in response to queries. Retrieval granularity creates a trade-off: finer granularity (individual entities) is fast but may miss relational context; coarser granularity (subgraphs) captures full context but is computationally expensive and may exceed context windows. Retrieval paradigms range from single-pass (faster, suitable for time-critical applications) to iterative (more accurate but higher latency).

3. **Graph-Enhanced Generation**: converting retrieved graph data into LM-compatible formats and generating output. Graph data must be serialised as natural language, adjacency tables, code-like formats, or syntax trees — each with different trade-offs in verbosity, structural preservation, and model compatibility.

## Advantages Over Vector-Based RAG

Traditional text-based [[retrieval-augmented-generation]] has three limitations that GraphRAG addresses ([[summary-Peng_2024_graph-retrieval-augmented-generation-survey|Peng et al., 2024]]): (1) it neglects relationships between entities that cannot be captured by embedding similarity, (2) concatenating retrieved text passages produces redundant context contributing to the "lost in the middle" problem, and (3) text RAG retrieves from local document subsets, failing to synthesise global information.

Two specific advantages are most relevant for safety-critical applications:

1. **Relational structure preservation**: the connection between a safety function, its implementing system, and its regulatory limits is explicit in the graph, not implicit in embedding proximity. Graph traversal follows defined relationships; vector similarity may find related-seeming but structurally unrelated content.

2. **Constraint checking**: beyond retrieval, a KG can verify whether the model's claims are consistent with known domain structure. Assertions that contradict verified knowledge can be flagged or blocked before reaching the user.

[[summary-Edge_2024_from-local-to-global-graph-rag-query-focused-summarization|Edge et al. (2024)]] demonstrate that graph-structured retrieval outperforms vector-only RAG for tasks requiring relational reasoning.

## The Guardrail Function

The guardrail mechanism works as follows:

1. **Entity extraction** identifies entities and relationships in the model's generated output
2. **KG query** checks whether those entities exist in the graph and whether asserted relationships are consistent with stored knowledge
3. **Validation** blocks or flags assertions that contradict the graph or reference unknown entities

This guardrail has its own failure modes:

- **Imperfect extraction**: the entity extraction algorithm may miss entities or misidentify relationships
- **Partial matches**: ambiguous assertions may be falsely accepted or falsely rejected
- **Incompleteness**: if the graph does not cover a topic, all assertions about it are flagged as unfounded
- **Staleness**: outdated entries produce incorrect constraints

The guardrail is itself a component requiring validation and maintenance. It reduces [[hallucination]] risk rather than eliminating it.

## Context Graphs

Xu et al. (2024) extend the triple structure with **quadruples**: (head entity, relation, tail entity, relation-context). The context field carries temporal validity (when does this fact expire?), provenance (where did it come from?), confidence (how certain is it?), and event metadata.

The distinction: a standard KG captures static domain semantics (what is true about the domain), while a context graph captures dynamic operational state (what the system currently believes, when it came to believe it, and how confident it is). In operational settings where data currency matters, context graphs allow agents to query for the most current, most confident information.

## Engineered vs Emergent Knowledge Structures

KGs as described above are **engineered**: domain experts define an ontology, populate it with verified facts, and the structure constrains agent reasoning. This works well for formal knowledge (regulatory requirements, equipment relationships, procedure logic).

But operational knowledge also includes **experiential** patterns: which combinations of minor deviations precede specific problems, how equipment behaves differently from its nominal model, which alarm sequences are benign versus requiring attention. This knowledge grows through observation and cross-referencing, not through schema design — an emergent linking process.

For comprehensive knowledge grounding, both structures are needed: the engineered KG for formal constraints, and an emergent knowledge layer for experiential patterns. The emergent layer cannot replace the engineered layer for safety-critical constraint checking, but the engineered layer cannot replace the emergent layer for the pattern recognition that experienced operators perform.

## Cross-Domain Example: Regulatory Compliance

In any regulated domain, the regulatory framework has a natural graph structure:

- Aviation: aircraft type certificates → approved limitations → maintenance requirements → airworthiness directives
- Medical: treatment protocols → contraindications → drug interactions → patient conditions
- Oil and gas: well integrity standards → barrier requirements → test intervals → acceptance criteria
- Nuclear: general design criteria → technical specifications → limiting conditions → required actions

Encoding these relationships as a knowledge graph enables constraint checking that vector-based RAG cannot provide: the system can verify that a recommended action is consistent with the regulatory structure, not just that it sounds similar to something in the document store.

## Relevance to Safety-Critical Systems

1. **KGs provide hard constraints where RAG provides soft grounding.** RAG makes relevant information available; KGs enforce consistency with verified domain structure. Both are needed.

2. **Maintenance is a safety function.** A stale or incomplete knowledge graph produces incorrect constraints. Graph maintenance must be treated with the same rigour as procedure maintenance in regulated domains.

3. **Graph + LLM is more robust than either alone.** The LLM handles contextual reasoning and natural language; the KG handles structural consistency and constraint enforcement. Each compensates for the other's weaknesses.
