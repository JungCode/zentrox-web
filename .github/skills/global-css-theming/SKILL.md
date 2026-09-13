---
name: global-css-theming
description: 'Update app/globals.css with Zentrox base theme tokens, light/dark modes, and background/selection/focus styles. Use when refreshing global styles or re-aligning with Stitch UI references.'
argument-hint: 'Optional notes (palette updates, new tokens, or layout constraints)'
---

# Global CSS Theming

## When to Use

- Updating app/globals.css base styles
- Refreshing light/dark theme tokens
- Aligning global tokens with Stitch UI exports

## Procedure

1. Read app/globals.css and confirm the current token names and theme selectors.
2. Keep the theme selectors consistent:
   - Light: `:root, .theme-light, [data-theme='light']`
   - Dark: `:root.theme-dark, .theme-dark, .dark, [data-theme='dark']`
3. Keep `@custom-variant dark (&:is(.dark *))` at the top for Tailwind's dark variant.
4. Define token blocks for light and dark using the same variable names.
5. Update background/selection/focus styles to use the theme variables.
6. Ensure typography variables exist for `--font-sans`, `--font-headline`, `--font-mono`.
7. Preserve the `@theme inline` block and keep its `--color-*` / `--font-*` mappings in sync with CSS variable tokens.
8. Validate `color-scheme` is set for both themes.

## Quality Checks

- Light and dark blocks define the same variable list.
- No hard-coded colors in body/selection/focus styles.
- Token names remain stable to avoid breaking components.
- @theme inline values map to the same CSS variables.

## Notes

- If new tokens are added, add them to both theme blocks.
- Prefer subtle gradients in body background using theme variables.
