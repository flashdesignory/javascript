/*
 * @title: Binary Tree Serialize / Deserialize
 * @description: preorder serialize..
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function serialize(node) {
  const result = [];

  function traverse(node) {
    if (node === null) {
      result.push('null');
    } else {
      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }
  }

  traverse(node);
  return result.toString();
}

function deserialize(str) {
  const nodes = str.split(',');
  function create(arr) {
    const value = arr.shift();
    if (value === 'null') {
      return null;
    }

    const node = new Node(Number(value));
    node.left = create(arr);
    node.right = create(arr);
    return node;
  }

  return create(nodes);
}

// npx jest datastructures/tree/binarytree.serialize.js
describe('BinaryTree Serialize / deserialize', () => {
  it('should return the same head', () => {
    const head = new Node(1);
    head.left = new Node(2);
    head.right = new Node(3);
    head.right.left = new Node(4);
    head.right.right = new Node(5);
    const data = serialize(head);
    const newHead = deserialize(data);
    expect(newHead.value).toEqual(1);
  });
});
