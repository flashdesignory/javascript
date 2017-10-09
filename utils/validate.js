/*
 * @title: Validation Utils
 * @description: collection of validation utilities
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 function isPrimitive(value){
 	return (value !== Object(value));
 }

 //examples
 console.log(isPrimitive(100));
 console.log(isPrimitive(new Number(100)));
 console.log(isPrimitive(true));
 console.log(isPrimitive("100"));
 