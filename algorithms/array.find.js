/*
 * @title: Find Item in Array
 * @description: Simple function to find an item in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
function countItems(arr, item) {
    var count = 0;
    var result = [];

    function flattenArray(arr){
      for(var i = 0; i<arr.length; i++){
        Array.isArray(arr[i]) ? flattenArray(arr[i]) : result.push(arr[i]);
      }
    }
    
    flattenArray(arr);
    
    for(var i = 0; i<result.length; i++){
      if(result[i].indexOf(item) != -1){
        count++;
      }
    }
    
    return count;
}

var arr = [
  "apple",
  ["banana", "strawberry", "apple"]
];

console.log(countItems(arr, "apple"));