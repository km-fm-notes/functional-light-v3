// Unlike map and filter which translate values,
// reduce combines values in a list

// To use reduce properly, provide an initial value appropriate
// to the array data type and the return value

// addition/substracton: initial value 0
// multiplication/division: initial value 1
// string operation: ''
// chaining promises: already resolved promise
// list of functions which will keep calling: identity function

// Any binary function can be thought of as a reducer

const { compose2, compose3, identity, reduce } = require('../funcs');
const users = [
  { friend_count: 8, id: '2ddbd0e4', name: 'kyle', session: '8dc2-2874ac9aadb9' },
  { friend_count: 20, id: 'df746fd9', name: 'susan' },
  { friend_count: 15, id: 'df746fd9', name: 'brian', session: '57c65968d566' }
];

function tallyFriendCount(acc, elem) {
  return acc + elem.friend_count;
}
const total_friends = reduce(tallyFriendCount, 0, users);
const avg_friends = total_friends / users.length;
console.log({ total_friends, avg_friends });
[{
  total_friends: 43,
  avg_friends: 14.333333333333334
}]

const total_friends_nativejs = users.reduce(tallyFriendCount, 0);
const avg_friends_nativejs = total_friends_nativejs / users.length;
console.log({ total_friends_nativejs, avg_friends_nativejs });
[{
  total_friends_nativejs: 43,
  avg_friends_nativejs: 14.333333333333334
}]

// Quick mental heuristic for compose:
// the function on the far right computes v first.
// outputs get passed leftward

function add1(v) { return v + 1; }
function mul2(v) { return v * 2; }
function div3(v) { return v / 3; }

const complexOp = compose3(div3, mul2, add1);
const test_compose = complexOp(5); // ((5 + 1) * 2) / 3 = 4
console.log(test_compose === 4); // true

const complexOpReduce = reduce(compose2, identity, [div3, mul2, add1]);
const test_reduce = complexOpReduce(5); // ((5 + 1) * 2) / 3 = 4
console.log(test_reduce === 4); // true

const complexOpReduceNativeJS = [div3, mul2, add1].reduce(compose2, identity);
const test_reduce_nativejs = complexOpReduceNativeJS(5); // ((5 + 1) * 2) / 3 = 4
console.log(test_reduce_nativejs === 4); // true

