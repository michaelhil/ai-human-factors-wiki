# AI for Human Factors and Safety: A Technical Primer

This wiki provides a comprehensive technical reference on AI systems — large language models, agents, and multi-agent architectures — written for Human Factors and Safety specialists working in complex work domains. It bridges the gap between AI technical literature and the needs of professionals responsible for designing, evaluating, and regulating work systems where AI plays an advisory role.

## Foundations
### LLM Architecture
- [[llm-architecture]] — Transformers, self-attention, tokenisation, and model scale
- [[context-windows]] — Context window properties, lost-in-the-middle effect, context rot
- [[training-and-alignment]] — Pre-training, RLHF, Constitutional AI, fine-tuning

### Inference and Generation
*Pages to be added during ingestion.*

## Agent Architectures
### Single-Agent Systems
- [[tool-calling]] — How LLM agents invoke external tools, and the failure modes that result

### Multi-Agent Patterns
*Pages to be added during ingestion.*

### Coordination and Communication
*Pages to be added during ingestion.*

### Memory and State
*Pages to be added during ingestion.*

## Failure Modes
### LLM Failure Modes
- [[hallucination]] — Fluent, confident, and wrong: types, causes, and mitigation
- [[calibration-and-confidence]] — When expressed confidence does not match actual accuracy
- [[sycophancy]] — The tendency to agree with the user rather than provide independent analysis
- [[output-vacuity]] — Superficially competent but operationally empty output (slop)

### Agent and Multi-Agent Failure Modes
*Pages to be added during ingestion.*

## Safety and Reliability
### Risk Properties
- [[non-determinism-and-reproducibility]] — Stochastic output and its implications for V&V
- [[degradation-characteristics]] — Gradual, catastrophic, and silent degradation patterns

### Independence and Common-Cause Failure
*Pages to be added during ingestion.*

### Verification and Validation
*Pages to be added during ingestion.*

## Human-AI Interaction
### Trust and Reliance
*Pages to be added during ingestion.*

### Situation Awareness
*Pages to be added during ingestion.*

### Team Cognition
*Pages to be added during ingestion.*

## Design Patterns
### Knowledge Grounding
- [[retrieval-augmented-generation]] — RAG architecture, failure modes, and the over-retrieval problem
- [[knowledge-graphs]] — Structured grounding, guardrails, and constraint checking

### Interface Design
*Pages to be added during ingestion.*

### Control and Governance
*Pages to be added during ingestion.*

## Evaluation and Testing
### Benchmarking and Assessment
*Pages to be added during ingestion.*

### HRA Methods for AI
*Pages to be added during ingestion.*

## Domain Applications
### Cross-Domain Scenarios
*Pages to be added during ingestion.*

---

## Reference
- [[glossary]]
- [Source Summaries](summaries/index.md)
