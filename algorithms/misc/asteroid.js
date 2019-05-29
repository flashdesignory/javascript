/*
 * @title: Asteroids
 * @description:  We are given an array asteroids of integers representing
 * asteroids in a row. For each asteroid, the absolute value represents
 * its size, and the sign represents its direction (positive meaning right,
 * negative meaning left). Each asteroid moves at the same speed.
 * Find out the state of the asteroids after all collisions.
 * If two asteroids meet, the smaller one will explode. If both are the same
 * size, both will explode. Two asteroids moving in the same direction will never meet
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
class Stack {
  constructor() {
    this.data = {};
    this.size = 0;
  }

  push(value) {
    this.data[this.size] = value;
    this.size++;
  }

  pop() {
    const temp = this.data[this.size - 1];
    delete this.data[this.size - 1];
    this.size--;
    return temp;
  }

  peek() {
    return this.data[this.size - 1];
  }

  empty() {
    return this.size === 0;
  }
}


function check(arr) {
  const stack = new Stack();
  stack.push(arr[0]);
  const result = [];

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let add = true;
    while (!stack.empty()) {
      const prev = stack.peek();
      if (current < 0 && prev > 0) {
        const weighted = Math.abs(current);
        console.log(prev, weighted, current);
        if (weighted === prev) {
          add = false;
          stack.pop();
          break;
        } else if (weighted > prev) {
          stack.pop();
        } else if (weighted < prev) {
          add = false;
          break;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    if (add) {
      stack.push(current);
    }
  }

  while (!stack.empty()) {
    result.push(stack.pop());
  }
  return result.reverse();
}

// npx jest algorithms/misc/asteroid.js
test('Asteroids check for collision', () => {
  expect(check([5, 10, -5])).toEqual([5, 10]);
  expect(check([8, -8, 4, -4])).toEqual([]);
  expect(check([10, 2, -5])).toEqual([10]);
  expect(check([-2, -1, 1, 2])).toEqual([-2, -1, 1, 2]);
  expect(check([-2, 1, 1, -1])).toEqual([-2, 1]);
});
