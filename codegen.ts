import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const schema = process.env.NEXT_PUBLIC_API_ENDPOINT;
const entity = process.env.CODEGEN_ENTITY;

/**
 * Single base types file generated from the full schema.
 * All entity operation files import their scalar / utility types from here
 * instead of each having their own redundant copy of the entire schema.
 */
const BASE_TYPES_PATH = '~@/shared/api/base.schemas';

const documents = `src/shared/api/${entity}/**/*.{graphql,gql}`;

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
    // ── Per-entity typed document nodes ─────────────────────────────────────
    // Generates a <entity>.schemas.tsx next to each .gql file.
    // Imports from BASE_TYPES_PATH so only the operation-specific types live here.
    'src/': {
      config: {
        dedupeFragments: true,
        dedupeOperationSuffix: true,
      },
      hooks: {
        afterOneFileWrite: ['eslint --fix', 'prettier --write'],
      },
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-explicit-any */',
          },
        },
        'typescript-operations',
        'typed-document-node',
      ],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: BASE_TYPES_PATH,
        extension: '.schemas.tsx',
        fileName: `../${entity}`,
        importTypesNamespace: 'SchemaTypes',
      },
    },

    // ── Base types ──────────────────────────────────────────────────────────
    // Generated once per codegen run from the full API schema.
    // Contains all scalars, utility types, and every schema type — shared
    // across all entities so no entity has its own redundant copy.
    'src/shared/api/base.schemas.tsx': {
      config: {
        skipTypename: true,
      },
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-explicit-any */',
          },
        },
        'typescript',
      ],
    },
  },
  schema,
};

export default config;
