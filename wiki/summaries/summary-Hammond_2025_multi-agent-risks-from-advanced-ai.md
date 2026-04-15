---
title: "Summary: Hammond et al. (2025) — Multi-Agent Risks from Advanced AI"
type: summary
sources:
  - raw/references/Hammond_2025_multi-agent-risks-from-advanced-ai.pdf
related:
  - "[[monoculture-collapse]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[epistemic-independence]]"
  - "[[multi-agent-taxonomy]]"
tags:
  - multi-agent
  - risk
  - survey
  - monoculture
  - emergent-behaviour
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Hammond et al. (2025) — Multi-Agent Risks from Advanced AI

**Full citation:** Hammond, L. et al. (2025). Multi-Agent Risks from Advanced AI. arXiv:2502.14143.

## Key Contribution

This paper provides a comprehensive survey of risks specific to multi-agent AI systems — risks that arise not from individual agent failures but from the interaction of multiple agents operating in shared environments. It complements the individual-agent failure modes covered elsewhere in this wiki by identifying **systemic, emergent, and interaction-level risks** that single-agent analysis cannot capture.

## Risk Categories

### Agent-Agent Interaction Risks
- **Coordination failures**: agents working at cross-purposes due to misaligned objectives, incomplete information about each other's state, or conflicting strategies. This maps directly to the [[multi-agent-coordination-failures]] taxonomy.
- **Racing conditions**: multiple agents competing for the same resources or acting on the same information simultaneously, producing outcomes worse than sequential processing
- **Emergent collusion**: agents that share training distributions may converge on coordinated strategies without explicit communication — not through intentional design but through correlated learned behaviours

### Agent-Human Interaction Risks
- **Accountability gaps**: when a multi-agent system produces a harmful outcome, attributing responsibility to specific agents is difficult. The causal chain passes through multiple agent decisions, making post-event analysis and regulatory accountability harder than for single-agent systems.
- **Reduced human oversight**: as multi-agent systems handle more complex tasks autonomously, the human's ability to monitor and intervene degrades — connecting to the out-of-the-loop problem in [[situation-awareness-in-human-ai-teams]]
- **Trust miscalibration**: users may over-trust multi-agent consensus (believing agreement among agents constitutes independent verification) when agents share biases. See [[monoculture-collapse]].

### Systemic and Emergent Risks
- **Monoculture collapse**: agents sharing training data or model architectures create **correlated systemic failures** — the entire multi-agent system fails simultaneously on the same inputs because all agents share the same blind spots. This is the central concept in [[monoculture-collapse]].
- **Scalability of harm**: multi-agent systems amplify individual agent failures through cascading effects. An error by one agent propagates through inter-agent communication, potentially affecting all downstream agents.
- **Emergent macro-level behaviours**: the interaction of individually rational agents can produce system-level outcomes not predictable from individual behaviour — herding, feedback loops, and cascade effects.

## The Monoculture Problem

The paper specifically highlights that when multiple AI agents in a system share the same foundation model or training data, their errors are **correlated rather than independent**. This means:
- Agreement among agents does not constitute independent verification
- Redundancy through agent count does not improve reliability if agents share failure modes
- The appearance of consensus can mask systematic error

This finding reinforces the [[epistemic-independence]] requirement: genuine redundancy requires model diversity, not just agent count.

## Relevance to This Wiki

This survey provides the broader risk landscape within which the wiki's specific topics (monoculture collapse, coordination failures, epistemic independence) sit. For safety professionals, the key message is that **multi-agent systems introduce risk categories that don't exist for single-agent systems**: emergent behaviours, accountability gaps, and correlated systemic failures. These cannot be addressed by improving individual agents — they require system-level analysis and architectural design principles like those in [[multi-agent-taxonomy]] and [[governance-gates]].
