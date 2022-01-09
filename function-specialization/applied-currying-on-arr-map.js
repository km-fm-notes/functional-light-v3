'use strict';

function curry(fn, levels = fn.length, received_args = []) {
  return function(...inputs) {
    if (inputs.length + received_args.length >= levels) {
      return fn(...received_args, ...inputs);
    }
    return curry(fn, levels, received_args.concat(...inputs));
  }
}
function add(x, y) {
  return x + y;
}
add = curry(add);
const a = [1,2,3,4];
const a_v1 = a.map(
  function addOne(v) {
    return add(1, v)
  }
);
const a_v2 = a.map(add(1));
console.log({ a_v1, a_v2 });
