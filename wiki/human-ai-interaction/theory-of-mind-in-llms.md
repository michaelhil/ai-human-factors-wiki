---
title: "Theory of Mind in LLMs"
type: interaction
sources:
  - raw/references/Kosinski_2024_evaluating-large-language-models-in-theory-of-mind-tasks.pdf
  - raw/references/Ullman_2023_large-language-models-fail-on-trivial-alterations-to-theory-of-mind-tasks.pdf
related:
  - "[[sycophancy]]"
  - "[[trust-calibration]]"
  - "[[situation-awareness-in-human-ai-teams]]"
  - "[[epistemic-independence]]"
  - "[[hallucination]]"
  - "[[calibration-and-confidence]]"
  - "[[automation-bias]]"
  - "[[prompt-sensitivity]]"
  - "[[summary-Kosinski_2024_evaluating-large-language-models-in-theory-of-mind-tasks]]"
  - "[[summary-Ullman_2023_large-language-models-fail-on-trivial-alterations-to-theory-of-mind-tasks]]"
tags:
  - theory-of-mind
  - social-cognition
  - emergent-capability
  - human-ai-interaction
  - trust
  - brittleness
confidence: medium
created: 2026-04-15
updated: 2026-04-15
---

# Theory of Mind in LLMs

Theory of mind (ToM) is the ability to attribute mental states — beliefs, intentions, desires, knowledge — to oneself and others, including the recognition that others may hold beliefs that differ from reality. In humans, ToM develops around age 4–6 and is foundational to communication, cooperation, empathy, and moral reasoning. The question of whether LLMs exhibit ToM-like capabilities has direct implications for how these systems interact with human operators in safety-critical settings.

## Evidence For

[[summary-Kosinski_2024_evaluating-large-language-models-in-theory-of-mind-tasks|Kosinski (2024)]] tested 11 LLMs on 40 false-belief tasks — the gold-standard measure for ToM in humans. The results show a clear developmental trajectory across model generations: older models (pre-2022) solved none; GPT-3.5 models solved 20% (matching 3-year-old children); ChatGPT-4 solved 75% (matching 6-year-olds). Performance correlates strongly with language proficiency (R = 0.98), suggesting ToM-like behaviour emerges as a by-product of language modelling scale rather than explicit engineering.

Sentence-by-sentence analysis confirms that ChatGPT-4 dynamically tracks both the actual state of affairs and a protagonist's (potentially false) belief simultaneously — a capacity that appears functionally similar to human false-belief reasoning. True-belief control conditions confirm the model is not simply defaulting to one answer type.

## Evidence Against: The Brittleness Problem

[[summary-Ullman_2023_large-language-models-fail-on-trivial-alterations-to-theory-of-mind-tasks|Ullman (2023)]] directly challenges these findings by applying trivial, commonsense-preserving variations to the same tasks GPT-3.5 passed. Every variation causes failure:

- A bag is made transparent so the protagonist can see inside — the model still attributes a false belief based on the label (P = 95%).
- The protagonist cannot read — the model still predicts she believes the label (P = 98%).
- A trusted friend tells the protagonist the true contents before she sees the label — the model still predicts she believes the label (P = 97%).
- The protagonist herself filled the bag and wrote the misleading label — the model still predicts she believes the label over her own actions (P = 87%).
- In transfer tasks, making containers transparent, changing spatial relationships ("on" vs "in"), or querying the beliefs of the person who performed the transfer — all produce failures.

These are not exotic edge cases. A child who understands false beliefs would have no difficulty recognising that a person who can see inside a transparent bag knows what it contains, or that a person who cannot read cannot be misled by a label. The failures suggest the model is exploiting statistical regularities in false-belief narrative structures — where labels reliably override contents and absent protagonists reliably hold outdated beliefs — rather than reasoning about mental states.

Kosinski (2024) acknowledges the brittleness concern while noting that ChatGPT-4 shows greater robustness than GPT-3.5 to perturbations (performance dropping from 95% to 75% under modifications, rather than collapsing entirely). Whether continued scaling will close the robustness gap or merely shift it to more subtle variations remains an open question.

