---
title: "Hallucination"
type: failure-mode
sources:
  - raw/references/Huang_2023_survey-on-hallucination-in-large-language-models.pdf
  - raw/references/Ji_2023_survey-of-hallucination-in-natural-language-generation.pdf
  - raw/references/Zhang_2023_sirens-song-in-the-ai-ocean-survey-on-hallucination-in-llms.pdf
  - raw/references/Tonmoy_2024_comprehensive-survey-of-hallucination-mitigation-techniques.pdf
  - raw/references/Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection.pdf
  - raw/references/Dokas_2025_from-hallucinations-to-hazards.pdf
related:
  - "[[calibration-and-confidence]]"
  - "[[retrieval-augmented-generation]]"
  - "[[knowledge-graphs]]"
  - "[[automation-bias]]"
  - "[[llm-architecture]]"
  - "[[summary-Huang_2023_survey-on-hallucination-in-large-language-models]]"
  - "[[summary-Ji_2023_survey-of-hallucination-in-natural-language-generation]]"
  - "[[summary-Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection]]"
  - "[[summary-Tonmoy_2024_comprehensive-survey-of-hallucination-mitigation-techniques]]"
  - "[[summary-Zhang_2023_sirens-song-in-the-ai-ocean-survey-on-hallucination-in-llms]]"
  - "[[self-correction-limitations]]"
  - "[[inference-and-generation]]"
tags:
  - hallucination
  - reliability
  - failure-mode
  - fabrication
  - safety
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Hallucination

Hallucination refers to LLM output that is fluent, confident, and factually incorrect. It is the most widely discussed failure mode of LLMs and the one with the most direct safety implications for advisory systems in complex work domains.

## Types of Hallucination

[[summary-Huang_2023_survey-on-hallucination-in-large-language-models|Huang et al. (2024)]] provide the most comprehensive taxonomy, distinguishing two primary categories (see also Ji et al., 2023; Zhang et al., 2023):

### Factuality Hallucination
The output contradicts verifiable real-world facts:

- **Factual contradiction**: the model states something provably wrong — either an *entity error* (naming the wrong entity, e.g., attributing an invention to the wrong person) or a *relation error* (asserting the wrong relationship between entities)
- **Factual fabrication**: the model generates claims that cannot be verified (*unverifiability hallucination* — citing nonexistent documents, inventing data points) or states subjective claims as if universally accepted (*overclaim hallucination*)

### Faithfulness Hallucination
The output is unfaithful to the user's instructions or provided context:

- **Instruction inconsistency**: the output deviates from the user's directive (e.g., performing a different task than requested)
- **Context inconsistency**: the output contradicts information explicitly provided in context — particularly relevant for [[retrieval-augmented-generation]], where the model may contradict the very documents it was given
- **Logical inconsistency**: internal contradictions within the output's own reasoning chain (e.g., calculating a value correctly in one step, then using a different value in the next)

The distinction matters for safety-critical applications: factuality hallucination creates *wrong information* that could mislead decisions, while faithfulness hallucination means the system *ignores its own context or instructions* — a different failure mode requiring different detection strategies.

### Intrinsic vs Extrinsic Hallucination

An orthogonal taxonomy from [[summary-Ji_2023_survey-of-hallucination-in-natural-language-generation|Ji et al. (2023)]] distinguishes hallucination by its relationship to source material:

- **Intrinsic hallucination**: the output **contradicts** the source content — always erroneous and detectable by comparison with the source
- **Extrinsic hallucination**: the output **cannot be verified** from the source — it may draw on valid world knowledge or may be fabricated, but is unverifiable from the given context

This distinction is important because different applications have different hallucination tolerances. Advisory systems in safety-critical domains require strict source faithfulness (low tolerance for both types), while conversational interfaces may tolerate extrinsic hallucination that enriches responses with relevant background knowledge. The hallucination tolerance should be an explicit design parameter, not an implicit system property.

