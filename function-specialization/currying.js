function ajax(url) {
  return function getData(data) {
    return function getCallback(callbackfn) {
      return callbackfn(data);
    }
  }
}

function renderCustomer(data) {
  return console.log('rendering customer with id:', data.id);
}
ajax('https://api.foo.com/v1/bar')({ id: '00' })(renderCustomer);

const CUSTOMER_API = 'https://api.foo.com/v1/customers';
const me = { id: '42' };


const getCustomer = ajax(CUSTOMER_API);
getCustomer(me)(renderCustomer);

const getCurrentUser = getCustomer(me);
getCurrentUser(renderCustomer);

function curry(fn, levels = fn.length, received_args = []) {
  return function(...inputs) {
    if (inputs.length + received_args.length >= levels) {
      return fn(...received_args, ...inputs);
    }
    return curry(fn, levels, received_args.concat(...inputs));
  }
}
function ajaxFlat(url, data, callbackfn) {
  return callbackfn?.(data) || void 0;
}
const ajaxCurry = curry(ajaxFlat);
ajaxCurry('https://api.curry-foo.com/v1/bar')({ id: '00' })(renderCustomer); // Takes 3 params

const getCustomerCurry = ajaxCurry(CUSTOMER_API);
getCustomerCurry(me)(renderCustomer);

const getCurrentUserCurry = getCustomerCurry(me);
getCurrentUserCurry(renderCustomer);
