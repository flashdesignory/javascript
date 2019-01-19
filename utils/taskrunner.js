/*
 * @title: Taskrunner
 * @description: generic task runner
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class TaskRunner {
  constructor(limit) {
    this.limit = limit;
    this.counter = 0;
    this.queue = [];
    this.done = this.done.bind(this);
  }

  setMax(limit) {
    this.limit = limit;
    while (this.counter < limit && this.queue.length > 0) {
      this.counter++;
      this.queue.shift()(this.done);
    }
  }

  done() {
    if (this.queue.length > 0) {
      this.queue.shift()(this.done);
    } else {
      this.counter--;
    }
  }

  push(callback) {
    if (this.counter >= this.limit) {
      this.queue.push(callback);
    } else {
      this.counter++;
      callback((() => this.done()));
    }
  }
}

const task = function (name, duration = 1000) { //eslint-disable-line
  if (arguments.length > 1) {
    return cb => setTimeout(() => {
      console.log(`End Task ${name}`);
      // console.log(arguments);
      cb();
    }, duration);
  }
  setTimeout(() => {
    console.log('End Task ');
    const type = Object.prototype.toString.call(arguments[0]).slice(8, -1); //eslint-disable-line
    if (type === 'Function') {
      arguments[0](); //eslint-disable-line
    }
  }, duration);
};

const runner = new TaskRunner(3);
runner.push(task('1', 2000, 'foo'));
runner.push(task('2', 1000, 'bar'));
runner.push(task('3', 3500, 'baz'));
runner.push(task('4', 1500, 'foo'));
runner.push(task('5', 1000));
runner.setMax(4);
// runner.push(task('6', 1000));
runner.push(task);// 6
runner.push(task('7', 3000));
runner.push(task('8', 1500));
