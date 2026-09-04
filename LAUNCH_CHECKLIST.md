# Launch and outreach checklist

## Day 0: go live (README.md has the exact commands)

- [ ] Work through CONTENT_REVIEW.md section A (30-45 minutes)
- [ ] Push repo `naveenkumar911/naveenkumar911.github.io`; enable Pages (Source: GitHub Actions)
- [ ] Deploy Worker; set `PUBLIC_CHAT_ENDPOINT` repo variable; re-run Pages workflow
- [ ] Test: chat, JD-fit, contact form, Cal.com embed, dark mode, mobile
- [ ] Run Lighthouse in Chrome DevTools on `/` (target: Performance 90+, Accessibility 95+, SEO 100)
- [ ] Submit `https://naveenkumar911.github.io/sitemap-index.xml` to Google Search Console (free, verify via HTML tag added to `Base.astro` or DNS)

## Day 1: LinkedIn (the primary traffic source)

- [ ] Profile > Contact info > Website: `https://naveenkumar911.github.io` labelled "Portfolio"
- [ ] Featured section: add the site link (it will pull the OG image), the executive brief `/executive-brief`, and the top case study `/case-studies/adek-agentic-platform`
- [ ] Headline: include "Portfolio: naveenkumar911.github.io" or keep the headline tight and put the link in About
- [ ] About: first line = the one-line version from `/executive-brief`; last line = the portfolio link
- [ ] Experience entries: add "Case study: <link>" to the ADEK and Circle K entries
- [ ] Open to Work: set for recruiters only with the five target titles from `roles.ts` and locations (United States remote, United Kingdom, UAE, Singapore, Remote)
- [ ] Publish a launch post: "I built my portfolio as a small production system: static site, a governed AI agent you can interrogate, and eight case studies with the decisions written down. Paste your JD into the assistant and it will map it to evidence, gaps included." Link in first comment and in the post. Tag no one; ask for reposts from your team.

## Week 1: distribution

- [ ] Republish two Insights articles as LinkedIn articles with a link back to the site
- [ ] Add the portfolio link to your email signature, GitHub profile README, Cal.com event description, and the Word resume header
- [ ] Update the Word resume with the portfolio URL and re-upload to `site/public/NaveenKumar_Resume.docx`
- [ ] Send the six testimonial requests (CONTENT_REVIEW.md section C)
- [ ] Submit one CFP (CONTENT_REVIEW.md section E)

## Targeted outreach (repeatable weekly loop)

Aim for 10 quality touches per week, not 100 applications.

1. **Frontier labs and applied AI (FDE Lead / Manager)**: Anthropic, OpenAI, Google DeepMind, Cohere, Mistral, Scale, Palantir, Databricks, Snowflake, Glean, Harvey, Sierra, Decagon, Writer, Cognition. Apply through careers pages; then message the hiring manager or a current FDE with a two-line note and the `/#hire-me-as?track=fde` link.
2. **Head of AI / CAIO-track**: enterprises and PE portfolio companies posting "Head of AI", "VP AI", "Director of AI Engineering". Use LinkedIn Jobs filters + Otta + Wellfound + Builtin. Send the `/executive-brief` link to the CTO or CEO, not the recruiter, with one sentence about their specific problem.
3. **Principal / Staff AI Platform**: AI-native companies and platform teams hiring for evals, agent platforms, inference. Link `/#hire-me-as?track=platform` and the evaluation harness case study.
4. **UAE / GCC sovereign AI**: G42, Core42, Inception, MBZUAI, TII, Presight, ADNOC AI, e&, DEWA, Dubai Digital Authority, Saudi entities (SDAIA, HUMAIN, Aramco Digital, NEOM), Qatar (QCRI, Ooredoo), plus Big 4 and consultancies' AI practices in the region. Link `/#hire-me-as?track=sovereign` and the data sovereignty article.
5. **Executive search**: connect with AI-focused partners at Heidrick, Korn Ferry, Egon Zehnder, Russell Reynolds, Spencer Stuart, True Search, Riviera Partners, Daversa. Send the executive brief; ask to be added to their AI leadership lists.
6. **Recruiter inbound**: reply to every relevant recruiter message with the portfolio link and the specific track page. Ask them to run the JD through the assistant; it saves both sides a screening call.

## Message templates

**To a hiring manager (FDE):**
> Hi <name>. I lead forward-deployed AI engineering for a UAE government entity (10K+ requests/day, 98% uptime) and previously took agentic RAG to production at Circle K ($600K/yr). I saw the <role> opening. My portfolio maps directly to it, including a JD-fit assistant you can paste the description into: naveenkumar911.github.io/#hire-me-as?track=fde. Would a 20-minute call this week make sense?

**To a CTO/CEO (Head of AI):**
> Hi <name>. Most enterprises have AI pilots; few have an operating model that turns them into measured outcomes. I have built that inside a government entity and a Fortune 500 retailer, with the governance, team and platform to run it. One-page brief: naveenkumar911.github.io/executive-brief. If <company> is deciding who owns AI outcomes in 2027, I would value 20 minutes.

**To an executive search partner:**
> Hi <name>. I am a Principal AI Architect and AI engineering leader based in the UAE, targeting Head of AI, FDE leadership and principal platform roles globally (remote, relocation or GCC). Executive brief: naveenkumar911.github.io/executive-brief. Happy to be a reference source for your AI searches as well.

## Monthly maintenance (15 minutes)

- [ ] Update LinkedIn follower count and any new metrics in `site/src/config.ts` / `profile.ts`
- [ ] Add one new Insights article (convert your best LinkedIn post of the month)
- [ ] Check the Worker still responds (model retirements happen; fallbacks are configured but verify)
- [ ] Review Cloudflare Worker analytics for abuse; tighten rate limits if needed
- [ ] Check Search Console for indexing errors
