/*
 * @title: Matrix num regions
 * @description: find number of regions
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const matrix = [[0,0,1,1,0],
                [1,0,1,1,0],
                [0,1,0,0,0],
                [0,0,0,0,1]];

const rowNum = [-1,-1,-1, 0, 0, 1, 1, 1];
const colNum = [-1, 0, 1,-1, 1,-1, 0, 1];

function isValid(row, column, rowLength, columnLength){
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

function dfs(matrix, r, c, visited){
  visited[r][c] = true;
  for(let i = 0; i<8; i++){
    let nextRow = r + rowNum[i];
    let nextCol = c + colNum[i];
    if(isValid(nextRow, nextCol, matrix.length, matrix[0].length) && matrix[nextRow][nextCol] && !visited[nextRow][nextCol]){
      dfs(matrix, nextRow, nextCol, visited);
    }
  }
}

function numRegions(matrix){
  const visited = [];
  for(let r = 0; r<matrix.length; r++){
    visited[r] = [];
    for(let c = 0; c<matrix[r].length; c++){
      visited[r][c] = false;
    }
  }

  let result = 0;

  for(let r = 0; r<matrix.length; r++){
    for(let c = 0; c<matrix[r].length; c++){
      if(matrix[r][c] && !visited[r][c]){
        dfs(matrix, r, c, visited);
        result++;
      }
    }
  }

  return result;
}

console.log(numRegions(matrix)); //2
