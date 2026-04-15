---
title: "Deployment: Local vs Cloud"
type: safety
sources:
  - raw/references/Dettmers_2024_qlora-efficient-finetuning-of-quantized-language-models.pdf
  - raw/references/Frantar_2023_gptq-accurate-post-training-quantization.pdf
  - raw/references/Kwon_2023_paged-attention-for-llm-serving.pdf
related:
  - "[[opacity-and-explainability]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[llm-architecture]]"
  - "[[inference-and-generation]]"
tags:
  - deployment
  - local
  - cloud
  - open-weight
  - safety
  - cybersecurity
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Deployment: Local vs Cloud

The choice between local and cloud deployment carries different risk properties for safety-critical applications. This is not merely an infrastructure decision — it affects auditability, reproducibility, independence, and regulatory compliance.

## Cloud API Deployment

The model runs on the provider's infrastructure, accessed over a network.

**Advantages:** No hardware investment. Access to the most capable frontier models. Provider handles infrastructure maintenance.

**Disadvantages:**
- Network latency adds variability to response time
- Availability depends on provider and network
- Model versions may change without notice (the provider updates the model behind the API, potentially changing behaviour without the operator's knowledge)
- Operational data transits external networks, raising cybersecurity and data sovereignty concerns
- Air-gapped deployment is not possible
- Subject to the [[opacity-and-explainability]] double opacity problem

## Local Deployment

The model runs on operator-owned or operator-controlled infrastructure.

**Advantages:**
- Response time has deterministic bounds (no network variability)
- Model versions can be pinned (critical for V&V and regulatory reproducibility)
- System can operate air-gapped with no external network connection
- No operational data leaves the facility
- Full prompt transparency — no hidden system prompts, no invisible filtering
- Complete control over configuration management

**Disadvantages:**
- Significant hardware investment
- Models may be smaller or quantised, with lower capability than cloud equivalents
- Operator responsible for all maintenance, updates, and monitoring

## The Capability Gap Is Narrowing

Hardware requirements for running capable models locally have decreased rapidly. Quantisation techniques (Dettmers et al., 2024; Frantar et al., 2023) allow large models to run on modest hardware with minimal quality degradation. Efficient serving frameworks (Kwon et al., 2023) improve throughput and memory management. As of 2026, running a capable LLM on a single high-end server is feasible, though frontier-scale models still require significant infrastructure.

The quality trade-off of 4-bit quantisation is typically 5–15% degradation on reasoning benchmarks, concentrated in tasks requiring fine numerical discrimination rather than natural language reasoning. For applications where the LLM's role is contextual reasoning (with numerical precision handled by purpose-built tools), this trade-off may be acceptable.

## Open-Weight vs Proprietary

A separate axis from local vs cloud:

- **Open-weight models** (Llama, Mistral, Qwen, DeepSeek) release trained weights publicly. Anyone can download, inspect, and run them locally. They can be fine-tuned on domain-specific data and inspected for systematic biases.
- **Proprietary models** (GPT-4, Claude) do not release weights.

"Open-weight" does not mean "open-source" — training data and the full training process are typically not released. But the combination of open-weight models and local deployment provides the strongest transparency and auditability: weights are inspectable, prompts are fully controlled, no provider-side processing occurs.

## Implications for Independence

If a multi-agent architecture uses two agents for independent verification and both access the same frontier API, they share the provider's hidden system prompt, the same invisible preprocessing, and the same output filtering logic. A provider-side change affects both agents simultaneously, creating a common-cause failure pathway through shared hidden infrastructure. This is distinct from model-level monoculture: even agents using different model families from the same provider may share hidden system instructions.

Local deployment with independently sourced models eliminates both the model-level and infrastructure-level common-cause pathways.

## Implications for Configuration Management

Frontier APIs use model aliases that may point to different checkpoints over time. The developer may not receive notice of changes. For applications where AI behaviour is part of the safety case, silent model changes are incompatible with configuration management requirements in regulated industries.

Local deployment resolves this: model weights are a file on disk that does not change unless explicitly updated through the operator's change management process.

## Latency Considerations

Standard LLM inference takes 1–10 seconds depending on model size and query complexity. Reasoning models take 10–60 seconds. For time-critical applications (alarm response, emergency diagnosis), latency requirements constrain which model types are usable. Response time must be specified as a system requirement and validated under representative load conditions.

## Relevance to Safety-Critical Systems

1. **Local-first for regulated domains.** For applications subject to cybersecurity requirements, data sovereignty concerns, or configuration management mandates, local deployment is likely the only viable production path.

2. **Cloud is appropriate for prototyping.** Early exploration and evaluation (prototyping levels 0–1) can use cloud APIs productively. Production deployment should transition to local.

3. **Cross-domain examples.** In aviation, data sovereignty for flight data may preclude cloud processing. In medical settings, patient data privacy regulations (HIPAA, GDPR) constrain cloud deployment. In oil and gas, well data classification may require on-premise processing. In nuclear, cybersecurity boundaries (10 CFR 73.54 equivalent) may prohibit external network connections.

4. **The open-weight ecosystem is the enabler.** The feasibility of local deployment for safety-critical applications depends on the continued improvement of open-weight models and the quantisation/serving ecosystem.
