---
title: "Summary — Cognitive Architectures for Language Agents (CoALA)"
type: summary
sources:
  - raw/references/Sumers_2024_cognitive-architectures-for-language-agents.pdf
related:
  - "[[perceive-reason-act-loop]]"
  - "[[memory-architectures]]"
  - "[[tool-calling]]"
  - "[[multi-agent-taxonomy]]"
  - "[[inference-and-generation]]"
  - "[[summary-Yao_2023_react-synergizing-reasoning-and-acting-in-language-models]]"
  - "[[summary-Park_2023_generative-agents-interactive-simulacra-of-human-behavior]]"
  - "[[summary-Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning]]"
tags:
  - cognitive-architecture
  - coala
  - agent-framework
  - memory
  - decision-making
  - production-systems
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Cognitive Architectures for Language Agents (CoALA)

Sumers et al. (2024) propose **CoALA (Cognitive Architectures for Language Agents)**, a conceptual framework that draws on decades of cognitive science and symbolic AI research to organise and compare the rapidly growing landscape of LLM-based agents. Published in Transactions on Machine Learning Research, the paper positions LLMs as probabilistic production systems — analogous to the rule-based production systems underlying classical cognitive architectures like Soar — and uses this analogy to define a structured vocabulary for agent design.

## The CoALA Framework

CoALA organises agents along three dimensions:

### Memory
- **Working memory**: the active, volatile state for the current decision cycle — perceptual inputs, intermediate reasoning results, and active goals. In LLM agents, this corresponds to the context window contents plus any structured state variables maintained across LLM calls.
- **Episodic memory**: records of past experiences and trajectories. Ranges from raw input-output pairs to summarised reflections ([[summary-Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning|Shinn et al., 2023]]; [[summary-Park_2023_generative-agents-interactive-simulacra-of-human-behavior|Park et al., 2023]]).
- **Semantic memory**: factual knowledge about the world, stored in vector databases, [[knowledge-graphs]], or other external stores. [[retrieval-augmented-generation]] can be viewed as retrieval from semantic memory.
- **Procedural memory**: the agent's code and prompt templates — both the LLM weights (implicit procedures) and explicitly written agent code (deterministic procedures). A critical distinction: LLM parameters are opaque and stochastic, while agent code is interpretable and deterministic. CoALA recommends using code sparingly to complement LLM limitations (e.g., implementing tree search to mitigate autoregressive myopia).

### Action Space
- **Internal actions**: reasoning (processing working memory contents via LLM), retrieval (loading from long-term memory into working memory), and learning (writing from working memory to long-term memory).
- **External actions (grounding)**: interactions with the physical world (robotics), digital environments (APIs, web), or other agents (dialogue). See [[tool-calling]].

### Decision-Making Procedure
A repeated cycle with two phases:
1. **Planning**: propose candidate actions via reasoning and retrieval, evaluate them (using heuristics, LLM judgments, or simulated rollouts), and select the best action.
2. **Execution**: carry out the selected action (grounding or learning), receive observations from the environment, and loop.

## Case Studies

The paper maps five prominent agents into the CoALA framework, revealing their structural differences:

| Agent | Long-term Memory | Grounding | Internal Actions | Decision |
|---|---|---|---|---|
| SayCan | procedural only | physical | — | evaluate |
| ReAct | — | digital | reason | propose |
| Voyager | procedural | digital | reason/retrieve/learn | propose |
| Generative Agents | episodic/semantic | digital/agent | reason/retrieve/learn | propose |
| Tree of Thoughts | — | digital | reason | propose/evaluate/select |

This decomposition reveals that most agents use only a subset of possible architectural components. The framework identifies underexplored combinations as research directions — for example, agents that combine retrieval learning (updating how memories are retrieved) with complex decision-making procedures.

## Key Insights for Agent Design

**Modular over monolithic.** Agents should be structured as interacting modules (memory, reasoning, grounding) rather than end-to-end prompts. Standardised interfaces between modules would enable component reuse, systematic comparison, and incremental improvement.

**LLMs vs code in procedural memory.** Agent code is deterministic and interpretable but brittle in novel situations. LLM parameters are flexible but opaque and stochastic. CoALA recommends using code for well-defined procedures and LLMs for flexible reasoning, combining both rather than relying exclusively on either.

**Memory deletion and modification are understudied.** Current agents focus on adding to memory; the ability to revise or remove stale memories is largely unexplored but critical for long-running agents that must maintain accurate world models.

## Relevance to This Wiki

CoALA provides the theoretical vocabulary that underlies several wiki pages. The memory taxonomy maps directly to [[memory-architectures]], the decision cycle formalises [[perceive-reason-act-loop]], and the action space taxonomy connects to [[tool-calling]]. For safety-critical system design, the framework's emphasis on modular architecture supports auditability and controlled complexity — each module can be independently verified, monitored, and constrained. The production systems analogy also clarifies why LLM agents face fundamentally different reliability challenges than classical AI systems: probabilistic productions cannot guarantee the deterministic behaviour that safety-critical applications historically require.
