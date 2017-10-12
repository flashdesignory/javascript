/*
 * @title: merge sorted arrays
 * @description: Simple function to merge two sorted arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 function merge_one(left, right){
  var result = [];
  var lLen = left.length;
  var rLen = right.length;
  var l = 0;
  var r = 0;
  
  while(l < lLen && r < rLen){
    if(left[l] < right[r]){
      result.push(left[l++]);
    }else{
      result.push(right[r++]);
    }
  }
  
  return result.concat(left.slice(l)).concat(right.slice(r));
}

var result = merge_one([2,5,6,9], [1,2,3,29]);
console.log(result) // [1, 2, 2, 3, 5, 6, 9, 29]

function merge_two(left, right){
	var result = [];
	var a = left[0];
	var b = right[0];
	var i = 1;
	var j = 1;

	if(left.length == 0){
		return right;
	}

	if(right.length == 0){
		return left;
	}

	while(a || b){
		if(a && a < b){
			result.push(a);
			a = left[i++];
		}else{
			result.push(b);
			b = right[j++];
		}
	}

	return result;
}

var result = merge_two([2,5,6,9], [1,2,3,29]);
console.log(result) // [1, 2, 2, 3, 5, 6, 9, 29]