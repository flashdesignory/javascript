/*
 * @title: String verify brackets
 * @description: simple function to verify closing brackets
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function bracketsAreBalanced(str){
  var options = "[]{}()";
  var stack = [];
  var i;
  var character;
  var position;

  for(i = 0; i<str.length; i++){
    character = str[i];
    position = options.indexOf(character);

    if(position === -1){
      continue;
    }

    if(position % 2 === 0){
      stack.push(position+1);
    }else{
      if(stack.pop() !== position){
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log('{}([]) true', bracketsAreBalanced('{}([])'));
//console.log('{{ false', bracketsAreBalanced('{{'));
//console.log('[(]) false', bracketsAreBalanced('[(])'));
//console.log("{}([]) true", bracketsAreBalanced("{}([])"));
//console.log("([}]) false", bracketsAreBalanced("([}])"));
//console.log("([]) true", bracketsAreBalanced("([])"));
//console.log("()[]{}[][]", bracketsAreBalanced("()[]{}[][]"));
