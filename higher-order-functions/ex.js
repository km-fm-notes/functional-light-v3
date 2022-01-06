// JS is variotic: allows any number of inputs to be passed to functions regardless of signature

// HOFs: input and/or output is a function
// Single order function: Neither input nor output is a function

// unary: ((arg1, arg2, ..., argN) => any) => ((arg) => any)
function unary(fn) {
  return function one(arg) {
    return fn(arg);
  }
}

// binary: ((arg1, arg2, ..., argN) => any) => ((arg1, arg2) => any)
function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  }
}

// flip: ((arg1, arg2, ..., argN) => any) => ((arg1, arg2) => any)
function flip(fn) {
  return function flipped(arg1, arg2, ...args) {
    return fn(arg2, arg1, ...args);
  }
}

// f: (arg1, arg2, ..., argN) => array
function f(...args) {
  return args;
}

var g = unary(f); // g: (arg) => array
var h = binary(f); // h: (arg1, arg2) => array
var fl = binary(f); // fl: (arg2, arg1) => array

console.log(g(1,2,3,4)); // [ 1 ]
console.log(h(1,2,3,4)); // [ 1, 2, ]
console.log(fl(1,2,3,4)); // [ 2, 1, 3, 4 ]

// spreadArgs: ((arg1, arg2, ..., argN) => any) => (...arg1 => any)
function spreadArgs(fn) {
  return function spread(args) {
    return fn(...args);
  }
}

// f: (arg1, arg2, arg3, arg4) => number
function f2(n0, n1, n2, n3) {
  return n0 + n1 + n2 + n3;
}

const s = spreadArgs(f2); // s: (...arg1) => number
console.log(s([1,2,3,4])); // 10

console.log(Math.max(...[1,2,3,4])); // 4
const largestInArr = spreadArgs(Math.max); // s: (...arg1) => number
console.log(largestInArr([1,2,3,4])); // 4

function unspreadArgs(fn) {
  return function unspread(...args) {
    return fn(args);
  }
}

function firstEle(nums) {
  return nums[0];
}

const u = unspreadArgs(firstEle);
console.log(u(1,2,3,4)); // 1

