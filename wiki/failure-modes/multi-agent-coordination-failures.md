---
title: "Multi-Agent Coordination Failures"
type: failure-mode
sources:
  - raw/references/Cemri_2025_why-do-multi-agent-llm-systems-fail.pdf
  - raw/references/Riedl_2025_emergent-coordination-in-multi-agent-language-models.pdf
  - raw/references/Gao_2025_single-agent-or-multi-agent-systems-why-not-both.pdf
related:
  - "[[multi-agent-taxonomy]]"
  - "[[context-windows]]"
  - "[[situation-awareness-in-human-ai-teams]]"
  - "[[delivery-modes]]"
  - "[[monoculture-collapse]]"
  - "[[summary-Cemri_2025_why-do-multi-agent-llm-systems-fail]]"
tags:
  - multi-agent
  - coordination
  - failure-mode
  - flooding
  - staleness
  - context-divergence
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Multi-Agent Coordination Failures

Multi-agent systems introduce coordination failure modes that are distinct from single-agent LLM failures. These emerge from the interaction of multiple bounded agents operating in a shared space, each with limited context and potentially different information states.

## Failure Modes

### Flooding
Multiple agents respond to the same event simultaneously, producing output that exceeds participants' processing capacity. In a system with eight agents, a single significant event can trigger eight near-simultaneous assessments that overwhelm both human operators and other agents trying to maintain coherent [[situation-awareness-in-human-ai-teams]].

**Mitigation:** [[delivery-modes]] — flow gating prevents simultaneous arrival; priority ordering ensures the most safety-relevant outputs reach the operator first.

### Staleness
An agent's context snapshot may not reflect the current shared state by the time its response arrives. During dynamic situations where conditions change on a timescale of seconds, an agent reasoning about conditions from 30 seconds ago may produce recommendations that conflict with the current state. Actions taken on stale context can conflict with other agents' more recent actions.

**Mitigation:** Staleness checks before action; timestamps on all data in context; shorter reasoning chains during fast transients.

### Context Divergence
Agents build their contexts differently depending on what they have attended to, what their [[memory-architectures]] retrieves, and how much history fits in their [[context-windows]]. Two agents may hold significantly different models of the current situation — not because they reason differently, but because they perceive different histories.

**Context window arithmetic:** In a room with eight agents generating 300 tokens per response at 45-second intervals, combined output is roughly 3,200 tokens per minute. A 128K-token context window fills in approximately 38 minutes. In a four-hour session, later agents work from compressed, partial views. SA divergence between early and late agents is guaranteed by arithmetic.

### Cascading Tool Use
A [[tool-calling]] extends an agent's turn while the environment evolves. Other agents may respond to the partial state in ways that conflict with the eventually-returned result.

### Epistemic Asymmetry from Threading
An agent engaged in a sub-thread has a narrower view than an agent attending to the main room. They hold different situational pictures simultaneously.

### Heartbeat-Delivery Interaction
A heartbeat-triggered agent enters the room not in response to any message. Standard delivery modes do not cleanly handle this — the agent must either pre-empt the current flow (potentially interrupting important exchanges) or queue (potentially delaying time-sensitive monitoring).

### Infrastructure Failures
The coordination infrastructure itself (delivery modes, threading, [[governance-gates]]) is software that can fail, producing system-level errors distinct from individual agent errors.

## The MAST Taxonomy: Empirical Failure Rates

[[summary-Cemri_2025_why-do-multi-agent-llm-systems-fail|Cemri et al. (2025)]] provide the first empirically grounded taxonomy from 1,642 annotated failure traces across 7 MAS frameworks. Failure rates range from **41% to 86.7%** across systems. The 14 failure modes cluster into three categories:

**System Design Issues (44.2%)** — the largest category, representing failures from architectural choices rather than model limitations:
- Step repetition (15.7%), unaware of termination conditions (12.4%), disobey task specification (11.8%), loss of conversation history (2.8%), disobey role specification (1.5%)

**Inter-Agent Misalignment (32.5%)** — breakdowns in agent coordination:
- Reasoning-action mismatch (13.2%), task derailment (7.4%), fail to ask for clarification (6.8%), conversation reset (2.2%), ignored other agent's input (1.9%), information withholding (0.85%)

**Task Verification (23.5%)** — quality control failures:
- Incorrect verification (9.1%), no or incomplete verification (8.2%), premature termination (6.2%)

**Key insight:** 44.2% of failures are design issues fixable through better architecture — not model limitations. A simple workflow fix (ensuring the CEO agent had final authority) improved ChatDev's success rate by +9.4% with the same underlying model. This validates that [[multi-agent-taxonomy]] pattern selection determines system properties more than model capability.

## Coordination Failure Modes by Pattern

| Pattern | Primary Failure | Mechanism |
|---|---|---|
| 0: Role Simulation | Correlated errors | All roles share one context and model |
| 1: Autonomous Loop | Goal drift | No external constraint on task queue |
| 2: Sequential Pipeline | Cascading errors | Error in stage N propagates downstream |
| 3: Orchestrator-Worker | Single point of failure | Orchestrator overload or poor decomposition |
| 5: Group Chat | Speaker selection loops | Repetitive turns without progress |
| 6: Handoff/Transfer | Context loss at handoff | Incomplete state transfer |
| 9: Shared Room | Flooding, staleness, divergence | Concurrent operation with bounded context |

## Degradation and Recovery

Multi-agent systems require defined degraded-mode operation:

- **Agent failure detection**: silent failure (no output), explicit failure (error signal), degraded failure (lower quality output). Silent and degraded failures are hardest to detect.
- **Graceful degradation**: loss of different agent roles produces different residual capabilities. Loss of the adversarial agent removes independent challenge; loss of the synthesiser forces manual integration.
- **State reconstruction**: when a failed agent restarts, it has empty context. Pre-computed state summaries or periodic checkpoints reduce the SA gap.
- **Fallback modes**: reduced agent count → reduced model diversity → single-agent → no-AI operation. Each should be a defined system state with its own display mode.

## Relevance to Safety-Critical Systems

1. **These failures are emergent, not individual.** They arise from the interaction of multiple agents, not from any single agent's malfunction. Testing individual agents in isolation will not reveal coordination failures.

2. **Context window arithmetic makes divergence inevitable.** In any session longer than ~40 minutes with active multi-agent operation, agents will have different information states. System design must accommodate this, not assume it away.

3. **Cross-domain examples.** In aviation, multiple advisory systems providing conflicting guidance during a critical phase of flight. In medical settings, multiple AI diagnostic tools accessing different subsets of patient data and producing divergent assessments. In oil and gas, multiple monitoring systems providing asynchronous readings during a well control event.

4. **The coordination infrastructure is itself a failure surface.** Delivery modes, threading, and governance gates must be tested as components, not just the agents they coordinate.
