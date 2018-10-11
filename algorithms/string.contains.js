/*
 * @title: String contains substring
 * @description: simple function to find a substring
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function contains(str, sub){
  let subLength = sub.length;
  let currentLength = 0;
  let start = 0;
  let i = 0;

  while(i < str.length){
    if(str[i] === sub[currentLength]){
      currentLength++;
      if(currentLength === subLength){
        console.log("found: " + start + ", " + currentLength + ", " + str.substr(start, currentLength));
        return;
      }
    }else{
      if(currentLength > 0) i = start+1;
      currentLength = 0;
      start = i+1;
    }

    i++;
  }
  console.log("not found");
}

contains("geeksforgeeks", "for");
contains("jkflsioijljl", "jkfl");
contains("fooballs", 'arg');
contains('abbcdabbbbbck', 'ab')
contains('abbcdabbbbbck', 'bck')
contains('abbcdabbbbbck', 'bbbck')
contains('abbcdabbbbbck', 'cdabb')
contains('abbcdabbbbbck', 'bbbb')
