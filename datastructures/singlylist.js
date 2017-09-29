/*
 * @title: Singly List
 * @description: Generic Stack Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

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
 	values.push(current.value);
 	while(current.next){
 		current = current.next;
 		values.push(current.value);
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

 	return null;
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