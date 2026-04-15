---
title: "Delivery Modes and Flow Control"
type: design-pattern
sources: []
related:
  - "[[governance-gates]]"
  - "[[multi-agent-coordination-failures]]"
  - "[[situation-awareness-in-human-ai-teams]]"
  - "[[multi-agent-taxonomy]]"
tags:
  - delivery-modes
  - flow-control
  - design-pattern
  - information-management
  - flooding
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Delivery Modes and Flow Control

In multi-agent systems where multiple agents operate concurrently, controlling **how and when** agent outputs reach human participants is as important as the quality of the outputs themselves. Without delivery control, a single event can trigger simultaneous responses from multiple agents, overwhelming the operator with conflicting or redundant information at precisely the moment when focused attention is most needed.

## The Problem

In a Pattern 9 shared room with five active agents, a significant operational event can trigger five near-simultaneous assessments. Without delivery control:

- The operator receives all five at once, exceeding processing capacity
- Lower-priority assessments compete for attention with higher-priority ones
- The operator's reading order is determined by arrival time or display position, not by safety significance
- Agents responding to the original event may interleave with agents responding to each other's assessments, creating a cascade

This is the flooding failure mode described in [[multi-agent-coordination-failures]].

## Delivery Mode Types

### Broadcast (Default)
Every agent output enters the shared space immediately upon generation. All participants see it in real time. Appropriate for low-activity periods where output rate is manageable. During high-activity events, broadcast produces flooding.

### Flow Gate
Agent responses are queued and released one at a time, with priority rules determining order. The flow gate prevents simultaneous arrival and ensures the most safety-relevant outputs reach the operator first.

Flow gate priority can be based on:
- Agent role (adversarial agent outputs prioritised over routine monitoring)
- Content classification (safety-significant assessments before routine updates)
- Recency (more recent data takes priority over older assessments)
- Operator preference (configurable priority ordering)

### Batched Delivery
Agent outputs are accumulated over a time window and delivered as a structured package. Appropriate for periodic review modes (shift handover summaries, hourly status updates) where real-time delivery is not needed.

### Filtered Delivery
Only outputs meeting a novelty or significance threshold are delivered. Suppresses output that adds no information beyond what the operator's existing displays show. This directly addresses the [[output-vacuity]] problem: if the AI assessment would apply equally well to three different conditions, it is not delivered.

## Adaptive Mode Switching

Delivery mode should adapt to operational tempo:

| Operational State | Recommended Mode | Rationale |
|---|---|---|
| Normal operations | Broadcast or filtered | Low output rate; operator can process in real time |
| Developing abnormal condition | Flow gate | Increasing output rate; priority ordering needed |
| Active emergency | Flow gate with elevated priority thresholds | High output rate; only safety-significant outputs delivered |
| Post-event stabilisation | Batched | Comprehensive review; real-time urgency reduced |

Mode transitions can be triggered by alarm count, rate of change of key parameters, or explicit operator selection. The operator must always be able to override the automatic mode selection.

## The Room Pause

A special delivery mode: the operator halts all agent output delivery. No new agent outputs enter the shared space until the operator releases the pause. Existing outputs remain visible; no new ones are added. This is the most powerful [[governance-gates]] mechanism — it gives the operator complete control over information flow.

Room pause must be:
- **Immediately accessible** (single action, not buried in menus)
- **Visually indicated** (the operator and all system components know the pause is active)
- **Operator-releasable** (only the human who paused can release, or a defined authority hierarchy)

## Relevance to Safety-Critical Systems

1. **Delivery control is a safety function.** Uncontrolled information delivery during a time-critical event can degrade operator performance more than having no AI advisory at all. The delivery system must be designed with the same rigour as the agent system itself.

2. **Priority ordering must be pre-defined.** During an emergency is too late to decide which agent outputs are most important. Priority rules must be configured in advance based on operational analysis.

3. **Cross-domain examples.** In aviation, multiple advisory systems (TCAS, GPWS, weather radar) have defined priority hierarchies to prevent alert overload. In medical settings, clinical alert systems use tiered severity levels to prevent alert fatigue. In oil and gas, alarm management systems prioritise alarms by safety significance.

4. **The delivery system affects what the operator knows.** Filtering and flow gating change the operator's [[situation-awareness-in-human-ai-teams]]. Over-aggressive filtering can suppress important information; under-filtering produces overload. Tuning delivery parameters is an ongoing operational concern.
