/*
 * @title: Find Duplicates in Arrays
 * @description: Simple function to find dupes in arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

//input arrays have to be sorted
 function findCommon(one, two){
 	var i = 0;
 	var j = 0;
 	var result = [];

 	one.sort();
 	two.sort();

 	while(i < one.length && j < two.length){
 		if(one[i] < two[j]){
 			i++;
 		}else if(one[i] > two[j]){
 			j++;
 		}else{
 			result.push(one[i]);
 			i++;
 			j++;
 		}
 	}

 	return result;
 }

 var one = [1,4,7,9];
 var two = [1,3,7,8];

 var result = findCommon(one, two);
 console.log(result);

// example with three Arrays
var arr1 = [2,6,9,11,13,17];
var arr2 = [3,6,7,10,13,18];
var arr3 = [4,5,6,9,11,13];

function findIntersections(arr1,arr2,arr3){
  var result = [];
  var i = 0;
  var j = 0;
  var k = 0;
  while(i < arr1.length && j < arr2.length && k < arr3.length){
    if(arr1[i] === arr2[j] && arr2[j] === arr3[k]){
      result.push(arr1[i]);
      i++;
      j++;
      k++;
    }else if(arr1[i] < arr2[j]){
      i++;
    }else if(arr2[j] < arr3[k]){
      j++;
    }else{
      k++;
    }
  }
  return result;
}

findIntersections(arr1,arr2,arr3) //[6,13];
