---
title: "Situation Awareness in Human-AI Teams"
type: interaction
sources:
  - raw/references/Gao_2023_agent-teaming-situation-awareness-atsa.pdf
related:
  - "[[multi-agent-taxonomy]]"
  - "[[context-windows]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[governance-gates]]"
  - "[[delivery-modes]]"
tags:
  - situation-awareness
  - human-ai-interaction
  - distributed-sa
  - endsley
  - team-cognition
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Situation Awareness in Human-AI Teams

Situation Awareness (SA) provides the unifying framework for understanding how information flows — and fails to flow — between humans and AI agents in complex work domains. The coordination challenges of multi-agent systems (flooding, staleness, context divergence) are, at their root, SA failures.

## The SA Framework

Endsley (1995) defines SA as:

- **Level 1 (Perception)**: perceiving environmental elements within a volume of time and space
- **Level 2 (Comprehension)**: understanding their meaning
- **Level 3 (Projection)**: projecting their status in the near future

SA is the primary basis for decision-making in complex, dynamic systems. Its failure modes are the proximate causes of the majority of human error in safety-critical operations.

## Distributed SA in Human-AI Systems

Stanton et al. (2006) develop Distributed SA (DSA): SA is an emergent property of the sociotechnical system, characterised as "activated knowledge held by specific agents at a specific time for a specific task." Non-human elements (displays, automation, artefacts) hold SA alongside human operators. What matters is not identical shared knowledge but **compatible knowledge**: agents holding mutually coherent information states.

Applied to multi-agent LLM systems, DSA provides a direct mapping:

**Each agent's [[context-windows]] is its SA boundary.** Level 1 SA (perception) is determined by what has been communicated into the agent's context. Level 2 SA (comprehension) is performed by the LLM inference process. Level 3 SA (projection) requires explicit reasoning prompts or tool-based access to predictive models.

**Context divergence is distributed SA failure.** Two agents in the same room with different subsets of history in context hold different Level 1 SA. Their comprehensions and projections diverge correspondingly.

**Coordination mechanisms are SA management infrastructure.** Rooms define the shared perception space. Threading provides causal structure supporting comprehension. Shared artefacts are the persistent SA substrate. [[delivery-modes]] regulate information flow to prevent overload and staleness.

## The ATSA Framework

Gao et al. (2023) formalise Agent Teaming Situation Awareness: in a human-AI system, AI agents are not merely SA objects (things the human monitors) but **SA subjects** (entities that maintain their own SA). The framework introduces bidirectional SA interaction: humans maintain SA about AI teammates; AI agents maintain SA about humans, the environment, and each other.

## Human Roles and SA Requirements

The same person may play different roles depending on system design and operational context:

| Role | SA Requirement |
|---|---|
| **Initiator** | Minimal; posts the triggering message |
| **Supervisor** | Continuous Level 1 SA of agent state |
| **Approver** | Level 2 comprehension at decision points |
| **Domain expert** | Level 2 SA of the specific question |
| **Peer participant** | Level 1–2 SA of room and operational environment |
| **Authority holder** | Level 1–3 SA of both environment and agent activities |

In safety-critical contexts, the human must retain the authority-holder role regardless of other roles, enforced through architectural mechanisms ([[governance-gates]], room pause), not behavioural expectations.

## The Out-of-the-Loop Problem

As agents operate over longer autonomous horizons, human SA of agent state and intent degrades unless transparency mechanisms maintain it. This is the out-of-the-loop problem (Endsley, 1995) applied directly to human-AI teaming. Room pause controls, delivery mode visibility, and SA Bridge agent roles are SA maintenance tools for human operators.

## Cognitive Load Limits

How many agents can a human meaningfully supervise? During normal operations with low output rates, a single operator can track 4–6 agents. During a transient with high output rates and concurrent manual tasks, even 3 may exceed processing capacity. The number of supervisable agents is not a fixed parameter but a variable depending on operational tempo.

Adding agents improves coverage up to an inflection point, beyond which coordination overhead and cognitive load cause net performance to decline. No published study has characterised this curve for LLM-based multi-agent systems.

## Relevance to Safety-Critical Systems

1. **SA is the diagnostic framework for human-AI coordination failures.** Rather than describing problems generically ("agents disagree"), the SA framework traces disagreement to a specific SA level, a specific architectural cause, and a specific design response.

2. **Cross-domain application.** In aviation, distributed SA across pilot and automation has decades of research. In oil and gas, driller SA of wellbore state when mediated by automated systems. In medical settings, clinician SA when receiving AI-generated alerts and recommendations. The SA framework applies across all complex work domains where humans and AI share operational responsibility.

3. **Design implication: SA support must be differentiated by role.** Different human roles need different SA support. A uniform transparency interface is insufficient. The SA Bridge agent role translates between the AI system's internal communication and what each human role needs.
