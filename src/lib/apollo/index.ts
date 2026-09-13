import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { authLink } from './authLink';
import { errorLink } from './errorLink';
import { httpLink } from './httpLink';
import { wsLink } from './wsLink';

// Route subscriptions through graphql-ws and everything else through HTTP.
// During SSR `wsLink` is null, so we just fall back to httpLink there —
// subscriptions only fire from the browser anyway.
// TODO(workflow-run-debug): drop the per-operation routing console.log and
// the transportLink-mode log once the workflow test-run pipeline is stable.
const transportLink = wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        const isSub =
          def.kind === 'OperationDefinition' &&
          def.operation === 'subscription';
        if (typeof window !== 'undefined') {
          console.log(
            '[apollo] routing operation. isSub=',
            isSub,
            'op=',
            def.kind === 'OperationDefinition' ? def.operation : '(non-op)',
          );
        }
        return isSub;
      },
      wsLink,
      httpLink,
    )
  : httpLink;

if (typeof window !== 'undefined') {
  console.log(
    '[apollo] transportLink =',
    wsLink ? 'split(ws, http)' : 'httpLink only (wsLink was null)',
  );
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, transportLink]),
});

export { client };
