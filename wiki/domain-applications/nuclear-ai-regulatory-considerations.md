---
title: "Nuclear AI Regulatory Considerations"
type: application
sources:
  - raw/references/NRC_2024_ML24241A252.pdf
  - raw/references/NRC_2024_ML24290A059.pdf
related:
  - "[[trust-calibration]]"
  - "[[automation-bias]]"
  - "[[degradation-characteristics]]"
  - "[[opacity-and-explainability]]"
  - "[[governance-gates]]"
  - "[[delivery-modes]]"
  - "[[skill-degradation]]"
  - "[[epistemic-independence]]"
  - "[[monoculture-collapse]]"
  - "[[non-determinism-and-reproducibility]]"
tags:
  - nuclear
  - regulation
  - safety
  - human-factors
  - architecture
  - lifecycle
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Nuclear AI Regulatory Considerations

The nuclear industry presents a distinctive deployment context for AI: a mature safety culture, rigorous regulatory oversight, well-established engineering standards, and consequence severity that ranges from operational inconvenience to radiological release. This page synthesises regulatory perspectives on deploying AI in nuclear applications, drawing on the first trilateral principles paper jointly published by the Canadian Nuclear Safety Commission (CNSC), the UK Office for Nuclear Regulation (ONR), and the US Nuclear Regulatory Commission (NRC) ([[summary-NRC_2024_ML24241A252|CNSC/ONR/NRC, 2024]]).

## Four-Region Categorisation Model

The trilateral paper proposes categorising nuclear AI use cases along two axes:

| | Low autonomy (Insight/Collaboration) | High autonomy (Operation/Full Autonomy) |
|---|---|---|
| **High failure consequence** | Region 3: AI informs safety-significant decisions; human verification required before action | Region 4: AI makes/executes safety-significant decisions; limited time for human verification |
| **Low failure consequence** | Region 1: AI assists human decisions with minimal safety impact; greatest flexibility | Region 2: AI operates independently with minimal safety impact; requires change control |

This framework structures proportionate regulatory scrutiny. Region 1 applications may tolerate higher uncertainty about AI behaviour, while Region 4 applications require the most robust defence-in-depth and may currently be too challenging to justify for deployment.

The model draws a useful distinction between **automation** (pre-programmed rule-based responses) and **AI-enabled autonomy** (intelligence-based, adaptive responses to unanticipated situations). Traditional reactor protection systems are automated but not autonomous — they follow deterministic logic. AI systems introduce the possibility of self-directed behaviour, which fundamentally changes the basis for regulatory assurance.

## Applying Existing Safety Standards

Nuclear safety standards such as IEEE 7-4.3.2 (digital computers in safety systems), IEC 60880 (software for category A functions), and IEC 61513 (I&C systems important to safety) were developed for deterministic software. The trilateral paper recommends a **gap analysis** approach: determine which existing standards apply to AI systems, identify where they fall short, and develop mitigations for residual risk.

This pragmatic approach recognises that AI-specific nuclear safety standards will not be available soon. The fast pace of AI development makes it unlikely that consensus standards will keep pace with the technology, so existing standards remain the starting point.

Key safety engineering principles that transfer directly to AI systems:
- **Defence-in-depth**: no single AI element should be solely responsible for safety
- **Diversity and redundancy**: multiple independent barriers mitigate common-cause failure (see [[monoculture-collapse]])
- **Simplicity**: AI may not be appropriate where conventional technology achieves the objective with fewer unknown failure types
- **Separation and segregation**: AI functions should be architecturally isolated to prevent cascading failures

## Human Factors in Nuclear AI

The nuclear context amplifies several human factors challenges documented elsewhere in this wiki:

### Function Allocation

Deploying AI in nuclear systems requires explicit decisions about which functions are allocated to AI vs. humans. Unlike consumer AI applications, nuclear function allocation must also address:
- Supervisory and monitoring roles that remain with humans
- Novel responsibilities created by AI introduction (e.g., monitoring AI performance)
- The ability to intervene and take control from the AI
- Procedures for handover of control in both directions (human-to-AI, AI-to-human)

