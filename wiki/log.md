# Wiki Change Log

## 2026-04-15 — Wiki Initialised and First Ingestion

### Initialisation
- Created project structure with 8 content directories
- Defined wiki.config.md with domain context, writing approach, and quality rules
- Created CLAUDE.md agent schema
- Copied 6 proprietary reports to raw/private/ (gitignored)
- Copied 78 public references to raw/references/
- Set up MkDocs Material configuration with dark mode, search, roamlinks
- Created GitHub Pages deployment workflow
- Created feedback system (MkDocs override + Vercel serverless function)
- Created glossary.md with initial terms
- Created scope.md with topic area definitions

### First Ingestion (Report 1: LLM Foundations)
Source: proprietary Report 1 (background knowledge only — not cited)
Public references cited: Vaswani 2017, Phuong 2022, Liu 2024, Du 2025, Xiao 2024, Bai 2022, Sharma 2024, Perez 2023, Huang 2023, Ji 2023, Zhang 2023, Tonmoy 2024, Manakul 2023, Dokas 2025, Kadavath 2022, Tian 2023, Xiong 2024, Guo 2017, Zhao 2021, Patil 2023, Patil 2025, Qin 2024, Zhuang 2024, Yao 2023, Kommers 2026, Shaib 2025, Kandpal 2023, Shumailov 2024, Lewis 2020, Barnett 2024, Agrawal 2024, Edge 2024, Peng 2024, Xu 2024, Sclar 2024, Mizrahi 2024

Pages created (9):
- foundations/llm-architecture.md
- foundations/context-windows.md
- foundations/training-and-alignment.md
- agent-architectures/tool-calling.md
- failure-modes/hallucination.md
- failure-modes/calibration-and-confidence.md
- failure-modes/sycophancy.md
- failure-modes/output-vacuity.md
- safety-and-reliability/non-determinism-and-reproducibility.md
- safety-and-reliability/degradation-characteristics.md
- design-patterns/retrieval-augmented-generation.md
- design-patterns/knowledge-graphs.md

Pages remaining from Report 1 (to be created in follow-up sessions):
- foundations/inference-and-generation.md
- agent-architectures/perceive-reason-act-loop.md
- agent-architectures/memory-architectures.md
- agent-architectures/model-context-protocol.md
- failure-modes/prompt-sensitivity.md
- failure-modes/self-correction-limitations.md
- failure-modes/context-management-risks.md
- safety-and-reliability/opacity-and-explainability.md
- safety-and-reliability/deployment-local-vs-cloud.md
- design-patterns/hybrid-decision-pipeline.md

## 2026-04-15 — Created 20 Source Summary Pages

- Private source: no
- Guidance: none

### Summaries created (20):
- summaries/summary-vaswani-2017.md — Vaswani et al. (2017), Attention Is All You Need
- summaries/summary-phuong-2022.md — Phuong & Hutter (2022), Formal Algorithms for Transformers
- summaries/summary-lewis-2020.md — Lewis et al. (2020), Retrieval-Augmented Generation
- summaries/summary-bai-2022.md — Bai et al. (2022), Constitutional AI
- summaries/summary-yao-2023.md — Yao et al. (2023), ReAct
- summaries/summary-wei-2022.md — Wei et al. (2022), Chain-of-Thought Prompting
- summaries/summary-sumers-2024.md — Sumers et al. (2024), Cognitive Architectures for Language Agents
- summaries/summary-huang-2023-self-correct.md — Huang et al. (2023), LLMs Cannot Self-Correct Reasoning Yet
- summaries/summary-huang-2023-hallucination.md — Huang et al. (2023), Survey on Hallucination in LLMs
- summaries/summary-ji-2023.md — Ji et al. (2023), Survey of Hallucination in NLG
- summaries/summary-sharma-2024.md — Sharma et al. (2024), Towards Understanding Sycophancy in LLMs
- summaries/summary-perez-2023.md — Perez et al. (2023), Discovering LLM Behaviors with Model-Written Evaluations
- summaries/summary-kadavath-2022.md — Kadavath et al. (2022), Language Models (Mostly) Know What They Know
- summaries/summary-tian-2023.md — Tian et al. (2023), Just Ask for Calibration
- summaries/summary-xiong-2024.md — Xiong et al. (2024), Can LLMs Express Their Uncertainty?
- summaries/summary-guo-2017.md — Guo et al. (2017), On Calibration of Modern Neural Networks
- summaries/summary-sclar-2024.md — Sclar et al. (2024), Quantifying LLM Sensitivity to Spurious Features
- summaries/summary-lu-2022.md — Lu et al. (2022), Fantastically Ordered Prompts
- summaries/summary-zhao-2021.md — Zhao et al. (2021), Calibrate Before Use
- summaries/summary-mizrahi-2024.md — Mizrahi et al. (2024), State of What Art: Multi-Prompt LLM Evaluation

### Updated:
- summaries/index.md — populated with all 20 summary entries grouped by topic

## 2026-04-15 — Removed ad-hoc summaries, switched to /wiki-ingest skill
- Removed 40 summary pages created without proper ingestion process
- Fixed 3 dead wikilinks in glossary
- Audited all 33 content pages: no orphans, no missing source paths, build clean

## 2026-04-15 — Ingested Huang_2023_large-language-models-cannot-self-correct-reasoning-yet.pdf
- Created: summaries/summary-huang-2023-self-correct.md
- Updated: failure-modes/self-correction-limitations.md (added quantitative degradation data, explanation of why prior claims were misleading)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Barnett_2024_seven-failure-points-in-rag-systems.pdf
- Created: summaries/summary-barnett-2024.md
- Updated: design-patterns/retrieval-augmented-generation.md (added engineering lessons from 3 case studies)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Sharma_2024_towards-understanding-sycophancy-in-language-models.pdf
- Created: summaries/summary-sharma-2024.md
- Updated: failure-modes/sycophancy.md (replaced manifestations with 4 empirically demonstrated types with quantitative findings; added root cause analysis from preference data)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Huang_2023_survey-on-hallucination-in-large-language-models.pdf
- Created: summaries/summary-huang-2023-hallucination.md
- Updated: failure-modes/hallucination.md (replaced types section with refined taxonomy — factuality vs faithfulness; added three-source causal framework from data/training/inference)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Yao_2023_react-synergizing-reasoning-and-acting-in-language-models.pdf
- Created: summaries/summary-yao-2023.md
- Updated: agent-architectures/perceive-reason-act-loop.md (added ReAct empirical comparison, hallucination rates, interpretability advantage)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Bai_2022_constitutional-ai-harmlessness-from-ai-feedback.pdf
- Created: summaries/summary-bai-2022.md
- Updated: foundations/training-and-alignment.md (expanded CAI section with two-stage mechanism, RLAIF detail, Pareto improvement, explicit-principles property)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Lewis_2020_retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.pdf
- Created: summaries/summary-lewis-2020.md
- Updated: design-patterns/retrieval-augmented-generation.md (added RAG-Sequence/Token distinction, index hot-swapping, factuality evidence)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Phuong_2022_formal-algorithms-for-transformers.pdf
- Created: summaries/summary-phuong-2022.md
- Updated: foundations/llm-architecture.md (added decoder-only architecture section, causal mask explanation)
- Private source: no
- Guidance: none

## 2026-04-15 — Ingested Vaswani_2017_attention-is-all-you-need.pdf
- Created: summaries/summary-vaswani-2017.md
- Updated: foundations/llm-architecture.md (added multi-head attention, positional encoding, quadratic complexity, encoder-decoder structure detail)
- Private source: no
- Guidance: none
