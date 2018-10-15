/*
 * @title: Binary Search Tree
 * @description: create from ordered array;
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function createFromArray(arr, start, end){
  if(start > end) return null;
  let middle = Math.floor((start + end)/2);
  let node = new Node(arr[middle]);
  node.left = createFromArray(arr, start, middle-1);
  node.right = createFromArray(arr, middle+1, end);
  return node;
}

let arr = [1,2,3,4,5,6,7,8,9,10];
let root = createFromArray(arr, 0, arr.length-1);
console.log(root);
