/*
 * @title: LRU Cache
 * @description: LRU Cache implemented with Doubly Linked List and Hashtable
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 function Node(key, value){
  this.key = key;
  this.value = value;
  this.next = null;
  this.prev = null;
}

function LRUCache(limit){
  this.limit = limit;
  this.head = null;
  this.tail = null;
  this.map = {};
  this.size = 0;
}

LRUCache.prototype.set = function(key, value){
  console.log("set(" + key + ", " + value + ")");
  var node;
  if(this.map[key]){

    node = this.map[key];
    this.map[key].value = value;
    
    if(node.prev){
      node.prev.next = node.next;
    }
    
    if(node.next){
      node.next.prev = node.prev;
    }
  }else{
    if(this.size >= this.limit){
      var keyToDelete = this.tail.key;
      this.tail = this.tail.prev;
      if(this.tail) this.tail.next = null;
      delete this.map[keyToDelete];
    }else{
      this.size++;
    }
    node = new Node(key, value);
    this.map[key] = node;
  }
  
  if(this.head){
    this.head.prev = node;
    node.next = this.head;
  }
  
  this.head = node;
  if(!this.tail) this.tail = node;
  return node.value;
}

LRUCache.prototype.get = function(key){
  if(this.map[key]){
    var node = this.map[key];
    
    if(node.prev){
      node.prev.next = node.next;
    }
    
    if(node.next){
      node.next.prev = node.prev;
    }else{
      this.tail = node.prev;
    }
    
    if(this.head){
      this.head.prev = node;
      node.next = this.head;
    }
    
    this.head = node;
    if(!this.tail) this.tail = node;
    console.log("get(" + key + ", " + this.map[key].value + ")");
    return this.map[key].value;
  }else{
    console.log("get(" + key + ", -1)");
    return -1;
  }
}

LRUCache.prototype.log = function(){
  var temp = [];
  var current = this.head;
  while(current){
    var d = {key:current.key,value:current.value};
    temp.push(d);
    current = current.next;
  }
  console.log(temp);
}

var cache = new LRUCache(2);
cache.set(1, 1);    //returns 1
cache.log();
cache.set(2, 2);    //returns 2
cache.log();
cache.get(1);       // returns 1
cache.log();
cache.set(3, 3);    // evicts key 2
cache.log();
cache.get(2);       // returns -1 (not found)
cache.log();
cache.set(4, 4);    // evicts key 1
cache.log();
cache.get(1);       // returns -1 (not found)
cache.log();
cache.get(3);       // returns 3
cache.log();
cache.get(4);       // returns 4
cache.log();