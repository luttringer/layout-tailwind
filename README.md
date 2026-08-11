# layout-tailwind

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8-DD3A0A?style=flat-square&logo=postcss&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

Base de desarrollo con **Tailwind CSS v4**, PostCSS, nesting CSS nativo, minificación JS por archivo con Terser y Material Symbols variable font.

---

## Stack

| Herramienta | Rol |
|---|---|
| Tailwind CSS v4 | Utilidades + design tokens via `@theme` |
| PostCSS + postcss-nesting | Pipeline CSS + nesting W3C spec |
| cssnano | Minificación CSS en build |
| Terser | Minificación JS individual por archivo |
| sirv-cli + concurrently | Servidor de dev en localhost:3000 |
| Material Symbols | Iconografía variable font (Google) |
| Inter | Tipografía principal (Google Fonts) |

---

## Inicio rápido

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Los cambios de CSS se compilan automáticamente — refrescá el navegador para verlos (o usá la extensión **Live Server** de VS Code para recarga automática).

---

## Scripts

```bash
npm run dev        # Servidor de dev + watch CSS con source maps
npm run build      # CSS minificado + JS minificado (salida en dist/)
npm run build:css  # Solo CSS → dist/css/main.min.css
npm run build:js   # Solo JS  → dist/js/*.min.js (un archivo por fuente)
```

---

## Estructura

```
layout-tailwind/
├── src/
│   ├── css/
│   │   └── main.css          ← Punto de entrada CSS + tokens @theme
│   └── js/
│       └── main.js           ← JS fuente (agregar archivos según necesidad)
├── dist/
│   ├── css/
│   │   ├── main.css          ← Dev output (generado, no commitear)
│   │   └── main.min.css      ← Build output minificado
│   └── js/
│       └── *.min.js          ← JS minificados individuales (generados)
├── scripts/
│   └── build-js.js           ← Script Terser — procesa todos los .js de src/js/
├── index.html
├── postcss.config.js
├── package.json
└── .gitignore
```

---

## Variables y design tokens (Tailwind v4)

Tailwind v4 usa `@theme` en el CSS en lugar de `tailwind.config.js`. Los tokens se exponen como variables CSS nativas **y** como clases utilitarias.

```css
/* src/css/main.css */
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;

  --color-brand-500: oklch(0.55 0.22 250);
  --color-brand-700: oklch(0.40 0.18 250);
}
```

Esto genera automáticamente clases como `font-sans`, `text-brand-500`, `bg-brand-700`, etc., y las variables `var(--color-brand-500)` disponibles en cualquier CSS.

---

## CSS Nesting (W3C spec)

El plugin `postcss-nesting` permite sintaxis de nesting moderna compatible con el estándar:

```css
.card
{
  padding: 1rem;

  & .card-title
  {
    font-weight: 600;
  }

  &:hover
  {
    opacity: 0.9;
  }
}
```

---

## Agregar archivos JS

Cualquier `.js` que agregues en `src/js/` se minifica individualmente al correr `npm run build:js`. El archivo de salida queda en `dist/js/nombre.min.js`.

---

## Material Symbols

Importado como variable font en `index.html`. Ajustá los ejes opcionales inline:

```html
<span class="material-symbols-outlined"
  style="font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24">
  favorite
</span>
```

Buscá iconos disponibles en → **[fonts.google.com/icons](https://fonts.google.com/icons)**

---

## Tipografía

Inter se importa desde Google Fonts y se define como variable en `@theme`:

```css
@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

Para cambiar la fuente, reemplazá el `<link>` en `index.html` y actualizá `--font-sans` en `main.css`.
