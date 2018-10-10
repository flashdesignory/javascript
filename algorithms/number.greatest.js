/*
 * @title: greatest common divisor
 * @description: find greatest common divisor in numbers
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function greatestCommonDivisor(a,b){
  if(a < 2 || b < 2) return 1;

  let divisor = 2;
  let greatest = 1;

  while(a >= divisor && b >= divisor){
    if(a%divisor === 0 && b%divisor === 0){
      greatest = divisor;
    }
    divisor++;
  }
  return greatest;
}

greatestCommonDivisor(14, 21); //7

function greatestCommonDivisor2(a,b){
  if(b === 0){
    return a;
  }

  return greatestCommonDivisor2(b, a%b);
}

greatestCommonDivisor2(14, 21); //7
