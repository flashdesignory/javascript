/*
 * @title: People max year
 * @description: return year of most people alive
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Person {
  constructor(birth, death) {
    this.birth = birth;
    this.death = death;
  }
}

// brute-force
function maxYearAlive1(people, start, end) {
  let max = 0;
  let year = start;

  for (let i = start; i <= end; i++) {
    let count = 0;
    for (let j = 0; j < people.length; j++) {
      const person = people[j];
      if (person.birth <= i && i <= person.death) {
        count++;
      }
    }
    if (count > max) {
      max = count;
      year = i;
    }
  }

  return year;
}

function maxYearAlive2(people, start, end) { //eslint-disable-line
  const births = [];
  const deaths = [];

  for (let i = 0; i < people.length; i++) {
    births.push(people[i].birth);
    deaths.push(people[i].death);
  }

  births.sort((a, b) => a - b);
  deaths.sort((a, b) => a - b);

  let birthIndex = 0;
  let deathIndex = 0;
  let current = 0;
  let max = 0;
  let year = start;

  while (birthIndex < births.length) {
    if (births[birthIndex] <= deaths[deathIndex]) {
      current++;
      if (current > max) {
        max = current;
        year = births[birthIndex];
      }
      birthIndex++;
    } else {
      current--;
      deathIndex++;
    }
  }

  return year;
}

function maxYearAlive3(people, start, end) {
  const result = [];
  for (let i = 0; i <= end - start; i++) {
    result[i] = 0;
  }

  for (let i = 0; i < people.length; i++) {
    const birth = people[i].birth - start;
    const death = people[i].death - start;
    result[birth]++;
    result[death + 1]--;
  }

  let current = 0;
  let max = 0;
  let year = start;

  for (let i = 0; i < result.length; i++) {
    current += result[i];
    if (current > max) {
      max = current;
      year = i;
    }
  }

  return start + year;
}

const data = [
  [1900, 1950],
  [1910, 1945],
  [1920, 1960],
  [1950, 1973],
  [1920, 1960],
  [1944, 1980],
];

const people = [];
for (let i = 0; i < data.length; i++) {
  people.push(new Person(data[i][0], data[i][1]));
}

// npx jest algorithms/misc/maxyears.js
test('maxYearAlive1()', () => {
  expect(maxYearAlive1(people, 1900, 2000)).toEqual(1944);
});
test('maxYearAlive2()', () => {
  expect(maxYearAlive2(people, 1900, 2000)).toEqual(1944);
});
test('maxYearAlive3()', () => {
  expect(maxYearAlive3(people, 1900, 2000)).toEqual(1944);
});
