function strBuilderFirstTry(str) { // Solves edge case where initial str is undefined
	if (typeof str === 'string') {
		return function(arg) {
			return (typeof arg === 'string')
				? strBuilder(str + arg)
				: str;
		}
	} else {
		return str;
	}
}
function strBuilder(str) { // Assume always called with a string initially.
	return function(arg) {
		return (typeof arg === 'string')
			? strBuilder(str + arg)
			: str;
	}
}

var helloE1F1 = strBuilderFirstTry();
var helloE1F2 = strBuilder();
console.log(helloE1F1);
console.log(helloE1F2); // Anon function even though it shouldn't be

var hello = strBuilder("Hello, ");
var kyle = hello("Kyle");
var susan = hello("Susan");
var question = kyle("?")();
var greeting = susan("!")();

console.log(strBuilder("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.");
console.log(hello() === "Hello, ");
console.log(kyle() === "Hello, Kyle");
console.log(susan() === "Hello, Susan");
console.log(question === "Hello, Kyle?");
console.log(greeting === "Hello, Susan!");
