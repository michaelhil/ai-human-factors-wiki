---
title: "AI-Specific Performance Shaping Factors"
type: evaluation
sources: []
related:
  - "[[hra-methods-for-ai]]"
  - "[[automation-bias]]"
  - "[[trust-calibration]]"
  - "[[calibration-and-confidence]]"
  - "[[epistemic-independence]]"
tags:
  - psf
  - performance-shaping-factors
  - hra
  - evaluation
  - ai-reliability
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# AI-Specific Performance Shaping Factors

When AI advisory systems are present, traditional performance shaping factors (available time, stress, complexity, experience, procedures, ergonomics, fitness for duty, work processes) are necessary but insufficient. Six additional PSFs capture the AI-specific dimensions that influence operator error probability.

## The Six AI-Specific PSFs

### 1. AI System Reliability
**Definition:** Probability that the AI advisory produces a correct output for the task type under analysis.

| State | Indicators |
|---|---|
| High (>95%) | Validated accuracy on comparable tasks; well-characterised failure modes |
| Moderate (80–95%) | Some validation data; known limitations |
| Low (<80%) | Limited validation; operating outside characterised conditions |

### 2. Operator Trust Calibration
**Definition:** Degree to which the operator's reliance on the AI matches the AI's actual reliability.

| State | Indicators |
|---|---|
| Well-calibrated | Verification checks proportional to AI accuracy; appropriate override rate |
| Over-trust | Immediate acceptance; low independent verification; see [[automation-bias]] |
| Under-trust | Excessive re-checking; benefit of correct AI not realised |

Observable indicators: response latency when AI recommends (immediate acceptance suggests over-trust), override rate relative to AI error rate.

### 3. AI Transparency
**Definition:** Degree to which the operator can access the reasoning behind the AI recommendation.

| State | Implication |
|---|---|
| High (reasoning visible and interpretable) | Supports independent checking; reduces [[automation-bias]] |
| Moderate (partial reasoning or confidence indicators) | Nominal |
| Low (recommendation only, no reasoning) | Operator cannot evaluate recommendation basis |

Related to [[opacity-and-explainability]]: even "visible" reasoning may be a rationalisation rather than a true explanation.

### 4. Human-AI Communication Quality
**Definition:** Effectiveness of information exchange between operator and AI system.

Covers display design quality, alarm clarity, integration with existing human-machine interface, and time to locate and interpret AI output. Poor communication quality amplifies all other PSFs — a correct AI recommendation poorly displayed may be misinterpreted.

### 5. AI Degradation Mode
**Definition:** Whether the AI system has annunciated its own degraded performance to the operator.

| State | Impact |
|---|---|
| Normal operation | Nominal |
| Annunciated degradation | Operator aware but must compensate |
| Silent degradation | **Most dangerous**: operator unaware of unreliable input; see [[degradation-characteristics]] |

Silent degradation is analogous to misleading indications in traditional HRA — the operator acts on information believed to be reliable that is not.

### 6. Multi-Agent Agreement Pattern
**Definition:** Degree of agreement among multiple AI agents advising on the same decision.

| State | Implication |
|---|---|
| Full agreement (independent models) | Reinforcing evidence; lower HEP |
| Full agreement (shared model) | Potential [[monoculture-collapse]]; agreement may not indicate independence |
| Full disagreement | Operator must reconcile conflicting advice under time pressure; higher HEP |

Whether agents share base models determines whether agreement is informative (independent convergence) or uninformative (shared bias). See [[epistemic-independence]].

## Interaction Effects

These PSFs do not operate independently. Key interactions:

- **Low transparency + Over-trust**: the operator cannot evaluate the AI's basis AND defaults to acceptance → highest [[automation-bias]] risk
- **Silent degradation + High trust**: the operator continues to rely on AI output that has degraded without knowing → systematic errors
- **Full disagreement + Time pressure**: the operator must reconcile conflicting advice quickly → highest independent reasoning demand
- **Low AI reliability + Well-calibrated trust**: the operator correctly questions AI output → effective human-AI teaming (desired state)

## Relevance to Safety-Critical Systems

1. **These PSFs are domain-agnostic.** They apply wherever AI advisory systems interact with human operators: aviation, medical, oil and gas, nuclear, process control. The specific values will differ by domain, but the structure is transferable.

2. **All illustrative values require empirical calibration.** No empirical data from domain-specific evaluations of AI-assisted operations exists. The PSF structure is conceptually sound; the numbers to populate it are missing.

3. **Silent degradation is the PSF with the highest consequence.** It carries the largest illustrative multiplier (10x) because it represents the condition where the operator is most exposed — relying on unreliable information without knowing it is unreliable.
