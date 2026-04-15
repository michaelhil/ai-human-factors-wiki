---
title: "Summary: State of What Art? A Call for Multi-Prompt LLM Evaluation"
type: summary
sources:
  - raw/references/Mizrahi_2024_state-of-what-art-call-for-multi-prompt-llm-evaluation.pdf
related:
  - "[[prompt-sensitivity]]"
  - "[[calibration-and-confidence]]"
  - "[[non-determinism-and-reproducibility]]"
  - "[[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design]]"
  - "[[summary-Lu_2022_fantastically-ordered-prompts-and-where-to-find-them]]"
  - "[[summary-Zhao_2021_calibrate-before-use-improving-few-shot-performance-of-language-models]]"
tags:
  - prompt-sensitivity
  - evaluation
  - benchmarking
  - robustness
  - model-ranking
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# State of What Art? A Call for Multi-Prompt LLM Evaluation

Mizrahi et al. (2024) demonstrate at large scale that standard single-prompt LLM evaluation is fundamentally unreliable. Across 6.5 million evaluation instances involving 20 LLMs and 39 tasks from three benchmarks, they show that paraphrasing the instruction template — while preserving its meaning — leads to dramatically different absolute performance and different relative model rankings. The same model can rank first on one prompt and last on a semantically equivalent one.

## The Scale of the Problem

The study generates over 175 validated instruction paraphrases per task using three automatic methods (instruction rephrasing, chain-of-thought, gradual template generation), all verified by human annotators. Key findings:

**Absolute performance is unstable.** A single model's accuracy on a single task can vary by more than one standard deviation depending on which paraphrase is used. For example, Flan-T5-large showed a 28% average performance degradation when changing one word ("excludes" to "lacks"), while Flan-T5-XL showed a 46% improvement on the same edit.

**Relative rankings are unreliable.** Using Kendall's W to measure ranking agreement across instruction paraphrases, most tasks show weak to moderate agreement (W < 0.85). For 21 out of 25 tasks, a Friedman test confirmed statistically significant differences in performance across paraphrases. A model that ranks first for one instruction formulation can rank ninth for a semantically equivalent one.

**Original benchmark prompts are not representative.** In 72.5% of cases, model performance on the benchmark's original prompt was higher than the estimated average performance across paraphrases — by an average of 21 accuracy points for the davinci model. This means published benchmark results systematically overstate typical model performance. Original prompts also do not reliably identify the best-performing model.

**Manual paraphrases show the same instability.** The effect is not an artefact of automatic paraphrasing. Testing on manually-written instruction paraphrases (written after model training) confirms that LLMs are sensitive to human-authored prompt variations as well.

## Proposed Multi-Prompt Metrics

The paper argues that different evaluation goals require different metrics, all computed over a set of instruction paraphrases:

- **MaxP (Maximum Performance)**: The best performance achieved across all paraphrases. Relevant when integrating an LLM into a specific downstream application where the prompt can be optimised.
- **AvgP (Average Performance)**: Mean performance across all paraphrases. Measures robustness — useful for assessing general-purpose model reliability.
- **CPS (Combined Performance Score)**: Balances peak capability and robustness via a saturation metric. Identifies models that are both high-performing and stable.

Using these metrics reveals insights invisible to single-prompt evaluation: LLaMA-based models are competitive with T5-based models on MaxP (peak performance) but lag on AvgP (average robustness), suggesting they are capable but fragile.

## Implications for Safety-Critical Systems

This paper provides the most comprehensive evidence that [[prompt-sensitivity]] is not a minor evaluation nuisance but a fundamental property of LLMs that undermines the validity of comparative benchmarking. For safety-critical applications, the implications are severe:

1. **Model selection based on single-prompt benchmarks is unreliable.** The model that scores highest on a benchmark may not be the model that performs most reliably across the range of natural language formulations that operators will actually use.

2. **Operator phrasing variation is unavoidable.** In real-world deployment, different operators will phrase the same query differently. If the system's performance depends on how the question is worded — not what is being asked — then the system's behaviour is unpredictable from the operator's perspective.

3. **Evaluation for safety-critical deployment should use multi-prompt protocols.** Average performance across paraphrases and worst-case performance across paraphrases are both more informative than single-prompt scores for assessing whether a system meets minimum reliability requirements.
