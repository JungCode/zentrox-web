// hooks/useOAuthConnect.ts
import { useCallback, useEffect, useRef, useState } from 'react';

import { AUTHORIZE_URL } from '@/shared/constants';
import { openOAuthPopup } from '@/shared/helpers';
import {
  OAuthStatus,
  UseOAuthConnectOptions,
  UseOAuthConnectReturn,
} from '@/shared/types';
import { getAccessToken } from '@/shared/utils';

export const useOAuthConnect = ({
  onError,
  onSuccess,
  provider,
}: UseOAuthConnectOptions): UseOAuthConnectReturn => {
  const [status, setStatus] = useState<OAuthStatus>('idle');
  const popupRef = useRef<Window | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== 'OAUTH_CALLBACK') return;
      if (event.data?.provider !== provider) return;

      if (event.data.status === 'connected') {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
        onError?.(event.data.reason ?? 'unknown_error');
      }

      popupRef.current = null;
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [provider, onSuccess, onError]);

  const connect = useCallback(async () => {
    try {
      setStatus('loading');

      const res = await fetch(AUTHORIZE_URL[provider], {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });

      if (!res.ok) throw new Error('Failed to get auth URL');

      const { authUrl } = await res.json();

      const popup = openOAuthPopup(authUrl);

      if (!popup) {
        // fallback to redirect if popup is blocked
        window.location.href = authUrl;
        return;
      }

      popupRef.current = popup;
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown_error';
      setStatus('error');
      onError?.(reason);
    }
  }, [provider, onError]);

  const reset = useCallback(() => setStatus('idle'), []);

  return { connect, reset, status };
};
