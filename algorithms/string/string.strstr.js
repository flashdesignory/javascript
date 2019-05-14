/*
 * @title: implement atoi in javascript
 * @description: Return the index of the first occurrence of
 * needle in haystack, or -1 if needle is not part of haystack.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function strStr1(haystack, needle) {
  if (haystack === needle || needle === '') {
    return 0;
  }
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      const temp = haystack.substring(i, i + needle.length);
      if (temp === needle) {
        return i;
      }
    }
  }
  return -1;
}

function strStr2(haystack, needle) {
  const needleLength = needle.length;

  if (needle === '' && haystack === '') {
    return 0;
  }

  for (let i = 0; i < haystack.length; i++) {
    if (haystack.substr(i, needleLength) === needle) {
      return i;
    }
  }
  return -1;
}

function strStr3(haystack, needle) {
  if (needle === '') return 0;
  const split = haystack.split(needle);
  return split.length > 1 ? split[0].length : -1;
}

// npx jest algorithms/string/string.strstr.js
describe('implement strStr', () => {
  test('strStr1()', () => {
    expect(strStr1('hello', 'll')).toEqual(2);
    expect(strStr1('aaaaaaaa', 'bb')).toEqual(-1);
  });
  test('strStr2()', () => {
    expect(strStr2('hello', 'll')).toEqual(2);
    expect(strStr2('aaaaaaaa', 'bb')).toEqual(-1);
  });
  test('strStr3()', () => {
    expect(strStr3('hello', 'll')).toEqual(2);
    expect(strStr3('aaaaaaaa', 'bb')).toEqual(-1);
  });
});
