/*
 * @title: Palindrome String
 * @description: Simple function to check for palindrome
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isPalindrome(str){
  var len = str.length;
  var middle = Math.floor(len/2);

  for(var i = 0; i<middle; i++){
    if(str[i] != str[len-1-i]){
      return false;
    }
  }

  return true;
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("fire"));
