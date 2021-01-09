/* eslint-disable jest/valid-expect */
import { expect } from 'chai';
import 'mocha';

import Queue from './Queue';

/**
 * Test Suite for Queue class
 */
describe('Queue', () => {
  it('Construct Empty Queue', () => {
    const result = new Queue<number>().toString();
    expect(result).to.equal('');
  });
});