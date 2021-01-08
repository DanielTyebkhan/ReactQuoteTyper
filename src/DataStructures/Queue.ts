import LinkedList from './LinkedList';
export class Queue<T> {
  data: LinkedList<T>;

  constructor(items: T[]) {
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
}