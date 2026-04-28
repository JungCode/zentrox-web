import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as SchemaTypes from '@/shared/api/auth/schemas';
export type LoginMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string } };

export type CheckHealthQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CheckHealthQuery = { __typename?: 'Query', checkHealth: string };


export const LoginDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"Login"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"login"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CheckHealthDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"CheckHealth"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkHealth"}}]}}],"kind":"Document"} as unknown as DocumentNode<CheckHealthQuery, CheckHealthQueryVariables>;