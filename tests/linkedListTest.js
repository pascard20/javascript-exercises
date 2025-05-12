import { LinkedList } from "../exercises/linkedList.js";

console.log("== Initialize the list ==");
const list = new LinkedList();
console.log(`Initial list:, ${list.toString()}, length: ${list.size}`); // Should be empty, toString => null, size => 0

console.log("\n== Append values ==");
list.append(10);
list.append(20);
list.append(30);
console.log("After append:", list.toString()); // ( 10 ) -> ( 20 ) -> ( 30 ) -> null

console.log("\n== Prepend value ==");
list.prepend(5);
console.log("After prepend:", list.toString()); // ( 5 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> null

console.log("\n== Check length ==");
console.log("Length:", list.size); // Should be 4

console.log("\n== Head and tail value ==");
console.log("Head value:", list.head.value); // Should be 5
console.log("Tail value:", list.tail.value); // Should be 30

console.log("\n== Get value at specific index ==");
console.log("Value at index 2:", list.at(2)?.value); // Should be 20

console.log("\n== Check if the list contains values ==");
console.log("Contains 20:", list.contains(20)); // true
console.log("Contains 100:", list.contains(100)); // false

console.log("\n== Find index of a value ==");
console.log("Index of 30:", list.find(30)); // 3
console.log("Index of 100:", list.find(100)); // null

console.log("\n== Insert at index ==");
list.insertAt(15, 2);
console.log("After insertAt(15, 2):", list.toString()); // ( 5 ) -> ( 10 ) -> ( 15 ) -> ( 20 ) -> ( 30 ) -> null

console.log("\n== Remove at index ==");
list.removeAt(2);
console.log("After removeAt(2):", list.toString()); // ( 5 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> null

console.log("\n== Pop last item ==");
list.pop();
console.log("After pop:", list.toString()); // ( 5 ) -> ( 10 ) -> ( 20 ) -> null

console.log("\n== Collect values ==");
const values = [];
list.collectValues(list.head, values);
console.log("Saved values:", values); // [ 5, 10, 20 ]

console.log("\n== String representation of the list ==");
console.log("Final list:", list.toString()); // ( 5 ) -> ( 10 ) -> ( 20 ) -> null

console.log("\n|| SPECIAL EDGE CASES ||");

const list1 = new LinkedList();
list1.append(1);
list1.append(2);
list1.append(3);

console.log("\n== find() with absent value ==");
console.log("Find 5 (should be null or -1):", list1.find(5)); // Should be null

console.log("\n== pop() with 0 or 1 element ==");
const list2 = new LinkedList();
list2.pop(); // shouldn't crash
list2.append(42);
list2.pop(); // should remove 42, list becomes empty
console.log("After popping single element:", list2.toString()); // Should be null

console.log("\n== Test tail accuracy ==");
const list3 = new LinkedList();
for (let i = 0; i < 1000; i++) list3.append(i);
console.log("Length after 1000 appends:", list3.size); // Should be 1000
console.log("Tail value (should be 999):", list3.tail?.value); // Should be 999
list3.pop();
console.log("Tail value after pop (should be 998):", list3.tail?.value); // Should be 998

console.log("\n== Insert at index 0 ==");
const list4 = new LinkedList();
list4.insertAt("start", 0);
console.log("After insertAt(0):", list4.toString()); // Should be "start -> null"

console.log("\n== Remove at index 0 ==");
list4.append("middle");
list4.append("end");
list4.removeAt(0);
console.log("After removeAt(0):", list4.toString()); // Should not include "start"

console.log("\n== Insert or remove at invalid indices ==");
const list5 = new LinkedList();
list5.append("a");

try {
  list5.insertAt("oops", -1); // Invalid index
} catch (e) {
  console.log("Caught error for insertAt(-1):", e.message);
}

try {
  list5.removeAt(10); // Out of bounds
} catch (e) {
  console.log("Caught error for removeAt(10):", e.message);
}
