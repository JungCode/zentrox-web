/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: { input: boolean; output: boolean; }
  DateTime: { input: string; output: string; }
  Float: { input: number; output: number; }
  ID: { input: string; output: string; }
  Int: { input: number; output: number; }
  JSONObject: { input: any; output: any; }
  String: { input: string; output: string; }
};

export type AddPathsBranchPayload = {
  branchId: Scalars['ID']['output'];
  branchPlaceholderNode: WorkflowNode;
  pathsNode: WorkflowNode;
};

export type AiProcessingLogEntry = {
  data?: Maybe<Scalars['JSONObject']['output']>;
  step: Scalars['String']['output'];
};

export type CloudinarySignatureResponse = {
  signature: Scalars['String']['output'];
};

export type CreateWorkflowNodeInput = {
  label: Scalars['String']['input'];
  nodeType?: InputMaybe<WorkflowNodeType>;
  positionX?: InputMaybe<Scalars['Float']['input']>;
  positionY?: InputMaybe<Scalars['Float']['input']>;
  providerApp?: InputMaybe<WorkflowProviderApp>;
  sourceHandle?: InputMaybe<Scalars['String']['input']>;
  sourceNodeId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateWorkflowNodePayload = {
  edge?: Maybe<WorkflowEdge>;
  node: WorkflowNode;
};

export type DeleteWorkflowNodePayload = {
  deletedEdgeIds: Array<Scalars['ID']['output']>;
  deletedNodeId: Scalars['ID']['output'];
};

export type EdgeInput = {
  sourceClientId: Scalars['ID']['input'];
  sourceHandle: Scalars['String']['input'];
  targetClientId: Scalars['ID']['input'];
  targetHandle?: InputMaybe<Scalars['String']['input']>;
};

export type GoogleDriveFileListItem = {
  createdTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  modifiedTime: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GoogleDriveListItem = {
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GoogleFormListItem = {
  createdTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  modifiedTime: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GoogleSpreadsheetListItem = {
  createdTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  modifiedTime: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GoogleWorksheetColumnHeader = {
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type GoogleWorksheetListItem = {
  index: Scalars['Int']['output'];
  sheetId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type IndexAiKnowledgePayload = {
  totalChunks: Scalars['Int']['output'];
};

export type InsertWorkflowNodeBetweenPayload = {
  downstreamEdge: WorkflowEdge;
  newNode: WorkflowNode;
  updatedSourceEdge: WorkflowEdge;
};

export type IntegrationAccount = {
  accountIdentifier?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  ownerUserId: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  safeTokenData?: Maybe<Scalars['JSONObject']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type LogoutResponse = {
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  addPathsBranch: AddPathsBranchPayload;
  assignProviderApp: WorkflowNode;
  createWorkflow: Workflow;
  createWorkflowNode: CreateWorkflowNodePayload;
  deleteWorkflow: Scalars['Boolean']['output'];
  deleteWorkflowNode: DeleteWorkflowNodePayload;
  indexAiKnowledge: IndexAiKnowledgePayload;
  insertWorkflowNodeBetween: InsertWorkflowNodeBetweenPayload;
  login: LoginResponse;
  logout: LogoutResponse;
  publishWorkflow: WorkflowVersion;
  refreshToken: RefreshTokenResponse;
  register: User;
  saveWorkflowDraft: WorkflowVersion;
  selectTriggerNodeSampleRecord: WorkflowNodeSampleRecord;
  setupGoogleFormWatch: WorkflowNode;
  signCloudinaryUpload: CloudinarySignatureResponse;
  testRunAiGenerateNode: TestRunAiGenerateNodePayload;
  testRunPathsNode: TestRunPathsNodePayload;
  testRunWorkflow: TestRunWorkflowPayload;
  testRunWorkflowNode: TestRunWorkflowNodePayload;
  updateWorkflow: Workflow;
  updateWorkflowNode: WorkflowNode;
};


export type MutationAddPathsBranchArgs = {
  label?: InputMaybe<Scalars['String']['input']>;
  pathsNodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationAssignProviderAppArgs = {
  nodeId: Scalars['ID']['input'];
  providerApp: WorkflowProviderApp;
  workflowId: Scalars['ID']['input'];
};


export type MutationCreateWorkflowArgs = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateWorkflowNodeArgs = {
  input: CreateWorkflowNodeInput;
  workflowId: Scalars['ID']['input'];
};


export type MutationDeleteWorkflowArgs = {
  workflowId: Scalars['ID']['input'];
};


export type MutationDeleteWorkflowNodeArgs = {
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationIndexAiKnowledgeArgs = {
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationInsertWorkflowNodeBetweenArgs = {
  input: CreateWorkflowNodeInput;
  sourceNodeId: Scalars['ID']['input'];
  targetNodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPublishWorkflowArgs = {
  workflowId: Scalars['ID']['input'];
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSaveWorkflowDraftArgs = {
  edges: Array<EdgeInput>;
  nodes: Array<NodeInput>;
  workflowId: Scalars['ID']['input'];
};


export type MutationSelectTriggerNodeSampleRecordArgs = {
  data: Scalars['JSONObject']['input'];
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationSetupGoogleFormWatchArgs = {
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationSignCloudinaryUploadArgs = {
  input: SignCloudinaryUploadInput;
};


export type MutationTestRunAiGenerateNodeArgs = {
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationTestRunPathsNodeArgs = {
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationTestRunWorkflowArgs = {
  limit?: Scalars['Int']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationTestRunWorkflowNodeArgs = {
  limit?: Scalars['Int']['input'];
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type MutationUpdateWorkflowArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWorkflowInput;
};


export type MutationUpdateWorkflowNodeArgs = {
  input: UpdateWorkflowNodeInput;
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};

export type NodeInput = {
  actionKey?: InputMaybe<WorkflowActionKey>;
  clientId: Scalars['ID']['input'];
  configJson?: InputMaybe<Scalars['JSONObject']['input']>;
  integrationAccountId?: InputMaybe<Scalars['ID']['input']>;
  label: Scalars['String']['input'];
  nodeType: WorkflowNodeType;
  positionX?: InputMaybe<Scalars['Float']['input']>;
  positionY?: InputMaybe<Scalars['Float']['input']>;
  providerApp: WorkflowProviderApp;
};

export type PathsBranchEvaluation = {
  branchId: Scalars['ID']['output'];
  branchLabel: Scalars['String']['output'];
  matched: Scalars['Boolean']['output'];
  rules: Array<PathsRuleEvaluation>;
};

export type PathsRuleEvaluation = {
  passed: Scalars['Boolean']['output'];
  resolvedLeft?: Maybe<Scalars['String']['output']>;
  resolvedRight?: Maybe<Scalars['String']['output']>;
  ruleId: Scalars['ID']['output'];
};

export type Query = {
  checkHealth: Scalars['String']['output'];
  googleDriveFiles: Array<GoogleDriveFileListItem>;
  googleDrives: Array<GoogleDriveListItem>;
  googleForms: Array<GoogleFormListItem>;
  googleSheetHeaders: Array<GoogleWorksheetColumnHeader>;
  googleSpreadsheets: Array<GoogleSpreadsheetListItem>;
  googleWorksheets: Array<GoogleWorksheetListItem>;
  integrationAccounts: Array<IntegrationAccount>;
  me: User;
  triggerNodeRecords: TriggerNodeRecordsPayload;
  triggerNodeSampleRecord?: Maybe<WorkflowNodeSampleRecord>;
  workflow: Workflow;
  workflowNode: WorkflowNode;
  workflowVersionNodeSamples: Array<WorkflowNodeSampleData>;
};


export type QueryGoogleDriveFilesArgs = {
  integrationAccountId: Scalars['ID']['input'];
};


export type QueryGoogleDrivesArgs = {
  integrationAccountId: Scalars['ID']['input'];
};


export type QueryGoogleFormsArgs = {
  integrationAccountId: Scalars['ID']['input'];
};


export type QueryGoogleSheetHeadersArgs = {
  integrationAccountId: Scalars['ID']['input'];
  spreadsheetId: Scalars['ID']['input'];
  worksheetTitle: Scalars['String']['input'];
};


export type QueryGoogleSpreadsheetsArgs = {
  driveId?: InputMaybe<Scalars['ID']['input']>;
  integrationAccountId: Scalars['ID']['input'];
};


export type QueryGoogleWorksheetsArgs = {
  integrationAccountId: Scalars['ID']['input'];
  spreadsheetId: Scalars['ID']['input'];
};


export type QueryTriggerNodeRecordsArgs = {
  limit?: Scalars['Int']['input'];
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type QueryTriggerNodeSampleRecordArgs = {
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type QueryWorkflowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkflowNodeArgs = {
  nodeId: Scalars['ID']['input'];
  workflowId: Scalars['ID']['input'];
};


export type QueryWorkflowVersionNodeSamplesArgs = {
  currentNodeId: Scalars['ID']['input'];
  workflowVersionId: Scalars['ID']['input'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RefreshTokenResponse = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type SignCloudinaryUploadInput = {
  paramsToSign: Scalars['JSONObject']['input'];
};

export type TestRunAiGenerateNodePayload = {
  inputData: Scalars['JSONObject']['output'];
  node: WorkflowNode;
  output: Scalars['JSONObject']['output'];
  processingLog: Array<AiProcessingLogEntry>;
  selectedRecord?: Maybe<WorkflowNodeSampleRecord>;
};

export type TestRunPathsNodePayload = {
  branches: Array<PathsBranchEvaluation>;
  inputSample?: Maybe<Scalars['JSONObject']['output']>;
  matchedBranchId?: Maybe<Scalars['ID']['output']>;
  node: WorkflowNode;
  selectedRecord?: Maybe<WorkflowNodeSampleRecord>;
};

export type TestRunWorkflowNodePayload = {
  node: WorkflowNode;
  sampleResponses: Array<Scalars['JSONObject']['output']>;
  selectedRecord?: Maybe<WorkflowNodeSampleRecord>;
};

export type TestRunWorkflowPayload = {
  runs: Array<WorkflowRun>;
  sampleResponses: Array<Scalars['JSONObject']['output']>;
};

export type TriggerNodeRecordsPayload = {
  fileUploadRecords: Array<Scalars['JSONObject']['output']>;
  records: Array<Scalars['JSONObject']['output']>;
};

export type UpdateWorkflowInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowNodeInput = {
  actionKey?: InputMaybe<WorkflowActionKey>;
  configJson?: InputMaybe<Scalars['JSONObject']['input']>;
  integrationAccountId?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  positionX?: InputMaybe<Scalars['Float']['input']>;
  positionY?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  avatarKey?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userName: Scalars['String']['output'];
};

export type Workflow = {
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['String']['output'];
  currentDraftVersion?: Maybe<WorkflowVersion>;
  currentDraftVersionId?: Maybe<Scalars['String']['output']>;
  currentPublishedVersion?: Maybe<WorkflowVersion>;
  currentPublishedVersionId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  folderId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum WorkflowActionKey {
  AiGenerate = 'AI_GENERATE',
  GoogleFormCreated = 'GOOGLE_FORM_CREATED',
  GoogleFormCreatedOrUpdated = 'GOOGLE_FORM_CREATED_OR_UPDATED',
  GoogleSheetChangeSheetProperties = 'GOOGLE_SHEET_CHANGE_SHEET_PROPERTIES',
  GoogleSheetCreateColumn = 'GOOGLE_SHEET_CREATE_COLUMN',
  GoogleSheetCreateRow = 'GOOGLE_SHEET_CREATE_ROW',
  PathsBranch = 'PATHS_BRANCH'
}

export type WorkflowEdge = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  sourceHandle: Scalars['String']['output'];
  sourceNodeId: Scalars['String']['output'];
  targetHandle?: Maybe<Scalars['String']['output']>;
  targetNodeId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workflowVersionId: Scalars['String']['output'];
};

export type WorkflowNode = {
  actionKey?: Maybe<WorkflowActionKey>;
  configJson?: Maybe<Scalars['JSONObject']['output']>;
  connectionStatus: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  integrationAccountId?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  lastTestedAt?: Maybe<Scalars['DateTime']['output']>;
  nodeType?: Maybe<WorkflowNodeType>;
  positionX?: Maybe<Scalars['Float']['output']>;
  positionY?: Maybe<Scalars['Float']['output']>;
  providerApp?: Maybe<WorkflowProviderApp>;
  testErrorMessage?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workflowVersionId: Scalars['String']['output'];
};

export type WorkflowNodeSampleData = {
  actionKey?: Maybe<WorkflowActionKey>;
  connectionStatus: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  nodeLabel: Scalars['String']['output'];
  nodeType?: Maybe<WorkflowNodeType>;
  providerApp?: Maybe<WorkflowProviderApp>;
  sampleRecord?: Maybe<WorkflowNodeSampleRecord>;
};

export type WorkflowNodeSampleRecord = {
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['JSONObject']['output'];
  fetchedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workflowNodeId: Scalars['String']['output'];
};

export enum WorkflowNodeType {
  Action = 'ACTION',
  Trigger = 'TRIGGER',
  Utility = 'UTILITY'
}

export enum WorkflowProviderApp {
  Ai = 'AI',
  Facebook = 'FACEBOOK',
  Gmail = 'GMAIL',
  GoogleForm = 'GOOGLE_FORM',
  GoogleSheet = 'GOOGLE_SHEET',
  Paths = 'PATHS',
  Slack = 'SLACK'
}

export type WorkflowRun = {
  createdAt: Scalars['DateTime']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  initiatedByUserId?: Maybe<Scalars['String']['output']>;
  inputPayload?: Maybe<Scalars['String']['output']>;
  isTestRun: Scalars['Boolean']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  triggerType: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workflowId: Scalars['String']['output'];
  workflowVersionId: Scalars['String']['output'];
};

export type WorkflowVersion = {
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['String']['output'];
  edges?: Maybe<Array<WorkflowEdge>>;
  id: Scalars['String']['output'];
  nodes?: Maybe<Array<WorkflowNode>>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  versionNumber: Scalars['Int']['output'];
  workflowId: Scalars['String']['output'];
};
