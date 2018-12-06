/*
 * @title: Array.filter
 * @description: Examples of Array.filter function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * array.filter(function(currentValue, index, arr), thisValue)
 * Input Value: Required. A function to be run for each element
 * in the array.
 * Return Value: An Array containing all the array elements that
 * pass the test. If no elements pass the test it returns an empty array.
 */

const pets = [
  { name: 'cat', size: 'medium' },
  { name: 'dog', size: 'medium' },
  { name: 'bird', size: 'small' },
  { name: 'hamster', size: 'small' },
];

const smallPets = pets.filter(pet => pet.size === 'small');
smallPets.map((pet, index, arr) => console.log(`${pet.name}, ${index}, ${arr}`));

// npx jest functional/array.filter.js
describe('various Array.filter functions', () => {
  it('should return values over 5', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(values.filter(item => item > 5)).toEqual([6, 7, 8, 9, 10]);
  });
  it('should return values between 4 and 8', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(values.filter(item => item > 4 && item < 8)).toEqual([5, 6, 7]);
  });
  it('should return array of obj properties that match', () => {
    const animals = [
      { name: 'cat', size: 'medium' },
      { name: 'dog', size: 'medium' },
      { name: 'bird', size: 'small' },
      { name: 'hamster', size: 'small' },
    ];
    expect(animals.filter(animal => animal.size === 'small')).toEqual([
      { name: 'bird', size: 'small' },
      { name: 'hamster', size: 'small' },
    ]);
  });
  it('should return array of obj properties that match', () => {
    const animals = [
      { name: 'cat', size: 'medium' },
      { name: 'dog', size: 'medium' },
      { name: 'bird', size: 'small' },
      { name: 'hamster', size: 'small' },
    ];
    expect(animals.filter(animal => animal.name === 'bird')).toEqual([
      { name: 'bird', size: 'small' },
    ]);
  });
});
