---
title: "Summary: Du et al. (2023) — Improving Factuality and Reasoning through Multiagent Debate"
type: summary
sources:
  - raw/references/Du_2023_improving-factuality-and-reasoning-through-multiagent-debate.pdf
related:
  - "[[epistemic-independence]]"
  - "[[multi-agent-taxonomy]]"
  - "[[sycophancy]]"
  - "[[self-correction-limitations]]"
tags:
  - multi-agent
  - debate
  - factuality
  - reasoning
  - empirical
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Du et al. (2023) — Improving Factuality and Reasoning through Multiagent Debate

**Full citation:** Du, Y., Li, S., Torralba, A., Tenenbaum, J.B., and Mordatch, I. (2023). Improving Factuality and Reasoning in Language Models through Multiagent Debate. *ICML 2024*. arXiv:2305.14325.

## Key Contribution

This MIT/Google Brain paper demonstrates that having multiple LLM instances independently generate answers and then debate (reading and responding to each other's reasoning over multiple rounds) improves both reasoning accuracy and factual correctness compared to single-agent baselines. The approach is a "society of minds" inspired by cross-examination — but a critical caveat is that all agents are instances of the same model, which limits the epistemic independence of the improvement.

## Quantitative Results

**Reasoning (Table 1, 3 agents, 2 rounds of debate):**
- Arithmetic: single agent 67.0% → debate **81.8%** (+14.8 points)
- Grade School Math: single 77.0% → debate **85.0%** (+8.0 points)
- Chess move quality: single 91.4 → debate **122.9** (+31.5 pawn score)

**Factuality (Table 2):**
- Biographies: single 66.0% → debate **73.8%** (+7.8 points)
- MMLU: single 63.9% → debate **71.1%** (+7.2 points)
- Chess move validity: single 29.3% → debate **45.2%** (+15.9 points)

Debate outperforms both single-agent reflection and multi-agent majority voting across all tasks.

## The Format vs Independence Question

The improvements are real, but their source matters for [[epistemic-independence]]:

**The improvement comes from structured format, not from diverse perspectives.** All agents are instances of ChatGPT — they share the same model weights, training biases, and distributional blind spots. The debate format forces structured cross-examination that catches surface-level errors (arithmetic mistakes, factual inconsistencies), but the debaters share the same systematic biases.

Subsequent work clarified this distinction:
- Wu et al. (2025) showed that **same-model debate suppresses independent reasoning** under majority pressure
- Wynn et al. (2025) found that **model diversity is a necessary condition** for productive debate
- Huang et al. (2024) showed that intrinsic [[self-correction-limitations]] apply to debate too — the critiquing process shares the training biases that produced the original

**Cross-model debate provides additional benefit.** When ChatGPT and Bard debated on 20 GSM8K problems, joint debate solved 17 vs ChatGPT alone (14) or Bard alone (11). This suggests genuine independence benefit from model diversity, beyond the format effect.

## Design Findings

- **More agents and rounds help, with diminishing returns**: performance improves monotonically with agents (Figure 10a) and rounds (Figure 10b), but saturates around 4 debate rounds
- **"Stubborn" prompts improve debate quality**: prompts encouraging agents to maintain their positions led to slower convergence but better final answers. Agents are "relatively agreeable" by default — likely from RLHF training (see [[sycophancy]])
- **Synergy with Chain of Thought**: combining debate with zero-shot CoT further improves performance (Figure 6)
- **Summarisation helps scale**: when many agents participate, summarising other agents' responses before feeding them as context improves performance over raw concatenation (addressing [[context-windows]] limits)

## Relevance to This Wiki

For safety professionals, this paper demonstrates that **structured multi-agent interaction improves output quality** — but the mechanism is format (cross-examination catches errors) rather than independence (diverse perspectives). The distinction matters for safety-critical applications: same-model debate catches surface errors but cannot detect systematic biases shared across all instances. True independent verification requires model diversity, as the [[epistemic-independence]] page documents. The cross-model debate finding supports this: different models provide additional benefit beyond what same-model debate achieves.
