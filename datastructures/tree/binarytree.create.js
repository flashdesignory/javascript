/*
 * @title: Binary Tree Creation
 * @description:Create BT from Inorder & Preorder or Inorder & Postorder
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/*
The last element of postorder will always be the root of a subtree.
We can furter determine its left and right subtree by finding its position in the inorder array.
*/
const inorderPostorder = (inorder, postorder) => {
  const hash = {};
  for (let i = 0; i < inorder.length; i++) {
    hash[inorder[i]] = i;
  }

  const build = (start, end) => {
    if (start > end) return null;

    const value = postorder.pop();
    const node = new Node(value);
    node.right = build(hash[value] + 1, end);
    node.left = build(start, hash[value] - 1);
    return node;
  };

  return build(0, inorder.length - 1);
};

// recursive
const inorderPostorder2 = function (inorder, postorder) {
  if (inorder.length === 0) return null;

  const node = new Node(postorder.pop());
  const index = inorder.indexOf(node.value);

  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  node.right = inorderPostorder2(rightInorder, postorder);
  node.left = inorderPostorder2(leftInorder, postorder);
  return node;
};

/*
The first element of preorder will always be the root of a subtree.
We can furter determine its left and right subtree by finding its position in the inorder array.
*/
const preorderInorder = (preorder, inorder) => {
  const hash = {};
  for (let i = 0; i < inorder.length; i++) {
    hash[inorder[i]] = i;
  }

  const build = (start, end) => {
    if (start > end) return null;

    const value = preorder.shift();
    const node = new Node(value);
    node.left = build(start, hash[value] - 1);
    node.right = build(hash[value] + 1, end);
    return node;
  };

  return build(0, inorder.length - 1);
};

// recursive
const preorderInorder2 = function (preorder, inorder) {
  if (inorder.length === 0) return null;

  const node = new Node(preorder.shift());
  const index = inorder.indexOf(node.value);

  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  node.left = preorderInorder2(preorder, leftInorder);
  node.right = preorderInorder2(preorder, rightInorder);
  return node;
};

// npx jest datastructures/tree/binarytree.create.js
describe('create a binary tree', () => {
  it('should create a bt from postorder and inorder array()', () => {
    const root = inorderPostorder([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);
    expect(root.value).toEqual(3);
  });
  it('should create a bt from preorder and inorder array', () => {
    const root = preorderInorder([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
    expect(root.value).toEqual(3);
  });
  it('should create a bt from postorder and inorder array()', () => {
    const root = inorderPostorder2([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);
    expect(root.value).toEqual(3);
  });
  it('should create a bt from preorder and inorder array', () => {
    const root = preorderInorder2([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
    expect(root.value).toEqual(3);
  });
});
