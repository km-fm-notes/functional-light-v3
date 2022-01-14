// filter provides an inclusion mechanism

// uses a predicate (returns true/false based on input):
  // if predicate passes, include the array item
  // otherwise ignore

// result set can be no elements, all elements or some elements

// no elements get changed

// also returns same data structure

const { filter } = require('../funcs');

function isLoggedIn(user) {
  return Boolean(user?.session);
}
const users = [
  { id: '2ddbd0e4', name: 'kyle', session: '8dc2-2874ac9aadb9' },
  { id: 'df746fd9', name: 'susan' },
  { id: 'df746fd9', name: 'brian', session: '57c65968d566' }
];
const logged_in_users = filter(isLoggedIn, users);
console.log({ logged_in_users });
[
  { id: '2ddbd0e4', name: 'kyle', session: '8dc2-2874ac9aadb9' },
  { id: 'df746fd9', name: 'brian', session: '57c65968d566' }
]

const logged_in_users_nativejs = users.filter(isLoggedIn);
console.log({ logged_in_users_nativejs });
[
  { id: '2ddbd0e4', name: 'kyle', session: '8dc2-2874ac9aadb9' },
  { id: 'df746fd9', name: 'brian', session: '57c65968d566' }
]
