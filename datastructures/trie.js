/*
 * @title: Trie
 * @description: Generic Trie Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.isLast = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node('');
  }

  insert(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!current.children[letter]) {
        const node = new Node(letter);
        current.children[letter] = node;
        current = node;
      } else {
        current = current.children[letter];
      }
    }
    current.isLast = true;
  }

  contains(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!current.children[letter]) {
        return false;
      }
      current = current.children[letter];
    }
    return true;
  }

  findWords(word) {
    let current = this.root;
    const result = [];

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!current.children[letter]) {
        return result;
      }
      current = current.children[letter];
    }

    function traverse(node, letters) {
      Object.values(node.children).forEach((child) => {
        letters += child.value;
        if (child.isLast) {
          return result.push(letters);
        }
        traverse(child, letters);
        letters = letters.substr(0, letters.length - 1);
        return letters;
      });
    }

    traverse(current, word);
    return result;
  }
}

// npx jest datastructures/trie.js
describe('trie data structure', () => {
  it('should return all options for letter h', () => {
    const trie = new Trie();
    const values = ['hello', 'dog', 'hi', 'helicopter', 'cat'];
    values.sort();
    for (let i = 0; i < values.length; i++) {
      trie.insert(values[i]);
    }
    expect(trie.findWords('h')).toEqual(['helicopter', 'hello', 'hi']);
  });
});
