'use client';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { getAccessToken } from '@/shared/utils/storage';

// Derive ws(s):// URL from the http(s):// API endpoint so dev and prod both
// stay aligned without a second env var. Using a function lazily so SSR
// doesn't trip on `window` or env access at import time.
const buildWsUrl = (): string => {
  const httpUrl = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
  return httpUrl.replace(/^http/, 'ws');
};

const wsLink =
  typeof window === 'undefined'
    ? null
    : new GraphQLWsLink(
        createClient({
          connectionParams: () => {
            const token = getAccessToken();
            return token ? { authorization: `Bearer ${token}` } : {};
          },
          // TODO(workflow-run-debug): remove the `on` lifecycle logs once the
          // workflow test-run pipeline is stable.
          on: {
            closed: (event) => console.log('[ws] closed', event),
            connected: () => console.log('[ws] connected'),
            connecting: () => console.log('[ws] connecting to', buildWsUrl()),
            error: (err) => console.log('[ws] error', err),
            opened: () => console.log('[ws] opened'),
          },
          url: buildWsUrl(),
        }),
      );

// TODO(workflow-run-debug): remove this init log once the WS path is stable.
if (typeof window !== 'undefined') {
  console.log('[apollo] wsLink initialised?', !!wsLink, 'url=', buildWsUrl());
}

export { wsLink };
