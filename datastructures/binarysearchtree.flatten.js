/*
 * @title: Binary Search Tree Flattening
 * @description: bst to linked list flattening
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 class Node{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
  serialize(){
    console.log(this.value);
    let result = {};
    result.value = this.value;
    result.left = this.left ? this.left.serialize() : null;
    result.right = this.right ? this.right.serialize() : null;
    return result;
  }
}

class BinarySearchTree{
  constructor(){
    this.root = null;
  }
  print(){
    this.root.serialize();
  }
  add(value){
    let node = new Node(value);
    if(!this.root){
      this.root = node;
      return node;
    }

    let current = this.root;
    while(current){
      if(value < current.value){
        if(!current.left){
          current.left = node;
          return node;
        }
        current = current.left;
      }else if(value > current.value){
        if(!current.right){
          current.right = node;
          return node;
        }
        current = current.right;
      }
    }
  }
  flattenPreOrder(node){
    //pre-order traversal
    if(!node) return node;

    let left = node.left;
    let right = node.right;

    this.flattenPreOrder(left);
    this.flattenPreOrder(right);

    node.right = left;
    node.left = null;

    let current = node;
    while(current.right){
      current = current.right;
    }

    current.right = right;
    return node;
  }
  flattenPreOrder2(node){
    if(!node) return node;

    let right = node.right;
    let left = node.left;

    if(left){
      node.right = left;
      node.left = null;
      node = this.flattenPreOrder2(node.right);
    }

    if(right){
      node.right = right;
      node = this.flattenPreOrder2(node.right);
    }

    return node;
  }
  flatten(node){
    let current = node;
    while(current){
      if(current.left){

        if(current.right){
          let next = current.left;
          while(next.right) next = next.right;
          next.right = current.right;
        }

        current.right = current.left;
        current.left = null;

      }
      current = current.right;
    }
  }
}

let tree = new BinarySearchTree();
tree.add(10);
tree.add(5);
tree.add(15);
tree.add(2);
tree.add(3);
tree.add(12);
tree.add(17);
tree.add(7);
//tree.print();
console.log("************");
tree.flattenPreOrder(tree.root);
tree.print(); /*10-5-2-3-7-15-12-17*/
console.log("************");
tree.flattenPreOrder2(tree.root);
tree.print(); /*10-5-2-3-7-15-12-17*/
console.log("************");
tree.flatten(tree.root);
tree.print(); /*10-5-2-3-7-15-12-17*/
