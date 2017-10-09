/*
 * @title: Deep Clone 
 * @description: Simple Class for deep cloning objects
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function clone(obj) {
    if(obj == null || typeof obj != "object" || obj == undefined) return obj;
    
    var copy;

    // Date Object
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Array Object
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0; i< obj.length; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    //Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("clone failed...");
}

//example
var obj = {
  name:"john",
  init:function(){console.log("init()");},
  something:{year:2017},
  enabled:false
}
console.log(obj);
var newObj = clone(obj);
console.log(newObj);