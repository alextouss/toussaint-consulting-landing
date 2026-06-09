# Règles éditoriales & build des follow-ups prospects

## Contents
- Ton & langue
- Fichiers prospects (public / privé / noindex)
- Preuves marché
- Captures produit (framing + marges)
- Export PDF = slide-deck (atomicité, page-break, limites)
- Mots-clés du messaging deck

## Ton & langue
- Ton direct, phrases courtes. **Pas d'em-dash (—).** Même anti-ton-IA que la landing (pas de formulations génériques type ChatGPT).
- Langue : **FR ou EN selon le prospect**.
- Privilégier la **qualité visuelle et l'originalité** sur la rapidité.

## Fichiers prospects (public / privé / noindex)
- **Livrables publics** : 1 dossier par prospect `decks/<nom-entite>-<contexte>/` contenant `<slug>.html` (source du PDF), `<slug>_Brief.pdf` et `diagrams/`. Déployé à `/decks/<slug>/<slug>.html`.
- **Inputs privés** : `prospects/<nom-entite>-<contexte>/` — `notes.md` (notes brutes du call, à-faire, contact) + transcript, email reçu, pièces jointes. Tout `prospects/` est **gitignoré**, jamais déployé.
- **Paths dans le HTML deck** : assets partagés via `../../assets/...`, diagrammes en local `diagrams/...` (le HTML vit dans `decks/<slug>/`).
- Ne garder que la **dernière version** de chaque prospect (pas de `-v2`, `-draft`) : remplacer en place. Jamais dupliquer un deck existant — `templates/prospect-deck.html` est la source canonique.
- HTML accessible uniquement via URL directe, **pas lié depuis `index.html`**.
- `<meta name="robots" content="noindex, nofollow">` **obligatoire** sur chaque HTML prospect.
- Pas de noms d'employeurs interdits sur la landing, mais les follow-ups peuvent citer des cas **anonymisés**.
- Pricing : pas de prix affichés en dur côté positionnement public ; discovery call. (Un ticket POC chiffré sur la cover lean est OK — cf. `format-lean.md`.)

## Preuves marché
Uniquement **cas publics avec chiffres datés + URL**. **Jamais de cas inventé.**
- **Staleness** : une acquisition / levée / valuation date vite. Vérifier que la ref est **< 12 mois** avant de la mettre, sinon préférer un pattern intemporel (ex. "le LLM lit le non-structuré") à une citation chiffrée vieillissante. Le format lean (Kanaan) en a fait l'économie totale et c'est OK pour un follow-up "proposition POC".
- Cartes de référence : **outcome + stack haut-niveau seulement, jamais les providers** (ne pas nommer GPT-4o, Claude, Vertex, etc.). Cf. `[[feedback_references_no_providers]]`.

## Captures produit (framing + marges)
Règle de build HTML. Garder les **couleurs d'origine** (ne jamais re-thémer un screenshot produit ou un widget à la palette de marque — ça fait faux ; un graphique re-teinté a été rejeté). L'UI produit réelle est généralement claire → la présenter comme une **fenêtre claire flottante** sur les slides dark. Caption muted **au-dessus** sur le slide (hors d'une carte dark, sinon illisible), image dans un cadre `.capture` :
```css
.capture { border-radius: 10px; overflow: hidden; background: #fff;
           border: 1px solid rgba(240,230,210,0.14); box-shadow: 0 16px 46px rgba(0,0,0,0.55); }
.capture img { display: block; width: 100%; height: auto; }
```
- Pour un **widget thémable**, rendre le **vrai artefact** (flipper le `data-theme` de la preview, sur le `<html>` seulement, **pas** le sélecteur CSS `[data-theme]` sinon on re-matche la règle dark). Height-cap d'une capture large : cibler l'`img` (`max-height: Nmm; width:auto; margin:0 auto`), elle se centre dans le cadre blanc. Le `box-shadow` survit en PDF (cf. skill `pdf-export` gotcha #12, volet print). Fond dark pur (`#0A0A0A`) adoucissable vers un charbon chaud (ex. `#15110D`) si un deck paraît trop sombre.
- **Marges (fixer l'asset, pas le CSS)** : un screenshot d'artefact claude.ai est souvent un crop trop serré → contenu collé aux bords, labels de bord rognés. Ne **pas** compenser avec un padding sur `.capture` (le contenu reste collé au bord du raster) → corriger **le PNG lui-même**. Si une **source régénérable** existe (widget thémable), re-rendre avec un body paddé puis screenshot (le `padding` autour du SVG donne la marge ; screenshoter le body, pas le `.dc-wrap`, car les labels remplissent la largeur du SVG). Sinon **baker une marge blanche** dans le raster (page blanche paddée + re-screenshot — le fond blanc se fond). Helper : `node scripts/regen-benoit-captures.mjs`.
- Cf. memory `[[feedback_realistic_product_visuals]]`.
- **Alignement de grilles de cartes** : chaque eyebrow `<span>` d'une grille multi-cartes a besoin de `min-h-[2.4em]`, sinon les cartes se désalignent d'une ligne. Cf. `[[feedback_card_grid_alignment]]`.

## Export PDF = slide-deck (atomicité, page-break, limites)
- Chaque `<section>` doit être **atomique** (un concept par slide). Pattern CSS complet dans skill **`pdf-export`** : `@page margin 0` (edge-to-edge dark), `section { padding: 12mm 22mm; min-height: calc(100vh - 4mm); display: flex; justify-content: safe center }` (centrage vertical), Tailwind v4 CDN reste tel quel.
- **Splitter dès qu'une section déborde une page.** Symptômes : page noire vide entre 2 slides (overflow d'1mm), contenu collé en haut d'une page (overflow), box/schéma coupé en deux (card trop grande). Fix : extraire le bloc débordant en nouvelle `<section class="page-break">` distincte.
- Chaque section porte `class="page-break"` (sauf la toute première) + un `<span class="uc-running-title">...</span>` au début (caché à l'écran, gardé pour réactivation future de Paged.js).
- Limites connues : pas de running headers, pas de numéros de page (Chrome native ne supporte pas CSS Paged Media ; Paged.js incompatible avec Tailwind v4 CDN — cf. skill `pdf-export` gotcha #8).
- **Toujours finir une tâche PDF par un lien ouvrable** (URL déployée si en ligne, sinon chemin local en markdown). Proactivement.

## Mots-clés du messaging deck
Positionnement : **AI Agent Builder** (test de marché en parallèle).
- **Utiliser** : AI agent, Cat 1/2/3, déterministe, raisonnement, multi-agents, shadow run, HITL, ground truth, evals.
- **Éviter** : AI automation, workflow, n8n, Zapier (saturés) — dire **ce que fait** l'agent, pas avec quoi.
