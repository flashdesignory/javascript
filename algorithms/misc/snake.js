/*
 * @title: Snake Game
 * @description: Snake Game
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class SnakeGame {
  constructor(width, height, food) {
    this.width = width;
    this.height = height;
    this.food = food;

    this.head = [0, 0];
    this.snake = new Map();
    this.snake.set(SnakeGame.toKey(this.head));
  }

  move(direction) {
    const position = this.getPosition(direction);

    if (!this.isValid(position)) return -1;

    if (this.hasFood(position)) {
      this.eat(position);
    } else {
      this.advance(position);
    }

    return this.snake.size - 1;
  }

  getPosition(direction) {
    const [row, col] = this.head;

    switch (direction) {
      case 'U': return [row - 1, col];
      case 'D': return [row + 1, col];
      case 'L': return [row, col - 1];
      case 'R': return [row, col + 1];
      default: return [row, col];
    }
  }

  isValid(position) {
    const [row, col] = position;

    if (row < 0 || row >= this.height) {
      return false;
    }
    if (col < 0 || col >= this.width) {
      return false;
    }

    const key = SnakeGame.toKey(position);

    if (this.snake.has(key)) {
      const last = this.snake.keys().next().value;

      return key === last;
    }

    return true;
  }

  eat(position) {
    this.food.shift();
    this.head = position;
    this.snake.set(SnakeGame.toKey(this.head));
  }

  advance(position) {
    const last = this.snake.keys().next().value;

    this.snake.delete(last);
    this.head = position;
    this.snake.set(SnakeGame.toKey(this.head));
  }

  static toKey(position) {
    return `${position[0]},${position[1]}`;
  }

  hasFood(position) {
    const [row, col] = this.food[0] || [];

    if (row !== position[0]) {
      return false;
    }
    if (col !== position[1]) {
      return false;
    }

    return true;
  }
}

// npx jest algorithms/misc/snake.js
test('snake game', () => {
  const obj = new SnakeGame(3, 2, [[1, 2], [0, 1]]);
  obj.move('R');
  obj.move('D');
  obj.move('R');
  obj.move('U');
  expect(obj.move('L')).toEqual(2);
});
