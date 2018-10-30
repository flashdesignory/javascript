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

  bfs(v) {
    const visited = [];
    for (let i = 0; i < this.numVertices; i++) {
      visited[i] = false;
    }

    const q = new Queue();
    q.enqueue(v);
    visited[v] = true;

    while (!q.empty()) {
      const current = q.dequeue();
      console.log(current);
      const edges = this.adjList[current];
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (!visited[edge]) {
          visited[edge] = true;
          q.enqueue(edge);
        }
      }
    }
  }

  dfs(v) {
    const visited = [];
    for (let i = 0; i < this.numVertices; i++) {
      visited[i] = false;
    }
    this.traverse(v, visited);
  }

  traverse(v, visited) {
    visited[v] = true;
    console.log(v);
    const edges = this.adjList[v];
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (!visited[edge]) {
        this.traverse(edge, visited);
      }
    }
  }
}

const g = new Graph();
g.addVertex('a');
g.addVertex('b');
g.addVertex('c');
g.addVertex('d');
g.addVertex('e');
g.addVertex('f');
g.addEdge('a', 'b');
g.addEdge('a', 'd');
g.addEdge('a', 'e');
g.addEdge('b', 'c');
g.addEdge('d', 'e');
g.addEdge('e', 'f');
g.addEdge('e', 'c');
g.addEdge('c', 'f');
g.print();
console.log('************');
g.bfs('a');
console.log('************');
g.dfs('a');
