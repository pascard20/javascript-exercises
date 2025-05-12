// Following the exercise from The Odin Project:
// https://www.theodinproject.com/lessons/javascript-hashmap

import { HashMap } from "./hashMap.js";

export class HashSet extends HashMap {
  rebuild() {
    const nodes = super.getNodes();
    super.removeNodes();
    nodes.forEach((node) => this.add(node.key));
  }

  add(key) {
    return this.set(key);
  }

  set(key) {
    return super.set(key, null);
  }

  get() {
    return undefined;
  }

  get entries() {
    return this.keys;
  }

  get values() {
    return this.keys;
  }
}
