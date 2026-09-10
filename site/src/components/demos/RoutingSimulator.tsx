import { useMemo, useState, type ReactNode } from 'react';

/**
 * Model-routing cost and latency simulator.
 * Client-side only. Prices are illustrative list prices (per 1M tokens) and can be edited in the
 * table; the point of the demo is the routing logic and the quality-gated trade-off, not the
 * exact numbers of any vendor on any given week.
 */

type Tier = 'frontier' | 'mid' | 'small';
type Cls = 'simple' | 'moderate' | 'complex';

interface Model {
  id: Tier;
  name: string;
  inPrice: number; // $ per 1M input tokens
  outPrice: number; // $ per 1M output tokens
  latency: number; // p50 seconds for a typical request
  quality: Record<Cls, number>; // expected judge score 0-1 on each request class
}

const DEFAULT_MODELS: Model[] = [
  { id: 'frontier', name: 'Frontier reasoning model', inPrice: 3.0, outPrice: 15.0, latency: 2.8, quality: { simple: 0.96, moderate: 0.94, complex: 0.91 } },
  { id: 'mid', name: 'Frontier "mini" tier', inPrice: 0.4, outPrice: 1.6, latency: 1.2, quality: { simple: 0.94, moderate: 0.89, complex: 0.74 } },
  { id: 'small', name: 'Fine-tuned open-weight 8B (self-hosted)', inPrice: 0.08, outPrice: 0.24, latency: 0.5, quality: { simple: 0.92, moderate: 0.78, complex: 0.52 } },
];

const CLASS_LABEL: Record<Cls, string> = {
  simple: 'Simple: classification, extraction, FAQ lookups',
  moderate: 'Moderate: grounded Q&A, summarisation, single-tool calls',
  complex: 'Complex: multi-step reasoning, planning, long-context synthesis',
};

const ORDER: Tier[] = ['small', 'mid', 'frontier'];

