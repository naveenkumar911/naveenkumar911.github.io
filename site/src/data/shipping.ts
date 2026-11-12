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
