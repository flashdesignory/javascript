/*
 * @title: Rotate Matrix
 * @description: Simple function to rotate matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

var arr = [[1,2,3],[4,5,6],[7,8,9]];
function rotateMatrixClockwise(arr){
	console.log(arr);
	var n = arr.length;
	//var middle = Math.floor(n/2);
	for(var i = 0; i<n/2; i++){
	  //for(var j = 0; j<middle; j++){
	  for(var j = i; j<n-1-i; j++){
	    var temp = arr[i][j];
	    arr[i][j] = arr[n-1-j][i];
	    arr[n-1-j][i] = arr[n-1-i][n-1-j];
	    arr[n-1-i][n-1-j] = arr[j][n-1-i];
	    arr[j][n-1-i] = temp;
	  }
	}
	console.log(arr);
}

rotateMatrixClockwise(arr);
//[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ] // before
//[ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ] // after
          
/*[ 1, 2, 3 ], 
[ 4, 5, 6 ], 
[ 7, 8, 9 ] 

[ 7, 4, 1 ], 
[ 8, 5, 2 ], 
[ 9, 6, 3 ] */

function rotateMatrixCounterClock(arr){
	console.log(arr);
	var n = arr.length;
	for(var i = 0; i<n/2; i++){
	  for(var j = i; j<n-1-i; j++){
	    var temp = arr[i][j];
	    arr[i][j] = arr[j][n-1-i];
	    arr[j][n-1-i] = arr[n-1-i][n-1-j];
	    arr[n-1-i][n-1-j] = arr[n-1-j][i];
	    arr[n-1-j][i] = temp;
	  }
	}

	console.log(arr);
}

rotateMatrixCounterClock(arr);
//[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ] // before
//[ [ 3, 6, 9 ], [ 2, 5, 8 ], [ 1, 4, 7 ] ] // after

/*[ 1, 2, 3 ], 
[ 4, 5, 6 ], 
[ 7, 8, 9 ]

[ 3, 6, 9 ], 
[ 2, 5, 8 ], 
[ 1, 4, 7 ]*/