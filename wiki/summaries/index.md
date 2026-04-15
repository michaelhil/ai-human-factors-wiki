# Source Summaries

One summary per source document. Each summary captures the key arguments, findings, and relevance to this wiki's scope.

## Foundations & Architecture
- [[summary-Vaswani_2017_attention-is-all-you-need]]<br>
  Self-attention replaces recurrence; the architecture behind all modern LLMs
- [[summary-Phuong_2022_formal-algorithms-for-transformers]]<br>
  Pseudocode specification of transformer forward pass, tokenisation, and training
- [[summary-Shanahan_2023_role-play-with-large-language-models]]<br>
  LLMs role-play characters from training data, not hold beliefs; anthropomorphism misleads safety analysis
- [[summary-Kwon_2023_paged-attention-for-llm-serving]]<br>
  OS-inspired paged KV cache management achieves 96% memory utilisation and 2–4x serving throughput
- [[summary-Liu_2023_scissorhands-kv-cache-compression]]<br>
  Pivotal tokens persist across generation steps; evicting the rest compresses KV cache 5x without accuracy loss
- [[summary-Dettmers_2024_qlora-efficient-finetuning-of-quantized-language-models]]<br>
  4-bit quantised finetuning matches 16-bit performance; enables 65B models on a single GPU
- [[summary-Frantar_2023_gptq-accurate-post-training-quantization]]<br>
  Second-order post-training quantization to 3–4 bits with negligible accuracy loss; 175B model fits one GPU

## Self-Correction, Refinement, and Self-Reflection
- [[summary-Abdali_2025_self-reflecting-large-language-models-hegelian-dialectical-approach]]<br>
  Dialectical self-opposition partially overcomes self-correction failure through structural constraint, but single-model limits persist
- [[summary-Huang_2023_large-language-models-cannot-self-correct-reasoning-yet]]<br>
  Intrinsic self-correction degrades performance; only external feedback helps
- [[summary-Madaan_2023_self-refine-iterative-refinement-with-self-feedback]]<br>
  Iterative self-feedback improves generation quality but not reasoning correctness

## Sycophancy
- [[summary-Sharma_2024_towards-understanding-sycophancy-in-language-models]]<br>
  RLHF training causes models to agree with users rather than provide independent analysis

## Hallucination and Knowledge Boundaries
- [[summary-Huang_2023_survey-on-hallucination-in-large-language-models]]<br>
  Comprehensive taxonomy of hallucination types, causes across data/training/inference
- [[summary-Ji_2023_survey-of-hallucination-in-natural-language-generation]]<br>
  Intrinsic vs extrinsic hallucination taxonomy across all NLG tasks
- [[summary-Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection]]<br>
  Sample consistency detects hallucination without external databases or model internals
- [[summary-Kandpal_2023_large-language-models-struggle-to-learn-long-tail-knowledge]]<br>
  Accuracy tracks training data frequency; rare knowledge is systematically unreliable

## Hallucination Surveys
- [[summary-Zhang_2023_sirens-song-in-the-ai-ocean-survey-on-hallucination-in-llms]]<br>
  Three-type taxonomy (input/context/fact-conflicting); hallucination snowballing via RLHF; lifecycle-stage source analysis

## Hallucination Mitigation
- [[summary-Tonmoy_2024_comprehensive-survey-of-hallucination-mitigation-techniques]]<br>
  Taxonomy of 32+ mitigation techniques across RAG, self-refinement, decoding strategies, KGs, and fine-tuning; no single approach eliminates hallucination

## Prompt Sensitivity
- [[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design]]<br>
  Format changes (delimiters, casing, spacing) cause up to 76-point accuracy swings
- [[summary-Lu_2022_fantastically-ordered-prompts-and-where-to-find-them]]<br>
  Few-shot example ordering swings accuracy from random to SOTA; not transferable across models

- [[summary-Mizrahi_2024_state-of-what-art-call-for-multi-prompt-llm-evaluation]]<br>
  Single-prompt benchmarking is unreliable; model rankings change with paraphrased instructions across 6.5M evaluations

## Context Windows
- [[summary-Du_2025_context-length-alone-hurts]]<br>
  Context length alone degrades reasoning even with perfect retrieval and zero distraction; longer input ≠ better performance
- [[summary-Liu_2024_lost-in-the-middle-how-language-models-use-long-contexts]]<br>
  Models favour information at start and end of context; middle content is degraded
- [[summary-Xiao_2024_efficient-streaming-language-models-with-attention-sinks]]<br>
  Attention sinks at initial tokens enable stable streaming beyond the training window

## Calibration and Confidence
- [[summary-Guo_2017_on-calibration-of-modern-neural-networks]]<br>
  Modern networks are systematically overconfident; temperature scaling (one parameter) reduces ECE from 12.67% to 0.96%
