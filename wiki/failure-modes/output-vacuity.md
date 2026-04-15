---
title: "Output Vacuity and Central-Tendency Bias"
type: failure-mode
sources:
  - raw/references/Kommers_2026_why-slop-matters.pdf
  - raw/references/Shaib_2025_measuring-ai-slop-in-text.pdf
  - raw/references/Kandpal_2023_large-language-models-struggle-to-learn-long-tail-knowledge.pdf
  - raw/references/Shumailov_2024_ai-models-collapse-when-trained-on-recursively-generated-data.pdf
related:
  - "[[hallucination]]"
  - "[[calibration-and-confidence]]"
  - "[[context-windows]]"
  - "[[automation-bias]]"
tags:
  - slop
  - vacuity
  - failure-mode
  - central-tendency
  - output-quality
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Output Vacuity and Central-Tendency Bias

A failure mode distinct from [[hallucination]] that deserves separate treatment because it evades detection mechanisms that catch factual errors. Where hallucination produces confident claims that are wrong, output vacuity produces confident prose that is technically unobjectionable but operationally empty. The term "slop" has entered common usage to describe this class of AI-generated content: material that exhibits superficial competence without underlying substance (Kommers et al., 2025; Shaib et al., 2025).

## The Mechanism

The architectural cause is **central-tendency bias**. LLMs are trained on statistical distributions of text and generate output biased toward high-frequency patterns. Kandpal et al. (2023) demonstrated that a model's ability to produce accurate responses correlates directly with how frequently the relevant knowledge appeared during training.

When a model encounters a query that falls in the long tail of its training distribution, it compensates not by expressing uncertainty (a [[calibration-and-confidence]] problem) but by **retreating to generality**: listing all plausible causes rather than discriminating among them, restating data in prose rather than analysing it, or hedging so broadly that no actionable conclusion can be drawn.

This retreat to the mode of the distribution is not a failure of reasoning but a structural property of maximum-likelihood generation against a broad training corpus.

## Interaction with Task Framing

The same model produces highly specific output when the task is narrow and well-constrained ("what is the regulatory limit for this parameter?") and retreats to generic output when the task is broad or ambiguous ("assess the current situation"). System prompt design and output format requirements are the primary levers for reducing slop: a prompt that demands specific parameter values, explicit evidence citations, and discrimination between hypotheses will elicit less vacuous output than one requesting "diagnostic support."

This means slop is not solely a model property but a joint property of the model, the prompt, and the task.

## Interaction with Context Length

Slop probability increases with [[context-windows]] utilisation. As sessions lengthen and accumulated tool results, conversation history, and retrieved documents fill the context, the model's attention spreads across more tokens and the effective weight of any single piece of evidence diminishes. Output quality degrades toward vacuity precisely as the operational situation becomes more complex and the need for specific analysis is greatest.

## Why It's Dangerous

The danger of slop is indirect but significant, operating through a different trust pathway than [[automation-bias]]:

- A factually wrong output can be caught by a [[knowledge-graphs]] guardrail, an alert operator, or a cross-checking agent
- A vacuous output passes all of these checks because **it makes no specific claim that could be falsified**

The indirect harm emerges over time through a **cry-wolf dynamic**: operators who receive consistently generic assessments reduce the attention they allocate to AI output. When the system produces a genuinely insightful assessment — or more dangerously, a genuinely wrong one — the operator has learned to skim rather than engage critically.

This disengagement pathway is distinct from automation bias (where operators over-trust specific wrong recommendations). Slop-induced disengagement involves ceasing to evaluate recommendations at all.

## Mitigation

- **Structured output templates** that require specific parameter values, specific procedure steps, and specific time frames
- **Novelty filters** that suppress AI output unless it adds information beyond what qualified displays already show
- **Specificity metrics** that measure whether the model discriminates between hypotheses or retreats to generic enumeration
- **Operator training** that includes exposure to slop as a recognisable failure pattern, with the heuristic: if the AI assessment would apply equally well to three different conditions, it is not adding value

## Relevance to Safety-Critical Systems

1. **Slop evades quality checks.** Unlike hallucination, vacuous output cannot be caught by fact-checking. It is technically correct — just operationally useless.

2. **It erodes trust over time.** Consistent vacuity trains operators to ignore AI output entirely, removing the safety benefit of the advisory system.

3. **It worsens under complexity.** The conditions where specific analysis matters most (long sessions, complex situations, multiple information sources) are precisely the conditions where slop is most likely.

4. **Cross-domain examples.** In aviation, a generic weather assessment that lists all possible conditions without highlighting the specific risk for the planned route. In medical settings, a differential diagnosis that lists every textbook possibility without discriminating based on the patient's specific presentation. In oil and gas, a well integrity assessment that restates known parameters without identifying the anomaly that triggered the query.
