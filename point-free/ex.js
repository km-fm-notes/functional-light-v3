// Point free

// Ex1: rendering people
const people = [
	{ name: 'kamar', id: 10 },
	{ name: 'calisha', id: 11 },
	{ name: 'kisha', id: 12 },
];

function renderPerson(person) {
	console.log(person.name, person.id);
	return person;
}
function getPerson(fn) {
	return function getP(person) {
		return fn(person);
	}
}

// Option 1
const p0 = getPerson(
	function onPerson(person) {
		return renderPerson(person);
	}
)(people[0]);
console.log(p0); // { name: 'kamar', id: 10 }

// Option 2 "Point free"
// Takes advantage of the fact that onPerson and renderPerson have equivalent points, i.e. equivalent arguments
const p1 = getPerson(renderPerson)(people[1]);
console.log(p1); // { name: 'calisha', id: 11 }

// Ex1: Even/Odd
function isOdd(v) {
	return v % 2 === 1;
}

// "Pointed" definition
function isEvenV1(v) {
	return !isOdd(v);
}

console.log(isEvenV1(4)) // true

// Better – "Point free" definition bespoke to isEven and isOdd
function isEvenV2() {
	return (function (v) {
		return !isOdd(v);
	})();
}
console.log(isEvenV2(4)) // true

// Best – "Point free" definition using a generalized "not" HOF
// Now, not can be used elsewhere in code base
// Also called complement and negate in some libs
function not(fn) {
	return function inv(...args) {
		return !fn(...args);
	}
}
const isEvenV3 = not(isOdd);
console.log(isEvenV3(4)); // true


// Imperative Implementation
function outputImperative(txt) {
	console.log(txt);
}
function printIfImperative(shouldPrintIt) {
	return function(msg) {
		if (shouldPrintIt(msg)) {
			outputImperative(msg);
		}
	};
}
function isShortEnoughImperative(str) {
	return str.length <= 5;
}
function isLongEnoughImperative(str) {
	return !isShortEnoughImperative(str);
}
var msg1 = "Hello";
var msg2 = msg1 + " World";
console.log('il1');
printIfImperative(isShortEnoughImperative)(msg1);		// Hello
console.log('il2');
printIfImperative(isShortEnoughImperative)(msg2);
console.log('il3');
printIfImperative(isLongEnoughImperative)(msg1);
console.log('il4');
printIfImperative(isLongEnoughImperative)(msg2);		// Hello World


// Declarative Implementation
const output = console.log.bind(null);
const isShortEnough = isShortEnoughImperative;
const isLongEnough = not(isShortEnoughImperative);
var dmsg1 = "Decla";
var dmsg2 = dmsg1 + "rative";

function onCondition(conditionalfn) {
	return function(predicatefn) {
		return function(...input) {
			if (predicatefn(...input)) {
				return conditionalfn(...input);
			}
			return void 0;
		};
	};
}

const printIf = onCondition(output);

console.log('dl1');
printIf(isShortEnough)(dmsg1); // Decla
console.log('dl2');
printIf(isShortEnoughImperative)(dmsg2);
console.log('dl3');
printIf(isLongEnoughImperative)(dmsg1);
console.log('dl4');
printIf(isLongEnoughImperative)(dmsg2);		// Declarative

