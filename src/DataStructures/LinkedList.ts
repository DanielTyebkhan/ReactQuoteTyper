class ListNode<T> {
  data: T;
  next: ListNode<T> | undefined;

  constructor(data: T, next: ListNode<T> | undefined = undefined) {
    this.data = data;
    this.next = next;
  }
}

export default class LinkedList<T> {
  private head: ListNode<T> | undefined;
  private tail: ListNode<T> | undefined;
  private size: number;

  constructor(items: T[]) {
    this.head = items.length > 0 ? new ListNode<T>(items[0]) : undefined;
    this.size = items.length;
    let runner = this.head as ListNode<T>;
    for (let i = 1; i < this.getLength(); ++i) {
      runner.next = new ListNode<T>(items[i]);
      runner = runner.next;
    }
    this.tail = runner;
  }

  getLength(): number {
    return this.size;
  }

  insertAtHead(data: T): void {
    let node = new ListNode<T>(data, this.head);
    this.head = node;
    ++this.size;
  }

  insertAtTail(data: T): void {
    let node = new ListNode<T>(data);
    if (this.tail) {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    else {
      this.head = this.tail = node;
    }
    ++this.size;
  }

  removeAt(index: number): T | undefined {
    if (index >= this.getLength() || index < 0) {
      return undefined;
    }
    let data = undefined;
    if (index === 0) {
      data = this.head?.data;
      this.head = this.head?.next;
    }
    else {
      let runner = this.head as ListNode<T>;
      for (let i = 1; i < index; ++i) {
        runner = runner.next as ListNode<T>;
      }
      data = runner.next?.data;
      runner.next = runner.next?.next;
    }
    --this.size;
    return data;
  }

  valueAt(index: number): T | undefined {
    if (index < 0 || index >= this.getLength()) {
      return undefined;
    }
    let runner = this.head as ListNode<T>;
    for (let i = 0; i < index; ++i) {
      runner = runner?.next as ListNode<T>;
    }
    return runner?.data;
  }

  toString(): string {
    let stringForm = '';
    let runner = this.head;
    if (runner?.data !== undefined) {
      while (runner.next) {
        stringForm += runner.data + ', ';
        runner = runner.next;
      }
    stringForm += runner.data;
    }
    return stringForm;
  }
}