/*
 * @title: Observer Pattern
 * @description: Simple example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(obj) {
    this.observers.push(obj);
  }

  unsubscribe(obj) {
    this.observers = this.observers.filter(observer => observer !== obj);
  }

  notify(data) {
    this.observers.forEach(observer => observer.notify(data));
  }
}

class Observer {
  constructor(id) {
    this.id = id;
  }

  notify(data) {
    console.log(this.id, 'notify', data);
  }
}

// npx jest patterns/observer.js
describe('patterns/observer', () => {
  it('should notify all subscribers', () => {
    console.log = jest.fn();
    const subj = new Observable();
    const o1 = new Observer('foo');
    const o2 = new Observer('bar');
    const o3 = new Observer('baz');
    subj.subscribe(o1);
    subj.subscribe(o2);
    subj.subscribe(o3);
    subj.notify('hello world');
    expect(console.log).toHaveBeenCalledTimes(3);
  });
});
