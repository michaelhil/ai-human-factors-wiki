# AI for Human Factors and Safety: A Technical Primer

This wiki provides a comprehensive technical reference on AI systems — large language models, agents, and multi-agent architectures — written for Human Factors and Safety specialists working in complex work domains. It bridges the gap between AI technical literature and the needs of professionals responsible for designing, evaluating, and regulating work systems where AI plays an advisory role.

## Foundations
- [[llm-architecture]] — Transformers, self-attention, tokenisation, statelessness
- [[context-windows]] — Working memory limits, lost-in-the-middle, context rot
- [[training-and-alignment]] — Pre-training, RLHF, Constitutional AI, fine-tuning
- [[inference-and-generation]] — Sampling, temperature, reasoning models, structured output

## Agent Architectures
- [[perceive-reason-act-loop]] — The agent loop, ReAct pattern, autonomy scale
- [[tool-calling]] — How agents invoke external tools, failure modes, compounding
- [[memory-architectures]] — Episodic, semantic, procedural memory; collaborative design
- [[model-context-protocol]] — MCP standard for model-agnostic tool connectivity

### Multi-Agent Patterns
- [[multi-agent-taxonomy]] — Taxonomies of multi-agent system types and configurations
- [[multi-agent-roles]] — Roles and responsibilities within multi-agent architectures

## Failure Modes
- [[hallucination]] — Fluent, confident, and wrong
- [[calibration-and-confidence]] — Confidence does not match accuracy
- [[sycophancy]] — Agrees with user rather than providing independent analysis
- [[prompt-sensitivity]] — Minor input changes, major output variation
- [[output-vacuity]] — Superficially competent but operationally empty (slop)
- [[self-correction-limitations]] — Intrinsic correction fails; extrinsic correction works
- [[context-management-risks]] — Summarisation hallucination, information loss
- [[multi-agent-coordination-failures]] — Coordination breakdowns and cascading errors in multi-agent systems

## Safety and Reliability
- [[non-determinism-and-reproducibility]] — Stochastic output and V&V challenges
- [[degradation-characteristics]] — Gradual, catastrophic, and silent degradation
- [[opacity-and-explainability]] — Double opacity and auditability barriers
- [[deployment-local-vs-cloud]] — Local vs cloud, open-weight models, configuration control
- [[epistemic-independence]] — Independence of reasoning and evidence in multi-agent systems
- [[monoculture-collapse]] — Common-cause failure from shared model weights and training data

## Design Patterns
- [[retrieval-augmented-generation]] — RAG architecture and failure modes
- [[knowledge-graphs]] — Structured grounding and guardrails
- [[hybrid-decision-pipeline]] — Decision-type spectrum and layered architecture
- [[governance-gates]] — Human-in-the-loop checkpoints and approval gates in AI pipelines
- [[delivery-modes]] — Modes of AI output delivery and their implications for human oversight

## Human-AI Interaction
- [[situation-awareness-in-human-ai-teams]] — Situation awareness theory applied to human-AI teaming contexts
- [[automation-bias]] — Over-reliance on automated systems and degraded independent judgment
- [[trust-calibration]] — Matching human trust levels to actual AI system reliability
- [[skill-degradation]] — Erosion of human competencies through over-reliance on AI assistance
- [[theory-of-mind-in-llms]] — Whether LLMs model others' mental states, and implications for trust and manipulation

## Evaluation and Testing
- [[hra-methods-for-ai]] — Adapting human reliability analysis methods to AI-inclusive sociotechnical systems
- [[ai-specific-performance-shaping-factors]] — Factors that shape human performance when working with AI systems
- [[capability-gradient]] — Assessing AI capability across task types, complexity levels, and operational conditions

## Domain Applications
- [[nuclear-ai-regulatory-considerations]] — Trilateral regulatory principles for AI in nuclear applications

---

## Reference
- [[glossary]]
- [Source Summaries](summaries/index.md)
