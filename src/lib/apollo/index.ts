import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { authLink } from './authLink';
import { errorLink } from './errorLink';
import { httpLink } from './httpLink';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
});

export { client };
