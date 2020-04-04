/*
 * @title: find k frequent
 * @description: simple algo to return k most frequent elements in unsorted array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const topKFrequentSimple = function (nums, k) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = (map[nums[i]] || 0) + 1;
  }

  const temp = Object.entries(map);
  temp.sort((a, b) => b[1] - a[1]);

  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(Number(temp[i][0]));
  }

  return result;
};


class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.data = [];
  }

  enqueue(value, priority) {
    const node = new Node(value, priority);
    this.data.push(node);
    this.bubbleUp(this.data.length - 1);
  }

  dequeue() {
    const min = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent].priority < this.data[index].priority) {
        const temp = this.data[parent];
        this.data[parent] = this.data[index];
        this.data[index] = temp;
        index = parent;
      } else {
        break;
      }
    }
  }

  bubbleDown(index) {
    while (index < this.data.length) {
      const left = Math.floor((index * 2) + 1);
      const right = Math.floor((index * 2) + 2);
      let smallest = index;

      if (left < this.data.length
        && this.data[left].priority > this.data[smallest].priority) {
        smallest = left;
      }

      if (right < this.data.length
        && this.data[right].priority > this.data[smallest].priority) {
        smallest = right;
      }

      if (smallest !== index) {
        const temp = this.data[smallest];
        this.data[smallest] = this.data[index];
        this.data[index] = temp;

        index = smallest;
      } else {
        break;
      }
    }
  }
}


const topKFrequent = (arr, k) => {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    map[current] = (map[current] || 0) + 1;
  }

  const heap = new PriorityQueue();
  for (const key in map) { // eslint-disable-line
    heap.enqueue(key, map[key]);
  }

  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(Number(heap.dequeue().value));
  }
  return result;
};

// npx jest algorithms/array/array.kFrequent.js
test('topKFrequent()', () => {
  expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2]);
});
test('topKFrequentSimple()', () => {
  expect(topKFrequentSimple([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2]);
});
