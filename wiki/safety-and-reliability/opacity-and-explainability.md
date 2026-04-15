---
title: "Opacity and Explainability"
type: safety
sources:
  - raw/references/Phuong_2022_formal-algorithms-for-transformers.pdf
related:
  - "[[llm-architecture]]"
  - "[[deployment-local-vs-cloud]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[hallucination]]"
tags:
  - opacity
  - explainability
  - safety
  - double-opacity
  - interpretability
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Opacity and Explainability

Why an LLM produced a given output is not determinable from outside the model in the general case. This opacity is a fundamental barrier to incident investigation, regulatory review, and safety assessment.

## Inherent Model Opacity

Current interpretability techniques (attention visualisation, probing classifiers, mechanistic interpretability) provide partial insight into model internals but do not explain individual outputs at the level of "the model recommended X because it observed Y and applied rule Z."

An LLM agent can generate an **explanation** of its reasoning (through chain-of-thought prompting or reasoning models). But this explanation is itself a generated output, subject to the same [[hallucination]] and [[calibration-and-confidence]] concerns as any other output. The model may produce a plausible-sounding explanation that does not accurately represent the computational process that produced its answer. The explanation is a **rationalisation**, not a verified execution trace.

## The Double Opacity Problem

LLMs are already opaque (inherent model opacity). When accessed through frontier APIs, a second layer of opacity is added:

### Layer 1: Model Internals
The transformer's internal reasoning — how weights transform input tokens into output tokens — is not interpretable from outside. This is intrinsic to the architecture.

### Layer 2: Provider Infrastructure
When using cloud APIs, the provider interposes additional processing:

1. **Hidden system prompt injection.** Providers prepend their own system-level instructions before the developer's system prompt. These are not visible to the developer at inference time.

2. **Invisible output filtering.** Provider-side safety layers inspect and may modify or block model outputs before delivery. For domain-specific applications, this means the developer cannot verify whether the model's actual output was modified.

3. **Hidden chain-of-thought.** Reasoning models generate internal reasoning steps that influence the output but may not be exposed to the developer.

The result is a black box (the model) wrapped in a second black box (the provider's infrastructure).

### Local Deployment Eliminates Layer 2

With locally deployed models (through frameworks like Ollama, llama.cpp, or vLLM), the operator controls every component of the input. The system prompt is defined explicitly. The prompt template is visible. In debug mode, the exact token sequence can be logged. No provider-side instructions, filters, or preprocessing are added. What the operator specifies is verifiably what the model receives.

The model remains opaque (Layer 1 persists), but everything around it — inputs, outputs, configuration, version — is fully observable. See [[deployment-local-vs-cloud]].

## Provider-Side Safety Filters

A specific concern for safety-critical domains: provider safety filters are trained for general consumer use, targeting categories such as violence, self-harm, and dangerous activities. For domain-specific applications, technical discussion of hazards, accident scenarios, or exposure calculations could trigger harm-category classifiers. A filter that blocks or modifies discussion of a safety-relevant technical topic removes information from the advisory output **without notification**. The operator receives a response that appears complete but has been silently edited.

For locally deployed models, no provider-side filters operate unless the deployer implements them. This is an additional reason that local deployment is preferable for safety-critical applications: the deployer controls what filtering exists and can verify that domain-relevant content is not suppressed.

## Consequences for Auditability

For regulatory review and incident investigation, opacity is a significant barrier. If an AI advisory system provided a recommendation that contributed to an incorrect operator action, understanding why the system made that recommendation requires interpretability capabilities that current technology does not reliably provide.

With locally deployed models, the complete prompt can be logged, hashed, and archived for each inference call. An auditor can replay the exact input against pinned model weights. With frontier APIs, the developer can log only what they sent, not what the model received after provider injections. Reproducing a past output for investigation may be impossible.

## Reasoning Models: Partial Transparency

Reasoning models (see [[inference-and-generation]]) produce visible chains of reasoning, which supports auditability. However, this creates a tension: the visible reasoning chain helps operator verification (the operator can check the steps), but the apparent rigour may increase [[automation-bias]] (the operator sees detailed analysis and assumes it must be correct). Whether the net effect on operator performance is positive or negative is an empirical question without current data.

## Relevance to Safety-Critical Systems

1. **Explanations are not reliable.** AI-generated explanations of reasoning should be treated as approximations, not verified accounts of the computational process.

2. **The double opacity problem has regulatory implications.** For any application requiring auditability, reproducibility, or configuration management, the provider infrastructure layer introduces uncertainties that local deployment avoids.

3. **Input logging is essential.** Even if the model's internal reasoning is opaque, logging the complete input (system prompt, user query, tool results, retrieved documents) and the complete output enables post-event analysis and supports regulatory review.

4. **Cross-domain examples.** In aviation, inability to explain why an AI advisory recommended a particular routing makes post-incident analysis difficult. In medical settings, regulatory requirements for diagnostic transparency conflict with model opacity. In oil and gas, audit requirements for well control decisions are incompatible with unexplainable AI recommendations.
