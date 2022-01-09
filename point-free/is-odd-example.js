'use strict';

function isOdd(v) {
	return v % 2 === 1;
}

function mod(y) {
  return function(x) {
    return x % y;
  }
}

function eq(y) {
  return function(x) {
    return x === y;
  }
}

const mod2 = mod(2);
const eq1 = eq(1);

function isOddV1(x) {
  return eq1( mod2( x ) ); // Note – result of mod passed to eq
}

// Util
function compose(fn2, fn1) {
  return function(v) {
    return fn2(fn1(v));
  }
}

const isOddV2 = compose(eq1, mod2);
const isOddV3 = compose(eq(1), mod(2));
