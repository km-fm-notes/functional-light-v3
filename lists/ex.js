'use strict';

const { curry } = require('../funcs');

// 1. Write two functions, each which return a fixed number (different from each other) when called.

function ret5() { return 5; }
function ret10() { return 10; }

// 2. Write an `add(..)` function that takes two numbers and adds them and returns the result. Call `add(..)` with the results of your two functions from (1) and print the result to the console.

function add(x, y) { return x + y; }
console.log(add(ret5(), ret10()) === 15);

// 3. Write an `add2(..)` that takes two functions instead of two numbers, and it calls those two functions and then sends those values to `add(..)`, just like you did in (2) above.

function add2(fn2, fn1) {
  return add(fn1(), fn2());
}
console.log(add2(ret5, ret10) === 15);

// 4. Replace your two functions from (1) with a single function that takes a value and returns a function back, where the returned function will return the value when it's called.

// a value wrapped up in a function closure
function constant(v) {
  return function () {
    return v;
  }
}
console.log(add(constant(5)(), constant(10)()) === 15);
console.log(add2(constant(5), constant(10)) === 15);

// 5. Write an `addn(..)` that can take an array of 2 or more functions, and using only `add2(..)`, adds them together. Try it with a loop. Try it without a loop (recursion). Try it with built-in array functional helpers (hint: reduce).

function addnLoop(...input_fns) {
  const input_fns_copy = input_fns.slice(); // Kyle says slice is overkill because ... gathers and copies anyway
  let total = 0;
  while (input_fns_copy.length) {
    const first = input_fns_copy.shift();
    const second = input_fns_copy.shift() || (() => 0);
    total += add2(first, second);
  }
  return total;
}
const addnRec = curry(function addn(tally, ...input_fns) {
  if (input_fns.length === 0) {
    return tally;
  }
  if (input_fns.length === 1) {
    return tally + add2(input_fns[0], (() => 0))
  }
  return addn(
    tally + add2(input_fns[0], input_fns[1]),
    ...input_fns.slice(2)
  );
}, 2)(0);
function addn(...input_fns) {
  return input_fns.reduce(addnReducer)();
  function addnReducer(composedOnionfn, currfn) {
    return function () {
      return add2(composedOnionfn, currfn);
    };
  }
}
// Note on JS engine reduce: ^^
// if no initial value is passed
// uses the first value as default and starts reduce on second value
console.log(addn(constant(5), constant(10), constant(5), constant(10), constant(5), constant(10), constant(20), constant(-5), constant(9)) === 69);


// 6. Start with an array of odd and even numbers (with some duplicates), and trim it down to only have unique values.
function trimArr(arr) {
  return arr.reduce(unique, []);
  function unique(arr, elem) {
    if (arr.includes(elem)) {
      return arr;
    }
    return arr.concat(elem);
  }
}
console.log(trimArr([1,2,3,4,1,2])); // [ 1, 2, 3, 4 ]

// 7. Filter your array to only have even numbers in it.
console.log(trimArr([1,2,3,4,1,2]).filter(v => v % 2 === 0)); // [ 2, 4 ]

// 8. Map your values to functions, using (4), and pass the new list of functions to the `addn(..)` from (5).
const r = trimArr([1,2,3,4,1,2])
  .filter(v => v % 2 === 0)
  .map(constant);
console.log(addn(...r) === 6);


// Write tests for your functions.