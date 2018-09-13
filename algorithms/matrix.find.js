/*
 * @title: Rotate Matrix
 * @description: various functions to find a value
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 /*
 Given an n x n matrix and a number x, find position of x in the matrix if it is present in it.
 Else print “Not Found”. In the given matrix, every row and column is sorted in increasing order.
 The designed algorithm should have linear time complexity.
 */

 var matrix = [[10,20,30,40],
               [15,25,35,45],
               [27,29,37,48],
               [32,33,39,50]];

 findPosition = function(matrix, num){
   let i = 0;
   let j = matrix.length-1;
   console.log(matrix[i][j]);
   while(i < matrix.length && j >= 0){
     if(matrix[i][j] === num){
       return [i,j];
     }else{
       if(matrix[i][j] > num){
         j--;
       }else{
         i++;
       }
     }
   }
   return [];
 }

 findPosition(matrix, 29); //[2,1];


 /*Given a sorted matrix mat[n][m] and an element ‘x’.
 Find position of x in the matrix if it is present, else print -1.
 Matrix is sorted in a way such that all elements in a row are sorted
 in increasing order and for row ‘i’, where 1 <= i <= n-1, first
 element of row 'i' is greater than or equal to the last element of
 row 'i-1'. The approach should have O(log n + log m) time complexity.*/

 var matrix = [
   [1,5,9],
   [14,20,21],
   [30,34,43]
 ]

 function binarySearch(matrix, row, left, right, num){
   let middle;
   while(left <= right){
     middle = (left + right)/2;
     if(matrix[row][middle] === num){
       console.log("found at: " + row + ", " + middle);
       return;
     }

     if(matrix[row][middle] > num){
       right = middle-1;
     }else{
       left = middle+1;
     }
   }
 }

 function binaryMatrixSearch(matrix, num){
   let rowLength = matrix.length; //row length
   let columnLength = matrix[0].length; //col length;

   //single row - perform bs on row
   if(rowLength === 1){
     binarySearch(matrix, 0, 0, columnLength-1, num);
     return;
   }

   //bs on middle row and column.
   //if num not found, we have two rows to search after
   let minRow = 0;
   let maxRow = rowLength-1;
   let middleColumn = Math.floor(columnLength/2);

   while((minRow+1) < maxRow){ //left <= right ????
     let middleRow = (minRow + maxRow)/2;
     if(matrix[middleRow][middleColumn] === num){
       console.log("found at: " + middleRow + ", " + middleColumn);
       return;
     }
     if(matrix[middleRow][middleColumn] > num){
       maxRow = middleRow;
     }else{
       minRow = middleRow;
     }
   }

   //check remaining two rows
   //if element is in middle column of those two rows
   if(matrix[minRow][middleColumn] === num){
     console.log("found at: " + minRow + ", " + middleColumn);
   }else if(matrix[maxRow][middleColumn] === num){
     console.log("found at: " + maxRow + ", " + middleColumn);
   }

   //search first half of min row
   else if(num <= matrix[minRow][middleColumn-1]){
     binarySearch(matrix, minRow, 0, middleColumn-1, num);
   }

   //search second half of min row
   else if(num >= matrix[minRow][middleColumn+1] &&
           num <= matrix[minRow][columnLength-1]){
     binarySearch(matrix, minRow, middleColumn+1, columnLength-1, num);
   }

   //search first half of max row
   else if(num <= matrix[maxRow][middleColumn-1]){
     binarySearch(matrix, maxRow, 0, middleColumn-1, num);
   }

   //search second half of max row
   else if(num >= matrix[maxRow][middleColumn+1] &&
           num <= matrix[maxRow][columnLength-1]){
     binarySearch(matrix, maxRow, middleColumn+1, columnLength-1, num);
   }
 }
 binaryMatrixSearch(matrix, 14);
