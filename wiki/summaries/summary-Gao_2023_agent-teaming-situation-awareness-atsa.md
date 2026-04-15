---
title: "Summary: Gao et al. (2023) — Agent Teaming Situation Awareness (ATSA)"
type: summary
sources:
  - raw/references/Gao_2023_agent-teaming-situation-awareness-atsa.pdf
related:
  - "[[situation-awareness-in-human-ai-teams]]"
  - "[[multi-agent-taxonomy]]"
  - "[[perceive-reason-act-loop]]"
  - "[[automation-bias]]"
tags:
  - situation-awareness
  - atsa
  - human-ai-teaming
  - distributed-sa
  - framework
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Gao et al. (2023) — Agent Teaming Situation Awareness (ATSA)

**Full citation:** Gao, Q., Xu, W., Shen, M., and Gao, Z. (2023). Agent Teaming Situation Awareness (ATSA): A Situation Awareness Framework for Human-AI Teaming. arXiv:2308.16785.

## Key Contribution

This Zhejiang University paper introduces the Agent Teaming Situation Awareness (ATSA) framework, the first SA framework specifically designed for human-AI teaming (HAT) that treats both human and AI as **SA subjects** — entities that maintain their own situation awareness, not merely objects that humans monitor. ATSA bridges Endsley's individual three-level model and Stanton's distributed SA theory, providing the theoretical foundation for the [[situation-awareness-in-human-ai-teams]] wiki page.

## The Core Innovation: AI as SA Subject

Prior SA frameworks for automation treated machines as SA objects — things the human maintains awareness *about*. ATSA recognises that AI agents (particularly LLM-based agents) have crossed the threshold from automation to autonomy: they perceive, comprehend, and project, forming their own SA about the environment, the task, and their human teammates. This creates **bidirectional SA interaction**: humans maintain SA about AI teammates, and AI agents maintain SA about humans. The interaction is mutual and dynamic.

## ATSA Framework Structure

**Individual level:** Both human and AI are represented by **perceptual cycles** — perception→comprehension→projection→action loops that correspond to Endsley's three SA levels. For AI agents, these map to: perception (tool results, sensor data injected into context), comprehension (LLM inference), projection (forward reasoning or simulation), and action (tool calls, communication). This parallels the cognitive architecture mapping in [[perceive-reason-act-loop]].

**Team level:** Three components:
- **Teaming understanding**: shared mental models between human and AI — what each knows about the other's role, capabilities, and current state
- **Teaming control**: coordination mechanisms (turn-taking, delivery modes, authority structures) — maps to [[governance-gates]] and [[delivery-modes]]
- **The world**: the shared operational environment that both human and AI perceive

**Transactive SA**: the SA that is exchanged between team members. Not identical (each member holds different knowledge suited to their role) but **compatible** — members hold mutually coherent information states that enable coordination. This is the DSA concept applied to human-AI teams.

## Theoretical Positioning

ATSA explicitly favours Stanton's distributed SA (DSA) over Endsley's individual decomposition model for HAT, because:
1. DSA naturally accommodates non-human agents as SA holders
2. Compatible (not identical) SA is more appropriate than shared SA for teams with heterogeneous members
3. The systemic view captures team-level properties that individual-level analysis misses

However, ATSA retains Endsley's three-level model at the individual level — it bridges both approaches rather than choosing one.

## The Human-Automation → Human-Autonomy Transition

The paper distinguishes **automation** (subordinate relationship — machine follows predefined program regardless of context) from **autonomy** (teammate relationship — machine adapts through learning and generalisation). This transition is what makes SA frameworks necessary for AI: autonomous AI teammates exhibit unexpected behaviours, require mutual adaptation, and must be understood as cognitive participants, not just tools.

## Relevance to This Wiki

ATSA provides the theoretical foundation for the [[situation-awareness-in-human-ai-teams]] page. For safety professionals, the key implications are: (1) AI agents are SA subjects, not just SA objects — system design must support the AI's SA (adequate context, timely data, appropriate tools) as well as the human's SA about the AI; (2) **transactive SA** (compatible but not identical knowledge) is the design target, connecting to [[delivery-modes]] and the SA Bridge agent role in [[multi-agent-roles]]; (3) the bidirectional nature means both directions can fail — the human can lose SA about the AI state, AND the AI can have inadequate SA about the human's needs and current focus.