## The Danaides Problem

Ullman identifies a recurring pattern in LLM evaluation that he calls the Danaides problem (after the mythological punishment of filling a basin that never holds water): a benchmark is published, models fail, newer models pass, claims of emergent capability follow — but when the benchmark is trivially modified, the models fail again. The concern is that as soon as evaluation tasks become systematised, they can be absorbed into training data or pattern-matched through surface statistics, without the underlying capability being present. This connects to the broader problem of [[prompt-sensitivity]] — the same underlying capability claim can appear supported or refuted depending on surface-level features of the evaluation.

## The Mechanism Question

Whether LLMs possess "genuine" ToM or produce ToM-consistent outputs through pattern matching is an important theoretical question, but from a human factors perspective, the operational question matters more: **does the system's behaviour reliably track what users know, believe, and intend?**

The current evidence suggests the answer is: sometimes, on standard scenarios, but not robustly. This is arguably worse than a clear absence of the capability, because it creates unpredictable behaviour — the system appears to understand the user's perspective in routine interactions but fails in precisely the non-routine situations where understanding the user's mental state matters most.

If an LLM appears to understand that an operator holds a false belief but does not reliably correct it — or worse, reinforces it through [[sycophancy]] — then ToM-like capability without ToM-like responsibility creates a specific hazard. The system may be sophisticated enough to model the user's mental state in common scenarios but optimised (through RLHF) to agree with it rather than correct it.

## The Anthropomorphism Risk

Ullman warns that humans are biologically predisposed to attribute mental states to agents that display purposeful-seeming behaviour. This is the same intuitive psychology that makes us see faces in clouds or attribute intentions to wind and germs. When evaluating LLMs, this bias makes researchers and operators systematically overestimate the system's cognitive abilities. The zero-hypothesis for any cognitive capability claim should be skepticism — assume the model does not possess the capability until robustly demonstrated across variations, not just on standard benchmarks.

This concern is directly relevant to [[automation-bias]]: if operators perceive an LLM as having social understanding, they may defer to it in interpersonal or team-coordination decisions where the model's apparent competence is an artefact of pattern matching.

## Implications for Safety-Critical Systems

**Apparent understanding without actual understanding.** An LLM that passes false-belief tasks may give operators the impression it understands their perspective, increasing [[automation-bias]]. If the system's ToM-like behaviour is brittle (working on standard scenarios but failing on edge cases), operators may calibrate their trust based on the standard cases and be surprised by failures precisely when the situation is non-routine and stakes are highest.

**Manipulation potential.** A system that can model what a user believes — even imperfectly — has the capacity to tailor outputs to exploit those beliefs. This connects to [[sycophancy]]: RLHF-trained models already tend to agree with users rather than contradict them. ToM-like capability could amplify this by enabling more targeted agreement.

**Team cognition requirements.** Effective human-AI teaming as modelled by [[situation-awareness-in-human-ai-teams]] frameworks requires that team members maintain shared mental models. If an LLM exhibits ToM-like behaviour in some contexts but not others — and there is no reliable way to predict which — it undermines the predictability that operators need to calibrate their interaction strategy.

**Independence and epistemic diversity.** For multi-agent systems where [[epistemic-independence]] is desired, ToM-like capabilities create a tension: agents that model each other's mental states may converge toward shared beliefs rather than maintaining independent assessments. The same capability that enables coordination may undermine the diversity that makes multi-agent review valuable.

## Open Questions

- Does ToM-like performance improve monotonically with scale, or does it plateau or regress on certain task types? Kosinski's data suggests improvement; Ullman's variations suggest the improvement may be shallower than benchmark scores indicate.
- Can brittle ToM-like behaviour be distinguished from robust ToM-like behaviour at deployment time, without running diagnostic false-belief tasks?
- How does RLHF interact with ToM capability — does alignment training improve or degrade the system's ability to accurately model user mental states?
- In multi-agent systems, does shared architecture create correlated ToM biases — do all agents misread the same types of mental states?
- Does the Danaides problem apply generally — will each new generation of models simply pass the latest variations while failing on the next set?