- [[summary-Zhao_2021_calibrate-before-use-improving-few-shot-performance-of-language-models]]<br>
  Few-shot accuracy swings from chance to SOTA on prompt ordering alone; contextual calibration corrects systematic majority-label, recency, and common-token biases
- [[summary-Kadavath_2022_language-models-mostly-know-what-they-know]]<br>
  Larger models show partial self-knowledge; RLHF distorts but doesn't destroy calibration
- [[summary-Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores]]<br>
  Verbalized confidence often better-calibrated than token probabilities in RLHF models
- [[summary-Xiong_2024_can-llms-express-their-uncertainty-empirical-evaluation-of-confidence-elicitation]]<br>
  Systematic framework: multi-sample consistency beats single-pass confidence for uncertainty

## Output Quality and Slop
- [[summary-Kommers_2026_why-slop-matters]]<br>
  AI slop is characterised by superficial competence, asymmetric effort, and mass producibility — not mere pollution but a structural phenomenon
- [[summary-Shaib_2025_measuring-ai-slop-in-text]]<br>
  Formal slop taxonomy across three themes; standard metrics and LLMs both fail to reliably detect slop in text

## Tool Calling
- [[summary-Patil_2023_gorilla-llm-connected-with-massive-apis]]<br>
  Fine-tuned model for API calling; demonstrates hallucinated parameter problem
- [[summary-Qin_2024_toolllm-facilitating-large-language-models-to-master-real-world-apis]]<br>
  DFSDT tree-search reasoning enables backtracking on tool errors; 16K+ real APIs; open-source model matches ChatGPT on tool use
- [[summary-Patil_2025_berkeley-function-calling-leaderboard]]<br>
  De facto standard benchmark; models excel at simple calls but memory management (~12%) and multi-turn agentic tasks remain weak
- [[summary-Zhuang_2024_toolqa]]<br>
  Best tool-augmented LLMs reach only 43% on easy and 8% on hard questions requiring genuine (non-memorised) tool use

## Multi-Agent Surveys
- [[summary-Guo_2024_large-language-model-based-multi-agents-survey-of-progress-and-challenges]]<br>
  Four-dimensional taxonomy (environment, profiling, communication, capability) across 30+ LLM-MA systems

## Multi-Agent vs Single-Agent
- [[summary-Gao_2025_single-agent-or-multi-agent-systems-why-not-both]]<br>
  MAS advantage shrinks to 0.8–3% with frontier LLMs; hybrid routing/cascade paradigms optimise the accuracy-cost tradeoff

## Multi-Agent Failure and Risk
- [[summary-Cemri_2025_why-do-multi-agent-llm-systems-fail]]<br>
  MAST taxonomy: 14 failure modes across specification, inter-agent, and task verification
- [[summary-Hammond_2025_multi-agent-risks-from-advanced-ai]]<br>
  Emergent risks from multi-agent interaction: herding, collusion, racing, destabilisation

## Multi-Agent Evaluation
- [[summary-Chan_2024_chateval-better-llm-based-evaluators-through-multi-agent-debate]]<br>
  Diverse role prompts are essential; same-prompt debate equals single-agent; optimal count is 3–4 agents

## Emergent Coordination
- [[summary-Riedl_2025_emergent-coordination-in-multi-agent-language-models]]<br>
  Information-theoretic framework shows ToM prompting transforms agent aggregates into genuine collectives; both differentiation and integration required

## Epistemic Independence and Multi-Agent Debate
- [[summary-Sreedhar_2024_simulating-human-strategic-behavior-comparing-single-and-multi-agent-llms]]<br>
  LLM agents converge to uniform strategies; multi-agent diversity is illusory
- [[summary-Du_2023_improving-factuality-and-reasoning-through-multiagent-debate]]<br>
  Multi-agent debate improves factuality but gains plateau; shared biases limit independence
- [[summary-Wu_2025_can-llm-agents-really-debate-controlled-study-of-multi-agent-debate]]<br>
  Debate success bounded by strongest reasoner; model diversity beats structural parameters
- [[summary-Wynn_2025_talk-isnt-always-cheap-understanding-failure-modes-in-multi-agent-debate]]<br>
  Debate can actively harm accuracy; weak agents contaminate strong ones through social pressure

## Situation Awareness
- [[summary-Gao_2023_agent-teaming-situation-awareness-atsa]]<br>
  ATSA framework extends situation awareness theory to human-AI agent teams

## Theory of Mind
- [[summary-Kosinski_2024_evaluating-large-language-models-in-theory-of-mind-tasks]]<br>
  GPT-4 solves 75% of false-belief tasks (matching 6-year-olds); ToM-like behaviour emerges with scale but remains brittle under perturbation
