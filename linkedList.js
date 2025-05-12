// Following the exercise from The Odin Project:
// https://www.theodinproject.com/lessons/javascript-linked-lists

class LinkedList {
  #head;
  #size;
  #tail;

  constructor(head = null) {
    this.#head = head;
    this.#tail = head;
    this.#size = head ? 1 : 0;
  }

  get head() {
    return this.#head;
  }

  get size() {
    return this.#size;
  }

  get tail() {
    return this.#tail;
  }

  traverse(
    node = this.#head,
    targetIndex = null,
    targetValue = null,
    index = 0,
    previousNode = null,
  ) {
    if (!node) return { node: null };
    const indexFound = targetIndex !== null && index === targetIndex;
    const valueFound = targetValue !== null && node.value === targetValue;
    if (indexFound || valueFound || node.nextNode === null)
      return { node, previousNode, index };
    return this.traverse(node.nextNode, targetIndex, targetValue, index + 1, node);
  }

  append(value) {
    const newNode = new Node(value);

    if (this.#head === null) this.#head = newNode;
    else this.#tail.nextNode = newNode;
    this.#size++;
    this.#tail = newNode;
    return newNode;
  }

  prepend(value) {
    const newNode = new Node(value, this.#head);
    this.#head = newNode;
    this.#size++;
    return newNode;
  }

  at(index) {
    const returnedObject = this.traverse(this.#head, index);
    return returnedObject?.index === index ? returnedObject?.node : null;
  }

  find(value) {
    const returnedObject = this.traverse(this.#head, null, value);
    const returnedNode = returnedObject?.node;
    return returnedNode?.value === value ? returnedObject?.index : null;
  }

  contains(value) {
    return this.find(value) !== null;
  }

  pop() {
    if (this.#head === null) return false;

    let removedNode;
    if (this.#head.nextNode === null) {
      removedNode = this.#head;
      this.#head = null;
      this.#tail = null;
    } else {
      const previousNode = this.traverse().previousNode;
      removedNode = previousNode.nextNode;
      previousNode.nextNode = null;
      this.#tail = previousNode;
    }
    this.#size--;
    return removedNode;
  }

  collectValues(node = this.#head, values = []) {
    if (node?.value) values.push(node.value);
    if (!node || node?.nextNode === null) return values;
    return this.collectValues(node.nextNode, values);
  }

  toString() {
    const values = this.collectValues();
    return values.length ? `( ${values.join(" ) -> ( ")} ) -> null` : "null";
  }

  insertAt(value, index) {
    if (index < 0 || index > this.#size) throw new Error("insertAt: Index out of bounds");

    if (index === this.#size) return this.append(value);
    if (index === 0) return this.prepend(value);

    const previousNode = this.traverse(this.#head, index - 1).node;
    const nextNode = previousNode.nextNode;
    const newNode = new Node(value, nextNode);
    previousNode.nextNode = newNode;
    this.#size++;
    return newNode;
  }

  removeAt(index) {
    if (index < 0 || index >= this.#size) throw new Error("removeAt: Index out of bounds");

    if (index === this.#size - 1) return this.pop();

    let removedNode;
    if (index === 0) {
      removedNode = this.#head;
      const newHead = this.#head.nextNode;
      this.#head = newHead;
    } else {
      const previousNode = this.traverse(this.#head, index - 1).node;
      removedNode = previousNode.nextNode;
      const nextNode = previousNode.nextNode.nextNode;
      previousNode.nextNode = nextNode;
    }
    this.#size--;
    return removedNode;
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
