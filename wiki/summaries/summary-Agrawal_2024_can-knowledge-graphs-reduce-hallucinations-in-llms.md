---
title: "Summary: Agrawal et al. (2024) — Can Knowledge Graphs Reduce Hallucinations in LLMs? A Survey"
type: summary
sources:
  - raw/references/Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms.pdf
related:
  - "[[knowledge-graphs]]"
  - "[[hallucination]]"
  - "[[retrieval-augmented-generation]]"
  - "[[hybrid-decision-pipeline]]"
tags:
  - knowledge-graph
  - hallucination
  - survey
  - grounding
  - validation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Agrawal et al. (2024) — Can Knowledge Graphs Reduce Hallucinations in LLMs?

**Full citation:** Agrawal, G., Kumarage, T., Alghamdi, Z., and Liu, H. (2024). Can Knowledge Graphs Reduce Hallucinations in LLMs? A Survey. arXiv:2311.07914.

## Key Contribution

This Arizona State University survey comprehensively reviews how knowledge graph (KG) augmentation reduces [[hallucination]] in LLMs. It classifies methods into three categories based on *when* the KG is used (inference, training, or validation), evaluates their empirical efficacy, and identifies the shift from pre-training integration toward inference-time methods that don't require model retraining.

## Three-Category Taxonomy

**1. Knowledge-Aware Inference** — KG used at inference time, no model modification:
- **KG-Augmented Retrieval** (KAPING, StructGPT, Retrieve-Rewrite-Answer): retrieve relevant KG triples and inject into context, similar to [[retrieval-augmented-generation]] but using structured graph traversal rather than vector similarity
- **KG-Augmented Reasoning** (IRCoT, MindMap, RoG): use KG structure to guide multi-step reasoning chains — the model follows graph paths rather than relying on parametric reasoning alone
- **KG-Controlled Generation** (Know-Prompt, KB-Binder, BeamQA, ALCUNA): use KG constraints to bound what the model can generate — the guardrail function described in [[knowledge-graphs]]

**2. Knowledge-Aware Training** — KG integrated into model training:
- **Pre-training**: ERNIE, KALM use KG-guided masking and knowledge fusion during pre-training, embedding structured knowledge into model weights
- **Fine-tuning**: SKILL, KGLM adapt models using KG-structured datasets. More practical than pre-training for domain specialisation

**3. Knowledge-Aware Validation** — KG used post-generation to verify:
- Fact-checking models (Fact-aware LM, SURGE, FOLK) check generated claims against KG structure. This is the verification layer in the [[hybrid-decision-pipeline]] — the KG validates LLM output before it reaches the user

## Key Performance Findings

- **Retrieved facts enhance small models more than scaling**: KG augmentation improves answer correctness by **over 80%** on question-answering tasks, more effective than simply increasing model size
- **Step-wise KG reasoning boosts larger models**: RoG increased ChatGPT's reasoning accuracy from **66.8% to 85.7%** with KG augmentation. MindMap achieved **88.2%** in medical diagnosis with a clinical reasoning graph
- **Controlled generation surpasses baselines** in accuracy and contextual relevance but can vary in quality
- **Fact-checking increases reliability** at the cost of computational overhead — a direct trade-off between verification thoroughness and latency
- **Effectiveness depends on KG quality and coverage** — methods that rely on retrieval are bottlenecked by the completeness and currency of the knowledge graph

## The Trend: Inference-Time Over Training-Time

The survey documents a clear shift (Figure 5): early KG-LLM integration (2019–2021) focused on pre-training with KGs. After the GPT era made retraining frontier models impractical, the field shifted to inference-time methods (retrieval, reasoning, validation) that augment any model without modifying its weights. This trend aligns with the [[retrieval-augmented-generation]] vs fine-tuning comparison — inference-time augmentation is more auditable and updateable than weight-level integration.

## Relevance to This Wiki

This survey provides the empirical evidence behind [[knowledge-graphs]] as a hallucination mitigation strategy. For safety professionals, the key takeaways are: (1) KG augmentation is the most effective single intervention for reducing hallucination, with **80%+ improvement** on QA tasks; (2) the three-category taxonomy maps directly onto the [[hybrid-decision-pipeline]] layers — KG retrieval for context, KG reasoning for analysis, KG validation for output checking; (3) the effectiveness ceiling is set by KG quality and coverage, making knowledge base maintenance a first-order concern for safety-critical applications.
