/** Full response returned by Cloudinary after an upload. */
export interface CloudinaryUploadResult {
  bytes: number;
  format: string;
  originalFilename: string;
  publicId: string;
  resourceType: string;
  secureUrl: string;
}

/**
 * Minimal reference to a stored Cloudinary asset — the fields worth
 * persisting after an upload. Use this as the `file` field in any feature
 * type that needs to carry an uploaded-file reference.
 *
 * Build one from a CloudinaryUploadResult:
 *   const ref = toUploadedFileRef(result);
 */
export interface UploadedFileRef {
  bytes: number;
  format: string;
  publicId: string;
  secureUrl: string;
}

export const toUploadedFileRef = (
  result: CloudinaryUploadResult,
): UploadedFileRef => ({
  bytes: result.bytes,
  format: result.format,
  publicId: result.publicId,
  secureUrl: result.secureUrl,
});