## Causes: A Three-Source Framework

[[summary-Huang_2023_survey-on-hallucination-in-large-language-models|Huang et al. (2024)]] map hallucination causes to three stages of the LLM lifecycle:

### Causes from Data
- **Misinformation in training corpora**: the model memorises false information present in web-scraped training data, reproducing it as confident fact
- **Knowledge boundary**: [[summary-Kandpal_2023_large-language-models-struggle-to-learn-long-tail-knowledge|Kandpal et al. (2023)]] established a **causal** relationship between training data frequency and accuracy — BLOOM-176B accuracy jumps from 25% to 55% as relevant pre-training documents increase from 10¹ to 10⁴. Rare, specialised knowledge is systematically underrepresented. Knowledge also becomes outdated (training cutoff) and copyright restrictions create gaps
- **Inferior alignment data**: SFT on new factual knowledge actually *encourages* fabrication — models learn to generate beyond their knowledge boundary rather than refusing, because the training data rewards completion over refusal

### Causes from Training
- **Pre-training**: exposure bias and attention dilution across long sequences create structural vulnerability to errors that compound token by token (the "snowball effect")
- **SFT**: models trained to always produce complete, helpful responses learn to fabricate when they lack knowledge. The inability to refuse is a trained behaviour, not an architectural limitation
- **RLHF**: the preference model rewards confident, agreeable responses, creating [[sycophancy]] and systematic overconfidence. See [[calibration-and-confidence]]

### Causes from Inference
- **Decoding strategy**: higher temperature increases hallucination risk by sampling lower-probability tokens from the distribution tail. See [[inference-and-generation]]
- **Over-confidence**: each token is conditioned on previous tokens, including potentially hallucinated ones, creating a compounding error where early mistakes propagate through the entire generation
- **Reasoning failure**: including the "Reversal Curse" (the model can answer "A is B" but fails on "B is A"), demonstrating that LLM knowledge is directional, not symmetric

## The Confidence-Without-Correctness Problem

The most dangerous property of hallucination for safety-critical use: LLMs produce fluent, well-structured, assured text regardless of the accuracy of the underlying content. A hallucinated assessment reads exactly like a correct one. There is no surface-level cue — no hesitation marker, no visible uncertainty — that distinguishes a correct analysis from a confident fabrication.

An operator reading an AI-generated assessment cannot tell from the text alone whether it is right. This directly creates risk for [[automation-bias]]: the operator accepts a confident wrong answer because it appears authoritative.

## Empirical Rates

Hallucination rates on grounded summarisation have fallen to 1–2% on short documents but persist at 10–12% on longer, more complex documents (as of 2026). In safety-critical domains specifically, benchmarks for hazard identification found that no model surpassed 70% accuracy. The pattern is consistent: substantial improvement on well-structured tasks, persistent significant failure rates on complex, multi-step, or safety-critical applications.

The trajectory matters: hallucination rates decrease with model scale and improved training, but hallucination as a phenomenon does not disappear. The structural causes (statistical prediction without truth grounding, distributional gaps, the confidence-without-correctness property) persist across model generations.

## Mitigation Approaches

[[summary-Tonmoy_2024_comprehensive-survey-of-hallucination-mitigation-techniques|Tonmoy et al. (2024)]] survey over thirty-two mitigation techniques and organise them into a taxonomy with two main branches: prompt engineering (no model modification) and model development (modifying weights or decoding).

### Prompt Engineering Approaches

**[[retrieval-augmented-generation]]** is the most extensively developed family. Techniques operate at different points in the generation pipeline: before generation (retrieving knowledge upfront), during generation (validating low-confidence outputs in real time), after generation (fact-checking and post-editing with retrieved evidence), and end-to-end (integrated retriever-generator architectures). RAG reduces hallucination by grounding generation in retrieved documents, but inherits retriever limitations — wrong or irrelevant retrieved content can introduce new errors.

