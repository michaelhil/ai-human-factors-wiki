---
title: "Tool Calling"
type: architecture
sources:
  - raw/references/Patil_2023_gorilla-llm-connected-with-massive-apis.pdf
  - raw/references/Patil_2025_berkeley-function-calling-leaderboard.pdf
  - raw/references/Qin_2024_toolllm-facilitating-large-language-models-to-master-real-world-apis.pdf
  - raw/references/Zhuang_2024_toolqa.pdf
  - raw/references/Yao_2023_react-synergizing-reasoning-and-acting-in-language-models.pdf
related:
  - "[[perceive-reason-act-loop]]"
  - "[[hallucination]]"
  - "[[model-context-protocol]]"
  - "[[llm-architecture]]"
tags:
  - tool-calling
  - function-calling
  - reliability
  - agent
  - failure-mode
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Tool Calling

Tool calling (also called function calling) is the mechanism by which LLM agents take actions with external effects. It is the most operationally consequential capability of an LLM agent, and its failure modes have direct safety implications.

## How It Works

The system prompt declares a set of available tools, each with a name, a natural-language description, and a parameter schema (typically JSON). When the model determines a tool call is appropriate, it generates a structured output containing the tool name and parameter values. The agent runtime intercepts this output, executes the call externally, and returns the result to the model's context. The model then continues generating, incorporating the result into its reasoning.

The critical point: the model's decision to call a tool, its selection of which tool, and its choice of parameters are all **probabilistic**. The model does not "look up" the correct tool in a database. It predicts the most likely tool call given the context, the same way it predicts the next word in a sentence. Tool calling is therefore subject to the same error types as text generation: [[hallucination]], distributional bias, and [[prompt-sensitivity]].

## Failure Modes

Empirical studies document several failure modes:

**Wrong tool selected.** The model chooses a tool that does not exist (hallucinating a tool name) or selects a tool inappropriate for the current task. In 2023 benchmarks, Patil et al. (2023) found approximately 30% hallucinated API calls. Tool selection accuracy drops as the number of available tools increases (Qin et al., 2024).

**Correct tool, wrong parameters.** The model selects the right tool but generates incorrect parameter values: type errors (string where number expected), unit errors (Fahrenheit instead of Celsius), range errors (values outside bounds), or hallucinated parameter names.

**Tool result misinterpreted.** The model correctly calls a tool and receives a correct result, but misreads or misinterprets the returned data — extracting the wrong field from a JSON object, misreading significant digits, or confusing units.

**Unnecessary tool call.** The model calls a tool when reasoning from existing context would suffice, adding latency and potentially introducing stale data.

**Missing tool call.** The model reasons from stale or incomplete context when a tool call would provide current data. The model does not "know" its context is outdated.

**Cascading failures.** One bad tool call produces a result that triggers further bad calls. In an agent loop with multiple sequential tool calls, errors compound through several reasoning steps before becoming visible.

## Empirical Reliability

The Berkeley Function Calling Leaderboard V4 (Patil et al., 2025) found that frontier models achieve approximately 70% on holistic agentic evaluation — substantial improvement on simple function calls, but with persistent 30–40% failure rates on multi-turn agentic tasks requiring dynamic decision-making.

In 2023, Zhuang et al. (2023) found only 40–50% accuracy on hard questions requiring multi-step tool use. The improvement since then is real but the remaining failure rates on complex, multi-step tasks remain significant.

## The Compounding Problem

Tool calling errors compound multiplicatively. If each tool call in a chain has a 90% success rate, a five-step chain has only a 59% chance of completing without error. At 80% per step, a five-step chain drops to 33%. For applications where an agent may issue multiple sequential tool calls as part of a diagnostic or monitoring task, compounding failures are the central reliability concern.

## The Latency Dimension

Tool calling introduces latency into agent reasoning. The standard ReAct pattern interleaves reasoning and tool calling sequentially: the model generates a thought, selects a tool, dispatches the call, blocks until the result returns, incorporates it, and generates the next thought. Each tool call adds its full round-trip time to total response latency.

For a reasoning chain requiring five sequential tool calls — each taking 200ms, with each inference step taking 2 seconds — the end-to-end time for the chain alone is approximately 11 seconds. Independent tool calls (where one result does not depend on another) can be dispatched in parallel to reduce wall-clock time.

For time-critical applications (alarm response, emergency diagnosis), latency constraints limit how many tool calls are practical within the operator's decision timeline.

## Relevance to Safety-Critical Systems

1. **Tool calls are where AI meets the real world.** While text generation errors are contained within the conversation, tool calling errors can query wrong databases, pass incorrect parameters to simulations, or retrieve outdated documents — with consequences that propagate through the entire analysis.

2. **The [[model-context-protocol]] standardises tool interfaces** but does not solve the reliability problem. A standardised interface reduces one class of errors (malformed calls) but not the semantic dimension (calls that are well-formed but invoke the wrong tool or supply incorrect values).

3. **Cross-domain examples.** In aviation, a tool call that queries the wrong weather station could inform incorrect routing. In oil and gas, a tool call that passes wrong parameters to a reservoir simulation could produce misleading production forecasts. In medical settings, a tool call that queries the wrong patient record could inform treatment decisions with another patient's data.

4. **Design mitigation.** Validate tool call parameters before execution. Log all tool calls and results for auditability. Use typed, constrained parameter schemas that reject obviously wrong inputs. Implement circuit breakers that halt agent execution after repeated tool-call failures.
