---
title: "The Perceive-Reason-Act Loop"
type: architecture
sources:
  - raw/references/Yao_2023_react-synergizing-reasoning-and-acting-in-language-models.pdf
  - raw/references/Sumers_2024_cognitive-architectures-for-language-agents.pdf
related:
  - "[[llm-architecture]]"
  - "[[tool-calling]]"
  - "[[memory-architectures]]"
  - "[[context-windows]]"
  - "[[summary-yao-2023]]"
tags:
  - agent
  - react
  - architecture
  - cognitive-architecture
  - perceive-reason-act
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# The Perceive-Reason-Act Loop

A bare LLM generates text. An **agent** perceives its environment and acts upon it. The transition from one to the other requires embedding the LLM in a loop that provides observations, enables actions, and iterates over time.

## From LLM to Agent

The classical agent definition (Russell and Norvig, 2020) describes an entity that perceives its environment through sensors and acts upon it through actuators. An LLM becomes an agent when embedded in a system that:

1. **Provides observations** about the environment (through tool results, retrieved documents, or sensor data injected into context)
2. **Gives means to take actions** with external effects (through [[tool-calling]] that executes in the real world)
3. **Iterates this loop over time** (through session management that maintains continuity across multiple invocations)

What the LLM contributes is flexible natural-language reasoning over arbitrary inputs. What it lacks is grounding in the physical world: everything the agent "perceives" is text or token representations. The agent has no independent access to reality; its world is its [[context-windows]].

## The ReAct Pattern

The standard implementation is the **ReAct pattern** (Yao et al., 2023): the agent alternates between:

- **Thought**: reasoning about the current situation
- **Action**: calling a tool
- **Observation**: incorporating the tool result into context

This cycle repeats until the agent has enough information to produce a final response or reaches a stopping condition.

Sumers et al. (2024) map this pattern to cognitive architecture concepts from cognitive science, drawing parallels between agent components and human cognitive functions:

| Agent Component | Cognitive Analogue |
|---|---|
| Context window | Working memory |
| Tool results / retrieved docs | Perception |
| Tool calling | Motor control / action |
| System prompt | Long-term procedural memory |
| Episodic memory store | Long-term episodic memory |
| Knowledge graph | Long-term semantic memory |

These parallels are useful for human factors professionals because they connect AI agent architecture to established cognitive frameworks, making the agent's capabilities and limitations expressible in terms the HF community already uses.

## The Autonomy Scale

LLM-based systems occupy a spectrum of autonomy:

| Mode | Key Capability | Human Authority |
|---|---|---|
| **Chatbot** | Generates text; no tools; no state | Full — human acts on all outputs |
| **Assistant** | Context-aware, multi-turn; executes on explicit instruction | Full — human retains initiative |
| **Tool-using agent** | Goal-directed multi-step execution via tools | Partial — human sets goal, agent executes |
| **Persistent agent** | Cross-session identity and memory; learns from experience | Partial — human initiates sessions |
| **Autonomous agent** | Scheduled self-invocation (heartbeat); proactive action | Reduced — agent may act without prompt |

The key transitions: **tool use** (the agent can act on the world), **persistence** (stable identity across sessions, supporting trust calibration), and **heartbeat** (proactive action without being asked). Each transition adds capability and adds failure modes.

## System Prompts and Persona

The **system prompt** (sometimes called the "soul" in practitioner terminology) defines the agent's identity: its role, expertise domain, constraints, communication style, and behavioural boundaries. In persistent agent systems, the system prompt is maintained across sessions, giving the agent a consistent identity.

The system prompt constrains but does not guarantee behaviour. The model treats it as part of its context, weighted by the attention mechanism alongside everything else. A strong user prompt, a retrieved document with conflicting instructions, or an adversarial injection can override system prompt instructions. The system prompt is an instruction to the model, not a hard constraint on its computation — this is a structural property of the [[llm-architecture]], not an implementation gap.

## ReAct: Empirical Evidence

The ReAct paper (Yao et al., 2023) provides the key empirical comparison between reasoning-only (Chain-of-Thought) and reasoning-with-acting (ReAct) approaches:

| Property | Chain-of-Thought (CoT) | ReAct |
|---|---|---|
| [[hallucination]] rate | 56% of failures | 14% of failures |
| Reasoning error rate | 16% of failures | 47% of failures |
| Grounding | Internal knowledge only | External observations via tools |

The critical finding: **CoT's dominant failure is hallucination** because reasoning from internal knowledge alone is ungrounded. ReAct reduces hallucination by 4x by anchoring reasoning in retrieved evidence. However, ReAct introduces its own failure mode — reasoning errors where the agent gets stuck in repetitive action loops or fails to recover from uninformative search results.

The best-performing approach combines both: ReAct + CoT self-consistency, where the agent uses internal reasoning when confident and falls back to retrieval when not. This supports the [[hybrid-decision-pipeline]] concept of matching the right reasoning approach to the task.

**Interpretability advantage:** ReAct traces are human-readable — each thought explains the decision to take an action, and each observation shows what was found. This provides a structured rationale that supports auditability, even though the model's internal computation remains opaque. See [[opacity-and-explainability]].

## What LLMs Do Well in Agent Roles

Despite the failure modes documented across this wiki, LLM agents have demonstrated genuine strengths in several areas relevant to safety-critical advisory: information synthesis across large document collections, natural language reasoning about multi-factor conditions, structured extraction from unstructured text, and pattern recognition across operational history. The boundary between LLM-appropriate and LLM-inappropriate tasks is developed in [[hybrid-decision-pipeline]].

## Relevance to Safety-Critical Systems

1. **The agent is only as good as its observations.** If the data pipeline feeding observations into the agent's context is incomplete, stale, or corrupted, the agent reasons on bad premises regardless of its reasoning capability.

2. **The ReAct loop introduces sequential dependencies.** Each reasoning step depends on the previous tool result. A tool-calling error early in the chain corrupts all subsequent reasoning. See [[tool-calling]].

3. **Autonomy level determines risk profile.** A chatbot that generates text carries different risks than an autonomous agent with heartbeat-driven monitoring. System design, governance, and regulatory treatment should be scaled to the autonomy level.

4. **The cognitive architecture mapping is useful for HF analysis.** Framing agent capabilities in terms of working memory, perception, and action allows human factors professionals to apply established cognitive task analysis methods to human-AI systems.