**Self-refinement through feedback and reasoning** has the model evaluate and correct its own outputs. Approaches include decomposing reliability into facets (generalizability, social biases, calibration, factuality), detecting self-contradictions, and iterative knowledge acquisition. A critical limitation is that [[self-correction-limitations|intrinsic self-correction without external feedback tends to degrade rather than improve performance]] — the model cannot reliably detect its own hallucinations without external grounding.

**Prompt tuning** uses automatically retrieved prompts or synthetic training tasks to reduce hallucination in specific task types (e.g., summarisation).

### Model Development Approaches

**New decoding strategies** intervene during token generation. Context-Aware Decoding (CAD) amplifies the difference between output distributions with and without context, making the model more faithful to provided information. Decoding by Contrasting Layers (DoLa) contrasts logit differences between later and earlier transformer layers to surface factual knowledge localised in specific layers. Inference-Time Intervention (ITI) shifts attention head activations toward truthfulness during inference. These approaches require no external knowledge or fine-tuning but add computational cost.

**[[knowledge-graphs]]** ground generation in structured knowledge. A guardrail check verifies whether the model's output is consistent with the knowledge graph before the output reaches the user.

**Faithfulness-based loss functions** modify the training objective to penalise hallucination directly, using information-theoretic approaches or weighted losses across multiple evaluation dimensions.

**Supervised fine-tuning** trains models on curated factual data. R-Tuning teaches models to refuse unknown questions rather than fabricate answers. HAR (Hallucination Augmented Recitations) creates counterfactual datasets to enhance source attribution. Fine-tuning for factuality uses Direct Preference Optimisation to align outputs with verified facts.

### Detection Without Mitigation

**Consistency checking** across multiple generations can flag unreliable outputs. [[summary-Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection|SelfCheckGPT (Manakul et al., 2023)]] demonstrated that sampling multiple stochastic responses and measuring their agreement provides a strong hallucination signal: factual claims produce consistent samples, while hallucinated claims produce divergent ones. This zero-resource approach requires no external database and outperformed grey-box methods (token probabilities) on passage-level factuality ranking — achieving 78.32 Pearson correlation with human judgments. The method converts [[non-determinism-and-reproducibility]] from a liability into a detection feature.

**Structured output constraints** restrict the space of possible outputs (JSON schemas, typed fields), eliminating some formatting-level fabrication. But a model can produce a perfectly valid JSON object containing entirely fabricated values — the structure is correct while the content is not.

### The Defence-in-Depth Principle

No single technique eliminates hallucination. The survey demonstrates that effective mitigation combines multiple approaches at different stages of the pipeline — retrieval grounding, self-verification, decoding constraints, and output validation. Each layer catches failures that others miss. Many techniques also trade hallucination reduction for increased latency, creating tension with time-critical operational contexts where response speed matters.

## Relevance to Safety-Critical Systems

1. **Hallucination is not a bug to be fixed — it is a property of the architecture.** Any system design that assumes AI output is correct by default is fundamentally flawed.

2. **Detection is harder than prevention.** Because hallucinated output is fluent and confident, operators cannot reliably detect it without independent verification. System design must assume hallucination will occur and provide verification mechanisms.

3. **Compounding in agent loops.** When an agent hallucinates a fact, subsequent reasoning steps that depend on that fact compound the error. In multi-step tool-calling chains, a single hallucinated parameter can cascade through several steps. See [[tool-calling]].

4. **Domain-specific risk.** Hallucination is most likely precisely in the situations where it is most dangerous: rare events, novel conditions, and topics underrepresented in training data. The model is least reliable when the operational situation is most unusual.

5. **Cross-domain examples.** In aviation, a hallucinated weather report could inform incorrect routing decisions. In medical settings, a fabricated drug interaction could reach a clinician's decision support display. In oil and gas, a hallucinated pressure reading in a wellbore analysis could mask a developing kick. The common thread is that the hallucinated output appears indistinguishable from correct output.
