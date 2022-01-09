'use strict';

const numbers = [1, 7, 2, 3];
const max = Math.max.apply(null, numbers);
console.log(max);
const min = Math.min.apply(null, numbers);
console.log(min);

const values = [
  { height: 1.5, name: 'A' },
  { height: 2, name: 'B' },
  { height: 1, name: 'C' },
  { height: 0.5, name: 'D' },
  { height: 3.5, name: 'E' },
  { height: 0.5, name: 'F' },
];

// Classic use case is to take a function which accepts individual params and run it using a single array
function tallestObjectInArgList(...args) {
  return args.reduce((
    prevTallest,
    currObject,
  ) =>   
    currObject.height > prevTallest.height
      ? currObject
      : prevTallest
  );
}
const tallestObjectInArgListRes = tallestObjectInArgList.apply(null, values);
console.log(tallestObjectInArgListRes.name); // E

// You can use apply() here, but kinda weird
function tallestObjectInArray(nums) {
  return nums.reduce((
    prevTallest,
    currObject,
  ) =>   
    currObject.height > prevTallest.height
      ? currObject
      : prevTallest
  );
}
const tallestObjectInArrayRes = tallestObjectInArray.apply(null, [values]); // Requires 2D array
console.log(tallestObjectInArrayRes.name); // E
