import { useEffect, useMemo, useState } from 'react';
import type { RoleTrack } from '@/data/roles';

interface CardMeta { slug: string; title: string; summary: string; outcomes: { value: string; label: string }[] }
interface InsightMeta { slug: string; title: string; description: string }

interface Props {
  roles: RoleTrack[];
  caseStudies: Record<string, CardMeta>;
  insights: Record<string, InsightMeta>;
  calcom: string;
}

export default function RoleSwitcher({ roles, caseStudies, insights, calcom }: Props) {
  const [active, setActive] = useState(roles[0].id);

  // Support deep links like /#hire-me-as?track=platform or hash "#track=platform"
  useEffect(() => {
    const m = window.location.hash.match(/track=([a-z-]+)/);
    if (m && roles.some((r) => r.id === m[1])) setActive(m[1]);
  }, [roles]);

  const role = useMemo(() => roles.find((r) => r.id === active) ?? roles[0], [active, roles]);

  return (
    <div className="card overflow-hidden">
      <div role="tablist" aria-label="Target role tracks" className="flex gap-1 overflow-x-auto border-b border-[var(--line)] p-2">
        {roles.map((r) => {
          const selected = r.id === role.id;
          return (
            <button
              key={r.id}
              role="tab"
              id={`tab-${r.id}`}
              aria-selected={selected}
              aria-controls={`panel-${r.id}`}
              onClick={() => {
                setActive(r.id);
                history.replaceState(null, '', `#hire-me-as?track=${r.id}`);
              }}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                selected ? 'bg-accent-500 text-ink-950' : 'text-[var(--fg-muted)] hover:bg-[var(--bg)] hover:text-[var(--fg)]'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${role.id}`} aria-labelledby={`tab-${role.id}`} className="grid gap-8 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">{role.audience}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{role.headline}</h3>
          <p className="mt-4 text-[var(--fg-muted)] leading-relaxed">{role.pitch}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {role.titles.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <ul className="mt-6 space-y-2">
            {role.proof.map((p) => (
              <li key={p} className="flex gap-3 text-sm">
                <svg className="mt-1 h-4 w-4 shrink-0 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={calcom} target="_blank" rel="noopener">{role.cta}</a>
            <a className="btn btn-secondary" href={`/hire#${role.id}`}>How I would engage</a>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">Evidence for this track</h4>
            <div className="mt-3 space-y-3">
              {role.caseStudies.map((slug) => {
                const cs = caseStudies[slug];
                if (!cs) return null;
                return (
                  <a key={slug} href={`/case-studies/${slug}`} className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-accent-500">
                    <div className="font-semibold leading-snug">{cs.title}</div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--fg-muted)]">
                      {cs.outcomes.slice(0, 3).map((o) => (
                        <span key={o.label}><strong className="text-[var(--fg)]">{o.value}</strong> {o.label}</span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">Skills emphasised</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {role.skills.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg-muted)]">Read next</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {role.reading.map((slug) => {
                const a = insights[slug];
                if (!a) return null;
                return (
                  <li key={slug}>
                    <a className="underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent-500" href={`/insights/${slug}`}>{a.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
