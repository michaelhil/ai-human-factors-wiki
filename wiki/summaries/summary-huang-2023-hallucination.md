---
title: "Summary: Huang et al. (2024) — A Survey on Hallucination in Large Language Models"
type: summary
sources:
  - raw/references/Huang_2023_survey-on-hallucination-in-large-language-models.pdf
related:
  - "[[hallucination]]"
  - "[[training-and-alignment]]"
  - "[[sycophancy]]"
  - "[[calibration-and-confidence]]"
  - "[[retrieval-augmented-generation]]"
tags:
  - hallucination
  - survey
  - taxonomy
  - detection
  - mitigation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Huang et al. (2024) — A Survey on Hallucination in LLMs

**Full citation:** Huang, L., Yu, W., Ma, W., Zhong, W., Feng, Z., Wang, H., Chen, Q., Peng, W., Feng, X., Qin, B., and Liu, T. (2024). A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions. *ACM Transactions on Information Systems*, 1(1), Article 1.

## Key Contribution

This survey provides the most comprehensive taxonomy and causal analysis of LLM hallucination as of 2024. It categorises hallucination into two primary types (factuality and faithfulness), maps causes to three stages of the LLM lifecycle (data, training, inference), and reviews detection methods and mitigation strategies. The taxonomy is more granular than earlier classifications and specifically addresses the open-ended, user-facing nature of LLM interactions rather than narrower NLG task-specific hallucination.

## Hallucination Taxonomy

**Factuality hallucination** — the output contradicts verifiable real-world facts:
- **Factual contradiction**: entity-error (wrong entity named) and relation-error (wrong relationship between entities)
- **Factual fabrication**: unverifiability (claims that cannot be checked against any source) and overclaim (claims that lack universal validity, stated as if broadly accepted)

**Faithfulness hallucination** — the output is unfaithful to the user's instructions or provided context:
- **Instruction inconsistency**: the output deviates from the user's directive (e.g., performs a different task than asked)
- **Context inconsistency**: the output contradicts information provided in the context (e.g., contradicts a retrieved document)
- **Logical inconsistency**: internal contradictions within the output's own reasoning chain

This distinction matters for safety-critical applications: factuality hallucination creates wrong information that could mislead decisions, while faithfulness hallucination means the system ignores its instructions or context — a different failure mode with different detection strategies.

## Three-Source Causal Framework

**Causes from data:** Misinformation and biases in training corpora (the model memorises false information); knowledge boundaries (long-tail knowledge is underrepresented, knowledge becomes outdated, copyright restrictions create gaps); inferior alignment data (SFT on new knowledge actually encourages fabrication — models learn to generate beyond their knowledge boundary rather than refusing).

**Causes from training:** Pre-training creates exposure bias and attention dilution across long sequences. SFT compounds the problem: models trained to always produce complete, helpful responses learn to fabricate when they lack knowledge, because refusal was not modelled in the training data. RLHF introduces [[sycophancy]] — the preference model rewards confident, agreeable responses, creating systematic overconfidence even on topics where the model should express uncertainty.

**Causes from inference:** Imperfect decoding strategies (higher temperature increases hallucination risk by sampling lower-probability tokens); over-confidence from the autoregressive architecture (each token is conditioned on previous tokens, including potentially hallucinated ones, creating a snowball effect); softmax bottleneck (limited expressiveness of the output distribution); and reasoning failure, including the Reversal Curse (the model can answer "A is B" but fails on "B is A").

## Relevance to This Wiki

This survey provides the detailed causal structure that the [[hallucination]] wiki page needs to move from describing *what* hallucination is to explaining *why* it occurs at each stage of the LLM lifecycle. The three-source framework (data, training, inference) is directly useful for safety professionals evaluating AI systems: it provides specific checkpoints for assessing hallucination risk (What was in the training data? How was alignment done? What decoding strategy is used?). The faithfulness hallucination subcategory — where the model ignores its own context — is particularly relevant for [[retrieval-augmented-generation]] failure modes, since RAG depends on the model being faithful to retrieved documents.
