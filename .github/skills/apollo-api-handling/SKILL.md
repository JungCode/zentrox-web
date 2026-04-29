---
name: apollo-api-handling
description: 'Use when wiring Apollo Client mutations/queries and centralizing API logic in hooks. Covers typed documents, onCompleted/onError handling, and clean hook return APIs.'
argument-hint: 'Mutation/query name, feature area, and generated types'
---

# Apollo API Handler

## When to Use

- Adding or updating `useMutation`/`useQuery` hooks
- Centralizing GraphQL API handling in feature hooks
- Standardizing success/error flows for API calls

## Procedure

1. **Use typed documents**
   - Import generated documents and types from `src/shared/api/**`.
   - Pass generics to `useMutation`/`useQuery` for strict typing.
2. **Create a feature hook**
   - Place hooks in `src/features/<feature>/hooks/`.
   - Wrap `useMutation`/`useQuery` and expose a clear API.
3. **Handle lifecycle callbacks**
   - Use `onCompleted` for success side effects (cache updates, token storage).
   - Use `onError` for error handling and user feedback (via toast skill).
4. **Return a stable hook API**
   - Expose `{ data, error, loading, ...handlers }`.
   - Keep components thin: no API logic in UI components.

## Quality Checklist

- Types are sourced from generated schemas, not redefined.
- Lifecycle side effects stay inside the hook.
- Components consume a clean handler function + state.
- No deep imports that bypass `index.ts` barrels.

## Example

```ts
const [mutate, { data, error, loading }] = useMutation<
  LoginMutation,
  LoginMutationVariables
>(LoginDocument, {
  onCompleted: (data) => {
    // success side effects
  },
  onError: (_error) => {
    // toast error
  },
});
```
