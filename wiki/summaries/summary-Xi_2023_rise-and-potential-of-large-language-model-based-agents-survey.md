---
title: "Summary: The Rise and Potential of Large Language Model Based Agents — A Survey"
type: summary
sources:
  - raw/references/Xi_2023_rise-and-potential-of-large-language-model-based-agents-survey.pdf
related:
  - "[[perceive-reason-act-loop]]"
  - "[[multi-agent-taxonomy]]"
  - "[[memory-architectures]]"
  - "[[tool-calling]]"
  - "[[training-and-alignment]]"
  - "[[multi-agent-roles]]"
  - "[[trust-calibration]]"
tags:
  - survey
  - agent-architecture
  - brain-perception-action
  - multi-agent
  - agent-society
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: The Rise and Potential of Large Language Model Based Agents — A Survey

Xi et al. (2023) present the most comprehensive early survey of LLM-based agents, tracing the concept from its philosophical origins through to modern architectures. The paper's central contribution is the **Brain-Perception-Action** framework for understanding agent construction, which provides a conceptual organisation for the many dimensions along which agents vary.

## Brain-Perception-Action Framework

The survey proposes that LLM-based agents comprise three modules:

**Brain (LLM Core).** The central component responsible for knowledge storage, information processing, decision-making, reasoning, and planning. The brain subsumes five capabilities: (1) natural language interaction — the fundamental interface, (2) knowledge — both parametric (stored in weights) and non-parametric (accessed via [[retrieval-augmented-generation]]), (3) memory — short-term (in-context) and long-term (external storage), mapping to [[memory-architectures]], (4) reasoning and planning — from Chain-of-Thought to task decomposition, and (5) transferability and generalisation — few-shot and zero-shot adaptation to new tasks.

**Perception.** The module that expands the agent's sensory space beyond text: visual input (image understanding), auditory input (speech recognition), and other modalities. This maps the traditional AI agent's "sense" function to the multimodal capabilities of modern LLMs.

**Action.** The module that expands the agent's output space: textual output (natural language responses), tool use (API calls, code execution — see [[tool-calling]]), and embodied action (physical manipulation in real or simulated environments).

This framework maps directly to the [[perceive-reason-act-loop]]: Perception → Reasoning (Brain) → Action, with memory providing continuity across cycles. The framework is deliberately modular — not every application requires every component.

## Four Agent Properties

The survey identifies four key properties that distinguish agents from simple LLM inference:

1. **Autonomy** — Operating without direct human intervention, initiating actions independently.
2. **Reactivity** — Responding rapidly to environmental changes and stimuli.
3. **Pro-activeness** — Taking goal-directed initiative rather than only reacting.
4. **Social ability** — Interacting with other agents and humans through natural language.

These properties form a continuum, not a binary classification. A simple prompt-response system has low autonomy and no pro-activeness; a fully autonomous agent with heartbeat-triggered monitoring has high values on all four dimensions.

## Multi-Agent Interaction Taxonomy

The survey categorises multi-agent interactions into two modes:

**Cooperative interaction** — subdivided into *disordered cooperation* (free-form discussion where agents contribute without structured turn-taking, as in group chat) and *ordered cooperation* (sequential, structured workflows like CAMEL's instructor-executor pattern or MetaGPT's SOP-based pipeline). The survey notes that cooperative systems without safeguards can amplify hallucinations indefinitely through multi-round interaction.

**Adversarial interaction** — agents compete or debate, challenging each other's outputs. The survey draws parallels to game theory and notes that adversarial dynamics can naturally improve output quality through critique, but warns that multi-agent negotiation may converge on incorrect consensus.

## Human-Agent Interaction Paradigms

Two paradigms are identified: (1) the **instructor-executor paradigm** where humans direct and agents execute (matching [[governance-gates]] designs), and (2) the **equal partnership paradigm** where agents operate as peers engaging in collaborative dialogue. The survey argues that as agent capabilities increase, the interaction model should shift from unequal to equal partnership — a claim that requires careful examination in safety-critical contexts where human authority must be preserved regardless of agent capability.

## Agent Society and Scaling

The survey identifies four properties of simulated agent societies: openness, persistence, situatedness, and organisation. The discussion of scaling notes two approaches — pre-determined (fixed agent count) and dynamic (agent count adapts to task needs) — and warns that scaling increases communication complexity, information distortion from hallucination propagation, and coordination difficulty.

## Relevance to This Wiki

This survey provides the foundational vocabulary and conceptual framework that later, more focused papers build upon. The Brain-Perception-Action model is the most widely cited architectural description of LLM agents and maps cleanly to the [[perceive-reason-act-loop]] article. The cooperative/adversarial interaction distinction and the scaling discussion inform the [[multi-agent-taxonomy]] and [[multi-agent-coordination-failures]] articles. The equal partnership paradigm claim is a useful foil for the wiki's emphasis on maintaining human authority through [[governance-gates]] in safety-critical applications.
