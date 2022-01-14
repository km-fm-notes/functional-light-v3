// Simple composition ("fusion") works well if we're doing only map operations on the list
// If we are doing combinations of map, filter and reduce, we need transduction

const { compose2, compose3, filterReducer, mapReducer, transduce, } = require('../funcs');

const list = [2,3,4,5,2,3,21];

function add1(v) { return v + 1; }
function mul2(v) { return v * 2; }
function isOdd(v) { return v % 2 === 1; }
function greaterThan2(v) { return v > 2; }
function tally(total, v) { return total + v; }

const list_flow = list // [2,3,4,5,2,3,21]
  .map(add1) // [3,4,5,6,3,4,22]
  .filter(isOdd) // [3,5,3]
  .reduce(tally); // 11
console.log({ list_flow });
[{ list_flow: 11 }]

// Manual transduction works but it sucks (because it's imperative)
const list_flow_manual = list
.reduce(function (total, v) {
  v = add1(v);
  if (isOdd(v)) {
    total = tally(total, v);
  }
  return total;
}, 0);
console.log({ list_flow_manual });
[{ list_flow_manual: 11 }]

// Transduction via FP library utilities is better

// If you have a mapper function, pass it to mapReducer
// This function reshapes my mapper fn into a special kind of reducer function that is composable
// Note that `tally` is not included in the transducerfn composition.
// transducerfn is not ready yet to be a reducer function (in a "prototype" stage)
// It needs a reducer to be passed to it to become a reducer


// 94
// [6,8,10,12,6,8,44]
// [5,7,9,11,5,7,43]
// [4,6,8,10,4,6,42]
// [2,3,4,5,2,3,21]
const transducerMap = compose3(
  mapReducer(add1),
  mapReducer(add1),
  mapReducer(mul2),
);

const list_flow_transducer_map = transduce(
  transducerMap,
  tally,
  0,
  list,
);
console.log(list_flow_transducer_map === 94);
console.log({ list_flow_transducer_map });
[{ list_flow_transducer_map: 94 }]


// If you have a filter function, pass it to filterReducer

// 32
// [3,5,3,21]
// [3,4,5,3,21]
// [2,3,4,5,2,3,21]
const transducerFilter = compose2(
  filterReducer(isOdd),
  filterReducer(greaterThan2),
);
const list_flow_transducer_filter = transduce(
  transducerFilter,
  tally,
  0,
  list,
);
console.log(list_flow_transducer_filter === 32);
console.log({ list_flow_transducer_filter });
[{ list_flow_transducer_filter: 32 }]

// Also works when you have both

// 0
// []
// [6,8,10,6,42]
// [3,4,5,3,21]
// [2,3,4,5,2,3,21]
const transducer = compose3(
  filterReducer(isOdd),
  mapReducer(mul2),
  filterReducer(greaterThan2),
);
const list_flow_transducer_combined = transduce(
  transducer,
  tally,
  0,
  list,
);
console.log(list_flow_transducer_combined === 0);
console.log({ list_flow_transducer_combined });
[{ list_flow_transducer_combined: 0 }]

// 64
// [6,10,6,42]
// [3,5,3,21]
// [3,4,5,3,21]
// [2,3,4,5,2,3,21]
const transducer_v2 = compose3(
  mapReducer(mul2),
  filterReducer(isOdd),
  filterReducer(greaterThan2),
);
const list_flow_transducer_combined_v2 = transduce(
  transducer_v2,
  tally,
  0,
  list,
);
console.log(list_flow_transducer_combined_v2 === 64);
console.log({ list_flow_transducer_combined_v2 });
[{ list_flow_transducer_combined_v2: 64 }]

// FP libraries also provide a shorthand form of transduce() which checks the initial_value param
// if number, it assumes sum
// if string, it assumes concatenation
// if array, it assumes push
// usage: into(transducer, 0, [1,2,3])
