/*
 * @title: Singly List
 * @description:Simple Singly Linked List
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

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

 Stack.prototype.peek = function(){
 	return this.data[this.size-1];
 }

 function Node(value){
 	this.value = value;
 	this.next = null;
 }

 function SinglyList(){
 	this.head = null;
 }

SinglyList.prototype.log = function(){
 	if(!this.head) return;

 	var values = [];
 	var current = this.head;
 	/*values.push(current.value);
 	while(current.next){
 		current = current.next;
 		values.push(current.value);
 	}*/
 	while(current){
 		values.push(current.value);
 		current = current.next;
 	}

 	console.log(values);
 }

 SinglyList.prototype.add = function(value){
 	var node = new Node(value);

 	if(this.head == null){
 		this.head = node;
 		return node;
 	}

 	var current = this.head;

 	while(current.next){
 		current = current.next;
 	}

 	current.next = node;
 	return node;
 }

 SinglyList.prototype.remove = function(value){
 	if(!this.head) return null;

 	var current = this.head;
 	var previous = this.head;

 	if(current.value == value){
 		this.head = current.next;
 		return current;
 	}

 	while(current.next){
 		if(current.value == value){
 			previous.next = current.next;
 			return current;
 		}else{
 			previous = current;
 			current = current.next;
 		}
 	}

 	if(current.value == value){
 		previous.next = null;
 		return current;
 	}

 	return null;
 }

SinglyList.prototype.reverse = function(){
	if(!this.head) return null;

	var current = this.head;
	var previous = null;
	var next;

	while(current){
		next = current.next;
		current.next = previous;
		previous = current;
		current = next;
	}

	this.head = previous;
}

SinglyList.prototype.middle = function(){
	if(!this.head || !this.head.next || !this.head.next.next) return null;

	var slow = this.head;
	var fast = this.head;

	while(fast && fast.next){
		fast = fast.next.next;
		if(!fast) break;//even numbers don't go passed middle
		slow = slow.next;
	}

	return slow.value;
}

SinglyList.prototype.length = function(){
	if(!this.head) return;

	var length = 0;
	var current = this.head;
	while(current){
		current = current.next;
		length++;
	}

	return length;
}

SinglyList.prototype.findFromEnd = function(index){
	if(!this.head) return null;

	var fast = this.head;
	var slow = this.head;

	for(var i = 0; i< index; i++){
		if(fast.next){
			fast = fast.next;
		}else{
			return null;
		}
	}

	while(fast.next){
		fast = fast.next;
		slow = slow.next;
	}

	return slow.value;
}

SinglyList.prototype.findByIndex = function(index){
	if(!this.head) return null;

	var current = this.head;
	for(var i = 1; i<index; i++){
		if(current.next){
			current = current.next;
		}else{
			return null;
		}
	}

	return current.value;
}

SinglyList.prototype.isPalindrome = function(){
	//Big O(n) time & O(n) space
  if(!this.head) return false;

  var stack = new Stack();
  var last = null;
  var current = this.head;

  stack.push(current);
  while(current.next){
    current = current.next;
    stack.push(current);
  }

  current = this.head;
  last = stack.pop();
  if(current.value != last.value) return false;

  while(current.next){
    current = current.next;
    last = stack.pop();
    if(current.value != last.value) return false;
  }

  return true;
}

SinglyList.prototype.hasCycle = function(){
	if(!this.head || !this.head.next) return false;
	if(this.head.value == this.head.next.value){
		return true;
	}

	var slow = this.head;
	var fast = this.head;

	while(fast.next && fast.next.next){
		fast = fast.next.next;
		slow = slow.next;

		if(slow.value == fast.value) return true;
	}

	return false;
}

SinglyList.prototype.removeDuplicates = function(){
  var seen = {};
  var current = this.head;
  var previous = null;

  while(current){
    if(seen[current.value]){
      previous.next = current.next;
    }else{
      seen[current.value] = true;
      previous = current;
    }
    current = current.next;
  }
}

SinglyList.prototype.removeDuplicates2 = function(){
  var current = this.head;
  while(current.next){
    var runner = current.next;
    var previous = current;
    while(runner){
      if(runner.value === current.value){
        previous.next = runner.next;
      }else{
        previous = runner;
      }
      runner = runner.next;
    }
    current = current.next;
  }
}

//example
var list = new SinglyList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.log();
list.remove(1);
list.log();
list.remove(3);
list.log();
list.reverse();
list.log();
list.add(4);
list.add(5);
list.log();
console.log(list.isPalindrome());
console.log(list.hasCycle());
console.log(list.length());
