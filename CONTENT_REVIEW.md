# Content review: verify before launch

Everything on the site is derived from your resume, your LinkedIn posts, and the numbers you gave me (hired 8, onboarded 12; 12 programs, up to 6 concurrent). Where I extended resume bullets into fuller narratives, the extension is role-consistent but you must confirm it is accurate. Reference checks at frontier labs and Fortune 500s are thorough; nothing here should be something you cannot stand behind in an interview.

Legend: **Confirm** = read and confirm accurate; **Edit** = likely needs your wording or numbers; **Decide** = your call.

## A. Facts stated as facts

| # | Where | Statement | Action |
| --- | --- | --- | --- |
| 1 | Everywhere | "10+ years in AI" and "5+ years forward-deployed" | Confirm (resume says 10+ and 5+) |
| 2 | Hero, brief, resume | "Ten years embedding with government, retail, BFSI, healthcare and technology customers" | Confirm: BFSI = PIMCO; healthcare = BMS. If you prefer "pharma" over "healthcare", edit `site/src/config.ts` and `index.astro` |
| 3 | ADEK case study | "thousands of users" | Edit with a defensible order of magnitude, or keep vague |
| 4 | ADEK case study | Named workflows: policy Q&A, case triage, document intelligence, structured lookups | Confirm or rename to the real workflow names |
| 5 | ADEK case study | Sovereignty pattern: UAE-region Vertex AI, no cross-border inference, pgvector, self-hosted tracing | Confirm this matches what was actually deployed |
| 6 | ADEK case study, ADR-01 | Fine-tuned open-weight models used behind the router for narrow tasks | Confirm (resume mentions LoRA/QLoRA fine-tuning; the router use is my framing) |
| 7 | ADEK case study | "No silent regressions since gating" (also eval harness case study) | Confirm or soften to "materially fewer regressions" |
| 8 | Circle K case study | Workstreams: support knowledge assistant, text-to-SQL analytics, n8n supply/pricing automations | Confirm names and that all were at Circle K (resume Key Projects list them without client) |
| 9 | Circle K case study | "$600K split across support deflection, automation, inference savings" | Edit if you know the real split; otherwise fine as stated ("across") |
| 10 | Circle K case study | "Built the POC myself in two weeks" | Confirm the timeframe |
| 11 | n8n case study | "1,000+ tasks per month" | Confirm (from resume) and confirm it was during the Circle K / Huloop period |
| 12 | Copilot platform case study | Deployed where, and any usage numbers | Edit `enterprise-ai-copilot-platform.md` frontmatter and body |
| 13 | PIMCO/BMS/NFL case study | Which workstream mapped to which client is kept general | Decide whether to add specifics (only if cleared) |
| 14 | Private LLM agent case study | Where it was deployed | Decide whether to name the environment |
| 15 | Leadership page | Team composition "AI engineers, data scientists, ML and AIOps engineers plus partner staff" | Confirm |
| 16 | Leadership page | Onboarding cadence (week 1 shadow, week 2 own a gate, month 2 own a slice) and "leveling reviewed twice a year, career conversations quarterly" | Edit to your actual practice |
| 17 | Leadership page | "I run the final technical and judgment interview for every hire" | Confirm |
| 18 | Hire page | Work authorisation: "Indian national on a UAE residence visa; open to sponsored relocation (O-1/H-1B, UK, EU, Singapore)" | **Confirm nationality and visa status**; edit `site/src/pages/hire.astro` and `worker/knowledge/profile.md` |
| 19 | Hire page | "Standard notice period", "interviews can start immediately" | Confirm; state the notice length if you want |
| 20 | Hire page | Fractional: "two to three engagements at a time", "one to two days a week" | Decide |
| 21 | Config | Cal.com `https://cal.com/naveenkumar911` and Formspree `https://formspree.io/f/mwlkqojy` | Confirm both are live (open them) |
| 22 | Config | WhatsApp uses +971 562399343 | Confirm you want WhatsApp public |
| 23 | Config | LinkedIn "16K followers" | Update the number periodically in `config.ts` |
| 24 | Footer | "Client names shown with permission" | **Confirm you are permitted to name CPC/ADEK, Watermelon, Circle K, Huloop, PIMCO, BMS, NFL publicly**. If any is under NDA, replace with a descriptor ("a UAE government education entity") in the case study frontmatter `client:` field, `profile.ts`, `roles.ts`, `profile.md` |
| 25 | Skills matrix | Depth ratings expert / advanced / working | Edit any you would not defend; items with `verify: true` in `skills.ts` are the ones I was least sure about |
| 26 | Resume page | Summary paragraph and skills lines are generated from `profile.ts` and `skills.ts` | Confirm they match the Word resume closely enough |

## B. Things I deliberately did NOT fabricate

- No testimonials shown except the real LinkedIn recommendation (Hitesh Prajapati). Six drafts are in `site/src/content/testimonials/draft-*.md` with `approved: false`; they never render.
- No certifications listed. `credentials.astro` shows an honest placeholder until you add earned ones.
- No conference talks listed as delivered. `talks.astro` lists three ready-to-give talks as proposals.
- No employer, client, metric or date beyond your resume and your stated numbers.

## C. Testimonial requests (do this week)

Send via LinkedIn "Ask for a recommendation" or email. Suggested one-liner: "I am putting together a portfolio for my next role. Would you be willing to write 3-4 sentences about working with me on [project]? I have drafted something you can edit or ignore entirely." Attach the matching draft.

| Draft file | Who to ask |
| --- | --- |
| `draft-adek-sponsor.md` | Your Director-level sponsor at ADEK / CPC |
| `draft-circlek-product-owner.md` | Your business counterpart at Circle K |
| `draft-huloop-engineering-lead.md` | A peer or lead at Huloop.ai |
| `draft-direct-report.md` | One of your current engineers |
| `draft-client-stakeholder-2020.md` | A counterpart from PIMCO, BMS or NFL |
| `draft-peer-architect.md` | A peer architect at CPC or a partner |

When one accepts: paste their actual words, set the real `name`, set `approved: true`. Keep designation accurate. Never publish without explicit consent.

## D. Credential fast-track (optional, all free or low-cost)

None are required at your level; two or three add procurement-friendly signals for enterprise and government roles.

- ISO/IEC 42001 lead implementer or foundation (several providers; look for accredited courses)
- NIST AI RMF free training (NIST offers a free introductory course)
- Google Cloud Generative AI Leader (exam fee) or the free Vertex AI skill badges
- Microsoft AI-102 or the free Azure AI Fundamentals learning path
- AWS AI Practitioner
- Anthropic and OpenAI free developer courses; NVIDIA DLI free courses on LLM deployment
- Databricks free Generative AI Fundamentals

Add each to `credentials.astro` with the verification link when earned.

## E. Speaking (optional)

Three CFP-ready abstracts are on `/talks`. Suggested first targets given your location: GITEX Global (Dubai, October), AI Everything (Abu Dhabi), Dubai AI Week, plus MLOps Community and AI Engineer meetups online. One recorded talk, even a 20-minute meetup, becomes a strong asset on this page and on LinkedIn.

## F. Quick edits you may want

- Hero headline and tagline: `site/src/config.ts` (`tagline`, `description`) and `site/src/pages/index.astro`.
- Order of the five role tabs: `site/src/data/roles.ts` (first is default).
- Which three case studies are featured on the home page: `featured: true` in frontmatter, ordered by `order`.
- Which articles appear first: `date` in frontmatter.
