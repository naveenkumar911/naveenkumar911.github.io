# Naveen Kumar — AI leadership portfolio

Static portfolio (Astro + Tailwind + React islands) on GitHub Pages, with a governed "Ask Naveen's AI" assistant on Cloudflare Workers backed by NVIDIA NIM. Total running cost: $0.

- Live site: https://naveenkumar911.github.io (after step 2 below)
- Plan and rationale: [PORTFOLIO_PLAN.md](PORTFOLIO_PLAN.md)
- Items to verify before launch: [CONTENT_REVIEW.md](CONTENT_REVIEW.md)
- Launch and outreach checklist: [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)

```
site/      Astro site (pages, content collections, components, images)
worker/    Cloudflare Worker: chat proxy, rate limits, guardrails, knowledge base
.github/   Pages deployment workflow
```

## Local development

```powershell
cd site
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs site/dist
npm run images       # regenerate headshot variants, favicons + OG images from "../Naveen Kumar profile pic.jpg"
npm run pdf          # with `npm run dev` running: renders /executive-brief to public/NaveenKumar_Executive_Brief.pdf
```

The headshot crop (source pixels) is set at the top of `site/scripts/images.mjs`. Re-run `npm run images` and `npm run pdf` after changing the photo or the executive brief; both outputs are committed.

```powershell
cd worker
npm install
# one-time: put NVIDIA_API_KEY=nvapi-... in worker/.dev.vars (gitignored)
npm run dev          # http://127.0.0.1:8787 (rebuilds knowledge.ts from site content first)
```

Point the site at the local worker with `site/.env` containing `PUBLIC_CHAT_ENDPOINT=http://127.0.0.1:8787`.

## Go live (about 20 minutes)

### 1. Push the repository

Repository name must be exactly `naveenkumar911.github.io` for the root user site.

```powershell
cd "c:\Users\NK54534.LP-CPC-IT-172\Documents\NK\AI Remote Portfolio"
git remote add origin https://github.com/naveenkumar911/naveenkumar911.github.io.git
git branch -M main
git push -u origin main
```

If `gh` is installed: `gh repo create naveenkumar911/naveenkumar911.github.io --public --source . --push`.

### 2. Enable GitHub Pages

GitHub repo > Settings > Pages > Build and deployment > Source: **GitHub Actions**. The `Deploy portfolio to GitHub Pages` workflow runs on every push to `main` that touches `site/`. First deploy takes 1-2 minutes; site appears at https://naveenkumar911.github.io.

### 3. Deploy the AI assistant (Cloudflare Worker)

```powershell
cd worker
npm run login                 # opens browser; free Cloudflare account is enough
npm run secret                # paste the NVIDIA API key when prompted (stored encrypted, never in git)
npm run deploy                # prints https://ask-naveen.<subdomain>.workers.dev
```

Then:

1. GitHub repo > Settings > Secrets and variables > Actions > **Variables** > New variable: `PUBLIC_CHAT_ENDPOINT` = the Worker URL. Re-run the Pages workflow (Actions tab > Run workflow) or push any change under `site/`.
2. Optionally add the same to `site/.env` for local builds.

The Worker only accepts requests from `https://naveenkumar911.github.io` and `http://localhost:4321` (see `ALLOWED_ORIGINS` in `worker/wrangler.toml`). Update if you add a custom domain.

### 4. Verify

- Open the site, toggle dark mode, click **Ask Naveen's AI**, ask a question, paste a job description.
- Submit the contact form once (Formspree confirms the first submission by email).
- Open `/hire` and confirm the Cal.com embed loads.
- Share https://naveenkumar911.github.io in a LinkedIn draft and confirm the preview image renders.

## Updating content

| What | Where |
| --- | --- |
| Hero, contact details, links | `site/src/config.ts` |
| Role tracks (Hire me as) | `site/src/data/roles.ts` |
| Metrics, experience timeline | `site/src/data/profile.ts` |
| Skills matrix | `site/src/data/skills.ts` |
| Case studies | `site/src/content/case-studies/*.md` |
| Architecture / ADRs | `site/src/content/architecture/*.md` |
| Insights articles | `site/src/content/insights/*.md` |
| Testimonials | `site/src/content/testimonials/*.md` (set `approved: true` only after the person agrees) |
| Talks, certifications | `site/src/pages/talks.astro`, `site/src/pages/credentials.astro` |
| Assistant knowledge | `worker/knowledge/profile.md` (+ site content, compiled by `npm run kb`) then `npm run deploy` in `worker/` |
| Resume (Word) | replace `site/public/NaveenKumar_Resume.docx` |

Diagrams are Mermaid fenced blocks (```` ```mermaid ````) rendered client-side.

| "Still shipping" log on the homepage | `site/src/data/shipping.ts` (public GitHub repos are pulled live) |
| Live demos | `site/src/components/demos/*.tsx`, page `site/src/pages/demos.astro` |
| Fit criteria and contact block (Hire Naveen) | `site/src/pages/hire.astro` (`fit` array), `site/src/components/ContactStrip.astro` |

## Analytics (free, privacy-friendly)

1. Create a free account at https://www.goatcounter.com (no cookies, GDPR-friendly, no consent banner needed). Pick a code, e.g. `naveenkumar`.
2. Set `PUBLIC_GOATCOUNTER=https://naveenkumar.goatcounter.com/count` in `site/.env` (local) and as a GitHub Actions **Variable** (Settings > Secrets and variables > Actions > Variables) for production. Re-run the Pages workflow.
3. Dashboard shows visitors, referrers (LinkedIn, Google, direct), pages and countries. Useful for seeing which outreach produced visits to `/hire`.

## Custom domain (recommended, about $10/year)

The only paid item worth it: `naveenkumar911.github.io` reads as a hobby site to some recruiters; `naveenkumar.ai` or similar reads as a brand.

1. Buy the domain (Cloudflare Registrar or Porkbun sell at cost).
2. DNS: add `A` records for the apex to GitHub Pages IPs `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` to `naveenkumar911.github.io`.
3. Create `site/public/CNAME` containing just the domain (e.g. `naveenkumar.ai`). Astro copies it into `dist/`, which is what GitHub Pages reads.
4. GitHub repo > Settings > Pages > Custom domain: enter the domain, wait for the DNS check, tick **Enforce HTTPS**.
5. Update `url` in `site/src/config.ts`, `ALLOWED_ORIGINS` in `worker/wrangler.toml` (then `npm run deploy` in `worker/`), and the sitemap line in `site/public/robots.txt`. Push.
6. The old `github.io` address redirects automatically, so existing LinkedIn links keep working.

## Security notes

- The NVIDIA key lives only in `worker/.dev.vars` (gitignored) locally and as a Cloudflare secret in production.
- `INPUTS.local.md`, `.dev.vars`, `.env` are gitignored by pattern.
- The Worker enforces origin allowlist, burst and per-minute rate limits, message and turn caps, output token caps, prompt-injection sanitisation, and logs counts only.
