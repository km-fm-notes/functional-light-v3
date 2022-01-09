'use strict';

const { compose, pipe, compose3 } = require('../funcs/index.js');

function minus2(x) { return x - 2; }
function triple(x) { return x * 3; }
function double(x) { return x * 2; }
function increment(x) { return x + 1; }

// Method #1
const base_price = 10;
let temp = increment(4);
temp = triple(temp);
const total_price = base_price + minus2(temp);
console.log({ total_price });

// Method #2
const total_price_v2 = base_price + minus2(triple(increment(4)));
console.log({ total_price_v2 });

// Method #3: Abstration – Separate coupled concerns from each other leaving only semantic relationships
function shippingRateV3(x) {
  return minus2(triple(increment(x))); // Concern #1: How to calculate a shipping rate: increment then triple then minus two
}
const total_price_v3 =
  base_price
  + shippingRateV3(4); // Concern #2: What to do with a shipping rate: add to base_price
console.log({ total_price_v3 });

// The shippingRate() function is the semantic "boundary" between how to calculate a shipping rate and what to do with a shipping rate

// Method #3 is great but shippingRate() is not customizable

// Method #4: composition
const shippingRateV4 = compose3(minus2, triple, increment);
const total_price_v4 =
  base_price
  + shippingRateV4(4);
console.log({ total_price_v4 });

// Method #4 improved: generic composition
const shippingRateV4Generic = compose(minus2, triple, increment);
const total_price_v4_generic =
  base_price
  + shippingRateV4Generic(4);
console.log({ total_price_v4_generic });

// Method #4 mirror: generic pipe
const shippingRateV4Pipe = pipe(increment, triple, minus2);
const total_price_v4_pipe =
  base_price
  + shippingRateV4Pipe(4);
console.log({ total_price_v4_pipe });

// Note: f and g are not commutative, so we can not guarantee f(x) = g(x) 
const f = compose3(minus2, triple, increment); // f(4) = ((4 + 1) * 3) - 2 = 13
const g = compose3(increment, triple, minus2); // g(4) = ((4 - 2) * 3) + 1 = 7
console.log({ f4: f(4), g4: g(4) });

// Tests
const mul16 = compose(double, double, double, double);
const mul243 = compose(triple, triple, triple, triple, triple);
console.log(mul16(3)); // 48
console.log(mul243(3)); // 729
const mul16Pipe = pipe(double, double, double, double);
const mul243Pipe = pipe(triple, triple, triple, triple, triple);
console.log(mul16Pipe(3)); // 48
console.log(mul243Pipe(3)); // 729


