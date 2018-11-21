/*
 * @title: Graph
 * @description: Generic Graph Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Queue {
  constructor() {
    this.storage = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.storage[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.storage[this.first];
    delete this.storage[this.first];
    this.first++;
    return temp;
  }

  empty() {
    return this.first === this.last;
  }

  peek() {
    return this.storage[this.first];
  }
}

class Graph {
  constructor() {
    this.numVertices = 0;
    this.adjList = {};
  }

  print() {
    const vertices = Object.keys(this.adjList);
    for (let i = 0; i < vertices.length; i++) {
      let result = `${vertices[i]} -> `;
      const edges = this.adjList[vertices[i]];
      result += edges.join(',');
      console.log(result);
    }
  }

  contains(v) {
    return !!this.adjList[v];
  }

  addVertex(v) {
    this.numVertices++;
    this.adjList[v] = [];
  }

  addEdge(one, two) {
    this.adjList[one].push(two);
    this.adjList[two].push(one);
  }

  breadthFirstSearch(v) {
    const visited = [];
    for (let i = 0; i < this.numVertices; i++) {
      visited[i] = false;
    }

    const queue = new Queue();
    queue.enqueue(v);
    visited[v] = true;

    const result = [];

    while (!queue.empty()) {
      const current = queue.dequeue();
      result.push(current);
      const edges = this.adjList[current];
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (!visited[edge]) {
          visited[edge] = true;
          queue.enqueue(edge);
        }
      }
    }
    return result;
  }

  depthFirstSearch(v) {
    const visited = [];
    for (let i = 0; i < this.numVertices; i++) {
      visited[i] = false;
    }
    return this.traverse(v, visited, []);
  }

  traverse(v, visited, result) {
    visited[v] = true;
    result.push(v);
    const edges = this.adjList[v];
    edges.forEach((edge) => {
      if (!visited[edge]) {
        return this.traverse(edge, visited, result);
      }
      return null;
    });
    return result;
  }

  pathFromTo(source, target) {
    const visited = [];
    for (let i = 0; i < this.numVertices; i++) {
      visited[i] = false;
    }

    const queue = new Queue();
    queue.enqueue(source);
    visited[source] = true;

    const predecessor = {};

    while (!queue.empty()) {
      let current = queue.dequeue();
      const edges = this.adjList[current];

      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (!visited[edge]) {
          visited[edge] = true;
          if (edge === target) {
            const path = [edge];
            path.push(current);
            while (current !== source) {
              current = predecessor[current];
              path.push(current);
            }
            path.reverse();
            return path;
          }
          predecessor[edge] = current;
          queue.enqueue(edge);
        }
      }
    }
    return [];
  }
}

const graph = new Graph();
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
console.log('bfs from 1: ', graph.breadthFirstSearch(1)); // => 1 2 5 3 4 6
console.log('dfs from 1: ', graph.depthFirstSearch(1)); // => 1 2 3 4 5 6
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
console.log('path from 3 to 5:', graph.pathFromTo(3, 5)); // => 3-2-5
