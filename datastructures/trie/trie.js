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
        current.children[letter] = new Node(letter);
      }
      current = current.children[letter];
    }
    current.isLast = true;
  }

  remove(node, word, index, parent) {
    if (!node) return null;

    if (index === word.length) {
      if (node.isLast) node.isLast = false;
    }

    if (Object.keys(node.children).length === 0) {
      const newChildren = {};
      Object.keys(parent.children)
        .filter(value => value !== node.value)
        .forEach((child) => {
          newChildren[child] = parent.children[child];
        });
      parent.children = newChildren;
      node = null;
      return node;
    }

    const char = word[index];
    index += 1;
    node.children[char] = this.remove(node.children[char], word, index, node);

    if (Object.keys(node.children).length === 0 && !node.isLast) {
      const newChildren = {};
      Object.keys(parent.children)
        .filter(value => value !== node.value)
        .forEach((child) => {
          newChildren[child] = parent.children[child];
        });
      parent.children = newChildren;
      node = null;
      return node;
    }
    return node;
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

    if (current.isLast) {
      result.push(word);
    }

    function traverse(node, letters) {
      if (!node) return;
      Object.values(node.children).forEach((child) => {
        letters += child.value;
        if (child.isLast) {
          result.push(letters);
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

// npx jest datastructures/trie/trie.js
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
  it('should return all options for letter h after removal of option', () => {
    const trie = new Trie();
    const values = ['hello', 'dog', 'hi', 'helicopter', 'cat'];
    values.sort();
    for (let i = 0; i < values.length; i++) {
      trie.insert(values[i]);
    }
    trie.remove(trie.root, 'helicopter', 0);
    expect(trie.findWords('h')).toEqual(['hello', 'hi']);
  });
});
