class Queue {
  constructor() {
    this.data = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.data[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.data[this.first];
    delete this.data[this.first];
    this.first++;
    return temp;
  }

  peek() {
    return this.data[this.first];
  }

  empty() {
    return this.first === this.last;
  }
}

class Graph {
  constructor() {
    this.adjList = {};
    this.numVertices = 0;
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

  addVertex(v) {
    this.adjList[v] = [];
    this.numVertices++;
  }

  addEdge(one, two) {
    this.adjList[one].push(two);
    this.adjList[two].push(one);
  }

  contains(v) {
    return this.adjList[v];
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

    const previous = {};

    while (!queue.empty()) {
      let current = queue.dequeue();

      if (current === target) {
        const path = [];
        while (current) {
          path.push(current);
          current = previous[current];
        }
        return path.reverse();
      }

      const edges = this.adjList[current];

      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (!visited[edge]) {
          visited[edge] = true;
          previous[edge] = current;
          queue.enqueue(edge);
        }
      }
    }
    return [];
  }

  hasCycle() {
    const visited = [];
    Object.keys(this.adjList).forEach((vertex) => {
      visited[vertex] = false;
    });

    const vertices = Object.keys(this.adjList);
    for (let i = 0; i < this.numVertices; i++) {
      const vertex = vertices[i];
      if (!visited[vertex]) {
        if (this.isCyclic(vertex, visited, null)) {
          return true;
        }
      }
    }

    return false;
  }

  isCyclic(vertex, visited, parent) {
    visited[vertex] = true;
    const edges = this.adjList[vertex];
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];

      if (!visited[edge]) {
        if (this.isCyclic(edge, visited, vertex)) {
          return true;
        }
      } else if (edge !== parent && parent !== null) {
        return true;
      }
    }
    return false;
  }
}

// npx jest datastructures/graph/graph.js
describe('search algorithms for graph', () => {
  const graph = new Graph();
  const vertices = [1, 2, 3, 4, 5, 6];
  for (let i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i]);
  }
  const edges = [{ one: 1, two: 2 }, { one: 1, two: 5 }, { one: 2, two: 3 },
    { one: 2, two: 5 }, { one: 3, two: 4 }, { one: 4, two: 5 },
    { one: 4, two: 6 }];
  for (let i = 0; i < edges.length; i++) {
    graph.addEdge(edges[i].one, edges[i].two);
  }

  // graph.print();
  // 1 -> 2, 5
  // 2 -> 1, 3, 5
  // 3 -> 2, 4
  // 4 -> 3, 5, 6
  // 5 -> 1, 2, 4
  // 6 -> 4

  it('should list values bfs', () => {
    expect(graph.breadthFirstSearch(1)).toEqual([1, 2, 5, 3, 4, 6]);
  });
  it('should list values dfs', () => {
    expect(graph.depthFirstSearch(1)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('should list path from 6 to 1', () => {
    expect(graph.pathFromTo(6, 1)).toEqual([6, 4, 5, 1]);
  });
  it('should list path from 3 to 5', () => {
    expect(graph.pathFromTo(3, 5)).toEqual([3, 2, 5]);
  });
  it('should detect cycle', () => {
    expect(graph.hasCycle()).toBe(true);
  });
});
