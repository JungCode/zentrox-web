import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const schema = process.env.NEXT_PUBLIC_API_ENDPOINT;
const entity = process.env.CODEGEN_ENTITY;

const baseTypesPath = `~@/shared/api/${entity}/schemas`;
const generatesPath = `src/shared/api/${entity}/schemas.tsx`; // Adjust the path to your generated types file
const documents = `src/shared/api/${entity}/**/*.{graphql,gql}`; // Adjust the path to your GraphQL documents

const config: CodegenConfig = {
  config: {
    namingConvention: {
      transformUnderscore: true,
    },
    scalars: {
      ['DateTime']: 'string',
      ['Float']: 'number',
      ['ID']: 'string',
      ['Int']: 'number',
      ['ObjectID']: 'string',
      ['UUID']: 'string',
    },
  },
  documents,
  generates: {
    [generatesPath]: {
      config: {
        onlyOperationTypes: true,
        skipTypename: true,
      },
      plugins: ['typescript'],
    },
    'src/': {
      config: {
        dedupeFragments: true,
        dedupeOperationSuffix: true,
      },
      hooks: {
        afterOneFileWrite: ['eslint --fix', 'prettier --write'],
      },
      plugins: ['typescript-operations', 'typed-document-node'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath,
        extension: '.schemas.tsx',
        fileName: `../${entity}`,
        importTypesNamespace: 'SchemaTypes',
      },
    },
  },
  schema,
};
export default config;
