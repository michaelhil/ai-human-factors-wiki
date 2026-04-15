---
title: "Inference and Generation"
type: foundation
sources:
  - raw/references/Phuong_2022_formal-algorithms-for-transformers.pdf
  - raw/references/Dettmers_2024_qlora-efficient-finetuning-of-quantized-language-models.pdf
  - raw/references/Frantar_2023_gptq-accurate-post-training-quantization.pdf
  - raw/references/Kwon_2023_paged-attention-for-llm-serving.pdf
  - raw/references/Wei_2022_chain-of-thought-prompting-elicits-reasoning-in-large-language-models.pdf
  - raw/references/Jiang_2023_llmlingua-compressing-prompts-for-accelerated-inference.pdf
related:
  - "[[llm-architecture]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[context-windows]]"
  - "[[deployment-local-vs-cloud]]"
tags:
  - inference
  - generation
  - sampling
  - temperature
  - quantisation
  - structured-output
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Inference and Generation

Inference is the process by which an LLM produces output. Understanding the mechanics of generation — sampling, temperature, structured output, and optimisation techniques — is essential for safety professionals because these mechanics directly determine the properties of AI advisory output: its variability, latency, and the degree to which it can be constrained.

## Token-by-Token Generation

At inference time, the model takes a sequence of tokens (the context) and produces a probability distribution over possible next tokens. It samples from this distribution, appends the selected token to the context, and repeats until a stopping condition is reached (a special stop token, a maximum length, or an external signal).

This is an autoregressive process: each token is generated conditioned on all previous tokens. The output is built one piece at a time, with each piece influencing what comes next. This means that an error early in generation (a wrong fact, a misidentified entity) propagates — all subsequent tokens are conditioned on the erroneous token, compounding the initial mistake.

## Sampling and Temperature

The **temperature** parameter controls how the model selects from the probability distribution:

- **Temperature 0 (greedy decoding)**: always select the highest-probability token. Produces the most deterministic output, though floating-point non-associativity in parallel GPU computation can introduce small variations even at temperature zero.
- **Low temperature (0.1–0.3)**: strongly favour high-probability tokens. Output is relatively consistent across runs but still has some variation.
- **Medium temperature (0.3–0.7)**: balance between consistency and variety. Typical for production deployments.
- **High temperature (0.7–1.0+)**: more randomness, more creative/varied output. Higher risk of incoherent or unexpected responses.

For safety-critical applications, lower temperatures reduce output variability but do not eliminate it. See [[non-determinism-and-reproducibility]].

**Top-p (nucleus) sampling** is a complementary control: instead of sampling from the full distribution, sample only from the smallest set of tokens whose cumulative probability exceeds a threshold p. This dynamically adjusts the candidate set — narrow when the model is confident, broader when it is uncertain.

## Chain-of-Thought Prompting

**Chain-of-thought (CoT) prompting** augments standard few-shot exemplars with intermediate reasoning steps, enabling LLMs to decompose multi-step problems into sequential natural language reasoning ([[summary-Wei_2022_chain-of-thought-prompting-elicits-reasoning-in-large-language-models|Wei et al., 2022]]). Rather than providing only input-output pairs as demonstrations, CoT exemplars show the reasoning trace that connects question to answer.

CoT prompting is an **emergent ability** tied to model scale: it only produces performance gains in models with approximately 100 billion parameters or more. Smaller models generate illogical chains that actually degrade performance compared to standard prompting. This scale dependence is relevant to [[capability-gradient]] assessment — the same prompting strategy can produce radically different outcomes depending on model size, and benefits cannot be extrapolated downward from large-model results.

The technique requires no model finetuning or architectural changes — it operates purely through prompt design. Ablation studies confirmed that the natural language decomposition is the key mechanism: outputting only equations, allocating equivalent computation without reasoning steps, or placing the reasoning after the answer all failed to replicate CoT's gains.

**Limitations for safety-critical use.** Error analysis of CoT outputs revealed that roughly half of incorrect chains contained only minor errors (calculation mistakes, one missing step), while the other half had major semantic or coherence failures. A plausible-looking chain of thought is not a guarantee of correct reasoning. This directly connects to [[calibration-and-confidence]] — CoT traces can create a false sense of auditability if reviewers assume that a coherent-looking derivation is necessarily correct.

