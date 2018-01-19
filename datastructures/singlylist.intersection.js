/*
 * @title: Singly List Intersection
 * @description:Simple Singly Linked Lists intersection Node
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

function getLength(head){
	if(!head) return ;
	var length = 0;
	var current = head;
	while(current){
		current = current.next;
		length++;
	}

	return length;
}

function getIntersectionNode_one(headA, headB){
	var lengthA = getLength(headA);
	var lengthB = getLength(headB);
	var nodeA = headA;
	var nodeB = headB;

	if(lengthA === 0 || lengthB === 0){
		return null;
	}

	while(lengthA > lengthB){
		nodeA = nodeA.next;
		lengthA--;
	}

	while(lengthB > lengthA){
		nodeB = nodeB.next;
		lengthB--;
	}

	while(lengthA && lengthB){
		if(nodeB === nodeA){
			return nodeA;
		}
		nodeA = nodeA.next;
		nodeB = nodeB.next;
	}

	return null;
}

function getIntersectionNode_two(headA, headB){
	var nodeA = headA;
	var nodeB = headB;

	while(nodeA != nodeB){
		nodeA = nodeA ? nodeA.next : headB;
		nodeB = nodeB ? nodeB.next : headA;
	}

	return nodeA;
}

var node19 = new Node(19);
var node21 = new Node(21);

var node16 = new Node(16);
var node18 = new Node(18);
var node30 = new Node(30);

var node44 = new Node(44);
var node55 = new Node(55);
var node66 = new Node(66);

var listA = new SinglyList();
listA.head = node19;
listA.head.next = node21;
listA.head.next.next = node44;
listA.head.next.next.next = node55;
listA.head.next.next.next.next = node66;

var listB = new SinglyList();
listB.head = node16;
listB.head.next = node18;
listB.head.next.next = node30;
listB.head.next.next.next = node44;
listB.head.next.next.next.next = node55;
listB.head.next.next.next.next.next = node66;

console.log(getIntersectionNode_one(listA.head, listB.head));
console.log(getIntersectionNode_two(listA.head, listB.head));