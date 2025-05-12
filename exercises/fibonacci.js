// Following the exercise from The Odin Project:
// https://www.theodinproject.com/lessons/javascript-recursion

export const fibs = (number) => {
  if (number <= 0) {
    console.log("Number must be greater than 0");
    return null;
  }

  const output = [0];
  if (number === 1) return output;
  output.push(1);

  for (let i = 2; i < number; i++) {
    output.push(output[i - 1] + output[i - 2]);
  }

  return output;
};

export const fibsRec = (number) => {
  if (number <= 0) {
    console.log("Number must be greater than 0");
    return null;
  }

  if (number === 1) return [0];
  if (number === 2) return [0, 1];

  const lastOutput = fibsRec(number - 1);
  return [
    ...lastOutput,
    lastOutput[lastOutput.length - 1] + lastOutput[lastOutput.length - 2],
  ];
};
