/*
 * @title: Prime Factors
 * @description: find prime factors of given number and return
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 function findPrimes(n){
  var factors = [];
  var divisor = 2;

  while(n > 2){
    if(n % divisor === 0){
      factors.push(divisor);
      n = n/divisor;
    }else{
      divisor ++;
    }
  }

  return factors;
 }

 console.log(findPrimes(69));//[3,23];
