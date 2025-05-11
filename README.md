# JavaScript Exercises

Made by **Łukasz Pasternak** – [pascard20](https://github.com/pascard20)

## Fibonacci Sequence

This project implements the **Fibonacci Sequence** in JavaScript, as part of [The Odin Project](https://www.theodinproject.com/lessons/javascript-recursion) curriculum. It includes two versions: one using iteration and the other using recursion. Both will generate a list of Fibonacci numbers.

🔗 Code: [fibonacci.js](https://github.com/pascard20/javascript-exercises/blob/main/fibonacci.js)

### Features

#### Iterative Solution: `fibs(number)`

- Accepts a number and returns an array of that many Fibonacci numbers.
- Uses a loop to generate the sequence by adding the last two numbers in the array each time.
- Example:
  ```javascript
  fibs(8); // Output: [0, 1, 1, 2, 3, 5, 8, 13]
  ```

#### Recursive Solution: `fibsRec(number)`

- Also takes a number and returns that many Fibonacci numbers in an array.
- This one uses recursion to build the sequence. It keeps calling itself with a smaller input, while summing the last two values from the growing array.
- Example:
  ```javascript
  fibsRec(8); // Output: [0, 1, 1, 2, 3, 5, 8, 13]
  ```

## Linked List

This project is an implementation of a **Linked List** data structure in JavaScript, based on [The Odin Project](https://www.theodinproject.com/lessons/javascript-linked-lists) curriculum. It demonstrates the use of classes, recursion, and encapsulation to build a fully functional linked list.

🔗 Code: [linkedList.js](https://github.com/pascard20/javascript-exercises/blob/main/linkedList.js)

### Features

#### Node Class

The `Node` class represents an individual node in the linked list. Each node contains:

- `value`: The data stored in the node.
- `nextNode`: A reference to the next node in the list (or `null` if it's the last one).

#### LinkedList Class

The `LinkedList` class represents the entire linked list and provides methods for adding, removing, searching, and displaying the nodes.

- `append(value)`: Adds a new node with the given value to the end of the list.
- `at(index)`: Returns the node at the specified index.
- `contains(value)`: Checks if a value exists in the list.
- `find(value)`: Returns the index of the node containing the value, or `null` if not found.
- `head`: Returns the first node in the list.
- `insertAt(value, index)`: Inserts a new node with the given value at the specified index.
- `pop()`: Removes the last node from the list.
- `prepend(value)`: Adds a new node with the given value to the start of the list.
- `removeAt(index)`: Removes the node at the specified index.
- `size`: Returns the total number of nodes in the list.
- `tail`: Returns the last node in the list.
- `toString()`: Returns a string representation of the list in the format `( value ) -> ( value ) -> null`.

### Highlights

- **Encapsulation**: My implementation uses private fields (`#head`, `#tail`, `#size`) to protect the internal state of the linked list and prevent unauthorized editing.
- **Recursion**: A recursive `traverse` method is used to navigate the list, simplifying operations like finding nodes or updating links.
- **Readability**: The `toString` method makes it easy to visualize the list and debug the code.

## Merge Sort

This project implements the **Merge Sort** algorithm in JavaScript, as part of [The Odin Project](https://www.theodinproject.com/lessons/javascript-recursion) curriculum. The implementation uses a recursive approach to divide and conquer, sorting an array by repeatedly splitting it into smaller subarrays and merging them back together in sorted order.

🔗 Code: [mergeSort.js](https://github.com/pascard20/javascript-exercises/blob/main/mergeSort.js)

### Features

#### `mergeSort(numbers)`

- Takes an array of numbers as input and returns a sorted version.
- Uses recursion to divide the array into halves until each subarray has only one element.
- Merges the sorted subarrays back together using the `merge` function.
- Example:
  ```javascript
  mergeSort([3, 2, 1, 13, 8, 5, 0, 1]); // Output: [0, 1, 1, 2, 3, 5, 8, 13]
  mergeSort([105, 79, 100, 110]); // Output: [79, 100, 105, 110]
  ```

#### `merge(left, right)`

- Takes two sorted arrays and combines them into one sorted array.
- Compares the first items of each array and adds the smaller one to the result.
- Once one array is empty, it just adds whatever’s left in the other one.
