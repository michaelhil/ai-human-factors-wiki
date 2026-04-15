---
title: "Summary: Single-Agent or Multi-Agent Systems? Why Not Both?"
type: summary
sources:
  - raw/references/Gao_2025_single-agent-or-multi-agent-systems-why-not-both.pdf
related:
  - "[[multi-agent-taxonomy]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[degradation-characteristics]]"
  - "[[hybrid-decision-pipeline]]"
  - "[[tool-calling]]"
tags:
  - multi-agent
  - single-agent
  - hybrid
  - cost-efficiency
  - defect-taxonomy
  - agent-routing
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Single-Agent or Multi-Agent Systems? Why Not Both?

Gao et al. (2025) present the most comprehensive empirical comparison of multi-agent systems (MAS) and single-agent systems (SAS) to date, spanning 15 datasets, 7 task categories, and 9 frameworks across both proprietary (GPT-4, Gemini) and open-source (Llama) models. The central finding challenges the prevailing assumption that MAS consistently outperforms SAS: **as frontier LLMs improve in long-context reasoning, memory, and tool use, the accuracy advantage of MAS diminishes from 10–16% to 0.8–3%, while MAS incurs 4–220x higher token costs.**

## Diminishing MAS Advantage

Comparing results from the original framework papers (using ChatGPT-era models) with Gemini 2.0 Flash, the authors show that MAS accuracy improvements consistently shrink. On MetaGPT-HumanEval, the gap drops from 10.7% to 3.0%. On MathDebate-GSM8K, from 9% to 0.8%. On simple tasks, MAS can even **underperform** SAS due to the overhead of inter-agent communication and overthinking. Across all seven datasets studied, MAS consumes 4–220x more prefill tokens than SAS, with decode tokens 2–12x higher even with perfect context reuse.

## Three MAS Defect Types

Modelling multi-agent execution as a directed dependency graph, the paper identifies three structural defect categories:

**Node-Level Defect:** Both MAS and SAS are bottlenecked by the capability of the critical agent responsible for the hardest subtask. Task decomposition into multiple agents does not help if the most difficult sub-problem still exceeds a single LLM's capability. Approximately 80% of cases are "ties" (Both Pass or Both Fail), indicating the difficulty lies in the task itself, not the system architecture.

**Edge-Level Defect:** Downstream agents become overwhelmed by inputs from upstream agents. In multi-way conversations and iterative refinements, high-in-degree nodes in the execution graph receive excessive information, leading to overthinking and incorrect results. This is analogous to the overthinking observed in reasoning models, but exacerbated by MAS because agents process substantially more data. Example: in SelfCol code generation, problem analyst and tester agents introduced too many unnecessary edge cases, overloading the coder agent.

**Path-Level Defect:** Errors propagate through chains of agent interactions. When intermediate outputs are summarised or filtered between agents, crucial context can be lost — and unlike SAS, the information loss is unrecoverable because downstream agents no longer have access to the full history. A concrete example: a correct solution proposed in an early debate round was lost during summarisation, causing the final answer to be wrong.

## Hybrid SAS-MAS Paradigms

To capture the strengths of both approaches, the paper proposes two integration strategies:

**Agent Routing:** An LLM-based rater assesses each request's difficulty and routes it to either SAS (simple tasks) or MAS (complex tasks). With a properly tuned threshold, routing achieves higher accuracy than either SAS or MAS alone while significantly reducing costs.

**Agent Cascade:** SAS attempts the task first. The output is evaluated for quality (e.g., code correctness via tests). If satisfactory, it is returned directly; if not, the request is escalated to MAS. This "try cheap first" approach achieves up to 12% accuracy improvement over MAS alone while reducing costs by up to 88%.

Both paradigms leverage a **confidence-guided critical path tracing** method that identifies which agents bottleneck overall MAS performance, enabling targeted model upgrades for the most impactful agents rather than uniformly upgrading all agents.

## Relevance to This Wiki

This paper fundamentally reframes the MAS vs SAS question from "which is better" to "when and where each adds value." For safety-critical applications, the three defect types map directly to [[multi-agent-coordination-failures]]: edge-level defects correspond to the flooding and overthinking risks documented there, while path-level defects correspond to context divergence and information loss. The hybrid routing/cascade paradigms provide a concrete architectural pattern for [[hybrid-decision-pipeline]] design: use SAS for well-defined tasks where a single capable model suffices, and reserve MAS for genuinely complex problems requiring multiple perspectives or specialised decomposition. The finding that MAS advantage diminishes with model capability has direct implications for deployment planning — architectures designed around today's model limitations may not justify their coordination overhead as models improve.
