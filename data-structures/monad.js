// Monad is a wrapper around a value that makes it friendly for functional programming

// These are illustrative monads not proper monads

// 'Just' is a monad.
// this function closes over v and returns three functions
// monad functions should return monads
// `chain` is breaking monadic laws but okay for our purposes

const { curry, identity } = require('../funcs');

function Just(v) {
  return {
    map: _map,
    chain: _chain,
    ap: _ap
  };
  function _map(mapperfn) {
    return Just(mapperfn(v));
  }
  function _chain(chainfn) {
    return chainfn(v); 
  }
  function _ap(anotherMonad) {
    return anotherMonad.map(v);
  }
}


function inc(v) { return v + 1; }

const forty_two = Just(42);
const forty_three = forty_two.map(inc);
const forty_two_val = forty_two.chain(identity);
const forty_three_val = forty_three.chain(identity);
console.log({ forty_two_val, forty_three_val });
[{ forty_two_val: 42, forty_three_val: 43 }]


// This example shows that monads can wrap over non primitive values like functions
const user1 = Just('Kyle');
const user2 = Just('Susan');
const tuple = curry(function (x, y) {
  return [x, y];
});
const users = user1
  .map(tuple) // Just(tuple('Kyle'))
  .ap(user2); // Just(tuple('Kyle')('Susan'))
const users_val = users.chain(identity);
console.log({ users_val });
[{ users_val: ['Kyle', 'Susan'] }]


// One use case for monads is safe access of nested properties
const o = {
  something: {
    else: {
      entirely: 42
    }
  }
};

// Begging for runtime errors
const nested_val_unsafe = o.something.else.entirely;

// Solution: monads
function Nothing() {
  return {
    map: Nothing,
    chain: Nothing,
    ap: Nothing,
  };
}
const Maybe = { Just, Nothing, of: Just };
function fromNullable(v) {
  if (v === null || v === undefined) {
    return Maybe.Nothing();
  }
  return Maybe.of(v);
}
const getNestedProp = curry(function (prop, obj) {
  return fromNullable(obj[prop]);
});
const nested_monad = Maybe.of(o)
  .chain(getNestedProp('something'))
  .chain(getNestedProp('else'))
  .chain(getNestedProp('entirely'))
const nested_val_safe = nested_monad.chain(identity);
console.log({ nested_val_safe, nested_val_unsafe, });
[{ nested_val_safe: 42, nested_val_unsafe: 42, }]




