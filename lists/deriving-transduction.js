// Walkthrough of of transduction derivation
const { compose, curry, } = require('../funcs');

function add1(v) { return v + 1; }
function isOdd(v) { return v % 2 === 1; }
function tally(total, v) { return total + v; }

const list = [2,3,4,5,2,3,21];

// Approach #1
// Pass mapper, predicate and reduce functions step by step
const list_flow = list
  .map(add1)
  .filter(isOdd)
  .reduce(tally);
console.log({ list_flow });
[{ list_flow: 11 }]

// Approach #2
// Take the mapper and predicate functions and do them with reduction
// The approach in this example code uses impurities but this is OK
// The whole point is performance optimization
// These side effect don't mess up the math
function mapWithReduce(arr, mapperfn) {
  return arr.reduce(function (list, v) {
    list.push(mapperfn(v));
    return list;
  }, []);
}
function filterWithReduce(arr, predicatefn) {
  return arr.reduce(function (list, v) {
    if (predicatefn(v)) {
      list.push(v);
    }
    return list;
  }, []);
}
// Notice each of the above starts with an empty list as the reduce initial value
// General strategy for map or filter with a reducer is to make a new list and stick stuff into it

let list_binary = list;
list_binary = mapWithReduce(list_binary,  add1);
list_binary = filterWithReduce(list_binary, isOdd);
list_binary = list_binary.reduce(tally);
console.log({ list_binary });
[{ list_binary: 11 }]

// Approach #3
// Approach #2 makes all of our operations (map, filter, reduce) binary reduce operations
// Build on this by extracting the reducer out of the map/filter utilities
// This makes these 3 operations easier to compose together

// Basic logic/thought process:
// Instead of doing the reducing, what if we had these utilities
// close over the functions we pass in and return us a reducer that we could use later
function mapReducer(mapperfn) {
  return function _mapReducer(list, v) {
    list.push(mapperfn(v));
    return list;
  };
}
function filterReducer(predicatefn) {
  return function _filterReducer(list, v) {
    if (predicatefn(v)) {
      list.push(v);
    }
    return list;
  }
}
const list_reduce_inline = list
  .reduce(mapReducer(add1), [])
  .reduce(filterReducer(isOdd), [])
  .reduce(tally);
console.log({ list_reduce_inline });
[{ list_reduce_inline: 11 }]


// Approach #4
// Take advantage of the fact that in both _mapReducer and _filterReducer the process includes
  // taking a value and an array,
  // reducing them into a new array,
  // and returning the array
// Extract the combination logic out and have that become a param

// Shape of this is a reducer
function listCombination(list, v) {
  list.push(v);
  return list;
}
// Unary --> return value is a reducer
function mapReducerV4(mapperfn) {
  return function _mapReducerV4(list, v) {
    return listCombination(list, mapperfn(v));
  };
}
// Unary --> return value is a reducer
function filterReducerV4(predicatefn) {
  return function _filterReducerV4(list, v) {
    if (predicatefn(v)) {
      return listCombination(list, v);
    }
    return list;
  }
}
// In both cases, we let listCombination handle the details of combining value with an array
const list_reduce_factor = list
  .reduce(mapReducerV4(add1), [])
  .reduce(filterReducerV4(isOdd), [])
  .reduce(tally);
console.log({ list_reduce_factor });
[{ list_reduce_factor: 11 }]


// Approach #5
// Build on #4 but "parameterize" the combiner function
const mapReducerV5 = curry(function (mapperfn, combinefn) {
  return function _mapReducerV5(list, v) {
    return combinefn(list, mapperfn(v));
  };
});
const filterReducerV5 = curry(function (predicatefn, combinefn) {
  return function _filterReducerV5(list, v) {
    if (predicatefn(v)) {
      return combinefn(list, v);
    }
    return list;
  }
});
const list_reduce_paramaterize = list
  .reduce(mapReducerV5(add1)(listCombination), [])
  .reduce(filterReducerV5(isOdd)(listCombination), [])
  .reduce(tally);
console.log({ list_reduce_paramaterize });
[{ list_reduce_paramaterize: 11 }]
// mapReducerV5(add1) above is an intermediary function
// It is "waiting" for a combiner function i.e. waiting for a reducer
// Basically, it's a higher-order reducer
// Given a reducer, it returns a reducer

// Remember that the whole point of curry is for specialization
// mapReducerV5 is a function which takes 2 args
// mapReducerV5(add1) is a more specialized function which takes 1 arg but we're already closed over add1


// Approach #6
// Build on #5 but isolate the "intermediary" "higher-order" reducers and compose them
// As soon as you pass listCombination to transducerV6 you kick off a chain reaction

// The first higher-order reducer which is filterReducerV5(isOdd) now has the final input
// that it needs to return a reducer.

// That returned reducer gets passed as the input to the next higher-order reducer in
// the composition which is mapReducerV5(add1).

// Once that process reaches the final higher-order reducer in the composition,
// the end result is a single big fat reducer

// By allowing reducers to flow through the composition, transducerV6 can do the mapping
// and the filtering in the same reducer operation

const transducerV6 = compose(mapReducerV5(add1), filterReducerV5(isOdd));
const list_reduce_isolate = list
  .reduce(transducerV6(listCombination), [])
  .reduce(tally);
console.log({ list_reduce_isolate });
[{ list_reduce_isolate: 11 }]


// Approach #7
// Final step is to get rid of the unnecessary listCombination reducer
// Simply pass in tally as the "kickoff" reducer operation, tally
const list_reduce_single = list
  .reduce(transducerV6(tally), 0);
// Notice, the initial value is now 0 instead of empty list because we're
// returning larger and larger sums instead of larger and larger lists
console.log({ list_reduce_single });
[{ list_reduce_single: 11 }]


// If you just want to do a bunch of maps and filters and return the new list use:
// arr.reduce(transducer(listCombination), [])
