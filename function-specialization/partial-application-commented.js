'use strict';

// Shows method #1 of function specialization in functional programming: partial application (less common)

function partial(fn, ...static_inputs) {
  return function(...inputs) {
    return fn(...static_inputs, ...inputs);
  };
}

function ajax(url, data, callbackfn) {
  console.log(`ajax done: ${url}, ${JSON.stringify(data)}`);
  return callbackfn(data);
}

console.log('running ajax');
function onComplete(data) {
  return console.log('returned from ajax call. received data:', data);
}
ajax('https://api.foo.com/v1/bar', { id: '00' }, onComplete);

// Use partial() to create a more specific reference to ajax() specifically designed for the customer API
const CUSTOMER_API = 'https://api.foo.com/v1/customers';
const me = { id: '42' };
function renderCustomer(data) {
  return console.log('rendering customer with id:', data.id);
}

// We can use these constants to create more specialized versions of the ajax function for particular use cases
const getCustomer = partial(ajax, CUSTOMER_API); // "The ajax function with the url argument fixed to CUSTOMER_API"
console.log('running getCustomer');
getCustomer(me, renderCustomer); // Takes 2 params

// Getting even more specialized...

// Method #1 - less preferred
// Works but fails to demonstrates logical link between getCustomer and getCurrentUser
const getCurrentUserLessSpecific = partial(ajax, CUSTOMER_API, me);
console.log('running getCurrentUserLessSpecific');
getCurrentUserLessSpecific(renderCustomer); // Takes 1 param

// Method #2 - preferred
// Demonstrates logical link between getCustomer and getCurrentUser
const getCurrentUser = partial(getCustomer, me); // "The getCustomer function with the data argument fixed to me"
console.log('running getCurrentUser');
getCurrentUser(renderCustomer); // Takes 1 param


// Lesson: order paramaters in order from general to specific in order to facilitate
// function specialization
