const { compose } = require('../funcs/index.js');

function minus2(x) { return x - 2; }
function increment(x) { return x + 1; }
function triple(x) { return x * 3; }


// Composition is associative.
// The grouping order does not matter as long as the argument list order remains the same

const f = compose(compose(minus2, triple), increment);
const g = compose(minus2, compose(triple, increment));

console.log(f(4) === g(4)); // true

// This means we can do currying and partial application on our compositions
// You don't have to know all the functions that are going to participate in a composition all up front

// You could do some magic:

// Step #1: curry the compose utility
// Step #2: provide two or three of the functions which will be composed up front
// Step #3: take that result and compose it with something else later (creating a more specialized version of that function)
// Step #4: repeat process until my function is specialized enough and I'm ready to use the result