/*
 * @title: sort compare functions
 * @description: sort compare examples
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  By default, the sort() function sorts values as strings.
  However, if numbers are sorted as strings, "25" is bigger
  than "100", because "2" is bigger than "1".

  Because of this, the sort() method will produce incorrect
  result when sorting numbers.

  You can fix this by providing a compare function:

  const compare = function(a, b) {
    return a - b;
  }

  The purpose of the compare function is to define an alternative
  sort order.

  The compare function should return a negative, zero, or positive
  value, depending on the arguments.

  When the sort() function compares two values, it sends the values
  to the compare function, and sorts the values according to the
  returned (negative, zero, positive value.
*/

const ascending = (a, b) => a - b;
const descending = (a, b) => b - a;

const compareProp = (prop) => { // eslint-disable-line
  return function (a, b) {
    const x = a[prop].toLowerCase();
    const y = b[prop].toLowerCase();
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
};

// npx jest utils/sort.js
test('simple string sorting', () => {
  const fruits = ['banana', 'orange', 'apple'];
  expect(fruits.sort()).toEqual(['apple', 'banana', 'orange']);
});

test('incorrect value sorting', () => {
  const numbers = [40, 100, 1, 5, 25, 10];
  expect(numbers.sort()).toEqual([1, 10, 100, 25, 40, 5]);
});

test('correct value sorting', () => {
  const numbers = [40, 100, 1, 5, 25, 10];
  expect(numbers.sort(ascending)).toEqual([1, 5, 10, 25, 40, 100]);
  expect(numbers.sort(descending)).toEqual([100, 40, 25, 10, 5, 1]);
});

test('sort object property - number', () => {
  const years = [{ year: 2001 }, { year: 2010 }, { year: 2016 }];
  const yearAscending = (a, b) => a.year - b.year;
  expect(years.sort(yearAscending)).toEqual([{ year: 2001 }, { year: 2010 }, { year: 2016 }]);
});

test('sort object property - string', () => {
  const cars = [
    { make: 'Volvo', color: 'blue' },
    { make: 'Saab', color: 'purple' },
    { make: 'BMW', color: 'green' },
  ];
  const compareMake = (a, b) => {
    const x = a.make.toLowerCase();
    const y = b.make.toLowerCase();
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  expect(cars.sort(compareMake)).toEqual([
    { make: 'BMW', color: 'green' },
    { make: 'Saab', color: 'purple' },
    { make: 'Volvo', color: 'blue' },
  ]);
});

test('sort object property general', () => {
  const cars = [
    { make: 'Volvo', color: 'blue' },
    { make: 'Saab', color: 'purple' },
    { make: 'BMW', color: 'green' },
  ];

  expect(cars.sort(compareProp('color'))).toEqual([
    { make: 'Volvo', color: 'blue' },
    { make: 'BMW', color: 'green' },
    { make: 'Saab', color: 'purple' },
  ]);
});

// random
const numbers = [40, 100, 1, 5, 25, 10];
const random = (a, b) => 0.5 - Math.random(); // eslint-disable-line
console.log(numbers.sort(random));
