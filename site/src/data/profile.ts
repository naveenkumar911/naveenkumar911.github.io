export const metrics = [
  { value: '10K+', label: 'daily requests served', story: 'Government agentic AI platform I architected and hands-on built, serving thousands of users with LLM agents, agentic workflows and enterprise RAG.', href: '/case-studies/adek-agentic-platform' },
  { value: '98%', label: 'production uptime', story: 'Distributed microservices AI pipeline on Kubernetes in a data-sovereign environment; latency cut 40% along the way.', href: '/case-studies/adek-agentic-platform' },
  { value: '$2M', label: 'annual savings delivered', story: 'Agentic RAG and real-time LLM inference taken from POC to production at Circle K; support resolution time down 40%.', href: '/case-studies/circle-k-agentic-rag' },
  { value: '30-40%', label: 'accuracy improvement', story: 'Evaluation harness, fine-tuning (LoRA/QLoRA), context engineering and guardrails; hallucinations reduced about 30%.', href: '/case-studies/llm-evaluation-harness' },
  { value: '30%', label: 'infrastructure cost cut', story: 'Model routing, caching and right-sizing across cloud AI workloads without quality regression.', href: '/architecture/model-routing-and-cost-optimization' },
  { value: '12', label: 'person team led', story: 'AI engineers, data scientists, ML and AIOps engineers plus cross-functional squads; hired 8, onboarded 12.', href: '/leadership' },
  { value: '12', label: 'AI programs owned', story: 'Forward-deployed programs from ideation to production, up to 6 running concurrently, as senior escalation point.', href: '/leadership' },
  { value: '16K', label: 'LinkedIn followers', story: 'Daily writing on enterprise AI leadership, agentic operating models, governance and ROI.', href: '/insights' },
];

export interface Role {
  org: string;
  role: string;
  location: string;
  period: string;
  engagements?: string;
  summary: string;
  highlights: string[];
}

export const experience: Role[] = [
  {
    org: 'UAE government AI programs',
    role: 'AI Lead Architect and AI Engineering Leader (Forward Deployed)',
    location: 'Abu Dhabi, UAE',
    engagements: 'Watermelon (Apr - Aug 2025) | ADEK, Abu Dhabi Department of Education and Knowledge (Sep 2025 - Jun 2026) | Abu Dhabi government client via Andersen Labs (Jul 2026 - Present)',
    period: 'Apr 2025 - Present',
    summary: 'Lead a 12-person AI engineering, data science, ML and AIOps team delivering forward-deployed AI programs for UAE government entities. Own architecture guardrails, AI governance and delivery outcomes; still ship code on the core agentic platform.',
    highlights: [
      'Architected and hands-on built the enterprise Agentic AI platform (LLM agents, agentic workflows, RAG) with Claude Code, Google Antigravity and Gemini on Vertex AI: 10K+ daily requests, engagement +40%, operating cost -30%.',
      'Designed the end-to-end production pipeline (ingestion, retrieval, inference, evaluation, monitoring) on FastAPI, PostgreSQL/pgvector, Redis, Docker and Kubernetes in a data-sovereign environment: latency -40%, 98% uptime.',
      'Built the LLM evaluation and observability harness (golden datasets, regression suites, groundedness and hallucination metrics, Langfuse and Grafana tracing); led LoRA/QLoRA fine-tuning and context engineering: accuracy +30-40%, hallucinations -30%.',
      'Established AI governance: responsible AI, model evaluation, prompt governance, security, compliance and enterprise deployment standards; reference architectures, ADRs, design and code review gates.',
      'Own 12 forward-deployed programs (up to 6 in parallel) as senior escalation point; hired 8 and onboarded 12 engineers; run goal setting, feedback cycles and career development.',
      'Drive model and vendor selection and cloud cost optimization (30% infrastructure savings); manage implementation partners across architecture reviews, milestones and handover; define data platform and digital transformation roadmaps with Directors.',
      'Ran AI red teaming (prompt injection, jailbreaks, data exposure, unauthorised tool actions) and shipped guardrails mapped to OWASP Top 10 for LLM Applications and NIST AI RMF; evaluation and safety suites run in CI/CD as release gates.',
      'Lead on-premises sovereign GenAI delivery: open-weight LLM and embedding serving on NVIDIA GPU infrastructure, enterprise RAG, Microsoft Teams and Outlook agents and Prometheus/Grafana observability, with all data kept on-premises.',
    ],
  },
  {
    org: 'Circle K and Huloop.ai',
    role: 'Lead AI Solutions Architect and Forward Deployed Engineer',
    location: 'Remote / US retail',
    period: 'Jul 2022 - Apr 2025',
    summary: 'Embedded with retail business and engineering teams to translate operational problems into scoped, measurable AI use cases and take them to production.',
    highlights: [
      'Delivered $2M/year cost savings through Agentic RAG, real-time LLM inference and AI-driven automation; led cross-functional teams on architecture decisions and deployment strategy; defined data and AI roadmaps.',
      'Architected and deployed production Agentic RAG systems (hybrid retrieval, re-ranking, tool orchestration) with OpenAI, Claude, Llama, LangChain/LangGraph, FAISS and Pinecone: answer relevance +25%, support resolution time -40%.',
      'Built and operated real-time LLM inference services (FastAPI, MLflow) with CI/CD, monitoring and runbooks for production support and handover.',
      'Fine-tuned LLMs (PEFT, LoRA, QLoRA) and right-sized models to improve quality and cut inference cost.',
    ],
  },
  {
    org: 'PIMCO, BMS and NFL (client engagements)',
    role: 'Senior Forward Deployed Engineer',
    location: 'Client-embedded',
    period: 'Jan 2020 - Jul 2022',
    summary: 'Embedded with client teams in asset management, pharmaceuticals and sports media delivering enterprise analytics, forecasting, fraud detection and ML for decisions and operations.',
    highlights: [
      'Built and productionized ML pipelines (Python, SQL/PostgreSQL, MLOps frameworks) covering feature engineering, training, deployment and monitoring.',
      'Defined requirements and acceptance criteria with client stakeholders; transitioned solutions with documentation and knowledge transfer.',
    ],
  },
  {
    org: 'CETPA Infotech',
    role: 'Data Scientist and Forward Deployed Engineer',
    location: 'India',
    period: 'Jan 2017 - Dec 2019',
    summary: 'Client-facing data science: recommendation engines, forecasting models and ETL pipelines deployed alongside client teams.',
    highlights: ['Improved client revenue by $80K/year through recommendation and forecasting models; owned EDA, feature engineering, optimization and deployment.'],
  },
];

export const education = [
  { school: 'Panjab University (UIET), India', degree: 'B.E. Computer Science and Information Technology', note: 'CGPA 7.99' },
];

export const industries = ['Government and public sector', 'Retail and consumer', 'Banking, financial services and asset management', 'Pharmaceuticals and healthcare', 'Sports media', 'Technology'];
