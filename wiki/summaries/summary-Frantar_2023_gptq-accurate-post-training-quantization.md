---
title: "Summary — GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
type: summary
sources:
  - raw/references/Frantar_2023_gptq-accurate-post-training-quantization.pdf
related:
  - "[[inference-and-generation]]"
  - "[[deployment-local-vs-cloud]]"
  - "[[llm-architecture]]"
  - "[[summary-Dettmers_2024_qlora-efficient-finetuning-of-quantized-language-models]]"
tags:
  - quantisation
  - inference
  - post-training-compression
  - memory-efficiency
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers

**Frantar et al. (2023)** — IST Austria / ETH Zurich, ICLR 2023

## Problem

Inference on the largest publicly available LLMs (OPT-175B, BLOOM-176B) requires multiple high-end GPUs because model parameters alone occupy hundreds of gigabytes in standard 16-bit format. Prior post-training quantization methods either scale poorly to billion-parameter models or only achieve 8-bit compression, which is insufficient to make these models accessible on commodity hardware.

## GPTQ Method

GPTQ builds on the Optimal Brain Quantization (OBQ) framework, which quantises weights one at a time while compensating remaining weights using second-order (Hessian) information. The authors introduce three key modifications that provide over three orders of magnitude speedup:

1. **Arbitrary order insight**: OBQ greedily selects the weight with the lowest quantization error to process next, but the authors show this greedy ordering provides negligible benefit on large layers. Processing all rows in the same fixed column order allows sharing the inverse Hessian computation across rows, reducing complexity from O(d_row · d_col³) to O(max{d_row · d_col², d_col³}).

2. **Lazy batch updates**: Rather than updating the entire weight matrix after each column, GPTQ batches updates in blocks of 128 columns, dramatically improving GPU utilisation by reducing memory-bound operations.

3. **Cholesky reformulation**: Direct iterative updates to the inverse Hessian accumulate numerical errors that cause catastrophic failures on large models. GPTQ pre-computes all needed information via a stable Cholesky decomposition, enabling robust quantization at any scale.

## Key Results

- **Quantises 175B-parameter models in ~4 GPU hours** on a single A100, compared to weeks for prior accurate methods
- **4-bit GPTQ loses only 0.03 perplexity** on OPT-175B relative to the uncompressed baseline, while round-to-nearest (RTN) loses 2.2 points
- **3-bit quantization remains viable**: GPTQ maintains reasonable perplexity where RTN completely collapses (perplexity exceeding 1000+)
- **Larger models are easier to quantize**: the relative accuracy gap between quantized and full-precision models shrinks with scale, consistent with findings in [[summary-Dettmers_2024_qlora-efficient-finetuning-of-quantized-language-models|QLoRA]] and [[summary-Liu_2023_scissorhands-kv-cache-compression|ScissorHands]]
- **Inference speedup of 3.25–4.5x** through custom GPU kernels that exploit compressed memory layout, reducing per-token latency from 589ms to 71–130ms for OPT-175B
- **OPT-175B fits on a single A100 GPU** at 3-bit precision (63 GB model + 9 GB KV cache), where 16-bit requires 5 A100s

## Extreme Quantization

GPTQ demonstrates that even 2-bit quantization (with grouping) produces models with only 1.5 perplexity points above 16-bit baselines on 175B models. Ternary values (-1, 0, +1) achieve less than 1 point perplexity increase on OPT-175B, opening possibilities for specialised hardware implementations.

## Relevance to This Wiki

GPTQ addresses a central question for [[deployment-local-vs-cloud]] planning: what hardware is needed to run a given model? By compressing 175B models from 326 GB (16-bit) to approximately 63 GB (3-bit), GPTQ enables single-GPU deployment of the largest open models. For safety-critical applications, this has two implications. First, local deployment becomes feasible for models that previously required cloud infrastructure, addressing data sovereignty and availability concerns. Second, the finding that larger models compress better means organisations can potentially deploy more capable (and thus more reliable) models on the same hardware budget. However, the paper notes that compression impacts on bias and secondary quality measures remain unstudied — perplexity preservation does not guarantee that safety-relevant capabilities (factual accuracy on rare topics, calibration, instruction following) are equally preserved. The relationship between quantisation and the [[capability-gradient]] of compressed models warrants careful evaluation before deployment in critical systems. GPTQ and [[summary-Dettmers_2024_qlora-efficient-finetuning-of-quantized-language-models|QLoRA]] are complementary: GPTQ compresses for inference, while QLoRA enables finetuning of already-quantized models.
