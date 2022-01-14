// Having chains of map > reduce > filter > 2 maps etc is good from 
// declarative programming standpoint 
// not good for performance because maps and filters create a new data structure
// in some cases, reduce also creates a new data structure

const { compose } = require('../funcs');

function add1(v) { return v + 1; }
function mul2(v) { return v * 2; }
function div3(v) { return v / 3; }

const list = [2,3,4,5,2,3,21];

// Syntax #1
const mapped = list
  .map(add1)
  .map(mul2)
  .map(div3);
console.log({ mapped });
[
  2, 2.66, 3.33, 4, 2, 2.66, 14.66
]

// Each of our functions is a unary function (as evidenced by the fact that they're valid mapper functions)
// Therefore, these functions can be composed together
// The composition can be passed to the map function instead which saves memory and garbage collection overhead

const compfn = v => compose(div3, mul2, add1)(v);
const mapped_composed = list.map(compfn);
console.log({ mapped_composed });
[
  2, 2.66, 3.33, 4, 2, 2.66, 14.66
]