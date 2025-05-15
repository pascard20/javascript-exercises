// Following the exercise from The Odin Project:
// https://www.theodinproject.com/lessons/javascript-knights-travails

import { LinkedList as BaseLinkedList, Node } from "./linkedList.js";

const coordinatesToChessNotation = (coordinates) => {
  const letter = String.fromCharCode(97 + coordinates[0]);
  return `${letter}${coordinates[1] + 1}`;
};

const isValueEqual = (targetValue, nodeValue) => {
  if (Array.isArray(targetValue) && Array.isArray(nodeValue)) {
    return JSON.stringify(targetValue) === JSON.stringify(nodeValue);
  }
  return targetValue === nodeValue;
};

class LinkedList extends BaseLinkedList {
  toString() {
    const values = this.collectValues();
    const convertedValues = values.reverse().map((value) => {
      return coordinatesToChessNotation(value);
    });
    return convertedValues.length ? `${convertedValues.join("  ->  ")}` : "null";
  }

  find(value) {
    const returnedObject = this.traverse(this.head, null, value);
    const isValueFound = isValueEqual(returnedObject?.node.value, value);
    return isValueFound ? returnedObject?.index : null;
  }

  traverse = (
    node = this.head,
    targetIndex = null,
    targetValue = null,
    index = 0,
    previousNode = null,
  ) => {
    if (!node) return { node: null };
    const indexFound = targetIndex !== null && index === targetIndex;
    const isValueFound = isValueEqual(targetValue, node.value);

    if (indexFound || isValueFound || node.nextNode === null)
      return { node, previousNode, index };
    return this.traverse(node.nextNode, targetIndex, targetValue, index + 1, node);
  };
}

const printAnswer = (startSquare, endSquare, solutions) => {
  console.log(`\n| ${startSquare} => ${endSquare} |`);
  console.log(
    `A knight can make it in ${solutions[0].size - 1} move${solutions[0].size - 1 !== 1 ? "s" : ""}.`,
  );
  console.log(`\n${solutions.length} paths found${solutions.length <= 5 ? ":" : "."}`);

  if (solutions.length > 5) {
    const randomSolutions = new Set();
    while (randomSolutions.size < 5) {
      const randomIndex = Math.floor(Math.random() * solutions.length);
      randomSolutions.add(solutions[randomIndex].toString());
    }
    console.log("\nHere are random 5 of them:");
    randomSolutions.forEach((solution) => console.log(solution));
  } else solutions.forEach((solution) => console.log(solution.toString()));

  console.log("\n");
};

const findPaths = (startPosition, endPosition) => {
  const possibleMoves = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  let currentPaths = [new LinkedList(new Node(startPosition))];
  const solutions = [];

  while (currentPaths.length) {
    const newPaths = [];
    currentPaths.forEach((path) => {
      for (const moveVector of possibleMoves) {
        const [currentX, currentY] = path.head.value;

        const newX = currentX + moveVector[0];
        const newY = currentY + moveVector[1];
        if (newX < 0 || newX > 7 || newY < 0 || newY > 7) continue;
        if (path.contains([newX, newY])) continue;

        const newPosition = new Node([newX, newY], path.head);
        const newPath = new LinkedList(newPosition);

        if (newX === endPosition[0] && newY === endPosition[1]) solutions.push(newPath);
        else if (!solutions.length) newPaths.push(newPath);
      }
    });

    if (!solutions.length) currentPaths = newPaths;
    else currentPaths.length = 0;
  }

  return solutions;
};

const knightMoves = (startPosition, endPosition) => {
  try {
    [startPosition[0], startPosition[1], endPosition[0], endPosition[1]].forEach((index) => {
      if (isNaN(index) || index < 0 || index > 7) {
        throw new Error("knightMoves: Invalid position");
      }
    });
  } catch (error) {
    console.log("Error |", error.message);
    return false;
  }

  const doesKnightMove = !(
    startPosition[0] === endPosition[0] && startPosition[1] === endPosition[1]
  );
  const startSquare = coordinatesToChessNotation(startPosition);
  const endSquare = coordinatesToChessNotation(endPosition);
  if (doesKnightMove) {
    const solutions = findPaths(startPosition, endPosition);
    printAnswer(startSquare, endSquare, solutions, doesKnightMove);
  } else {
    console.log(`| ${startSquare} => ${endSquare} |`);
    console.log("Positions are the same.");
  }
};

knightMoves([0, 0], [5, 4]);
