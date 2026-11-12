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
  const [more, setMore] = useState(false);

  // Support deep links like /#hire-me-as?track=platform or hash "#track=platform"
  useEffect(() => {
    const m = window.location.hash.match(/track=([a-z-]+)/);
    if (m && roles.some((r) => r.id === m[1])) setActive(m[1]);
  }, [roles]);

  const role = useMemo(() => roles.find((r) => r.id === active) ?? roles[0], [active, roles]);

  return (
    <div className="card overflow-hidden">
      <div role="tablist" aria-label="Target role tracks" className="flex flex-wrap gap-1.5 border-b border-[var(--line)] p-2 sm:p-2.5">
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
              className={`min-h-11 rounded-xl px-3 py-2 text-sm font-semibold transition-colors sm:px-4 sm:text-base md:px-5 md:py-3 ${
                selected ? 'bg-accent-500 text-ink-950 shadow-md' : 'text-[var(--fg-muted)] hover:bg-[var(--bg)] hover:text-[var(--fg)]'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${role.id}`} aria-labelledby={`tab-${role.id}`} className="grid gap-6 p-5 sm:p-7 md:p-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div>
          <p className="kicker">{role.audience}</p>
          <h3 className="mt-3 text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl xl:text-[2.75rem]">{role.headline}</h3>
          <p className="lead mt-4 md:mt-5">{role.pitch}</p>

          <div className="mt-5 hidden flex-wrap gap-2 sm:flex md:mt-6">
            {role.titles.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <ul className="mt-6 space-y-3 md:mt-8">
            {role.proof.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-relaxed md:text-[1.0625rem]">
                <svg className="mt-1.5 h-5 w-5 shrink-0 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-9">
            <a className="btn btn-primary btn-lg" href={calcom} target="_blank" rel="noopener">{role.cta}</a>
            <a className="btn btn-secondary btn-lg" href={`/hire#${role.id}`}>How I would engage</a>
          </div>
        </div>

        <button type="button" className="btn btn-secondary w-full lg:hidden" aria-expanded={more} onClick={() => setMore((m) => !m)}>
          {more ? 'Hide evidence and skills' : 'Show evidence, skills and reading'}
        </button>

        <div className={`${more ? 'block' : 'hidden'} space-y-8 lg:block`}>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--fg-muted)]">Evidence for this track</h4>
            <div className="mt-4 space-y-3">
              {role.caseStudies.map((slug) => {
                const cs = caseStudies[slug];
                if (!cs) return null;
                return (
                  <a key={slug} href={`/case-studies/${slug}`} className="block rounded-2xl border border-[var(--line)] bg-[var(--bg)]/40 p-5 transition-colors hover:border-accent-500">
                    <div className="text-lg font-bold leading-snug">{cs.title}</div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[var(--fg-muted)]">
                      {cs.outcomes.slice(0, 3).map((o) => (
                        <span key={o.label}><strong className="text-lg text-accent-600 dark:text-accent-400">{o.value}</strong> {o.label}</span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--fg-muted)]">Skills emphasised</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {role.skills.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--fg-muted)]">Read next</h4>
            <ul className="mt-4 space-y-2.5 text-base">
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
