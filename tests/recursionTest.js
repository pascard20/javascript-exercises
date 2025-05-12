import { fibs, fibsRec } from "../exercises/fibonacci.js";
import { mergeSort } from "../exercises/mergeSort.js";

console.log("== Fibonacci ==");
console.log("Iterative solution:", fibs(14));
console.log("Recursive solution:", fibsRec(14));

console.log("\n== Merge Sort ==");
const test1 = [3, 2, 1, 13, 8, 5, 0, 1, 50, 3, 2];
console.log(test1, "=>", mergeSort(test1));
const test2 = [105, 79, 100, 110];
console.log(test2, "=>", mergeSort(test2));
