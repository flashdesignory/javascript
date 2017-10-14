/*
 * @title: Tower of Hanoi
 * @description: Calcualte Tower of Hanoi
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function towerOfHanoi(height, from, to, buffer){
  if(height >= 1){
    towerOfHanoi(height-1, from, buffer, to);
    console.log("move disk from tower: " + from + ", to tower: " + to);
    towerOfHanoi(height-1, buffer, to, from);
  }
  return;
}

towerOfHanoi(3, "A", "C", "B");