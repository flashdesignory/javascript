/*
 * @title: Top K Words
 * @description: Given a non-empty list of words, return the k most frequent elements.
 * Your answer should be sorted by frequency from highest to lowest.
 * If two words have the same frequency, then the word with the lower alphabetical
 * order comes first.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function topKFrequent(words, k) {
  const freq = {};
  for (let i = 0; i < words.length; i++) {
    const current = words[i];
    freq[current] = (freq[current] || 0) + 1;
  }

  return Object.keys(freq).sort((a, b) => {
    if (freq[a] > freq[b]) return -1;
    if (freq[a] < freq[b]) return 1;
    return a.localeCompare(b);
  }).slice(0, k);
}

// npx jest algorithms/string/string.topk.js
test('topKFrequent()', () => {
  expect(topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 2))
    .toEqual(['i', 'love']);
});
test('topKFrequent()', () => {
  expect(topKFrequent(['the', 'day', 'is', 'sunny', 'the', 'the', 'the', 'sunny', 'is', 'is'], 4))
    .toEqual(['the', 'is', 'sunny', 'day']);
});
