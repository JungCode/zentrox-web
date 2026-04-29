import { CombinedGraphQLErrors, Observable } from '@apollo/client';
import { ApolloLink } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLFormattedError } from 'graphql';

import { ErrorCode, StatusCode } from '@/shared/constants/errors';
import { handleRefreshToken } from '@/shared/helpers/refreshToken';

interface GraphQLErrorExtension extends GraphQLFormattedError {
  code: ErrorCode & string;
  message: string;
  statusCode: StatusCode;
}

const errorLink = new ErrorLink(
  ({ error: graphqlError, forward, operation }) => {
    if (CombinedGraphQLErrors.is(graphqlError)) {
      const apiResponseError = graphqlError.errors[0] as GraphQLErrorExtension;

      if (
        apiResponseError.statusCode === StatusCode.Unauthorized &&
        apiResponseError.code === ErrorCode.SessionExpired
      ) {
        window.location.href = '/login';
        return;
      }

      if (apiResponseError.statusCode === StatusCode.Unauthorized) {
        return handleRefreshToken({
          error: graphqlError,
          forward,
          operation,
        }) as Observable<ApolloLink.Result>;
      }
    }
    if (operation.operationName === 'refreshToken') return;
  },
);
export { errorLink };
