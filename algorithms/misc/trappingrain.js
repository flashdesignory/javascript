/*
 * @title: Trapping Rain Water
 * @description:
 * Given n non-negative integers representing an elevation map
 * where the width of each bar is 1, compute how much water it is
 * able to trap after raining.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// brute force - Big O(n^2);
function trap1(arr) {
  if (arr == null) return 0;

  const length = arr.length; //eslint-disable-line
  let max = 0;

  for (let i = 1; i < length - 1; i++) {
    let maxLeft = 0;
    let maxRight = 0;
    for (let j = i; j >= 0; j--) {
      maxLeft = Math.max(maxLeft, arr[j]);
    }
    for (let j = i; j < length; j++) {
      maxRight = Math.max(maxRight, arr[j]);
    }

    const current = Math.min(maxLeft, maxRight) - arr[i];
    max += current;
  }
  return max;
}

// tabulation - Big O(n);
function trap2(arr) {
  if (arr == null) return 0;

  const length = arr.length; //eslint-disable-line
  let max = 0;

  const maxLeft = [];
  const maxRight = [];

  maxLeft[0] = arr[0]; //eslint-disable-line
  for (let i = 1; i < length; i++) {
    maxLeft[i] = Math.max(arr[i], maxLeft[i - 1]);
  }

  maxRight[length - 1] = arr[length - 1];
  for (let i = length - 2; i >= 0; i--) {
    maxRight[i] = Math.max(arr[i], maxRight[i + 1]);
  }

  for (let i = 1; i < length - 1; i++) {
    max += (Math.min(maxLeft[i], maxRight[i])) - arr[i];
  }

  return max;
}

// stack - Big O(n);
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

  top() { // same as peek
    return this.data[this.size - 1];
  }

  empty() {
    return this.size === 0;
  }
}

function trap3(arr) {
  if (arr == null) return 0;

  const length = arr.length; //eslint-disable-line
  const stack = new Stack();

  let max = 0;
  let index = 0;

  while (index < length) {
    while (!stack.empty() && arr[index] > arr[stack.top()]) {
      const prevTop = stack.pop();
      if (stack.empty()) break;
      const currentTop = stack.top();
      const distance = index - currentTop - 1;
      const currentHeight = Math.min(arr[index], arr[currentTop]) - arr[prevTop];
      max += distance * currentHeight;
    }
    stack.push(index++);
  }

  return max;
}

// tabulation - Big O(n) - no extra space
function trap4(arr) {
  if (arr == null) return 0;

  let left = 0;
  let right = arr.length - 1;
  let max = 0;
  let maxLeft = 0;
  let maxRight = 0;

  while (left < right) {
    if (arr[left] < arr[right]) {
      arr[left] >= maxLeft ? (maxLeft = arr[left]) : max += (maxLeft - arr[left]);
      left++;
    } else {
      arr[right] >= maxRight ? (maxRight = arr[right]) : max += (maxRight - arr[right]);
      right--;
    }
  }

  return max;
}

// npx jest algorithms/misc/trappingrain.js
test('Trapping Rain Water', () => {
  expect(trap1([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toEqual(6);
  expect(trap2([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toEqual(6);
  expect(trap3([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toEqual(6);
  expect(trap4([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toEqual(6);
});
