/*
 * @title: Word Ladder
 * @description:
 * Given two words (beginWord and endWord), and a dictionary's word list,
 * find the length of shortest transformation sequence from beginWord to endWord, such that:
 * Only one letter can be changed at a time.
 * Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
 *
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Queue {
  constructor() {
    this.data = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.data[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.data[this.first];
    delete this.data[this.first];
    this.first++;
    return temp;
  }

  empty() {
    return this.first === this.last;
  }
}

function canMutate(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) count++;
    if (count > 1) break;
  }
  return count === 1;
}

function ladderLength(beginWord, endWord, wordList) {
  if (wordList.indexOf(endWord) < 0) return 0;

  const visited = [];
  for (let i = 0; i < wordList.length; i++) {
    visited[i] = false;
  }

  const queue = new Queue();
  queue.enqueue({ value: beginWord, length: 1 });

  while (!queue.empty()) {
    const current = queue.dequeue();
    if (current.value === endWord) return current.length;
    for (let i = 0; i < wordList.length; i++) {
      const word = wordList[i];
      if (canMutate(current.value, word) && !visited[i]) {
        queue.enqueue({ value: word, length: current.length + 1 });
        visited[i] = true;
      }
    }
  }
  return 0;
}

function ladderLength2(beginWord, endWord, wordList) {
  const queue = new Queue();
  queue.enqueue(beginWord);

  let queueLength = 1;
  let level = 1;
  let nextLength = 0;
  let count = 0;

  while (!queue.empty()) {
    const current = queue.dequeue();
    count++;
    if (current === endWord) {
      return level;
    }

    const letters = current.split('');
    for (let i = 0; i < letters.length; i++) {
      const previous = letters[i];
      for (let j = 0; j < 26; j++) {
        const temp = String.fromCharCode(96 + j);
        if (temp === previous) {
          // same letter - no need to check
          continue; //eslint-disable-line
        }
        letters[i] = temp;
        const newWord = letters.join('');
        if (wordList.indexOf(newWord) !== -1) {
          queue.enqueue(newWord);
          nextLength++;
          const deleteIndex = wordList.indexOf(newWord);
          wordList.splice(deleteIndex, 1);
        }
        letters[i] = previous;
      }
    }

    if (count === queueLength) {
      queueLength = nextLength;
      count = 0;
      nextLength = 0;
      level++;
    }
  }

  return 0;
}

// npx jest algorithms/string/string.wordladder1.js
describe('return shortest tranformation', () => {
  test('ladderLength()', () => {
    expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])).toEqual(5);
  });
  test('ladderLength()', () => {
    expect(ladderLength2('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])).toEqual(5);
  });
});
