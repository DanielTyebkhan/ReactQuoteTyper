/**
 * Generic Linked List Node
 */
class ListNode<T> {
  data: T;
  next: ListNode<T> | undefined;

  /**
   * Constructs a ListNode
   * @param data The data to put in the node
   * @param next the node to set as the next node
   */
  constructor(data: T, next: ListNode<T> | undefined = undefined) {
    this.data = data;
    this.next = next;
  }
}

export default class LinkedList<T> {
  private head: ListNode<T> | undefined;
  private tail: ListNode<T> | undefined;
  private size: number;

  /**
   * Construct a linkedlist
   * @param items Items for the linkedlist to start with
   */
  constructor(items: T[] | undefined = undefined) {
    if (items) {
      this.head = items.length > 0 ? new ListNode<T>(items[0]) : undefined;
      this.size = items.length;
      let runner = this.head as ListNode<T>;
      for (let i = 1; i < this.getLength(); ++i) {
        runner.next = new ListNode<T>(items[i]);
        runner = runner.next;
      }
      this.tail = runner;
    }
    else {
      this.head = undefined;
      this.tail = undefined;
      this.size = 0;
    }
  }

  /**
   * Returns the number of items in the LinkedList
   */
  getLength(): number {
    return this.size;
  }

  /**
   * Inserts data at the head of the LinkedList
   * @param data The data to insert
   */
  insertAtHead(data: T): void {
    let node = new ListNode<T>(data, this.head);
    this.head = node;
    ++this.size;
  }

  /**
   * Inserts data at the tail of the LinkedList
   * @param data The data to insert
   */
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

  /**
   * Removes an element from the LinkedList
   * @param index The 0-based index to remove from the LinkedList
   */
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

  /**
   * Gets the value from a position
   * @param index The value at the 0-based index
   */
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

  /**
   * Convert the linked list into an array
   */
  getArray(): T[] {
    if (this.getLength() === 0) {
      return [];
    }
    const lst = [];
    let runner = this.head;
    while (runner) {
      lst.push(runner.data);
      runner = runner.next;
    }
    return lst;
  }

  /**
   * Converts the linked list into a string of form 'e1, e2,...,en'
   * for each ei in a LinkedList of size n
   */
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