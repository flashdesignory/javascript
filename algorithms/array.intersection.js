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