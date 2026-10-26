import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { finalText, implementationPr } from './loop-results.mjs';

function scripts(name) {
  const lines = readFileSync(
    new URL(`../workflows/${name}`, import.meta.url),
    'utf8',
  ).split('\n');
  return lines.flatMap((line, i) => {
    const match = line.match(/^(\s*)script: \|\s*$/);
    if (!match) return [];
    const body = [];
    for (const next of lines.slice(i + 1)) {
      if (next.trim() && next.search(/\S/) <= match[1].length) break;
      body.push(next.slice(match[1].length + 2));
    }
    return [body.join('\n')];
  });
}
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

test('all embedded workflow JavaScript compiles', () => {
  for (const name of readdirSync(new URL('../workflows/', import.meta.url))) {
    if (name.endsWith('.yml'))
      for (const script of scripts(name)) new AsyncFunction(script);
  }
});

test('worker duplicate gate returns a successful no-op before reading comments', async () => {
  const oldIssue = process.env.ISSUE_NUMBER;
  const oldWorkspace = process.env.GITHUB_WORKSPACE;
  process.env.ISSUE_NUMBER = '28';
  process.env.GITHUB_WORKSPACE = new URL(
    '../../',
    import.meta.url,
  ).pathname.replace(/\/$/, '');
  const outputs = {};
  const notices = [];
  const pulls = () => {};
  const github = {
    rest: {
      issues: {
        get: async () => ({
          data: {
            state: 'open',
            labels: ['risk:low', 'agent:ready', 'area:web'],
          },
        }),
      },
      pulls: { list: pulls },
    },
    paginate: async (method) => {
      assert.equal(method, pulls);
      return [{ number: 33, head: { ref: 'agent/issue-28-docs' }, body: '' }];
    },
  };
  try {
    await new AsyncFunction(
      'require',
      'github',
      'context',
      'core',
      scripts('agent-worker.yml')[0],
    )(
      createRequire(import.meta.url),
      github,
      { repo: { owner: 'JungCode', repo: 'zentrox-web' } },
      {
        setOutput: (key, value) => {
          outputs[key] = value;
        },
        notice: (message) => notices.push(message),
        setFailed: () => assert.fail('No-op must not fail'),
      },
    );
    assert.equal(outputs.eligible, 'false');
    assert.match(notices[0], /already has PR #33/);
  } finally {
    if (oldIssue === undefined) delete process.env.ISSUE_NUMBER;
    else process.env.ISSUE_NUMBER = oldIssue;
    if (oldWorkspace === undefined) delete process.env.GITHUB_WORKSPACE;
    else process.env.GITHUB_WORKSPACE = oldWorkspace;
  }
});

const text = (value) => ({ type: 'text', part: { text: value } });
const start = { type: 'step_start' };
const finish = (reason) => ({ type: 'step_finish', part: { reason } });

test('manager ignores commentary from prior tool steps', () => {
  const result = finalText([
    start,
    text("I'll start by reading the manager policy and input files."),
    finish('tool-calls'),
    start,
    text('{"assessments":[]}'),
    finish('stop'),
  ]);
  assert.deepEqual(JSON.parse(result), { assessments: [] });
});

test('does not reuse old JSON when the final response is invalid or incomplete', () => {
  const prefix = [start, text('{"assessments":[]}'), finish('stop')];
  assert.throws(() => finalText([...prefix, start, text('unfinished')]));
  assert.throws(() =>
    JSON.parse(
      finalText([
        ...prefix,
        start,
        text('Invalid final output'),
        finish('stop'),
      ]),
    ),
  );
  assert.throws(() => finalText([start, text('partial'), finish('length')]));
  assert.throws(() => finalText([{ type: 'error' }]));
});

test('legacy text streams use the last text event', () => {
  assert.equal(
    finalText([text('commentary'), text('final report')]),
    'final report',
  );
});

test('PR detection matches exact issue numbers and generated branch names', () => {
  const pr = (ref, body = '') => ({ number: 33, head: { ref }, body });
  assert.equal(implementationPr([pr('agent/issue-28-docs')], 28).number, 33);
  assert.equal(
    implementationPr([pr('custom', 'Relates to #28')], 28).number,
    33,
  );
  assert.equal(
    implementationPr([pr('custom', 'Relates to #280')], 28),
    undefined,
  );
  assert.equal(implementationPr([pr('agent/issue-280-docs')], 28), undefined);
});
