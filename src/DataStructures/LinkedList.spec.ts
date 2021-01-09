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
    expect(llist.toString()).to.equal('1');
    expect(llist.getLength()).to.equal(1);
  });

  it('Add head to 3', () => {
    let llist = new LinkedList<boolean>([true, false, false]);
    llist.insertAtHead(true);
    expect(llist.toString()).to.equal('true, true, false, false');
    expect(llist.getLength()).to.equal(4);
  });

  it('Add tail to empty', () => {
    let llist = new LinkedList<number>([]);
    llist.insertAtTail(1);
    expect(llist.toString()).to.equal('1');
    expect(llist.getLength()).to.equal(1);
  });

  it('Add tail to 4', () => {
    let llist = new LinkedList<string>(['a', 'adsf', 'adfs', 'hi']);
    llist.insertAtTail('bye');
    expect(llist.toString()).to.equal('a, adsf, adfs, hi, bye');
    expect(llist.getLength()).to.equal(5);
  });

  it('Remove from empty', () => {
    let llist = new LinkedList<number>([]);
    const result = llist.removeAt(2);
    expect(result).to.equal(undefined);
    expect(llist.toString()).to.equal('');
    expect(llist.getLength()).to.equal(0);
  });

  it('Remove from start', () => {
    let llist = new LinkedList<number>([1, 3, 4, 2]);
    const result = llist.removeAt(0);
    expect(result).to.equal(1);
    expect(llist.getLength()).to.equal(3);
    expect(llist.toString()).to.equal('3, 4, 2');
  });

  it('Remove from end', () => {
    let llist = new LinkedList<number>([1, 3, 4, 2]);
    const result = llist.removeAt(3);
    expect(result).to.equal(2);
    expect(llist.toString()).to.equal('1, 3, 4');
    expect(llist.getLength()).to.equal(3);
  });

  it('Remove from center', () => {
    let llist = new LinkedList<number>([1, 3, 4, 2]);
    const result = llist.removeAt(1);
    expect(result).to.equal(3);
    expect(llist.toString()).to.equal('1, 4, 2');
    expect(llist.getLength()).to.equal(3);
  });

  it('Remove invalid', () => {
    let llist = new LinkedList<number>([2, 4, 1, 5]);
    const result = llist.removeAt(10);
    expect(result).to.equal(undefined);
    expect(llist.toString()).to.equal('2, 4, 1, 5');
    expect(llist.getLength()).to.equal(4);
  });

  it('Remove invalid negative', () => {
    let llist = new LinkedList<number>([2, 4, 1, 5]);
    const result = llist.removeAt(-1);
    expect(result).to.equal(undefined);
    expect(llist.toString()).to.equal('2, 4, 1, 5');
    expect(llist.getLength()).to.equal(4);
  });
});
