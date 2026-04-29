---
name: toast-feedback
description: 'Use when adding toast-based user feedback. Standardizes Sonner toasts for success/error, optional actions, and avoids duplicate inline error UI.'
argument-hint: 'Toast type, title, description, optional action'
---

# Toast Feedback

## When to Use

- Showing success/error feedback after async actions
- Standardizing UI messaging with Sonner toasts
- Removing inline error panels in favor of toasts

## Procedure

1. **Use Sonner**
   - Import `toast` from `sonner`.
   - Ensure the `Toaster` is mounted in `app/layout.tsx`.
2. **Trigger toasts in hooks**
   - Use `onCompleted` for success messages.
   - Use `onError` for failure messages.
   - Prefer `toast.success()` and `toast.error()` to apply the correct styles.
3. **Keep messages concise**
   - Short title + descriptive text.
   - Add `action` only when there is a clear follow-up.
4. **Avoid duplication**
   - Do not show a separate inline error panel for the same event.

## Quality Checklist

- Toasts are triggered in hooks, not UI components.
- Messages are short, specific, and consistent.
- Success and error states are both covered.
- Success/error toasts use `toast.success()` / `toast.error()`.

## Example

```ts
toast.success('Signed in', {
  description: 'Welcome back to Zentrox.',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
});

toast.error('Unable to authenticate', {
  description: 'Please try again.',
});
```