### Trust in an Opaque System

Traditional nuclear I&C is designed for transparency: operators can memorise logic circuits, verify operation through channel checks, and use alternate instruments to confirm readings. AI systems disrupt this model. Their reasoning process is opaque (see [[opacity-and-explainability]]), making independent verification fundamentally different from traditional verification.

This creates the characteristic trust dilemma described in [[trust-calibration]]: operators may either assume the AI is always correct (leading to [[automation-bias]]) or second-guess every output (negating the advisory value). The trilateral paper identifies the need for new preventive guardrails — traditional software systems and enhanced training protocols — to address this gap.

Specific design considerations for trust calibration in nuclear AI:
- Features indicating uncertainty in AI performance
- Alarms for questionable AI performance
- Interface design that supports both normal and failure condition awareness
- Handover-of-control procedures between AI and human

### Training and Qualification

Nuclear training programmes must evolve to address AI-specific needs:
- Methods for identifying AI failures, processes, and procedures for intervention
- Control handover procedures (taking control from AI, restoring AI to operation)
- Structured training to adapt as AI systems themselves evolve
- Maintaining minimum personnel qualification levels even as AI augments roles

The concern about [[skill-degradation]] is especially acute in nuclear: if operators become dependent on AI advisory support, their ability to respond independently during AI failures may deteriorate — precisely when independent action is most needed.

### Safety Culture

The trilateral paper raises a distinctive question: how will organisational safety culture monitoring apply to AI? During development, it should be verifiable that safety is the top priority in decision-making algorithms. Post-deployment, decisions made by AI models must be monitored and validated against intended safety priorities. Findings from safety culture monitoring should feed back into the system through model adjustments, function re-allocation, or both.

## Architecture Principles for Nuclear AI

Three architectural approaches can place trust in the wider system rather than requiring complete trust in the AI component:

### System Boundaries
Constraining AI inputs and outputs so that the allowable range of behaviour is inherently safe, regardless of what the AI does within those bounds. If all possible outputs fall within safe limits, the consequences of AI failure are bounded. This parallels the concept of inherently safe design in reactor engineering.

### Continuous Monitoring
AI system monitoring should assess model accuracy, error rates, computational efficiency, and bias on an ongoing basis. This includes detecting adversarial attacks and attempts to manipulate the system. Monitoring plays a complementary role to system boundaries: boundaries limit what the AI can do; monitoring verifies what it is doing.

### Modularization
Dividing AI systems into smaller, well-defined modules supports fault isolation, root-cause tracing, and independent testing. However, domain adaptation — transferring a model trained on one type of task to a related but different task — introduces risks because the model's performance characteristics in the new domain may differ from those demonstrated during development. The modularity of an AI system's applicability depends heavily on the data used to train, validate, and test the model.

## AI Lifecycle Management

The nuclear AI lifecycle introduces several unique challenges:

- **Data drift and model drift**: operational data diverges from training data, or the model ceases to faithfully represent the phenomena being modelled. Both require detection mechanisms and trigger criteria for retraining. This connects directly to [[degradation-characteristics]] — particularly silent degradation, where performance degrades without visible indicators.
- **Configuration management**: the rapid pace of AI evolution, open-source dependencies, and frequency of model updates intensify change control challenges beyond those of traditional software.
- **V&V limitations**: no method currently exists to quantify AI failure probability. The input-output space is too large for exhaustive testing, systems can change through retraining, and previous performance confirmation can quickly become obsolete. Safety assurance must therefore derive from architecture (bounding, monitoring, modularization) rather than component-level reliability claims.

## Standards Landscape

The trilateral paper's annex maps relevant standards across eight topic areas:

