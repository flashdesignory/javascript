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

Tree.prototype.searchBF = function(){
	var queue = new Queue();
	queue.push(this.root);
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

Tree.prototype.searchDF = function(){
	var stack = new Stack();
	stack.push(this.root);
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

Tree.prototype.findMin = function(){
	var current = this.root;

	while(current.left){
		current = current.left;
	}

	console.log(current.value);
}

Tree.prototype.findMax = function(){
	var current = this.root;

	while(current.right){
		current = current.right;
	}

	console.log(current.value);
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

Tree.prototype.height = function(node){
	if(node == null){
		return 0;
	}

	return 1 + Math.max(this.height(node.left), this.height(node.right));
}

Tree.prototype.toObject = function(){
	return this.root.serialize();
}

var tree = new Tree();
tree.add(10);
tree.add(15);
tree.add(5);
tree.add(2);
tree.add(3);
tree.add(12);
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
//tree.searchBF();
//tree.searchDF();
//tree.findMin();
//tree.findMax();
//tree.remove(15);
//console.log("-------------------------------");
//tree.inOrderTraversal(tree.root);

//					10
//				5		15
//           2		  12   17
//             3

tree.findNodesAtLevel(tree.root, 2);
console.log("height: " + tree.height(tree.root));