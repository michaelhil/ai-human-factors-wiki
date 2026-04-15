---
title: "Summary — Considerations for Developing AI Systems in Nuclear Applications (CNSC/ONR/NRC 2024)"
type: summary
sources:
  - raw/references/NRC_2024_ML24241A252.pdf
related:
  - "[[nuclear-ai-regulatory-considerations]]"
  - "[[trust-calibration]]"
  - "[[automation-bias]]"
  - "[[degradation-characteristics]]"
  - "[[opacity-and-explainability]]"
  - "[[skill-degradation]]"
  - "[[delivery-modes]]"
tags:
  - nuclear
  - regulation
  - safety
  - human-factors
  - lifecycle
  - architecture
  - governance
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary — Considerations for Developing AI Systems in Nuclear Applications

This trilateral principles paper, jointly authored by the Canadian Nuclear Safety Commission (CNSC), the UK Office for Nuclear Regulation (ONR), and the US Nuclear Regulatory Commission (NRC), outlines high-level considerations for deploying AI in nuclear facilities. It is not regulation or guidance but an agreed set of principles that all participants in the AI lifecycle — developers, integrators, licensees, and regulators — should consider.

## Four-Region Categorisation Model

The paper's central framework categorises nuclear AI use cases along two axes: **amount of AI autonomy** (insight/collaboration vs. operation/full autonomy) and **significance of AI failure** (minimal vs. significant safety/security impact). This produces four regions:

- **Region 1** (low autonomy, low consequence): AI assists human decision-making with minimal safety impact; greatest deployment flexibility.
- **Region 2** (high autonomy, low consequence): AI operates with little human oversight but failure consequences are limited; requires maintenance and change control.
- **Region 3** (low autonomy, high consequence): AI informs decisions that could significantly impact safety; robust verification of outputs is required before action.
- **Region 4** (high autonomy, high consequence): AI makes or executes decisions with significant safety impact and limited time for human verification; requires the most robust components and defence-in-depth.

The document distinguishes automation (rule-based, pre-programmed responses) from AI-enabled autonomy (intelligence-based, adaptive responses to unanticipated situations).

## Existing Safety and Security Engineering Principles

The paper argues that existing nuclear safety standards (IEEE 7-4.3.2, IEC 60880, IEC 61513) were not written with AI in mind but remain applicable as starting points. Where standards cannot be directly applied, a **gap analysis** approach is recommended: identify which parts apply, which do not, and what mitigations address residual risk. Defence-in-depth principles — diversity, redundancy, separation, and segregation — remain applicable so that safety is not wholly dependent on any single AI element. The simplicity principle is also invoked: AI may not be appropriate where simpler technology achieves the objective with fewer unknown failure types.

## Human and Organisational Factors

The document identifies several human factors challenges specific to nuclear AI deployment:

- **Function allocation**: determining which functions to assign to AI vs. humans, with attention to supervisory and monitoring roles that humans must maintain.
- **Trust dynamics**: operators may over-trust AI (assuming it is always correct, bypassing verification) or under-trust it (second-guessing all decisions). Both undermine the teaming objective.
- **Black-box opacity**: unlike traditional nuclear I&C (where operators can memorise logic circuits and verify operation through channel checks), AI systems provide little insight into their reasoning process.
- **Training requirements**: training programmes must address AI failure recognition, intervention procedures, and control handover — and must adapt as AI systems evolve.
- **Safety culture**: monitoring whether AI decisions remain consistent with safety priorities requires new organisational mechanisms, potentially including feedback loops from safety culture monitoring to AI model adjustment.
- **Personnel qualification**: maintaining minimum human competency levels for AI-augmented jobs, with appropriate redundancy and credentialing.

## AI Architecture Considerations

The paper identifies three architectural principles for nuclear AI:

- **System boundaries**: constraining AI input/output so that trust can be placed in the wider system architecture rather than requiring complete trust in the AI component. Data availability, output bounding, and isolation principles limit unintended consequences.
- **Monitoring**: continuous assessment of AI model performance (accuracy, error rates, bias) alongside monitoring the physical nuclear environment. Monitoring should include anomaly detection for adversarial attacks.
- **Modularization**: dividing AI systems into well-defined modules promotes flexibility, maintainability, and explainability. Domain adaptation risks arise when transferring AI from one application to another. Modular design supports fault isolation and root-cause tracing.

## AI Lifecycle Management

The paper identifies unique lifecycle considerations for AI in nuclear applications:

- **Data drift**: operational data diverges from training data over time, degrading performance.
- **Model drift**: the model ceases to faithfully represent the underlying phenomena.
- **Configuration management**: the open-source, rapidly evolving AI ecosystem intensifies change management challenges. Off-label use and transfer learning introduce risks not present in the original development context.
- **V&V challenges**: existing verification and validation techniques may be inadequate for AI systems because input-output relationships are opaque, the state space is enormous, and systems can change through retraining. No method currently exists to quantify the failure probability of an AI component.

## Documenting AI Safety and Security

The paper notes that current inability to quantify AI failure probability means safety cases must derive integrity from the system architecture (bounding, monitoring, modularization) rather than component-level reliability claims. Testing alone cannot provide adequate assurance due to the exponential growth of internal states. Novel security approaches are needed because AI systems introduce new attack vectors (e.g., training data manipulation). Documentation should include V&V manuals, testing procedures, methods, and user guides.

## Significance

This is the first jointly published trilateral nuclear regulatory position on AI. While non-binding, it signals regulatory convergence across three major nuclear nations and provides a framework that licensees can use to anticipate regulatory expectations. The four-region categorisation model offers a structured approach to proportionate regulatory scrutiny based on autonomy and consequence.
