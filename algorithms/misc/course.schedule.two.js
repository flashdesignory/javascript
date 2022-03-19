/*
 * @title: Course Schedule find order
 * @description:
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you
 * must take course bi first if you want to take course ai.
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return the ordering of courses you should take to finish all courses. If there are many valid
 * answers, return any of them. If it is impossible to finish all courses, return an empty array.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const findOrder = (numCourses, prerequisites) => {
  const degrees = (new Array(numCourses)).fill(0);
  const queue = [];
  prerequisites.forEach((prerequisite) => {
    degrees[prerequisite[0]]++;
  });

  degrees.forEach((degree, i) => {
    if (degree === 0) queue.push(i);
  });

  const result = [];

  while (queue.length !== 0) {
    const finished = queue.shift();
    numCourses--;
    result.push(finished);
    prerequisites.forEach((prerequisite) => {
      if (prerequisite[1] === finished) {
        degrees[prerequisite[0]]--;
        if (degrees[prerequisite[0]] === 0) {
          queue.push(prerequisite[0]);
        }
      }
    });
  }

  console.log('result', result);

  return numCourses === 0 ? result : [];
};

// npx jest algorithms/misc/course.schedule.two.js
test('example-one', () => {
  expect(findOrder(2, [[1, 0]])).toEqual([0, 1]);
});

test('example-two', () => {
  expect(findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])).toEqual([0, 1, 2, 3]);
});
