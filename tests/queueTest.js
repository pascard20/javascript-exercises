import { Queue } from "../exercises/queue.js";

console.log("== Initialize and check if empty ==");
const queue = new Queue();
console.log(`Queue is empty: ${queue.isEmpty()} (Expected: true)`);
console.log(`Queue size: ${queue.size()} (Expected: 0)`);

console.log("\n== Enqueue elements ==");
queue.enqueue("Apple");
console.log(`Queue size after adding "Apple": ${queue.size()} (Expected: 1)`);
console.log(`Queue is empty: ${queue.isEmpty()} (Expected: false)`);

queue.enqueue("Banana");
queue.enqueue("Cherry");
console.log(`Queue size after adding 3 elements: ${queue.size()} (Expected: 3)`);

console.log("\n== Peek at the first element ==");
console.log(`Peek result: ${queue.peek()} (Expected: "Apple")`);
console.log(`Queue size after peek: ${queue.size()} (Expected: 3)`);

console.log("\n== Print the queue ==");
console.log("Queue contents:");
queue.print(); // Should print: [ Apple, Banana, Cherry ]

console.log("\n== Dequeue elements ==");
const firstItem = queue.dequeue();
console.log(`Dequeued item: ${firstItem} (Expected: "Apple")`);
console.log(`Queue size after dequeue: ${queue.size()} (Expected: 2)`);

const secondItem = queue.dequeue();
console.log(`Dequeued item: ${secondItem} (Expected: "Banana")`);
console.log(`Queue size after dequeue: ${queue.size()} (Expected: 1)`);

console.log("Queue contents after dequeuing 2 elements:");
queue.print(); // Should print: [ Cherry ]

console.log("\n== Clear the queue ==");
queue.clear();
console.log(`Queue size after clear: ${queue.size()} (Expected: 0)`);
console.log(`Queue is empty after clear: ${queue.isEmpty()} (Expected: true)`);

console.log("\n== Edge cases ==");
console.log(`Peek on empty queue: ${queue.peek()} (Expected: undefined)`);
console.log(`Dequeue on empty queue: ${queue.dequeue()} (Expected: undefined)`);

console.log("\n== Mixed operations ==");
queue.enqueue("Dog");
queue.enqueue("Elephant");
queue.dequeue();
queue.enqueue("Fox");
console.log(`Queue size after mixed operations: ${queue.size()} (Expected: 2)`);
console.log("Queue contents after mixed operations:");
queue.print(); // Should print: [ Elephant, Fox ]
