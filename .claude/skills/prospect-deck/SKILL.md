---
name: prospect-deck
description: Build a tailored prospect follow-up deck for Toussaint Consulting after a discovery call — an HTML file that exports to a dark, branded A4-landscape slide-deck PDF (each <section> = one slide). Use when creating, scaffolding, restructuring, or editing a prospect deck under decks/<slug>/, choosing between the 3-use-case and lean-proposition formats, building D2 diagrams for a deck, framing product captures, or applying the deck editorial rules. Triggers: "follow-up prospect", "deck pour <prospect>", "proposition POC", "brief prospect", a new decks/<slug>/ folder. Hands off the final PDF render to the pdf-export skill.
---

# Prospect follow-up deck

Pour chaque prospect, on produit un **PDF format slide-deck** (A4 landscape, dark brandé edge-to-edge) à envoyer après un call de découverte. L'HTML est l'intermédiaire ; chaque `<section>` du HTML = une slide du PDF. Les decks sont le **livrable prospect** (≠ landing page publique).

> Chemins relatifs à la racine du repo `tc_website/` (cwd quand on travaille dans le projet).

## 1. Choisir le format

| Signal au call | Format | Réf. |
|---|---|---|
| **3 douleurs distinctes** → 3 patterns Cat 1/2/3 | **A · Discovery 3-UCs** (~16 slides) | `references/format-3ucs.md` |
| **1 idée à valider / wedge à isoler** (pitch freelance, founder advisory, "je te fais une proposition") | **B · Lean proposition** (~9 slides) | `references/format-lean.md` |

Lire la référence du format choisi avant d'écrire le deck. Le format lean exige un travail **office-hours interne** préalable (cf. `[[feedback_office_hours_internal]]`).

## 2. Workflow (checklist copiable)

```
- [ ] 1. Call → créer prospects/<slug>/ (GITIGNORÉ) : déposer transcript, email reçu, pièces jointes ; noter douleurs/idée dans notes.md
- [ ] 2. Choisir le format (tableau ci-dessus) + lire la référence
- [ ] 3. mkdir -p decks/<slug>/diagrams && cp templates/prospect-deck.html decks/<slug>/<slug>.html
- [ ] 4. Find/replace {{PROSPECT_NAME}}, {{PROSPECT_SLUG}}, {{PROSPECT_CONTEXT}}  (lean = restructure lourde, voir format-lean.md)
- [ ] 5. Diagrammes D2 → references/diagrams.md (compile SVG + PNG --scale 3)
- [ ] 6. Remplir les blocs du HTML (contenu, captures) → references/editorial.md
- [ ] 7. Itérer le layout SANS re-export PDF : node scripts/print-preview.mjs decks/<slug>/<slug>.html screenshots/preview.png
- [ ] 8. Export PDF → skill pdf-export → decks/<slug>/<slug>_Brief.pdf
- [ ] 9. git add + commit + push main (auto-deploy Vercel) ; curl 200 sur l'URL déployée
- [ ] 10. Envoyer le PDF (email / LinkedIn DM) + finir par un lien ouvrable
```

## 3. Règles éditoriales & build
Ton, langue, noindex, preuves marché, captures produit (framing + marges), atomicité des slides / page-break, mots-clés du messaging deck : **`references/editorial.md`** (à lire avant de rédiger).

## 4. Export (hand-off)
**Ne pas réimplémenter l'export ici.** La commande Chrome `--print-to-pdf`, le CSS print complet (slide-deck dark, centrage, page-break) et les 12 gotchas vivent dans le skill **`pdf-export`** → l'invoquer à l'étape 8.

## Outils (en place dans le repo, ne pas dupliquer)
- `templates/prospect-deck.html` — scaffold 3-UCs avec tokens (paths `../../assets`).
- `templates/diagram-dark.d2` — template D2 dark (classes + theme override).
- `scripts/print-preview.mjs` — Playwright + print media emulation (itération layout, ~3s).
- `scripts/regen-benoit-captures.mjs` — Playwright : re-rend/margine une capture (marges propres, fix l'asset).

## Exemples livrés
- **3-UCs** : `decks/capgemini-openinnov/capgemini-openinnov.html`
- **Lean** : `decks/kanaan-anti-churn/kanaan-anti-churn.html`, `decks/benoit-pagny/benoit-pagny.html`

## Mémoires liées
`[[feedback_office_hours_internal]]` · `[[feedback_realistic_product_visuals]]` · `[[feedback_references_no_providers]]` · `[[feedback_keep_proposals_simple]]` · `[[feedback_fast_close_no_safety_nets]]` · `[[feedback_no_unintroduced_jargon]]` · `[[feedback_card_grid_alignment]]`
