---
title: Glossary
type: reference
sources: []
related:
  - "[[index]]"
tags:
  - glossary
  - reference
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Glossary

*Terms are added as wiki pages are created. Each entry links to the relevant wiki article for full treatment.*

## A

**Agent** — An LLM embedded in a perceive-reason-act loop with tool access and real-world effect capability. See [[multi-agent-taxonomy]].

**Alignment** — The process of shaping LLM behaviour to follow instructions, be helpful, and avoid harmful outputs. See [[training-and-alignment]].

**Automation Bias** — The tendency for operators to over-rely on automated recommendations without independent verification. See [[automation-bias]].

## C

**Calibration** — The degree to which an LLM's expressed confidence matches its actual accuracy. See [[calibration-and-confidence]].

**Chain-of-Thought (CoT) Prompting** — A prompting technique where few-shot exemplars include intermediate reasoning steps, enabling LLMs to decompose multi-step problems into sequential natural language reasoning. An emergent ability requiring models of ~100B+ parameters. See [[inference-and-generation]].

**Context Window** — The fixed-size token buffer that bounds what an LLM can process in a single inference pass. See [[context-windows]].

## E

**Epistemic Independence** — The property that two assessments are generated from separate information, reasoning processes, or models, so that agreement carries independent evidential weight. See [[epistemic-independence]].

## G

**Governance Gate** — An architectural mechanism requiring human approval before any agent-recommended action with safety implications can proceed. See [[governance-gates]].

## H

**Hallucination** — Fluent, confident LLM output that is factually incorrect or fabricated. See [[hallucination]].

## K

**Knowledge Graph** — A structured representation of domain knowledge as entities and relationships, used to constrain LLM output against verified facts. See [[knowledge-graphs]].

## M

**Monoculture Collapse** — The failure mode in which agents sharing a single base model exhibit correlated systematic errors, defeating the purpose of redundancy. See [[monoculture-collapse]].

## R

**RAG (Retrieval-Augmented Generation)** — An architecture that retrieves documents from an external knowledge base and inserts them into context before generation. See [[retrieval-augmented-generation]].

**ReAct** — A prompting pattern where the agent alternates between reasoning ("thought"), taking actions ("action"), and incorporating results ("observation"). See [[perceive-reason-act-loop]].

**Reflexion** — A verbal reinforcement learning framework where agents store natural language self-reflections after failures in episodic memory, enabling trial-and-error learning without weight updates. See [[self-correction-limitations]] and [[memory-architectures]].

## S

**Situation Awareness** — Perception, comprehension, and projection of environmental state. In human-AI teams, SA is distributed across human and AI components. See [[situation-awareness-in-human-ai-teams]].

**Sycophancy** — The tendency of instruction-tuned LLMs to agree with the user's stated position rather than provide independent assessment. See [[sycophancy]].

## T

**Token** — A sub-word unit (typically 3-5 characters) that LLMs process. Text is segmented into tokens by a tokeniser before processing. See [[llm-architecture]].

**Tool Calling** — The mechanism by which an LLM invokes external functions or APIs; probabilistic and subject to hallucinated parameters. See [[tool-calling]].

## V

**V&V (Verification and Validation)** — The process of confirming that a system meets its requirements (verification) and fulfils its intended purpose (validation). See [[verification-and-validation-challenges]].
