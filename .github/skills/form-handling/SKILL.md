---
name: form-handling
description: 'Use when building forms with react-hook-form and schema validation. Covers zod schema setup, resolver wiring, field registration, and error display.'
argument-hint: 'Form name, schema file, and field list'
---

# Form Handling

## When to Use

- Building or updating forms with `react-hook-form`
- Adding Zod validation and `zodResolver`
- Displaying field-level validation errors

## Procedure

1. **Define the schema**
   - Create or update a Zod schema in `src/features/<feature>/constants/`.
   - Use explicit rules and clear, user-facing messages.
2. **Set up the form**
   - Use `useForm<T>({ resolver: zodResolver(schema), defaultValues: {...} })`.
   - Always provide `defaultValues` to avoid uncontrolled-to-controlled warnings.
   - Form value type (`T`) can be sourced from generated API schemas (`@/shared/api/<entity>/schemas`).
   - Register fields with `register('field')`.
3. **Show validation errors**
   - Display `errors.field?.message` near each input as `<p className="text-danger ...">`.
   - Add `aria-invalid={Boolean(errors.field)}` to inputs for accessibility.
   - Keep server-side errors out of field validation (handled in hooks via toast).
4. **Submit flow**
   - `onSubmit` should call the hook handler and avoid form-level error state.

## Quality Checklist

- Schema-driven validation is the single source of truth.
- Form values are typed (e.g., `LoginInput`).
- Field error messages are visible and specific.
- No duplicate server error state inside the form.

## Example

```ts
import type { LoginInput } from '@/shared/api/auth/schemas';
import { loginSchema } from '@/features/auth/constants';

const {
  formState: { errors },
  handleSubmit,
  register,
} = useForm<LoginInput>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', password: '' },
});

// In JSX:
<Input aria-invalid={Boolean(errors.email)} {...register('email')} />
{errors.email && (
  <p className="text-danger mt-2 text-xs">{errors.email.message}</p>
)}
```
