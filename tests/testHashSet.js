import { HashSet } from "../exercises/hashSet.js";

const set = new HashSet();

console.log("== Add elements ==");
set.add("apple");
set.add("banana");
set.add("cherry");
console.log(set.has("apple")); // true
console.log(set.has("banana")); // true
console.log(set.has("cherry")); // true
console.log(set.has("grape")); // false

console.log("\n== Add duplicate ==");
set.add("apple");
console.log(set.length); // 3 (no duplicate added)

console.log("\n== Delete element ==");
console.log(set.remove("banana")); // true
console.log(set.has("banana")); // false
console.log(set.length); // 2

console.log("\n== Delete missing element ==");
console.log(set.remove("grape")); // false

console.log("\n== Clear set ==");
set.clear();
console.log(set.length); // 0
console.log(set.has("apple")); // false

console.log("\n== Add after clear ==");
set.add("fig");
console.log(set.has("fig")); // true
console.log(set.length); // 1

console.log("\n== Entries ==");
console.log(set.entries); // ['fig']

console.log("\n== Values ==");
console.log(set.values); // ['fig']
set.clear();

console.log("\n== Capacity in empty set ==");
console.log(set.capacity); // Should be 16 by default

console.log("\n== Adding many elements to trigger rebuild ==");
for (let i = 0; i < 20; i++) {
  set.add("item" + i);
  console.log(`Added item ${i} | Length: ${set.length} | Capacity: ${set.capacity}`);
}

console.log("\n== Check that all elements exist after rebuild ==");
let allFound = true;
for (let i = 0; i < 20; i++) {
  if (!set.has("item" + i)) {
    console.log(`Missing: item${i}`);
    allFound = false;
  }
}
console.log(allFound ? "All items found" : "Items missing");

console.log("\n== Final Capacity ==");
console.log(set.capacity); // Should be 32
