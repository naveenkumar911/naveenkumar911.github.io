import { useEffect, useState } from 'react';
import type { Shipped } from '@/data/shipping';

/**
 * "Still shipping" evidence: a curated log (from src/data/shipping.ts) plus live public GitHub
 * repositories ordered by last push. Unauthenticated GitHub API (60 req/h) with a 30-minute
 * sessionStorage cache; degrades silently to the curated log if the API is unavailable.
 */

interface Repo { name: string; html_url: string; description: string | null; pushed_at: string; language: string | null; stargazers_count: number }

const TAG_LABEL: Record<Shipped['tag'], string> = { code: 'Code', production: 'Production release', writing: 'Writing', 'open-source': 'Open source' };

function ago(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 86_400_000;
  if (d < 1) return 'today';
  if (d < 30) return `${Math.floor(d)}d ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

export default function StillShipping({ items, githubUser, githubUrl }: { items: Shipped[]; githubUser: string; githubUrl: string }) {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const key = `gh-repos-${githubUser}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        const { t, data } = JSON.parse(cached);
        if (Date.now() - t < 30 * 60_000) { setRepos(data); return; }
      }
    } catch {}
    fetch(`https://api.github.com/users/${githubUser}/repos?sort=pushed&per_page=6`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => {
        setRepos(data);
        try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data })); } catch {}
      })
      .catch(() => setFailed(true));
  }, [githubUser]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <ol className="space-y-3">
        {items.map((s) => (
          <li key={s.title} className="card flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:gap-5">
            <div className="shrink-0 sm:w-28">
              <div className="text-sm font-bold text-accent-600 dark:text-accent-400">{new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div className="text-xs text-[var(--fg-muted)]">{ago(s.date)}</div>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {s.href ? <a className="text-lg font-bold hover:underline" href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener">{s.title}</a> : <span className="text-lg font-bold">{s.title}</span>}
                <span className="chip !py-0 !text-xs">{TAG_LABEL[s.tag]}</span>
              </div>
              <p className="mt-1 text-base leading-relaxed text-[var(--fg-muted)]">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="card p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="h-card">GitHub, live</h3>
          <a className="text-sm font-semibold underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent-500" href={githubUrl} target="_blank" rel="noopener">@{githubUser}</a>
        </div>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">Public repositories by last push, fetched from the GitHub API when you loaded this page. Most production work is in customer repositories; this is the public tail.</p>
        <ul className="mt-4 space-y-2.5">
          {repos === null && !failed && [0, 1, 2, 3].map((i) => <li key={i} className="h-12 animate-pulse rounded-xl bg-[var(--bg)]" />)}
          {failed && <li className="text-sm text-[var(--fg-muted)]">GitHub API unavailable right now (rate limit). <a className="underline" href={githubUrl} target="_blank" rel="noopener">Open the profile</a>.</li>}
          {repos?.map((r) => (
            <li key={r.name} className="rounded-xl border border-[var(--line)] px-4 py-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a className="font-semibold hover:underline" href={r.html_url} target="_blank" rel="noopener">{r.name}</a>
                <span className="text-xs text-[var(--fg-muted)]">pushed {ago(r.pushed_at)}{r.language ? ` · ${r.language}` : ''}</span>
              </div>
              {r.description && <div className="mt-1 line-clamp-2 text-sm text-[var(--fg-muted)]">{r.description}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
