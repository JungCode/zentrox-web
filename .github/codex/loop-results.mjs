// OpenCode emits commentary in earlier tool steps. Only the final completed
// step is a result; never search older messages for JSON that happens to parse.
export function finalText(events) {
  let text = [];
  let started = false;
  let finished = false;
  let reason;
  for (const event of events) {
    if (event.type === 'error') throw new Error('OpenCode reported an error');
    if (event.type === 'step_start') {
      text = [];
      started = true;
      finished = false;
      reason = undefined;
    }
    if (event.type === 'text' && typeof event.part?.text === 'string') {
      if (!started) text = []; // Legacy streams: use the last text event.
      text.push(event.part.text);
    }
    if (event.type === 'step_finish') {
      finished = true;
      reason = event.part?.reason;
    }
  }
  if (started && (!finished || reason !== 'stop')) {
    throw new Error('OpenCode did not complete a final response');
  }
  const result = text.join('\n').trim();
  if (!result) throw new Error('OpenCode returned no final text');
  return result;
}

export function implementationPr(prs, issueNumber) {
  const reference = new RegExp(`\\bRelates to #${issueNumber}(?!\\d)`, 'i');
  return prs.find(
    (pr) =>
      pr.head.ref.startsWith(`agent/issue-${issueNumber}-`) ||
      reference.test(pr.body || ''),
  );
}
