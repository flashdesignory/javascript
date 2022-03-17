/*
 * @title: Matrix Path
 * @description: find shortest path
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle).
You can move up, down, left, or right from and to an empty cell in one step.

Return the minimum number of steps to walk from the upper left corner (0, 0) 
to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. 
If it is not possible to find such walk return -1.
*/

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
  
    empty() {
      return this.first === this.last;
    }
  
    reset() {
      this.data = {};
      this.first = 0;
      this.last = 0;
    }
  }
  
  class Node {
    constructor(row, column, distance, itemsToRemove) {
      this.row = row;
      this.column = column;
      this.distance = distance;
      this.itemsToRemove = itemsToRemove;
    }
  }
  
  const isValid = (row, column, rowLength, columnLength) => {
    return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
  }
  
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  
  /**
   * @param {number[][]} matrix
   * @param {number} k
   * @return {number}
   */
  const shortestPath = (matrix, k) => {
    let queue = new Queue();
    queue.enqueue(new Node(0, 0, 0, k));
      
    // set makes sure that we don't visit a state (coordinates + k) multiple times
    const visited = new Set(`0-0-${k}`);
    
    while(!queue.empty()) {
      const current = queue.dequeue();
  
      // if we have reached the target, return the distance
      if (current.row === matrix.length - 1 && current.column === matrix[0].length - 1) {
        return current.distance;
      }
      
      // get all valid neighbors
      for(let i = 0; i < directions.length; i++) {
        const nextRow = current.row + directions[i][0];
        const nextColumn = current.column + directions[i][1];
        const nextDistance = current.distance + 1;
        
        // discard if it is outside the matrix bounary
        if (!isValid(nextRow, nextColumn, matrix.length, matrix[0].length)) {
          continue;
        }
        
        // discard if it is an obstacle and we can't eliminate it anymore
        if (matrix[nextRow][nextColumn] === 1 && current.itemsToRemove === 0) {
          continue;
        }
        
        // if it is an obstacle, decrease k by 1, otherwise it stays the same
        const nextK = matrix[nextRow][nextColumn] === 1 ? current.itemsToRemove - 1 : current.itemsToRemove;
  
        // key for the next state
        const key = `${nextRow}-${nextColumn}-${nextK}`
        
        // make sure that the state hasn't been visited already
        if (!visited.has(key)) {
          queue.enqueue(new Node(nextRow, nextColumn, nextDistance, nextK));
          visited.add(key)
        }
      }
    }
    
    // target isn't reachable, return 1
    return -1;
  };

  // npx jest algorithms/matrix/matrix.path.removal.js
test('shortestPath()', () => {
    const matrix = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,0],
        [0,1,0,1,1,1,1,1,1,1],
        [0,1,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,0],
        [0,1,0,1,1,1,1,1,1,1],
        [0,1,0,1,1,1,1,0,0,0],
        [0,1,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,0,1,0],
        [0,0,0,0,0,0,0,0,1,0]
    ];
    expect(shortestPath(matrix, 1)).toEqual(20);
  });