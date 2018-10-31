/*
 * @title: One Edit Away
 * @description: Simple function to find one edit or more
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function oneEditAway(str1, str2) {
  const length1 = str1.length;
  const length2 = str2.length;

  if (Math.abs(length1 - length2) > 1) return false;

  let index1 = 0;
  let index2 = 0;
  let numEdits = 0;

  while (index1 < length1 && index2 < length2) {
    if (str1[index1] !== str2[index2]) {
      if (numEdits >= 1) return false;

      if (length1 > length2) {
        index1++;
      } else if (length2 > length1) {
        index2++;
      } else {
        index1++;
        index2++;
      }
      numEdits++;
    } else {
      index1++;
      index2++;
    }
  }

  if (index1 < length1 || index2 < length2) {
    numEdits++;
  }

  return numEdits === 1;
}

console.log(oneEditAway('car', 'cart')); // true
console.log(oneEditAway('car', 'cto')); // false
console.log(oneEditAway('car', 'com')); // false;
console.log(oneEditAway('car', 'mar')); // true;
console.log(oneEditAway('pale', 'ple')); // true
