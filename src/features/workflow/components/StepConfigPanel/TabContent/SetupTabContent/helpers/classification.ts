import { WorkflowProviderApp } from '@/shared/api/base.schemas';

// ─── Provider classifications ─────────────────────────────────────────────────
// Mirrors the BE: providers in these sets short-circuit parts of the setup
// flow. Keep in sync with `assign-provider-app.handler.ts` on the API.

/**
 * Providers that don't authenticate against an external account.
 *
 * AI runs on user-supplied prompts + knowledge files; Paths is a Zentrox-
 * internal utility. Neither needs an OAuth account.
 */
const PROVIDERS_WITHOUT_ACCOUNT = new Set<WorkflowProviderApp>([
  WorkflowProviderApp.Ai,
  WorkflowProviderApp.Paths,
]);

/**
 * Providers whose actionKey is auto-assigned at provider-pick time (BE's
 * DEFAULT_ACTION_KEY_BY_PROVIDER) — no event picker needed in the UI.
 */
const PROVIDERS_WITH_AUTO_ACTION_KEY = new Set<WorkflowProviderApp>([
  WorkflowProviderApp.Paths,
]);

const needsEventField = (providerApp: WorkflowProviderApp): boolean =>
  !PROVIDERS_WITH_AUTO_ACTION_KEY.has(providerApp);

const needsAccountField = (providerApp: WorkflowProviderApp): boolean =>
  !PROVIDERS_WITHOUT_ACCOUNT.has(providerApp);

export { needsAccountField, needsEventField };
