const { compose, curry } = require('../funcs/index.js');

function triple(x) { return x * 3; }
function sum(x, y) { return x + y; }
function divByRev(y, x) { return x / y; }
function divBy(x, y) { return x / y; }

const expression = divBy(triple(sum(3, 5)), 2);
console.log({ expression });

sum = curry(sum);
divByRev = curry(divByRev);
divBy = curry(divBy);

const expression_composed_rev = compose(divByRev(2), triple, sum(3))(5);
const expression_composed = divBy(compose(triple, sum(3))(5), 2);
console.log({ expression_composed, expression_composed_rev });


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
