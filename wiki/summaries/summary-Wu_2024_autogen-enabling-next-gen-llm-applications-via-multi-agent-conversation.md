---
title: "Summary: Wu et al. (2024) — AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"
type: summary
sources:
  - raw/references/Wu_2024_autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation.pdf
related:
  - "[[multi-agent-taxonomy]]"
  - "[[multi-agent-roles]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[governance-gates]]"
tags:
  - multi-agent
  - autogen
  - framework
  - conversation-programming
  - human-in-the-loop
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Wu et al. (2024) — AutoGen

**Full citation:** Wu, Q., Bansal, G., Zhang, J., Wu, Y., Li, B., Zhu, E., Jiang, L., Zhang, X., Zhang, S., Liu, J., Awadallah, A., White, R.W., Burger, D., and Wang, C. (2024). AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation. *ICLR 2024*.

## Key Contribution

This Microsoft Research paper introduces AutoGen, an open-source framework for building multi-agent LLM applications through **conversable agents** and **conversation programming**. AutoGen provides the most widely adopted production framework for multi-agent coordination, implementing several of the patterns described in [[multi-agent-taxonomy]] — particularly Pattern 3 (orchestrator-worker), Pattern 5 (conversational group chat), and configurable human-in-the-loop interaction.

## Core Design

**Conversable agents** are a generic abstraction that can be backed by LLMs, humans, tools, or any combination. Three built-in types:
- **AssistantAgent**: LLM-backed, generates responses and code
- **UserProxyAgent**: human- and tool-backed, executes code and solicits human input
- **GroupChatManager**: coordinates dynamic multi-agent conversations with LLM-driven speaker selection

**Conversation programming** defines workflows through two steps: (1) defining agents with specific roles and capabilities, and (2) programming their interaction behaviour via natural language and code. Control flow is conversation-driven — agents take actions in response to messages, and their actions produce further messages.

## Key Architectural Patterns Demonstrated

**Dynamic group chat with role-play speaker selection.** The GroupChatManager dynamically selects which agent speaks next based on conversation context, using a role-play prompt. This outperformed task-based selection in a pilot study, producing higher success rates and fewer LLM calls. This is the practical implementation of the speaker selection mechanism described in [[multi-agent-taxonomy]] Pattern 5.

**Grounding agent for error loop prevention.** In ALFWorld (household navigation), a 3-agent system with a dedicated grounding agent that supplies commonsense knowledge (e.g., "you must find and take the object before you can examine it") achieved 77% success rate, +15% over ReAct. The grounding agent mitigates the repetitive error loops that plague agent systems — directly relevant to the circuit breaker concept in [[multi-agent-coordination-failures]].

**Safeguard agent for code safety.** In OptiGuide (supply chain optimisation coding), a Safeguard agent checks code safety before execution. Multi-agent design boosted F1 for detecting unsafe code by 8% (GPT-4) and 35% (GPT-3.5) compared to single-agent. This pattern maps to the [[governance-gates]] concept — a dedicated agent enforcing safety checks before consequential actions.

**Configurable human involvement.** Human participation is controlled via `human_input_mode`: ALWAYS (human reviews every step), TERMINATE (human reviews final output), NEVER (fully autonomous). This is not bolted on — it's a first-class design parameter, supporting the [[governance-gates]] principle that human authority should be architectural.

## Benchmark Results

| Application | Configuration | Performance |
|---|---|---|
| MATH (Level 5) | 3-agent (GPT-4) | **69.5%** (vs 45% ChatGPT+Plugin, 30% vanilla GPT-4) |
| ALFWorld | 3-agent with grounding | **77%** best-of-3 (vs 54% ReAct) |
| OptiGuide | Multi-agent (GPT-4) | **96% F1** for unsafe code (vs 88% single-agent) |

## Relevance to This Wiki

AutoGen is the most concrete and widely-adopted implementation of the multi-agent patterns described in this wiki. For safety professionals, the key takeaways are: (1) the **grounding agent** pattern demonstrates how dedicated agents can break error loops — relevant to [[multi-agent-coordination-failures]]; (2) the **safeguard agent** pattern shows how [[governance-gates]] can be implemented as agent roles; (3) configurable human involvement makes human authority a design parameter rather than an assumption; (4) the framework acknowledges that "allowing LLM agents to make changes in external environments through code execution or function calls could be risky" — a safety concern directly relevant to [[tool-calling]] in safety-critical domains.
