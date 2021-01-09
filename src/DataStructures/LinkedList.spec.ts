/* eslint-disable jest/valid-expect */
import { expect } from 'chai';
import 'mocha';

import LinkedList from './LinkedList';

describe('LinkedList', () => {
  it('construct no elements', () => {
    const result = new LinkedList<string>([]).toString();
    expect(result).to.equal('');
  });

  it('construct 1 element', () => {
    const result = new LinkedList<string>(['aadfs']).toString();
    expect(result).to.equal('aadfs');
  });

  it('construct 3 elements', () => {
    const result = new LinkedList<number>([1, 2, 3]).toString();
    expect(result).to.equal('1, 2, 3');
  });

  it('size 0', () => {
    const result = new LinkedList<boolean>([]).getLength();
    expect(result).to.equal(0);
  });

  it('size 5', () => {
    const result = new LinkedList<number>([1, 4, 3, 78, 3]).getLength();
    expect(result).to.equal(5);
  });

  it('Add head to empty', () => {
    let llist = new LinkedList<number>([]);
    llist.insertAtHead(1);
    const result = llist.toString();
    expect(result).to.equal('1');
  });

  it('Add head to 3', () => {
    let llist = new LinkedList<boolean>([true, false, false]);
    llist.insertAtHead(true);
    const result = llist.toString();
    expect(result).to.equal('true, true, false, false');
  });

  it('Add tail to empty', () => {
    let llist = new LinkedList<number>([]);
    llist.insertAtTail(1);
    const result = llist.toString();
    expect(result).to.equal('1');
  });
});
