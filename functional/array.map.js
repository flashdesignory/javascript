/*
 * @title: Array.map
 * @description: Examples of Array.map function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * array.map(function(currentValue, index, arr), thisValue)
 * Input Value: Required. A function to be run for each element
 * in the array.
 * Return Value: An Array containing the results of calling
 * the provided function for each element in the original array.
 */

const pets = [{ name: 'cat' }, { name: 'dog' }, { name: 'bird' }];
pets.map((pet, index, arr) => console.log(`${pet.name}, ${index}, ${arr}`));

// npx jest functional/array.map.js
describe('various Array.map functions', () => {
  it('should multiply each item by 2', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(values.map(item => item * 2)).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });
  it('should multiply each item by 4', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const multiplyByFour = n => n * 4;
    expect(values.map(multiplyByFour)).toEqual([4, 8, 12, 16, 20, 24, 28, 32, 36, 40]);
  });
  it('should return array of obj properties', () => {
    const animals = [{ name: 'cat' }, { name: 'dog' }, { name: 'bird' }];
    expect(animals.map(animal => animal.name)).toEqual(['cat', 'dog', 'bird']);
  });
  it('should return the square root of each element', () => {
    expect([4, 9, 16, 25].map(Math.sqrt)).toEqual([2, 3, 4, 5]);
  });
  it('should return string values to number values', () => {
    expect(['1', '2', '3', '4', '5'].map(Number)).toEqual([1, 2, 3, 4, 5]);
  });
});