| Topic | Key Standards |
|---|---|
| General | REGDOC 2.5.2, 10 CFR Part 50, ONR Safety Assessment Principles |
| System safety | IEEE 603, IEC 61513, IEC 61508 |
| Software safety | IEC 60880, IEC 62138, IEEE 7-4.3.2 |
| Functional safety | IEC 61513, IEC 61508, IEEE 603, IEEE 279 |
| Hardware safety | IEC 60987, IEEE 7-4.3.2 |
| Cyber security | CSA N290.7:21, IEC 62645, IEC 63096, IEC 62443 |
| Control room | IEC 61839, IEC 61771, IEC 61772, NUREG-0700 |
| Lifecycle management | ISO/IEC FDIS 5338, IEEE 1074 |

The lifecycle standard ISO/IEC FDIS 5338 is notable as the first international standard specifically addressing AI system lifecycle processes. It extends ISO/IEC/IEEE 15288 (system lifecycle) and ISO/IEC/IEEE 12207 (software lifecycle) with AI-specific processes.

## AI Regulatory Gap Analysis (AIRGA)

A systematic gap analysis of the NRC's regulatory framework ([[summary-NRC_2024_ML24290A059|Pensado et al., 2024]]) examined all 517 NRC regulatory guides (RGs) across ten divisions and found potential gaps in fewer than 100, classified into eight types:

| Gap Type | Description | RG Count |
|---|---|---|
| Implied manual actions | RGs that implicitly assume actions are performed by humans | 10 |
| Special computations | Insufficient guidance for evaluating AI-based calculations | 17 |
| Preoperational testing | Testing programmes that may not address AI in safety roles | 4 |
| Habitability under autonomy | Control room requirements assuming human occupancy | 3 |
| Periodic testing/monitoring/surveillance | Manual actions that AI could perform (largest category) | 38 |
| Software for critical applications | Software standards needing AI-specific supplementation | 7 |
| Radiation safety support | Roles restricted to certified professionals (RSO/ARSO) | 19 |
| Training and HFE | Uncertainty whether traditional HFE evaluation suits AI | 2 |

The central finding is that most NRC regulations are stated in broad, impersonal terms — they specify that actions must be completed but not how — and are therefore generally adequate to regulate AI use. The gaps arise primarily from regulatory guides (which are more prescriptive) rather than from the regulations themselves.

### Specific Regulatory Conflicts

A small number of explicit regulatory conflicts with AI use were identified:

- **Operator presence requirements**: 10 CFR §50.54(k) requires licensed operators in the control room at all times. If AI systems execute operational actions, must operators still be physically present? Could they take a passive oversight role?
- **Physics-based model requirements**: 10 CFR §50.46 and Part 50 Appendix K explicitly require physics-based models for emergency core cooling system analysis and fracture toughness, precluding AI alternatives in these specific applications.
- **Personnel qualification restrictions**: regulations requiring "personnel," "supervisors," or Radiation Safety Officers to perform specific functions implicitly restrict AI delegation of those roles.
- **Record retention**: §20.2103(b) record requirements implicitly constrain AI because AI-generated information should be captured as fixed records at the time of use, rather than being regeneratable through subsequent queries.

### Standards Gap

The AIRGA concluded that no mature AI-specific standards are currently suitable for NRC endorsement. Existing standards focus primarily on defining AI terminology and desirable traits rather than providing practical regulatory guidance. IEEE Standard 1012-2004 (Software V&V, endorsed by RG 1.168) remains broadly applicable to AI but needs supplementation for:

1. **Data quality and quantity** for machine learning — accuracy, variety, context, sufficiency
2. **Systematic testing** of AI systems, particularly responses to rare and extreme inputs
3. **Systematic fail-safe design** — active detection of anomalous inputs, identification of anomalous outputs, and error mitigation

### Cross-Industry Regulatory Learning

The AIRGA recommends examining how the Federal Aviation Administration (FAA) and Food and Drug Administration (FDA) are approaching AI regulation, recognising that nuclear regulators face similar challenges to other safety-critical domains. This cross-industry learning is particularly relevant for the NRC as it develops AI-specific guidance.
