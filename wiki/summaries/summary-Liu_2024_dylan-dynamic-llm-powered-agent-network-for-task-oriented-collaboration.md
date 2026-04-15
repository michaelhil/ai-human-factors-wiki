---
title: "Summary: DyLAN — Dynamic LLM-Powered Agent Network for Task-Oriented Collaboration"
type: summary
sources:
  - raw/references/Liu_2024_dylan-dynamic-llm-powered-agent-network-for-task-oriented-collaboration.pdf
related:
  - "[[multi-agent-roles]]"
  - "[[multi-agent-taxonomy]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[epistemic-independence]]"
  - "[[perceive-reason-act-loop]]"
tags:
  - multi-agent
  - dynamic-teams
  - agent-selection
  - coordination
  - team-optimisation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: DyLAN — Dynamic LLM-Powered Agent Network for Task-Oriented Collaboration

Liu et al. (2024) introduce DyLAN (Dynamic LLM-Powered Agent Network), a framework that addresses a fundamental limitation of existing multi-agent systems: static team composition and fixed communication structures. Published at COLM 2024, DyLAN demonstrates that **automatically selecting and dynamically pruning agents based on their measured contributions** outperforms both single-agent and static multi-agent approaches across code generation, decision making, general reasoning, and arithmetic tasks.

## Two-Stage Paradigm

DyLAN operates in two stages:

**Stage 1: Team Optimisation.** Given a pool of candidate agents (each with different role prompts), DyLAN runs a preliminary trial on the task and evaluates each agent's contribution using an unsupervised metric called the **Agent Importance Score**. This score is computed via backward message passing through a Temporal Feed-Forward Network (T-FFN) — a graph structure where nodes represent agents at different time steps and edges represent communication channels. Agents rate each other's contributions in a forward pass (propagation); these ratings are aggregated backward to produce cumulative importance scores. The top-k agents are selected for the actual task.

**Stage 2: Task Solving.** The selected agents collaborate through the T-FFN with **agent team reformation** — a dynamic pruning mechanism where an LLM Ranker evaluates agent responses at each time step and deactivates low-performing agents. This makes the communication structure adaptive: the team shrinks during execution as less-contributory agents are removed. An **early-stopping** mechanism, inspired by Byzantine fault tolerance theory (requiring 2/3 agent consensus), terminates collaboration when sufficient agreement is reached.

## Key Results

- **Dynamic selection outperforms static teams.** On MMLU general reasoning, selecting 4 agents from 7 candidates using Agent Importance Score improved accuracy by up to 25% on specific subjects compared to using all 7 agents. The optimised 4-agent team also outperformed 4-agent LLM Debate and other static multi-agent baselines.
- **Fewer agents can be better.** An optimised team of 2–4 agents consistently outperformed the full 7-agent pool, confirming that coordination overhead from unnecessary agents degrades performance — a finding consistent with [[summary-Chan_2024_chateval-better-llm-based-evaluators-through-multi-agent-debate|Chan et al. (2024)]] showing peak performance at 3–4 agents.
- **Data-driven selection beats human intuition.** Agent Importance Score outperformed both random selection and "Human Prior Selection" (where GPT-4 selected agents based on role descriptions). Human priors sometimes performed worse than random — for example, selecting "Doctor" for clinical knowledge topics when the actual task benefited more from "Programmer" reasoning patterns. This suggests that pre-assigned roles may not capture agents' actual collaborative contributions.
- **Stability across models.** DyLAN showed consistent performance across different backbone models (GPT-3.5 and GPT-4) with nearly identical API call counts, while static approaches like Reflexion and CodeT showed large performance variation tied to the backbone model.
- **Temperature robustness.** DyLAN's performance improved at higher temperatures (more diverse agent responses), while baseline methods degraded. The team reformation mechanism effectively filters low-quality outputs from high-temperature sampling.

## Relevance to This Wiki

DyLAN provides the strongest empirical case that **team composition should be treated as a variable to optimise, not a fixed design parameter**. The finding that human role intuitions are unreliable predictors of agent contribution has direct implications for [[multi-agent-roles]] — it suggests that in safety-critical deployments, role assignments should be validated through measured performance rather than assumed from role descriptions. The dynamic pruning mechanism (agent team reformation) also provides a concrete approach to the coordination overhead problem identified in [[multi-agent-coordination-failures]], where adding agents beyond an optimal count degrades system performance.

The T-FFN formalism is notable because it unifies several existing multi-agent communication structures (debate, pipeline, CAMEL role-playing) under a single graph representation, providing a formal basis for comparing the communication topology dimension of [[multi-agent-taxonomy]].
