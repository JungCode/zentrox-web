interface ResolveDriveIdResult {
  driveId: string | null | undefined;
  isDriveSelected: boolean;
}

/**
 * Converts the raw form driveId value into a resolved selection state.
 *
 * Form stores '' as "not yet chosen", null as My Drive, string as a shared drive.
 * driveId is undefined when nothing is selected so callers can gate dependent queries.
 */
const resolveDriveId = (
  raw: string | null | undefined,
): ResolveDriveIdResult => {
  const driveId = raw === '' || raw === undefined ? undefined : (raw ?? null);
  return { driveId, isDriveSelected: driveId !== undefined };
};

export { resolveDriveId };
