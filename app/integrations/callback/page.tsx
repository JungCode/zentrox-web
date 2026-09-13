// app/integrations/callback/page.tsx  (Next.js)
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status');
    const provider = searchParams.get('provider');
    const reason = searchParams.get('reason');

    window.opener?.postMessage(
      { provider, reason, status, type: 'OAUTH_CALLBACK' },
      window.location.origin,
    );

    window.close();
  }, [searchParams]);

  return <p>Connecting...</p>;
}
