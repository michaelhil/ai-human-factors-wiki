---
title: "Summary: Liu et al. (2024) — Lost in the Middle: How Language Models Use Long Contexts"
type: summary
sources:
  - raw/references/Liu_2024_lost-in-the-middle-how-language-models-use-long-contexts.pdf
related:
  - "[[context-windows]]"
  - "[[retrieval-augmented-generation]]"
  - "[[context-management-risks]]"
  - "[[output-vacuity]]"
tags:
  - context-window
  - positional-bias
  - lost-in-the-middle
  - empirical
  - retrieval
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Liu et al. (2024) — Lost in the Middle

**Full citation:** Liu, N.F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., and Liang, P. (2023). Lost in the Middle: How Language Models Use Long Contexts. *TACL*, 12, 157–173.

## Key Contribution

This Stanford/Samaya AI paper demonstrates that LLMs do not use information uniformly across their context window. Performance follows a distinctive **U-shaped curve**: models are best at using information at the very beginning (primacy bias) or end (recency bias) of the context, and significantly degrade when relevant information is in the middle. The effect is consistent across models, tasks, and context lengths, and persists even on simple synthetic retrieval tasks.

## The U-Shaped Performance Curve

On multi-document question answering with 20 retrieved documents (~4K tokens):
- **Best performance**: when the answer document is 1st or 20th (edges) — ~75% accuracy
- **Worst performance**: when the answer document is in the middle (positions 8-15) — ~55% accuracy
- **Drop**: over **20 percentage points** from edge to middle

The finding that is most alarming for safety-critical applications: in 20- and 30-document settings, performance with the answer in the middle is **lower than closed-book performance** (56.1% for GPT-3.5-Turbo). Providing the model with 20 documents containing the answer can produce worse results than giving it no documents at all, if the answer happens to be in the middle of the retrieved set.

## Key-Value Retrieval Confirms Positional Bias

A synthetic task eliminates confounds: given a JSON object with k key-value pairs (128-bit UUIDs), retrieve the value for a specified key. This requires no comprehension — only exact matching within the context. The U-shaped curve persists, confirming that the effect is a positional attention phenomenon, not a comprehension failure.

## Extended Context Does Not Help

When inputs fit in both standard and extended context windows (e.g., 10 documents fit in both GPT-3.5-Turbo's 4K and 16K windows), performance is nearly identical. Extended context provides more capacity but does not improve the model's ability to use information at any position. Models with larger windows are not better at finding information — they just have more room to lose it in.

## Architecture Matters

Encoder-decoder models (Flan-UL2, Flan-T5-XXL) are more robust to position changes within their training-time context window. Bidirectional encoding processes all documents before generation, reducing positional bias. However, when sequences exceed the training-time window, the U-shaped curve reappears. Current frontier LLMs are all decoder-only (see [[llm-architecture]]), making them inherently susceptible.

## Instruction Fine-Tuning May Worsen Primacy Bias

Comparing MPT-30B (base) to MPT-30B-Instruct, the instruction-tuned model shows stronger primacy bias. This may be because instruction fine-tuning data places task specifications at the beginning of the context, training the model to attend disproportionately to early positions.

## Relevance to This Wiki

This paper provides the empirical foundation for the [[context-windows]] page's discussion of information ordering effects. For safety professionals, the key implications are: (1) **document ordering in [[retrieval-augmented-generation]] is a design parameter**, not an implementation detail — the most important retrieved documents should be placed at the beginning or end, not in the middle; (2) **more context can be worse than less** — over-retrieval doesn't just waste tokens, it can push relevant information into the low-attention middle zone; (3) the effect is **architectural** (related to how decoder-only transformers compute attention), not a training deficiency that future models will automatically fix.
