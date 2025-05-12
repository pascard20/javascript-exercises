// Following the exercise from The Odin Project:
// https://www.theodinproject.com/lessons/javascript-recursion

export const mergeSort = (numbers) => {
  if (numbers.length < 2) return numbers;
  const cutIndex = Math.floor(numbers.length / 2);

  const leftArray = numbers.slice(0, cutIndex);
  const rightArray = numbers.slice(cutIndex);

  const sortedLeft = mergeSort(leftArray);
  const sortedRight = mergeSort(rightArray);

  return merge(sortedLeft, sortedRight);
};

const merge = (left, right) => {
  const result = [];
  let leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) result.push(left[leftIndex++]);
    else result.push(right[rightIndex++]);
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};
