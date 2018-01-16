/*
 * @title: Tree
 * @description: Generic Binary Search Tree Conversions
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Node(value){
  this.value = value;
  this.left = null;
  this.right = null;
}

function generate(arr, start, end){
    if(start > end){
        return null;
    }
    var middle = start + parseInt((end - start)/2);
    var value = arr[middle];
    
    var node = new Node(value);
    node.left = generate(arr, start, middle-1);
    node.right = generate(arr, middle+1, end);
    
    return node;
}

function sortedArrayToBST(arr) {
    return generate(arr,0,arr.length-1);
}

console.log(sortedArrayToBST([1,2,3,4,5,6,7,8,9,10]));