---
title: "Summary: Cemri et al. (2025) — Why Do Multi-Agent LLM Systems Fail?"
type: summary
sources:
  - raw/references/Cemri_2025_why-do-multi-agent-llm-systems-fail.pdf
related:
  - "[[multi-agent-coordination-failures]]"
  - "[[multi-agent-roles]]"
  - "[[multi-agent-taxonomy]]"
  - "[[governance-gates]]"
tags:
  - multi-agent
  - failure-taxonomy
  - mast
  - empirical
  - coordination
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Cemri et al. (2025) — Why Do Multi-Agent LLM Systems Fail?

**Full citation:** Cemri, M., Pan, M.Z., Yang, S., Agrawal, L.A., Chopra, B., Tiwari, R., Keutzer, K., Parameswaran, A., Klein, D., Ramchandran, K., Zaharia, M., Gonzalez, J.E., and Stoica, I. (2025). Why Do Multi-Agent LLM Systems Fail? *39th Conference on Neural Information Processing Systems (NeurIPS 2025)*, Track on Datasets and Benchmarks.

## Key Contribution

This UC Berkeley paper introduces **MAST** (Multi-Agent System Failure Taxonomy), the first empirically grounded taxonomy of why multi-agent LLM systems fail. Built through Grounded Theory analysis of 150 execution traces and validated with high inter-annotator agreement (κ = 0.88), MAST identifies **14 distinct failure modes** in 3 categories. The accompanying **MAST-Data** dataset contains 1,642 annotated failure traces from 7 popular MAS frameworks across 4 model families, with failure rates ranging from **41% to 86.7%**.

## The MAST Taxonomy

### FC1. System Design Issues (44.2% of failures)
Failures from pre-execution design choices and poor prompt specifications:
- **FM-1.1 Disobey Task Specification** (11.8%): agents fail to follow task requirements
- **FM-1.2 Disobey Role Specification** (1.5%): agents violate their assigned roles
- **FM-1.3 Step Repetition** (15.7%): agents loop through the same steps unproductively
- **FM-1.4 Loss of Conversation History** (2.8%): context is lost during execution
- **FM-1.5 Unaware of Termination Conditions** (12.4%): agents don't know when to stop

### FC2. Inter-Agent Misalignment (32.5%)
Failures from breakdowns in agent coordination during execution:
- **FM-2.1 Conversation Reset** (2.2%): conversation unexpectedly restarts
- **FM-2.2 Fail to Ask for Clarification** (6.8%): agents proceed with wrong assumptions
- **FM-2.3 Task Derailment** (7.4%): execution drifts from the original objective
- **FM-2.4 Information Withholding** (0.85%): agents fail to share critical information
- **FM-2.5 Ignored Other Agent's Input** (1.9%): agents don't incorporate peer contributions
- **FM-2.6 Reasoning-Action Mismatch** (13.2%): agents' actions don't match their stated reasoning

### FC3. Task Verification (23.5%)
Failures in quality control of the final output:
- **FM-3.1 Premature Termination** (6.2%): task ends before completion
- **FM-3.2 No or Incomplete Verification** (8.2%): output not properly checked
- **FM-3.3 Incorrect Verification** (9.1%): verification passes incorrect output

## Three Key Insights

**Insight 1: System design matters more than model capability.** Failures often stem from architectural choices, not model limitations. A workflow adjustment ensuring the CEO agent had final say improved ChatDev's success rate by +9.4% — same model, better design. This validates the [[multi-agent-taxonomy]] argument that pattern selection determines system properties.

**Insight 2: Inter-agent misalignment requires "social reasoning."** Context and communication protocols alone are insufficient. Agents fail to model other agents' informational needs — a theory-of-mind limitation that connects to [[epistemic-independence]]. Robust solutions require improved MAS architecture and model-level advances in communicative intelligence.

**Insight 3: Multi-level verification is needed.** Current verifiers perform only superficial checks (e.g., "does the code compile?" but not "does it meet the specification?"). Systems with explicit verifiers (MetaGPT, ChatDev) show fewer FC3 failures, but success rates remain low because verification is shallow. This connects to the [[governance-gates]] principle that verification must be substantive, not just procedural.

## Relevance to This Wiki

MAST provides the empirical failure vocabulary that [[multi-agent-coordination-failures]] needs. For safety professionals, the key finding is that **44.2% of failures are system design issues** — not model limitations but architectural choices that can be fixed through better design. The taxonomy gives practitioners a structured diagnostic tool: when a multi-agent system fails, MAST provides specific failure modes to check rather than generic "the AI got it wrong." The high failure rates across all frameworks (41-87%) underscore that multi-agent reliability is an unsolved problem requiring systematic engineering, not just better models.
