/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: { input: boolean; output: boolean };
  DateTime: { input: string; output: string };
  Float: { input: number; output: number };
  ID: { input: string; output: string };
  Int: { input: number; output: number };
  JSONObject: { input: any; output: any };
  String: { input: string; output: string };
};

export type CreateWorkflowNodeInput = {
  label: Scalars['String']['input'];
  nodeType?: InputMaybe<WorkflowNodeType>;
  positionX?: InputMaybe<Scalars['Float']['input']>;
  positionY?: InputMaybe<Scalars['Float']['input']>;
  providerApp?: InputMaybe<WorkflowProviderApp>;
  sourceHandle?: InputMaybe<WorkflowEdgeSourceHandle>;
  sourceNodeId?: InputMaybe<Scalars['ID']['input']>;
};

export type EdgeInput = {
  sourceClientId: Scalars['ID']['input'];
  sourceHandle: WorkflowEdgeSourceHandle;
  targetClientId: Scalars['ID']['input'];
  targetHandle?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type NodeInput = {
  actionKey?: InputMaybe<Scalars['String']['input']>;
  clientId: Scalars['ID']['input'];
  configJson?: InputMaybe<Scalars['JSONObject']['input']>;
  integrationAccountId?: InputMaybe<Scalars['ID']['input']>;
  label: Scalars['String']['input'];
  nodeType: WorkflowNodeType;
  positionX?: InputMaybe<Scalars['Float']['input']>;
  positionY?: InputMaybe<Scalars['Float']['input']>;
  providerApp: WorkflowProviderApp;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type UpdateWorkflowInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowNodeInput = {
  actionKey?: InputMaybe<Scalars['String']['input']>;
  configJson?: InputMaybe<Scalars['JSONObject']['input']>;
  integrationAccountId?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  positionX?: InputMaybe<Scalars['Float']['input']>;
  positionY?: InputMaybe<Scalars['Float']['input']>;
};

export enum WorkflowEdgeSourceHandle {
  Default = 'DEFAULT',
  False = 'FALSE',
  True = 'TRUE',
}

export enum WorkflowNodeType {
  Action = 'ACTION',
  Trigger = 'TRIGGER',
  Utility = 'UTILITY',
}

export enum WorkflowProviderApp {
  Facebook = 'FACEBOOK',
  Gmail = 'GMAIL',
  GoogleForm = 'GOOGLE_FORM',
  GoogleSheet = 'GOOGLE_SHEET',
  Slack = 'SLACK',
}
