/*
 * @title: Math Utils
 * @description: collection of math utilities
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function roundTo(num, decimals) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals); //eslint-disable-line
}

roundTo(4.3940397802, 2); // 4.39
