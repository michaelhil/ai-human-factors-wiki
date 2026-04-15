---
title: "Summary — Large Language Model Based Multi-Agents: A Survey of Progress and Challenges"
type: summary
sources:
  - raw/references/Guo_2024_large-language-model-based-multi-agents-survey-of-progress-and-challenges.pdf
related:
  - "[[multi-agent-taxonomy]]"
  - "[[multi-agent-roles]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[memory-architectures]]"
  - "[[perceive-reason-act-loop]]"
  - "[[summary-Wu_2024_autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation]]"
  - "[[summary-Hong_2024_metagpt-meta-programming-for-multi-agent-collaborative-framework]]"
tags:
  - multi-agent
  - survey
  - taxonomy
  - communication
  - capability-acquisition
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Large Language Model Based Multi-Agents: A Survey of Progress and Challenges

Guo et al. (2024) present the first comprehensive survey dedicated to LLM-based multi-agent (LLM-MA) systems, cataloguing over 30 studies across problem-solving and world simulation applications. The paper organises the field along four architectural dimensions and identifies key research challenges, providing a structured map of a rapidly growing area.

## Four-Dimensional Taxonomy

**1. Agents-Environment Interface.** How agents interact with their environment:
- **Sandbox**: simulated environments (Minecraft, code execution, game rules) providing controlled interaction
- **Physical**: real-world robotic systems with sensory input and motor actions
- **Human**: direct interaction with human users or operators
- **None**: pure text-based interaction with no external environment

**2. Agent Profiling.** How agent identities and behaviours are defined:
- **Pre-defined**: manually specified roles, personas, and capabilities (most common approach)
- **Model-Generated**: the LLM generates agent profiles based on task requirements
- **Data-Derived**: profiles constructed from real-world data (e.g., user behaviour logs)

**3. Agent Communication.** Three paradigms, four structures:
- *Paradigms*: **Cooperative** (shared goal, information exchange), **Debate** (argumentative interaction toward consensus), **Competitive** (conflicting goals)
- *Structures*: **Layered** (hierarchical, agents interact within/between layers), **Decentralized** (peer-to-peer), **Centralized** (hub-and-spoke through coordinator), **Shared Message Pool** (publish-subscribe, as in [[summary-Hong_2024_metagpt-meta-programming-for-multi-agent-collaborative-framework|MetaGPT]])

**4. Agent Capability Acquisition.** How agents learn and improve:
- **Feedback sources**: environment signals, human feedback, inter-agent feedback
- **Adjustment strategies**: memory-based (storing experiences for retrieval), self-evolution (modifying own prompts or procedures), dynamic agent composition

## Application Domains

**Problem-solving**: software development (MetaGPT, ChatDev, CAMEL), embodied agents (multi-robot coordination), science experiments (optimisation, chemistry), science debate (factuality improvement through argumentation).

**World simulation**: society simulation (up to 1,000 agents in Generative Agents and SOTOPIA), gaming (Werewolf, Avalon, Diplomacy), psychology experiments, economic simulations, recommender systems, policy-making, and disease propagation modelling.

## Key Challenges Identified

**Hallucination cascading.** In multi-agent systems, a hallucination by one agent can propagate through inter-agent communication, contaminating other agents' reasoning. This is distinct from single-agent hallucination because the social dynamics of multi-agent interaction can amplify rather than correct errors (see [[multi-agent-coordination-failures]]).

**Scaling complexity.** Each agent in an LLM-MA system requires substantial computational resources. Scaling from a few agents to hundreds introduces coordination overhead that compounds with agent count — not just linearly but through combinatorial interaction patterns.

**Collective intelligence emergence.** Whether genuine collective intelligence emerges from LLM-MA systems or whether observed improvements are merely artefacts of ensembling and majority voting remains an open question. The survey notes that distinguishing true collaborative reasoning from statistical aggregation is a fundamental evaluation challenge.

**Evaluation gaps.** Existing benchmarks focus on narrow problem-solving tasks. Comprehensive benchmarks for evaluating multi-agent coordination quality, communication efficiency, and emergent behaviour in complex, dynamic environments are largely absent.

## Relevance to This Wiki

This survey provides the empirical landscape that contextualises the wiki's [[multi-agent-taxonomy]] and [[multi-agent-roles]] pages. The four-dimensional classification (environment, profiling, communication, capability) offers a structured vocabulary for comparing multi-agent architectures — complementing the more theoretical [[summary-Sumers_2024_cognitive-architectures-for-language-agents|CoALA framework]]. For safety-critical applications, the survey's identification of hallucination cascading as a multi-agent-specific risk, and the open question of whether collective intelligence genuinely emerges, are directly relevant to any safety case that credits multi-agent architecture with providing verification or diverse assessment capabilities.
