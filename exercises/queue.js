export class Queue {
  constructor(data = []) {
    this.data = [...data];
  }

  enqueue(item) {
    return this.data.push(item);
  }

  dequeue() {
    return this.data.shift();
  }

  peek() {
    return this.data[0];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  size() {
    return this.data.length;
  }

  clear() {
    this.data.length = 0;
  }

  print() {
    if (this.isEmpty()) {
      console.log(`[ ]`);
      return;
    }

    if (this.size() === 1) {
      console.log(`[ ${this.data[0]} ]`);
      return;
    }
    let output = `[ ${this.data[0]}`;
    this.data.slice(1).forEach((item) => (output += `, ${item}`));
    console.log(output + " ]");
  }
}
