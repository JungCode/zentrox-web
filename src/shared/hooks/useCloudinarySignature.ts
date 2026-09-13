'use client';

import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';

import {
  SignCloudinaryUploadDocument,
  type SignCloudinaryUploadMutation,
  type SignCloudinaryUploadMutationVariables,
} from '@/shared/api/cloudinary/cloudinary.schemas';

type ParamsToSign = Record<string, string | number | boolean>;
type CloudinarySignatureCallback = (
  signature: string | null,
  error?: unknown,
) => void;

/**
 * Returns the function Cloudinary's upload widget calls each time it needs a
 * signed set of upload params. The widget hands us `paramsToSign`; we forward
 * them through the Apollo mutation (Authorization is attached by authLink),
 * and pass the resulting signature back via the widget's callback contract.
 * The returned function is stable so the widget never re-instantiates.
 */
const useCloudinarySignature = () => {
  const [signCloudinaryUpload] = useMutation<
    SignCloudinaryUploadMutation,
    SignCloudinaryUploadMutationVariables
  >(SignCloudinaryUploadDocument);

  return useCallback(
    async (
      callback: CloudinarySignatureCallback,
      paramsToSign: ParamsToSign,
    ) => {
      try {
        const { data } = await signCloudinaryUpload({
          variables: { input: { paramsToSign } },
        });

        const signature = data?.signCloudinaryUpload.signature;
        if (!signature) {
          callback(null, new Error('No signature returned from server.'));
          return;
        }
        callback(signature);
      } catch (error) {
        callback(null, error);
      }
    },
    [signCloudinaryUpload],
  );
};

export { useCloudinarySignature };
