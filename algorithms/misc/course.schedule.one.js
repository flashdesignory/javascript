/*
 * @title: Course Schedule
 * @description:
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you
 * must take course bi first if you want to take course ai.
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return true if you can finish all courses. Otherwise, return false.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const canFinish = function (numCourses, prerequisites) {
  const degrees = (new Array(numCourses)).fill(0);
  const queue = [];
  prerequisites.forEach((prerequisite) => {
    degrees[prerequisite[0]]++;
  });

  degrees.forEach((degree, i) => {
    if (degree === 0) queue.push(i);
  });

  while (queue.length !== 0) {
    const finished = queue.shift();
    numCourses--;
    prerequisites.forEach((prerequisite) => {
      if (prerequisite[1] === finished) {
        degrees[prerequisite[0]]--;
        if (degrees[prerequisite[0]] === 0) {
          queue.push(prerequisite[0]);
        }
      }
    });
  }

  return numCourses === 0;
};

// npx jest algorithms/misc/course.schedule.one.js
test('example-one', () => {
  expect(canFinish(2, [[1, 0]])).toBeTruthy();
});

test('example-two', () => {
  expect(canFinish(2, [[1, 0], [0, 1]])).toBeFalsy();
});
