'use client';

import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';

import { client } from '@/lib/apollo';

const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { ApolloWrapper };
