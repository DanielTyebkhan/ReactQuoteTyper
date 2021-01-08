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
    this.head = new ListNode<T>(items[0]);
    this.size = items.length;
    let runner = this.head;
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
    (<ListNode<T>>this.tail).next = new ListNode<T>(data);
    this.tail = this.tail?.next;
    ++this.size;
  }

  removeAtHead(): T | undefined {
    let data = this.head?.data;
    this.head = this.head?.next;
    --this.size;
    return data;
  }

  valueAt(index: number): T | undefined {
    let runner: ListNode<T> | undefined = this.head;
    for (let i = 0; i < index + 1; ++i) {
      runner = runner?.next;
    }
    return runner?.data;
  }
}