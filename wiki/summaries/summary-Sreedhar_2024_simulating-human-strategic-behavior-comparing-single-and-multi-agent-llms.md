---
title: "Summary: Sreedhar & Chilton (2024) — Simulating Strategic Reasoning: Comparing Single and Multi-Agent LLMs"
type: summary
sources:
  - raw/references/Sreedhar_2024_simulating-human-strategic-behavior-comparing-single-and-multi-agent-llms.pdf
related:
  - "[[epistemic-independence]]"
  - "[[multi-agent-taxonomy]]"
  - "[[monoculture-collapse]]"
  - "[[llm-architecture]]"
tags:
  - epistemic-independence
  - multi-agent
  - single-agent
  - empirical
  - strategic-reasoning
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Sreedhar & Chilton (2024) — Simulating Strategic Reasoning

**Full citation:** Sreedhar, K. and Chilton, L. (2024). Simulating Strategic Reasoning: Comparing the Ability of Single LLMs and Multi-Agent Systems to Replicate Human Behavior. arXiv:2402.08189.

## Key Contribution

This Columbia University paper provides the most direct controlled comparison between single-LLM simulation and separate multi-agent instances on a strategic reasoning task. Using the Ultimatum Game (a classic economics experiment), the authors demonstrate that multi-agent systems produce human-consistent behaviour **87.5%** of the time, compared to **50%** for single-LLM simulation — the strongest empirical evidence for [[epistemic-independence]] as an architectural requirement.

## Experimental Setup

The five-round Ultimatum Game with two player personalities (greedy and fair) was simulated in four conditions:
- **MultiAgent-4**: two separate GPT-4 instances, one per player
- **MultiAgent-3.5**: two separate GPT-3.5 instances
- **SingleLLM-4**: one GPT-4 instance simulating both players
- **SingleLLM-3.5**: one GPT-3.5 instance simulating both players

Each condition was run for 10 simulations across 4 personality pairings (40 total per condition). Each agent/LLM first created a strategy, then played the game.

## Key Results

| Structure | Human-Consistent Simulations |
|---|---|
| **MultiAgent-4** | **87.5%** |
| MultiAgent-3.5 | 82.5% |
| SingleLLM-4 | 50.0% |
| SingleLLM-3.5 | 42.5% |

The difference between multi-agent and single-LLM is statistically significant (χ² = 13.091, p < .001).

## Error Analysis — Why Single-LLM Fails

The error breakdown reveals the mechanism:

**Multi-agent systems:** 100% of errors were in **strategy creation** (the agent produced an incomplete or personality-inconsistent strategy). **Zero gameplay mistakes** — once agents had separate contexts with separate strategies, they executed faithfully.

**Single-LLM systems:** errors split between strategy creation (73.9–100%) **and gameplay execution** (25–39.1%). The single model could not maintain separate player strategies during execution — information leaked across the simulated "agents" through the shared context.

This directly confirms the unified attention property described in [[llm-architecture]]: a single model generating responses for both players processes both strategies in the same context window. The proposer's strategy is visible during the receiver's reasoning, and vice versa. Separate instances eliminate this information leakage by architectural isolation.

## Personality Consistency

MultiAgent-4 achieved human-like gameplay for **≥80%** of all four personality pairings (Fair-Fair, Fair-Greedy, Greedy-Fair, Greedy-Greedy). SingleLLM-4 was inconsistent: 100% on Fair-Fair but only **10%** on Greedy-Greedy — the hardest condition where the model must maintain differentiated selfish strategies for both players simultaneously.

## Relevance to This Wiki

This paper is the primary empirical source for [[epistemic-independence]]. For safety professionals, it provides concrete evidence that: (1) **separate agent instances produce qualitatively different behaviour** from single-LLM simulation — the difference is not marginal but dramatic (87.5% vs 50%); (2) the failure mode of single-LLM simulation is **information leakage through shared context**, not reasoning inability — the same model performs well when given architectural isolation; (3) the hardest conditions (where differentiated strategies matter most) show the largest gap, meaning the value of architectural independence is greatest when the stakes are highest.
