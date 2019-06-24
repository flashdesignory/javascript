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

  const visited1 = [beginWord];
  const visited2 = [endWord];
  let queue1 = [beginWord];
  let queue2 = [endWord];

  let count = 1;
  let nodes = [];
  let found = false;
  let currentQueue = -1;

  while (queue1.length > 0 && queue2.length > 0 && !found) {
    if (queue2.length >= queue1.length && queue1.length > 0) {
      nodes = queue1;
      queue1 = [];
      currentQueue = 1;
    } else {
      nodes = queue2;
      queue2 = [];
      currentQueue = 2;
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      for (let j = 0; j < wordList.length; j++) {
        const word = wordList[j];
        if (canMutate(node, word)) {
          if (currentQueue === 1) {
            if (visited2.indexOf(word) >= 0) {
              found = true;
              break;
            } else if (visited1.indexOf(word) < 0) {
              visited1.push(word);
              queue1.push(word);
            }
          } else if (visited1.indexOf(word) >= 0) {
            found = true;
            break;
          } else if (visited2.indexOf(word) < 0) {
            visited2.push(word);
            queue2.push(word);
          }
        }
      }
    }
    count++;
  }

  if (!found) return 0;
  return count;
}

// npx jest algorithms/string/string.wordladder2.js
describe('return shortest tranformation', () => {
  test('ladderLength()', () => {
    expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])).toEqual(5);
  });
});
