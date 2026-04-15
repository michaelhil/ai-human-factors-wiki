---
title: "Trust Calibration"
type: interaction
sources: []
related:
  - "[[automation-bias]]"
  - "[[calibration-and-confidence]]"
  - "[[skill-degradation]]"
  - "[[situation-awareness-in-human-ai-teams]]"
  - "[[hallucination]]"
tags:
  - trust
  - calibration
  - human-factors
  - over-trust
  - under-trust
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Trust Calibration

Trust calibration is the degree to which an operator's reliance on AI matches the AI's actual reliability. Well-calibrated trust means the operator relies on the AI when it is likely to be correct and questions it when it is likely to be wrong. Miscalibrated trust — either over-trust or under-trust — defeats the purpose of the advisory system.

## Three Bases of Trust

Lee and See (2004) identify three bases of trust in automation:

- **Performance**: does it work well? LLMs present unique calibration challenges here because performance varies unpredictably across domains and query types, making stable performance-based calibration difficult.
- **Process**: do I understand how it works? Inherently limited for LLMs — even with chain-of-thought explanations, the actual basis for an output is opaque (see [[opacity-and-explainability]]).
- **Purpose**: is it designed to help me? Less problematic for advisory systems explicitly designed for the operator.

LLMs produce fluent, confident text regardless of accuracy, biasing toward over-trust in a way that traditional automation does not. The [[calibration-and-confidence]] properties of LLMs mean the system itself provides unreliable signals for trust calibration.

## Trust Dynamics During Events

Trust is not static. Merritt and Ilgen (2008) showed that trust updates **asymmetrically**: a single AI error reduces trust more than a single correct recommendation increases it. During an extended event:

- If the AI provides a correct initial assessment but an incorrect projection later, trust may drop for **all** subsequent outputs, including correct ones
- In multi-agent systems, trust becomes **agent-specific**: the operator may trust one agent while distrusting another, creating selective reliance patterns that may not correlate with actual reliability
- Providing operators with information about **why** automation errs mitigates trust loss (Dzindolet et al., 2003): operators who understood limitations maintained more appropriate trust

## The Confidence Display Dilemma

Displaying AI confidence to operators presents a design tension. Since LLM self-reported confidence is not well calibrated (see [[calibration-and-confidence]]), displaying uncalibrated confidence scores could harm trust calibration by giving operators false precision.

More defensible design features include:
- **Provenance indicators**: what data the AI used
- **Limitation statements**: conditions outside training distribution
- **Performance feedback**: periodic accuracy information
- **Disagreement presentation**: when multiple agents disagree, presenting the disagreement rather than resolving it

Given the difficulty of stable trust calibration, **procedural safeguards** (mandatory independent verification for safety-significant recommendations) may be more reliable than relying on operator trust judgement alone.

## Training for Trust Calibration

Trust calibration exercises expose operators to controlled AI failures under conditions where consequences are instructional rather than operational. The goal: neither uncritical acceptance ([[automation-bias]]) nor blanket rejection.

Effective approaches vary timing, severity, and subtlety of AI errors so operators develop a realistic mental model of when and how the system can fail. Research on trust calibration in aviation automation suggests that exposure to failures under controlled conditions produces more appropriate trust than either verbal instruction about limitations or experience with a system that never fails during training.

## Relevance to Safety-Critical Systems

1. **LLMs undermine all three trust bases.** Variable performance, opaque process, and confident-regardless-of-accuracy output make trust calibration harder than for traditional automation.

2. **Cross-domain examples.** In aviation, pilots develop trust profiles for specific autopilot modes based on experience. In medical settings, clinicians learn which AI diagnostic suggestions to trust and which to question — but this learning requires experience with errors that may carry patient risk. In oil and gas, drillers calibrate trust in automated well monitoring through operational experience.

3. **Trust calibration is a training function, not just a design function.** System design provides the signals (provenance, limitations, disagreement); training develops the operator's ability to use those signals appropriately.
