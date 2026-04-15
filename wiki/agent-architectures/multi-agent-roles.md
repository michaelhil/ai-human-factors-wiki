---
title: "Multi-Agent Functional Roles"
type: architecture
sources:
  - raw/references/Cemri_2025_why-do-multi-agent-llm-systems-fail.pdf
  - raw/references/Liu_2024_dylan-dynamic-llm-powered-agent-network-for-task-oriented-collaboration.pdf
  - raw/references/Li_2023_camel-communicative-agents-for-mind-exploration-of-large-language-model-society.pdf
  - raw/references/Chan_2024_chateval-better-llm-based-evaluators-through-multi-agent-debate.pdf
related:
  - "[[multi-agent-taxonomy]]"
  - "[[epistemic-independence]]"
  - "[[situation-awareness-in-human-ai-teams]]"
  - "[[governance-gates]]"
tags:
  - multi-agent
  - roles
  - architecture
  - adversarial
  - synthesiser
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Multi-Agent Functional Roles

A Pattern 9 architecture requires intentional role assignment. The coordination challenges of multi-agent systems are better addressed by agents configured for specific functions than by general-purpose agents. The MAST failure taxonomy (Cemri et al., 2025) identifies absent role specification as a primary failure mode. DyLAN (Liu et al., 2024) found up to 25% task performance improvement from dynamic role assignment.

## Core Roles

### Adversarial / Devil's Advocate
Challenges claims, seeks counterevidence, resists premature consensus. Directly implements the "questioning attitude" valued in safety culture. Its effectiveness depends on **model separation** — an adversarial agent on the same base model as the agents it challenges will tend toward the same conclusions despite its role assignment (Chan et al., 2024). For effective adversarial function, the agent requires either a different base model, substantially different fine-tuning, or restricted information access.

### Synthesiser
Aggregates outputs across agents; identifies consensus, conflict, and gaps. Requires privileged read access to all agent outputs and high context budget. The synthesiser produces the integrated assessment that the operator evaluates — it is the bottleneck between multi-agent analysis and human decision-making.

### Domain Expert
Provides authoritative specialised knowledge; flags out-of-scope queries. Requires specialised fine-tuning or high-quality [[retrieval-augmented-generation]] / [[knowledge-graphs]] access. The domain expert's credibility depends on its knowledge base quality.

### Monitor / Metacognitive
Observes team process rather than operational content; flags stale context, loops, coordination failures. Requires access to team-level metadata (who responded when, how long since each agent's last output, whether outputs are becoming repetitive). Addresses the [[multi-agent-coordination-failures]] that content-focused agents cannot detect.

### Coordinator / Planner
Structures work; tracks dependencies and progress; prevents duplication. Operates as a peer, not a hierarchical orchestrator — it coordinates among equals rather than commanding subordinates. This distinction is important: the Coordinator should not have authority to override other agents' assessments.

### Projection Agent
Dedicated to Level 3 SA: extrapolates current state, flags emerging conditions. May be coupled to physics-based simulation codes or domain models for forward projection. The distinction from other agents is between Level 1–2 SA (perceiving and comprehending what is happening now) and Level 3 SA (projecting where things are heading).

### SA Bridge
Translates between the multi-agent system's internal technical communication and human-readable format. Adapts presentation to the recipient's role and current needs. Different human roles (supervisor, approver, authority holder) need different SA support — the SA Bridge provides differentiated handoffs. See [[situation-awareness-in-human-ai-teams]].

### Grounding Agent
Supplies domain knowledge or commonsense facts to prevent error loops. In AutoGen's ALFWorld experiments (Wu et al., 2024), a grounding agent that injected commonsense rules (e.g., "you must find the object before you can examine it") improved success rates by 15% over systems without grounding. The grounding agent addresses the repetitive action loop failure mode in [[multi-agent-coordination-failures]] by breaking chains of errors before they propagate.

### Safeguard Agent
Checks outputs for safety, correctness, or policy compliance before execution. In AutoGen's OptiGuide coding application (Wu et al., 2024), a safeguard agent that reviewed code before execution boosted unsafe-code detection F1 by 8-35%. This maps directly to the [[governance-gates]] concept — the safeguard agent is an automated governance gate that enforces checks before consequential actions proceed.

### Memory Keeper
Maintains episodic record; surfaces precedents; prevents re-derivation of previously established conclusions. Requires external [[memory-architectures]] with retrieval and persistence. Addresses context overflow by maintaining the team's long-term memory outside individual agent context windows.

## The Degradation Curve

Adding agents improves system coverage up to a point, beyond which coordination overhead and human cognitive load cause net performance to decline. A 3-agent architecture may provide better effective coverage than a 6-agent architecture if the operator can maintain SA across 3 but not 6. The location of this inflection point is unknown and likely task-dependent. No published study has characterised this curve. Its empirical determination is a prerequisite for sizing multi-agent deployments. See [[situation-awareness-in-human-ai-teams]] for the cognitive load analysis.

## Role Assignment Principles

1. **Model diversity for adversarial roles.** The adversarial agent must be on a different base model to provide genuine independence. See [[epistemic-independence]].

2. **Disagreement is signal, not noise.** Agents with different information reaching different conclusions signals ambiguity in the evidence. Systems designed to suppress disagreement through forced consensus lose the diversity that justifies the architecture.

3. **Roles are composable.** A single agent may serve multiple roles (e.g., domain expert + projection agent for a specialised domain). But combining the adversarial role with any consensus-building role defeats the adversarial function.

4. **The MAST taxonomy warns against absent role specification.** Cemri et al. (2025) found that multi-agent systems without explicit role definition produce more coordination failures. Role clarity is a prerequisite for effective multi-agent coordination.

## Relevance to Safety-Critical Systems

1. **Role selection determines system properties.** Which roles are deployed and how they are configured determines whether the system provides genuine independent analysis, effective human support, and robust coordination.

2. **Cross-domain examples.** In aviation, the adversarial role maps to the "monitoring pilot" function that challenges the "flying pilot." In medical settings, the synthesiser role maps to the team lead who integrates specialist opinions. In oil and gas, the projection agent maps to the wellbore modelling function that projects future well conditions.

3. **Not all roles are needed for all applications.** A simple ambient monitoring system (Pattern 7) needs no adversarial agent. A safety-critical verification system (Pattern 9) needs adversarial, synthesiser, and governance roles at minimum. Scale the role set to the application's requirements.
