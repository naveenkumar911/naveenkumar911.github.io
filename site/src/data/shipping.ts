// Curated "still shipping" log: things Naveen personally built or shipped recently, with links.
// Keep this to the last ~6 items and update it monthly; GitHub activity is pulled live alongside it.
export interface Shipped {
  date: string; // ISO date
  title: string;
  detail: string;
  href?: string;
  tag: 'code' | 'production' | 'writing' | 'open-source';
}

export const shipping: Shipped[] = [
  {
    date: '2026-09-10',
    title: 'Evaluation release-gate and model-routing demos',
    detail: 'Two interactive React islands: quality-gated routing simulator and an eval dashboard with per-category gates and judge rationale.',
    href: '/demos',
    tag: 'code',
  },
  {
    date: '2026-09-04',
    title: 'Grounded AI assistant with JD-fit mode',
    detail: 'Cloudflare Worker: retrieval over site content, prompt-injection defence, rate limiting, streaming, NVIDIA NIM with model failover.',
    href: '/case-studies/how-this-sites-ai-agent-is-built',
    tag: 'production',
  },
  {
    date: '2026-07-06',
    title: 'Semantic cache and tool-call guardrails on the government agentic platform',
    detail: 'Release v1.7 of the core platform: cache in front of the router, write-action guardrails with approval records. Cost per request down a further 20%.',
    href: '/case-studies/adek-agentic-platform',
    tag: 'production',
  },
  {
    date: '2026-06-15',
    title: 'Arabic golden set tripled; LoRA fine-tune on the policy corpus',
    detail: 'Per-category groundedness for Arabic queries from 0.86 to 0.92 on the expanded set; gate now enforced per language.',
    href: '/case-studies/llm-evaluation-harness',
    tag: 'production',
  },
  {
    date: '2026-05-29',
    title: 'Product similarity search (open repo)',
    detail: 'Embedding-based similarity search over a product catalogue with evaluation notebook.',
    href: 'https://github.com/naveenkumar911/Product_Similarity_Search',
    tag: 'open-source',
  },
  {
    date: '2026-05-15',
    title: 'Hybrid RAG assessment (open repo)',
    detail: 'BM25 plus dense retrieval with re-ranking and a small evaluation harness.',
    href: 'https://github.com/naveenkumar911/AEDO-SCAD-Hybrid-RAG',
    tag: 'open-source',
  },
];
