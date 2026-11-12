# Deploy this portfolio (go live)

Follow these steps in order. Total time is about 20–30 minutes. Running cost stays $0 (GitHub Pages + Cloudflare Workers free tiers + NVIDIA NIM free credits).

**Live URL after this:** https://naveenkumar911.github.io

Do this from PowerShell. If a command fails, stop and fix that step before continuing.

---

## 0. Before you start (5 minutes)

Accounts you need (all free):

1. GitHub, logged in as **naveenkumar911**
2. Cloudflare account (any email)
3. NVIDIA NIM API key from https://build.nvidia.com (create a key; it looks like `nvapi-...`)
4. Confirm these are already live (they are wired in the site):
   - Cal.com: https://cal.com/naveenkumar911
   - Formspree: https://formspree.io/f/mwlkqojy
   - WhatsApp on `+971 562399343`

Tools on this machine:

```powershell
node -v          # need Node 22+
git --version
gh --version     # optional but easier; install from https://cli.github.com if missing
```

Then:

```powershell
cd "c:\Users\NK54534.LP-CPC-IT-172\Documents\NK\AI Remote Portfolio"
cd site;  npm install
cd ..\worker; npm install
cd ..
```

Source photos, the working Word resume, internal review notes, and unapproved testimonial drafts are gitignored. They live locally and in the sibling folder `Documents\NK\AI Remote Portfolio - private`. Do not `git add` them.

Optional but recommended before treating the site as interview-safe: skim `CONTENT_REVIEW.md` in that private folder (especially the governance case-study numbers marked for confirmation).

---

## 1. Create the GitHub repo and push

The repo **must** be named `naveenkumar911.github.io` so GitHub serves it at the root user URL.

### Option A — GitHub CLI (preferred)

```powershell
cd "c:\Users\NK54534.LP-CPC-IT-172\Documents\NK\AI Remote Portfolio"
gh auth login
gh repo create naveenkumar911/naveenkumar911.github.io --public --source . --remote origin --push
```

If `gh repo create` complains that a remote already exists, skip to **Option B**.

### Option B — GitHub website + git

1. Open https://github.com/new
2. Owner: **naveenkumar911**
3. Repository name: **naveenkumar911.github.io** (exact)
4. Public. Do **not** add a README, .gitignore, or license (this folder already has them).
5. Create repository, then:

```powershell
cd "c:\Users\NK54534.LP-CPC-IT-172\Documents\NK\AI Remote Portfolio"
git remote add origin https://github.com/naveenkumar911/naveenkumar911.github.io.git
git branch -M main
git push -u origin main
```

Confirm: https://github.com/naveenkumar911/naveenkumar911.github.io shows the files.

---

## 2. Turn on GitHub Pages

1. Repo → **Settings** → **Pages**
2. **Build and deployment → Source:** GitHub Actions (not “Deploy from a branch”)
3. Open **Actions**. You should see **Deploy portfolio to GitHub Pages**.
   - If it did not run, click **Run workflow** (the workflow also runs on every push that touches `site/`).
4. Wait until the job is green (1–2 minutes).
5. Open https://naveenkumar911.github.io — the site should load. Chat will not work yet; that is step 3–4.

If Pages asks you to approve the **github-pages** environment the first time, approve it.

---

## 3. Deploy the AI assistant (Cloudflare Worker)

This is the “Ask Naveen’s AI” chat. The NVIDIA key is stored as a Cloudflare secret, never in git.

```powershell
cd "c:\Users\NK54534.LP-CPC-IT-172\Documents\NK\AI Remote Portfolio\worker"
npm run login                 # browser opens; sign in to Cloudflare
npm run secret                # paste NVIDIA_API_KEY when prompted (nvapi-...)
npm run deploy                # rebuilds the knowledge base, then deploys
```

Copy the URL wrangler prints. It looks like:

`https://ask-naveen.<your-account>.workers.dev`

Keep that URL. You need it in the next step.

If `npm run secret` is skipped, the Worker deploys but every chat request fails.

---

## 4. Point the site at the Worker

The production site reads `PUBLIC_CHAT_ENDPOINT` from a **GitHub Actions variable** (not a secret — the URL is public in the browser anyway).

1. GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **Variables** tab
2. **New repository variable**
   - Name: `PUBLIC_CHAT_ENDPOINT`
   - Value: the Worker URL from step 3 (no trailing slash)
3. Re-run Pages so the site rebuilds with that URL:
   - **Actions** → **Deploy portfolio to GitHub Pages** → **Run workflow** → **Run workflow**

Optional, for local chat against production or the local Worker, create `site/.env` (gitignored):

