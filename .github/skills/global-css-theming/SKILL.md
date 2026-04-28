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
2. Keep the theme selectors consistent: .theme-light / .theme-dark (class-based).
3. Define token blocks for light and dark using the same variable names.
4. Update background/selection/focus styles to use the theme variables.
5. Ensure typography variables exist for body/headline/mono.
6. Preserve Tailwind @theme inline mappings and keep them in sync with tokens.
7. Validate color-scheme is set for both themes.

## Quality Checks

- Light and dark blocks define the same variable list.
- No hard-coded colors in body/selection/focus styles.
- Token names remain stable to avoid breaking components.
- @theme inline values map to the same CSS variables.

## Notes

- If new tokens are added, add them to both theme blocks.
- Prefer subtle gradients in body background using theme variables.
