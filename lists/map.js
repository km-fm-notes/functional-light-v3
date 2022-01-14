// Larger concept is extending operations we can do over one value to work across a collection of values

// functor
// a value (i.e. a collection of values) over which the values in it can be mapped
// any data structure for which we've identified and defined a map operation

// an array is an example of a functor
// we can call .map() over the values of an array

// map is a transformation
// take the values in a collection and perform an operation on each of them

// single value in a single array can be mapped over. doesn't need to be multiple values

// map transformations can not happen in-place
// you're not allowed to mutate the values
// map transformations produce an entirely new functor

// map results in the same kind of data structure it started with 

const { map } = require('../funcs');
const { v4: uuidv4 } = require('uuid');

const names = ['kyle', 'susan'];
function makeRecord(name) {
  return { id: uuidv4(), name };
}
const records = map(makeRecord, names)
console.log({ records });
[
  { id: '67b66c0a-31c7-4da0-a63c-57c65968d566', name: 'kyle' },
  { id: 'a1265d2e-9330-420d-8dc2-2874ac9aadb9', name: 'susan' }
]
const records_nativejs = names.map(makeRecord);
console.log({ records_nativejs });
[
  { id: '2ddbd0e4-63ef-464a-838b-bbaaa4db03a1', name: 'kyle' },
  { id: 'df746fd9-26b9-4c8b-a2ae-e5b32cee4358', name: 'susan' }
]
