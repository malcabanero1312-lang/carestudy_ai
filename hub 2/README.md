# CAREGIVING STUDY HUB — Made by MARC ASHER
Personal caregiving learning app built from your notebook (10 chapters + 65 Q&A).

## Run locally
`npx serve .` (or VS Code "Live Server") → open http://localhost:3000

## Publish (free) — it is a static site
Upload this whole folder to **Netlify Drop**, **Vercel**, **GitHub Pages** or **Cloudflare Pages**. Open the URL on your phone → "Install app / Add to Home Screen". Works offline after the first visit.

## Turn on the internet-connected AI
Providers in Settings → AI: Cloudflare Worker, Claude API key, or any OpenAI-compatible endpoint.
Cloudflare: `cd server && npx wrangler deploy`, then either `npx wrangler secret put ANTHROPIC_API_KEY` (Claude + web search) or do nothing to use free Workers AI (no web search). Paste the *.workers.dev URL in Settings.
The tutor answers any question and can search the web; for caregiving it follows your notebook first.

## Edit content
- `js/data/topics.js` — chapters (add a new object = new lesson)
- `js/data/qa.js` — the 65 Q&A
- `js/data/pages.js` + `assets/pages/` — notebook page images per chapter
When you change files, bump `V` in `sw.js` so installed apps update.

## Structure
css/ UI · js/app.js views+logic · js/ai.js AI · js/voice.js speech · js/storage.js saved data · server/ AI proxy
