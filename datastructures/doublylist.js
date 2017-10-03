/*
 * @title: Doubly List
 * @description: Generic Stack Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Node(value){
  this.value = value;
  this.next = null;
  this.previous = null;
}

function DoublyList(){
  this.head = null;
  this.tail = null;
}

DoublyList.prototype.log = function(){
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

DoublyList.prototype.add = function(value){
  var node = new Node(value);
  
  if(!this.head){
    this.head = node;
    this.tail = node;
    return value;
  }else{
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
  }
}


DoublyList.prototype.remove = function(value){
  if(!this.head) return;
  
  var current = this.head;
  var previous = this.head;
  
  if(current.value == value){
    this.head = current.next;
    if(this.head) this.head.previous = null;
    return current;
  }
  
  while(current.next){
    if(current.value == value){
      previous.next = current.next;
      current.next.previous = previous;
      return current;
    }else{
      previous = current;
      current = current.next;
    }
  }
  
  if(current.value == value){
    previous.next = null;
    this.tail = previous;
  }
  
  return;
}

var list = new DoublyList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.log();
list.remove(5);
list.log();
