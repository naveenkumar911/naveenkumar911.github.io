import { useMemo, useState } from 'react';

/**
 * LLM evaluation release-gate dashboard over a synthetic golden set.
 * Mirrors the harness described in /case-studies/llm-evaluation-harness: per-release metrics,
 * per-category breakdown, fixed gate thresholds, and the worst regressions with judge rationale.
 * Data is synthetic and modelled on the shape of the real harness; no customer data is used.
 */

type MetricKey = 'groundedness' | 'relevance' | 'hallucination' | 'p95' | 'cost';
interface Metrics { groundedness: number; relevance: number; hallucination: number; p95: number; cost: number }
interface Release { id: string; date: string; change: string; overall: Metrics; categories: Record<string, Metrics> }

const CATS = ['Policy Q&A', 'Case triage', 'Document extraction', 'Arabic queries'];

const METRIC_META: Record<MetricKey, { label: string; unit: string; higherBetter: boolean; gate: number; fmt: (v: number) => string }> = {
  groundedness: { label: 'Groundedness', unit: '', higherBetter: true, gate: 0.9, fmt: (v) => v.toFixed(3) },
  relevance: { label: 'Answer relevance', unit: '', higherBetter: true, gate: 0.85, fmt: (v) => v.toFixed(3) },
  hallucination: { label: 'Hallucination rate', unit: '', higherBetter: false, gate: 0.05, fmt: (v) => `${(v * 100).toFixed(1)}%` },
  p95: { label: 'Latency p95', unit: 's', higherBetter: false, gate: 4.0, fmt: (v) => `${v.toFixed(2)}s` },
  cost: { label: 'Cost / request', unit: '$', higherBetter: false, gate: 0.012, fmt: (v) => `$${v.toFixed(4)}` },
};

// Deterministic synthetic history. Each release nudges the metrics with a story attached.
function mk(g: number, r: number, h: number, p: number, c: number): Metrics { return { groundedness: g, relevance: r, hallucination: h, p95: p, cost: c }; }
const RELEASES: Release[] = [
  { id: 'v1.0', date: '2026-03-02', change: 'Baseline: dense retrieval, single frontier model, no re-ranker.', overall: mk(0.842, 0.801, 0.112, 5.1, 0.0182), categories: { 'Policy Q&A': mk(0.87, 0.83, 0.09, 4.6, 0.017), 'Case triage': mk(0.83, 0.79, 0.11, 5.4, 0.019), 'Document extraction': mk(0.86, 0.82, 0.10, 4.9, 0.018), 'Arabic queries': mk(0.76, 0.72, 0.16, 5.6, 0.019) } },
  { id: 'v1.1', date: '2026-03-16', change: 'Hybrid retrieval (BM25 + dense) and metadata filters.', overall: mk(0.881, 0.846, 0.084, 5.0, 0.0179), categories: { 'Policy Q&A': mk(0.91, 0.88, 0.06, 4.5, 0.017), 'Case triage': mk(0.87, 0.83, 0.09, 5.3, 0.019), 'Document extraction': mk(0.89, 0.86, 0.08, 4.8, 0.018), 'Arabic queries': mk(0.80, 0.76, 0.13, 5.5, 0.018) } },
  { id: 'v1.2', date: '2026-04-01', change: 'Cross-encoder re-ranker; citation-required prompt.', overall: mk(0.912, 0.874, 0.061, 5.3, 0.0188), categories: { 'Policy Q&A': mk(0.94, 0.90, 0.04, 4.8, 0.018), 'Case triage': mk(0.90, 0.86, 0.07, 5.6, 0.020), 'Document extraction': mk(0.92, 0.89, 0.05, 5.1, 0.019), 'Arabic queries': mk(0.84, 0.80, 0.10, 5.8, 0.019) } },
  { id: 'v1.3', date: '2026-04-20', change: 'Model routing: fine-tuned 8B for extraction and classification.', overall: mk(0.908, 0.871, 0.064, 3.9, 0.0121), categories: { 'Policy Q&A': mk(0.94, 0.90, 0.04, 4.2, 0.014), 'Case triage': mk(0.90, 0.86, 0.07, 4.1, 0.012), 'Document extraction': mk(0.90, 0.87, 0.06, 2.9, 0.007), 'Arabic queries': mk(0.84, 0.80, 0.10, 4.6, 0.015) } },
  { id: 'v1.4', date: '2026-05-11', change: 'Prompt compression to cut input tokens 35%.', overall: mk(0.873, 0.842, 0.093, 3.4, 0.0098), categories: { 'Policy Q&A': mk(0.92, 0.88, 0.05, 3.8, 0.012), 'Case triage': mk(0.85, 0.81, 0.11, 3.6, 0.010), 'Document extraction': mk(0.89, 0.86, 0.07, 2.6, 0.006), 'Arabic queries': mk(0.77, 0.74, 0.15, 4.0, 0.012) } },
  { id: 'v1.5', date: '2026-05-25', change: 'Roll back compression for Arabic and triage; keep for extraction.', overall: mk(0.915, 0.879, 0.056, 3.7, 0.0109), categories: { 'Policy Q&A': mk(0.94, 0.90, 0.04, 4.0, 0.013), 'Case triage': mk(0.91, 0.87, 0.06, 4.0, 0.012), 'Document extraction': mk(0.90, 0.87, 0.06, 2.6, 0.006), 'Arabic queries': mk(0.86, 0.82, 0.08, 4.4, 0.014) } },
  { id: 'v1.6', date: '2026-06-15', change: 'Arabic golden set expanded 3x; LoRA fine-tune on Arabic policy corpus.', overall: mk(0.931, 0.896, 0.043, 3.6, 0.0108), categories: { 'Policy Q&A': mk(0.95, 0.91, 0.03, 3.9, 0.013), 'Case triage': mk(0.92, 0.88, 0.05, 3.9, 0.012), 'Document extraction': mk(0.91, 0.88, 0.05, 2.6, 0.006), 'Arabic queries': mk(0.92, 0.88, 0.05, 4.1, 0.013) } },
  { id: 'v1.7', date: '2026-07-06', change: 'Semantic cache and tool-call guardrails; new frontier model version.', overall: mk(0.938, 0.903, 0.038, 3.1, 0.0087), categories: { 'Policy Q&A': mk(0.96, 0.92, 0.03, 3.3, 0.010), 'Case triage': mk(0.93, 0.89, 0.04, 3.4, 0.010), 'Document extraction': mk(0.92, 0.89, 0.04, 2.3, 0.005), 'Arabic queries': mk(0.92, 0.88, 0.05, 3.6, 0.010) } },
];

