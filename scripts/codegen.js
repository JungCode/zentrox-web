#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

// Absolute path to your API folders (adjust if needed)
const apisDir = path.resolve(process.cwd(), 'src/shared/api');

// Check if folder exists
if (!fs.existsSync(apisDir)) {
  console.error(`Folder not found: ${apisDir}`);
  process.exit(1);
}

// Read all subfolders inside src/shared/api
// Only keep directories (each one is an "entity")
const folders = fs
  .readdirSync(apisDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('apollo'))
  .map((entry) => entry.name);

// Exit if no folders found
if (folders.length === 0) {
  console.error(`No folders found in: ${apisDir}`);
  process.exit(1);
}

// Track which folder is currently selected in the UI
let selectedIndex = 0;

// Enable keypress listening (for arrow keys)
readline.emitKeypressEvents(process.stdin);

// Put terminal into "raw mode" so we can capture key presses instantly
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

/**
 * Render the CLI UI
 * Shows all folders and highlights the selected one
 */
function render() {
  console.clear();
  console.log('Select GraphQL entity:\n');

  folders.forEach((folder, index) => {
    const pointer = index === selectedIndex ? '❯' : ' ';
    console.log(`${pointer} ${folder}`);
  });

  console.log('\nUse ↑ / ↓ or j/k to move, Enter to select, Ctrl+C to exit.');
}

/**
 * Run GraphQL Codegen with the selected entity
 */
function runCodegen(entity) {
  // Clear the terminal and show what we're doing
  console.clear();
  console.log(`Running graphql-codegen for entity: ${entity}\n`);

  /**
   * Step 1: Run GraphQL Code Generator
   * - Uses pnpm to execute graphql-codegen
   * - Passes CODEGEN_ENTITY via environment variables
   */
  const codegenResult = spawnSync('pnpm', ['graphql-codegen'], {
    env: {
      ...process.env,
      CODEGEN_ENTITY: entity,
    },
    shell: true,        // Allow shell execution
    stdio: 'inherit',   // Show logs in terminal
  });

  // Stop execution if codegen fails
  if (codegenResult.status !== 0) {
    process.exit(codegenResult.status ?? 1);
  }

  console.log('\nFormatting generated files with Prettier...\n');

  /**
   * Step 2: Run Prettier
   * - We pass the whole folder instead of glob patterns
   * - --ignore-unknown prevents errors for unsupported file types
   * - This avoids "No files matching pattern" errors
   */
  const formatResult = spawnSync(
    'pnpm',
    [
      'exec',
      'prettier',
      '--write',
      '--ignore-unknown',
      `src/shared/api/${entity}`,
    ],
    {
      shell: true,
      stdio: 'inherit',
    },
  );

  // Stop if Prettier fails
  if (formatResult.status !== 0) {
    process.exit(formatResult.status ?? 1);
  }

  console.log('\nFixing lint issues with ESLint...\n');

  /**
   * Step 3: Run ESLint with auto-fix
   * - Targets only .ts and .tsx files
   * - --no-error-on-unmatched-pattern prevents failure
   *   when one of the patterns has no matching files
   */
  const lintResult = spawnSync(
    'pnpm',
    [
      'exec',
      'eslint',
      '--fix',
      '--no-error-on-unmatched-pattern',
      `src/shared/api/${entity}/**/*.ts`,
      `src/shared/api/${entity}/**/*.tsx`,
    ],
    {
      shell: true,
      stdio: 'inherit',
    },
  );

  /**
   * Final exit:
   * - Exit with ESLint result status
   * - 0 = success, non-zero = failure
   */
  process.exit(lintResult.status ?? 0);
}

// Initial render
render();

/**
 * Listen for key presses
 */
process.stdin.on('keypress', (_, key) => {
  // Exit on Ctrl + C
  if (key.ctrl && key.name === 'c') {
    process.exit(0);
  }

  // Move selection UP
  if (key.name === 'up' || key.name === 'k') {
    selectedIndex =
      selectedIndex === 0 ? folders.length - 1 : selectedIndex - 1;
    render();
  }

  // Move selection DOWN
  if (key.name === 'down' || key.name === 'j') {
    selectedIndex =
      selectedIndex === folders.length - 1 ? 0 : selectedIndex + 1;
    render();
  }

  // Confirm selection (Enter key)
  if (key.name === 'return') {
    const entity = folders[selectedIndex];
    runCodegen(entity);
  }
});
