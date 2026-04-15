---
title: "Summary — Regulatory Framework Gap Assessment for AI in Nuclear Applications (SwRI/NRC 2024)"
type: summary
sources:
  - raw/references/NRC_2024_ML24290A059.pdf
related:
  - "[[nuclear-ai-regulatory-considerations]]"
  - "[[opacity-and-explainability]]"
  - "[[degradation-characteristics]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[trust-calibration]]"
tags:
  - nuclear
  - regulation
  - gap-analysis
  - safety
  - standards
  - verification-and-validation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary — Regulatory Framework Gap Assessment for AI in Nuclear Applications

This report, prepared by the Center for Nuclear Waste Regulatory Analyses at Southwest Research Institute (SwRI) for the US NRC, presents the AI Regulatory Gap Analysis (AIRGA) — a systematic examination of whether NRC regulatory guides (RGs) and 10 CFR regulations adequately accommodate AI technologies. The study evaluated 517 RGs across ten NRC divisions, identifying potential gaps in fewer than 100 RGs.

## Methodology

The AIRGA used a three-question screening process for each RG:
- **Q0**: Can AI technologies be used within the scope of the RG?
- **Q1**: Is the RG flexible to allow use of AI?
- **Q2**: Does the RG provide adequate guidance to evaluate the use of AI?

Of 372 active RGs, 257 were screened out as irrelevant to AI. Of the 99 screened in, 71 were found to have potential gaps and 28 had no gaps. The regulations associated with RGs having gaps were then examined for potential conflicts with AI use.

## Eight Gap Categories

The 71 RGs with potential gaps were classified into eight types:

1. **Implied manual actions** — RGs implying actions by humans that AI could alternatively perform (10 RGs)
2. **Special computations** — insufficient guidance for evaluating AI-based computations such as probabilistic risk assessment or seismic analysis (17 RGs)
3. **Preoperational and initial testing programs** — testing programs that may not adequately address AI systems in safety roles (4 RGs)
4. **Habitability conditions under autonomous operations** — control room habitability requirements that assume human occupancy (3 RGs)
5. **Periodic testing, monitoring, surveillance, and reporting** — actions described as manual that could be performed by AI such as computer vision surveillance (38 RGs, the largest category)
6. **Software for critical applications** — software development standards that may need supplementing for AI-specific risks (7 RGs)
7. **Radiation safety support** — roles explicitly assigned to certified professionals (RSOs/ARSOs) that cannot be delegated to AI (19 RGs)
8. **Training and human factors engineering** — uncertainty about whether traditional HFE evaluation methods are adequate for AI systems (2 RGs)

## Key Regulatory Findings

The analysis found that most NRC regulations (10 CFR) are stated in broad terms with impersonal language — they require actions to be completed without specifying how — and are therefore generally adequate to regulate AI use. However, specific conflicts were identified:

- **10 CFR §50.54(k)** requires operators to be present in the control room at all times, raising the question of whether operators could take a passive oversight role if AI systems execute actions
- **10 CFR §50.46** and **Part 50 Appendix K** require physics-based models for emergency core cooling systems, explicitly limiting AI-based alternatives
- Regulations requiring "personnel" or "supervisors" to be present implicitly restrict AI from performing certain radiation safety functions
- Record retention requirements (§20.2103(b)) implicitly limit AI use because AI-generated information should be captured as fixed records rather than regenerated dynamically

## Standards Assessment

The report examined whether existing professional standards could fill identified gaps. Key findings:

- **IEEE Standard 1012-2004** (Software V&V) is general enough to guide AI software development and is already endorsed by RG 1.168, but supplementary guidance is needed for data quality, AI-specific V&V, and fail-safe design
- **IEEE Standard 2841-2022** (Deep Learning Evaluation) provides a useful assessment index framework but lacks practical guidance on data quality/quantity and systematic fail-safe design
- **No mature AI-specific standards** were found suitable for NRC endorsement — existing AI standards focus on defining terminology and desirable traits rather than providing practical regulatory guidance
- The ISO 8000 series on data quality addresses accuracy and context but not data variety or sufficiency for ML purposes

## Six Recommendations

The report recommends that NRC staff:
1. Develop guidance on data quality for ML (accuracy, context, variety, quantity)
2. Develop guidance on systematic testing and documentation for AI confidence, especially for rare and extreme inputs
3. Develop guidance on systematic fail-safe design (active detection of anomalous inputs and outputs, error mitigation)
4. Develop guidance on testing and documentation for AI-based computations
5. Examine FDA and FAA approaches to AI regulation for cross-industry lessons
6. Deploy a pilot program evaluating actual licensee AI computations

## Significance

The AIRGA provides the most detailed publicly available analysis of how existing US nuclear regulations interact with AI technologies. Its finding that regulations are broadly adequate but guidance is lacking reinforces the complementary trilateral principles paper ([[summary-NRC_2024_ML24241A252|CNSC/ONR/NRC, 2024]]). The emphasis on data quality, fail-safe design, and systematic testing identifies concrete areas where regulatory development is needed, rather than wholesale regulatory revision. The recommendation to learn from FDA and FAA approaches reflects awareness that nuclear regulators are not facing AI governance challenges in isolation.
