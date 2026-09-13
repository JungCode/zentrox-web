 
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as SchemaTypes from '@/shared/api/base.schemas';
export type SignCloudinaryUploadMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.SignCloudinaryUploadInput;
}>;


export type SignCloudinaryUploadMutation = { __typename?: 'Mutation', signCloudinaryUpload: { __typename?: 'CloudinarySignatureResponse', signature: string } };


export const SignCloudinaryUploadDocument = {"definitions":[{"kind":"OperationDefinition","name":{"kind":"Name","value":"SignCloudinaryUpload"},"operation":"mutation","selectionSet":{"kind":"SelectionSet","selections":[{"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"kind":"Field","name":{"kind":"Name","value":"signCloudinaryUpload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signature"}}]}}]},"variableDefinitions":[{"kind":"VariableDefinition","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignCloudinaryUploadInput"}}},"variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}],"kind":"Document"} as unknown as DocumentNode<SignCloudinaryUploadMutation, SignCloudinaryUploadMutationVariables>;