'use strict';

const { compose, curry } = require('../funcs/index.js');

// Composition works best with unary functions because compose can take advantage of an
// invariant that next_fn accepts one argument and simply pass in the previous value

// triple is unary
function triple(x) { return x * 3; }
// However, sum and divBy are binary
function sum(x, y) { return x + y; }
function divByRev(y, x) { return x / y; }
function divBy(x, y) { return x / y; }

// expression = ((3 + 5) * 3) / 2 = 12
const expression = divBy(triple(sum(3, 5)), 2);
console.log({ expression });

// Therefore this composition doesn't work because sum(x, y) would receive undefined for its y param
compose(divBy, triple, sum); // Bad;


// Alternate approach is currying
sum = curry(sum);
divByRev = curry(divByRev);
divBy = curry(divBy);
// Now, sum and divBy are "curryable" i.e. stepwise unary
// sum(3)(5); // x: 3, y: 5
// divByRev(3)(5); // x: 5, y: 3
// divBy(3)(5); // x: 3, y: 5

const expression_composed_rev = compose(divByRev(2), triple, sum(3))(5);
const expression_composed = divBy(compose(triple, sum(3))(5), 2);
console.log({ expression_composed, expression_composed_rev });


// Point free revisited
function mod(y, x) {
  return x % y;
}
function eq(y, x) {
  return x === y;
}
mod = curry(mod);
eq = curry(eq);
const isOddV2 = compose(eq(1), mod(2));
console.log(isOddV2(3) === true);
console.log(isOddV2(4) === false);

// This is a good example of functional programming paradigm of reversing input args in the uncurried base function
// when the computation order matters. Ex: divByRev and mod
// divByRev and mod feels more natural because the recursive stack populates right to left as the program runs

// After currying, mod(2) translates to:
function mod2(x) {
  return x % 2;
}

// Notice similarity to manually curried implementations
function modCurriedManual(y) {
  return function(x) {
    return x % y;
  }
}
function divByRevCurriedManual(y) {
  return function(x) {
    return x / y;
  }
}

