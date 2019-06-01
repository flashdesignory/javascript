/*
 * @title: Clone Graph
 * @description: various algos to clone
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(val, neighbors) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraphDFS(node) {
  if (!node) return null;

  const visited = {};
  const copy = new Node(node.val, []);
  visited[node.val] = copy;

  function dfs(node, visited, copy) { //eslint-disable-line
    for (let i = 0; i < node.neighbors.length; i++) {
      const neighbor = node.neighbors[i];
      if (!visited[neighbor.val]) {
        const next = new Node(neighbor.val, []);
        visited[neighbor.val] = next;
        copy.neighbors.push(next);
        dfs(neighbor, visited, next);
      } else {
        copy.neighbors.push(visited[neighbor.val]);
      }
    }
  }

  dfs(node, visited, copy);
  return copy;
}

function cloneGraphRecursive(node, visited) {
  visited = visited || {};
  const copy = new Node(node.val, []);
  visited[node.val] = copy;

  node.neighbors.forEach((child) => {
    copy.neighbors.push(
      visited[child.val] || cloneGraphRecursive(child, visited),
    );
  });
  return copy;
}

function cloneGraphRecursive2(node, visited) {
  visited = visited || {};
  const copy = new Node(node.val, []);
  visited[node.val] = copy;

  for (let i = 0; i < node.neighbors.length; i++) {
    const child = node.neighbors[i];
    copy.neighbors.push(
      visited[child.val] || cloneGraphRecursive2(child, visited),
    );
  }
  return copy;
}

// npx jest datastructures/graph/graph.clone.js
describe('clone graph', () => {
  const one = new Node('1');
  const two = new Node('2');
  const three = new Node('3');
  const four = new Node('4');

  one.neighbors = [two, three];
  two.neighbors = [one, three];
  three.neighbors = [two, four];
  four.neighbors = [one, three];

  it('clone graph dfs()', () => {
    expect(cloneGraphDFS(one)).toEqual(one);
  });

  it('clone graph recursive()', () => {
    expect(cloneGraphRecursive(one)).toEqual(one);
  });

  it('clone graph recursive2()', () => {
    expect(cloneGraphRecursive2(one)).toEqual(one);
  });
});
