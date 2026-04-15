---
title: "Summary: The Landscape of Emerging AI Agent Architectures for Reasoning, Planning, and Tool Calling"
type: summary
sources:
  - raw/references/Masterman_2024_landscape-of-emerging-ai-agent-architectures-for-reasoning-planning-and-tool-calling.pdf
related:
  - "[[multi-agent-taxonomy]]"
  - "[[multi-agent-roles]]"
  - "[[perceive-reason-act-loop]]"
  - "[[tool-calling]]"
  - "[[sycophancy]]"
  - "[[multi-agent-coordination-failures]]"
tags:
  - survey
  - agent-architecture
  - vertical
  - horizontal
  - leadership
  - planning
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: The Landscape of Emerging AI Agent Architectures for Reasoning, Planning, and Tool Calling

Masterman et al. (2024) survey the emerging landscape of AI agent architectures from a practitioner perspective (IBM/Microsoft), categorising both single-agent and multi-agent systems and identifying cross-cutting design principles. The paper's most useful contribution is the **vertical vs horizontal** multi-agent taxonomy and empirical findings on the impact of **leadership structure** on team performance.

## Vertical vs Horizontal Architecture

The paper divides multi-agent architectures into two structural categories:

**Vertical architecture** — One agent serves as a leader and other agents report to it. Communication may flow exclusively through the leader, or the leader may share a group channel with all agents. Key features: clear leadership, well-defined division of labour, and hierarchical authority. This maps to [[multi-agent-taxonomy|Patterns 3 (Orchestrator-Worker) and 8 (Organisational Hierarchy)]].

**Horizontal architecture** — All agents are treated as equals in a shared discussion thread. Agents can see all messages and volunteer for tasks or provide feedback without being assigned by a leader. Communication is peer-to-peer. This maps to [[multi-agent-taxonomy|Pattern 5 (Group Chat) and Pattern 9 (Shared Room)]].

Most real systems fall on a spectrum between these extremes. The paper notes that horizontal architectures are better suited for collaborative tasks requiring diverse perspectives, while vertical architectures are better for tasks requiring clear responsibility isolation for [[tool-calling]].

## Leadership Impact

Citing Guo et al.'s embodied agent experiments, the paper reports that:
- Teams with a designated leader complete tasks **nearly 10% faster** than leaderless teams
- Without a leader, agents spend approximately **50% of communication** time giving orders to each other rather than exchanging information — a coordination overhead that directly reduces productive work
- With a designated leader, **60% of the leader's communication** involves giving direction, freeing other agents to focus on information exchange and task execution
- **Human-as-leader** achieves the best performance of all configurations, followed by the strongest LLM model as leader

These findings validate the coordination overhead concern in [[multi-agent-coordination-failures]] and provide concrete evidence for why [[multi-agent-roles|role clarity]] matters.

## Five Key Design Principles

The paper identifies five elements that improve agent performance regardless of whether the architecture is single-agent or multi-agent:

1. **Well-defined system prompts** with clear role descriptions and tool access definitions
2. **Dedicated planning phases** before execution (plan-then-execute rather than interleaved)
3. **Iterative refinement** with explicit evaluation steps and opportunities to revise plans
4. **Dynamic team structures** where agents are added or removed based on task phase
5. **Intelligent message filtering** to prevent information overload, especially in horizontal architectures

## Single-Agent Findings

The review of ReAct, RAISE, Reflexion, AutoGPT+P, and LATS confirms that successful single-agent systems require: (1) a plan before acting, (2) self-correction contingent on proper planning, and (3) the ability to work iteratively with tools. Without planning capability, agents get stuck in execution loops or fail to complete long task sequences. ReAct reduced hallucination from 14% (CoT) to 6% on HotPotQA by grounding reasoning in tool feedback.

## Critical Observations

**Multi-agent discussion is not always beneficial.** The paper notes that when a prompt is sufficiently robust, multi-agent discussions do not necessarily enhance reasoning — a finding consistent with [[summary-Gao_2025_single-agent-or-multi-agent-systems-why-not-both|Gao et al. (2025)]] showing diminishing MAS advantage with stronger models.

**Sycophancy in agent systems.** Language models in agent roles exhibit [[sycophancy]] — they tend to mirror the user's stance even when it diverts from their assigned role, and agents are susceptible to feedback from other agents in ways that compromise their independent judgment.

**Benchmark contamination.** The paper warns that significant data contamination in LLM training data casts doubt on benchmark scores for both language models and agent systems, and that existing benchmarks are typically static while model capabilities are continually evolving.

## Relevance to This Wiki

The vertical/horizontal distinction complements the 10-pattern taxonomy in [[multi-agent-taxonomy]] by providing a simpler two-axis classification useful for initial design decisions. The leadership findings provide the strongest practitioner-oriented evidence for the [[multi-agent-roles|Coordinator role]] and for human-in-the-loop authority structures described in [[governance-gates]]. The observation that multi-agent discussion can be redundant when prompting is sufficient reinforces the need for principled architecture selection rather than defaulting to multi-agent complexity.
