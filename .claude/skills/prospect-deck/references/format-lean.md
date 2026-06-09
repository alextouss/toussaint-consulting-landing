# Format B · Lean proposition (~9 slides)

Référence livrée : `decks/kanaan-anti-churn/kanaan-anti-churn.html` (et `decks/benoit-pagny/benoit-pagny.html`).

**Quand l'utiliser** : prospect avec **1 idée à valider / wedge à isoler** (freelance pitch, founder advisory, follow-up "je te fais une proposition"). Pas 3 douleurs, 1 sujet à creuser.

**Workflow préalable** : faire un travail **office-hours interne** (6 forcing questions YC, Alex ↔ Claude en conversation) pour cadrer le wedge et le POC AVANT d'écrire le deck. Le deck est l'output, pas le process. Cf. memory `[[feedback_office_hours_internal]]`.

## Structure (restructure lourde du template, garder shell head/header/footer/CSS print)
1. **Cover** — eyebrow `Proposition POC · <sujet>`, H1 punchline 2-mots-clés (`Du X à Y.`), sub "Suite à notre échange · POC 2 sem · 3K€"
2. **Ce que j'ai entendu** — 2-col "Le problème" / "Ta vision" (4 bullets chacun), prouve l'écoute fidèle
3. **Mon analyse** — 3 cards (3-col grid, accent tech-blue), 3 angles ressortis après réflexion
4. **Le wedge** (punchline plein écran) — H1 accent terracotta XL + 3 paragraphes (Le move / Pourquoi maintenant / Pourquoi ça vend), pattern `bg-accent/5 border-l-2 border-accent`
5. **POC scope** — 2 panels (Périmètre / Livrable) + 1 sub-headline avec l'argument business clé
6. **POC architecture** — diagramme D2 unique (PNG `--scale 3`), max-height 128mm (PAS 145mm), stack en sub-heading
7. **Roadmap** — 3 phases compactes (Phase 1 POC / Phase 2 Pilote / Phase 3 Multi-tenant), cards `roadmap-card` custom class avec padding 4mm 6mm en print
8. **Pourquoi moi** — 3 bullets numérotés + punchline italique accent
9. **Pour creuser + footer** — 2 cartes CTA (Calendar / Email) + footer Toussaint

## Patterns CSS spécifiques au lean
- `.roadmap-card { padding: 14px 18px }` (screen) + `@media print { .roadmap-card { padding: 4mm 6mm !important }}` (compact roadmap)
- `img[src*="diagrams/"] { max-height: 128mm !important }` en print (vs 145mm default) — laisse plus de place au header/sub sur le slide architecture
- Wrap entier de la section roadmap dans un `<div class="reveal avoid-break">` pour empêcher Chrome de couper entre header et cards

## Garde-fous lean (mémoires)
- **Premières propositions = simples, pas de conjectures** : pas de métriques chiffrées, pas de métriques d'eval, pas de sources de données pré-engagées. Cf. `[[feedback_keep_proposals_simple]]`.
- **Petit ticket à closing rapide (< 5K€)** : retirer garanties + design-partner asks ; ils signalent le doute et ralentissent la signature. Cf. `[[feedback_fast_close_no_safety_nets]]`.
- **Pas de jargon non introduit** (Cat 1/2/3 etc.) sauf si le deck l'explique. Cf. `[[feedback_no_unintroduced_jargon]]`.
