---
title: "Summary: ToolQA — A Dataset for LLM Question Answering with External Tools"
type: summary
sources:
  - raw/references/Zhuang_2024_toolqa.pdf
related:
  - "[[tool-calling]]"
  - "[[hallucination]]"
  - "[[capability-gradient]]"
  - "[[perceive-reason-act-loop]]"
  - "[[summary-Patil_2023_gorilla-llm-connected-with-massive-apis]]"
  - "[[summary-Qin_2024_toolllm-facilitating-large-language-models-to-master-real-world-apis]]"
  - "[[summary-Patil_2025_berkeley-function-calling-leaderboard]]"
tags:
  - benchmark
  - tool-use
  - evaluation
  - question-answering
  - agent
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# ToolQA — A Dataset for LLM Question Answering with External Tools

Zhuang et al. (2024) introduce ToolQA, a benchmark specifically designed to evaluate whether LLMs can genuinely use external tools for question answering — as opposed to simply recalling answers from pre-training data. This distinction matters because existing evaluation methods cannot separate tool-use competence from memorisation: if an LLM answers correctly, it may be because the answer was in its training corpus rather than because it successfully used a tool.

## The Contamination Problem

Standard benchmarks suffer from data contamination — the questions and answers may overlap with the LLM's pre-training data, making it impossible to determine whether the model is reasoning with tools or recalling memorised information. ToolQA addresses this by constructing questions that can **only** be answered by using external tools to query reference corpora that were deliberately selected to be outside the model's training distribution. The three-phase curation process — reference data collection, human-guided question generation, and programmatic answer generation — ensures that every question requires genuine tool use.

## Dataset Structure

ToolQA spans 8 domains across 6 contextual dimensions (temporal, spatial, mathematical, social, scientific, personal), with 1,530 questions (800 easy, 730 hard). It provides 13 specialised tools including text retrievers, database tools, graph tools, math tools, code interpreters, and a system-level finish tool. Easy questions require extracting a single piece of information (fewer tools); hard questions demand multi-step reasoning across multiple tools.

## Key Findings

**Standard LLMs fail almost completely.** ChatGPT and chain-of-thought prompting achieve roughly 5% success on easy questions and 2% on hard questions — confirming that the questions genuinely require tool use and cannot be answered from internal knowledge alone.

**Tool-augmented LLMs improve but remain limited.** The best-performing method, ReAct (GPT-3.5), achieves 43.1% on easy questions but only 8.2% on hard questions. Chameleon achieves 10.6% average across both difficulties. The gap between easy and hard questions reveals that multi-tool composition — orchestrating multiple tools in sequence to solve a problem — remains a fundamental challenge.

**Dominant error type: argument errors.** The most common failure is calling tools with wrong arguments (44–49% of errors for ReAct), not selecting the wrong tool. The model understands which tool to use but generates incorrect parameter values. This error type differs between easy and hard questions: easy questions trigger more database-related argument errors, while hard questions trigger more code-related errors as models attempt complex programmatic solutions.

**Data source confusion.** LLMs frequently query the wrong reference corpus — for instance, querying a personal agenda corpus when the question concerns flight data. This suggests models struggle to map question types to appropriate data sources.

**Innovation vs. hallucination trade-off.** On hard questions, models sometimes attempt creative tool compositions not present in the few-shot examples. When this works, it solves otherwise unsolvable problems. When it fails, it produces hallucinated observations — the model fabricates tool outputs that were never returned. This trade-off is fundamental: the same capability that enables novel tool compositions also enables confident fabrication.

**GPT-3 vs. GPT-3.5 inversion.** GPT-3 outperforms GPT-3.5 on easy questions (where following in-context tool patterns matters more), while GPT-3.5 outperforms on hard questions (where novel reasoning and code understanding enable creative solutions). Better general reasoning does not uniformly improve tool-use performance.

## Implications for Safety-Critical Systems

ToolQA demonstrates that even the best tool-augmented LLMs achieve under 50% accuracy on straightforward single-tool lookups and under 10% on questions requiring multi-step tool composition. For safety-critical applications at [[capability-gradient]] Level 3 and beyond — where agents must reliably chain tool calls to query databases, invoke simulations, and synthesise results — these failure rates are operationally significant. The argument-error finding is particularly relevant: the risk is not that the agent calls the wrong tool, but that it calls the right tool with subtly wrong parameters, producing plausible but incorrect results that are harder to detect downstream.