interface Regression { id: string; category: string; question: string; expected: string; got: string; judge: string; delta: number }
const REGRESSIONS: Record<string, Regression[]> = {
  'v1.4': [
    { id: 'AR-118', category: 'Arabic queries', question: 'ما هي شروط التحويل بين المدارس خلال العام الدراسي؟', expected: 'Transfer permitted within stated windows with approval; cites policy section 4.2.', got: 'General statement about transfers; no window or approval requirement; no citation.', judge: 'Compressed context dropped the section containing the transfer windows. Groundedness 0.41.', delta: -0.49 },
    { id: 'TR-073', category: 'Case triage', question: 'Parent complaint about fee increase mid-year, requests escalation.', expected: 'Route: Fees and compliance; priority High; cite fee-change notice rule.', got: 'Route: General enquiries; priority Medium.', judge: 'Routing rationale absent; misses regulatory trigger. Relevance 0.52.', delta: -0.38 },
    { id: 'PQ-204', category: 'Policy Q&A', question: 'Maximum class size for Grade 1 in private schools?', expected: 'States the cap and the exception process with citation.', got: 'States the cap; omits exception process.', judge: 'Partially correct; missing exception. Relevance 0.71.', delta: -0.19 },
  ],
  'v1.7': [
    { id: 'TR-091', category: 'Case triage', question: 'Duplicate report of the same incident from two staff members.', expected: 'Merge into existing case; no new case created.', got: 'Created a second case before guardrail blocked.', judge: 'Guardrail caught the write; output should have proposed a merge. Relevance 0.66.', delta: -0.22 },
  ],
};

