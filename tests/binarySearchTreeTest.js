import { Tree } from "../exercises/binarySearchTree.js";

const printArray = (array) => {
  let output;
  if (array.length === 0) output = "[ ]";
  else if (array.length === 1) output = `[ ${array[0]} ]`;
  else {
    output = `[ ${array[0]}`;
    array.slice(1).forEach((element) => (output += `, ${element}`));
    output += " ]";
  }
  console.log(output);
};

const printElements = (settings) => {
  Object.entries(settings).forEach(([description, method]) => {
    const items = [];
    method((item) => items.push(item.value));
    console.log(`\n${description}`);
    printArray(items);
  });
};

const generateRandomArray = (size, upperBoundary = 100, lowerBoundary = 0) => {
  const range = upperBoundary - lowerBoundary + 1;

  if (size > range || size < 0 || upperBoundary < lowerBoundary)
    throw new Error(
      "generateRandomArray: Unable to generate array with this size and boundaries!",
    );

  const numbers = new Set();
  while (numbers.size < size) {
    const newEntry = Math.floor(Math.random() * range) + lowerBoundary;
    numbers.add(newEntry);
  }

  return Array.from(numbers);
};

const testArray = generateRandomArray(10);
const tree = new Tree(testArray);

console.log("== Create initial tree ==");
tree.print();
console.log(`\nIs the tree balanced?: ${tree.isBalanced()}`);
console.log(`Tree size: ${tree.size}`);

const elementsSettings = {
  "Breadth-first:": tree.levelOrder.bind(tree),
  "Depth-first, preorder:": tree.preOrder.bind(tree),
  "Depth-first, inorder:": tree.inOrder.bind(tree),
  "Depth-first, postorder:": tree.postOrder.bind(tree),
};
printElements(elementsSettings);

console.log("\n== Unbalance the tree ==");
const unbalanceData = generateRandomArray(5, 150, 50);
unbalanceData.forEach((element) => tree.insert(element));
tree.print();
console.log(`\nIs the tree balanced?: ${tree.isBalanced()}`);
console.log(`Tree size: ${tree.size}`);

console.log("\n== Rebalance the tree ==");
tree.rebalance();
tree.print();
console.log(`\nIs the tree balanced?: ${tree.isBalanced()}`);
console.log(`Tree size: ${tree.size}`);

printElements(elementsSettings);

console.log("\n== Delete a leaf node ==");
const bst1 = new Tree([5, 3, 8, 2, 4, 7, 9]);
console.log("Original tree:");
bst1.print();

bst1.deleteItem(9);
console.log("\nAfter deleting 9 (leaf node):");
bst1.print();

console.log("\n== Delete a node with one child ==");
const bst2 = new Tree([5, 3, 8, 2, 4, 7, 9, 6]);
console.log("Original tree:");
bst2.print();

bst2.deleteItem(3);
console.log("\nAfter deleting 3 (node with one child):");
bst2.print();

console.log("\n== Delete a node with two children ==");
const bst3 = new Tree([5, 3, 8, 2, 4, 7, 9]);
console.log("Original tree:");
bst3.print();

bst3.deleteItem(3);
console.log("\nAfter deleting 3 (node with two children):");
bst3.print();

console.log("\n== Delete the root node ==");
const bst4 = new Tree([5, 3, 8, 2, 4, 7, 9]);
console.log("Original tree:");
bst4.print();

bst4.deleteItem(5);
console.log("\nAfter deleting 5 (root node):");
bst4.print();

console.log("\n== Delete a non-existent node ==");
const bst5 = new Tree([5, 3, 8, 2, 4, 7, 9]);
console.log("Original tree:");
bst5.print();

bst5.deleteItem(10);
console.log("\nAfter attempting to delete 10 (non-existent node):");
bst5.print();

console.log("\n== Multiple deletions on the same tree ==");
const bst6 = new Tree([15, 10, 20, 8, 12, 17, 25, 6, 11, 16, 27]);
console.log("Original tree:");
bst6.print();

bst6.deleteItem(8); // Delete a node with one child
console.log("\nAfter deleting 8:");
bst6.print();

bst6.deleteItem(20); // Delete a node with two children
console.log("\nAfter deleting 20:");
bst6.print();

bst6.deleteItem(15); // Delete the root node
console.log("\nAfter deleting 15 (root):");
bst6.print();
