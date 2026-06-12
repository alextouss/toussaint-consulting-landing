# Toussaint Consulting — Landing Page + Prospect Follow-ups

## Objectif

Ce projet sert **deux usages** :

1. **Landing page** (`index.html`) — Toussaint Consulting, AI & data product leader freelance. **Positionnement problème-first (12 juin 2026)** : H1 "AI SYSTEMS THAT MAKE IT TO PRODUCTION." — le titre nomme le problème résolu (le gap pilote→production), pas les compétences. Tilt vertical finance (fonds d'investissement & équipes finance) dans le sub, trust bar, About et meta ; le rebrand vertical NOMINAL du H1 reste conditionné à 2-3 deals finance payés. Deux offres inchangées : product leadership (freelance PM, fractional CPO) + product building (systèmes IA production-grade, robustesse prouvée : tests + evals + mesure sur de vraies données ; l'ancien framing "MVP 4-6 semaines" est retiré depuis juin 2026). Section `#what-i-build` : 2 cartes use-case représentatives, jamais de citations clients ni de métriques inventées. Cf. `market-analysis-ai-transformation-2026.md` (marché) et `positioning-icp-strategy-2026-06.md` (ICP, offre, système outbound).

2. **Slide-deck PDF sur mesure par prospect** — pour chaque prospect, produire un **PDF format slide-deck** (A4 landscape, dark brandé edge-to-edge) à envoyer après un call de découverte. Deux formats : Discovery 3-UCs (~16 slides, 3 douleurs distinctes) et Lean proposition (~9 slides, 1 idée / wedge). L'HTML est l'intermédiaire, chaque `<section>` = une slide.

   👉 **Toute la procédure de build vit dans le skill `prospect-deck`** (workflow, choix de format, structure slide-par-slide, diagrammes D2, règles éditoriales, captures) — l'invoquer dès qu'on crée ou édite un deck prospect. L'export PDF final est délégué au skill `pdf-export`. Inputs privés dans `prospects/<slug>/` (gitignoré), livrables publics dans `decks/<slug>/` (noindex).

## Stack Technique

