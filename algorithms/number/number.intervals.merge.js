/*
 * @title: merge intervals
 * @description: sort and merge conflicts
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function mergeIntervalsSimple(intervals) {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= result[result.length - 1][1]) {
      if (intervals[i][1] > result[result.length - 1][1]) {
        result[result.length - 1][1] = intervals[i][1]; // eslint-disable-line
      }
    } else {
      result.push(intervals[i]);
    }
  }

  return result;
}

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

function mergeIntervals(arr) {
  if (!arr.length) return null;

  arr.sort((a, b) => a[0] - b[0]);

  const result = [];

  const stack = new Stack();
  stack.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    const prev = stack.peek();
    const current = arr[i];
    if (prev[1] < current[0]) {
      stack.push(current);
    } else if (prev[1] < current[1]) {
      prev[1] = current[1]; //eslint-disable-line
      stack.pop();
      stack.push(prev);
    }
  }

  while (!stack.empty()) {
    result.push(stack.pop());
  }

  return result;
}

// npx jest algorithms/number/number.intervals.merge.js
describe('merge conflicting intervals', () => {
  test('mergeIntervals()', () => {
    const nums = [[6, 8], [1, 9], [2, 4], [4, 7]];
    expect(mergeIntervals(nums)).toEqual([[1, 9]]);
  });
  test('mergeIntervalsSimple()', () => {
    const nums = [[6, 8], [1, 9], [2, 4], [4, 7]];
    expect(mergeIntervalsSimple(nums)).toEqual([[1, 9]]);
  });
});
