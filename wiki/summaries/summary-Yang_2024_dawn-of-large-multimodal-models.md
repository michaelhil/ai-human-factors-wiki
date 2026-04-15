---
title: "Summary — The Dawn of LMMs: Preliminary Explorations with GPT-4V(ision)"
type: summary
sources:
  - raw/references/Yang_2024_dawn-of-large-multimodal-models.pdf
related:
  - "[[llm-architecture]]"
  - "[[delivery-modes]]"
  - "[[hallucination]]"
  - "[[tool-calling]]"
  - "[[perceive-reason-act-loop]]"
  - "[[self-correction-limitations]]"
  - "[[retrieval-augmented-generation]]"
tags:
  - multimodal
  - gpt-4v
  - capabilities
  - vision-language
  - agent
confidence: medium
created: 2026-04-15
updated: 2026-04-15
---

# The Dawn of LMMs: Preliminary Explorations with GPT-4V(ision)

Yang et al. (2024) present a 156-page qualitative exploration of GPT-4V's capabilities across dozens of application scenarios. The report is authored by a Microsoft research team with early access to GPT-4V, and is primarily a capabilities showcase rather than a safety or evaluation study. It demonstrates a wide range of vision-language tasks through worked examples with expert annotations, making it useful for understanding the input/output modalities that large multimodal models (LMMs) can handle.

## Key capabilities demonstrated

The report catalogues GPT-4V's input flexibility: it can process interleaved image-text sequences, handle multiple images in a single prompt, and accept visual pointers such as bounding boxes, arrows, and hand-drawn circles overlaid on images (visual referring prompting). This has implications for [[delivery-modes]] in human-AI systems, as it expands the interaction design space beyond text-only exchanges to include annotated visual communication.

Application domains explored include medical imaging (radiology report generation, dermatology), industrial defect detection, autonomous driving scene understanding, document and chart analysis, mathematical reasoning from visual inputs, and geographic and satellite image interpretation. These domain applications are relevant to understanding [[llm-architecture]] in its multimodal extension.

## Agent-relevant findings

Section 10 explores how GPT-4V can serve as the perception backbone for agentic systems:

- **Multimodal plugins** enable the model to call external tools (e.g., Bing Image Search) to compensate for training-data knowledge cutoffs, illustrating [[tool-calling]] extended to the visual domain.
- **Multimodal chains** apply the ReAct (Thought-Action-Observation) framework with vision-capable plugins. A PPE-counting example chains person detection, image cropping, and per-person helmet classification — a concrete instance of the [[perceive-reason-act-loop]] with visual inputs.
- **Self-reflection** allows GPT-4V to compare its generated output (code for figures, text-to-image prompts) against a reference image and iteratively improve it. This relates to [[self-correction-limitations]] — the paper shows self-reflection improving figure reproduction fidelity, though these are cherry-picked qualitative examples rather than systematic evaluations.
- **Self-consistency** applies majority voting over multiple sampled responses to improve counting reliability, compensating for the model's variable performance on object-counting tasks.
- **Retrieval-augmented LMMs** extend [[retrieval-augmented-generation]] to the multimodal setting, retrieving image-text-price triplets for applications like grocery checkout.

## Failure modes observed

Though not the report's focus, expert annotations throughout reveal characteristic failure patterns relevant to [[hallucination]]:

- In medical imaging, GPT-4V missed an obvious distal radial fracture while correctly identifying the study type, and hallucinated precise measurements (e.g., nodule diameter) not derivable from the image.
- In embodied agent scenarios, the model sometimes confused visually similar UI elements (e.g., misidentifying button positions on a coffee machine).
- In GUI navigation, the model occasionally produced inaccurate spatial descriptions of element locations (e.g., wrong row/column for app icons).

These errors illustrate that multimodal capabilities do not eliminate the grounding failures documented in text-only settings — they extend them to the visual domain.

## Limitations as evidence

This report should be treated as a catalogue of demonstrated capabilities, not as a rigorous evaluation. Examples are hand-selected, sample sizes are typically one, and no systematic benchmarking is conducted. The failure examples annotated by domain experts are more informative for safety analysis than the success cases, as they reveal the types of errors that emerge when LMMs are applied in high-stakes domains like medical imaging.
