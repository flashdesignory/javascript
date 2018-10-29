/*
 * @title: Random Number
 * @description: return a random number in range
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 function randomInRange(min, max){
  if(min > max){
    max = max - min;
    min = min + max;
    max = min - max;
  }
  return Math.random() * (max-min) + min;
 }

 console.log(randomInRange(5,7));
