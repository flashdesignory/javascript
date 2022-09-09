/*
 * @title: Components
 * @description: Generic Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Person {
  constructor({
    type,
  }) {
    this._type = type;
  };

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  greet() {
    return `Hello, my name is ${this._name}`;
  }
}

class Student extends Person {
  constructor({
    type,
    school
  }) {
    super({ type });
    this._school = school;
  }

  says(msg) {
    return `${this._name} says: "${msg}"`;
  }

  greet() {
    return `Hello, my name is ${this._name}, I am going to ${this._school}`;
  }
}

// npx jest patterns/class.js
describe('patterns/class', () => {
  it('should extend peson', () => {
    const a = new Person({ type: 'person' });
    a.name = 'Fred';
    expect(a.greet()).toEqual('Hello, my name is Fred');
  
    const b = new Student({ type: 'person', school: 'FancyPants' });
    b.name = 'Steve';
    expect(b.greet()).toEqual('Hello, my name is Steve, I am going to FancyPants');
    expect(b.says('yo')).toEqual('Steve says: "yo"');
  });
});

