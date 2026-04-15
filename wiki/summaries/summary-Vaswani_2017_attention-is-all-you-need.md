---
title: "Summary: Vaswani et al. (2017) — Attention Is All You Need"
type: summary
sources:
  - raw/references/Vaswani_2017_attention-is-all-you-need.pdf
related:
  - "[[llm-architecture]]"
  - "[[context-windows]]"
  - "[[inference-and-generation]]"
tags:
  - transformer
  - self-attention
  - architecture
  - foundational
confidence: high
created: 2026-04-15
updated: 2026-04-15
---

# Summary: Vaswani et al. (2017) — Attention Is All You Need

**Full citation:** Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, Ł., and Polosukhin, I. (2017). Attention Is All You Need. *31st Conference on Neural Information Processing Systems (NeurIPS 2017)*.

## Key Contribution

This paper introduces the Transformer, a neural network architecture based entirely on attention mechanisms, dispensing with the recurrent and convolutional layers that dominated sequence modelling at the time. The Transformer is the architectural foundation of all current large language models (GPT, Claude, Llama, Gemini) and is the subject of the [[llm-architecture]] wiki page.

## Architecture

The Transformer uses an **encoder-decoder** structure built from stacked layers. Each encoder layer has two sub-layers: a multi-head self-attention mechanism and a position-wise feed-forward network, with residual connections and layer normalisation around each. The decoder adds a third sub-layer for encoder-decoder attention. The base model uses N=6 layers, d_model=512, and 8 attention heads.

**Scaled dot-product attention** computes attention as: Attention(Q,K,V) = softmax(QK^T / √d_k)V, where Q (queries), K (keys), and V (values) are linear projections of the input. The scaling factor √d_k prevents the dot products from growing large enough to push the softmax into regions with extremely small gradients.

**Multi-head attention** runs h parallel attention functions (h=8 in the base model), each with different learned projections, then concatenates and projects the results. This allows the model to attend to information from different representation subspaces at different positions simultaneously.

**Positional encoding** uses sine and cosine functions of different frequencies to inject position information, since self-attention has no inherent notion of sequence order. The sinusoidal encoding was chosen because it allows the model to attend to relative positions and to extrapolate to longer sequences than seen during training.

## Key Properties for Safety Professionals

**Quadratic complexity in sequence length.** Self-attention computes pairwise relationships between all positions, giving O(n²·d) complexity per layer. This is why [[context-windows]] have practical limits despite nominal capacity — as context grows, computation grows quadratically, and the attention budget spreads thinner (see the context rot research in [[context-windows]]).

**No information partitioning.** Self-attention computes relationships between *every* pair of positions. There is no built-in mechanism to isolate one part of the context from another. This is the architectural basis for why system prompts cannot create hard boundaries — information anywhere in the context can influence generation at any position.

**Parallelisation enables scale.** Unlike recurrent architectures (which process tokens sequentially), self-attention processes all positions simultaneously. This is what made the massive scaling of modern LLMs feasible — the Transformer can exploit GPU parallelism in ways that RNNs cannot.

**Auto-regressive generation.** The decoder generates output one token at a time, each conditioned on all previous tokens. Masked self-attention in the decoder prevents attending to future positions, enforcing the causal property needed for left-to-right generation.

## Relevance to This Wiki

This paper is the architectural foundation for everything in the wiki. The self-attention mechanism it introduces is the reason that LLMs process their entire context as a unified object (relevant to [[epistemic-independence]] — a single model cannot partition its reasoning), that [[context-windows]] have quadratic scaling costs, and that [[inference-and-generation]] can be parallelised during training but remains sequential during generation. Every failure mode and design pattern in this wiki ultimately traces back to properties of this architecture.
