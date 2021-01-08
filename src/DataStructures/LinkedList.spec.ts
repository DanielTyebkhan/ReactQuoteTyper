/* eslint-disable jest/valid-expect */
import { expect } from 'chai';
import 'mocha';

import LinkedList from './LinkedList';

describe('ConstructLinkedList', () => {
  it('no elements', () => {
    const result = new LinkedList<string>([]).toString();
    expect(result).to.equal('');
  });

  it('3 elements', () => {
    const result = new LinkedList<number>([1, 2, 3]).toString();
    expect(result).to.equal('1, 2, 3');
  });
});