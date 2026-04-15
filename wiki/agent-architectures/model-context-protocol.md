---
title: "Model Context Protocol"
type: architecture
sources: []
related:
  - "[[tool-calling]]"
  - "[[perceive-reason-act-loop]]"
  - "[[deployment-local-vs-cloud]]"
  - "[[llm-architecture]]"
tags:
  - mcp
  - protocol
  - tool-connectivity
  - interoperability
  - agent
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Model Context Protocol

The Model Context Protocol (MCP) is an open standard for connecting LLM agents to external tools and data sources. It provides a model-agnostic interface for tool connectivity, meaning agent systems can work with different underlying LLM models without changing their tool integrations.

## Architecture

Introduced by Anthropic in November 2024 and subsequently adopted by OpenAI, Google, and Microsoft, with the specification donated to the Linux Foundation in May 2025, MCP defines a client-server architecture built on JSON-RPC 2.0.

MCP specifies three primitives:

- **Tools**: callable functions the agent can invoke (equivalent to [[tool-calling]], but with a standardised discovery and invocation protocol)
- **Resources**: data sources the agent can read (files, database records, API endpoints)
- **Prompts**: reusable templates for structured interactions

The protocol separates the **what** (what tools are available, what they do, what parameters they accept) from the **how** (which LLM model drives the reasoning). This separation is architecturally significant because it means tool integrations are portable across models.

## Relevance to Multi-Agent Systems

MCP's model-agnostic interface becomes directly relevant in multi-agent architectures where different agents may run on different models. If Agent A runs on Model X and Agent B runs on Model Y (for [[epistemic-independence]]), both can share the same MCP-connected tools. The tool interface is stable; the reasoning layer can be swapped.

This also supports the [[deployment-local-vs-cloud]] choice: the same MCP tool connectors work whether the underlying model runs locally or through a cloud API. Transitioning from cloud-based prototyping to local production deployment does not require rebuilding tool integrations.

## Standardisation Benefits

Before MCP, each AI framework (LangChain, AutoGen, CrewAI) defined its own tool interface format. This created lock-in: tools built for one framework did not work with another. MCP provides a common interface that reduces vendor lock-in and supports the model heterogeneity needed for independent verification in safety-critical applications.

The standardisation also supports ecosystem growth: tool developers can build MCP-compatible integrations once and have them work across all MCP-compatible agent frameworks, increasing the availability of domain-specific tools.

## Current Limitations

As of early 2026, peer-reviewed academic literature on MCP remains sparse, though the protocol has seen widespread industry adoption. The primary sources are the specification (modelcontextprotocol.io) and documentation from adopters.

MCP standardises the **interface** for tool connectivity but does not solve the **reliability** problem. A standardised tool interface reduces malformed calls (syntax errors, schema mismatches) but does not address the semantic dimension of [[tool-calling]] failures (invoking the wrong tool or supplying incorrect parameter values). The probabilistic nature of LLM tool selection remains regardless of the protocol used to invoke the tools.

## Relevance to Safety-Critical Systems

1. **Model portability supports model diversity.** The ability to swap underlying models without changing tool integrations enables the multi-model architectures needed for independent verification.

2. **Reduces vendor lock-in.** For regulated domains where long-term system stability matters, protocol-level standardisation means the agent infrastructure is not dependent on a single model provider.

3. **Tool interface validation.** MCP's structured schema for tools provides a surface for automated validation — checking that tool call parameters match expected types and ranges before execution.

4. **Cross-domain relevance.** Any domain-specific AI advisory system (aviation operations centres, medical clinical decision support, oil and gas drilling advisors, nuclear control room systems) benefits from standardised tool connectivity that works across different AI models and deployment configurations.
