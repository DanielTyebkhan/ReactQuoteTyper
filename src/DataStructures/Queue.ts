import LinkedList from './LinkedList';

/**
 * A Generic Queue Class
 */
export default class Queue<T> {
  private data: LinkedList<T>;

  /**
   * Constructs a queue 
   * @param items The items to initialize with
   */
  constructor(items: T[] | undefined = undefined) {
    this.data = new LinkedList<T>(items);
  }

  /**
   * Gets the length of the queue
   */
  getLength(): number {
    return this.data.getLength();
  }

  /**
   * Adds an item to the end of the queue
   * @param data The data to add
   */
  enqueue(data: T): void {
    this.data.insertAtTail(data);
  }

  /**
   * Removes and returns the next item from the queue
   */
  dequeue(): T | undefined {
    return this.data.removeAt(0);
  }

  /**
   * Returns the next item in the queue without removing it
   */
  peek(): T | undefined {
    return this.data.valueAt(0);
  }

  /**
   * Converts the queue into a string of the form
   *    '>e1, e1,..., en'
   * for an n element queue in which e1 is the next element
   */
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