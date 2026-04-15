---
title: "Summary: Barnett et al. (2024) — Seven Failure Points When Engineering a RAG System"
type: summary
sources:
  - raw/references/Barnett_2024_seven-failure-points-in-rag-systems.pdf
related:
  - "[[retrieval-augmented-generation]]"
  - "[[hallucination]]"
  - "[[context-windows]]"
  - "[[capability-gradient]]"
tags:
  - rag
  - failure-points
  - engineering
  - case-study
  - retrieval
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Barnett et al. (2024) — Seven Failure Points in RAG Systems

**Full citation:** Barnett, S., Kurniawan, S., Thudumu, S., Brannelly, Z., and Abdelrazek, M. (2024). Seven Failure Points When Engineering a Retrieval Augmented Generation System. *Proceedings of the 3rd International Conference on AI Engineering — Software Engineering for AI (CAIN 2024)*, ACM.

## Key Contribution

This paper provides an empirical, practitioner-oriented catalogue of failure points in RAG systems, derived from three real-world case studies: a cognitive reviewer for research papers, an AI tutor for university students (200 users, videos/PDFs/HTML), and a biomedical Q&A system (4,017 documents, 1,000 questions from BioASQ). The failure points map the full RAG pipeline from indexing through retrieval to generation, identifying where each failure occurs.

## The Seven Failure Points

**FP1 Missing Content:** The answer simply is not in the knowledge base. In the ideal case, the system responds with "I don't know," but in practice it may be "fooled into giving a response" for questions that are related to the content but not directly answerable from it.

**FP2 Missed Top Ranked Documents:** The answer exists in the store but ranks below the top-K retrieval cutoff. All documents are ranked, but only the top K are returned. Performance depends critically on the K threshold value.

**FP3 Not in Context — Consolidation Strategy Limitations:** Documents were retrieved but did not make it into the generation context. This occurs when too many documents are returned and the consolidation stage must reduce them to fit within token limits or rate limits. The interaction with [[context-windows]] is direct.

**FP4 Not Extracted:** The answer is in the context, but the LLM fails to extract it. Too much noise or contradicting information in the context interferes. This connects to the lost-in-the-middle effect documented in [[context-windows]].

**FP5 Wrong Format:** The question involves structured information (tables, lists, formatted data) that the LLM struggles to process or ignores entirely.

**FP6 Incorrect Specificity:** The response is not at the right level of detail — either too broad (generic background when specifics were needed) or too narrow (specific detail without necessary context). This connects to [[output-vacuity]].

**FP7 Incomplete:** The answer is partially correct but misses information that was available in the context. This is distinct from FP4 (where the answer is entirely missed) — here, the model extracts some but not all relevant information.

## Engineering Lessons from Case Studies

Key practical findings (Table 2 in the paper):

- **Larger context windows improve accuracy** but introduce latency and cost trade-offs
- **Metadata enrichment helps**: adding source filename and chunk number to retrieved context improved the reader's ability to extract correct answers
- **Open-source embedding models outperformed** commercial options on small, domain-specific text
- **Continuous calibration is required**: RAG systems receive unknown inputs at runtime, so performance characteristics change with each new release of the underlying LLM
- **Semantic caching reduces latency** for frequently asked questions but introduces staleness risk
- **RAG pipelines are suboptimal by construction**: they are assembled from independent components (chunker, embedder, retriever, reranker, reader), each optimised separately rather than end-to-end

## Relevance to This Wiki

This paper provides the empirical engineering evidence behind the [[retrieval-augmented-generation]] failure mode catalogue. For safety professionals, the key insight is that RAG failures are not just theoretical possibilities but **observed, categorised problems from deployed systems**. The failure points span the entire pipeline — from what's in the knowledge base (FP1) through how it's retrieved (FP2-3) to how it's used (FP4-7). Each point identifies a specific engineering decision (chunk size, K threshold, consolidation strategy, context window budget) that affects system reliability. The lesson about continuous calibration is particularly relevant for safety-critical applications: RAG performance is not a fixed property but a moving target that must be monitored operationally.