export default function EvalDashboard() {
  const [selected, setSelected] = useState(RELEASES[RELEASES.length - 1].id);
  const [baselineId, setBaselineId] = useState(RELEASES[RELEASES.length - 2].id);
  const [metric, setMetric] = useState<MetricKey>('groundedness');

  const release = RELEASES.find((r) => r.id === selected)!;
  const baseline = RELEASES.find((r) => r.id === baselineId)!;

  const gates = useMemo(() => (Object.keys(METRIC_META) as MetricKey[]).map((k) => {
    const m = METRIC_META[k];
    const v = release.overall[k];
    const b = baseline.overall[k];
    const passAbs = m.higherBetter ? v >= m.gate : v <= m.gate;
    const regress = m.higherBetter ? v < b - 0.01 : v > b * 1.05;
    return { k, ...m, v, b, passAbs, regress, pass: passAbs && !regress };
  }), [release, baseline]);

  const allPass = gates.every((g) => g.pass);
  const regressions = REGRESSIONS[release.id] ?? [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <Select label="Candidate release" value={selected} onChange={setSelected} options={RELEASES.map((r) => [r.id, `${r.id} · ${r.date}`])} />
        <Select label="Compare against" value={baselineId} onChange={setBaselineId} options={RELEASES.map((r) => [r.id, `${r.id} · ${r.date}`])} />
        <div className={`rounded-2xl border px-5 py-3 text-center font-extrabold ${allPass ? 'border-accent-500/60 bg-accent-500/15 text-accent-600 dark:text-accent-400' : 'border-red-500/50 bg-red-500/10 text-red-500'}`}>
          {allPass ? 'GATE: PASS · ship' : 'GATE: BLOCKED'}
        </div>
      </div>
      <p className="text-base text-[var(--fg-muted)]"><strong className="text-[var(--fg)]">{release.id}</strong>: {release.change}</p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {gates.map((g) => (
          <button key={g.k} onClick={() => setMetric(g.k)} className={`card p-5 text-left transition-colors ${metric === g.k ? 'border-accent-500' : ''}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--fg-muted)]">{g.label}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${g.pass ? 'bg-accent-500' : 'bg-red-500'}`} title={g.pass ? 'Pass' : g.passAbs ? 'Regression vs baseline' : 'Below absolute gate'} />
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">{g.fmt(g.v)}</div>
            <div className="mt-1 text-sm text-[var(--fg-muted)]">
              gate {g.higherBetter ? '≥' : '≤'} {g.fmt(g.gate)} · baseline {g.fmt(g.b)}
            </div>
            {!g.passAbs && <div className="mt-1 text-xs font-semibold text-red-500">Below absolute gate</div>}
            {g.passAbs && g.regress && <div className="mt-1 text-xs font-semibold text-red-500">Regression vs {baseline.id}</div>}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="card p-6 md:p-7">
          <h3 className="h-card">{METRIC_META[metric].label} across releases</h3>
          <Chart metric={metric} selected={selected} baseline={baselineId} />
          <p className="mt-3 text-sm text-[var(--fg-muted)]">Dashed line is the gate. Notice v1.4: a 35% token-cost win that quietly broke Arabic and triage. The gate caught it; v1.5 kept the win only where it held.</p>
        </div>
        <div className="card p-6 md:p-7">
          <h3 className="h-card">By category, {release.id}</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                <tr><th className="py-2 pr-3">Category</th><th className="py-2 pr-3">Ground.</th><th className="py-2 pr-3">Relev.</th><th className="py-2 pr-3">Halluc.</th><th className="py-2">p95</th></tr>
              </thead>
              <tbody>
                {CATS.map((c) => {
                  const m = release.categories[c];
                  const bad = m.groundedness < METRIC_META.groundedness.gate || m.hallucination > METRIC_META.hallucination.gate;
                  return (
                    <tr key={c} className="border-t border-[var(--line)]">
                      <td className="py-2.5 pr-3 font-semibold">{c}</td>
                      <td className={`py-2.5 pr-3 ${m.groundedness < 0.9 ? 'text-red-500 font-semibold' : ''}`}>{m.groundedness.toFixed(2)}</td>
                      <td className="py-2.5 pr-3">{m.relevance.toFixed(2)}</td>
                      <td className={`py-2.5 pr-3 ${m.hallucination > 0.05 ? 'text-red-500 font-semibold' : ''}`}>{(m.hallucination * 100).toFixed(0)}%</td>
                      <td className="py-2.5">{m.p95.toFixed(1)}s{bad ? ' ⚠' : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-[var(--fg-muted)]">Per-category gates exist because an overall average hides a broken minority language. This is why the Arabic set was tripled in v1.6.</p>
        </div>
      </div>

      <div className="card p-6 md:p-7">
        <h3 className="h-card">Worst regressions in {release.id} with judge rationale</h3>
        {regressions.length === 0 ? (
          <p className="mt-3 text-base text-[var(--fg-muted)]">No item in the golden set regressed by more than 0.15 in this release.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {regressions.map((r) => (
              <details key={r.id} className="rounded-xl border border-[var(--line)] p-4">
                <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
                  <span className="font-semibold"><span className="chip !py-0 mr-2">{r.id}</span>{r.category}</span>
                  <span className="text-sm font-bold text-red-500">Δ {r.delta.toFixed(2)}</span>
                </summary>
                <div className="mt-3 grid gap-3 text-sm md:grid-cols-3">
                  <div><div className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">Question</div><div className="mt-1" dir="auto">{r.question}</div></div>
                  <div><div className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">Expected</div><div className="mt-1">{r.expected}</div></div>
                  <div><div className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">Got</div><div className="mt-1">{r.got}</div></div>
                </div>
                <div className="mt-3 rounded-lg bg-[var(--bg)] p-3 text-sm"><strong>Judge:</strong> {r.judge}</div>
              </details>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-[var(--fg-muted)]">Synthetic golden set modelled on the production harness (Langfuse traces, LLM-as-judge with human calibration, per-category gates). Method in <a className="underline" href="/case-studies/llm-evaluation-harness">the evaluation case study</a> and <a className="underline" href="/architecture/evaluation-methodology">the eval architecture note</a>.</p>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elev)] px-3 py-2.5 outline-none focus:border-accent-500">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

function Chart({ metric, selected, baseline }: { metric: MetricKey; selected: string; baseline: string }) {
  const W = 640, H = 220, pl = 48, pr = 16, pt = 14, pb = 30;
  const meta = METRIC_META[metric];
  const vals = RELEASES.map((r) => r.overall[metric]);
  const lo = Math.min(...vals, meta.gate) * 0.97;
  const hi = Math.max(...vals, meta.gate) * 1.03;
  const x = (i: number) => pl + (i * (W - pl - pr)) / (RELEASES.length - 1);
  const y = (v: number) => pt + (H - pt - pb) * (1 - (v - lo) / (hi - lo));
  const path = vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label={`${meta.label} by release`}>
      <line x1={pl} x2={W - pr} y1={y(meta.gate)} y2={y(meta.gate)} stroke="var(--color-gold-500)" strokeDasharray="6 5" strokeWidth={1.5} />
      <text x={W - pr} y={y(meta.gate) - 6} textAnchor="end" fontSize={11} fill="var(--color-gold-500)">gate {meta.fmt(meta.gate)}</text>
      {[lo, (lo + hi) / 2, hi].map((v, i) => (
        <g key={i}>
          <line x1={pl} x2={W - pr} y1={y(v)} y2={y(v)} stroke="var(--line)" strokeWidth={1} />
          <text x={pl - 8} y={y(v) + 4} textAnchor="end" fontSize={11} fill="var(--fg-muted)">{meta.fmt(v)}</text>
        </g>
      ))}
      <path d={path} fill="none" stroke="var(--color-accent-500)" strokeWidth={2.5} strokeLinejoin="round" />
      {RELEASES.map((r, i) => {
        const v = r.overall[metric];
        const pass = meta.higherBetter ? v >= meta.gate : v <= meta.gate;
        const isSel = r.id === selected, isBase = r.id === baseline;
        return (
          <g key={r.id}>
            <circle cx={x(i)} cy={y(v)} r={isSel ? 7 : 4.5} fill={pass ? 'var(--color-accent-500)' : '#ef4444'} stroke={isSel || isBase ? 'var(--fg)' : 'none'} strokeWidth={isSel ? 2.5 : 1.5} />
            <text x={x(i)} y={H - 10} textAnchor="middle" fontSize={11} fontWeight={isSel ? 700 : 400} fill={isSel ? 'var(--fg)' : 'var(--fg-muted)'}>{r.id}</text>
          </g>
        );
      })}
    </svg>
  );
}
