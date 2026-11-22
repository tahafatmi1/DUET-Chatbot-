import test from 'node:test';
import assert from 'node:assert/strict';
import { retrieve, ruleBasedReply, FALLBACK } from './engine.js';

test('retrieves the application entry for "how do I apply"', () => {
  assert.equal(retrieve('How do I apply?')[0].id, 'apply');
});
test('retrieves fees for Roman Urdu query', () => {
  assert.equal(retrieve('fee kitni hai')[0].id, 'fees');
});
test('retrieves eligibility', () => {
  assert.equal(retrieve('What is the eligibility criteria?')[0].id, 'eligibility');
});
test('retrieves programs', () => {
  assert.equal(retrieve('Which programs are offered?')[0].id, 'programs');
});
test('greeting gets a welcome', () => {
  assert.match(ruleBasedReply('hello'), /Admission Assistant/);
});
test('off-topic gets fallback', () => {
  assert.equal(ruleBasedReply('who won the cricket match'), FALLBACK);
});
test('sensitive data is refused', () => {
  assert.match(ruleBasedReply('my otp is 1234'), /never share/);
});

import { confidentKnowledgeReply } from './engine.js';

test('confident match answers from our own knowledge base', () => {
  assert.match(confidentKnowledgeReply('What is the fee structure?'), /merit-based seats/);
});
test('unknown question is not confident, so it can go to the LLM', () => {
  assert.equal(confidentKnowledgeReply('who won the cricket match'), null);
});
