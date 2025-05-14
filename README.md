# JavaScript Exercises

## Fibonacci Sequence

Two functions that generate the Fibonacci sequence: iterative and recursive solution.

🔗 [Code](https://github.com/pascard20/javascript-exercises/blob/main/exercises/fibonacci.js)

#### Features:

- `fibs(number)` – Iterative version. Returns an array of the first `number` Fibonacci numbers using a loop.
- `fibsRec(number)` – Recursive version. Builds the array by calling itself and summing the last two elements.

#### Example:

```js
fibs(8); // [0, 1, 1, 2, 3, 5, 8, 13]
fibsRec(8); // [0, 1, 1, 2, 3, 5, 8, 13]
```

## Hash Map

Custom HashMap class with hashing, collision handling via linked lists, and dynamic resizing.

🔗 [Code](https://github.com/pascard20/javascript-exercises/blob/main/exercises/hashMap.js)

#### Key Features

- `set(key, value)` – Adds/updates a key-value pair.
- `get(key)` – Retrieves the value for a key, or null if not found.
- `remove(key)` – Deletes the key-value pair. Returns true if successful.
- `has(key)` – Checks if a key exists.
- `clear()` – Empties the hash map and resets capacity.
- `keys` – Array of all keys.
- `values` – Array of all values.
- `entries` – Array of all key-value pairs.
- `capacity` – Total number of buckets.
- `length` – Total number of entries.
- `occupied` – Buckets that contain at least one entry.

#### Highlights

- Automatically resizes based on load and shrink factors.
- Uses linked lists (as created in another exercise) for collision resolution.
- Prime number-based hashing with intent of even key distribution.
- Internal state is protected using private class fields.

## Hash Set

The HashSet uses the existing HashMap structure to store unique keys without associated values.

🔗 [Code](https://github.com/pascard20/javascript-exercises/blob/main/exercises/hashSet.js)

#### Features

- `add(key)` – Adds a key to the set if it doesn't already exist.
- Inherits `remove`, `has`, `clear`, `keys`, and other methods from HashMap.

## Linked List

Implementation of a singly linked list using classes, recursion, and encapsulation.

🔗 [Code](https://github.com/pascard20/javascript-exercises/blob/main/exercises/linkedList.js)

#### Node class

- `value`: The data stored in the node.
- `nextNode`: Reference to the next node (or null).

#### LinkedList class

Provides methods to access and manipulate the list:

- **Add/remove**: `append(value)`, `prepend(value)`, `insertAt(value, index)`, `removeAt(index)`, `pop()`
- **Search**: `at(index)`, `contains(value)`, `find(value)`
- **Utility**: `head`, `tail`, `size`, `toString()`

#### Highlights

- Uses private fields for encapsulation.
- Recursion simplifies traversal and search logic.
- `toString()` provides a clear view of the list's structure.

## Merge Sort

Implements merge sort algorithm using a recursive divide-and-conquer technique.

🔗 [Code](https://github.com/pascard20/javascript-exercises/blob/main/exercises/mergeSort.js)

- `mergeSort(array)` – Splits the array into halves recursively, then merges sorted halves.
- `merge(left, right)` – Merges two sorted arrays into one.

#### Examples:

```js
mergeSort([3, 2, 1, 13, 8, 5, 0, 1]); // [0, 1, 1, 2, 3, 5, 8, 13]
mergeSort([105, 79, 100, 110]); // [79, 100, 105, 110]
```
