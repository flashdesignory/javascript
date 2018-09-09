/*
 * @title: Tree
 * @description: Generic Binary Search Tree Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Queue(){
	this.data = {};
	this.first = 0;
	this.last = 0;
}

Queue.prototype.push = function(value){
	this.data[this.last] = value;
	this.last++;
}

Queue.prototype.shift = function(){
	var temp = this.data[this.first];
	delete this.data[this.first];
	this.first++;
	return temp;
}

function Stack(){
	this.data = {};
	this.size = 0;
}

Stack.prototype.push = function(value){
	this.data[this.size] = value;
	this.size++;
}

Stack.prototype.pop = function(){
	var temp = this.data[this.size-1];
	delete this.data[this.size-1];
	this.size--;
	return temp;
}

function Node(value){
	this.value = value;
	this.right = null;
	this.left = null;
}

Node.prototype.serialize = function(){
	var result = {value:this.value};
	result.left = this.left === null ? null : this.left.serialize();
	result.right = this.right === null ? null : this.right.serialize();
	return result;
}

function Tree(){
	this.root = null;
}

Tree.prototype.add = function(value){
	var node = new Node(value);

	if(!this.root){
		this.root = node;
	}else{
		var current = this.root;
		//while(true){
		while(current){
			if(current.value > value){
				if(current.left){
					current = current.left;
				}else{
					current.left = node;
					break;
				}
			}else{
				if(current.right){
					current = current.right;
				}else{
					current.right = node;
					break;
				}
			}
		}
	}

	return node;
}

Tree.prototype.remove = function(value){
	var current = this.root;
	var found = false;
	var parent;

	var numChildren;
	var replacement;
	var replacementParent;

	while(current && !found){
		if(value == current.value){
			found = true;
		}else if(value < current.value){
			parent = current;
			current = current.left;
		}else if(value > current.value){
			parent = current;
			current = current.right;
		}
	}

	if(found){
		numChildren = (current.left !== null ? 1:0) + (current.right !== null ? 1:0);

		if(current === this.root){
			switch(numChildren){
				case 0:
					this.root = null;
					break;
				case 1:
					this.root = (current.left === null ? current.right : current.left);
					break;
				case 2:
					replacement = this.root.left;
					while(replacement.right){
						replacementParent = replacement;
						replacement = replacement.right;
					}

					if(replacementParent != null){
						replacementParent.right = replacement.left;
						replacement.right = this.root.right;
						replacement.left = this.root.left;
					}else{
						replacement.right = this.root.right;
					}

					this.root = replacement;
					break;
			}
		}else{
			switch(numChildren){
				case 0:
					if(current.value < parent.value){
						parent.left = null;
					}else{
						parent.right = null;
					}
					break;
				case 1:
					if(current.value < parent.value){
						parent.left = (current.left === null ? current.right : current.left);
					}else{
						parent.right = (current.left === null ? current.right : current.left);
					}
					break;
				case 2:
					replacement = current.left;
					replacementParent = current;
					while(replacement.right){
						replacementParent = replacement;
						replacement = replacement.right;
					}

					replacementParent.right = replacement.left;
					replacement.right = current.right;
					replacement.left = current.left;

					if(current.value < parent.value){
						parent.left = replacement;
					}else{
						parent.right = replacement;
					}
					break;
			}
		}
	}
}

Tree.prototype.contains = function(value){
	var current = this.root;
	while(current){
		if(value == current.value){
			return true;
		}else if(value < current.value){
			current = current.left;
		}else if(value > current.value){
			current = current.right;
		}
	}
	return false;
}


Tree.prototype.preOrderTraversal = function(node){

	console.log(node.value);

	if(node.left){
		this.preOrderTraversal(node.left);
	}

	if(node.right){
		this.preOrderTraversal(node.right);
	}
}

Tree.prototype.inOrderTraversal = function(node){
	if(node.left){
		this.inOrderTraversal(node.left);
	}

	console.log(node.value);

	if(node.right){
		this.inOrderTraversal(node.right);
	}
}

Tree.prototype.postOrderTraversal = function(node){
	if(node.left){
		this.postOrderTraversal(node.left);
	}

	if(node.right){
		this.postOrderTraversal(node.right);
	}

	console.log(node.value);
}

Tree.prototype.searchBF = function(node){
	var queue = new Queue();
	queue.push(node);
	var current = queue.shift();
	var result = [];

	while(current){
		result.push(current.value);
		if(current.left) queue.push(current.left);
		if(current.right) queue.push(current.right);
		current = queue.shift();
	}

	console.log(result);
}

Tree.prototype.searchDF = function(node){
	var stack = new Stack();
	stack.push(node);
	var current = stack.pop();
	var result = [];

	while(current){
		result.push(current.value);
		if(current.left) stack.push(current.left);
		if(current.right) stack.push(current.right);
		current = stack.pop();
	}

	console.log(result);
}

Tree.prototype.findMin = function(node){
	var current = node;

	while(current.left){
		current = current.left;
	}

	return current;
}

Tree.prototype.findMax = function(node){
	var current = node;

	while(current.right){
		current = current.right;
	}

	return current;
}

Tree.prototype.findNodesAtLevel = function(node, k){
	if(node == null){
		return;
	}
	if(k === 0){
		console.log(node.value);
		return;
	}else{
		this.findNodesAtLevel(node.left, k-1);
		this.findNodesAtLevel(node.right, k-1);
	}
}

Tree.prototype.levelOrder = function(node){
	var q = new Queue();
	q.push(this.root);
	var current = q.shift();
	var levelValues = [];
	var currentLevel = 1;
	var nextLevel = 0;
	var levelCount = 1;

	while(current){
		levelValues.push(current.value);
		currentLevel--;

		if(current.left){
		  q.push(current.left);
		  nextLevel++;
		}
		if(current.right){
		  q.push(current.right);
		  nextLevel++;
		}

		if(currentLevel === 0){
		  console.log(levelValues + ", " + levelCount);
		  currentLevel = nextLevel;
		  nextLevel = 0;
		  levelCount++;
		  levelValues = [];
		}

		current = q.shift();
	}
}

Tree.prototype.height = function(node){
	if(node == null){
		return 0;
	}

	return 1 + Math.max(this.height(node.left), this.height(node.right));
}

Tree.prototype.inOrderSuccessor = function(node){
	var successor;

	if(node.right){
		return this.findMin(node.right);
	}

	var current = this.root;
	while(current){
		if(node.value < current.value){
			successor = current;
			current = current.left;
		}else if(node.value > current.value){
			current = current.right;
		}else{
			current = null;
		}
	}
	return successor;
}

Tree.prototype.inOrderPredecessor = function(node){
	var predecessor;

	if(node.left){
		return this.findMax(node.left);
	}

	var current = this.root;
	while(current){
		if(node.value > current.value){
			predecessor = current;
			current = current.right;
		}else if(node.value < current.value){
			current = current.left;
		}else if(node.value === current.value){
			return predecessor;
		}else{
			return null;
		}
	}
	return predecessor;
}

Tree.prototype.longestConsecutive = function(node){
	var max = 0;

	function find(node){
		if(!node){
			return 0;
		}

		var length = 1;
		var left = find(node.left);
		var right = find(node.right);

		if(node.left && node.value === node.left.value-1){
			length = Math.max(length, 1+left);
		}

		if(node.right && node.value === node.right.value-1){
			length = Math.max(length, 1+right);
		}

		max = Math.max(max, length);
		return length;
	}

	find(node);
	return max;
}

Tree.prototype.sumLeaves = function(node){
	var result = 0;

	function find(node){
      if(node != null){
        if(node.left == null && node.right == null){
          result += node.value;
        }else{
          if(node.left){
            find(node.left);
          }
          if(node.right){
            find(node.right);
          }
        }
      }
    }

	find(node);
	return result;
}

Tree.prototype.isBinarySearchTree = function(node){
	var prevNode = null;

	function validate(node){
		if(!node) return true;
		if(!validate(node.left)){
			return false;
		}

		if(prevNode){
			if(prevNode.value > node.value){
				return false;
			}
		}

		prevNode = node;

		if(!validate(node.right)){
			return false;
		}

		return true;
	}

	return validate(node);
}

Tree.prototype.isBalanced = function(node){
	if(!node) return true;
	var leftHeight = this.height(node.left);
	var rightHeight = this.height(node.right);
	var difference = Math.abs(leftHeight - rightHeight);
	if(difference > 1){
		return false;
	}else{
		return this.isBalanced(node.left) && this.isBalanced(node.right);
	}
}

Tree.prototype.toObject = function(){
	return this.root.serialize();
}

var tree = new Tree();
tree.add(10);
var fifteen = tree.add(15);
var five = tree.add(5);
tree.add(2);
tree.add(3);
var twelve = tree.add(12);
tree.add(17);
//console.log(tree.toObject());
//tree.preOrderTraversal(tree.root);
//console.log("--------------------------");
//tree.inOrderTraversal(tree.root);
//console.log("--------------------------");
//tree.postOrderTraversal(tree.root);
//console.log(tree.contains(12));
//console.log(tree.contains(11));
//console.log(tree.contains(17));
tree.searchBF(tree.root);
tree.searchDF(tree.root);
tree.findMin(tree.root);
tree.findMax(tree.root);
//tree.remove(15);
//console.log("-------------------------------");
//tree.inOrderTraversal(tree.root);

//					10
//				5		15
//           2		  12   17
//             3

//tree.findNodesAtLevel(tree.root, 2);
console.log("sum leaves: " + tree.sumLeaves(tree.root));
console.log("height: " + tree.height(tree.root));
console.log("is binary search tree: " + tree.isBinarySearchTree(tree.root));
console.log("is balanced: " + tree.isBalanced(tree.root));
console.log("successor: " + tree.inOrderSuccessor(tree.root).value)
console.log("successor: " + tree.inOrderSuccessor(twelve).value);
console.log("successor: " + tree.inOrderSuccessor(five).value);
console.log("predecessor: " + tree.inOrderPredecessor(tree.root).value);
console.log("predecessor: " + tree.inOrderPredecessor(fifteen).value);
console.log("predecessor: " + tree.inOrderPredecessor(twelve).value);