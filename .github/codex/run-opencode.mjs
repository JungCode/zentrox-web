import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const [role, output] = process.argv.slice(2);
if (!['manager', 'worker', 'reviewer'].includes(role) || !output) {
  throw new Error('Expected role and output path');
}
if (!process.env.DEEPSEEK_API_KEY)
  throw new Error('DEEPSEEK_API_KEY is missing');

const permission = {
  '*': 'deny',
  read: 'allow',
  glob: 'allow',
  grep: 'allow',
  edit: role === 'worker' ? 'allow' : 'deny',
  bash:
    role === 'worker'
      ? {
          '*': 'deny',
          'pnpm check-types*': 'allow',
          'pnpm lint*': 'allow',
          'pnpm exec eslint*': 'allow',
          'git diff*': 'allow',
          'git status*': 'allow',
        }
      : { '*': 'deny', 'git diff*': 'allow', 'git show*': 'allow' },
};
const prompt = readFileSync(
  `.github/codex/prompts/${role}-automated.md`,
  'utf8',
);
const events = execFileSync(
  'opencode',
  [
    'run',
    '--pure',
    '--format',
    'json',
    '--model',
    process.env.AGENT_MODEL || 'deepseek/deepseek-flash',
    prompt,
  ],
  {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    timeout: 20 * 60 * 1000,
    env: {
      ...process.env,
      OPENCODE_CONFIG_CONTENT: JSON.stringify({
        $schema: 'https://opencode.ai/config.json',
        share: 'disabled',
        permission,
      }),
    },
  },
);
const parsed = events
  .split('\n')
  .filter(Boolean)
  .map((line) => JSON.parse(line));
if (parsed.some((event) => event.type === 'error'))
  throw new Error('OpenCode reported an error');
let text = parsed
  .filter((event) => event.type === 'text')
  .map((event) => event.part.text)
  .join('\n')
  .trim();
if (!text) throw new Error('OpenCode returned no final text');
if (role === 'manager') {
  text = text.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  const result = JSON.parse(text);
  const input = JSON.parse(
    readFileSync('.agent-loop/manager-input.json', 'utf8'),
  );
  const allowed = new Map(
    input.issues.map((issue) => [issue.number, issue.updated_at]),
  );
  const seen = new Set();
  if (!Array.isArray(result.assessments))
    throw new Error('Missing assessments');
  for (const item of result.assessments) {
    if (
      seen.has(item.number) ||
      allowed.get(item.number) !== item.updated_at ||
      !['low', 'medium', 'high'].includes(item.risk) ||
      !['bug', 'feature', 'docs', 'test', 'refactor', 'chore'].includes(
        item.type,
      ) ||
      !['agent:ready', 'needs:human'].includes(item.route) ||
      item.area !== 'web' ||
      (item.route === 'agent:ready' && item.risk !== 'low') ||
      !['reason', 'validation', 'human_question'].every(
        (key) =>
          typeof item[key] === 'string' &&
          item[key].length > 0 &&
          item[key].length <= 1000,
      )
    ) {
      throw new Error('Invalid manager assessment');
    }
    seen.add(item.number);
  }
  if (seen.size !== allowed.size) throw new Error('Manager omitted issues');
  text = JSON.stringify(result, null, 2);
}
writeFileSync(output, `${text}\n`);
