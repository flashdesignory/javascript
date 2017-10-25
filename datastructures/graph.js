/*
 * @title: Graph
 * @description: Generic Graph Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 //IN PROGRESS
 
 function Graph(){
 	this.vertices = [];
 	this.edges = [];
 	this.numEdges = 0;
 }

 Graph.prototype.addVertex = function(vertex){
 	this.vertices.push(vertex);
 	this.edges[vertex] = [];
 }

 Graph.prototype.removeVertex = function(vertex){
 	var index = this.vertices.indexOf(vertex);

 	if(index != -1){
 		this.vertices.splice(index, 1);
 	}

 	while(this.edges[vertex].length){
 		var adjacentVertex = this.edges[vertex].pop();
 		this.removeEdge(adjacentVertex, vertex);
 	}
 }

 Graph.prototype.addEdge = function(vertex1, vertex2){
 	this.edges[vertex1].push(vertex2);
 	this.edges[vertex2].push(vertex1);
 	this.numEdges++;
 }

 Graph.prototype.removeEdge = function(vertex1, vertex2){
 	var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
 	var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;

 	if(index1 != -1){
 		this.edges[vertex1].splice(index1, 1);
 		this.numEdges--;
 	}
 	if(index2 != -1){
 		this.edges[vertex2].splice(index2, 1);
 	}
 }

 Graph.prototype.size = function(){
 	return this.vertices.length;
 }

 Graph.prototype.relations = function(){
 	return this.numEdges;
 }

 Graph.prototype.print = function(){
 	//for(var i = 0; i<this.vertices.length; i++){
 		//console.log(this.vertices[i]);
 //	}
   console.log(this.vertices.join(', '));
 }

var graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->
graph.addEdge(1, 2);
graph.addEdge(1, 5);
graph.addEdge(2, 3);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
console.log('graph size (number of vertices):', graph.size()); // => 6
console.log('graph relations (number of edges):', graph.relations()); // => 7