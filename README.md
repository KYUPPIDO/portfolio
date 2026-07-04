# Portfolio - Valentin Bosson

Personal site of Valentin Bosson, full-stack developer in training at Zone01 Rouen, looking for an alternance in or around Rouen.

Live at [kyuppido.github.io/portfolio](https://kyuppido.github.io/portfolio/).

The design is a naturalist's field journal: the stack is drawn as a forest cross-section, and each project is explained through a hand-drawn ecological sketch.

## Languages

- English: [index.html](index.html)
- Français : [fr/index.html](fr/index.html)

Each page links to the other through the FR / EN toggle in the header.

## Structure

```
.
├── index.html        English version
├── fr/
│   └── index.html    French version
├── css/
│   └── style.css     All styling, shared by both pages
├── assets/
│   └── favicon.svg
└── README.md
```

## Stack

Plain HTML and CSS. No framework, no build step, no JavaScript. The illustrations are inline SVG, drawn by hand. The only external dependency is Google Fonts (Young Serif, Alegreya, Courier Prime).

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server
```

## Accessibility

- Skip link and visible focus styles
- `prefers-reduced-motion` respected (the hero illustration stops animating)
- Every illustration carries a text alternative
- Semantic landmarks and headings throughout
