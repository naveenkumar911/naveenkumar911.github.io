export interface SkillGroup {
  id: string;
  title: string;
  demand: string; // why it matters in 2026 hiring
  items: { name: string; depth: 'expert' | 'advanced' | 'working'; verify?: boolean }[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'agentic',
    title: 'Agentic systems and orchestration',
    demand: 'Fastest-rising skill across every engineering function in Q3 2026; screened as "have you shipped an agent that holds up in production".',
    items: [
      { name: 'Multi-agent systems and agent orchestration', depth: 'expert' },
      { name: 'LangGraph, LangChain, LlamaIndex', depth: 'expert' },
      { name: 'Claude Agent SDK, OpenAI Agents SDK, Google ADK', depth: 'advanced' },
      { name: 'AutoGen, CrewAI, Semantic Kernel, Microsoft Agent Framework', depth: 'advanced' },
      { name: 'Tool and function calling, MCP servers, A2A', depth: 'expert' },
      { name: 'Context engineering and AI memory', depth: 'expert' },
      { name: 'Human-in-the-loop, approvals, rollback and blast-radius design', depth: 'advanced', verify: true },
      { name: 'n8n, Make, Zapier workflow automation', depth: 'advanced' },
    ],
  },
  {
    id: 'rag',
    title: 'Retrieval and knowledge systems',
    demand: 'Table stakes to claim, rare to do well; differentiator is measured retrieval quality and hallucination control.',
    items: [
      { name: 'Enterprise RAG and Agentic RAG', depth: 'expert' },
      { name: 'Hybrid retrieval, re-ranking, query rewriting', depth: 'expert' },
      { name: 'pgvector, FAISS, Pinecone, Weaviate, ChromaDB, Qdrant', depth: 'expert' },
      { name: 'Document intelligence, OCR, chunking strategies', depth: 'advanced' },
      { name: 'Text-to-SQL and structured retrieval', depth: 'advanced' },
      { name: 'Multilingual and Arabic retrieval considerations', depth: 'working', verify: true },
    ],
  },
  {
    id: 'evals',
    title: 'Evaluation, observability and reliability',
    demand: 'Eval and observability infrastructure is among the highest-paid platform specialisations in 2026 (+19% YoY).',
    items: [
      { name: 'Golden datasets, regression suites, LLM-as-judge with calibration', depth: 'expert' },
      { name: 'Groundedness, faithfulness and hallucination metrics', depth: 'expert' },
      { name: 'Langfuse, Grafana, tracing and prompt analytics', depth: 'expert' },
      { name: 'Guardrails, prompt-injection defense, red-teaming', depth: 'advanced' },
      { name: 'Agent SRE: SLOs, circuit breakers, incident response', depth: 'advanced', verify: true },
      { name: 'MLflow experiment tracking and model registry', depth: 'advanced' },
    ],
  },
  {
    id: 'models',
    title: 'Models, fine-tuning and inference',
    demand: 'Inference cost engineering is the fastest-rising specialisation (+26% YoY); routing and right-sizing are executive-visible savings.',
    items: [
      { name: 'OpenAI GPT, Anthropic Claude, Google Gemini, Llama, Hugging Face', depth: 'expert' },
      { name: 'Fine-tuning: PEFT, LoRA, QLoRA', depth: 'expert' },
      { name: 'Model routing, caching, right-sizing, cost per token', depth: 'expert' },
      { name: 'vLLM, Ollama, llama.cpp, TensorRT serving', depth: 'advanced' },
      { name: 'PyTorch, TensorFlow, scikit-learn', depth: 'advanced' },
      { name: 'NLP, computer vision, ASR/TTS integration', depth: 'working' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform, cloud and MLOps/LLMOps',
    demand: 'Senior roles expect ownership of the whole lifecycle in production, not notebooks.',
    items: [
      { name: 'Azure OpenAI, AI Foundry, AI Search, Container Apps', depth: 'expert' },
      { name: 'GCP Vertex AI, Agent Builder', depth: 'expert' },
      { name: 'AWS SageMaker, Bedrock', depth: 'advanced' },
      { name: 'Kubernetes, Docker, CI/CD, microservices', depth: 'expert' },
      { name: 'FastAPI, PostgreSQL, Redis, Kafka, PySpark, Databricks', depth: 'expert' },
      { name: 'Python, TypeScript, Node.js, SQL', depth: 'expert' },
      { name: 'AI-assisted development at scale: Claude Code, Cursor, Google Antigravity', depth: 'expert' },
    ],
  },
  {
    id: 'governance',
    title: 'Governance, security and sovereignty',
    demand: 'EU AI Act high-risk obligations in force since Aug 2026; UAE sovereign programs require residency and vendor governance.',
    items: [
      { name: 'Responsible AI, NIST AI RMF, EU AI Act, ISO/IEC 42001', depth: 'advanced' },
      { name: 'Data sovereignty, residency and air-gapped deployment', depth: 'expert' },
      { name: 'AI security: prompt injection, tool permissions, data exfiltration controls', depth: 'advanced' },
      { name: 'Prompt governance, model evaluation standards, deployment standards', depth: 'expert' },
      { name: 'Data governance, metadata and master data management', depth: 'advanced' },
      { name: 'SAP S/4HANA, Zoho CRM, WhatsApp Business API, event-driven integration', depth: 'advanced' },
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership and forward-deployed delivery',
    demand: 'Head of AI searches look for the named owner who took agents from pilot to production against a metric.',
    items: [
      { name: 'Team building: hiring, onboarding, leveling, feedback, career development', depth: 'expert' },
      { name: 'Discovery workshops, technical scoping, success criteria and KPIs', depth: 'expert' },
      { name: 'POC-to-production, cutover, runbooks, SLA/SLO ownership', depth: 'expert' },
      { name: 'Executive and board stakeholder management', depth: 'advanced' },
      { name: 'Vendor management, procurement and negotiation', depth: 'advanced', verify: true },
      { name: 'AI strategy, operating-model design, digital transformation roadmaps', depth: 'advanced' },
      { name: 'Agile delivery, design thinking, ADRs', depth: 'expert' },
    ],
  },
];
