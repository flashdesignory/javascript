/*
 * @title: Graph Dijkstra
 * @description: shortest path with priority list
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class PriorityNode {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.data = [];
  }

  enqueue(value, priority) {
    const node = new PriorityNode(value, priority);
    this.data.push(node);
    this.bubbleUp(this.data.length - 1);
  }

  dequeue() {
    const min = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return min;
  }

  empty() {
    return this.data.length === 0;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent].priority > this.data[index].priority) {
        const temp = this.data[parent];
        this.data[parent] = this.data[index];
        this.data[index] = temp;
      }
      index = parent;
    }
  }

  bubbleDown(index) {
    while (index < this.data.length) {
      const left = Math.floor((index * 2) + 1);
      const right = Math.floor((index * 2) + 2);

      let smallest = index;

      if (left < this.data.length - 1) {
        if (this.data[index].priority > this.data[left].priority) {
          smallest = left;
        }
      }

      if (right < this.data.length - 1) {
        if (this.data[index].priority > this.data[right].priority) {
          smallest = right;
        }
      }

      if (smallest !== index) {
        const temp = this.data[smallest];
        this.data[smallest] = this.data[index];
        this.data[index] = temp;

        index = smallest;
      } else {
        break;
      }
    }
  }
}


class WeightNode {
  constructor(value, weight) {
    this.value = value;
    this.weight = weight;
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
      edges.forEach((edge) => {
        result += `[value: '${edge.value}', weight: '${edge.weight}'], `;
      });
      console.log(result);
    }
  }

  addVertex(v) {
    this.adjList[v] = [];
    this.numVertices++;
  }

  addEdge(one, two, weight) {
    this.adjList[one].push(new WeightNode(two, weight));
    this.adjList[two].push(new WeightNode(one, weight));
  }

  dijkstra(source, target) {
    const queue = new PriorityQueue();
    const distances = {};
    const previous = {};

    const vertices = Object.keys(this.adjList);

    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      if (vertex === source) {
        distances[vertex] = 0;
        queue.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        queue.enqueue(vertex, Infinity);
      }
    }

    while (!queue.empty()) {
      const current = queue.dequeue();

      if (current.value === target) {
        const path = [];
        let point = current.value;
        while (previous[point]) {
          path.push(point);
          point = previous[point];
        }
        return path.concat(source).reverse();
      }

      const edges = this.adjList[current.value];
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const distance = distances[current.value] + edge.weight;
        if (distance < distances[edge.value]) {
          distances[edge.value] = distance;
          previous[edge.value] = current.value;
          queue.enqueue(edge.value, distance);
        }
      }
    }
    return null;
  }
}

// npx jest datastructures/graph/graph.dijkstra.js
describe('find shortest path', () => {
  const graph = new Graph();
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addVertex('E');
  graph.addVertex('F');

  graph.addEdge('A', 'B', 4);
  graph.addEdge('A', 'C', 2);
  graph.addEdge('B', 'E', 3);
  graph.addEdge('C', 'D', 2);
  graph.addEdge('C', 'F', 4);
  graph.addEdge('D', 'E', 3);
  graph.addEdge('D', 'F', 1);
  graph.addEdge('E', 'F', 1);

  it('dijkstra()', () => {
    expect(graph.dijkstra('A', 'E')).toEqual(['A', 'C', 'D', 'F', 'E']);
  });
});
