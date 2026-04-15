# Source Summaries

One summary per source document. Each summary captures the key arguments, findings, and relevance to this wiki's scope.

## Foundations & Architecture
- [[summary-Vaswani_2017_attention-is-all-you-need]] — Self-attention replaces recurrence; the architecture behind all modern LLMs
- [[summary-Phuong_2022_formal-algorithms-for-transformers]] — Pseudocode specification of transformer forward pass, tokenisation, and training
- [[summary-Shanahan_2023_role-play-with-large-language-models]] — LLMs role-play characters from training data, not hold beliefs; anthropomorphism misleads safety analysis

## Self-Correction and Refinement
- [[summary-Huang_2023_large-language-models-cannot-self-correct-reasoning-yet]] — Intrinsic self-correction degrades performance; only external feedback helps
- [[summary-Madaan_2023_self-refine-iterative-refinement-with-self-feedback]] — Iterative self-feedback improves generation quality but not reasoning correctness

## Sycophancy
- [[summary-Sharma_2024_towards-understanding-sycophancy-in-language-models]] — RLHF training causes models to agree with users rather than provide independent analysis

## Hallucination and Knowledge Boundaries
- [[summary-Huang_2023_survey-on-hallucination-in-large-language-models]] — Comprehensive taxonomy of hallucination types, causes across data/training/inference
- [[summary-Ji_2023_survey-of-hallucination-in-natural-language-generation]] — Intrinsic vs extrinsic hallucination taxonomy across all NLG tasks
- [[summary-Manakul_2023_selfcheckgpt-zero-resource-hallucination-detection]] — Sample consistency detects hallucination without external databases or model internals
- [[summary-Kandpal_2023_large-language-models-struggle-to-learn-long-tail-knowledge]] — Accuracy tracks training data frequency; rare knowledge is systematically unreliable

## Prompt Sensitivity
- [[summary-Sclar_2024_quantifying-language-models-sensitivity-to-spurious-features-in-prompt-design]] — Format changes (delimiters, casing, spacing) cause up to 76-point accuracy swings
- [[summary-Lu_2022_fantastically-ordered-prompts-and-where-to-find-them]] — Few-shot example ordering swings accuracy from random to SOTA; not transferable across models

## Context Windows
- [[summary-Liu_2024_lost-in-the-middle-how-language-models-use-long-contexts]] — Models favour information at start and end of context; middle content is degraded
- [[summary-Xiao_2024_efficient-streaming-language-models-with-attention-sinks]] — Attention sinks at initial tokens enable stable streaming beyond the training window

## Calibration and Confidence
- [[summary-Kadavath_2022_language-models-mostly-know-what-they-know]] — Larger models show partial self-knowledge; RLHF distorts but doesn't destroy calibration
- [[summary-Tian_2023_just-ask-for-calibration-strategies-for-eliciting-calibrated-confidence-scores]] — Verbalized confidence often better-calibrated than token probabilities in RLHF models
- [[summary-Xiong_2024_can-llms-express-their-uncertainty-empirical-evaluation-of-confidence-elicitation]] — Systematic framework: multi-sample consistency beats single-pass confidence for uncertainty

## Tool Calling
- [[summary-Patil_2023_gorilla-llm-connected-with-massive-apis]] — Fine-tuned model for API calling; demonstrates hallucinated parameter problem

## Multi-Agent Surveys
- [[summary-Guo_2024_large-language-model-based-multi-agents-survey-of-progress-and-challenges]] — Four-dimensional taxonomy (environment, profiling, communication, capability) across 30+ LLM-MA systems

## Multi-Agent Failure and Risk
- [[summary-Cemri_2025_why-do-multi-agent-llm-systems-fail]] — MAST taxonomy: 14 failure modes across specification, inter-agent, and task verification
- [[summary-Hammond_2025_multi-agent-risks-from-advanced-ai]] — Emergent risks from multi-agent interaction: herding, collusion, racing, destabilisation

## Multi-Agent Evaluation
- [[summary-Chan_2024_chateval-better-llm-based-evaluators-through-multi-agent-debate]] — Diverse role prompts are essential; same-prompt debate equals single-agent; optimal count is 3–4 agents

