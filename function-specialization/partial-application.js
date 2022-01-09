'use strict';

function partial(fn, ...static_inputs) {
  return function(...inputs) {
    return fn(...static_inputs, ...inputs);
  };
}

function ajax(url, data, callbackfn) {
  console.log(`ajax done: ${url}, ${JSON.stringify(data)}`);
  return callbackfn(data);
}

function onComplete(data) {
  return console.log('returned from ajax call. received data:', data);
}
ajax('https://api.foo.com/v1/bar', { id: '00' }, onComplete);

const CUSTOMER_API = 'https://api.foo.com/v1/customers';
const me = { id: '42' };
function renderCustomer(data) {
  return console.log('rendering customer with id:', data.id);
}

const getCustomer = partial(ajax, CUSTOMER_API);
getCustomer(me, renderCustomer);

const getCurrentUserLessSpecific = partial(ajax, CUSTOMER_API, me);
getCurrentUserLessSpecific(renderCustomer);

const getCurrentUser = partial(getCustomer, me);
getCurrentUser(renderCustomer);

