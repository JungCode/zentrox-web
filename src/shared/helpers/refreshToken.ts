import { Observable } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { from, mergeMap } from 'rxjs';

import { client } from '@/lib/apollo';

import {
  RefreshTokenDocument,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from '../api/auth/auth.schemas';
import {
  clearAuthTokens,
  getRefreshToken,
  setAuthTokens,
} from '../utils/storage';

let isRefresh = false;

export const handleLogout = () => {
  clearAuthTokens();

  setTimeout(() => {
    location.reload();
  }, 1500);
};

type CallbackFunction = (value?: unknown) => void;

let pendingRequests: CallbackFunction[] = [];

const addPendingRequest = (pendingRequest: CallbackFunction) => {
  pendingRequests.push(pendingRequest);
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

export const handleRefreshToken = ({
  forward,
  operation,
}: ErrorLink.ErrorHandlerOptions): Observable<unknown> => {
  const refreshToken = getRefreshToken();

  if (!isRefresh && refreshToken) {
    isRefresh = true;
    return from(
      client
        .mutate<RefreshTokenMutation, RefreshTokenMutationVariables>({
          mutation: RefreshTokenDocument,
          variables: {
            input: {
              refreshToken,
            },
          },
        })
        .then((res) => {
          const accessToken = res.data?.refreshToken.accessToken;
          const refreshToken = res.data?.refreshToken.refreshToken;

          if (refreshToken && accessToken) {
            setAuthTokens(accessToken, refreshToken);

            const { headers } = operation.getContext();
            operation.setContext({
              headers: {
                ...headers,
                authorization: `Bearer ${accessToken}`,
              },
            });

            resolvePendingRequests();
            isRefresh = false;
            return forward(operation);
          }
        })
        .catch(() => {
          isRefresh = false;
          handleLogout();
        }),
    ).pipe(
      mergeMap(() => {
        resolvePendingRequests();
        isRefresh = false;
        return forward(operation) as unknown as Observable<unknown>;
      }),
    );
  }

  return from(new Promise((resolve) => addPendingRequest(resolve))).pipe(
    mergeMap(() => forward(operation)),
  );
};
