'use strict';

/**
 * @param {string} str 
 */
function isPalindrome(str) {
  if (str.length < 2) {
    return true;
  }
  const f = str[0];
  const last_index = str.length - 1;
  const l = str[last_index];
  return (f === l) && isPalindrome(str.slice(1, last_index));
}

console.log( isPalindrome("") === true );
console.log( isPalindrome("a") === true );
console.log( isPalindrome("aa") === true );
console.log( isPalindrome("aba") === true );
console.log( isPalindrome("abba") === true );
console.log( isPalindrome("abccba") === true );

console.log( isPalindrome("ab") === false );
console.log( isPalindrome("abc") === false );
console.log( isPalindrome("abca") === false );
console.log( isPalindrome("abcdba") === false );
