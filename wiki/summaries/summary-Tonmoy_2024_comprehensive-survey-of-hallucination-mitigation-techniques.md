---
title: "Summary: A Comprehensive Survey of Hallucination Mitigation Techniques in Large Language Models"
type: summary
sources:
  - raw/references/Tonmoy_2024_comprehensive-survey-of-hallucination-mitigation-techniques.pdf
related:
  - "[[hallucination]]"
  - "[[retrieval-augmented-generation]]"
  - "[[knowledge-graphs]]"
  - "[[self-correction-limitations]]"
  - "[[calibration-and-confidence]]"
  - "[[inference-and-generation]]"
tags:
  - hallucination
  - mitigation
  - survey
  - rag
  - decoding
  - fine-tuning
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# A Comprehensive Survey of Hallucination Mitigation Techniques in Large Language Models

Tonmoy et al. (2024) survey over thirty-two techniques developed to mitigate hallucination in LLMs, organising them into a detailed taxonomy based on whether they modify the model itself or operate through prompting strategies. The survey provides a systematic comparison across dataset utilisation, common tasks, feedback mechanisms, and retriever types.

## Taxonomy of Mitigation Approaches

The survey divides hallucination mitigation into two broad categories:

### Prompt Engineering (no model modification)

**Retrieval-Augmented Generation (RAG)** is the most extensively covered family, with techniques operating at different points in the generation pipeline:
- *Before generation*: Systems like LLM-Augmenter retrieve external knowledge and use feedback-generated utility functions to improve responses iteratively. FreshLLMS refreshes models with search engine augmentation for time-sensitive queries.
- *During generation*: Knowledge Retrieval (Varshney et al., 2023) detects and mitigates hallucinations in real-time by validating low-confidence generations. EVER employs a stepwise generation-verification-rectification cycle.
- *After generation*: RARR (Researching and Revising What Language Models Say) automates the attribution process through fact-checking and post-editing to align content with retrieved evidence.
- *End-to-end*: Full RAG pipelines combining pre-trained retriever-generator architectures.

**Self-refinement through feedback and reasoning** covers techniques where LLMs evaluate and correct their own outputs. Notable approaches include: "Prompting GPT-3 to Be Reliable" (which decomposes reliability into four facets — generalizability, social biases, calibration, and factuality); ChatProtect (detecting and addressing self-contradictions); Self-Reflection Methodology (iterative knowledge acquisition and answer refinement); and Structured Comparative (SC) Reasoning (generating structured comparisons to reduce hallucination in text preference prediction). A key limitation is that [[self-correction-limitations|intrinsic self-correction without external feedback tends to degrade rather than improve performance]].

**Prompt tuning** includes UPRISE (universal prompt retrieval for zero-shot evaluation) and SynTra (synthetic task-based training to reduce hallucination in summarisation).

### Model Development (modifying the model)

**New decoding strategies** intervene during token generation:
- *Context-Aware Decoding (CAD)*: Amplifies the difference between output distributions with and without context, making the model more faithful to provided information.
- *Decoding by Contrasting Layers (DoLa)*: Contrasts logit differences between later and earlier transformer layers to surface factual knowledge localised in specific layers, reducing hallucination without external knowledge or fine-tuning.
- *Inference-Time Intervention (ITI)*: Identifies attention heads with high linear probing accuracy for truthfulness and shifts activations during inference.

**Knowledge graph utilisation** grounds generation in structured knowledge. RHO uses KGs for open-domain dialogue; FLEEK retrieves external evidence for fact verification and correction.

**Faithfulness-based loss functions** modify the training objective: information-theoretic approaches reduce text hallucination in video-grounded dialogue; weighted-loss approaches address multilingual summarisation hallucination.

**Supervised fine-tuning (SFT)** trains models on curated factual data: HALO uses hallucination-specific metrics; fine-tuning for factuality uses Direct Preference Optimisation; BEINFO applies behavioural fine-tuning for information-seeking dialogue; R-Tuning teaches models to refuse unknown questions; HAR (Hallucination Augmented Recitations) creates counterfactual datasets to enhance attribution.

## Key Limitations Identified

The survey identifies recurring limitations across mitigation techniques: computational cost (many techniques multiply inference time); dependence on retrieval quality (RAG-based methods inherit retriever limitations — a point also made in [[retrieval-augmented-generation|RAG failure analysis]]); evaluation metric gaps (no single metric captures all aspects of hallucination); and domain specificity (techniques effective in open-domain QA may fail in medical or legal contexts where factual precision has higher stakes).

## Relevance to Safety-Critical Systems

For safety-critical applications, the survey's taxonomy maps directly to the [[hallucination]] mitigation strategy space: RAG addresses knowledge currency and grounding; self-refinement addresses output verification; decoding strategies address the generation mechanism itself; and SFT addresses the model's baseline factuality. No single technique eliminates hallucination — defence in depth combining multiple approaches at different stages of the pipeline is the emerging best practice. The survey also highlights that many techniques trade hallucination reduction for increased latency, creating a tension with time-critical operational contexts.
