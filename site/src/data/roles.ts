export interface RoleTrack {
  id: string;
  label: string;
  audience: string;
  titles: string[];
  headline: string;
  pitch: string;
  proof: string[];
  caseStudies: string[]; // slugs
  skills: string[];
  cta: string;
  reading: string[]; // insight slugs
}

export const roles: RoleTrack[] = [
  {
    id: 'fde',
    label: 'Forward Deployed Engineering Lead',
    audience: 'Frontier labs and applied-AI scale-ups',
    titles: [
      'Forward Deployed Engineering Manager',
      'Technical Deployment Lead',
      'Applied AI Engineering Lead',
      'Principal Forward Deployed Engineer',
      'Head of Customer Engineering, AI',
    ],
    headline: 'I embed with the customer, ship production agents in weeks, and hand back a runbook, not a demo.',
    pitch:
      'Ten years of customer-embedded delivery across government, retail, asset management, pharma and sports media. I run discovery, scope against success criteria, build the first version myself, then scale a team to production cutover and run. My engagements end with measurable outcomes on the customer P&L, and the field learnings flow back into product.',
    proof: [
      '$600K/yr savings at Circle K from agentic RAG taken POC to production',
      '10K+ requests/day at 98% uptime on a government agentic platform I architected and coded',
      '12 forward-deployed programs owned, up to 6 running concurrently',
      'Discovery-to-production playbook with six gates, used across three organisations',
    ],
    caseStudies: ['circle-k-agentic-rag', 'adek-agentic-platform', 'llm-evaluation-harness'],
    skills: ['Agentic systems', 'Enterprise RAG', 'Evaluation and observability', 'Customer discovery and scoping', 'Production cutover and runbooks', 'Claude Code and agentic development'],
    cta: 'Discuss a forward-deployed role',
    reading: ['what-forward-deployed-means-at-leadership-level', 'why-agent-pilots-die-six-gates', 'evals-before-agents'],
  },
  {
    id: 'head-of-ai',
    label: 'Head of AI / CAIO-track',
    audience: 'Enterprises, Fortune 500, PE-backed operators',
    titles: ['Head of AI', 'Head of AI Agents', 'VP Artificial Intelligence', 'Chief AI Officer', 'Director of Enterprise AI'],
    headline: 'I turn AI activity into AI operating capability: named owners, measurable value, explicit governance.',
    pitch:
      'Most enterprises have pilots; few have a repeatable way to decide where AI acts, where humans decide, how value is measured and what happens when the system is wrong. I have built that operating model inside a government entity and a Fortune 500 retailer, with the architecture, governance, team and vendor management to run it. I write publicly about this to 16K followers.',
    proof: [
      'Built and led a 10-person AI, data science and AIOps team; hired 8, onboarded 12',
      'Established AI governance: responsible AI, model evaluation, prompt governance, security, deployment standards',
      '30% infrastructure cost reduction from model routing, caching and right-sizing',
      'Defined data platform, data architecture and digital transformation roadmaps with Directors and business leaders',
    ],
    caseStudies: ['adek-agentic-platform', 'circle-k-agentic-rag', 'enterprise-ai-copilot-platform'],
    skills: ['AI strategy and operating model', 'AI governance (NIST AI RMF, EU AI Act, ISO/IEC 42001)', 'Team building and leveling', 'Executive stakeholder management', 'Vendor and model selection', 'Value measurement and ROI'],
    cta: 'Discuss an AI leadership role',
    reading: ['decision-rights-before-models', 'measuring-ai-roi-backwards', 'eu-ai-act-iso-42001-operating-checklist'],
  },
  {
    id: 'platform',
    label: 'Principal / Staff AI Platform Architect',
    audience: 'AI-native companies and platform teams',
    titles: ['Principal AI Architect', 'Staff Engineer, Agent Platform', 'Principal Engineer, Evals and Observability', 'AI Platform Lead', 'Distinguished Engineer, Applied AI'],
    headline: 'I design the platform other engineers build agents on: orchestration, retrieval, evals, observability, cost.',
    pitch:
      'The hard part of agentic AI is not the model, it is the system around it. I have designed and shipped the reference architecture, evaluation harness, observability stack and cost controls for enterprise agent platforms on Kubernetes, with pgvector, Redis, FastAPI, Langfuse and Grafana, across Azure, GCP and on-prem. I write ADRs, set review gates and make simplicity a first-class requirement.',
    proof: [
      'Latency -40% and 98% uptime on a distributed microservices AI pipeline in a data-sovereign environment',
      'Evaluation harness with golden sets, regression suites and hallucination metrics: accuracy +30-40%, hallucinations -30%',
      'Reference architectures, ADRs, design and code review gates adopted by multiple squads',
      'Real-time LLM inference services with CI/CD, monitoring and runbooks',
    ],
    caseStudies: ['llm-evaluation-harness', 'adek-agentic-platform', 'how-this-sites-ai-agent-is-built'],
    skills: ['Agent orchestration (LangGraph, Agent SDKs, MCP, A2A)', 'Hybrid retrieval and re-ranking', 'LLM evals and observability', 'Inference optimization and model routing', 'Kubernetes and microservices', 'Architecture decision records'],
    cta: 'Discuss a platform architecture role',
    reading: ['agent-sre-reliability-for-non-deterministic-systems', 'inference-economics-cutting-30-percent', 'mcp-a2a-enterprise-security-boundaries'],
  },
  {
    id: 'sovereign',
    label: 'Sovereign and Government AI Leader',
    audience: 'UAE and GCC government entities, sovereign AI companies, regulated industries',
    titles: ['Head of AI', 'AI Lead Architect, Government', 'Director, Sovereign AI Platforms', 'Chief AI Architect', 'VP AI Engineering'],
    headline: 'I ship agentic AI inside data-sovereign, regulated environments, and I have done it for a UAE government entity.',
    pitch:
      'Data residency, air-gapped options, Arabic and multilingual retrieval, procurement and vendor governance, and public-sector stakeholder management are not constraints I work around; they are the environment I have delivered in. I currently lead AI engineering for a UAE government education entity and have built the governance and architecture standards it runs on.',
    proof: [
      'Government-scale agentic platform: thousands of users, 10K+ daily requests, 98% uptime, engagement +40%, operating cost -30%',
      'End-to-end production pipeline in a data-sovereign environment on GCP Vertex AI and Kubernetes',
      'Local and private LLM agents (Ollama, Llama) for offline, air-gapped document intelligence',
      'Vendor and implementation-partner management across architecture reviews, milestones and operational handover',
    ],
    caseStudies: ['adek-agentic-platform', 'private-llm-agent-air-gapped', 'llm-evaluation-harness'],
    skills: ['Data sovereignty and residency', 'Sovereign cloud and on-prem LLM deployment', 'Arabic and multilingual RAG', 'Public-sector stakeholder and vendor management', 'AI governance and compliance', 'Digital transformation roadmaps'],
    cta: 'Discuss a UAE or GCC leadership role',
    reading: ['data-sovereignty-llm-systems-gulf', 'multilingual-arabic-rag-evaluation', 'operationalize-or-be-replaced'],
  },
  {
    id: 'fractional',
    label: 'Fractional CAIO / AI Advisory',
    audience: 'Boards, founders, PE portfolio companies, CTOs without an AI leader',
    titles: ['Fractional Chief AI Officer', 'AI Advisor to the CEO', 'Interim Head of AI', 'Technical Due Diligence, AI', 'Agentic AI Architecture Review'],
    headline: 'Senior AI judgment on a fractional basis: strategy, architecture review, governance, and getting one agent to production.',
    pitch:
      'For organisations that are not ready for a full-time CAIO but cannot afford another year of pilots. Typical engagements: a 6-week AI operating-model design, an architecture and vendor review of an agent programme, an evaluation and governance setup, or hands-on leadership taking one high-value agent from pilot to production against a named metric.',
    proof: [
      'Six-gate pilot-to-production playbook with templates for success criteria, evals, governance and runbooks',
      'Cost and vendor selection frameworks that cut infrastructure 30% without quality loss',
      'Governance mapped to NIST AI RMF, EU AI Act and ISO/IEC 42001',
      'Hands-on: still ships code, so reviews are grounded in real systems rather than slideware',
    ],
    caseStudies: ['circle-k-agentic-rag', 'n8n-multi-agent-automation', 'how-this-sites-ai-agent-is-built'],
    skills: ['AI operating-model design', 'Architecture and vendor review', 'Evaluation and governance setup', 'Pilot-to-production leadership', 'Board and executive communication', 'Build vs buy vs partner decisions'],
    cta: 'Discuss an advisory engagement',
    reading: ['building-the-wrong-thing-perfectly', 'why-agent-pilots-die-six-gates', 'open-weight-vs-frontier-decision-framework'],
  },
];
