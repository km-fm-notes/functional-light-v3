const str1 = '5';

console.log(str1.padStart(2, '0')); // expected output: "05"

const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
console.log(maskedNumber); // expected output: "************5581"

// Example of lazy computation / deferral
function repeaterLazy(count) {
  return function() {
    return "".padStart(count, 'A'); // CLOSING OVER `count` variable
  }
}

const A = repeaterLazy(10);
console.log(A()); // 'AAAAAAAAAA' // Work occurs at the time of the call
console.log(A()); // 'AAAAAAAAAA' // Work repeated

// Benefit: if work is conditional, it can be avoided when unneeded
// Downside (absent memoization): Work is repeated each call

function repeaterEager(count) {
  const s = "".padStart(count, 'B'); // CLOSING OVER `s` variable
  return function() {
    return s;
  }
}

const B = repeaterEager(10); // Work occurs at the time of the initialization
console.log(B()); // 'BBBBBBBBBB' // Work not repeated
console.log(B()); // 'BBBBBBBBBB'

// All benefits to performance
// But, this is bad stylistaclly because the inner function closes over a variable that gets re-assigned
function repeaterMemoV1(count) {
  var s;
  return function() {
    if (!s) {
      s = "".padStart(count, 'C');
    }
    return s;
  }
}

const C = repeaterMemoV1(10);
console.log(C()); // 'CCCCCCCCCC' // Work occurs at the time of call
console.log(C()); // 'CCCCCCCCCC' // Work not repeated

// Utility:
// accepts a non-optimized lazy function which will repeat work each time
// returns an adapted function of the same shape with performance enhancement:
  // each call, check the input list. if input list is recognized, return from cache. otherwise, do work, cache then return
function memoize(f) {
  var cache;
  return function (...input) { // Closing over the cache variable 
    if (!cache) {
      console.log('working'); // Only called once
      cache = f(...input);
    }
    return cache;
  }
}

function repeaterMemoV2(count) {
  return memoize(function () {
    return "".padStart(count, 'D'); // CLOSING OVER `count` variable
  });
}

const D = repeaterMemoV2(10);
console.log(D()); // 'DDDDDDDDDD' // Work occurs at the time of call
console.log(D()); // 'DDDDDDDDDD' // Work not repeated

// Memoize useful when usage pattern is that inputs rarely change vs the number of calls required



// Big picture:
// Function call is a pure function call iff I can replace the call with the result of the call anywhere in the program without causing any changes to the program
// D() can be replaced with 'DDDDDDDDDD' and the program is unchanged
