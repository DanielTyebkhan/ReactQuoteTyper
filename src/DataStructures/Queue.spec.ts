/* eslint-disable jest/valid-expect */ 
import { expect } from 'chai';
import 'mocha';
import { isTemplateSpan } from 'typescript';

import Queue from './Queue';

/**
 * Test Suite for Queue class
 */
describe('Queue', () => {
  it('Construct Empty', () => {
    const queue = new Queue<number>();
    expect(queue.toString()).to.equal('');
    expect(queue.getLength()).to.equal(0);
  });

  it('Construct 1 Element', () => {
    const queue = new Queue<boolean>([true]);
    expect(queue.toString()).to.equal('>true');
    expect(queue.getLength()).to.equal(1);
  });

  it('Construct 5 Element', () => {
    const queue = new Queue<number>([1, 2, 3, 4, 4]);
    expect(queue.toString()).to.equal('>1, 2, 3, 4, 4');
    expect(queue.getLength()).to.equal(5);
  });

  it('Add to empty', () => {
    const queue = new Queue<string>();
    queue.enqueue('hi');
    expect(queue.toString()).to.equal('>hi');
    expect(queue.getLength()).to.equal(1);
  });

  it('Add to 1', () => {
    const queue = new Queue<string>(['bye']);
    queue.enqueue('hi');
    expect(queue.toString()).to.equal('>bye, hi');
    expect(queue.getLength()).to.equal(2);
  });

  it('Add to 3', () => {
    const queue = new Queue<string>(['bye', 'hello', 'goodbye']);
    queue.enqueue('hi');
    expect(queue.toString()).to.equal('>bye, hello, goodbye, hi');
    expect(queue.getLength()).to.equal(4);
  });

  it('Remove from empty', () => {
    const queue = new Queue<boolean>();
    const result = queue.dequeue();
    expect(result).to.equal(undefined);
    expect(queue.toString()).to.equal('');
    expect(queue.getLength()).to.equal(0);
  });

  it('Remove from 1', () => {
    const queue = new Queue<boolean>([true]);
    const result = queue.dequeue();
    expect(result).to.equal(true);
    expect(queue.toString()).to.equal('');
    expect(queue.getLength()).to.equal(0);
  });

  it('Remove from 5', () => {
    const queue = new Queue<number>([7, 5, 3, 1, 1]);
    const result = queue.dequeue();
    expect(result).to.equal(7);
    expect(queue.toString()).to.equal('>5, 3, 1, 1');
    expect(queue.getLength()).to.equal(4);
  });

  it('Peek', () => {
    const queue = new Queue<number>([3, 2, 1]);
    const result = queue.peek();
    expect(result).to.equal(3);
    expect(queue.toString()).to.equal('>3, 2, 1');
    expect(queue.getLength()).to.equal(3);
  });
});