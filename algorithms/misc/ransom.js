/*
 * @title: Ransom Note
 * @description: Determine if you can write ransom note from magazine
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function checkMagazine1(magazine, note) {
  if (magazine.length < note.length) {
    return false;
  }
  if (magazine.length === 0 && note.length === 0) {
    return true;
  }

  const seen = {};
  for (let i = 0; i < note.length; i++) {
    const word = note[i];
    seen[word] = (seen[word] || 0) + 1;
  }

  for (let i = 0; i < magazine.length; i++) {
    const word = magazine[i];
    if (seen[word]) seen[word]--;
  }

  const sum = Object.values(seen).reduce((acc, value) => acc + value);
  return sum === 0;
}

function checkMagazine(magazine, note) {
  if (magazine.length < note.length) {
    return false;
  }

  if (magazine.length === 0 && note.length === 0) {
    return true;
  }

  const originalLength = magazine.length;

  for (let i = 0; i < note.length; i++) {
    const word = note[i];
    const index = magazine.indexOf(word);
    if (index !== -1) {
      magazine.splice(index, 1);
    } else {
      return false;
    }
  }

  return magazine.length + note.length === originalLength;
}

// npx jest algorithms/misc/ransom.js
test('ransom note', () => {
  const magazine = ['give', 'me', 'one', 'grand', 'today', 'night'];
  const note = ['give', 'one', 'grand', 'today'];
  expect(checkMagazine(magazine, note)).toBeTruthy();
});
test('ransom note 1s', () => {
  const magazine = ['give', 'me', 'one', 'grand', 'today', 'night'];
  const note = ['give', 'one', 'grand', 'today'];
  expect(checkMagazine1(magazine, note)).toBeTruthy();
});