- **HTML unique** (`index.html`) + **Tailwind CSS v4** via CDN
- **Pas de build tools** — ouvrir `index.html` directement dans le navigateur
- Fonts landing : **Clash Display** (Fontshare) + **Bitter** + **Inter** (Google Fonts)
- Fonts prospects : self-hostées dans `assets/fonts/*.css` (les CDNs bloquent CORS sur XHR — nécessaire pour fiabilité de l'export PDF). Les `@font-face` pointent toujours sur les woff2 CDN.
- Vanilla JS uniquement (animations, menu mobile, i18n, scroll reveal)
- **Export PDF prospects** : Chrome headless `--print-to-pdf`, dark theme préservé (pas de flip light). Cf. skill `pdf-export`.
- **Deploiement** : Vercel (config dans `.vercel/`)

## Deploiement

- **URL live** : https://toussaint-consulting.com/
- **Alias** : `toussaint.consulting`
- **Hebergement** : Vercel (config dans `.vercel/`)
- **Auto-deploy GitHub activé** (depuis 2026-05-27 via `vercel git connect`) : chaque `git push origin main` déclenche un deploy production en ~10s. Repo lié : `alextouss/toussaint-consulting-landing`. Plus besoin de `vercel --prod` manuel sauf pour tester un build sans push.
- **Vérifier deploy en ligne** : `curl -s -o /dev/null -w "%{http_code}\n" https://toussaint-consulting.com/decks/<slug>/<slug>.html` doit retourner `200`.
- **Redirects** : `vercel.json` (racine) redirige les anciennes URLs racine (`/capgemini-openinnov.html`, `/kanaan-anti-churn.html`, …) vers `/decks/<slug>/<slug>.html`. Ajouter une entrée par deck déplacé.

## Structure du Projet

```
tc_website/
  index.html                       <- Landing page (publique, indexée)
  alexandre-toussaint-cv.html      <- CV perso d'Alex (light editorial cream, A4 portrait 2 pages, noindex, non lié)
  Alexandre_Toussaint_CV.pdf       <- PDF exporté du CV
  CLAUDE.md                        <- Ce fichier
  competitive-analysis.md          <- Analyse concurrentielle
  market-analysis-ai-transformation-2026.md <- Analyse marché (2 juin 2026) : commoditisation, wedge PME, pricing
  positioning-icp-strategy-2026-06.md <- Stratégie ICP/positionnement + système outbound (12 juin 2026)
  vercel.json                      <- Redirects : anciennes URLs racine -> /decks/<slug>/
  .gitignore                       <- !decks/**/*.png + !.claude/skills/ pour whitelister
  .vercel/                         <- Config deploiement Vercel
  .claude/skills/prospect-deck/    <- Skill : procédure de build des decks (format, diagrammes, éditorial)
  screenshots/                     <- Captures Playwright (clean up après chaque session)
  scripts/
    print-preview.mjs              <- Playwright headless + print media emulation (itération layout)
    regen-benoit-captures.mjs      <- Playwright : re-rend/margine les captures démo (marges propres, fix l'asset)
  templates/                       <- Scaffolds réutilisables pour nouveaux prospects
    prospect-deck.html             <- HTML 3-UCs avec tokens {{PROSPECT_NAME}} (paths ../../assets)
    diagram-dark.d2                <- D2 dark template (classes + theme override)
  decks/                           <- Livrables PUBLICS, 1 dossier/prospect (déployé à /decks/<slug>/)
    capgemini-openinnov/           <- Format 3-UCs, livré
      capgemini-openinnov.html     <- Deck (source HTML du PDF)
      capgemini-openinnov_Brief.pdf
      diagrams/                    <- uc1/uc2/uc3 × dark(+light optionnel)
        uc1-dark.{d2,svg,png}      <- Dark = écran ET PDF (PNG --scale 3 pour PDF reliability)
        uc1-light.{d2,svg}         <- Light = optionnel, version imprimable papier
    kanaan-anti-churn/             <- Format lean, livré
      kanaan-anti-churn.html
      kanaan-anti-churn_Brief.pdf
      diagrams/poc-dark.{d2,svg,png}
      proto/                       <- screenshots prototype (dashboard.png, detail-*.png)
    <slug>/                        <- 1 dossier par futur prospect (html + pdf + diagrams/)
  prospects/                       <- GITIGNORÉ · INPUTS privés, 1 dossier/prospect
    outreach/                      <- GTM privé : séquences LinkedIn (VC/PE Paris), copies profil, bannière
    <slug>/
      notes.md                     <- Contact + use cases bruts du call + à-faire
      (transcript, email reçu, pièces jointes déposés ici)
  assets/                          <- Partagé (référencé via ../../assets depuis les decks)
    favicon.svg                    <- Favicon SVG (terracotta + T)
    alex-portrait.jpeg             <- Photo portrait (OG image)
    logo.png                       <- Logo export
    linkedin-cover.png             <- Cover LinkedIn
    fonts/                         <- CSS self-hostés (woff2 toujours via CDN @font-face)
```

**Fichiers prospects** : livrables publics dans `decks/<slug>/` (html + pdf + diagrams/, déployé, `noindex` obligatoire), inputs privés dans `prospects/<slug>/` (gitignoré, jamais déployé). Règles détaillées (paths, versioning, captures) → skill `prospect-deck` (`references/editorial.md`).

## Direction Esthetique

**"Monochrome Kinetic"** — noir pur + accent terracotta + bleu tech, typographie massive, animations editoriales :

### Palette
- Background : `#0A0A0A` (void)
- Surface : `#1A1410` / `#251F18`
- Borders : `#2A251E` / `#3A342A`
- Text : `#E8DCC4` (off-white chaud)
- Text secondary : `#B8AFA0` / `#8A837A`
- Accent : `#C97A5F` (terracotta — Product Building)
- Tech : `#4A9EFF` (bleu tech — Product Leadership)

### Typographie
- **Display** : Clash Display (Fontshare) — bold, uppercase
- **Subheading** : Bitter (serif)
- **Body** : Inter (clean sans-serif)

### Principes Visuels
- Layouts asymetriques
- Negative space genereux
- Card glow hover effect (mouse tracking)
- Grid pattern subtil en background du hero
- Animations : fadeInUp, scroll reveal (IntersectionObserver), float

## Sections de la Landing (`index.html`)

1. **Navbar** — sticky, frosted glass dark, 5 liens (Services, What I Build, How I Work, About, Contact), toggle langue FR/EN, CTA "Book a Call" (Google Calendar)
2. **Hero** — "AI SYSTEMS THAT MAKE IT / TO PRODUCTION." (3 lignes équilibrées, breaks explicites via `hero.headline1` en data-i18n-html) + sub problème-first (gap pilote→production, fonds d'investissement & équipes finance) + terminal mockup (--help style) + trust bar (10+ yrs, 15+ products, Fintech·Data·Asset Management) + floating badges (Available, Strategy → Execution)
3. **Services** — 2 cartes 50/50 (6+6 cols) : Product Leadership (bleu tech) + Product Building (terracotta)
4. **What I Build** (`#what-i-build`) — 2 cartes use-case représentatives : Document Extraction + Reporting & Data Assembly. Framing "ce que je construis" (systèmes communs), PAS des cas clients : aucune citation client, aucune métrique inventée ; chaque carte finit sur une proof line (mesuré sur vos données / chiffres traçables)
5. **How I Work** — 3 principes : Understand Fast, Build Lean, Iterate Relentlessly
6. **About** — "Product Leader Who Builds." + key facts grid + bio "fintech, data, asset management", sans noms d'employeurs
7. **Contact** — "LET'S WORK TOGETHER." + 2 cartes (Calendar + Email), pas de formulaire
8. **Footer** — logo + nav + connect (LinkedIn, Email, Book a Call)

## i18n

- Toggle FR/EN dans la navbar (desktop + mobile)
- Traductions inline en JS via attributs `data-i18n` sur les elements
- Langue par defaut : anglais

## Contenu Business

### Toussaint Consulting
- **Fondateur** : Alexandre Toussaint
- **Entite** : Toussaint Technologies SASU
- **Marque commerciale** : Toussaint Consulting
- **Positionnement (juin 2026)** : AI & Data Product Leader — des systèmes IA pour fonds d'investissement & équipes finance, qui arrivent en production (testés, mesurés sur de vraies données). 3 différenciateurs : finance first (10 ans fintech/asset management), jugement produit avant le code, preuve mesurée. Headline LinkedIn alignée : "AI systems for investment firms & finance teams · Tested, measured, reliable in production · AI & Data Product Leader".
- **ICP (stratégie 12 juin 2026)** : (A) fonds PE midcap français 10-50 pers. + leurs participations (entrée : IC memo / LP reporting / DDQ / KPIs portcos ; expansion via operating partner) ; (B) fonction finance des PME via prescripteurs (DAF externalisés type Benoit Pagny, experts-comptables, DFCG). Ne plus cibler : COO/founders génériques, grands comptes en direct, SGP <20 pers. Détail → `positioning-icp-strategy-2026-06.md`.
- **Offre 1** : Product Leadership — embedded PM (3-6 mois), fractional CPO, product audits, roadmap
- **Offre 2** : Product Building — construire et fiabiliser des logiciels et systèmes IA production-grade, de bout en bout. Différenciateur = robustesse prouvée (tests + evals + mesure sur de vraies données), ancrée sur la force data PM. "Run" (opérer dans la durée) proposé en option. Ladder : POC 3-8K€ → build 10-20K€ (fonds : 15-40K€) → run 1,5-3K€/mois → fractional AI lead 5-10K€/mois (jamais affiché sur le site). Ancien framing "MVP en 4-6 semaines" retiré (juin 2026, commoditisé).
- **Side projects** : Closter (AI lead gen B2B), Seya (SaaS data intelligence — ne pas citer comme Chrome extension en public)
- **Langues** : Francais, Anglais
- **Email** : a.toussaint@toussaint-consulting.com
- **LinkedIn** : `linkedin.com/in/alexandre-toussaint` (vérifié, URL correcte)
- **Booking** : Google Calendar (`calendar.app.google/w35WNGT9Lsk65n5x8`)

### Mots-cles du messaging

**Landing page** (`index.html`) :
- Utiliser : AI systems, production, pilot to production, tested, measured on real data, reliable, investment firms, finance teams, product leadership, execution, embed, build, ship, end-to-end, fractional CPO, freelance PM
- Eviter : AI automation, workflow, n8n, Make, Zapier, ROI (galvauge), transformation, solutions ; jamais de citations clients ni de métriques inventées sur la landing

**Follow-up prospects** : positionnement AI Agent Builder + listes utiliser/éviter → skill `prospect-deck` (`references/editorial.md`).

## Regles

- **Pas de ton IA** : pas d'em-dash (—), pas de formulations generiques type ChatGPT. Ecriture directe, phrases courtes, ton humain. S'applique à la landing ET aux follow-ups prospects.
- **Landing** : garder le fichier unique `index.html`, pas de framework, pas de build
- Privilegier la qualite visuelle et l'originalite sur la rapidite
- Pas de noms d'employeurs sur la landing (SESAMm, Finance Active, etc.) — les follow-ups peuvent citer des cas anonymisés
- Pas de metriques non verifiables. Pour les follow-ups : uniquement des preuves marché publiques avec URL (règles détaillées dans le skill `prospect-deck`).
- Pricing : pas de prix affiches, discovery call uniquement
- Screenshots Playwright si debug visuel necessaire : `npx playwright screenshot --browser chromium --wait-for-timeout 3000 --viewport-size "1440,900"`
- **Toujours finir une tâche PDF par un lien ouvrable** : dès qu'on produit ou met à jour un PDF (CV ou proposition/follow-up prospect), terminer la réponse en donnant un lien cliquable pour l'ouvrir tout de suite — l'URL web déployée si le fichier est en ligne (`https://toussaint-consulting.com/<nom>.pdf`, et/ou la page `.html`), sinon le chemin local du PDF en lien markdown relatif. Le faire proactivement, sans que l'utilisateur ait à le demander.
