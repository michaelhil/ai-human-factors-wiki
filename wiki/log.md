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
