/*
 * @title: Unique Character
 * @description: return first unique character of string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function firstUniqChar1(s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i;
    }
  }
  return -1;
}

function firstUniqChar2(s) {
  const seen = {};
  for (let i = 0; i < s.length; i++) {
    seen[s[i]] = (seen[s[i]] || 0) + 1;
  }
  for (let i = 0; i < s.length; i++) {
    if (seen[s[i]] === 1) {
      return i;
    }
  }
  return -1;
}

function firstUniqChar3(s) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], 2);
    } else {
      map.set(s[i], 1);
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i]) && map.get(s[i]) === 1) {
      return i;
    }
  }
  return -1;
}

// npx jest algorithms/string/string.unique.js
test('firstUniqChar1()', () => {
  expect(firstUniqChar1('fooball')).toEqual(0);
});
test('firstUniqChar2()', () => {
  expect(firstUniqChar2('fooball')).toEqual(0);
});
test('firstUniqChar3()', () => {
  expect(firstUniqChar3('fooball')).toEqual(0);
});
