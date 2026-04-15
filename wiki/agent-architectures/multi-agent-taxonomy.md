---
title: "Multi-Agent Architectural Patterns"
type: architecture
sources:
  - raw/references/Wu_2024_autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation.pdf
  - raw/references/Hong_2024_metagpt-meta-programming-for-multi-agent-collaborative-framework.pdf
  - raw/references/Xi_2023_rise-and-potential-of-large-language-model-based-agents-survey.pdf
  - raw/references/Guo_2024_large-language-model-based-multi-agents-survey-of-progress-and-challenges.pdf
  - raw/references/Masterman_2024_landscape-of-emerging-ai-agent-architectures-for-reasoning-planning-and-tool-calling.pdf
  - raw/references/Shanahan_2023_role-play-with-large-language-models.pdf
related:
  - "[[perceive-reason-act-loop]]"
  - "[[epistemic-independence]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[multi-agent-roles]]"
  - "[[llm-architecture]]"
  - "[[summary-Guo_2024_large-language-model-based-multi-agents-survey-of-progress-and-challenges]]"
tags:
  - multi-agent
  - taxonomy
  - architecture
  - patterns
  - coordination
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Multi-Agent Architectural Patterns

The term "multi-agent" is applied to LLM systems with substantially different architectures and properties. Sequential pipelines, role-playing prompts within a single context, orchestrator-worker hierarchies, and concurrent conversational architectures are all described with the same label. A taxonomy based on **coordination mechanism** — not task type — is needed because the properties of a system (failure modes, coordination requirements, relationship to human authority) differ depending on which pattern is actually implemented.

## Ten Patterns

The patterns below are composable building blocks, not mutually exclusive architectures. Production systems routinely combine elements from multiple patterns. They are classified along four dimensions: **concurrency** (whether agents operate simultaneously), **context isolation** (whether agents access each other's internal state), **human participation mode**, and **turn-taking mechanism**.

### Pattern 0: Single-Agent Role Simulation (Baseline)
A single LLM generates sequential responses attributed to multiple named roles within a unified context. Not a multi-agent architecture — all "agents" share one context window, one set of model weights, one inference process. Shanahan et al. (2023) develop the implication: the model samples from a "superposition of simulacra" rather than switching between committed character states. Included as the baseline against which true multi-agent patterns are measured.

### Pattern 1: Autonomous Loop
One agent, one task queue, self-directed iteration. Known failure modes: unbounded task generation, context drift, goal misalignment accumulation.

### Pattern 2: Sequential Pipeline
Tasks flow through agents in a fixed order. Appropriate when task decomposition is well-understood and stable.

### Pattern 3: Orchestrator-Worker
A central coordinator decomposes tasks and delegates to specialists. The most common production pattern for complex task automation ([[summary-Wu_2024_autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation|Wu et al., 2024]]).

### Pattern 4: Role-Based Crew
Agents have fixed roles, goals, and personas; a predefined process governs interaction. Works when workflows map to organisational role structures (Hong et al., 2024).

### Pattern 5: Conversational Group Chat
Multiple agents share a message history and take turns. Speaker selection determines order. Supports emergent reasoning but requires careful turn management.

### Pattern 6: Handoff/Transfer
One agent explicitly transfers control to another; only one is active at a time. Serial by construction.

### Pattern 7: Personal Assistant with Heartbeat
A single agent with persistent identity ("soul") and scheduled autonomous invocation ("heartbeat"). The heartbeat enables proactive monitoring without waiting for human input — the agent can act without being asked.

### Pattern 8: Organisational Hierarchy
Agents arranged in an org chart; top-down task assignment with goal cascading. Agents receive assignments and return results without conversational interaction.

### Pattern 9: Shared Room / Concurrent Multi-Agent
Multiple agents with separate identities share a communication space and operate concurrently. Each agent maintains an isolated context window and sees only what has been communicated into the shared space. Human participants are first-class members. This is the only pattern combining concurrency, per-agent context isolation, and human peer participation.

## Taxonomy Summary

| Pattern | Concurrency | Human Role | Context Isolation |
|---|---|---|---|
| 0: Role Simulation | No | Initiator | None |
| 1: Autonomous Loop | No | Observer | N/A |
| 2: Sequential Pipeline | No | Initiator | Partial |
| 3: Orchestrator-Worker | Partial | Approver | Partial |
| 4: Role-Based Crew | Partial | Initiator | Partial |
| 5: Group Chat | No | Peer | Shared |
| 6: Handoff/Transfer | No | Configurable | Shared |
| 7: Personal Assistant | No | Peer | Per-agent |
| 8: Org Hierarchy | Yes (tasks) | Approver | Per-agent |
| 9: Shared Room | Yes | Peer/Authority | Per-agent (enforced) |

## Why the Distinction Matters

The distinction between Pattern 0 and Pattern 9 is the critical one for safety-critical applications. Pattern 0 (single-agent simulation) shares a single context and model — all "agents" have correlated errors. Pattern 9 (concurrent operation with context isolation) provides the structural basis for [[epistemic-independence]].

A single model holds all simulated perspectives in unified attention (see [[llm-architecture]]). Information "known" to one perspective is visible to all within the same context. Prompting cannot override this — it is a mathematical property of self-attention. Systems claiming "independent multi-agent analysis" must specify whether they implement Pattern 0 (simulation) or Pattern 9 (structural separation).

## Five Red Flags in Proposals

1. "Independent multi-agent analysis" where all agents use the same base model
2. "AI verification" without specifying what enforces separation between original and verification
3. "Self-correcting AI" without external feedback source (see [[self-correction-limitations]])
4. "Human-in-the-loop" without architectural enforcement mechanism (see [[governance-gates]])
5. Pattern 0 described as Pattern 9

## Relevance to Safety-Critical Systems

1. **Pattern selection determines safety properties.** The choice of pattern is not an implementation detail — it determines what independence, reliability, and human authority properties the system can provide.

2. **Cross-domain applications.** In aviation, a Pattern 7 heartbeat monitor can provide ambient flight condition surveillance. In medical settings, a Pattern 3 orchestrator-worker can coordinate specialist diagnostic agents. In oil and gas, a Pattern 9 shared room can support concurrent well monitoring with independent analysis. The pattern should match the operational requirements, not the other way around.

3. **Composability.** Real systems combine patterns: Pattern 7 agents within a Pattern 9 room, Pattern 3 orchestration within Pattern 4 role structures. Understanding the individual patterns is prerequisite to understanding compositions.