function fmtUsd(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export default function RoutingSimulator() {
  const [models, setModels] = useState<Model[]>(DEFAULT_MODELS);
  const [requests, setRequests] = useState(3_000_000); // per month
  const [inTok, setInTok] = useState(1800);
  const [outTok, setOutTok] = useState(350);
  const [mix, setMix] = useState<Record<Cls, number>>({ simple: 55, moderate: 33, complex: 12 });
  const [floor, setFloor] = useState(0.88);
  const [cacheHit, setCacheHit] = useState(22);

  const setMixClamped = (k: Cls, v: number) => {
    const others = (Object.keys(mix) as Cls[]).filter((c) => c !== k);
    const rest = 100 - v;
    const oSum = others.reduce((s, c) => s + mix[c], 0) || 1;
    const next = { ...mix, [k]: v } as Record<Cls, number>;
    others.forEach((c, i) => {
      next[c] = i === others.length - 1 ? rest - others.slice(0, -1).reduce((s, cc) => s + next[cc], 0) : Math.round((mix[c] / oSum) * rest);
    });
    setMix(next);
  };

  const byId = useMemo(() => Object.fromEntries(models.map((m) => [m.id, m])) as Record<Tier, Model>, [models]);

  const costPerReq = (m: Model) => (inTok * m.inPrice + outTok * m.outPrice) / 1_000_000;

  // Route each class to the cheapest tier that meets the quality floor; otherwise escalate.
  const routing = useMemo(() => {
    const out: Record<Cls, Tier> = { simple: 'frontier', moderate: 'frontier', complex: 'frontier' };
    (Object.keys(mix) as Cls[]).forEach((cls) => {
      const pick = ORDER.find((t) => byId[t].quality[cls] >= floor) ?? 'frontier';
      out[cls] = pick;
    });
    return out;
  }, [byId, floor, mix]);

  const scenarios = useMemo(() => {
    const classes = Object.keys(mix) as Cls[];
    const share = (c: Cls) => mix[c] / 100;

    const allFrontier = {
      name: 'Everything on the frontier model',
      cost: requests * costPerReq(byId.frontier),
      latency: byId.frontier.latency,
      quality: classes.reduce((s, c) => s + share(c) * byId.frontier.quality[c], 0),
    };

    const routedCost = classes.reduce((s, c) => s + requests * share(c) * costPerReq(byId[routing[c]]), 0);
    const routedLat = classes.reduce((s, c) => s + share(c) * byId[routing[c]].latency, 0);
    const routedQ = classes.reduce((s, c) => s + share(c) * byId[routing[c]].quality[c], 0);
    const routed = { name: 'Quality-gated routing', cost: routedCost, latency: routedLat, quality: routedQ };

    const h = cacheHit / 100;
    const cached = {
      name: 'Routing + semantic cache',
      cost: routedCost * (1 - h) + requests * h * 0.00002,
      latency: routedLat * (1 - h) + 0.12 * h,
      quality: routedQ, // cache returns previously approved answers
    };
    return [allFrontier, routed, cached];
  }, [byId, mix, requests, inTok, outTok, routing, cacheHit]);

  const max = Math.max(...scenarios.map((s) => s.cost));
  const base = scenarios[0].cost;

  const updateModel = (id: Tier, field: 'inPrice' | 'outPrice' | 'latency', v: number) =>
    setModels((ms) => ms.map((m) => (m.id === id ? { ...m, [field]: v } : m)));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <div className="card p-6 md:p-7">
        <h3 className="h-card">Workload</h3>
        <div className="mt-5 space-y-5">
          <Field label={`Requests per month: ${requests.toLocaleString()}`}>
            <input type="range" min={100_000} max={30_000_000} step={100_000} value={requests} onChange={(e) => setRequests(+e.target.value)} className="w-full accent-[var(--color-accent-500)]" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Avg input tokens: ${inTok.toLocaleString()}`}>
              <input type="range" min={200} max={12000} step={100} value={inTok} onChange={(e) => setInTok(+e.target.value)} className="w-full accent-[var(--color-accent-500)]" />
            </Field>
            <Field label={`Avg output tokens: ${outTok.toLocaleString()}`}>
              <input type="range" min={50} max={2000} step={25} value={outTok} onChange={(e) => setOutTok(+e.target.value)} className="w-full accent-[var(--color-accent-500)]" />
            </Field>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--fg-muted)]">Traffic mix by request class</div>
            <div className="mt-3 space-y-3">
              {(Object.keys(mix) as Cls[]).map((c) => (
                <Field key={c} label={`${CLASS_LABEL[c]} — ${mix[c]}%`}>
                  <input type="range" min={0} max={100} value={mix[c]} onChange={(e) => setMixClamped(c, +e.target.value)} className="w-full accent-[var(--color-accent-500)]" />
                </Field>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Quality floor (judge score): ${floor.toFixed(2)}`}>
              <input type="range" min={0.7} max={0.97} step={0.01} value={floor} onChange={(e) => setFloor(+e.target.value)} className="w-full accent-[var(--color-accent-500)]" />
            </Field>
            <Field label={`Semantic cache hit rate: ${cacheHit}%`}>
              <input type="range" min={0} max={60} value={cacheHit} onChange={(e) => setCacheHit(+e.target.value)} className="w-full accent-[var(--color-accent-500)]" />
            </Field>
          </div>
        </div>

        <h3 className="h-card mt-8">Model tiers (editable)</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-[var(--fg-muted)]">
              <tr><th className="py-2 pr-3">Tier</th><th className="py-2 pr-3">$/1M in</th><th className="py-2 pr-3">$/1M out</th><th className="py-2 pr-3">p50 s</th><th className="py-2">Quality S / M / C</th></tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id} className="border-t border-[var(--line)]">
                  <td className="py-2 pr-3 font-semibold">{m.name}</td>
                  <td className="py-2 pr-3"><Num v={m.inPrice} onChange={(v) => updateModel(m.id, 'inPrice', v)} /></td>
                  <td className="py-2 pr-3"><Num v={m.outPrice} onChange={(v) => updateModel(m.id, 'outPrice', v)} /></td>
                  <td className="py-2 pr-3"><Num v={m.latency} onChange={(v) => updateModel(m.id, 'latency', v)} step={0.1} /></td>
                  <td className="py-2 text-[var(--fg-muted)]">{m.quality.simple.toFixed(2)} / {m.quality.moderate.toFixed(2)} / {m.quality.complex.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card p-6 md:p-7">
          <h3 className="h-card">Monthly cost by strategy</h3>
          <div className="mt-5 space-y-5">
            {scenarios.map((s, i) => {
              const saving = i === 0 ? 0 : (1 - s.cost / base) * 100;
              return (
                <div key={s.name}>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-2xl font-extrabold tracking-tight text-accent-600 dark:text-accent-400">{fmtUsd(s.cost)}<span className="text-sm font-medium text-[var(--fg-muted)]"> /mo</span></div>
                  </div>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[var(--bg)]">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-400 transition-all" style={{ width: `${Math.max(2, (s.cost / max) * 100)}%` }} />
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--fg-muted)]">
                    <span>Blended p50 <strong className="text-[var(--fg)]">{s.latency.toFixed(2)}s</strong></span>
                    <span>Expected quality <strong className="text-[var(--fg)]">{s.quality.toFixed(3)}</strong></span>
                    {i > 0 && <span>Saving vs frontier <strong className="text-accent-600 dark:text-accent-400">{saving.toFixed(0)}%</strong> ({fmtUsd(base - s.cost)}/mo, {fmtUsd((base - s.cost) * 12)}/yr)</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-6 md:p-7">
          <h3 className="h-card">Routing table the gate produced</h3>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">Each class goes to the cheapest tier whose judge score on that class clears the floor. Raise the floor and watch traffic escalate; that is the cost of quality made explicit.</p>
          <div className="mt-4 space-y-2">
            {(Object.keys(routing) as Cls[]).map((c) => (
              <div key={c} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--line)] px-4 py-3 text-sm">
                <span className="font-medium">{CLASS_LABEL[c].split(':')[0]} <span className="text-[var(--fg-muted)]">({mix[c]}%)</span></span>
                <span className="chip !py-0.5">{byId[routing[c]].name} · q {byId[routing[c]].quality[c].toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--fg-muted)]">Illustrative list prices and judge scores; edit the table to match your vendor sheet. The production version of this logic runs in the model router described in <a className="underline" href="/architecture/model-routing-and-cost-optimization">the routing ADR</a>, with per-request metering feeding the cost line.</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Num({ v, onChange, step = 0.01 }: { v: number; onChange: (v: number) => void; step?: number }) {
  return <input type="number" min={0} step={step} value={v} onChange={(e) => onChange(Math.max(0, +e.target.value || 0))} className="w-20 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-2 py-1 text-sm outline-none focus:border-accent-500" />;
}
