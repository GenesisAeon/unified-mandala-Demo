import cp from 'child_process';
import assert from 'node:assert';
import { describe, it } from 'node:test';

function run(mode='soft') {
  return cp.spawnSync('node', ['tools/governance/crep-guardrails.mjs'], {
    env: { ...process.env, CREP_GUARDRAILS_MODE: mode }, encoding: 'utf-8'
  });
}

describe('CREP Guardrails', () => {
  it('soft mode does not fail build', () => {
    const r = run('soft');
    assert.strictEqual(r.status, 0);
  });
});
