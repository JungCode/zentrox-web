import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as SchemaTypes from '@/shared/api/auth/schemas';
export type CheckHealthQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CheckHealthQuery = { __typename?: 'Query', checkHealth: string };


export const CheckHealthDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"CheckHealth"},"operation":"query","selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkHealth"}}]}}],"kind":"Document"} as unknown as DocumentNode<CheckHealthQuery, CheckHealthQueryVariables>;