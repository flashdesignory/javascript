/*
 * @title: Swap Number
 * @description: simple functions to swap numbers
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 function swapNumbers_one(a,b){
  b = b-a;
  a = a+b;
  b = a-b;
  return [a,b];
 }

 console.log(swapNumbers_one(3,5));

 function swapNumbers_two(a,b){
  a = a^b;
  b = a^b;
  a = a^b;
  return [a,b];
 }

 console.log(swapNumbers_two(4,6));