- [[summary-Ullman_2023_large-language-models-fail-on-trivial-alterations-to-theory-of-mind-tasks]]<br>
  Trivial commonsense variations (transparent bags, illiterate protagonists) break GPT-3.5's ToM performance completely — pattern matching, not reasoning

## Agent Surveys
- [[summary-Xi_2023_rise-and-potential-of-large-language-model-based-agents-survey]]<br>
  Brain-Perception-Action framework; cooperative vs adversarial interaction; four agent properties (autonomy, reactivity, pro-activeness, social ability)
- [[summary-Masterman_2024_landscape-of-emerging-ai-agent-architectures-for-reasoning-planning-and-tool-calling]]<br>
  Vertical vs horizontal multi-agent taxonomy; designated leaders cut coordination overhead ~10%; five cross-cutting design principles
- [[summary-Zhai_2025_agent-evolver-towards-efficient-self-evolving-agent-system]]<br>
  Self-evolved 14B agent outperforms 235B base models; curiosity-driven task generation and structured experience memory enable autonomous improvement

## Agent Frameworks and Cognitive Architectures
- [[summary-Sumers_2024_cognitive-architectures-for-language-agents]]<br>
  CoALA: modular framework mapping agents along memory, action, and decision dimensions
- [[summary-Wu_2024_autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation]]<br>
  Conversational multi-agent framework with customisable agent roles
- [[summary-Hong_2024_metagpt-meta-programming-for-multi-agent-collaborative-framework]]<br>
  SOPs and structured artifacts between agents beat free-form chat; assembly-line coordination
- [[summary-Li_2023_camel-communicative-agents-for-mind-exploration-of-large-language-model-society]]<br>
  Inception prompting enables autonomous role-playing cooperation; documents four conversational failure modes
- [[summary-Liu_2024_dylan-dynamic-llm-powered-agent-network-for-task-oriented-collaboration]]<br>
  Dynamic agent selection outperforms static teams; human role intuitions are unreliable predictors of contribution

## Prompting and Reasoning
- [[summary-Wei_2022_chain-of-thought-prompting-elicits-reasoning-in-large-language-models]]<br>
  Intermediate reasoning steps in prompts unlock emergent reasoning at ~100B+ parameters
- [[summary-Yao_2023_react-synergizing-reasoning-and-acting-in-language-models]]<br>
  Interleaving thought-action-observation traces grounds reasoning in tool feedback
- [[summary-Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning]]<br>
  Verbal self-reflection stored as episodic memory enables trial-and-error learning without weight updates
- [[summary-Park_2023_generative-agents-interactive-simulacra-of-human-behavior]]<br>
  Memory streams with recency/importance/relevance retrieval produce emergent social behaviour

## Training, Scaling, and Evaluation
- [[summary-Bai_2022_constitutional-ai-harmlessness-from-ai-feedback]]<br>
  AI-generated critiques replace human labellers for alignment; scalable but embeds designer values
- [[summary-McKenzie_2023_inverse-scaling-when-bigger-isnt-better]]<br>
  Larger models perform worse on some tasks; scale amplifies training biases, not just capabilities
- [[summary-Shumailov_2024_ai-models-collapse-when-trained-on-recursively-generated-data]]<br>
  Recursive training on AI-generated data causes progressive tail loss; mathematically inevitable
- [[summary-Perez_2023_discovering-language-model-behaviors-with-model-written-evaluations]]<br>
  RLHF amplifies sycophancy and self-preservation; LMs can auto-generate safety evaluations

## Inference Efficiency
- [[summary-Jiang_2023_llmlingua-compressing-prompts-for-accelerated-inference]]<br>
  Up to 20x prompt compression with 1.5-point performance loss; perplexity-guided token removal reduces latency and may improve quality

## Retrieval and Knowledge Grounding
- [[summary-Lewis_2020_retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks]]<br>
  Retrieve-then-generate architecture reduces hallucination by grounding in external documents
- [[summary-Barnett_2024_seven-failure-points-in-rag-systems]]<br>
  RAG can fail at each stage: chunking, embedding, retrieval, reranking, generation, and more
- [[summary-Edge_2024_from-local-to-global-graph-rag-query-focused-summarization]]<br>
  GraphRAG: graph + community summaries enable corpus-wide sensemaking that vector RAG cannot
- [[summary-Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms]]<br>
  Structured KG constraints reduce entity and relation hallucination in grounded generation
- [[summary-Peng_2024_graph-retrieval-augmented-generation-survey]]<br>
  First comprehensive GraphRAG taxonomy: indexing, retrieval, and generation over graph-structured knowledge
- [[summary-Xu_2024_context-graph]]<br>
  Quadruples (entity, relation, entity, context) add temporal, provenance, and confidence metadata that triples lose
