// Following the exercise from The Odin Project:
// https://www.theodinproject.com/lessons/javascript-binary-search-trees

import { mergeSort } from "./mergeSort.js";
import { Queue } from "./queue.js";

const removeDuplicates = (array) => [...new Set(array)];

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor(data = []) {
    this.root = data.length ? this.#buildTree(data) : null;
  }

  #printStep = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right) {
      this.#printStep(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left) {
      this.#printStep(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  print() {
    this.#printStep(this.root);
  }

  #buildTreeStep(data) {
    if (data.length === 0) return null;
    if (data.length === 1) {
      return new Node(data[0]);
    }
    if (data.length === 2) {
      const root = new Node(data[1]);
      root.left = new Node(data[0]);
      return root;
    }
    const centerIndex = Math.floor(data.length / 2);
    const root = new Node(data[centerIndex]);
    root.left = this.#buildTreeStep(data.slice(0, centerIndex));
    root.right = this.#buildTreeStep(data.slice(centerIndex + 1));
    return root;
  }

  #buildTree(data) {
    data = mergeSort(removeDuplicates(data));
    return this.#buildTreeStep(data);
  }

  #traverse(node = this.root) {
    if (!node) return null;
    if (!node.left && !node.right) return node.value;

    let values = [];
    if (node.left) values = values.concat(this.#traverse(node.left));
    values.push(node.value);
    if (node.right) values = values.concat(this.#traverse(node.right));
    return values;
  }

  get size() {
    const data = this.#traverse();
    return data.length;
  }

  rebalance() {
    const data = this.#traverse();
    this.root = this.#buildTree(data);
  }

  find(value, node = this.root) {
    if (node === null) return null;
    if (value === node.value) return node;

    if (value < node.value) return this.find(value, node.left);
    if (value > node.value) return this.find(value, node.right);
  }

  depth(value, node = this.root, depth = 0) {
    if (node === null) return null;
    if (value === node.value) return depth;

    if (value < node.value) return this.depth(value, node.left, depth + 1);
    if (value > node.value) return this.depth(value, node.right, depth + 1);
  }

  #compareHeights(node = null, height = 0) {
    const leftHeight = this.#heightHelper(node.left, height);
    const rightHeight = this.#heightHelper(node.right, height);
    return leftHeight >= rightHeight ? leftHeight : rightHeight;
  }

  #heightHelper(node = null, height = 0) {
    if (!node) return height;
    return this.#compareHeights(node, height + 1);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return this.#compareHeights(node);
  }

  insert(value, node = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return this.root;
    }

    if (node === null) return new Node(value);

    if (node.value > value) {
      node.left = this.insert(value, node.left);
    } else if (node.value < value) {
      node.right = this.insert(value, node.right);
    } else {
      console.log("Duplicate found!");
    }

    return node;
  }

  #findSmallestValue(node) {
    if (node.left === null) return node.value;
    return this.#findSmallestValue(node.left);
  }

  #deleteHelper(value, targetNode) {
    if (!targetNode) return null;
    if (targetNode.value === value) {
      // Node doesn't have any children
      if (targetNode.left === null && targetNode.right === null) return null;

      // Node has only one child
      if (targetNode.left === null) return targetNode.right;
      if (targetNode.right === null) return targetNode.left;

      // Node has two children
      const smallestValue = this.#findSmallestValue(targetNode.right);
      this.deleteItem(smallestValue, targetNode.right);
      targetNode.value = smallestValue;
    } else this.deleteItem(value, targetNode);

    return targetNode;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;
    if (node.value === value) {
      // This applies only if root should be deleted
      this.root = this.#deleteHelper(value, this.root);
    } else if (node.value > value) {
      node.left = this.#deleteHelper(value, node.left);
    } else if (node.value < value) {
      node.right = this.#deleteHelper(value, node.right);
    }
  }

  // Iterative solution
  levelOrder(callback) {
    if (!callback) throw new Error("levelOrder: Callback required!");
    if (this.root === null) return;

    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const currentItem = queue.dequeue();
      callback(currentItem);
      if (currentItem.left) queue.enqueue(currentItem.left);
      if (currentItem.right) queue.enqueue(currentItem.right);
    }
  }

  /*
  // Recursive solution
  levelOrderRecursive(callback, node = this.root, queue = new Queue()) {
    if (!callback) throw new Error("levelOrder: Callback required!");
    if (node === null) return;
    callback(node);

    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);

    if (queue.isEmpty()) return;
    const nextNode = queue.dequeue();
    this.levelOrderRecursive(callback, nextNode, queue);
  }
  */

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("inOrder: Callback required!");
    if (node === null) return;

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("preOrder: Callback required!");
    if (node === null) return;

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("postOrder: Callback required!");
    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  isBalanced(node = this.root) {
    if (!node || (!node.left && !node.right)) return true;

    const leftHeight = node.left ? this.height(node.left.value) + 1 : 0;
    const rightHeight = node.right ? this.height(node.right.value) + 1 : 0;

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    if (node.left && node.right) {
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    return true;
  }
}
