/*
 * @title: Trie
 * @description: Generic Trie Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node{
  constructor(value){
    this.value = value;
    this.children = {};
    this.isLast = false;
  }
}

class Trie{
  constructor(){
    this.root = new Node('');
  }
  insert(word){
    let current = this.root;

    for(let i = 0; i<word.length; i++){
      let letter = word[i];
      if(!current.children[letter]){
        let node = new Node(letter);
        current.children[letter] = node;
        current = node;
      }else{
        current = current.children[letter];
      }
    }
    current.isLast = true;
  }
  contains(word){
    let current = this.root;

    for(let i = 0; i<word.length; i++){
      if(!current.children[word[i]]){
        return false;
      }else{
        current = current.children[word[i]];
      }
    }

    return true;
  }
  findWords(word){
    let current = this.root;
    let result = [];
    let letters = "";

    for(let i = 0; i<word.length; i++){
      if(!current.children[word[i]]){
        return result;
      }else{
        current = current.children[word[i]];
        letters += current.value;
      }
    }

    function traverse(node, chars){
      Object.values(node.children).forEach(child => {
        chars += child.value;
        if(child.isLast){
          return result.push(chars);
        }
        traverse(child, chars)
        chars = chars.substring(0, chars.length-1);
      })
    }

    traverse(current, letters);

    return result;
  }
}

let trie = new Trie();
trie.insert('hello');
trie.insert('hi');
trie.insert('helographinator');
trie.contains('hel');
trie.findWords('h');
