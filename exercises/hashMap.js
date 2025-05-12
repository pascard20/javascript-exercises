// Following the exercise from The Odin Project:
// https://www.theodinproject.com/lessons/javascript-hashmap

export class HashMap {
  #defaultCapacity = 16;
  #capacity = this.#defaultCapacity;
  #buckets = new Array(this.#capacity);
  #length = 0;

  constructor(loadFactor = 0.75, shrinkFactor = 0.25) {
    this.loadFactor = loadFactor;
    this.shrinkFactor = shrinkFactor;
  }

  get capacity() {
    return this.#capacity;
  }

  get occupied() {
    return this.#buckets.reduce((acc, element) => {
      if (element) acc++;
      return acc;
    }, 0);
  }

  get length() {
    return this.#length;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  grow() {
    this.#capacity *= 2;
    this.rebuild();
  }

  shrink() {
    this.#capacity = Math.floor(this.#capacity / 2);
    this.rebuild();
  }

  rebuild() {
    const nodes = this.getNodes();
    this.removeNodes();
    nodes.forEach((node) => this.set(node.key, node.value));
  }

  set(key, value = null) {
    const hashCode = this.hash(key);

    let setNode;
    if (!this.#buckets[hashCode]) {
      setNode = new BucketNode(key, value);
      this.#buckets[hashCode] = new BucketLinkedList(setNode);
      this.#length += 1;
    } else {
      const duplicateKeyNode = this.#buckets[hashCode].at(key);
      if (duplicateKeyNode) {
        setNode = duplicateKeyNode;
        setNode.value = value;
      } else {
        setNode = this.#buckets[hashCode].append(key, value);
        this.#length += 1;
      }
    }

    if (this.#length > this.#capacity * this.loadFactor) this.grow();
    return setNode;
  }

  entry(key) {
    const hashCode = this.hash(key);

    if (this.#buckets[hashCode]?.head) {
      const targetNode = this.#buckets[hashCode].at(key);
      return targetNode ? targetNode : null;
    } else return null;
  }

  get(key) {
    const entry = this.entry(key);
    return entry ? entry.value : null;
  }

  has(key) {
    return !!this.entry(key);
  }

  remove(key) {
    const hashCode = this.hash(key);
    if (this.#buckets[hashCode]) {
      const isRemovalSuccesful = !!this.#buckets[hashCode].removeAt(key);
      if (isRemovalSuccesful) {
        this.#length -= 1;
        if (
          this.#length < this.#capacity * this.shrinkFactor &&
          this.#capacity > this.#defaultCapacity
        ) {
          this.shrink();
        }
      }
      return isRemovalSuccesful;
    } else return false;
  }

  removeNodes() {
    this.#buckets = new Array(this.#capacity);
    this.#length = 0;
  }

  clear() {
    this.#capacity = this.#defaultCapacity;
    this.removeNodes();
  }

  getNodes() {
    const nodes = [];
    this.#buckets.forEach((bucket) => {
      bucket?.collectNodes().forEach((node) => nodes.push(node));
    });
    return nodes;
  }

  get entries() {
    if (this.#length === 0) return [];
    return this.getNodes().map((node) => {
      return [node.key, node.value];
    });
  }

  get keys() {
    const keys = [];
    if (this.#length === 0) return keys;
    this.getNodes().forEach((node) => keys.push(node.key));
    return keys;
  }

  get values() {
    const values = [];
    if (this.#length === 0) return values;
    this.getNodes().forEach((node) => values.push(node.value));
    return values;
  }
}

class BucketLinkedList {
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
    targetKey = null,
    targetValue = null,
    index = 0,
    previousNode = null,
  ) {
    if (!node) return { node: null };
    const keyFound = targetKey !== null && node.key === targetKey;
    const valueFound = targetValue !== null && node.value === targetValue;
    if (keyFound || valueFound || node.nextNode === null) return { node, previousNode, index };
    return this.traverse(node.nextNode, targetKey, targetValue, index + 1, node);
  }

  at(key) {
    const returnedObject = this.traverse(this.#head, key);
    return returnedObject?.node.key === key ? returnedObject?.node : null;
  }

  find(value) {
    const returnedObject = this.traverse(this.#head, null, value);
    const returnedNode = returnedObject?.node;
    return returnedNode?.value === value ? returnedObject?.index : null;
  }

  contains(value) {
    return this.find(value) !== null;
  }

  append(key, value) {
    const newNode = new BucketNode(key, value);

    if (this.#head === null) this.#head = newNode;
    else this.#tail.nextNode = newNode;
    this.#size++;
    this.#tail = newNode;
    return newNode;
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

  collectNodes(node = this.#head, nodes = []) {
    if (node) nodes.push(node);
    if (!node || node?.nextNode === null) return nodes;
    return this.collectNodes(node.nextNode, nodes);
  }

  removeAt(key) {
    const targetObject = this.traverse(this.#head, key);
    const targetNode = targetObject.node;

    if (targetNode.key !== key) return false;

    const targetIndex = targetObject.index;
    if (targetIndex === this.#size - 1 && targetNode.key === key) return this.pop();

    if (targetIndex === 0) this.#head = this.#head.nextNode;
    else {
      const targetPreviousNode = targetObject.previousNode;
      const nextNode = targetNode.nextNode;
      targetPreviousNode.nextNode = nextNode;
    }
    this.#size--;
    return targetNode;
  }
}

class BucketNode {
  constructor(key, value = null, nextNode = null) {
    this.key = key;
    if (value) this.value = value;
    this.nextNode = nextNode;
  }
}
