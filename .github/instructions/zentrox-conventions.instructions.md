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

- Routes and layouts live in app/, with segment folders containing layout.tsx and page.tsx.
- Feature modules live in src/features/<feature>, with feature-level exports in index.ts (required).
- Feature components are folders: src/features/<feature>/components/<Component>/ with index.ts and optional components/ and hooks/.
- Shared building blocks live in src/shared, split into api/, components/, constants/, helpers/, and utils/.
- UI primitives live in src/shared/components/ui (shadcn/radix). Prefer these before custom controls.

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
| |- <segment>/
| | |- layout.tsx
| | |- page.tsx
| | |- ...
|
|- src/
| |- features/
| | |- auth/
| | | |- index.ts # required feature exports
| | | |- components/
| | | | |- LoginForm/
| | | | | |- index.ts # component entry
| | | | | |- components/
| | | | | |- hooks/
| | | |- hooks/
| | | |- ... # other features
| |- shared/
| | |- api/
| | | |- auth/
| | | | |- auth.schemas.tsx
| | | | |- schemas.tsx
| | | | |- mutations/
| | | | |- queries/
| | |- components/
| | | |- ApolloWrapper.tsx
| | | |- ComingSoonModal.tsx
| | | |- index.ts
| | | |- ui/
| | | | |- alert.tsx
| | | | |- button.tsx
| | | | |- checkbox.tsx
| | | | |- ...
| | |- constants/
| | |- helpers/
| | |- utils/
| | |- ... # other shared modules

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
