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

function inorderPostorder(inorder, postorder) {
  let postIndex = inorder.length - 1;
  function build(start, end) {
    if (start > end) return null;

    const node = new Node(postorder[postIndex--]);

    if (start === end) return node;

    const index = inorder.indexOf(node.value);

    node.right = build(index + 1, end);
    node.left = build(start, index - 1);
    return node;
  }
  return build(0, inorder.length - 1);
}

function preorderInorder(preorder, inorder) {
  let preIndex = 0;
  function build(start, end) {
    if (start > end) return null;

    const node = new Node(preorder[preIndex++]);

    if (start === end) return node;

    const index = inorder.indexOf(node.value);

    node.left = build(start, index - 1);
    node.right = build(index + 1, end);
    return node;
  }

  return build(0, inorder.length - 1);
}

function inorderPostorder2(inorder, postorder) {
  if (inorder.length === 0) return null;

  const node = new Node(postorder[postorder.length - 1]);
  const index = inorder.indexOf(node.value);
  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  const leftPostorder = postorder.slice(0, leftInorder.length);
  const rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1);

  node.left = inorderPostorder2(leftInorder, leftPostorder);
  node.right = inorderPostorder2(rightInorder, rightPostorder);

  return node;
}

function preorderInorder2(preorder, inorder) {
  if (inorder.length === 0) return null;

  const node = new Node(preorder.shift());
  const index = inorder.indexOf(node.value);

  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  node.left = preorderInorder2(preorder, leftInorder);
  node.right = preorderInorder2(preorder, rightInorder);
  return node;
}

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
