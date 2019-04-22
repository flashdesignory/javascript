/*
 * @title: String Edits
 * @description: find number of edits needed for str1 to str2
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// recursive
function numEditsAway(str1, str2, index1, index2) {
  if (index1 === 0) return index2;
  if (index2 === 0) return index1;

  if (str1[index1 - 1] === str2[index2 - 1]) {
    return numEditsAway(str1, str2, index1 - 1, index2 - 1);
  }

  return 1 + Math.min(
    numEditsAway(str1, str2, index1 - 1, index2), // remove
    numEditsAway(str1, str2, index1, index2 - 1), // insert
    numEditsAway(str1, str2, index1 - 1, index2 - 1), // replace
  );
}

// tabulation
function numEditsAway2(str1, str2) {
  const length1 = str1.length;
  const length2 = str2.length;
  const result = [];

  for (let i = 0; i <= length1; i++) {
    result[i] = [];
    for (let j = 0; j <= length2; j++) {
      result[i][j] = 0;
    }
  }

  for (let i = 0; i <= length1; i++) {
    result[i][0] = i;
  }

  for (let i = 0; i <= length2; i++) {
    result[0][i] = i;
  }

  for (let i = 1; i <= length1; i++) {
    for (let j = 1; j <= length2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        result[i][j] = result[i - 1][j - 1];
      } else {
        result[i][j] = 1 + Math.min(
          result[i - 1][j], // remove
          result[i][j - 1], // insert
          result[i - 1][j - 1], // replace
        );
      }
    }
  }

  return result[length1][length2];
}

// npx jest algorithms/string/string.edit.distance.js
test('numEditsAway()', () => {
  const str1 = 'saturday';
  const str2 = 'sunday';
  expect(numEditsAway(str1, str2, str1.length, str2.length)).toEqual(3);
});

test('numEditsAway2()', () => {
  const str1 = 'saturday';
  const str2 = 'sunday';
  expect(numEditsAway2(str1, str2)).toEqual(3);
});
