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
   - Entity-specific operations import from `<entity>.schemas.tsx` (e.g., `auth.schemas.tsx`); shared/generated types from `schemas.tsx`.
   - Pass generics to `useMutation`/`useQuery` for strict typing.
2. **Create a feature hook**
   - Place hooks in `src/features/<feature>/hooks/`.
   - Wrap `useMutation`/`useQuery` and expose a clear API.
3. **Handle lifecycle callbacks**
   - Use `onCompleted` for success side effects (cache updates, token storage, toasts, navigation).
   - Use `onError` for error handling — use `error.message` from the Apollo error, with a static description via toast.
4. **Expose a handler function**
   - Wrap `mutate` in an `async` function with a try/catch; return the data or `null`.
   - Expose `{ data, error, loading, <handlerFn> }`.
   - Keep components thin: no API logic in UI components.

## Quality Checklist

- Types are sourced from generated schemas, not redefined.
- Lifecycle side effects stay inside the hook.
- Components consume a clean handler function + state.
- No deep imports that bypass `index.ts` barrels.

## Example

```ts
import {
  LoginDocument,
  type LoginMutation,
  type LoginMutationVariables,
} from '@/shared/api/auth/auth.schemas';

const [mutate, { data, error, loading }] = useMutation<
  LoginMutation,
  LoginMutationVariables
>(LoginDocument, {
  onCompleted: (data) => {
    // success side effects, e.g. token storage, navigation, toast
  },
  onError: (error) => {
    toast.error(error.message, { description: 'Please try again.' });
  },
});

const login = async (email: string, password: string) => {
  try {
    const result = await mutate({ variables: { input: { email, password } } });
    return result.data?.login ?? null;
  } catch {
    return null;
  }
};
```