## Reasoning Models and Extended Thinking

A class of models introduced from late 2024 onwards (OpenAI's o-series, Anthropic's Claude with extended thinking) builds on the chain-of-thought paradigm by internalising reasoning into the model's generation process. Rather than requiring CoT exemplars in the prompt, these models first work through the problem step by step in a "thinking" phase before producing a final answer.

**Advantages**: measurably more accurate on complex analytical tasks (multi-step diagnosis, mathematical reasoning, procedural compliance checking). The reasoning chain supports auditability — reviewers can inspect where analysis went wrong.

**Shifted failure modes**: a reasoning model can produce a confident wrong answer with a plausible-looking derivation, where the reasoning steps appear rigorous but contain a subtle error — the same pattern identified in CoT prompting research but now occurring without explicit prompting. These failures are harder to detect precisely because the surrounding analysis looks competent. The reasoning chain can also be long (thousands of tokens), consuming [[context-windows]] budget and adding latency.

**Latency cost**: reasoning models take 10–60 seconds per query (versus 1–10 seconds for standard models), making them unsuitable for time-critical applications but valuable for analytical tasks where thoroughness matters more than speed.

## Structured Output and Constrained Generation

LLMs can be constrained to produce output in specific formats:

- **JSON mode** restricts output to valid JSON
- **Function calling schemas** define expected structure for [[tool-calling]] invocations
- **Grammar-constrained decoding** enforces a formal grammar at the token-sampling level, rejecting tokens that would produce syntactically invalid output before they are selected

These mechanisms reduce certain [[hallucination]] modes by restricting the space of possible outputs. A model constrained to produce valid JSON with a defined schema cannot hallucinate free-text narrative where structured data is expected. For tool calling, schema enforcement ensures well-formed invocations rather than malformed strings.

However, constrained generation is not a complete solution to output reliability. The model can produce a perfectly valid JSON object containing entirely fabricated values. The structure is correct; the content may not be.

## Inference Optimisation

Several techniques reduce inference latency and cost, directly relevant to advisory system design:

**Speculative decoding** uses a small, fast draft model to propose token sequences, which the larger target model verifies in a single forward pass. Achieves 2–3x faster inference with no quality change. Integrated into production serving frameworks (vLLM, TensorRT-LLM) as of 2026.

**Quantisation** reduces model precision from 16-bit to 8-bit or 4-bit representations. Techniques such as GPTQ (Frantar et al., 2023) and QLoRA (Dettmers et al., 2024) enable 70-billion-parameter models to run on hardware that would otherwise require significantly more GPU memory. Quality trade-off: 4-bit quantisation typically produces 5–15% degradation on reasoning benchmarks, concentrated in tasks requiring fine numerical discrimination.

**KV-cache optimisation** (PagedAttention in vLLM; Kwon et al., 2023) reduces memory overhead per request, allowing more concurrent requests on the same hardware. Most relevant for multi-agent systems where several agents issue inference requests simultaneously.

**Continuous batching** processes multiple concurrent requests in shared GPU batches rather than sequentially, improving aggregate throughput for multi-user or multi-agent deployments.

## Relevance to Safety-Critical Systems

1. **Autoregressive generation means errors compound.** An early mistake in a response propagates through all subsequent tokens. There is no "rollback" mechanism within a single generation pass.

2. **Temperature is a design parameter, not just a setting.** Lower temperatures improve reproducibility but may miss important alternative interpretations. Higher temperatures produce variety but reduce consistency. The choice depends on the application: monitoring tasks may benefit from lower temperatures, while diagnostic tasks exploring multiple hypotheses may benefit from higher temperatures with multiple samples.

3. **Structured output helps with format, not with content.** Schema constraints prevent malformed outputs but cannot prevent semantically incorrect ones. A well-formed JSON object with fabricated values is still a [[hallucination]].

4. **Latency is safety-relevant.** For time-critical applications (alarm response, emergency diagnosis), inference speed constrains which model types and optimisation strategies are viable. Reasoning models may be too slow for real-time advisory but appropriate for post-event analysis.
