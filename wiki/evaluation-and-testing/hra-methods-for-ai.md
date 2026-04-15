---
title: "HRA Methods for AI-Assisted Operations"
type: evaluation
sources: []
related:
  - "[[automation-bias]]"
  - "[[trust-calibration]]"
  - "[[epistemic-independence]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[ai-specific-performance-shaping-factors]]"
tags:
  - hra
  - evaluation
  - spar-h
  - idheas-eca
  - atheana
  - safety-analysis
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# HRA Methods for AI-Assisted Operations

Human Reliability Analysis (HRA) methods quantify human error probability (HEP) in safety-critical systems. Current methods were developed assuming the operator as the sole cognitive agent. AI advisory systems introduce a third element — the AI's recommendation — that creates new failure modes, new dependencies, and new performance shaping factors that no current method can model without extension.

## The Structural Gap

All current HRA methods share a foundational assumption: the operator is the sole cognitive agent making decisions, potentially influenced by procedures, training, and workplace factors. AI advisory invalidates this assumption by introducing a second cognitive participant whose recommendations interact with the operator's own reasoning in ways that create new error pathways.

The resulting four-branch decision tree at any AI-assisted decision point:

1. **AI correct + Operator follows** → Correct outcome (desired)
2. **AI correct + Operator overrides** → Incorrect outcome (inappropriate AI override)
3. **AI incorrect + Operator follows** → Incorrect outcome ([[automation-bias]])
4. **AI incorrect + Operator overrides** → Correct outcome (successful independent verification)

The probabilities of branches 2–4 depend on factors (AI reliability, operator trust calibration, AI transparency) that current HRA methods do not model.

## Three Methods and Their Extension Paths

### SPAR-H
Uses eight performance shaping factors (PSFs) as multipliers on a nominal HEP. **Extension path:** Add AI-specific PSFs as additional multipliers. The PSF multiplier model can accommodate new factors, but the dependency model (which handles sequential actions) cannot represent the three-way conditional: prior action outcome × AI recommendation correctness × operator follow/override decision. See [[ai-specific-performance-shaping-factors]] for the proposed PSF extensions.

### IDHEAS-ECA
Decomposes operator performance into five macrocognitive functions (detection, understanding, decision-making, action execution, teamwork) with cognitive failure modes (CFMs) per function. **Extension path:** The "teamwork" function already models crew interaction. Extending it to human-AI teaming is the most natural adaptation: communication quality, authority relationships, shared understanding map onto existing teamwork CFMs. AI-specific CFMs can be defined per function: [[automation-bias]] as a decision-making CFM, alert fatigue as a detection CFM, mode confusion as an understanding CFM, reconciliation failure as a teamwork CFM.

IDHEAS-ECA is the most promising extension framework because it distinguishes cognitive failure modes from performance-influencing factors more cleanly than SPAR-H, making it easier to add AI-specific failure modes without restructuring the method.

### ATHEANA
Identifies "unsafe actions" (errors of commission) by searching for "error-forcing contexts" (EFCs): combinations of conditions that make the wrong action appear correct. **Extension path:** An incorrect AI recommendation constitutes an error-forcing context. If the AI confidently recommends the wrong procedure during an ambiguous condition, and the operator's training makes the recommendation seem reasonable, the combination creates an EFC. ATHEANA provides the richest vocabulary for describing how AI creates conditions for operator error, but its weakness is quantification.

## Cross-Method Comparison

| Property | SPAR-H | IDHEAS-ECA | ATHEANA |
|---|---|---|---|
| Best at capturing | PSF interactions; quantitative sensitivity | Cognitive failure modes; AI as team member | Error-forcing contexts; commission errors |
| Extension path | Add AI PSF multipliers | Extend teamwork function with AI CFMs | AI recommendation as EFC factor |
| Quantification | Direct (multiplier-based) | Semi-structured (CFM activation) | Qualitative (expert judgement) |
| Limitation for AI | Dependency model too simple | No empirical CFM rates for AI interactions | Cannot capture omission-type failures |

## The Dependency Problem

Current HRA dependency models handle two-event sequences: the probability of Error B given that Error A occurred (or did not). AI advisory introduces a three-way conditional: the probability of operator error given both the prior action outcome and the AI recommendation's correctness. No current method handles this without structural extension.

## What Remains Unquantifiable (As of 2026)

- Empirical HEPs for AI-assisted operations do not exist. All quantitative values in current HRA extensions are assumed by analogy, not measured.
- The conditional probability that an operator overrides a correct AI recommendation (inappropriate override) has no empirical basis.
- The effect of multi-agent disagreement on operator error probability is unknown.
- Trust dynamics during extended events (how trust evolves over multiple AI interactions) cannot be modelled with static PSFs.

## Relevance to Safety-Critical Systems

1. **The HRA gap is not domain-specific.** Every domain using probabilistic risk assessment that introduces AI advisory will encounter it. The nuclear domain makes it visible because its PSA framework is formal; other domains face the same problem less visibly.

2. **IDHEAS-ECA is the recommended framework** for domains developing AI-aware HRA because its macrocognitive structure naturally accommodates AI as a cognitive team member.

3. **Empirical data is the bottleneck.** Method extension is conceptually tractable. Populating the extensions with validated parameters requires simulator studies with human participants interacting with AI advisory systems under controlled conditions.
