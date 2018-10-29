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
console.log("bst from array:");
console.log(root);
console.log("********************************************");

/*
 * @title: Binary Search Tree
 * @description: create from linked List;
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class ListNode{
  constructor(value){
    this.value = value;
    this.next = null;
  }
  serialize(){
    let result = {};
    result.value = this.value;
    result.next = this.next ? this.next.serialize() : null;
    return result;
  }
}

class LinkedList{
  constructor(){
    this.head = null;
  }
  add(value){
    let node = new ListNode(value);
    if(!this.head){
      this.head = node;
      return node;
    }

    let current = this.head;
    while(current.next){
      current = current.next;
    }
    current.next = node;
    return node;
  }
  length(){
    if(!this.head) return 0;
    let current = this.head;
    let length = -1;
    while(current){
      length++;
      current = current.next;
    }
    return length;
  }
}

let list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);
list.add(7);
list.add(8);
list.add(9);
list.add(10);

function createFromLinkedList(list){
  let n = list.length();

  function buildFromList(n){
    if(n <= 0) return null;
    let middle = Math.floor(n/2);
    let left = buildFromList(middle);
    let node = new Node(list.head.value);
    node.left = left;
    list.head = list.head.next;
    node.right = buildFromList(n-middle-1);
    return node;
  }
  return buildFromList(n);
}

root = createFromLinkedList(list);
console.log("bst from list:");
console.log(root);
console.log("********************************************");