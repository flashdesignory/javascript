/*
 * @title: One Edit Away
 * @description: Simple function to find one edit or more
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function onEditAway(s, t) {
  if (s.length > t.length) {
    const temp = s;
    s = t;
    t = temp;
  }

  if ((t.length - s.length) > 1) {
    return false;
  }

  let numDifferent = 0;
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] !== t[j]) {
      if (numDifferent !== 0) {
        return false;
      }

      numDifferent++;

      if (t.length !== s.length) {
        i--;
      }
    }

    i++;
    j++;
  }

  return numDifferent === 1 || (t.length !== s.length && (t.length - j) === 1);
}

console.log(onEditAway('car', 'cart'));// true
console.log(onEditAway('car', 'cto'));// false
console.log(onEditAway('car', 'com'));// false;
console.log(onEditAway('car', 'mar'));// true;
