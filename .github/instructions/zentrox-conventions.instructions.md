---
description: 'Use when writing or editing Zentrox Next.js app code, shadcn/ui components, Tailwind styles, or GraphQL/Apollo features. Covers structure, aliases, codegen workflow, and linting rules.'
applyTo: '**'
---

# Zentrox Web Conventions

## Stack and routing

- Next.js app router lives in app/. Add "use client" for components that use hooks or browser APIs.
- React 19 with strict TypeScript. Prefer typed props and ReactNode for children.
- Use path aliases from tsconfig: @/ maps to src, and @/app maps to app.

## Structure

- Routes and layouts live in app/, with route groups (private)/ and (public)/ for auth-gated vs public pages. The private app shell is under (private)/app/.
- Feature modules live in src/features/<feature>, with a feature-level index.ts barrel for features that expose public APIs (e.g. workflow, landing). Features with only internal usage (e.g. auth) may omit the top-level index.ts.
- Shared building blocks live in src/shared, split into api/, assets/, components/, constants/, helpers/, hooks/, stores/, types/, and utils/.
- UI primitives live in src/shared/components/ui (shadcn/radix).
- Shared layout components live in src/shared/components/Layout/ (AppHeader, AppSidebar, UserDropdown).
- Theme utilities live in src/shared/components/Theme/ (ThemeProvider, ThemeToggle).
- Shared hooks live in src/shared/hooks/, with UI-specific hooks under src/shared/hooks/ui/.
- Global state stores live in src/shared/stores/ with an index.ts barrel.

Structure map:

|- app/
| |- layout.tsx
| |- page.tsx
| |- (private)/ # auth-gated pages
| | |- app/
| | | |- layout.tsx
| | | |- <feature>/
| |- (public)/ # unauthenticated pages
| | |- layout.tsx
| | |- <route>/
|
|- src/
| |- features/
| | |- <feature>/
| | | |- index.ts # barrel (if feature has public API)
| | | |- components/
| | | | |- <Component>/ # folder component (index.ts + tsx)
| | | | |- <Component>.tsx # flat component (small leaf only)
| | | |- constants/
| | | |- hooks/
| | | |- helpers/
| | | |- types/
| |- shared/
| | |- api/
| | | |- <entity>/
| | | | |- schemas.tsx # generated — do not edit
| | | | |- mutations/ # .gql files
| | | | |- queries/ # .gql files
| | |- assets/
| | |- components/
| | | |- index.ts
| | | |- Layout/ # AppHeader, AppSidebar, etc.
| | | |- Theme/ # ThemeProvider, ThemeToggle
| | | |- ui/ # shadcn/radix primitives
| | |- constants/
| | |- helpers/
| | |- hooks/
| | | |- ui/ # UI-specific hooks
| | |- stores/
| | |- types/
| | |- utils/

## Component exports and functions

- Use arrow functions for all components.
- app/**/page.tsx and app/**/layout.tsx must use default exports.
- All other components use named exports (export { Component }).
- These export rules do not apply to src/shared/components/ui (keep shadcn defaults).
- Use named/module exports for constants, hooks, and utilities (avoid default exports).
- Add or update an index.ts barrel in the closest folder when adding a new module.
- Re-export new modules from the feature-level index.ts to avoid deep imports.
- Keep src/shared/components/ui reserved for shadcn/radix primitives; place custom components in src/shared/components with PascalCase filenames and export them from src/shared/components/index.ts when they are meant to be consumed broadly.

## Mandatory UI primitive and component reuse

**Do not start UI work by writing new JSX. First inspect existing shadcn/radix primitives, shared components, and feature components, then compose from them.**

Before creating any new UI component or JSX block, inspect existing components in this order:

1. `src/shared/components/ui/` — shadcn/radix primitives.
2. `src/shared/components/` — shared app-level components.
3. `src/features/<feature>/components/` — feature-specific components.
4. Sibling/parent component folders in the current feature.

**Do not recreate UI that already exists.** The following must never be built from scratch — always use the existing shadcn/radix implementation:

button, input, dialog, dropdown, select, card, toast, tooltip, popover, table, badge, avatar, skeleton, tabs, accordion, form field, layout primitive

Rules:

- Never render bare `<button>` or `<input>` elements in feature or shared components. The only exceptions are inside `src/shared/components/ui/` itself and documented edge cases (hidden inputs, file inputs).
- Use `Button` from `@/shared/components/ui/button`.
- Use `Input` from `@/shared/components/ui/input`.
- Use existing shadcn/radix primitives whenever available.
- Use shared app components from `src/shared/components/` whenever available.
- Creating duplicate UI instead of reusing existing shared/shadcn components is not allowed.

## Component folder structure

Non-trivial components must follow this folder pattern:

```txt
Parent/
  Parent.tsx
  index.ts
  Child.tsx
  SubParent/
    SubParent.tsx
    index.ts
    Child.tsx
```

