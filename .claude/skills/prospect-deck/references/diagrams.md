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
- **SVG** = aperçu HTML écran.
- **PNG** = embed dans le PDF.

## Embed dans le HTML deck
```html
<img src="diagrams/ucN-dark.png" class="schema-dark  w-full h-auto block" />
<img src="diagrams/ucN-dark.svg" class="schema-light w-full h-auto block" />
```
CSS toggle : `.schema-light { display: none }` partout. `.schema-dark { display: block; max-height: 560px; ... }` à l'écran, `max-height: 145mm` en print (128mm pour le slide architecture du format lean).
