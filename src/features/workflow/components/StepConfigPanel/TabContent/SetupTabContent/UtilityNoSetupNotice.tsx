'use client';

/**
 * Empty-state notice shown for utility nodes (Paths today) that have no
 * setup fields to fill in. Tells the user where to go next so they don't
 * stare at an empty form wondering what's missing.
 */
const UtilityNoSetupNotice = () => (
  <div className="border-outline-variant/30 bg-surface-container/40 rounded-md border p-3">
    <p className="text-on-surface text-sm font-medium">No setup required</p>
    <p className="text-on-surface-variant mt-1 text-xs leading-relaxed">
      This utility runs inside Zentrox and doesn&apos;t need an account or
      event. Continue to the <strong>Configure</strong> tab to set its rules.
    </p>
  </div>
);

export { UtilityNoSetupNotice };
