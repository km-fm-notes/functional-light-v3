// Shows method #2 of function specialization in functional programming: currying (more common)

function ajax(url) {
  console.log('ajax initializing with url:', url);
  return function getData(data) {
    return function getCallback(callbackfn) {
      return callbackfn(data);
    }
  }
}

function renderCustomer(data) {
  return console.log('rendering customer with id:', data.id);
}
console.log('starting ajax');
ajax('https://api.foo.com/v1/bar')({ id: '00' })(renderCustomer); // Takes 3 params
// This approach is called "manual currying" i.e. listing the params sets out sequentially
console.log('ajax complete\n');

const CUSTOMER_API = 'https://api.foo.com/v1/customers';
const me = { id: '42' };

// We can use these constants to create more specialized versions of the ajax function for particular use cases
const getCustomer = ajax(CUSTOMER_API); // "The ajax function with the url argument fixed to CUSTOMER_API"
console.log('starting getCustomer');
getCustomer(me)(renderCustomer); // Takes 2 params
console.log('getCustomer complete\n');

// Getting even more specialized...

// Demonstrates logical link between getCustomer and getCurrentUser
const getCurrentUser = getCustomer(me); // "The getCustomer function with the data argument fixed to me"
// Note ^ this assignment does not trigger line 4 to re-run
console.log('starting getCurrentUser');
getCurrentUser(renderCustomer); // Takes 1 param
console.log('getCurrentUser complete\n');


// This approach shows how we can define "curryable" functions more easily

// Here we have a utility method curry() which transforms an nnary function into series of nested unary functions
// The function works by keeping track of the args it has received.
function curry(fn, levels = fn.length, received_args = []) {
  return function(...inputs) {
    // enables loose currying by checking length each time
    // we don't assume length is 1
    if (inputs.length + received_args.length >= levels) {
      return fn(...received_args, ...inputs);
    }
    return curry(fn, levels, received_args.concat(...inputs));
  }
}

// Now we have the simpliciyu of a flat nnary function with the syntactic beauty of currying
function ajaxFlat(url, data, callbackfn) {
  console.log('ajax initializing with url:', url);
  console.log({ callbackfn });
  return callbackfn?.(data) || void 0;
}
const ajaxCurry = curry(ajaxFlat);

console.log('starting ajaxCurry');
ajaxCurry('https://api.curry-foo.com/v1/bar')({ id: '00' })(renderCustomer); // Takes 3 params
console.log('ajaxCurry complete\n');

// We can use these constants to create more specialized versions of the ajax function for particular use cases
const getCustomerCurry = ajaxCurry(CUSTOMER_API); // "The ajax function with the url argument fixed to CUSTOMER_API"
console.log('starting getCustomerCurry');
getCustomerCurry(me)(renderCustomer); // Takes 2 params
console.log('getCustomerCurry complete\n');

// Getting even more specialized...

// Demonstrates logical link between getCustomer and getCurrentUser
const getCurrentUserCurry = getCustomerCurry(me); // "The getCustomer function with the data argument fixed to me"
console.log('starting getCurrentUserCurry');
getCurrentUserCurry(renderCustomer); // Takes 1 param
console.log('getCurrentUserCurry complete\n');


// Notice in currying: to go from getCustomerCurry to getCurrentUserCurry,
// I did not need to call the utility again

// In partial application, I have to keep calling partial() each
// time I specialize

