import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as SchemaTypes from '@/shared/api/auth/schemas';
export type LoginMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean } };

export type RefreshTokenMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponse', accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', avatarKey?: string | null; createdAt: string, email: string, id: string, updatedAt: string, userName: string, } };

export type CheckHealthQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CheckHealthQuery = { __typename?: 'Query', checkHealth: string };

export type MeQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', avatarKey?: string | null; createdAt: string, email: string, id: string, updatedAt: string, userName: string, } };


export const LoginDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"Login"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"login"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"Logout"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"RefreshToken"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"Register"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"register"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarKey"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const CheckHealthDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"CheckHealth"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkHealth"}}]}}],"kind":"Document"} as unknown as DocumentNode<CheckHealthQuery, CheckHealthQueryVariables>;
export const MeDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"Me"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarKey"}}]}}]}}],"kind":"Document"} as unknown as DocumentNode<MeQuery, MeQueryVariables>;