## Epistemic Independence and Multi-Agent Debate
- [[summary-Sreedhar_2024_simulating-human-strategic-behavior-comparing-single-and-multi-agent-llms]] — LLM agents converge to uniform strategies; multi-agent diversity is illusory
- [[summary-Du_2023_improving-factuality-and-reasoning-through-multiagent-debate]] — Multi-agent debate improves factuality but gains plateau; shared biases limit independence
- [[summary-Wu_2025_can-llm-agents-really-debate-controlled-study-of-multi-agent-debate]] — Debate success bounded by strongest reasoner; model diversity beats structural parameters
- [[summary-Wynn_2025_talk-isnt-always-cheap-understanding-failure-modes-in-multi-agent-debate]] — Debate can actively harm accuracy; weak agents contaminate strong ones through social pressure

## Situation Awareness
- [[summary-Gao_2023_agent-teaming-situation-awareness-atsa]] — ATSA framework extends situation awareness theory to human-AI agent teams

## Agent Frameworks and Cognitive Architectures
- [[summary-Sumers_2024_cognitive-architectures-for-language-agents]] — CoALA: modular framework mapping agents along memory, action, and decision dimensions
- [[summary-Wu_2024_autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation]] — Conversational multi-agent framework with customisable agent roles
- [[summary-Hong_2024_metagpt-meta-programming-for-multi-agent-collaborative-framework]] — SOPs and structured artifacts between agents beat free-form chat; assembly-line coordination
- [[summary-Li_2023_camel-communicative-agents-for-mind-exploration-of-large-language-model-society]] — Inception prompting enables autonomous role-playing cooperation; documents four conversational failure modes
- [[summary-Liu_2024_dylan-dynamic-llm-powered-agent-network-for-task-oriented-collaboration]] — Dynamic agent selection outperforms static teams; human role intuitions are unreliable predictors of contribution

## Prompting and Reasoning
- [[summary-Wei_2022_chain-of-thought-prompting-elicits-reasoning-in-large-language-models]] — Intermediate reasoning steps in prompts unlock emergent reasoning at ~100B+ parameters
- [[summary-Yao_2023_react-synergizing-reasoning-and-acting-in-language-models]] — Interleaving thought-action-observation traces grounds reasoning in tool feedback
- [[summary-Shinn_2023_reflexion-language-agents-with-verbal-reinforcement-learning]] — Verbal self-reflection stored as episodic memory enables trial-and-error learning without weight updates
- [[summary-Park_2023_generative-agents-interactive-simulacra-of-human-behavior]] — Memory streams with recency/importance/relevance retrieval produce emergent social behaviour

## Training, Scaling, and Evaluation
- [[summary-Bai_2022_constitutional-ai-harmlessness-from-ai-feedback]] — AI-generated critiques replace human labellers for alignment; scalable but embeds designer values
- [[summary-McKenzie_2023_inverse-scaling-when-bigger-isnt-better]] — Larger models perform worse on some tasks; scale amplifies training biases, not just capabilities
- [[summary-Shumailov_2024_ai-models-collapse-when-trained-on-recursively-generated-data]] — Recursive training on AI-generated data causes progressive tail loss; mathematically inevitable
- [[summary-Perez_2023_discovering-language-model-behaviors-with-model-written-evaluations]] — RLHF amplifies sycophancy and self-preservation; LMs can auto-generate safety evaluations

## Retrieval and Knowledge Grounding
- [[summary-Lewis_2020_retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks]] — Retrieve-then-generate architecture reduces hallucination by grounding in external documents
- [[summary-Barnett_2024_seven-failure-points-in-rag-systems]] — RAG can fail at each stage: chunking, embedding, retrieval, reranking, generation, and more
- [[summary-Edge_2024_from-local-to-global-graph-rag-query-focused-summarization]] — GraphRAG: graph + community summaries enable corpus-wide sensemaking that vector RAG cannot
- [[summary-Agrawal_2024_can-knowledge-graphs-reduce-hallucinations-in-llms]] — Structured KG constraints reduce entity and relation hallucination in grounded generation
