---
title: "Summary — Risk Analysis Techniques for Governed LLM-based Multi-Agent Systems"
type: summary
sources:
  - raw/references/Reid_2025_risk-analysis-techniques-for-governed-llm-based-multi-agent-systems.pdf
related:
  - "[[multi-agent-coordination-failures]]"
  - "[[monoculture-collapse]]"
  - "[[epistemic-independence]]"
  - "[[sycophancy]]"
  - "[[theory-of-mind-in-llms]]"
  - "[[multi-agent-taxonomy]]"
  - "[[governance-gates]]"
  - "[[hra-methods-for-ai]]"
  - "[[degradation-characteristics]]"
tags:
  - multi-agent
  - risk-analysis
  - failure-modes
  - governance
  - safety
  - validity
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Risk Analysis Techniques for Governed LLM-based Multi-Agent Systems

**Reid et al. (2025)** — Gradient Institute, supported by Australian Government, July 2025

## Core Premise

The report's central argument is that **a collection of safe agents does not imply a safe collection of agents**. Multi-agent interactions create emergent behaviours and failure modes that extend beyond individual components. Even under unified governance with aligned objectives, multi-agent systems can exhibit cascading errors, coordination failures, and unintended collective behaviours. This means analysing agents in isolation cannot ensure system-level safety.

## Six Multi-Agent Failure Modes

The report identifies six failure modes salient to governed multi-agent environments:

1. **Cascading reliability failures**: LLMs have "spiky" capability profiles — excelling at complex tasks while failing at seemingly simple ones. When an initial error propagates through a chain of agents, each accepts the flawed input uncritically, amplifying the error at each step. Unlike human collaborators who might perform "sanity checks," LLM agents typically accept peer output as valid premises.

2. **Inter-agent communication failures**: natural language communication between agents introduces ambiguity, information loss, and misinterpretation. Agents may hallucinate missing details from ambiguous messages, ignore instructions, or interpret domain-specific terms differently (e.g., "stable" meaning different things to engineering vs communications agents).

3. **Monoculture collapse**: when agents share the same base model, training data, or architectural patterns, they exhibit correlated failures — shared blind spots, simultaneous vulnerability to the same inputs, and convergence on erroneous consensus. This undermines the diversity assumption behind multi-agent redundancy.

4. **Conformity bias**: agents reinforce each other's errors rather than providing independent evaluation, creating false consensus that grows stronger with each agreeing agent. Strongly related to LLM [[sycophancy]] and amplified by the lack of ground truth verification mechanisms.

5. **Deficient theory of mind**: agents fail to model other agents' knowledge, goals, or states, leading to duplicated work, coordination gaps, and incompatible action plans. LLM-based agents may exhibit instability in how they model peers across interactions.

6. **Mixed motive dynamics**: agents pursuing individually rational objectives produce collectively suboptimal outcomes. This emerges when performance metrics poorly approximate organisational goals, leading to reward hacking, strategic resource competition, or adversarial escalation between agents.

## Canonical Multi-Agent Settings

The report maps failure modes to four canonical deployment configurations:
- **Single agent equivalent**: baseline, only cascading reliability failures apply
- **Centralised orchestrator with delegates**: adds communication failures and monoculture collapse; orchestrator is single point of failure
- **Collaborative swarm**: all six failure modes at high exposure; epistemic failures like groupthink are especially dangerous
- **Distributed autonomous task force**: all six at high exposure; mixed motive dynamics most prominent

## Risk Analysis Approach

The report centres on **validity** as the organising concept for risk analysis — whether assessments measure what they claim to measure. It identifies five dimensions of validity (content, criterion, construct, external, consequential) and advocates for **progressive staged testing** that gradually increases exposure: simulations → sandboxed testing → pilot programs → full deployment with monitoring. Pre-deployment testing alone is insufficient because multi-agent behaviours are history-dependent, stochastic, and sensitive to configuration details.

The risk analysis toolkit includes simulations, observational data analysis, benchmarking against baselines, red teaming, and capability benchmarking — each with explicit validity limitations.

## Relevance to This Wiki

This report provides the most systematic framework to date for risk-analysing the multi-agent configurations described in [[multi-agent-taxonomy]]. Its six failure modes map directly to existing wiki concepts: cascading failures connect to [[degradation-characteristics]], monoculture collapse to [[monoculture-collapse]] and [[epistemic-independence]], conformity bias to [[sycophancy]], and deficient theory of mind to [[theory-of-mind-in-llms]]. The validity framework is particularly relevant to [[hra-methods-for-ai]] — it articulates why traditional testing paradigms underestimate multi-agent risks and provides a structured approach to progressively building assurance. The report's emphasis on governed environments (shared governance, aligned objectives, controlled deployment) makes it directly applicable to safety-critical domains where organisational control over agent configuration is a given.
