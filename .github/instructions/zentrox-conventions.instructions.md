---
description: 'Use when writing or editing Zentrox Next.js app code, shadcn/ui components, Tailwind styles, or GraphQL/Apollo features. Covers structure, aliases, codegen workflow, and linting rules.'
applyTo: 'app/**, src/**, scripts/**'
---

# Zentrox Web Conventions

## Stack and routing

- Next.js app router lives in app/. Add "use client" for components that use hooks or browser APIs.
- React 19 with strict TypeScript. Prefer typed props and ReactNode for children.
- Use path aliases from tsconfig: @/ maps to src, and @/app maps to app.

## Structure

- Routes and layouts live in app/, with route groups (private)/ and (public)/ for auth-gated vs public pages. The private app shell is under (private)/app/.
- Feature modules live in src/features/<feature>, with a feature-level index.ts barrel for features that expose public APIs (e.g. workflow, landing). Features with only internal usage (e.g. auth) may omit the top-level index.ts.
- Feature components can be folder-based: src/features/<feature>/components/<Component>/ with index.ts and optional sub-folders. Simple, self-contained components may also be flat files: src/features/<feature>/components/<Component>.tsx.
- Features may also contain constants/, hooks/, and types/ subdirectories alongside components/.
- Shared building blocks live in src/shared, split into api/, assets/, components/, constants/, helpers/, hooks/, stores/, types/, and utils/.
- UI primitives live in src/shared/components/ui (shadcn/radix). Prefer these before custom controls.
- Shared layout components live in src/shared/components/Layout/ (AppHeader, AppSidebar, UserDropdown).
- Theme utilities live in src/shared/components/Theme/ (ThemeProvider, ThemeToggle).
- Shared hooks live in src/shared/hooks/, with UI-specific hooks under src/shared/hooks/ui/.
- Global state stores live in src/shared/stores/ with an index.ts barrel.

## Component exports and functions

- Use arrow functions for all components.
- app/**/page.tsx and app/**/layout.tsx must use default exports.
- All other components use named exports (export { Component }).
- These export rules do not apply to src/shared/components/ui (keep shadcn defaults).
- Use named/module exports for constants, hooks, and utilities (avoid default exports).
- Add or update an index.ts barrel in the closest folder when adding a new module.
- Re-export new modules from the feature-level index.ts to avoid deep imports.
- Keep src/shared/components/ui reserved for shadcn/radix primitives; place custom components in src/shared/components with PascalCase filenames and export them from src/shared/components/index.ts when they are meant to be consumed broadly.

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
| | | | |- <Component>.tsx # flat component (simple cases)
| | | |- constants/
| | | |- hooks/
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

## UI primitives

- Always use the shadcn `Button` component (`@/shared/components/ui/button`) instead of a native `<button>` element.
- Always use the shadcn `Input` component (`@/shared/components/ui/input`) instead of a native `<input>` element.
- Never render bare `<button>` or `<input>` HTML elements in feature or shared components. The only exception is inside `src/shared/components/ui/` itself (shadcn source files).

## Styling and theme

- Tailwind v4 is configured via app/globals.css imports and @theme inline tokens.
- Prefer theme variables from globals.css (background, foreground, primary, etc.) over hard-coded colors.
- Use cn from src/lib/ui/utils (aliased as @/lib/ui/utils) for class merging.

## GraphQL and API

- Apollo client lives in src/lib/apollo/index.ts, and the shared wrapper is src/shared/components/ApolloWrapper.tsx.
- GraphQL documents live under src/shared/api/<entity>/\*\* as .gql or .graphql.
- Generated types live in src/shared/api/<entity>/schemas.tsx and \*.schemas.tsx. Do not edit generated files.
- Run pnpm codegen to select entity and regenerate types. CODEGEN_ENTITY and NEXT_PUBLIC_API_ENDPOINT drive codegen.

## Linting and formatting

- ESLint enforces sorted imports, JSX props, and object/type keys (perfectionist + simple-import-sort).
- Prettier with prettier-plugin-tailwindcss is used; avoid manual formatting that fights the plugin.
