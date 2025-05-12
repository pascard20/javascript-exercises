import { HashMap } from "./hashMap.js";

const populateHashTable = (hashTable, entries) => {
  entries.forEach((entry) => hashTable.set(entry[0], entry[1]));
};

const test = new HashMap();

console.log("== Add initial entries ==");
let testEntries = [
  ["apple", "red"],
  ["banana", "yellow"],
  ["carrot", "orange"],
  ["dog", "brown"],
  ["elephant", "gray"],
  ["frog", "green"],
  ["grape", "purple"],
  ["hat", "black"],
  ["ice cream", "white"],
  ["jacket", "blue"],
  ["kite", "pink"],
  ["lion", "golden"],
];
populateHashTable(test, testEntries);
console.log("Length before growth:", test.length); // Should be 12
console.log("Capacity before growth:", test.capacity); // Should be 16

console.log("\n== Overwrite keys ==");
test.set("apple", "green");
test.set("dog", "black");
test.set("lion", "yellow");
console.log("Length after overwrites:", test.length); // Should be 12
console.log("Value of apple:", test.get("apple")); // Should be 'green'
console.log("Value of dog:", test.get("dog")); // Should be 'black'
console.log("Value of lion:", test.get("lion")); // Should be 'yellow'

console.log("\n== Exceed the load factor ==");
test.set("moon", "silver"); // 13th item → should trigger resizing

console.log("Length after growth:", test.length); // Should be 13
console.log("Capacity after growth:", test.capacity); // Should be doubled (likely 32)
console.log("All keys:", test.keys);
console.log("All values:", test.values);
console.log("All entries:", test.entries);

console.log("\n== Remove an entry ==");
console.log("Length before remove:", test.length); // Should be 13
console.log("Has key banana:", test.has("banana")); // true
console.log("Removing banana:", test.remove("banana")); // true or the removed value
console.log("Has key banana after remove:", test.has("banana")); // false
console.log("Length after remove:", test.length); // Should be 12

console.log("\n== Clear the hash map ==");
test.clear();
console.log("Length after clear:", test.length); // 0
console.log("Capacity after clear:", test.capacity); // Should still be 32 if your map keeps capacity after clear
console.log("Keys after clear:", test.keys); // []

console.log("\n== Add large amount of entries ==");
testEntries = [
  ["apple", "red"],
  ["banana", "yellow"],
  ["carrot", "orange"],
  ["dog", "brown"],
  ["elephant", "gray"],
  ["frog", "green"],
  ["grape", "purple"],
  ["hat", "black"],
  ["ice cream", "white"],
  ["jacket", "blue"],
  ["kite", "pink"],
  ["lion", "golden"],
  ["notebook", "spiral"],
  ["orange", "citrus"],
  ["pencil", "wooden"],
  ["quilt", "warm"],
  ["robot", "metal"],
  ["sunflower", "yellow"],
  ["tiger", "striped"],
  ["umbrella", "rainy"],
  ["violin", "string"],
  ["whale", "blue"],
  ["xylophone", "musical"],
  ["yogurt", "creamy"],
  ["zebra", "black and white"],
  ["avocado", "green"],
  ["beetle", "shiny"],
  ["cactus", "spiky"],
  ["drum", "loud"],
  ["eagle", "majestic"],
  ["firetruck", "red"],
  ["glasses", "clear"],
];
populateHashTable(test, testEntries);
console.log("Length:", test.length);
console.log("Buckets occupied:", test.occupied);
console.log("Capacity:", test.capacity);
