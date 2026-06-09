# Diagrammes D2 (diagram-as-code)

Schémas = **D2**, namespacés par prospect dans `decks/<slug>/diagrams/`. **Pas de SVG inline.** Partir du template `templates/diagram-dark.d2` (palette, classes, theme override, font sizes 32/28/26 déjà calibrés).

> Tous les chemins sont relatifs à la racine du repo `tc_website/` (cwd quand on travaille dans le projet).

## Workflow par diagramme
```bash
mkdir -p decks/<slug>/diagrams                  # un dossier par prospect, jamais de collision
cp templates/diagram-dark.d2 decks/<slug>/diagrams/<nom>-dark.d2
# customise nodes/edges, puis compile en DEUX formats :
d2 --layout elk --pad 30           decks/<slug>/diagrams/<nom>-dark.d2 decks/<slug>/diagrams/<nom>-dark.svg
d2 --layout elk --pad 30 --scale 3 decks/<slug>/diagrams/<nom>-dark.d2 decks/<slug>/diagrams/<nom>-dark.png
```

## Pourquoi les deux formats (SVG + PNG)
Chrome `--print-to-pdf` rend les flèches/markers SVG de manière **instable** (apparaissent/disparaissent selon le zoom du viewer PDF — bug connu). Le PNG `--scale 3` (~460 DPI sur slide A4 landscape) garantit un rendu identique sur tous les viewers.
- **PNG** (`.schema-dark`) = ce qui s'affiche **écran ET PDF** (le seul rendu réellement visible).
- **SVG** (`.schema-light`) = source vectorielle / fallback, **masquée partout** (cf. CSS ci-dessous). On la régénère quand même par cohérence, mais ne pas se fier au SVG pour valider un rendu — **vérifier le PNG**.

## Styling des flèches (edges) — gotchas

- **Flèche pleine** : `stroke-width 8-10` OK. Plus le trait est épais, plus la pointe (marker) est grosse ; sur une courbe en S courte (fork serré, ~80px de couloir) un `width 10` paraît pincé/coudé → redescendre à `8`.
- **Flèche pointillée** : D2 calcule la longueur de tiret comme **`stroke-dash × stroke-width`**. Un trait épais (`width 10` + `stroke-dash 4`) = tirets de 40px qui, sur une branche courte, se découpent en 2-3 stubs + une pointe détachée → on dirait **une flèche cassée ou doublée**. Règle : edge pointillée = **trait fin (`width 4-5`) + `stroke-dash 2`** → tirets ~8-10px = ligne pointillée nette avec une seule pointe. Le pointillé porte déjà le sens « optionnel » ; pas besoin de l'épaissir. *(Incident benoit-pagny slide 5, juin 2026.)*
- Toujours **vérifier le PNG re-rendu** (pas juste le SVG) après un changement d'edge : c'est le PNG qui s'affiche écran **et** PDF (le SVG `.schema-light` est masqué partout, fallback non affiché).

## Embed dans le HTML deck
```html
<img src="diagrams/ucN-dark.png" class="schema-dark  w-full h-auto block" />
<img src="diagrams/ucN-dark.svg" class="schema-light w-full h-auto block" />
```
CSS toggle : `.schema-light { display: none }` partout. `.schema-dark { display: block; max-height: 560px; ... }` à l'écran, `max-height: 145mm` en print (128mm pour le slide architecture du format lean).