Rules:

- The folder name must match the main component name.
- The main implementation file must be `<ComponentName>.tsx`.
- Every component folder must have an `index.ts` that exports the public API for that folder.
- Child components that only belong to a parent context must stay inside the parent folder.
- Nested semantic groups must become nested folders.
- Do not put unrelated components in the same file.
- Flat component files (`<Component>.tsx`) are allowed only for small leaf components with no child components, no local hooks, no complex conditional rendering, and no meaningful semantic sub-sections. When in doubt, use a folder-based component.
- Avoid vague names like `Section`, `Content`, `Item`, or `Wrapper` unless the parent context makes the meaning obvious. Prefer semantic names: `WorkflowHeader`, `WorkflowToolbar`, `WorkflowEmptyState`, `WorkflowFilterControls`, etc.

## Semantic component extraction

**Splitting JSX into semantic child components is required for readability.**

A JSX block must become a child component when any of these are true:

- It represents a meaningful part of the UI.
- It has its own conditional rendering, loading, empty, error, or success state.
- It contains repeated UI.
- It has more than one interaction handler.
- It uses form logic, list/table rendering, filtering, sorting, or mapping.
- It makes the parent component hard to scan.

If a component file grows beyond roughly 150–200 lines, or mixes layout, data mapping, empty/loading/error states, forms, dialogs, and actions, split it into semantic child components before continuing.

Parent components should read like a high-level outline of the screen:

```tsx
export const WorkflowPage = () => {
  return (
    <div>
      <WorkflowHeader />
      <WorkflowToolbar />
      <WorkflowContent />
    </div>
  );
};
```

## Feature folder boundaries

Hooks, helpers, constants, and types must live in feature-level folders. **Do not create these folders inside component folders.**

```txt
src/features/<feature>/
  components/
  constants/
  hooks/
  helpers/
  types/
```

Rules:

- Component folders should contain component `.tsx` files, nested component folders, and `index.ts`. Do not add `hooks/`, `helpers/`, `constants/`, or `types/` directories inside component folders.
- Move feature-level hooks to `src/features/<feature>/hooks/`.
- Move feature-level helpers to `src/features/<feature>/helpers/`.
- Move feature-level constants to `src/features/<feature>/constants/`.
- Move feature-level types to `src/features/<feature>/types/`.
- Move shared/global hooks, helpers, constants, or types to the matching folder under `src/shared/`.
- The only type or interface allowed inside a component file is the local props type for that component (e.g. `interface WorkflowHeaderProps`). All other types must live in the feature-level or shared `types/` folder.
- If a hook, helper, constant, or type starts as component-local but becomes reused, complex, or independently meaningful, move it to the correct feature-level folder immediately.

## Before writing code checklist

1. Inspect `src/shared/components/ui/` for existing shadcn/radix primitives.
2. Inspect `src/shared/components/` for existing shared components.
3. Inspect the target feature's components.
4. Reuse or extend existing components whenever possible.
5. Only create a new component after confirming no suitable component exists.
6. Split UI into semantic child components before the parent file becomes hard to read.
7. Put hooks, helpers, constants, and non-props types in the correct feature-level or shared folders.

## Styling and theme

- Tailwind v4 is configured via app/globals.css imports and @theme inline tokens.
- Prefer theme variables from globals.css (background, foreground, primary, etc.) over hard-coded colors.
- Use cn from src/lib/ui/utils (aliased as @/lib/ui/utils) for class merging.

## GraphQL and API

- Apollo client lives in src/lib/apollo/index.ts, and the shared wrapper is src/shared/components/ApolloWrapper.tsx.
- GraphQL documents live under src/shared/api/<entity>/** as .gql or .graphql.
- Generated types live in src/shared/api/<entity>/schemas.tsx and *.schemas.tsx. Do not edit generated files.
- Run pnpm codegen to select entity and regenerate types. CODEGEN_ENTITY and NEXT_PUBLIC_API_ENDPOINT drive codegen.

## Linting and formatting

- ESLint enforces sorted imports, JSX props, and object/type keys (perfectionist + simple-import-sort).
- Prettier with prettier-plugin-tailwindcss is used; avoid manual formatting that fights the plugin.

## Instruction priority

- Follow this file for general repository conventions.
- When a Claude skill under `.claude/skills/*/SKILL.md` is more specific to the task, follow that skill instead.
- Do not edit generated files (schemas.tsx, *.schemas.tsx) directly. Update source .gql files or codegen config and re-run codegen.

## Validation

Before considering a code change complete, run the relevant checks:

- `pnpm lint` — after any code change.
- `pnpm check-types` — after TypeScript changes.
- `pnpm codegen` — after any GraphQL document change.
- `pnpm build` — after routing, layout, or Next.js config changes.
