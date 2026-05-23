export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

export const CLOUDINARY_API_KEY =
  process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? '';

/** File-size multipliers for readable byte expressions: `10 * MB`. */
export const KB = 1_024;
export const MB = 1_024 * KB;

/**
 * Cloudinary `clientAllowedFormats` values.
 * Use enum members when building per-feature allowed-format lists so that
 * typos become compile errors and refactors stay in sync.
 */
export enum UploadFormat {
  MARKDOWN = 'md',
  MARKDOWN_LONG = 'markdown',
  PDF = 'pdf',
  TEXT = 'txt',
}
