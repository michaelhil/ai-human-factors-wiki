---
title: "Summary: On Calibration of Modern Neural Networks"
type: summary
sources:
  - raw/references/Guo_2017_on-calibration-of-modern-neural-networks.pdf
related:
  - "[[calibration-and-confidence]]"
  - "[[training-and-alignment]]"
  - "[[inference-and-generation]]"
  - "[[hallucination]]"
  - "[[trust-calibration]]"
tags:
  - calibration
  - confidence
  - neural-network
  - temperature-scaling
  - overconfidence
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# On Calibration of Modern Neural Networks

Guo et al. (2017) establish the foundational finding that modern neural networks are significantly miscalibrated — their confidence scores do not reflect their actual accuracy — and that this miscalibration has worsened as networks have become more accurate. The paper introduces temperature scaling as a simple, effective post-processing calibration method and provides the analytical framework (ECE, reliability diagrams) that subsequent LLM calibration research builds upon.

## The Core Finding: Accuracy Up, Calibration Down

Older neural networks (circa 1998–2005) were reasonably well-calibrated: when a 5-layer LeNet predicted a class with 80% confidence, the prediction was correct roughly 80% of the time. Modern networks (ResNets, DenseNets) achieve dramatically better accuracy but are dramatically worse at calibration. A 110-layer ResNet on CIFAR-100 has an Expected Calibration Error (ECE) of 12.67% — meaning its confidence scores systematically overstate its accuracy by over 12 percentage points. The networks are not just occasionally wrong about their confidence; they are systematically overconfident.

## Why Calibration Degraded

The paper identifies three architectural and training trends that each worsen calibration:

**Increased model capacity.** Deeper and wider networks both degrade calibration, even when classification accuracy improves. This is counterintuitive: the model gets better at being right but worse at knowing how right it is.

**Batch Normalization.** Networks trained with Batch Normalization show worse calibration, even though Batch Normalization improves accuracy and reduces the need for other regularisation. The calibration degradation persists regardless of hyperparameter settings.

**Reduced weight decay.** Modern networks use less weight decay than their predecessors. Less regularisation allows the model to become overconfident. The paper demonstrates a disconnect between classification error and negative log-likelihood (NLL): networks can overfit to NLL (becoming overconfident) even while test accuracy is still improving. This means the model learns better classification boundaries while simultaneously learning to express those classifications with inappropriately high confidence.

## Calibration Methods

The paper evaluates several post-processing calibration methods:

- **Histogram binning**: Groups predictions into bins and assigns calibrated probabilities per bin.
- **Isotonic regression**: Learns a piecewise-constant mapping from uncalibrated to calibrated probabilities.
- **Bayesian Binning into Quantiles (BBQ)**: Marginalises over all possible binning schemes.
- **Platt scaling**: Fits a logistic regression on the model's outputs.
- **Temperature scaling**: Divides the logit vector by a single scalar parameter *T* before softmax, optimised on a validation set.

**Temperature scaling is the clear winner.** Despite having only a single parameter, it reduces ECE from 12.67% to 0.96% on CIFAR-100 (a 110-layer ResNet) — outperforming all more complex methods. It is fast to compute (10 iterations of gradient descent), does not change the model's predictions (only the confidence scores), and is trivial to implement (a single division before softmax). The simplicity is remarkable: the entire miscalibration of a 110-layer network can be corrected by tuning one number.

## Metrics Introduced

The paper formalises **Expected Calibration Error (ECE)** — the weighted average of the gap between accuracy and confidence across binned predictions — as the primary calibration metric. It also discusses **Maximum Calibration Error (MCE)** for high-risk applications where worst-case miscalibration matters more than average-case, and **reliability diagrams** (accuracy-vs-confidence plots) as visual tools. These metrics have become standard in subsequent LLM calibration research.

## Relevance to LLMs and Safety-Critical Systems

Although the paper studies classification networks rather than LLMs, the findings are foundational for [[calibration-and-confidence]] in language models. The core mechanisms — increased model capacity, reduced regularisation, and training objective misalignment — all apply to modern LLMs, which are vastly larger and trained with less effective regularisation than the networks studied here. The temperature scaling approach has been extended to LLM calibration, though the autoregressive nature of language generation introduces additional calibration challenges not present in classification. For safety-critical applications, the key insight is that model accuracy and model calibration are independent properties: a system can be highly accurate on average while being systematically overconfident about its individual predictions, creating exactly the kind of misleading confidence that enables [[automation-bias]].
