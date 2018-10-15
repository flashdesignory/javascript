/*
 * @title: Queue
 * @description: Generic Queue Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

//first-in first-out (FIFO)

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

Queue.prototype.peek = function(){
	return this.data[this.first];
}

Queue.prototype.empty = function(){
	return this.first === this.last;
}

//example
var queue = new Queue();
queue.push(1);
queue.push(2);
queue.push(3);
console.log(queue.peek());
console.log(queue.shift());
console.log(queue.peek());
