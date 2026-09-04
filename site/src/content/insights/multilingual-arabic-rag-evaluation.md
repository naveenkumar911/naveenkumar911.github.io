---
title: "Multilingual and Arabic RAG: what breaks and how to evaluate it"
description: "Retrieval systems that work in English degrade quietly in Arabic and mixed-language corpora. The specific failure points in chunking, embeddings, retrieval and generation, and the evaluation practice that catches them."
date: 2026-07-29
track: platform
tags: ["Arabic NLP", "multilingual RAG", "evaluation", "GCC"]
featured: false
---

Enterprise RAG systems in the Gulf serve Arabic, English and documents that switch between them mid-page. Systems tuned and evaluated in English degrade in ways that are invisible until users lose trust. Building the government platform I lead exposed the specific failure points; this is what I now design for from the start.

## Where it breaks

**Chunking.** Arabic text has different sentence boundaries, diacritics that may or may not be present, and right-to-left layout that OCR and PDF extraction handle inconsistently. Fixed-size chunking that works for English produces fragments that split meaning. Scanned Arabic forms are a distinct problem requiring Arabic-capable OCR and layout-aware extraction.

**Embeddings.** Multilingual embedding models vary widely in Arabic quality, and many are weaker on dialectal or domain-specific Arabic. Cross-lingual retrieval (English query, Arabic document) is often much worse than same-language retrieval. Evaluate embeddings on your own corpus; leaderboard positions do not transfer.

**Lexical retrieval.** BM25 needs Arabic-aware tokenisation and normalisation (diacritics, hamza forms, alef variants). Without it, hybrid retrieval loses the lexical half in Arabic.

**Re-ranking.** Cross-encoder re-rankers trained mostly on English rank Arabic candidates poorly. Test them; consider multilingual re-rankers or fine-tuning on your data.

**Generation.** Models vary in Arabic fluency, formality and consistency. Mixed-language answers, unwanted transliteration and register mismatches with government communication standards appear in traces. Citations to Arabic sources need to preserve the original text accurately.

**Evaluation.** The most common gap: golden sets exist in English only. Quality claims made in English are assumed to hold in Arabic. They do not.

## Design choices that work

- Language detection at ingestion and query time; route to language-appropriate chunkers, tokenisers and, where needed, embedding models.
- Chunking by document structure and language, not by fixed token counts; Arabic-capable OCR with layout analysis for scans.
- Hybrid retrieval with Arabic-aware normalisation for the lexical component.
- Re-ranker selection validated on the actual corpus; fine-tuning on in-domain pairs where quality is insufficient.
- Golden sets per language and per mixed-language case, curated with Arabic-speaking business owners.
- Judges validated against human labels in each language separately; agreement in English does not imply agreement in Arabic.
- Generation checks for language consistency, register and citation fidelity as explicit metrics.

## Evaluation practice

Every quality metric in the [evaluation methodology](/architecture/evaluation-methodology) is reported per language. Retrieval recall in Arabic, groundedness in Arabic, hallucination rate on mixed-language inputs. Release gates apply per language, so a change that improves English and degrades Arabic is blocked. On the government platform this surfaced regressions that aggregate metrics had hidden and drove targeted work on chunking and re-ranking that lifted Arabic answer quality to parity with English on the golden set.

## The leadership point

For UAE and GCC programs, Arabic quality is not a feature. It is the product. A platform that serves Arabic speakers worse than English speakers fails its mandate regardless of its benchmark scores. Leaders evaluating vendors or teams should ask one question: show me the Arabic golden set and the per-language results. If there is not one, the quality claims are unverified.
