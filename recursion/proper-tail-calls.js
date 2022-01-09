'use strict';

const { curry, identity, trampoline } = require('../funcs');

// Count vowels example
function isVowel(char) {
  return ['a','e','i','o','u'].includes(char)
}

// Count vowels iterative
function countVowelsIterative(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (isVowel(str[i])) {
      count++;
    }
  }
  return count;
}
console.log(countVowelsIterative('abcdefg') === 2);

// Count vowels recursive V1
// Most clear syntactically but does not take advantage of tail call optimization.
// The `first` local var has to be saved so each recursive call adds to the stack frame
function countVowelsRecursiveV1(str) {
  if (str.length === 0) {
    return 0;
  }
  const first = isVowel(str[0]) ? 1 : 0;
  return first + countVowelsRecursiveV1(str.slice(1));
}
console.log(countVowelsRecursiveV1('abcdefg') === 2);

// Count vowels recursive V2
// Slight optimization to prevent the extra last function call
function countVowelsRecursiveV2(str) {
  const first = isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) {
    return first;
  }
  return first + countVowelsRecursiveV2(str.slice(1));
}
console.log(countVowelsRecursiveV2('abcdefg') === 2);

// Conversion to proper tail call: good but we can't rely on this. Some engines may still throw range errors.

// Count vowels recursive V3 – PTC
// store the `first` variable in the param
function countVowelsRecursiveV3(count, str) {
  const first = isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) {
    return count + first;
  }
  return countVowelsRecursiveV3(count + first, str.slice(1));
}
console.log(countVowelsRecursiveV3(0, 'abcdefg') === 2);

// Count vowels recursive V4 – PTC
// store the `first` variable in the param
// but use curry to remove the awkward param requirement from callers
let countVowelsRecursiveV4 = curry(function countVowelsRecursiveV4(count, str) {
  const first = isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) {
    return count + first;
  }
  return countVowelsRecursiveV4(count + first, str.slice(1));
})(0);
console.log(countVowelsRecursiveV4('abcdefg') === 2);

// Count vowels recursive V5 – PTC
// Continuation passing style
// None of the "work" gets done until the base case. You're passing along a func as the param
// Use a continue function initialized to the identity function and pass in accumulated values
// Grows memory on the heap instead of the stack
function countVowelsRecursiveV5(str, contfn = identity) {
  const first = isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) {
    return contfn(first);
  }
  return countVowelsRecursiveV5(str.slice(1), function (v) {
    return contfn(first + v);
  });
};
console.log(countVowelsRecursiveV5('abcdefg') === 2);

// Count vowels recursive V6 – PTC – Best one use this
// trampoline() + curry()
// Use a trampoline utility which under the hood converts recursion to an inf. while-true loop
// No memory growth on the stack or heap
let countVowelsRecursiveV6 = curry(
  trampoline(function countVowelsRecursiveV6(count, str) {
    const first = isVowel(str[0]) ? 1 : 0;
    if (str.length <= 1) {
      return count + first;
    }
    return function () {
      return countVowelsRecursiveV6(count + first, str.slice(1));
    };
  }), 2
)(0);
console.log(countVowelsRecursiveV6('abcdefg') === 2);

// Note on proper tail calls
// Proper tail call is of format: return followed by an (single?) invocation of the function call
// no return x + f()
// no return [f(left half), p, f(right half)] calls like in quicksort
function sub(x, y) {
  return x - y;
}
function decrement(x) {
  return sub(x, 1); // PTC
}
decrement(3);
function diminish(x) {
  if (x > 90) {
    return diminish(Math.trunc(x / 2)); // PTC
  }
  return x - 3;
}
diminish(340);