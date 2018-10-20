/*
 * @title: Longest Common SubSequence from Dictionary
 * @description: lcs in dictionary
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isSubsequence(str1, str2){
  let m = str1.length;
  let n = str2.length;
  let j = 0;
  let i = 0;
  while(i < n && j < m){
    if(str1[j] === str2[i]){
      //found same character, let's increment word index;
      console.log(str1[j]);
      j++;
    }
    i++;
  }
  //all characters from word found from 0 to length
  return (j == m);
}

function findLongestString(arr, str){
  let result = '';
  let length = 0;

  arr.forEach(word => {
    if(length < word.length && isSubsequence(word, str)){
      result = word;
      length = word.length;
    }
  })

  return result;
}

const dict = ['ale', 'apple', 'monkey', 'plea'];
const str = 'abpcplea';
findLongestString(dict, str);
