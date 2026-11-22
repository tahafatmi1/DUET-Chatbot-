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
  assert.match(confidentKnowledgeReply('What is the fee structure?'), /Fees depend on the seat category/);
});
test('unknown question is not confident, so it can go to the LLM', () => {
  assert.equal(confidentKnowledgeReply('who won the cricket match'), null);
});

test('program change question gets the program-change answer, not the program list', () => {
  assert.equal(retrieve('Can I change my program after admission?')[0].id, 'program-change');
});
test('program list question still gets programs', () => {
  assert.equal(retrieve('Which programs are offered?')[0].id, 'programs');
  assert.equal(retrieve('Which department has software engineering?')[0].id, 'programs');
});

test('minimum percentage question gets eligibility with the 60% and 50% rules', () => {
  const reply = confidentKnowledgeReply('What is the minimum percentage required?');
  assert.match(reply, /BE\) programs: at least 60%/);
  assert.match(reply, /BS\) programs: at least 50%/);
});
test('CPN question gets the CPN formula', () => {
  assert.equal(retrieve('What is CPN and how is it calculated?')[0].id, 'cpn');
  assert.match(confidentKnowledgeReply('cpn formula'), /10% Matric \+ 30% Intermediate \+ 60% Entry Test/);
});
test('Roman Urdu eligibility', () => {
  assert.equal(retrieve('minimum marks kitne chahiye')[0].id, 'eligibility');
});

test('hostel question is not hijacked by the about entry', () => {
  assert.equal(retrieve('Is there a hostel for girls at DUET?')[0].id, 'hostel');
});
test('plural A-levels still matches eligibility', () => {
  assert.equal(retrieve('Can I apply with A-levels?')[0].id, 'eligibility');
});
test('comparison questions are not answered from a single entry', () => {
  assert.equal(confidentKnowledgeReply('Which is better, DUET or NED for computer engineering?'), null);
});
