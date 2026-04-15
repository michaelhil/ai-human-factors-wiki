---
title: "Summary — Efficient Memory Management for Large Language Model Serving with PagedAttention"
type: summary
sources:
  - raw/references/Kwon_2023_paged-attention-for-llm-serving.pdf
related:
  - "[[inference-and-generation]]"
  - "[[context-windows]]"
  - "[[deployment-local-vs-cloud]]"
  - "[[llm-architecture]]"
tags:
  - inference
  - kv-cache
  - memory-management
  - serving
  - throughput
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Efficient Memory Management for Large Language Model Serving with PagedAttention

**Kwon et al. (2023)** — SOSP '23, UC Berkeley / Stanford

## What the Paper Does

The paper identifies that KV cache memory management is the primary bottleneck in LLM serving throughput. Existing systems store each request's KV cache in contiguous GPU memory, pre-allocating space for the maximum possible sequence length. Profiling reveals that only 20–38% of KV cache memory actually stores token states in existing systems — the rest is wasted through three mechanisms: *reservation* (space held for tokens not yet generated), *internal fragmentation* (allocated blocks larger than needed), and *external fragmentation* (unusable gaps between allocations).

## PagedAttention

The authors propose **PagedAttention**, an attention algorithm inspired by operating system virtual memory and paging. Instead of storing each request's KV cache contiguously, PagedAttention partitions it into fixed-size **KV blocks** that can be stored non-contiguously in physical GPU memory. A block table maps logical blocks (per-request) to physical blocks (on GPU), analogous to how OS page tables map virtual to physical addresses. This eliminates the need to pre-allocate contiguous memory for the maximum sequence length.

## vLLM System

Built on PagedAttention, **vLLM** is a complete LLM serving engine featuring:

- **Block-level memory management**: KV blocks allocated on demand as sequences grow, freed immediately upon completion. Internal fragmentation is limited to the last block of each sequence.
- **Copy-on-write sharing**: multiple output sequences from the same prompt (parallel sampling, beam search) share prompt KV blocks. Physical blocks are only copied when a shared block needs modification. This yields 6–10% memory savings for parallel sampling and 38–55% for beam search.
- **Shared prefix caching**: system prompts common across requests are stored once and mapped by all requests sharing that prefix.
- **Preemptive scheduling**: when GPU memory is exhausted, vLLM evicts entire sequences to CPU RAM (swapping) or discards their KV cache for later recomputation, using first-come-first-served fairness.
- **Distributed execution**: supports Megatron-LM style tensor parallelism across multiple GPUs, with a centralised scheduler managing a single logical KV cache manager.

## Key Results

Evaluated on OPT (13B, 66B, 175B) and LLaMA-13B with ShareGPT and Alpaca workloads, vLLM achieves:

- **2–4x higher throughput** than FasterTransformer and Orca at equivalent normalised latency
- **96.3% KV cache utilisation** (versus 20–38% in existing systems)
- Greater improvements with longer sequences, larger models, and complex decoding algorithms (beam search, parallel sampling)
- 20–26% higher attention kernel latency due to block indirection, but this overhead is small relative to overall gains from fitting more requests in memory

## Relevance to This Wiki

For [[deployment-local-vs-cloud]] decisions and [[inference-and-generation]] optimisation, PagedAttention fundamentally changes the hardware requirements for concurrent LLM serving. The 2–4x throughput improvement means the same GPU infrastructure can serve proportionally more concurrent advisory requests or agent interactions. This is particularly significant for multi-agent architectures where several agents issue inference requests simultaneously — memory-efficient serving directly determines how many agents can operate concurrently on shared infrastructure. The system also demonstrates that KV cache management is the binding constraint on serving throughput, not compute — a finding that shapes hardware provisioning decisions for safety-critical deployments where guaranteed response times matter. See [[context-windows]] for the relationship between sequence length and memory pressure.