```
PUBLIC_CHAT_ENDPOINT=https://ask-naveen.<your-account>.workers.dev
```

The Worker only accepts requests from:

- `https://naveenkumar911.github.io`
- `http://localhost:4321`

That list is `ALLOWED_ORIGINS` in `worker/wrangler.toml`. If you later add a custom domain, add it there and run `npm run deploy` in `worker/` again.

---

## 5. Smoke-test the live site

Open https://naveenkumar911.github.io and check:

| Check | What success looks like |
| --- | --- |
| Home | Headshot, Immediate joiner, contact strip, proof bar |
| Dark / light | Theme toggle in the header |
| Mobile | Nav hamburger works; contact links are tappable |
| Hire Naveen | `/hire` — email, phone, LinkedIn, form, Cal.com embed |
| Contact form | Submit once; Formspree emails you (first submit may need email confirm) |
| Resume / PDF | `/resume` and `/NaveenKumar_Executive_Brief.pdf` download |
| Live demos | `/demos` — routing simulator and eval dashboard respond to sliders |
| Chat | Bottom-right **Ask Naveen’s AI** answers a real question |
| JD-fit | Paste a job description; it maps to case studies with links |
| LinkedIn preview | Paste the site URL into a LinkedIn post draft; OG image should appear |
| Chat CORS | If chat fails, the Worker URL is wrong, the Pages rebuild did not pick up the variable, or the origin is not in `ALLOWED_ORIGINS` |

---

## 6. After it is live (same day)

- LinkedIn → Contact info → Website: `https://naveenkumar911.github.io` labelled **Portfolio**
- LinkedIn Featured: site, `/executive-brief`, `/case-studies/adek-agentic-platform`
- Email signature, GitHub profile, Cal.com event description: same URL
- Full outreach list: `LAUNCH_CHECKLIST.md` in `Documents\NK\AI Remote Portfolio - private`

---

## Optional: analytics (still $0)

1. Create https://www.goatcounter.com — pick a code, e.g. `naveenkumar`
2. GitHub **Actions variable** `PUBLIC_GOATCOUNTER` = `https://naveenkumar.goatcounter.com/count`
3. Add that variable to `.github/workflows/deploy.yml` next to `PUBLIC_CHAT_ENDPOINT` (the workflow does not pass it today), then push:

```yaml
env:
  PUBLIC_CHAT_ENDPOINT: ${{ vars.PUBLIC_CHAT_ENDPOINT }}
  PUBLIC_GOATCOUNTER: ${{ vars.PUBLIC_GOATCOUNTER }}
```

4. Re-run the Pages workflow. Dashboard shows referrers (LinkedIn vs direct) with no cookies.

---

## Optional: custom domain later

Full DNS steps are in `README.md` under **Custom domain**. After DNS works:

1. Put the domain (one line) in `site/public/CNAME`
2. Set `url` in `site/src/config.ts`
3. Add `https://yourdomain` to `ALLOWED_ORIGINS` in `worker/wrangler.toml`
4. Update `site/public/robots.txt`
5. `git push`, then `cd worker; npm run deploy`

---

## Updating the live site later

| Change | Commands |
| --- | --- |
| Site content, design, case studies | Edit → `git add` → `git commit` → `git push` (Pages deploys automatically) |
| Assistant knowledge / profile | Edit `worker/knowledge/profile.md` or site markdown → `cd worker; npm run deploy` |
| NVIDIA key rotation | `cd worker; npm run secret` |
| Executive brief PDF | With preview/dev running: `cd site; npm run pdf` → commit `site/public/NaveenKumar_Executive_Brief.pdf` → push |
| Headshot | Replace the jpg, `cd site; npm run images`, commit generated files, push |

---

## Troubleshooting

**Pages workflow fails on `npm ci`**  
Run `cd site; npm ci` locally and push any lockfile fix.

**Site is live but chat says network / CORS error**  
Confirm `PUBLIC_CHAT_ENDPOINT` is set, Pages was re-run *after* the variable, and the Worker URL opens in a browser (you should see a Worker response, not 404).

**Chat answers are stale after content edits**  
`cd worker; npm run deploy` (that script rebuilds `knowledge.ts` from the site).

**`wrangler login` fails in this environment**  
Run it in Windows Terminal / PowerShell on your machine, not inside a restricted sandbox.

**Repo name is already taken**  
If `naveenkumar911.github.io` already exists, push this project into that repo (`git remote add` + `git push`) instead of creating a second one. A project-pages URL (`naveenkumar911.github.io/AI-Remote-Portfolio`) would break asset paths unless `site.astro.config` `base` is changed — do not do that unless you intend to.
