---
title: "Context Management Risks"
type: failure-mode
sources:
  - raw/references/Xiao_2024_efficient-streaming-language-models-with-attention-sinks.pdf
  - raw/references/Liu_2024_lost-in-the-middle-how-language-models-use-long-contexts.pdf
  - raw/references/Du_2025_context-length-alone-hurts.pdf
  - raw/references/Jiang_2023_llmlingua-compressing-prompts-for-accelerated-inference.pdf
  - raw/references/Liu_2023_scissorhands-kv-cache-compression.pdf
related:
  - "[[context-windows]]"
  - "[[hallucination]]"
  - "[[memory-architectures]]"
  - "[[degradation-characteristics]]"
tags:
  - context-management
  - compression
  - failure-mode
  - summarisation
  - truncation
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Context Management Risks

When [[context-windows]] fill during long operational sessions, information must be discarded, compressed, or moved out of the window. Each strategy introduces distinct risks that are separate from the LLM failure modes in other pages.

## Why Context Management Is Needed

Even at 128K or 1M tokens, agent sessions that run for hours — monitoring a plant shift, tracking an evolving transient, maintaining episodic memory across interactions — will exceed available capacity. A multi-agent system with eight agents, each producing several hundred tokens per exchange, can fill a 128K-token window in under an hour of active operation. Context management is an operational necessity, not a theoretical concern.

## Summarisation-Based Compression

The most common approach: the model generates a natural-language summary of older context, replacing the verbose original.

**Risks:**
- **Information loss**: details that appear unimportant at compression time may become critical later. A sensor reading mentioned in passing early in a session may be key to diagnosing a condition that develops hours later.
- **Hallucinated summaries**: LLM-generated summaries can introduce content that was not in the original. Research on multi-document summarisation shows hallucination rates in summaries reaching 75% for complex multi-source material. When a hallucinated summary is injected back into context as established fact, it contaminates all subsequent reasoning.
- **Faithfulness degradation**: summary accuracy drops for longer inputs, with final segments receiving the least faithful treatment.

For safety-critical applications, summarisation-based compression means the agent's "memory" of earlier events is a **reconstruction**, subject to the same [[hallucination]] risks as any other LLM output.

## Truncation

The simplest alternative: drop the oldest tokens and keep only the most recent window. This avoids hallucination (nothing is generated) but loses all information outside the retained window, including the system prompt and initial instructions if they were at the beginning.

Xiao et al. (2024) found that removing the first few tokens causes attention patterns to collapse due to **attention sinks** — tokens that serve as computational anchors regardless of semantic content. Their StreamingLLM approach retains these initial tokens plus a sliding window of recent tokens.

## Compaction vs Summarisation

A critical distinction: **compaction** deletes tokens from the original text (keeping selected lines verbatim) while **summarisation** rewrites content in condensed form.

| Property | Compaction | Summarisation |
|---|---|---|
| Hallucination risk | Zero — every surviving line is verbatim | Significant — rewriting introduces fabrication |
| Compression ratio | Lower (typically 50–70% retention) | Higher (can achieve 10–20% retention) |
| Information preservation | Selected details preserved exactly | All details approximate |
| Temporal structure | Preserved in retained lines | Often flattened or lost |

For safety-critical applications, compaction is the safer default because it cannot introduce false information.

## Retrieval-Based Context Management

Store conversation history and observations externally; retrieve relevant portions on demand. This applies [[retrieval-augmented-generation]] to the agent's own history. Avoids hallucination risk and information loss, at the cost of retrieval latency and the introduction of retrieval failure as a new failure mode.

## Risks Specific to Safety-Critical Applications

**Asymmetric compression across agents.** In multi-agent settings, different agents may compress the same shared history differently. One agent retains a sensor reading that another agent's compression discarded. Agents' situational pictures diverge not from what they observed but from how they compressed it.

**Loss of temporal ordering and provenance.** Summarisation flattens temporal structure. A summary stating "the system was restarted" loses when it was restarted relative to other events. Provenance (which source provided which data) is typically lost entirely.

**Interaction with lost-in-the-middle.** Compression that places a summary block in the middle of the context may produce a false sense of completeness while the model effectively ignores the summarised content (Liu et al., 2024).

**Safety mechanism instability.** LLM agents show unexpected shifts in both task performance and safety behaviour as context grows, with performance drops exceeding 50% at 100K tokens for some models. Context compression can inadvertently alter the model's behaviour in ways that are difficult to predict.

## Context Discipline

Prevention is better than cure. **Context discipline** — being deliberate about what enters the context — reduces the need for compression. See [[context-windows]] for specific strategies. The key insight: over-filling the context and then compressing is worse than maintaining a lean context from the start, because compression introduces its own failure modes on top of the degradation from context length.

## Relevance to Safety-Critical Systems

1. **Compression introduces a new class of failure modes** distinct from LLM generation errors. These include information loss, hallucinated summaries, temporal flattening, and asymmetric compression across agents.

2. **Long sessions are higher risk.** Every context compression event is a potential point where critical information is lost or corrupted. Session design should consider periodic fresh restarts versus continuous long-running sessions.

3. **Compaction over summarisation** for safety-critical content. When context must be reduced, removing less-relevant content verbatim is safer than rewriting it.
