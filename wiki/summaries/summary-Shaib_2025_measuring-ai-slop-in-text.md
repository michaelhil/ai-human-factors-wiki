---
title: "Summary — Measuring AI Slop in Text"
type: summary
sources:
  - raw/references/Shaib_2025_measuring-ai-slop-in-text.pdf
related:
  - "[[output-vacuity]]"
  - "[[hallucination]]"
  - "[[calibration-and-confidence]]"
  - "[[summary-Kommers_2026_why-slop-matters]]"
tags:
  - slop
  - output-quality
  - measurement
  - taxonomy
  - evaluation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Measuring AI Slop in Text

**Shaib et al. (2025)** — Northeastern University / Stony Brook / Meta AI, preprint

## What the Paper Does

This paper provides the first systematic attempt to define and measure "slop" in LLM-generated text. Through expert interviews (19 professionals in NLP, writing, journalism, and philosophy) and span-level annotation of over 150 news articles and 100 QA passages, the authors develop a taxonomy of slop indicators and evaluate whether automated methods can detect them.

## Slop Taxonomy

The taxonomy organises slop indicators into three themes with seven codes:

**Information Utility** — how effectively the text conveys meaningful, contextually appropriate information:
- *Density*: the amount of substantive content relative to text length (measurable via information-theoretic token entropy)
- *Relevance*: alignment of content with the task or prompt

**Information Quality** — accuracy and subjectivity of presented information:
- *Factuality*: inaccuracies, hallucinations, or fallacious claims
- *Bias*: presence or absence of subjective or rhetorical perspective

**Style Quality** — properties related to expression and readability:
- *Structure*: repetition (repeated phrases/patterns) and templateness (favoured syntactic structures)
- *Coherence*: logical flow and consistency
- *Tone*: appropriateness of language register, including fluency (naturalness), verbosity (passage/sentence length), word complexity, and formality

## Key Findings

**Slop judgements are somewhat subjective but track latent quality dimensions.** Annotators assigned "slop" labels to 34% of texts on average. Inter-annotator agreement on the binary slop label was fair (Gwet's AC₁ = 0.12–0.42), but agreement on individual codes was moderate to good for factuality (AC₁ = 0.76), bias (0.67), and structure (0.51).

**Relevance, density, and tone are the strongest predictors.** Logistic regression across all annotations shows that all seven codes significantly predict the binary slop label, with relevance, density, and tone contributing most strongly. Importantly, the relative weight of features varies by domain — factuality and structure dominate in QA tasks, while style and utility issues dominate in news articles.

**Standard text metrics fail to capture slop.** Of the five taxonomy codes that significantly predict human slop judgements, three (relevance, coherence, and tone) lack adequate automatic measurements. Linear models using available metrics achieve AUPRC of only 0.52–0.55 (against a 25–27% prevalence baseline).

**LLMs cannot reliably self-identify slop.** When prompted to identify slop in text, GPT-5, DeepSeek-V3, and o3-mini achieve near-zero Cohen's κ agreement with human annotators. LLMs under-predict slop (labelling only 3–8% as slop versus humans' 35%), and when they do flag text, they focus disproportionately on density-related issues while under-representing coherence, tone, bias, relevance, and factuality problems.

## Relevance to This Wiki

This paper provides empirical grounding for the [[output-vacuity]] failure mode. The finding that slop features vary by domain is directly relevant to safety-critical applications: what constitutes slop in a regulatory QA task (factual errors, structural repetition) differs from what constitutes slop in a diagnostic advisory context (irrelevant information, inappropriate tone). The inability of LLMs to detect their own slop is particularly concerning — it means LLM-as-judge approaches, increasingly used for quality evaluation, have a systematic blind spot for exactly the kind of low-quality output that erodes user trust. For system design, this reinforces that slop detection requires human-in-the-loop evaluation or domain-specific metrics rather than relying on automated quality assessment. The taxonomy's three themes (information utility, information quality, style quality) provide a concrete framework for designing specificity metrics mentioned in the [[output-vacuity]] mitigation strategies.
