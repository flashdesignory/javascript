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

// simple string sorting
const fruits = ['banana', 'orange', 'apple'];
console.log(fruits.sort());
// incorrect value sorting
const numbers = [40, 100, 1, 5, 25, 10];
console.log(numbers.sort());
// correct number sorting (asc)
const ascending = (a, b) => a - b;
console.log(numbers.sort(ascending));
// correct number sorting (desc)
const descending = (a, b) => b - a;
console.log(numbers.sort(descending));
// random
const random = (a, b) => 0.5 - Math.random(); // eslint-disable-line
console.log(numbers.sort(random));
// sort object property - number
const years = [{ year: 2001 }, { year: 2010 }, { year: 2016 }];
console.log(years.sort((a, b) => a.year - b.year));
// sort object property - string
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
console.log(cars.sort(compareMake));
// sort object property general
const compareProp = (prop) => { // eslint-disable-line
  return function (a, b) {
    const x = a[prop].toLowerCase();
    const y = b[prop].toLowerCase();
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
};
console.log(cars.sort(compareProp('color')));
