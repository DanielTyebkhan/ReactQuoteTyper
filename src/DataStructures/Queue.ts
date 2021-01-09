import { stringify } from 'querystring';
import LinkedList from './LinkedList';
export default class Queue<T> {
  private data: LinkedList<T>;

  constructor(items: T[] | undefined = undefined) {
    this.data = new LinkedList<T>(items);
  }

  getLength(): number {
    return this.data.getLength();
  }

  enqueue(data: T): void {
    this.data.insertAtTail(data);
  }

  dequeue(): T | undefined {
    return this.data.removeAtHead();
  }

  peek(): T | undefined {
    return this.data.valueAt(0);
  }

  toString(): string {
    if (this.getLength() === 0) {
      return '';
    }
    let items = [];
    for (let i = 0; i < this.getLength(); ++i) {
      items.push(this.data.valueAt(i));
    }
    return '>' + items.join(', ');
  }
}